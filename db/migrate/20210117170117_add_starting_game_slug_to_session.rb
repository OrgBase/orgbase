class AddStartingGameSlugToSession < ActiveRecord::Migration[6.0]
  def change
    remove_column :jally_sessions, :starting_game_id
    add_column :jally_sessions, :starting_game_slug, :string
  end
end
