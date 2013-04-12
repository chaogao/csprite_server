class ChangeUidFromCsprites < ActiveRecord::Migration
  def up
  	rename_column :csprites, :uid, :user_id
  end

  def down
  end
end
