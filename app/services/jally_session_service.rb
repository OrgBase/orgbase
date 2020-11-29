class JallySessionService
  class << self
    def create_session(company:, created_by:, name:nil, team:nil)
      slug = SecureRandom.urlsafe_base64(6)
      while (JallySession.find_by(slug: slug).present?)
        # TODO: add slack notification here to increase slug length
        slug = SecureRandom.urlsafe_base64(6)
      end

      session = JallySession.create!(
          company: company,
          slug: slug,
          created_by: created_by,
          team: team,
          name: name
      )

      session
    end

    def configure_session(
        session_id:,
        session_duration_seconds: 3600,
        cut_off_seconds: 900,
        room_capacity: 3,
        party: false,
        switch_after_seconds: nil,
        recurring: false,
        scheduled_at: DateTime.now,
        frequency_length: nil,
        frequency_unit: nil
    )
      JallySessionSetting.create!(
          jally_session_id: session_id,
          session_duration_seconds: session_duration_seconds,
          cut_off_seconds: cut_off_seconds,
          room_capacity:room_capacity,
          party: party,
          switch_after_seconds: switch_after_seconds,
          recurring: recurring,
          scheduled_at: scheduled_at,
          frequency_length: frequency_length,
          frequency_unit: frequency_unit
      )
    end

    def create_or_clear_participant(employee:, jally_session:)
      participant = SessionParticipant.find_by(employee: employee, jally_session: jally_session)
      if participant.present?
        if participant.room.present?
          if participant.room.created_at > jally_session.config.scheduled_at &&
              participant.room.created_at < jally_session.config.scheduled_at + (jally_session.config.session_duration_seconds).seconds
            return participant
          end
          participant.room = nil
          participant.save!
        end
      else
        participant = SessionParticipant.create!(
            employee: employee,
            jally_session: jally_session
        )
      end

      participant
    end

    def create_account_and_send_invite(invitee, company, invited_by_user)
      invited_user = ''

      skip_invitation = false
      if invitee[:value].is_a? Integer
        skip_invitation = true
        invited_user_id = invitee[:value]
        invited_user = User.find(invited_user_id)
        invited_employee = Employee.find_by(user: invited_user)
      elsif invitee[:value] =~ Devise.email_regexp
        invited_user = User.find_by(email: invitee[:value])
        skip_invitation = invited_user.present? #account exists
        invited_user ||= User.create!(email: invitee[:value],
                                      password: SecureRandom.alphanumeric(8))
        invited_employee = invited_user&.employee
        invited_employee ||= Employee.create!(user: invited_user, company: company)
      end
      if invited_employee.present?
        PasswordlessLinkService.new(invited_user).send_token!(invite: true,
                                                              invited_by_user: invited_by_user) if !skip_invitation
      end
    end
  end
end