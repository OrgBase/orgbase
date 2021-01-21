class CreateGameConfigs < ActiveRecord::Migration[6.0]
  def change
    create_table :game_configs do |t|
      t.references :game, null: false, foreign_key: true
      t.string :game_type
      t.string :name
      t.string :instructions
      t.string :winner_selection_criteria

      t.timestamps
    end
  end
end
