class CompanyPolicy < ApplicationPolicy
  def show?
    return true if user.admin?
    return true if user.employee&.company == @record
    return false
  end
end
