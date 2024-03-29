class CreateTeams < ActiveRecord::Migration[6.0]
  def change
    create_table :teams do |t|
      t.references :company, null: false, foreign_key: true
      t.string :name
      t.string :slug, null: false

      t.timestamps
    end
  end
end
