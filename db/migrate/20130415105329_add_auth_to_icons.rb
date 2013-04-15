class AddAuthToIcons < ActiveRecord::Migration
  def change
  	change_column :icons, :name, :string, :null => false
  	change_column :icons, :url, :string, :null => false
  	change_column :icons, :csprite_id, :integer, :null => false
  end
end
