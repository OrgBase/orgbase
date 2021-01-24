class RemoveConfigFromGame < ActiveRecord::Migration[6.0]
  def change
    remove_column :games, :game_type, :string
    remove_column :games, :instructions, :string
    remove_column :games, :name, :string
  end
end
