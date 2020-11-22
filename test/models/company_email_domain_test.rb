# == Schema Information
#
# Table name: company_email_domains
#
#  id         :bigint           not null, primary key
#  domain     :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  company_id :bigint           not null
#
# Indexes
#
#  index_company_email_domains_on_company_id  (company_id)
#
# Foreign Keys
#
#  fk_rails_...  (company_id => companies.id)
#
require 'test_helper'

class CompanyEmailDomainTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
