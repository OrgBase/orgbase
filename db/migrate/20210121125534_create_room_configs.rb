class CreateRoomConfigs < ActiveRecord::Migration[6.0]
  def change
    create_table :room_configs do |t|
      t.references :room, null: false, foreign_key: true
      t.string :game_slug
      t.decimal :random_fraction, default: rand()
      t.references :active_participant, index: true, foreign_key: {to_table: :room_participants, column: :active_participant_id}

      t.timestamps
    end
  end
end
