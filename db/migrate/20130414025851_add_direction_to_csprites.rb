class AddDirectionToCsprites < ActiveRecord::Migration
  def change
  	add_column :csprites, :direction, :integer, :null => false
  	add_column :csprites, :marginX, :integer, :null => false, :default => 10
  	add_column :csprites, :marginY, :integer, :null => false, :default => 10
  end
end
