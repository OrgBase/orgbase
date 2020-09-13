class RoomPolicy < ApplicationPolicy
  def update?
    return false if @record.blank?
    return true if user.admin?
    return user&.employee&.company == @record.company
  end
end
