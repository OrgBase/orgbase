# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  admin                  :boolean
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  name                   :string
#  provider               :string
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  sign_in_token          :string
#  sign_in_token_sent_at  :datetime
#  uid                    :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :omniauthable

  validates :email, presence: true
  has_one :employee
  has_one :company, through: :employee

  def first_name
    name.split.select { |x| ["Mrs.", "Mrs", "Ms.", "Ms", "M/s.", "M/s", "Mr.", "Mr", "Dr.", "Dr"].exclude?(x) }.first
  end

  def last_name
    if name.split.length > 1
      name.split.last
    else
      ""
    end
  end

  def remember_me
    (super == nil) ? "1" : super
  end
end
