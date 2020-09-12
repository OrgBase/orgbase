Rails.application.routes.draw do
  root 'landing#index'

  devise_for :users, {controllers: { registrations: 'registrations', omniauth_callbacks: 'oauths' }}
  devise_scope :user do
    get 'login/password', to: 'devise/sessions#new', as: :'password_login'
    get 'logout', to: 'devise/sessions#destroy', as: :logout
    get 'signup', to: 'devise/registrations#new', as: :signup
  end

  # resource :magic_link, only: :create do
  #   get 'login', to: 'magic_links#login'
  # end
  #
  # get 'login', to: 'magic_links#request_link', as: :magic_link_login

  get '/home', to: 'home#index', as: :home

  get '/:company_slug/lobby', to: 'home#lobby', as: :lobby

  post "/early-access" => "landing#early_access", :as => :early_access

  post "/video/room" => "video#join_room", :as => :join_room

end
