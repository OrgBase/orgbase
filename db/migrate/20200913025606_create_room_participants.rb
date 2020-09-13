class CreateRoomParticipants < ActiveRecord::Migration[6.0]
  def change
    create_table :room_participants do |t|
      t.references :room
      t.references :employee

      t.timestamps
    end
  end
end
