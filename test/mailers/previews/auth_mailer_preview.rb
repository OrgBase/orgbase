class AuthMailerPreview < ActionMailer::Preview
  # Accessible from https://localhost:3007/rails/mailers/auth_mailer/passwordless_link_email
  def passwordless_link_email

    AuthMailer.passwordless_link_email(User.first.id, "cefefeefwe", validate: false,
                                       invite: true, invited_by_user: User.second)
  end
end