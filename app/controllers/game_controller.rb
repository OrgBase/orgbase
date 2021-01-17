class GameController < ApplicationController
  before_action :authenticate_user!

  def game_data
    params.permit(:game_slug)

    slug = params[:game_slug]

    game = Game.find_by(slug: slug) if slug.present?

    if game.present?
      return render json: { title: game.name, instructions: game.instructions,
                            variants: game.game_variants, type: game.game_type}
    end
  end
end