class TeamPolicy < ApplicationPolicy
  def show?
    return false if @record.blank?
    return true if user.admin?

    @employee = user.employee
    return TeamMember.where(employee: @employee, team: @record).present?
  end

  def participate?
    show?
  end
end
