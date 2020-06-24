class Api::V1::UserEnvironmentController < ApplicationController
  def create
    # @users_email = user_environment_params
    # @users_email.each do |user_email|
    #   @user = User.find_by(email: user_email["email"])
    #   @user_environment = UserEnvironment.create(user_id: @user.id, environment_id: params[:environment_id])
    # end
    # render_response("success", "OK!")

    @user_email = user_environment_params
    @user = User.find_by(email: @user_email["email"])

    if @user
      @user_environment = UserEnvironment.create(user_id: @user.id, environment_id: params[:environment_id])
      url = @user.avatar.attached? ? rails_blob_path(@user.avatar, only_path: true) : ""
      render_response("success", { :id => @user.id, :name => @user.name, :avatar => url})
    else
      render_response("error", "User not found!")
    end
  end

  def destroy
    @user_environment = UserEnvironment.find_by(user_id: params[:id], environment_id: params[:environment_id])
    @environment = Environment.find(params[:environment_id])

    if @user_environment && current_user.id == @environment.created_by
      @user_environment.delete
      render_response("success", "OK!")
    else
      render_response("error", "Try again!")
    end
  end

  private
    def user_environment_params
      params.require(:user)
    end
end
