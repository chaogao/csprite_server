class AdstatusToIcons < ActiveRecord::Migration
	def change
		add_column :icons, :status, :integer, :default => 0, :null => false
	end
end
