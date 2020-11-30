class JallyFailureApp < Devise::FailureApp
  def route(scope)
    :passwordless_link_signup_url
  end
end