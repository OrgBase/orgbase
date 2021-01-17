require 'sidekiq/web'

Rails.application.routes.draw do
  root 'landing#index'

  #Admin tools
  authenticate :user, lambda { |u| u.admin? } do
    mount Sidekiq::Web => '/sidekiq'
  end

  get 'sidekiq' => redirect('/')

  devise_for :users, {controllers: { registrations: 'registrations', omniauth_callbacks: 'oauths' }}
  devise_scope :user do
    get 'login/password', to: 'devise/sessions#new', as: :'password_login'
    get 'logout', to: 'devise/sessions#destroy', as: :logout
    get 'signup/password', to: 'devise/registrations#new', as: :signup
  end

  resource :passwordless_link, only: :create do
    get 'login', to: 'passwordless_links#login'
  end

  get 'login', to: 'passwordless_links#request_link', as: :passwordless_link_login

  get 'signup' => 'passwordless_links#register_link', as: :passwordless_link_signup
  post 'signup' => 'passwordless_links#register', as: :signup_passwordless_link

  get '/lobby', to: 'home#index', as: :home

  post "/early-access" => "landing#early_access", :as => :early_access

  post '/room/:identifier/panel-update' => "room#panel_update", :as => :panel_update
  get '/room/new' => "room#join_room", :as => :new_room
  get '/room/:identifier' => "room#join_room", :as => :room

  get '/session/:identifier' => "jally_session#join_session", :as => :jally_session
  post '/session' => "jally_session#join_session", :as => :create_jally_session
  post '/session-room' => "jally_session#get_room", :as => :get_session_room

  post '/profile' => "profile#update_profile", :as => :update_profile
  post '/company' => "company#join_company", :as => :join_company
  post '/invite' => "profile#invite_users", :as => :invite_users

  get '/game/:game_slug' => "game#game_data", :as => :fetch_game_data
end
