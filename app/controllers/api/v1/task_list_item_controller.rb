class Api::V1::TaskListItemController < ApplicationController
  def create
    @task_list_item = TaskListItem.new(task_list_id: params[:task_list_id])

    if @task_list_item.save
      render_response("success", "OK!")
    else
      render_response("error", "Failed while creating a task list")
    end
  end

  def update
    @task_list_item = TaskListItem.find(params[:id])

    if @task_list_item.update(task_list_item_params)
      render_response("success", "OK!")
    else
      render_response("error", "Try again!")
    end
  end

  def destroy
    @task_list_item = TaskListItem.find(params[:id])
    
    if @task_list_item.destroy
      render_response("success", "OK!")
    else
      render_response("error", "Try again!")
    end
  end

  private
    def task_list_item_params
      params.permit(:description, :task_completed?)
    end
end
