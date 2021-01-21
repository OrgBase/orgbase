# == Schema Information
#
# Table name: games
#
#  id         :bigint           not null, primary key
#  slug       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Game < ApplicationRecord
  has_many :game_variants
  has_one :game_config
end
