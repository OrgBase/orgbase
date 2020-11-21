class LandingController < ApplicationController
  def index
    if user_signed_in? && params[:lander].blank?
      return redirect_to :home
    end
    render layout: 'landing'
  end

  def early_access
    data = params.require("early_access").permit(:email, :checkField)

    if data["checkField"].present?
      # Spam Likely, filled out a hidden field
      Rails.logger.debug("Likely spam submission #{data}")
      Slack.spam_request(data)
      redirect_to root_path, flash: { notice: "We might not get back to you." } and return
    end

    Slack.new_sign_up(data)

    redirect_to request.referrer || root_path, flash: { notice: 'Thank you for your interest! We will get in touch with you soon.' }
  end
end
