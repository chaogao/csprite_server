# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130417022543) do

  create_table "csprites", :force => true do |t|
    t.string   "name",                        :null => false
    t.string   "description"
    t.string   "thumb"
    t.integer  "user_id",                     :null => false
    t.datetime "created_at",                  :null => false
    t.datetime "updated_at",                  :null => false
    t.integer  "direction",                   :null => false
    t.integer  "marginX",     :default => 10, :null => false
    t.integer  "marginY",     :default => 10, :null => false
  end

  create_table "icons", :force => true do |t|
    t.string   "name",                      :null => false
    t.string   "url",                       :null => false
    t.integer  "csprite_id",                :null => false
    t.datetime "created_at",                :null => false
    t.datetime "updated_at",                :null => false
    t.integer  "status",     :default => 0, :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "uname",      :null => false
    t.string   "uemail",     :null => false
    t.string   "upasswd",    :null => false
    t.string   "salt",       :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

end
