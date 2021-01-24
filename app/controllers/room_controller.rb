class RoomController < ApplicationController
  before_action :authenticate_user!
  layout 'room'

  def join_room
    @user = current_user
    authorize(@user, :participate?)
    @employee = @user.employee
    @company = @employee&.company

    @room_name = params[:identifier]

    return redirect_to home_path if @room_name.blank?

    @room = Room.find_by(slug: @room_name)

    if @room
      authorize(@room, :join?)
    else
      return redirect_to home_path(error_message: "Uh oh! That seems like an invalid room.")
    end

    client = TwilioService.client(@room.slug)
    @twilio_room = client.video.rooms.list(unique_name: @room.slug).try(:first)

    #twilio only allows a max of 128 chars for identity
    participant_identity = "#{@employee.id}"
    connected_participants = @twilio_room&.participants&.list({status: 'connected'}) || []
    already_connected = connected_participants.map(&:identity).include?(participant_identity)

    if @twilio_room.present? && !already_connected && connected_participants.count >= @room.capacity
      return redirect_to home_path(error_message: "Uh oh! That room is full.")
    end

    @token = TwilioService.jwt_access_token(participant_identity, @room_name)
    room_participant = RoomParticipant.where(room: @room, employee: @employee).first_or_create

    @room_config = RoomConfig.where(room: @room).first_or_create do |config|
      config.active_participant = room_participant
    end

    active_participant = @room_config.active_participant || room_participant

    @active_participant_data = {
        name: active_participant.employee.user.first_name,
        identity: active_participant.employee_id,
        color: active_participant.color,
        score: active_participant.score
    }


    # create a room if it doesn't exist
    if @twilio_room.blank?
      if Rails.env == 'development'
        room_type = @room.capacity > 2  ? 'peer-to-peer' : 'go'
      else
        room_type = @room.capacity <= 10 ? 'peer-to-peer' : 'group'
      end

      begin
        @twilio_room = TwilioService.p2p_room(client, @room_name, room_type)
      rescue Exception
        return redirect_to room_path(identifier: @room.slug)
      end

    end

    starting_game_slug = @room&.jally_session&.starting_game_slug
    @starting_game = Game.find_by(slug: starting_game_slug) if starting_game_slug.present?
    @starting_game ||= Game.all.sample

    render template: 'room/room'
  end

  def panel_update
    authorize(current_user, :participate?)
    room_slug = params[:identifier]
    room = Room.find_by(slug: room_slug)
    game_slug = params[:game_slug]
    random_fraction = params[:random_fraction]
    employee_id = params[:employee_id]

    authorize(room, :update?)

    active_participant = RoomParticipant.where(room: room, employee_id:employee_id).first if employee_id.present?

    config = room.room_config
    config&.game_slug = game_slug if game_slug.present?
    config&.random_fraction = random_fraction if random_fraction.present?
    config&.active_participant = active_participant if active_participant.present?
    config.save!
  end

  def participant_data
    params.permit(:employee_id)
    employee = Employee.find_by(id: params[:employee_id]) if params[:employee_id].present?

    if employee.present?
      render json: {
          firstName: employee.user.first_name
      }
    end
  end

  def update_participant
    params.permit(:winner_ids, :room_slug, :reset_scores)
    room = Room.find_by(slug: params[:room_slug]) if params[:room_slug].present?

    if room.present?
      authorize(room, :update?)
      if params[:reset_scores]
        room.room_participants.each do |participant|
          participant.score = 0
          participant.save!
        end
      elsif params[:winner_ids].kind_of?(Array)
        params[:winner_ids].each do |employee_id|
          participant = RoomParticipant.where(room:room, employee_id: employee_id).first
          if participant.present?
            participant.score += 1
            participant.save!
          end
        end
      end

      render json: room.room_participants_data
    end
  end
end