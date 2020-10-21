class CreateJallySessionSettings < ActiveRecord::Migration[6.0]
  def change
    create_table :jally_session_settings do |t|
      t.references :jally_session, null: false, foreign_key: true
      t.integer :session_duration_seconds
      t.integer :room_capacity
      t.integer :cut_off_seconds
      t.datetime :scheduled_at
      t.boolean :recurring
      t.integer :frequency_length
      t.string :frequency_unit
      t.boolean :party
      t.integer :switch_after_seconds

      t.timestamps
    end
  end
end
