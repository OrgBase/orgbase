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
  after_save :schedule_participant_matching

  #make sure any additions here will work for adding to DateTime i.e 2.days, 3.weeks, 1.months etc.
  FREQUENCY_UNITS = %w(days weeks months)

  validates :frequency_unit, allow_nil: true, inclusion: { in: FREQUENCY_UNITS }
  validates :scheduled_at, presence: true
  validates :cut_off_seconds, presence: true

  private
  def schedule_participant_matching
    if saved_change_to_attribute?("scheduled_at")
      if scheduled_at + 20.seconds >= DateTime.now
        start_at = scheduled_at
        cut_off_time = scheduled_at + cut_off_seconds.seconds
        while start_at < cut_off_time
          MatchSessionParticipantJob.set(wait_until: start_at).perform_later(jally_session_id)
          start_at += 20.seconds
        end
      end

      return unless recurring
      job_schedule_time = scheduled_at + (session_duration_seconds + 3600).seconds
      ClearRecurringSessionJob.set(wait_until: job_schedule_time).perform_later(jally_session_id)
    end
  end
end
