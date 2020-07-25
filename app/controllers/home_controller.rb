class HomeController < ApplicationController
  before_action :authenticate_user!

  def index
    @user = current_user
    render layout: 'home'
  end
end
