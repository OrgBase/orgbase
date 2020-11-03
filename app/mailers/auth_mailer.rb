class AuthMailer < ApplicationMailer
  default from: 'Jally <team@jally.co>'
  layout 'mailer'

  def passwordless_link_email(user_id, token, validate: true,
                       subject: "Jally Login Link",
                       message: nil,
                       after_path: nil)
    @user = User.find(user_id)

    if validate && !PasswordlessLinkService.new(@user).validate_token(token)
      raise "Sending an invalid token"
    end

    if after_path
      @link = login_passwordless_link_url(user: user_id, token: token, after_sign_in: after_path)
    else
      @link = login_passwordless_link_url(user: user_id, token: token)
    end

    @message = message || "We received a request from you for a login link to Jally. Please click this link to login:"

    mail(to: @user.email, from: "Jally <team@jally.co>", subject: subject)
  end
end