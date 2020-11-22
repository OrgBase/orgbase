class ProfileController < ApplicationController
  before_action :authenticate_user!
  layout 'home'
  def update_profile
    name = params[:name]
    password = params[:password]
    password_confirmation = params[:password_confirmation]

    ActiveRecord::Base.transaction do
      @user = current_user
      if @user.name
        @user.name = name
        @user.save!
      end

      if(password.present? && password == password_confirmation)
        @user.reset_password(password, password_confirmation)
      end
    end
    render json: {
        success: true
    }
  end
end