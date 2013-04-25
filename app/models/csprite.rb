class Csprite < ActiveRecord::Base
    attr_accessible :description, :name, :thumb, :direction, :marginX, :marginY

    belongs_to :user

    has_many :icons

    validates_presence_of [:name, :user_id, :direction, :marginX, :marginY]

    def self.create_by_user (params, user)
        csprite = self.new params
        csprite.user = user
        return csprite
    end

    def link(ids, override)
        icons = []
        ids.each do |id|
            icon = self.icons.find(id)
            sameNameIcon = self.icons.where({:name => icon.name, :status => 1})
            if sameNameIcon.count != 0
                sameNameIcon.each do |icon|
                    icon.destroy
                end
            end
            icon.status = 1 if icon
            if icon.save
                icons << icon
            end
        end

        if (icons.count != 0)
            return icons
        else
            return false
        end
    end
end