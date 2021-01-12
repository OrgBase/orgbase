# == Schema Information
#
# Table name: games
#
#  id           :bigint           not null, primary key
#  game_type    :string
#  instructions :string
#  name         :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Game < ApplicationRecord
  has_many :game_variants
  GAME_TYPES = %w(ice-breaker)

  validates :game_type, allow_nil: false, inclusion: { in: GAME_TYPES }
end
