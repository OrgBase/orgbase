class JallySessionController < ApplicationController
  before_action :authenticate_user!
  layout 'home'

  require 'date'

  def join_session
    @user = current_user
    params.permit(:identifier, :invitees, :name, :scheduled_at, :session_duration_seconds,
                  :recurring, :frequency_length, :frequency_unit, :party, :switch_after_seconds,
                  :starting_game_slug)
        .with_defaults(party: false,
                       recurring: false,
                       session_duration_seconds: 3600,
                       switch_after_seconds: nil,
                       frequency_length: nil,
                       frequency_unit: nil,
                       name: nil,
                       invitees: [],
                       starting_game_slug: 'ddtq')

    @session_slug = params[:identifier]
    if @session_slug.blank?
      authorize(@user, :participate?)
      @employee = @user.employee
      @company = @employee&.company
      scheduled_at = Time.at(params[:scheduled_at]).to_datetime if params[:scheduled_at]
      scheduled_at ||= DateTime.now
      @session = JallySessionService.create_session(
          company: @company,
          created_by: @user,
          name: params[:name] || nil,
          starting_game_slug: params[:starting_game_slug]
      )

      JallySessionService.configure_session(
          session_id: @session.id,
          session_duration_seconds: params[:session_duration_seconds],
          party: params[:party],
          switch_after_seconds: params[:switch_after_seconds],
          recurring: params[:recurring],
          scheduled_at: scheduled_at,
          frequency_length: params[:frequency_length],
          frequency_unit: params[:frequency_unit])

      invitees = params[:invitees]
      invitees&.each do |invitee|
        JallySessionService.create_account_and_send_invite(invitee, @company, @user)
      end
      if params[:scheduled_at].present?
        return render json: {session_id: @session.id, scheduled: true}
      else
        return render json: {session_id: @session.id, session_slug: @session.slug}
      end
    else
      @session = JallySession.find_by(slug: @session_slug)
      @company = @session&.company
      team = @session&.team


      if @company
        @employee = @user.employee
        # If we hit this, it means the user was invited with the session link
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

  def get_room
    session_slug = params[:session_slug]
    session = JallySession.find_by(slug: session_slug)

    user = current_user
    employee = user&.employee

    session_participant = SessionParticipant.find_by(
        employee: employee,
        jally_session: session
    )

    render json: {
        room_slug: session_participant&.room&.slug
    }
  end
end