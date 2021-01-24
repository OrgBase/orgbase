class RemoveConfigFromRoom < ActiveRecord::Migration[6.0]
  def change
    remove_column :rooms, :game_slug, :string
    remove_column :rooms, :random_fraction, :decimal
  end
end
