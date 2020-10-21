class CreateJallySessions < ActiveRecord::Migration[6.0]
  def change
    create_table :jally_sessions do |t|
      t.text :slug
      t.references :company, null: false, foreign_key: true
      t.references :team, null: true, foreign_key: true
      t.references :created_by, index: true, foreign_key: {to_table: :users, column: :created_by_id}

      t.timestamps
    end
  end
end
