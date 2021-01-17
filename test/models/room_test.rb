# == Schema Information
#
# Table name: rooms
#
#  id               :bigint           not null, primary key
#  capacity         :integer
#  game_slug        :string
#  random_fraction  :decimal(, )      default(0.0)
#  slug             :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  company_id       :bigint           not null
#  jally_session_id :bigint
#
# Indexes
#
#  index_rooms_on_company_id        (company_id)
#  index_rooms_on_jally_session_id  (jally_session_id)
#  index_rooms_on_slug              (slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (company_id => companies.id)
#  fk_rails_...  (jally_session_id => jally_sessions.id)
#
require 'test_helper'

class RoomTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
