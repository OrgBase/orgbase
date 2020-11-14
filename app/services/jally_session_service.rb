class JallySessionService
  class << self
    def create_session(company:, created_by:, team:nil)
      slug = SecureRandom.urlsafe_base64(6)
      while (JallySession.find_by(slug: slug).present?)
        # TODO: add slack notification here to increase slug length
        slug = SecureRandom.urlsafe_base64(6)
      end

      session = JallySession.create!(
          company: company,
          slug: slug,
          created_by: created_by,
          team: team
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
              participant.room.created_at < jally_session.config.scheduled_at + (jally_session.config.cut_off_seconds+5).seconds
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

      MatchSessionParticipantJob.perform_later(participant.id, 2)

      participant
    end

  end
end