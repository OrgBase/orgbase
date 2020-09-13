# == Schema Information
#
# Table name: rooms
#
#  id         :bigint           not null, primary key
#  capacity   :integer
#  panel_type :string
#  slug       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  panel_id   :bigint
#
# Indexes
#
#  index_rooms_on_slug  (slug) UNIQUE
#
require 'test_helper'

class RoomTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
