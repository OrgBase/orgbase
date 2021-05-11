class FeedbackController < ApplicationController
  before_action :authenticate_user!
  def show
    @type = params[:type]
  end

  def submit
    feedback_type, score = params.require([:type, :score])
    user = current_user
    employee = user&.employee

    Feedback.create!(employee: employee, feedback_type: feedback_type, score: score.to_i)

    redirect_to root_path
  end
end