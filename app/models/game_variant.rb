# == Schema Information
#
# Table name: game_variants
#
#  id         :bigint           not null, primary key
#  variant    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  game_id    :bigint           not null
#
# Indexes
#
#  index_game_variants_on_game_id  (game_id)
#
# Foreign Keys
#
#  fk_rails_...  (game_id => games.id)
#
class GameVariant < ApplicationRecord
  belongs_to :game
end
