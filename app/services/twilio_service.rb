require 'twilio-ruby'

class TwilioService
  # put your own credentials here
  ACCOUNT_SID = Rails.application.credentials.twilio[:account_sid]
  AUTH_TOKEN = Rails.application.credentials.twilio[:auth_token]
  API_KEY = Rails.application.credentials.twilio[:api_key]
  API_SECRET = Rails.application.credentials.twilio[:api_secret]

  class << self
    def jwt_access_token(identity, room_name)
      # Create Video grant for our token
      video_grant = Twilio::JWT::AccessToken::VideoGrant.new
      video_grant.room = room_name

      token = Twilio::JWT::AccessToken.new(
          ACCOUNT_SID,
          API_KEY,
          API_SECRET,
          [video_grant],
          identity: identity
      )

      token.to_jwt
    end

    def p2p_room_sid(room_name)
      @client = Twilio::REST::Client.new(ACCOUNT_SID, AUTH_TOKEN)

      room = @client.video.rooms.list(unique_name: room_name).try(:first)

      room ||= @client.video.rooms.create(
          enable_turn: true,
          type: 'peer-to-peer',
          unique_name: room_name
      )

      room.sid
    end
  end
end