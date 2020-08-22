# == Schema Information
#
# Table name: company_participants
#
#  id         :bigint           not null, primary key
#  role       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  company_id :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_company_participants_on_company_id  (company_id)
#  index_company_participants_on_user_id     (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (company_id => companies.id)
#  fk_rails_...  (user_id => users.id)
#
class CompanyParticipant < ApplicationRecord
  belongs_to :user
  belongs_to :company
end
