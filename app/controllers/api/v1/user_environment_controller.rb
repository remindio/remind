class Api::V1::UserEnvironmentController < ApplicationController
  def create
    @users_email = user_environment_params
    @users_email.each do |user_email|
      @user = User.find_by(email: user_email["email"])
      @user_environment = UserEnvironment.create(user_id: @user.id, environment_id: params[:environment_id])
    end
    render_response("success", "OK!")
  end

  private
    def user_environment_params
      params.require(:users)
    end
end
