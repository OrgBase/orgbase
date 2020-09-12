class VideoController < ApplicationController
  before_action :authenticate_user!

  def join_room
    @user = current_user
    room_name = params[:room]
    capacity = params[:capacity]
    client = TwilioService.client(room_name)
    room = client.video.rooms.list(unique_name: room_name).try(:first)

    employee_slug = @user.employee&.slug
    participant_identity = "#{@user.first_name}-$-#{employee_slug}"
    connected_participants = room&.participants&.list({status: 'connected'}) || []
    already_connected = connected_participants.map(&:identity).include?(participant_identity)

    if room.present? && !already_connected && connected_participants.count >= capacity
      return render json: {
          max_capacity: true
      }
    end

    # create a room if it doesn't exist
    room = TwilioService.p2p_room(client, room_name) if room.blank?

    token = TwilioService.jwt_access_token(participant_identity, room_name)

    render json: {
        token: token,
        room_sid: room.sid,
        max_capacity: false
    }
  end
end