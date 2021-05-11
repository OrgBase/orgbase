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
require 'test_helper'

class FeedbackTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
