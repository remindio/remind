class Api::V1::EnvironmentController < ApplicationController
  def index
    @environments = Environment.joins(:user_environments).where(:user_environments => { user_id: current_user.id })
  end

  def create
    @environment = Environment.new(created_by: current_user.id, created_by_name: current_user.name)

    if @environment.save
      @user_environment = UserEnvironment.new(user_id: current_user.id, environment_id: @environment.id)

      if @user_environment.save
        environment = { :id => @environment.id, :name => @environment.name, :created_by => @environment.created_by, :created_by_name => @environment.created_by_name }
        render_response("success", environment)
      end
    else
      render_response("error", "Try again!")
    end
  end

  def show
    if user_in_environment?(params[:id])
      load_tasks
      load_notes
      load_users
    else
      render_response("error", "User doesn't have permission to access this environment!")
    end
  end

  def update
    @environment = Environment.find(params[:id])

    if current_user.id == @environment.created_by
      if @environment.update(environment_params)
        environment = { :id => @environment.id, :name => @environment.name }
        render_response("success", environment)
      else
        render_response("error", "Try again!")
      end
    else
      render_response("error", "User doesn't have sufficient permission!")
    end
  end

  def destroy
    @environment = Environment.find(params[:id])
    
    if current_user.id == @environment.created_by
      if @environment.destroy
        render_response("success", "OK!")
      else
        render_response("error", "Try again!")
      end
    else
      @user_environment = UserEnvironment.find_by(user_id: current_user.id, environment_id: @environment.id)

      if @user_environment
        @user_environment.delete
        render_response("success", "OK!")
      else
        render_response("error", "Try again!")
      end
    end
  end

  private
    def load_tasks
      # @task_lists = TaskList.joins(:task_list_items).where(:task_lists => { environment_id: params[:id] }).uniq
      @task_lists = TaskList.where(environment_id: params[:id])
    end

    def load_notes
      @notes = Note.where(environment_id: params[:id])
    end

    def load_users
      @users = User.joins(:user_environments).where(:user_environments => { environment_id: params[:id] })
    end

    def environment_params
      params.require(:environment).permit(:name)
    end
end
