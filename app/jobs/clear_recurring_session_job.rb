class ClearRecurringSessionJob < ApplicationJob
  queue_as :default

  def perform(session_id)
    JallySessionService.clear_recurring_session(session_id)
  end
end