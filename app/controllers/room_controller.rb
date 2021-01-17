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

    #twilio only allows a max of 128 chars
    participant_identity = "#{@user.first_name || @user.email}-$-#{@employee.slug}"[0..127]
    connected_participants = @twilio_room&.participants&.list({status: 'connected'}) || []
    already_connected = connected_participants.map(&:identity).include?(participant_identity)

    if @twilio_room.present? && !already_connected && connected_participants.count >= @room.capacity
      return redirect_to home_path(error_message: "Uh oh! That room is full.")
    end

    @token = TwilioService.jwt_access_token(participant_identity, @room_name)

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

    authorize(room, :update?)
    room.game_slug = game_slug if game_slug.present?
    room.random_fraction = random_fraction if random_fraction.present?
    room.save!
  end
end