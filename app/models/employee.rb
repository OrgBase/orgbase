# == Schema Information
#
# Table name: employees
#
#  id         :bigint           not null, primary key
#  slug       :string           not null
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  company_id :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_employees_on_company_id  (company_id)
#  index_employees_on_user_id     (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (company_id => companies.id)
#  fk_rails_...  (user_id => users.id)
#
class Employee < ApplicationRecord
  before_save :generate_slug
  belongs_to :user
  belongs_to :company
  has_many :room_participants, dependent: :destroy
  has_many :rooms, through: :room_participants

  private
  def generate_slug
    self.slug = self.user.name.parameterize if self.slug.nil?
    idx=1

    while Employee.find_by(slug: self.slug).present?
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
