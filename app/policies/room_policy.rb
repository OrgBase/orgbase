class RoomPolicy < ApplicationPolicy
  def update?
    return false if @record.blank?
    return true if user.admin?
    return user&.employee&.company == @record.company
  end

  def join?
    return false if @record.blank?
    return true if user.admin?

    @record.session_participants.map(&:employee).map(&:user_id).include? user.id
  end
end
