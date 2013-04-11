class UserController < ApplicationController
  before_filter :login_redirect, :except => [:logout]

  def login
    if request.post?
      user = User.check_password(params[:user][:uemail], params[:user][:passwd])
      if user
        session[:uid] = user.id
        redirect_home      
      else
        redirect_to :action => :login
      end
    else
      @user = User.new
    end
  end

  def logout
    session[:uid] = nil
    redirect_to :action => :login   
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(params[:user])
    if @user.save
      flash[:succ] = "Registe Success!"
      redirect_to :action => :login
    else
      render :new
    end
  end

  private
  def login_redirect
    if session[:uid]
      redirect_home
    end
  end

end