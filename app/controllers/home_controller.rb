class HomeController < ApplicationController
  before_action :authenticate_user!
  layout 'lobby'

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
      @invite_code = CompanyService.find_or_create_invite_code(@company.id)
      other_employees = Employee.where(company: @company) - [@employee]
      @selectable_users = other_employees.map {|e| {value: e.user.id, label: e.user.name || e.user.email}}
      @upcoming_sessions = JallySessionService.upcoming_jally_sessions(@employee).map { |s| get_session_hash(s) }
      @active_sessions = JallySessionService.active_jally_sessions(@employee).map { |s| get_session_hash(s) }
      return render template: 'home/lobby'
    else
      render template: 'home/index'
    end
  end

  private
  def get_session_hash(session)
    name = session.name
    name = "Jally by #{session.created_by&.name}" if name.blank?
    {
        name: name,
        recurring: session.config.recurring,
        scheduledAt: session.config.scheduled_at.to_i,
        slug: session.slug
    }
  end
end
