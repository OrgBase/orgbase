class AddGameSlugToRoom < ActiveRecord::Migration[6.0]
  def change
    remove_column :rooms, :panel_id
    remove_column :rooms, :panel_type
    add_column :rooms, :game_slug, :string
  end
end
