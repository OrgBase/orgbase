class CreateGameVariants < ActiveRecord::Migration[6.0]
  def change
    create_table :game_variants do |t|
      t.references :game, null: false, foreign_key: true
      t.string :variant

      t.timestamps
    end
  end
end
