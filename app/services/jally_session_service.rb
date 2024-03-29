class JallySessionService
  class << self
    def create_session(company:, created_by:, starting_game_slug:, name:nil, team:nil)
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
          name: name,
          starting_game_slug: starting_game_slug
      )

      session
    end

    def configure_session(
        session_id:,
        session_duration_seconds: 3600,
        cut_off_seconds: 900,
        room_capacity: 10,
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
      #could be a recurring session, clear the old room
      if participant.present?
        if participant.room.present?
          if participant.room.created_at > jally_session.config.scheduled_at &&
              participant.room.created_at < jally_session.config.scheduled_at + (jally_session.config.session_duration_seconds || 3600).seconds
            return participant
          end
          participant.room = nil
          participant.save!
        end
      end

      participant ||= SessionParticipant.create!(
          employee: employee,
          jally_session: jally_session
      )

      if jally_session.eligible_members_count <= 10
        room = jally_session&.rooms&.first
      else
        available_rooms = Room.where(jally_session: jally_session).select do |r|
          r.room_participants.length < 10
        end

        if available_rooms.blank?
          room = RoomService.create_room(
            company: @company,
            capacity: 10,
            jally_session: @session)
        else
          room = available_rooms.last
        end
      end

      participant.room = room
      participant.save!

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

    def clear_recurring_session(session_id)
      session = JallySession.find(session_id)
      config = session.config

      return unless config&.recurring
      #make sure its atleast 30 mins after the session has ended
      return unless DateTime.now > config.scheduled_at + (config.session_duration_seconds + 1800).seconds

      session.rooms.each(&:destroy!)
      session.session_participants.each(&:destroy!)

      config.scheduled_at += config.frequency_length.send(config.frequency_unit)
      config.save!
    end

    def upcoming_jally_sessions(employee)
      company = employee&.company
      sessions = company&.jally_sessions

      sessions.select do |session|
        config = session.config
        if config.present?
          config.scheduled_at > DateTime.now
        else
          false
        end
      end
    end

    def active_jally_sessions(employee)
      company = employee&.company
      sessions = company&.jally_sessions
      return [] if sessions.blank?

      sessions = sessions.sort_by {|s| s.config.scheduled_at}

      sessions.select do |session|
        config = session.config
        config.scheduled_at < DateTime.now && (config.scheduled_at + config.cut_off_seconds.seconds) > DateTime.now
      end
    end
  end
end