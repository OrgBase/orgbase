# == Schema Information
#
# Table name: companies
#
#  id         :bigint           not null, primary key
#  country    :string
#  icon_url   :string
#  name       :string           not null
#  slug       :string           not null
#  website    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Company < ApplicationRecord
end
