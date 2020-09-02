class VideoController < ApplicationController
  before_action :authenticate_user!

  def access_token
    token = TwilioService.jwt_access_token(current_user.name, params[:room])
    room_sid = TwilioService.p2p_room_sid(params[:room])

    render json: {
        token: token,
        room_sid: room_sid
    }
  end
end