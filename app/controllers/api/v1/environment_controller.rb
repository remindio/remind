class Api::V1::EnvironmentController < ApplicationController
  def index
    @environments = Environment.joins(:user_environments).where(:user_environments => { user_id: current_user.id})
  end

  def show
    load_tasks
    load_notes
    load_users
  end

  def create
    @environment = Environment.new(created_by: current_user.id, created_by_name: current_user.name)
    @environment.save

    @user_environment = UserEnvironment.new(user_id: current_user.id, environment_id: @environment.id)
    @user_environment.save
  end

  def destroy
  end

  def edit
  end


  private
    def load_tasks
      @task_lists = TaskList.joins(:task_list_items).where(:task_lists => { environment_id: params[:id] }).uniq
    end

    def load_notes
      @notes = Note.where(environment_id: params[:id])
    end

    def load_users
      @users = User.joins(:user_environments).where(:user_environments => { environment_id: params[:id] })
    end
end
