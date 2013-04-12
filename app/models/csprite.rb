class Csprite < ActiveRecord::Base
	attr_accessible :description, :name, :thumb

	belongs_to :user

	validates_presence_of [:name, :user_id]

	def self.create_by_user (csprite, user)
		csprite = self.new csprite
		csprite.user = user
		return csprite
	end
end
