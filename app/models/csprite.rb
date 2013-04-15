class Csprite < ActiveRecord::Base
	attr_accessible :description, :name, :thumb, :direction, :marginX, :marginY

	belongs_to :user

	validates_presence_of [:name, :user_id, :direction, :marginX, :marginY]

	def self.create_by_user (params, user)
		csprite = self.new params
		csprite.user = user
		return csprite
	end
end
