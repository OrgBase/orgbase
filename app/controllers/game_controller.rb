class GameController < ApplicationController
  before_action :authenticate_user!

  def game_data
    params.permit(:game_slug)

    slug = params[:game_slug]

    game = Game.find_by(slug: slug) if slug.present?
    config = game&.game_config

    if config.present?
      return render json: { title: config.name, instructions: config.instructions,
                            variants: game.game_variants, type: config.game_type,
                            winnerSelectionCriteria: config.winner_selection_criteria}
    end
  end
end