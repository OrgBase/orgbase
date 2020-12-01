# frozen_string_literal: true

class PasswordlessLinksController < ApplicationController
  def request_link
    if user_signed_in?
      return redirect_to root_path, flash: { warning: "You are already logged in" }
    end

    render layout: "home"
  end

  def register_link
    if user_signed_in?
      return redirect_to root_path, flash: { warning: "You are already logged in" }
    end

    render layout: "home"
  end

  def create
    if params[:email].blank?
      return redirect_to passwordless_link_login_path, flash: { warning: "Email can't be empty." }
    end

    email_requested = params[:email]
    @user = User.find_by(email: email_requested) || User.where("email ILIKE ?", email_requested).first
    if @user.blank?
      return redirect_to passwordless_link_login_path, flash: {
          warning: "Uh oh! There is no account with that email. Please use the email you signed up with or sign up using the link below."
      }
    end
    PasswordlessLinkService.new(@user).send_token!

    redirect_to passwordless_link_login_path, flash: { success: "We just sent the magic link to #{email_requested}." }
  end

  def register
    if params[:email].blank?
      return redirect_to passwordless_link_signup_path, flash: { warning: "Email invalid." }
    end

    if params["checkField"].present?
      # Spam Likely, filled out a hidden field
      Rails.logger.debug("Likely spam submission #{params}")
      Slack.spam_request(params)
      redirect_to root_path and return
    end

    email_requested = params[:email]

    @user = User.find_by(email: email_requested) || User.where("email ILIKE ?", email_requested).first
    new_user = @user.nil?
    @user ||= User.create!(email: email_requested,
                         password: SecureRandom.alphanumeric(8))

    PasswordlessLinkService.new(@user).send_token!(sign_up: new_user)

    Slack.new_sign_up({email: email_requested})

    request_page = params[:requestPage]


    if request_page == 'lander'
      redirect_to root_path, flash: { success: "We just sent the magic link to #{email_requested}." }
    else
      redirect_to passwordless_link_signup_path, flash: { success: "We just sent the magic link to #{email_requested}." }
    end
  end

  def login
    if params[:token].blank?
      return redirect_to passwordless_link_login_path
    end
    user_id, token = params.require([:user, :token])
    redir_path = params[:after_sign_in]

    @user = User.find_by(id: user_id)
    passwordless_link_service = PasswordlessLinkService.new(@user)

    if user_signed_in?
      if current_user == @user && passwordless_link_service.validate_token(token)
        passwordless_link_service.reset_token_info!
      end
      if redir_path && (redir_path =~ /^\/[^\/\\]/) # make sure it's relative
        return redirect_to redir_path, flash: { warning: "You are already logged in" }
      else
        return redirect_to root_path, flash: { warning: "You are already logged in" }
      end
    end

    if @user && passwordless_link_service.validate_token(token)
      passwordless_link_service.reset_token_info!
      if redir_path && (redir_path =~ /^\/[^\/\\]/) # make sure it's relative
        session[:after_sign_in] = redir_path
      end
      sign_in_and_redirect @user
    else
      redirect_to passwordless_link_login_path, flash: { warning: "The link is invalid or has expired" }
    end
  end
end
