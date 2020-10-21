class AddSessionToRoom < ActiveRecord::Migration[6.0]
  def change
    add_reference :rooms, :jally_session, null: true, foreign_key: true
  end
end
