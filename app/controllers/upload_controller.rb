require 'mybucket/csprite'

class UploadController < ApplicationController
    def upload
        if request.post?
            file = params[:Filedata]
            render_error("no avivabled file.") if !file
            if save(file, params[:csprite_id])
                render :text => "saved"
            else
                render_error("unkonwn error")
            end
        else 
            render_error("only for post")
        end
    end

    private 
    def get_file_name(filename)
        if !filename.nil?
            Time.now.strftime("%Y_%m_%d_%H_%M_%S") + '_' + filename             
        end
    end

    def render_error(msg)
        render :text => msg, :status => 403
    end

    def save(file, csprite_id)
        csprite = Csprite.find(csprite_id)
        render_error "no avivabled csprite" if !csprite

        filename = get_file_name(params[:Filedata].original_filename)
        CspriteBucket.store(filename, file)
        img = CspriteBucket.find(filename)

        icon = Icon.create_by_csprite({:name => params[:Filedata].original_filename, :url => img.url(:authenticated => false)}, csprite)
        if icon.save
            return true
        else
            return false
        end
    end
end
