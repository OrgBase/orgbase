# == Schema Information
#
# Table name: jally_session_settings
#
#  id                       :bigint           not null, primary key
#  cut_off_seconds          :integer
#  frequency_length         :integer
#  frequency_unit           :string
#  party                    :boolean
#  recurring                :boolean
#  room_capacity            :integer
#  scheduled_at             :datetime
#  session_duration_seconds :integer
#  switch_after_seconds     :integer
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#  jally_session_id         :bigint           not null
#
# Indexes
#
#  index_jally_session_settings_on_jally_session_id  (jally_session_id)
#
# Foreign Keys
#
#  fk_rails_...  (jally_session_id => jally_sessions.id)
#
class JallySessionSetting < ApplicationRecord
  belongs_to :jally_session
  after_create :schedule_clear_session_job


  FREQUENCY_UNITS = %w(days weeks months)

  validates :frequency_unit, allow_nil: true, inclusion: { in: FREQUENCY_UNITS }
  validates :scheduled_at, presence: true
  validates :cut_off_seconds, presence: true

  private
  def schedule_clear_session_job
    return unless recurring
    job_schedule_time = scheduled_at + (session_duration_seconds + 3600).seconds
    ClearRecurringSessionJob.set(wait_until: job_schedule_time).perform_later(session_id)
  end
end
