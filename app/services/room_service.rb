class RoomService
  class << self
    def create_room(company:, capacity:, jally_session:)
      slug = SecureRandom.urlsafe_base64(8)
      while (Room.find_by(slug: slug).present?)
        slug = SecureRandom.urlsafe_base64(8)
      end

      room = Room.create!(
          company: company,
          slug: slug,
          capacity: capacity,
          jally_session: jally_session
      )

      room
    end

    def create_room_participant(room:, employee:)
      participant = RoomParticipant.create!(
          room: room,
          employee: employee
      )

      participant
    end

    def create_room_for_group(group, capacity)
      session = group.last&.jally_session
      company = session&.company
      return if company.blank?
      room = create_room(company:company, capacity:capacity)
      room.jally_session = session
      room.save!

      if group.length <= capacity
        group.each do |session_participant|
          session_participant.room = room
          session_participant.save!
        end
      end
    end
  end
end