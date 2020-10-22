class MatchSessionParticipantJob < ApplicationJob
  queue_as :default

  def perform(participant_id, room_capacity)
    session_participant = SessionParticipant.find(participant_id)
    session = session_participant.jally_session
    employee = session_participant.employee
    participant_match = SessionParticipant.where(
        jally_session: session,
        room: nil
    ).where.not(id: participant_id).sample
    if participant_match.present?
      ActiveRecord::Base.transaction do
        room = RoomService.create_room(company: employee.company, capacity: room_capacity)
        room.jally_session = session
        room.save!

        session_participant.room = room
        session_participant.save!
        participant_match.room = room
        participant_match.save!
      end
    end
  end
end