class PasswordlessLinkService
  EXPIRATION_HOURS = 24

  def initialize(user)
    @user = user
  end

  def validate_token(provided_token, log: true)
    # Potentially vulnerable to timing attacks on the existence of
    # emails, but that isn't as serious a timing attack on the token
    # which `secure_compare` solves for
    if @user.blank? && log
      Rails.logger.info "attempted passwordless login on invalid user"
      return false
    end

    token_matches = Devise.secure_compare(
        @user.sign_in_token,
        Devise.token_generator.digest(User, :sign_in_token, provided_token)
    )
    token_not_expired = @user.sign_in_token_sent_at && (@user.sign_in_token_sent_at >= EXPIRATION_HOURS.hours.ago)
    token_matches && token_not_expired
  end

  def send_token!
    if @user
      token = generate_token!
      AuthMailer.passwordless_link_email(@user.id, token).deliver_now!
    end
  end

  def reset_token_info!
    @user.sign_in_token = nil
    @user.sign_in_token_sent_at = nil
    @user.save(validate: false)
  end

  def generate_token!(force: false)
    raw_token, encrypted_token = Devise.token_generator.generate(User, :sign_in_token)
    @user.sign_in_token = encrypted_token
    @user.sign_in_token_sent_at = Time.current
    if force
      @user.save(validate: force)
    else
      @user.save!
    end

    raw_token
  end
end
