# == Schema Information
#
# Table name: rooms
#
#  id               :bigint           not null, primary key
#  capacity         :integer
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
class Room < ApplicationRecord
  belongs_to :company
  belongs_to :jally_session, optional: true
  has_many :room_participants, dependent: :destroy
  has_many :employees, through: :room_participants
  has_many :session_participants
  has_one :room_config

  def room_participants_data
    room_participants.map do |participant|
      {name: participant.employee.user.first_name,
       identity: participant.employee_id, color: participant.color,
       score: participant.score}
    end
  end
end
