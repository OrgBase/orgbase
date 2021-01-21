# == Schema Information
#
# Table name: room_participants
#
#  id          :bigint           not null, primary key
#  color       :string
#  score       :integer          default(0)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  employee_id :bigint
#  room_id     :bigint
#
# Indexes
#
#  index_room_participants_on_employee_id  (employee_id)
#  index_room_participants_on_room_id      (room_id)
#
class RoomParticipant < ApplicationRecord
  belongs_to :room
  belongs_to :employee
end
