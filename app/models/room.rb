# == Schema Information
#
# Table name: rooms
#
#  id               :bigint           not null, primary key
#  capacity         :integer
#  panel_type       :string
#  slug             :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  company_id       :bigint           not null
#  jally_session_id :bigint
#  panel_id         :bigint
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
class Room < ApplicationRecord
  belongs_to :company
  belongs_to :jally_session, optional: true
  has_many :room_participants, dependent: :destroy
  has_many :employees, through: :room_participants

  PANEL_TYPES = %w(short-game ice-breaker)

  validates :panel_type, allow_nil: true, inclusion: { in: PANEL_TYPES }
end
