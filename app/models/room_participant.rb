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
  before_save :assign_color

  COLORS = %w(#00D5E0 #6c63ff #db61cf #ff7a41 #04cc78 #4ea1ff #9738d1 #fc6c7f #FFE500)

  private
  def assign_color
    i = self.room.room_participants.count % 9
    self.color = COLORS[i]
  end
end
