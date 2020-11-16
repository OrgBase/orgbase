class AddRandomFractiontoRoom < ActiveRecord::Migration[6.0]
  def change
    add_column :rooms, :random_fraction, :decimal, :default => 0.0
  end
end
