# == Schema Information
#
# Table name: team_members
#
#  id          :bigint           not null, primary key
#  role        :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  employee_id :bigint           not null
#  team_id     :bigint           not null
#
# Indexes
#
#  index_team_members_on_employee_id  (employee_id)
#  index_team_members_on_team_id      (team_id)
#
# Foreign Keys
#
#  fk_rails_...  (employee_id => employees.id)
#  fk_rails_...  (team_id => teams.id)
#
class TeamMember < ApplicationRecord
  belongs_to :team
  belongs_to :employee
end
