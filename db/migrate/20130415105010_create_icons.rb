class CreateIcons < ActiveRecord::Migration
  def change
    create_table :icons do |t|
      t.string :name
      t.string :url
      t.integer :csprite_id

      t.timestamps
    end
  end
end
