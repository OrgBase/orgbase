class AddCompanyToRoom < ActiveRecord::Migration[6.0]
  def change
    add_reference :rooms, :company, null: false, foreign_key: true
  end
end
