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
class Room < ApplicationRecord
  has_many :room_participants, dependent: :destroy
  has_many :employees, through: room_participants
end
