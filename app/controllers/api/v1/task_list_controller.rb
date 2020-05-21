class Api::V1::TaskListController < ApplicationController
  def create
    @task_list = TaskList.new(environment_id: params[:environment_id])

    if @task_list.save
      @task_list = TaskListItem.create(task_list_id: @task_list.id, description: "Task 1")
      render_response("success", "OK!")
    else
      render_response("error", "Failed while creating a task list")
    end
  end

  def update
    @task_list = TaskList.find(params[:id])

    if @task_list.update(task_list_params)
      render_response("success", "OK!")
    else
      render_response("error", "Try again!")
    end
  end

  def destroy
    @task_list = TaskList.find(params[:id])
    
    if @task_list.destroy
      render_response("success", "OK!")
    else
      render_response("error", "Try again!")
    end
  end

  private
    def task_list_params
      params.permit(:title)
    end
end
