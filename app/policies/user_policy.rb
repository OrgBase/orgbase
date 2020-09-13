class UserPolicy < ApplicationPolicy
  def participate?
    return false if @record.blank?
    return true if user.admin?
    return @record.employee&.company.present?
  end
end
