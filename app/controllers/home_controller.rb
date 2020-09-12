class HomeController < ApplicationController
  before_action :authenticate_user!
  layout 'home'

  def index
    @user = current_user
    @employee = @user.employee
    @room_full = params[:room_full].present?

    if @employee.present?
      @company = @employee.company
      return render template: 'home/lobby'
    else
      render template: 'home/index'
    end
  end
end
