class HomeController < ApplicationController
  before_action :authenticate_user!
  layout 'home'

  def index
    @user = current_user
    @employee = @user.employee
    @error_message = params[:error_message] || ''

    if @employee.present?
      @company = @employee.company
      return render template: 'home/lobby'
    else
      render template: 'home/index'
    end
  end
end
