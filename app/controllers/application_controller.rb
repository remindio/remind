class ApplicationController < ActionController::Base
  before_action :authenticate_user!, unless: -> { request.env['PATH_INFO'] == '/' }

  #def after_sign_in_path_for(resource)
  #  ''
  #end
end
