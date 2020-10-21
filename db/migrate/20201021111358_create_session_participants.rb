class CreateSessionParticipants < ActiveRecord::Migration[6.0]
  def change
    create_table :session_participants do |t|
      t.references :employee, null: false, foreign_key: true
      t.references :jally_session, null: false, foreign_key: true
      t.references :room, null: true, foreign_key: true

      t.timestamps
    end
  end
end
