class CspriteController < ApplicationController
    before_filter :auth_login

    before_filter :auth_csprite, :only => [:completed]

    PAGECOUNT = 8

    def index
        redirect_page(0)
    end

    # csprite/{:id}/page
    def page
        @pageNum = calc_pagenum
        @currentPage = params[:id].to_i || 0
        @cspritesOutput = @currentUser.csprites.limit(PAGECOUNT).offset(@currentPage * PAGECOUNT)
        if @cspritesOutput.count == 0 && @currentPage != 0
            redirect_page(0)
        end
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

    def redirect_page(id) 
        redirect_to :action => :page, :id => id
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

    def calc_pagenum
        if @currentUser.csprites.count == 0
            @noProject = true
        end
        ((@currentUser.csprites.count + 1) / PAGECOUNT).to_i + 1
    end
end
