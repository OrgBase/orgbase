# == Schema Information
#
# Table name: room_configs
#
#  id                    :bigint           not null, primary key
#  game_slug             :string
#  random_fraction       :decimal(, )      default(0.245118596034709)
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  active_participant_id :bigint
#  room_id               :bigint           not null
#
# Indexes
#
#  index_room_configs_on_active_participant_id  (active_participant_id)
#  index_room_configs_on_room_id                (room_id)
#
# Foreign Keys
#
#  fk_rails_...  (active_participant_id => room_participants.id)
#  fk_rails_...  (room_id => rooms.id)
#
require 'test_helper'

class RoomConfigTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
