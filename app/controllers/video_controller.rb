class VideoController < ApplicationController
  before_action :authenticate_user!

  def join_room
    room_name = params[:room]
    capacity = params[:capacity]
    client = TwilioService.client(room_name)
    room = client.video.rooms.list(unique_name: room_name).try(:first)

    if room.present? && room.participants.list({status: 'connected'}).count >= capacity
      return render json: {
          max_capacity: true
      }
    end

    # create a room if it doesn't exist
    room = TwilioService.p2p_room(client, room_name) if room.blank?
    token = TwilioService.jwt_access_token(current_user.name, params[:room])

    render json: {
        token: token,
        room_sid: room.sid,
        max_capacity: false
    }
  end
end