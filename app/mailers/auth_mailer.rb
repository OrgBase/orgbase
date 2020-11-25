class AuthMailer < ApplicationMailer
  default from: 'Jally <team@jally.co>'
  layout 'mailer'

  def passwordless_link_email(user_id, token, validate: true,
                              subject: nil, message: nil,
                              after_path: nil, sign_up: false,
                              invite: false, invited_by_user: nil)
    @user = User.find(user_id)
    @sign_up = sign_up
    @invite = invite
    if sign_up
      @title = "Verify your email address"
      @link_text = "Verify your email ⚡"
      @message = message || "Before we set up your account we need to quickly confirm your email address. All you need to do is click the link below:"
      subject ||= "Verify your email address"
    elsif invite
      company = invited_by_user&.company
      playspace_name = company&.name
      @title = "You’ve been invited to Jally!"
      @link_text = "Accept Invitation ⚡"
      @message = message || "Your teammate, #{invited_by_user&.name || ''}, has invited you to join the #{playspace_name || ''} Jally playspace. To sign up, all you need to do is click the link below:"
      subject ||= "Welcome to Jally"
    else
      @title = "Sign in with magic link"
      @link_text = "Sign In ⚡"
      @message = message || "To sign in, all you need to do is click the link below:"
      subject ||= "Sign in with magic link"
    end

    if validate && !PasswordlessLinkService.new(@user).validate_token(token)
      raise "Sending an invalid token"
    end

    if after_path
      @link = login_passwordless_link_url(user: user_id, token: token, after_sign_in: after_path)
    else
      @link = login_passwordless_link_url(user: user_id, token: token)
    end

    mail(to: @user.email, from: "Jally <team@jally.co>", subject: subject)
  end
end