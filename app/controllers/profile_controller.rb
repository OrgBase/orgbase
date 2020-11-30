class ProfileController < ApplicationController
  before_action :authenticate_user!
  layout 'home'
  def update_profile
    name = params[:name]
    password = params[:password]
    password_confirmation = params[:password_confirmation]

    ActiveRecord::Base.transaction do
      @user = current_user
      if name
        @user.name = name
        @user.save!
      end

      if(password.present? && password == password_confirmation)
        if @user.reset_password(password, password_confirmation)
          bypass_sign_in(@user)
        end
      end
    end
    render json: {
        success: true
    }
  end

  def invite_users
    @user = current_user
    authorize(@user, :participate?)
    invitees = params[:invitees]
    invitees&.each do |invitee|
      JallySessionService.create_account_and_send_invite(invitee, @user.company, @user)
    end

    render json: {
        success: true
    }
  end
end