class TeamParticipantsToTeamMembers < ActiveRecord::Migration[6.0]
  def self.up
    rename_table :team_participants, :team_members
  end

  def self.down
    rename_table :team_members, :team_participants
  end
end
