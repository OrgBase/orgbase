class AddNameToJallySession < ActiveRecord::Migration[6.0]
  def change
    add_column :jally_sessions, :name, :string
  end
end
