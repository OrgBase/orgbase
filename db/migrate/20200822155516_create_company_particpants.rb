class CreateCompanyParticpants < ActiveRecord::Migration[6.0]
  def change
    create_table :company_particpants do |t|
      t.references :user, null: false, foreign_key: true
      t.references :company, null: false, foreign_key: true
      t.string :role, null: false

      t.timestamps
    end
  end
end
