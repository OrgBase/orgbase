class CompanyService
  class << self
    def find_or_create_invite_code(company_id)
      c = Company.find(company_id)

      return if c.nil?
      return c.invite_code if c.invite_code.present?

      code = SecureRandom.urlsafe_base64(8)
      while Company.find_by(invite_code: code).present?
        code = SecureRandom.urlsafe_base64(8)
      end
      c.invite_code = code
      c.save!

      c.invite_code
    end
  end
end