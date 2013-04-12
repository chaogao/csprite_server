class CreateCsprites < ActiveRecord::Migration
  def change
    create_table :csprites do |t|
      t.string :name
      t.string :description
      t.string :thumb
      t.integer :uid

      t.timestamps
    end
  end
end
