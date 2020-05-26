class Api::V1::TaskListItemController < ApplicationController
  def create
    if user_in_environment?(params[:environment_id])
      @task_list_item = TaskListItem.new(task_list_id: params[:task_list_id])

      if @task_list_item.save
        render_response("success", "OK!")
      else
        render_response("error", "Failed while creating a task list item")
      end
    else
      render_response("error", "User isn't in the environment!")
    end
  end

  def update
    if user_in_environment?(params[:environment_id])
      @task_list_item = TaskListItem.find_by(id: params[:id], task_list_id: params[:task_list_id])

      if @task_list_item
        @task_list_item.update(task_list_item_params)
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
      @task_list_item = TaskListItem.find_by(id: params[:id], task_list_id: params[:task_list_id])
    
      if @task_list_item
        @task_list_item.destroy
        render_response("success", "OK!")
      else
        render_response("error", "Try again!")
      end
    else
      render_response("error", "User isn't in the environment!")
    end
  end

  private
    def task_list_item_params
      params.permit(:description, :task_completed?)
    end
end
