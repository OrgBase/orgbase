class AddColorAndScoreToRoomParticipant < ActiveRecord::Migration[6.0]
  def change
    add_column :room_participants, :color, :string
    add_column :room_participants, :score, :integer, default: 0
  end
end
