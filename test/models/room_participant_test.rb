# == Schema Information
#
# Table name: room_participants
#
#  id          :bigint           not null, primary key
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
require 'test_helper'

class RoomParticipantTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
