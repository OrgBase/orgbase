class RoomController < ApplicationController
  before_action :authenticate_user!
  layout 'home'

  def join_room
    @user = current_user
    authorize(@user, :participate?)
    @employee = @user.employee
    @company = @employee&.company

    capacity = params[:capacity] || 3
    @room_name = params[:identifier]
    if @room_name.blank? || @room_name == 'new'
      @room = RoomService.create_room(
          company: @company,
          capacity: capacity
      )
      return redirect_to room_path(identifier: @room.slug)
    else
      @room = Room.find_by(slug: @room_name)
      company = @room&.company

      if company
        authorize(company, :show?)
      else
        return redirect_to home_path(error_message: "Uh oh! That seems like an invalid room.")
      end
    end

    client = TwilioService.client(@room.slug)
    @twilio_room = client.video.rooms.list(unique_name: @room.slug).try(:first)

    participant_identity = "#{@user.first_name}-$-#{@employee.slug}"
    connected_participants = @twilio_room&.participants&.list({status: 'connected'}) || []
    already_connected = connected_participants.map(&:identity).include?(participant_identity)

    if @twilio_room.present? && !already_connected && connected_participants.count >= @room.capacity
      return redirect_to home_path(error_message: "Uh oh! That room is full.")
    end

    # create a room if it doesn't exist
    if @twilio_room.blank?
      if Rails.env == 'development'
        room_type = @room.capacity > 2  ? 'peer-to-peer' : 'go'
      else
        room_type = @room.capacity <= 3 ? 'peer-to-peer' : 'group'
      end

      @twilio_room = TwilioService.p2p_room(client, @room_name, room_type)
    end

    @token = TwilioService.jwt_access_token(participant_identity, @room_name)

    render template: 'room/room'
  end

  def panel_update
    authorize(current_user, :participate?)
    room_slug = params[:identifier]
    room = Room.find_by(slug: room_slug)
    panel_id = params[:panel_id]
    panel_type = params[:panel_type]

    authorize(room, :update?)
    room.update_attributes(
        panel_id: panel_id,
        panel_type: panel_type
    )
  end
end