# == Schema Information
#
# Table name: feedbacks
#
#  id            :bigint           not null, primary key
#  feedback_type :string
#  score         :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  employee_id   :bigint           not null
#
# Indexes
#
#  index_feedbacks_on_employee_id  (employee_id)
#
# Foreign Keys
#
#  fk_rails_...  (employee_id => employees.id)
#
class Feedback < ApplicationRecord
  belongs_to :employee
  FEEDBACK_TYPES = %w(recommend need)

  validates :feedback_type, allow_nil: false, inclusion: { in: FEEDBACK_TYPES }
end
