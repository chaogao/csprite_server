class ChangeAuthFromCsprites < ActiveRecord::Migration
  def change
  	change_column :csprites, :uid, :integer, :null => false
  	change_column :csprites, :name, :string, :null => false
  end
end
