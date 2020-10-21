# == Schema Information
#
# Table name: session_participants
#
#  id               :bigint           not null, primary key
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  employee_id      :bigint           not null
#  jally_session_id :bigint           not null
#  room_id          :bigint
#
# Indexes
#
#  index_session_participants_on_employee_id       (employee_id)
#  index_session_participants_on_jally_session_id  (jally_session_id)
#  index_session_participants_on_room_id           (room_id)
#
# Foreign Keys
#
#  fk_rails_...  (employee_id => employees.id)
#  fk_rails_...  (jally_session_id => jally_sessions.id)
#  fk_rails_...  (room_id => rooms.id)
#
class SessionParticipant < ApplicationRecord
  belongs_to :employee
  belongs_to :jally_session
  belongs_to :room, optional: true
end
