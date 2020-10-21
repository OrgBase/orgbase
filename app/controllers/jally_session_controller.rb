class JallySessionController < ApplicationController
  before_action :authenticate_user!
  layout 'home'

  def join_session
    @user = current_user
    authorize(@user, :participate?)
    @employee = @user.employee
    @company = @employee&.company

    @session_slug = params[:identifier]
    if @session_slug.blank? || @session_slug == 'new'
      @session = JallySessionService.create_session(
          company: @company,
          created_by: @user
      )

      JallySessionService.configure_session(session_id: @session.id)
      return redirect_to jally_session_path(identifier: @session.slug)
    else
      @session = JallySession.find_by(slug: @session_slug)
      company = @session&.company
      team = @session&.team

      if company
        authorize(company, :show?)
        if team
          authorize(team, :participate?)
        end
      else
        return redirect_to home_path(error_message: "Uh oh! That seems like an invalid session url.")
      end
    end

    # room = Room.where(jally_session: @session, created_at: @session.scheduled_at..DateTime.now).first

    render template: 'session/session'
  end
end