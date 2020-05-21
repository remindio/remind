class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  protect_from_forgery except: [:create, :destroy, :update]

  def render_response(status, message)
    respond_to do |format|
      msg = { :status => status, :message => message }
      format.json  { render :json => msg }
    end
  end
end
