class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.integer :uid, :null => false
      t.string :uname, :null => false
      t.string :uemail, :null => false
      t.string :upasswd, :null => false
      t.string :salt, :null => false

      t.timestamps
    end
  end
end
