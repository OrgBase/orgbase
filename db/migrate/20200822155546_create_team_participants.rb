class CreateTeamParticipants < ActiveRecord::Migration[6.0]
  def change
    create_table :team_participants do |t|
      t.references :team, null: false, foreign_key: true
      t.references :employee, null: false, foreign_key: true
      t.string :role, null: false

      t.timestamps
    end
  end
end
