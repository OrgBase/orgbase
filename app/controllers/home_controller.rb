class HomeController < ApplicationController
  before_action :authenticate_user!
  layout 'home'

  def index
    @user = current_user
    @employee = @user.employee
    @error_message = params[:error_message] || ''
    @notice = params[:notice] || ''
    email_domain = @user.email.split('@').last
    @domain_playspaces = CompanyEmailDomain.where(domain: email_domain).map do |ced|
      {
          company_id: ced.company_id,
          playspace_name: ced.company.name
      }
    end

    if @employee.present?
      @company = @employee.company
      @selectable_users = Employee.where(company: @company).map {|e| {value: e.user.id, label: e.user.name}}
      @selectable_users -= [@user]
      return render template: 'home/lobby'
    else
      render template: 'home/index'
    end
  end
end
