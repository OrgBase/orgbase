class SandboxEmailInterceptor
  def self.delivering_email(message)
    message.to = [(ENV["DEV_EMAIL_TO"] || "#{Etc.getlogin}@jally.co")]
    message.cc = []
    message.bcc = []
  end
end