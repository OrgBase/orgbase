class GameController < ApplicationController
  before_action :authenticate_user!

  def game_data
    params.permit(:game_id)

    id = params[:game_id]

    game = Game.find(id) if id.present?

    if game.present?
      return render json: { title: game.name, instructions: game.instructions, variants: game.game_variants}
    end
  end
end