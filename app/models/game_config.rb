# == Schema Information
#
# Table name: game_configs
#
#  id                        :bigint           not null, primary key
#  game_type                 :string
#  instructions              :string
#  name                      :string
#  winner_selection_criteria :string
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#  game_id                   :bigint           not null
#
# Indexes
#
#  index_game_configs_on_game_id  (game_id)
#
# Foreign Keys
#
#  fk_rails_...  (game_id => games.id)
#
class GameConfig < ApplicationRecord
  belongs_to :game
  GAME_TYPES = %w(ice-breaker default-game)

  validates :game_type, allow_nil: false, inclusion: { in: GAME_TYPES }
end
