class VideoController < ApplicationController
  before_action :authenticate_user!

  def access_token
    token = TwilioService.jwt_access_token(current_user.id, params[:room])

    render json: {token: token}
  end
end