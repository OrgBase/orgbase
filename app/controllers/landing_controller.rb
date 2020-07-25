class LandingController < ApplicationController
  def index
    if user_signed_in? && params[:lander].blank?
      return redirect_to :home
    end
    render layout: 'landing'
  end
end
