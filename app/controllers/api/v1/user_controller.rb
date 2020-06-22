class Api::V1::UserController < ApplicationController

  def index
    @user = User.find(current_user.id)
    url = @user.avatar.attached? ? rails_blob_path(@user.avatar, only_path: true) : ""
    render json: { id: @user.id, name: @user.name, email: @user.email, occupation: @user.occupation, company: @user.company_name, avatar: url }
  end

  def update
    @user = User.find(params[:id])
 
    if current_user.id == @user.id
      if @user.update(user_params)
        render_response("success", "OK")
      else
        render_response("Error", "Try again")
      end
    end
  end

  private
    def user_params
      params.permit(:name, :email, :avatar, :occupation, :company_name)
    end

end
