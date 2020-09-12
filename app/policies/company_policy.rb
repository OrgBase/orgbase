class CompanyPolicy < ApplicationPolicy
  def show?
    return false if @record.blank?
    return true if user.admin?
    return true if user.employee&.company == @record
    return false
  end
end
