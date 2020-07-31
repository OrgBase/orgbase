class LandingController < ApplicationController
  def index
    if user_signed_in? && params[:lander].blank?
      return redirect_to :home
    end
    render layout: 'landing'
  end

  def early_access
    data = params.require("early_access").permit(:email)

    Slack.new_lead(data)

    redirect_to request.referrer || root_path, flash: { notice: 'Thank you for your interest! We will get in touch with you soon.' }
  end
end
