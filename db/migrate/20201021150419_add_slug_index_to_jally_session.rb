class AddSlugIndexToJallySession < ActiveRecord::Migration[6.0]
  def change
    add_index :jally_sessions, :slug
  end
end
