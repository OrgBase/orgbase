class ChangeFeedbackType < ActiveRecord::Migration[6.0]
  def change
    rename_column :feedbacks, :type, :feedback_type
  end
end
