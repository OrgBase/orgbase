Rails.application.routes.draw do
  root 'landing#index'

  devise_for :users, controllers: { omniauth_callbacks: 'oauths' }
  devise_scope :user do
    get '/login', to: 'devise/sessions#new', as: :new_session_path
    get '/logout', to: 'devise/sessions#destroy', as: :destroy_session_path
    get 'signup', to: 'devise/registrations#new', as: :signup
  end
end
