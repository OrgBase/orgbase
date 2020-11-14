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
    get 'signup', to: 'devise/registrations#new', as: :signup
  end

  resource :passwordless_link, only: :create do
    get 'login', to: 'passwordless_links#login'
  end

  get 'login', to: 'passwordless_links#request_link', as: :passwordless_link_login

  get '/lobby', to: 'home#index', as: :home

  post "/early-access" => "landing#early_access", :as => :early_access

  post '/room/:identifier/panel-update' => "room#panel_update", :as => :panel_update
  get '/room/new' => "room#join_room", :as => :new_room
  get '/room/:identifier' => "room#join_room", :as => :room

  get '/session/:identifier' => "jally_session#join_session", :as => :jally_session
  post '/session' => "jally_session#join_session", :as => :create_jally_session
end
