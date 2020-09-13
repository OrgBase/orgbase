class RoomService
  class << self
    def create_room(company:, capacity:)
      slug = SecureRandom.urlsafe_base64(6)
      while (Room.find_by(slug: slug).present?)
        slug = SecureRandom.urlsafe_base64(6)
      end

      room = Room.create!(
          company: company,
          slug: slug,
          capacity: capacity
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
  end
end