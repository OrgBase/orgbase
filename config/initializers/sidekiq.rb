Sidekiq.configure_client do |config|
  if ENV['REDIS_URL'].present?
    config.redis = { url: ENV.fetch('REDIS_URL'), size: 1, network_timeout: 5 }
  end
end

Sidekiq.configure_server do |config|
  if ENV['REDIS_URL'].present?
    config.redis = { url: ENV.fetch('REDIS_URL'), size: 12, network_timeout: 5 }
  end
end

Sidekiq::Extensions.enable_delay!