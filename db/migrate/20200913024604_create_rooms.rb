class CreateRooms < ActiveRecord::Migration[6.0]
  def change
    create_table :rooms do |t|
      t.string :slug
      t.integer :capacity
      t.string :panel_type
      t.bigint :panel_id

      t.timestamps
    end
    add_index :rooms, :slug, unique: true
  end
end
