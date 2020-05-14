class Api::V1::EnvironmentController < ApplicationController
  def index
    @environments = Environment.joins(:user_environments).where(:user_environments => { user_id: current_user.id})
  end

  def show
    load_tasks_items
    load_notes
    load_users
  end

  private
    def load_tasks_items
      @task_list_items = TaskListItem.joins(:task_list).where(:task_lists => { environment_id: params[:id] })
    end

    def load_notes
      @notes = Note.where(environment_id: params[:id])
    end

    def load_users
      @users = User.joins(:user_environments).where(:user_environments => { environment_id: params[:id] })
    end
end
