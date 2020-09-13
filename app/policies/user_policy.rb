class UserPolicy < ApplicationPolicy
  def participate?
    return false if @record.blank?
    return true if @record.admin?
    return @record.employee&.company.present?
  end
end
