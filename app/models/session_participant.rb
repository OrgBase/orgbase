class SessionParticipant < ApplicationRecord
  belongs_to :employee
  belongs_to :jally_session
  belongs_to :room, optional: true
end
