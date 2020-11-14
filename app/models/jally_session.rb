# == Schema Information
#
# Table name: jally_sessions
#
#  id            :bigint           not null, primary key
#  name          :string
#  slug          :text
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  company_id    :bigint           not null
#  created_by_id :bigint
#  team_id       :bigint
#
# Indexes
#
#  index_jally_sessions_on_company_id     (company_id)
#  index_jally_sessions_on_created_by_id  (created_by_id)
#  index_jally_sessions_on_slug           (slug)
#  index_jally_sessions_on_team_id        (team_id)
#
# Foreign Keys
#
#  fk_rails_...  (company_id => companies.id)
#  fk_rails_...  (created_by_id => users.id)
#  fk_rails_...  (team_id => teams.id)
#
class JallySession < ApplicationRecord
  belongs_to :company
  belongs_to :team, optional: true
  belongs_to :created_by, class_name: "User", foreign_key: "created_by_id"

  has_one :jally_session_setting

  def config
    jally_session_setting
  end
end
