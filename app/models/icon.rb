class Icon < ActiveRecord::Base
  attr_accessible :name, :url

  belongs_to :csprite

  validates_presence_of [:csprite_id, :name, :url]

  def self.create_by_csprite(params, csprite)
  	icon = self.new params
  	icon.csprite = csprite
  	return icon
  end

end
