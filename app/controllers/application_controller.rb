class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  protect_from_forgery except: :create
  
  #def after_sign_in_path_for(resource)
  #  ''
  #end
end
