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
        room_capacity: 2,
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

  end
end