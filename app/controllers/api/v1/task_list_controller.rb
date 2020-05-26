class Api::V1::TaskListController < ApplicationController
  def create
    if user_in_environment?(params[:environment_id])
      @task_list = TaskList.new(environment_id: params[:environment_id])

      if @task_list.save
        @task_list = TaskListItem.create(task_list_id: @task_list.id, description: "Task 1")
        render_response("success", "OK!")
      else
        render_response("error", "Failed while creating a task list")
      end
    else
      render_response("error", "User isn't in the environment!")
    end
  end

  def update
    if user_in_environment?(params[:environment_id])
      @task_list = TaskList.find(params[:id])

      if @task_list.update(task_list_params)
        render_response("success", "OK!")
      else
        render_response("error", "Try again!")
      end
    else
      render_response("error", "User isn't in the environment!")
    end
  end

  def destroy
    if user_in_environment?(params[:environment_id])
      @task_list = TaskList.find(params[:id])
    
      if @task_list.destroy
        render_response("success", "OK!")
      else
        render_response("error", "Try again!")
      end
    else
      render_response("error", "User isn't in the environment!")
    end
  end

  private
    def task_list_params
      params.permit(:title)
    end
end
