class ApplicationController < ActionController::Base
  protect_from_forgery

  protected
  def auth_login
  	unless session[:uid]
  		redirect_to :controller => :user, :action => :login
  	else
  		self.current_user
  	end
  end

  def current_user
  	@currentUser = User.find_by_id session[:uid]
  end

  def redirect_home
    redirect_to :controller => :csprite, :action => :index
  end
end
