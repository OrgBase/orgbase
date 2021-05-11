class FeedbackController < ApplicationController
  before_action :authenticate_user!
  def show
    @type = params[:type]
  end

  def submit
    feedback_type, score = params.require([:type, :score])
    user = current_user
    employee = user&.employee

    Feedback.create!(employee: employee, feedback_type: feedback_type, score: score&.to_i)

    message = "New feedback from #{user.name}(#{user.email}) of #{employee.company.name} : "

    if feedback_type == 'recommend'
      message += "Likehood to recommend to others: #{score}/10"
    else
      feelings = ["", "Not Disappointed", "Somewhat disappointed", "Very disappointed"]
      message += "Feeling if they can't use jally: #{feelings[score&.to_i]}"
    end

    Slack.send_message("#user-activity", message)

    redirect_to root_path
  end
end