require 'httparty'
require 'json'

class Slack
  SLACK_URL = "https://hooks.slack.com/services/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"
  ENG_NOTIFICATIONS_URL = "https://hooks.slack.com/services/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"

  TESTING_CHANNEL = "#local-notifications"
  LEADS_CHANNEL = '#inbound-leads'

  class << self
    def send_message(channel, message, options = {})
      payload = {}
      payload[:text] = message
      payload[:channel] = Rails.env.production? ? channel : TESTING_CHANNEL

      options[:icon_emoji] ||= ':tada:'
      options[:username] ||= 'Jally Bot'

      slack_endpoint = Rails.env.production? ? SLACK_URL : ENG_NOTIFICATIONS_URL

      begin
        Rails.logger.debug("[Slack] Post to URL: #{options[:url]}")
        HTTParty.post(slack_endpoint, body: JSON.generate(payload.merge(options)))
      rescue Encoding::UndefinedConversionError, Timeout::Error, Errno::ETIMEDOUT, Errno::ECONNRESET, SocketError
        Rails.logger.error("[Slack] Post to URL FAILED: #{options[:url]}")
        # suppress errors to avoid crashing anything else. This should probably be a sidekiq job
      end
    end

    def link(text, url)
      "<#{url}|#{escape_text(text)}>"
    end

    def new_lead(data = {})
      send_message(LEADS_CHANNEL, "<!here|here>: New Lead :tada: #{JSON.pretty_generate(data)}")
    end
    def spam_request(data={})
      send_message(LEADS_CHANNEL, "Mostly Spam :face_with_raised_eyebrow: #{JSON.pretty_generate(data)}")
    end

    def log_data(data = {})
      send_message(TESTING_CHANNEL, "Data Log: #{JSON.pretty_generate(data)}")
    end
  end
end
