class JallySessionController < ApplicationController
  before_action :authenticate_user!
  layout 'home'

  require 'date'

  def join_session
    @user = current_user
    params.permit(:identifier, :invitees, :name, :scheduled_at, :session_duration_seconds,
                  :recurring, :frequency_length, :frequency_unit, :party, :switch_after_seconds)

    @session_slug = params[:identifier]
    if @session_slug.blank?
      authorize(@user, :participate?)
      @employee = @user.employee
      @company = @employee&.company
      @session = JallySessionService.create_session(
          company: @company,
          created_by: @user,
          name: params[:name] || nil
      )

      JallySessionService.configure_session(
          session_id: @session.id,
          session_duration_seconds: params[:session_duration_seconds],
          party: params[:party],
          switch_after_seconds: params[:switch_after_seconds],
          recurring: params[:recurring],
          scheduled_at: Time.at(params[:scheduled_at]).to_datetime,
          frequency_length: params[:frequency_length],
          frequency_unit: params[:frequency_unit])
      return render json: {session_slug: @session.slug}
    else
      @session = JallySession.find_by(slug: @session_slug)
      @company = @session&.company
      team = @session&.team

      # If we hit this, it means the user was invited with the session link
      if @company
        @employee = @user.employee
        if @employee.blank?
          @employee = Employee.create!(user: @user,
                           company: @company,
                           title: 'Team Member')
          if team
            TeamMember.create!(team: team,
                               employee: @employee)
          end
        end
      else
        return redirect_to home_path(error_message: "Uh oh! That seems like an invalid session url.")
      end

      authorize(@company, :show?)
      if team
        authorize(team, :participate?)
      end
    end

    @session_config = @session.config

    @participant = JallySessionService.create_or_clear_participant(
        employee: @employee,
        jally_session: @session
    )

    return redirect_to room_path(identifier: @participant.room.slug) if @participant.room.present?

    render template: 'session/session'
  end
end