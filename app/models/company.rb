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
  before_create :generate_slug
  has_many :jally_sessions
  has_many :employees

  private
  def generate_slug
    self.slug = self.name.parameterize if self.slug.nil?
    idx=1

    while Company.find_by(slug: self.slug).present?
      trailing_numbers = self.slug[/\d+$/]&.to_i
      if trailing_numbers.present?
        self.slug = self.slug[0..-(trailing_numbers.to_s.length + 1)] + (trailing_numbers + 1).to_s
      else
        self.slug += idx.to_s
      end
      idx += 1
    end
  end
end
