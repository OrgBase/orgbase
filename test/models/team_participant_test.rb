# == Schema Information
#
# Table name: team_participants
#
#  id          :bigint           not null, primary key
#  role        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  employee_id :bigint           not null
#  team_id     :bigint           not null
#
# Indexes
#
#  index_team_participants_on_employee_id  (employee_id)
#  index_team_participants_on_team_id      (team_id)
#
# Foreign Keys
#
#  fk_rails_...  (employee_id => employees.id)
#  fk_rails_...  (team_id => teams.id)
#
require 'test_helper'

class TeamParticipantTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
