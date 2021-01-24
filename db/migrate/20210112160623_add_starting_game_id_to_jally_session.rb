class AddStartingGameIdToJallySession < ActiveRecord::Migration[6.0]
  def change
    add_reference :jally_sessions, :starting_game, references: :games
  end
end
