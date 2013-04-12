class CspriteController < ApplicationController
    before_filter :auth_login

    before_filter :auth_csprite, :include => [:completed]

    def index
    end

    def new
        @csprite = Csprite.new
    end

    def create
        @csprite = Csprite.create_by_user(params[:csprite], @currentUser)
        if @csprite.save
            redirect_completed(@csprite.id)
        else
            render :new
        end
    end

    #get csprite/{:id}/completed
    def completed

    end

    private 
    def redirect_new
        redirect_to :action => :new
    end

    def redirect_list
        redirect_to :action => :index
    end

    def redirect_completed(id)
        redirect_to :action => :completed, :id => id
    end

    def auth_csprite
        if params[:id]
            csprite = Csprite.find_by_id(params[:id])
            if csprite && csprite.user == @currentUser
                @currentCsprite = csprite
            else
                redirect_list
            end
        end
    end
end
