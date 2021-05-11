class CreateFeedbacks < ActiveRecord::Migration[6.0]
  def change
    create_table :feedbacks do |t|
      t.references :employee, null: false, foreign_key: true
      t.integer :score
      t.string :type

      t.timestamps
    end
  end
end
