class Api::V1::UserController < ApplicationController

  def index
    @user = current_user
  end

  def update
    @user = User.find(params[:id])
 
    if current_user.id == @user.id
      if @user.update(user_params)
        render_response("success", "OK")
      else
        p "ce fez merda"
        render_response("Error", "Try again")
      end
    end
  end

  private
    def user_params
      params.require(:user).permit(:name, :email, :profile_url, :occupation, :company_name)
    end

end
