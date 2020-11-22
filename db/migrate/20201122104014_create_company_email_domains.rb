class CreateCompanyEmailDomains < ActiveRecord::Migration[6.0]
  def change
    create_table :company_email_domains do |t|
      t.references :company, null: false, foreign_key: true
      t.string :domain

      t.timestamps
    end
  end
end
