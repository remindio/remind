class ApplicationController < ActionController::Base
  before_action :authenticate_user!, unless: -> { request.env['PATH_INFO'] == '/' }
  protect_from_forgery except: [:create, :destroy, :update]

  def render_response(status, message)
    respond_to do |format|
      msg = { :status => status, :message => message }
      format.json  { render :json => msg }
    end
  end

  protected
    def user_in_environment?(environment_params)
      @user_environment = UserEnvironment.find_by(user_id: current_user.id, environment_id: environment_params)

      if @user_environment
        return true
      end

      return false
    end
end
