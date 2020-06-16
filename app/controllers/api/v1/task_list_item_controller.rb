class Api::V1::TaskListItemController < ApplicationController

  def index
    if user_in_environment?(params[:environment_id])
      @task_list_items = TaskListItem.where(task_list_id: params[:task_list_id])
    end
  end

  def create
    if user_in_environment?(params[:environment_id])
      @task_list_item = TaskListItem.new(task_list_id: params[:task_list_id])

      if @task_list_item.save
        task_list_item = {
          :id => @task_list_item.id,
          :description => @task_list_item.description,
          :task_completed => @task_list_item.task_completed?
        }
        render_response("success", task_list_item)
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

        @task_list_item = TaskListItem.where(task_list_id: params[:task_list_id])

        if @task_list_item.length == 0
          @task_list = TaskList.find(params[:task_list_id])
          @task_list.destroy
        end

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
      params.require(:task_list_item).permit(:description, :task_completed?)
    end
end
