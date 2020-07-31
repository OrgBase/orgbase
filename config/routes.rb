Rails.application.routes.draw do
  root 'landing#index'

  devise_for :users, {controllers: { registrations: 'registrations', omniauth_callbacks: 'oauths' }}
  devise_scope :user do
    get '/login', to: 'devise/sessions#new', as: :new_session
    get '/logout', to: 'devise/sessions#destroy', as: :destroy_session
    get '/signup', to: 'devise/registrations#new', as: :signup
  end

  get '/home', to: 'home#index', as: :home

  post "/early-access" => "landing#early_access", :as => :early_access

end
