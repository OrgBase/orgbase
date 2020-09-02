require 'twilio-ruby'

class TwilioService
  # put your own credentials here
  ACCOUNT_SID = Rails.application.credentials.twilio[:account_sid]
  AUTH_TOKEN = Rails.application.credentials.twilio[:auth_token]
  API_KEY = Rails.application.credentials.twilio[:api_key]
  API_SECRET = Rails.application.credentials.twilio[:api_secret]

  class << self
    def twilio_client
      Twilio::REST::Client.new ACCOUNT_SID, AUTH_TOKEN
    end

    def jwt_access_token(identity, room)
      # Create Video grant for our token
      video_grant = Twilio::JWT::AccessToken::VideoGrant.new
      video_grant.room = room

      token = Twilio::JWT::AccessToken.new(
          ACCOUNT_SID,
          API_KEY,
          API_SECRET,
          [video_grant],
          identity: identity
      )

      token.to_jwt
    end
  end
end