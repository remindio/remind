class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  protect_from_forgery except: [:create, :destroy, :update]
  
  #def after_sign_in_path_for(resource)
  #  ''
  #end

  def render_response(status, message)
    respond_to do |format|
      msg = { :status => status, :message => message }
      format.json  { render :json => msg } # don't do msg.to_json
    end
  end
end
