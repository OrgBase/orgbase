class AddInviteCodeToCompany < ActiveRecord::Migration[6.0]
  def change
    add_column :companies, :invite_code, :string
  end
end
