class MatchSessionParticipantJob < ApplicationJob
  queue_as :default

  def perform(session_id, room_capacity=3)
    session = JallySession.find(session_id)
    participants = session&.session_participants
    return if participants.blank?
    num_participants = participants.length

    if num_participants == 1
      room_with_space = session.rooms.find do |room|
        room.session_participants.length < room_capacity
      end

      return if room_with_space.blank?

      session_participant = participants.last
      session_participant.room = room_with_space
      session_participant.save!
    end

    participants = participants.shuffle

    groups = []
    if (num_participants % 2) == 1
      groups.push participants.pop(3)
    end

    groups += participants.each_slice(2).to_a

    groups.each do |group|
      RoomService.create_room_for_group(group, room_capacity)
    end
  end
end