class AddMetaToGameVariant < ActiveRecord::Migration[6.0]
  def change
    add_column :game_variants, :title, :string
    add_column :game_variants, :caution, :string
    add_column :game_variants, :hint, :string
  end
end
