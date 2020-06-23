class Api::V1::TaskListController < ApplicationController
  def create
    if user_in_environment?(params[:environment_id])
      task_list = task_list_params

      @task_list = TaskList.new(
        environment_id: params[:environment_id],
        positionX: task_list[:positionX],
        positionY: task_list[:positionY]
      )

      if @task_list.save
        @task_list_item = TaskListItem.create(task_list_id: @task_list.id)
        
        task_list = {
          :id => @task_list.id,
          :title => @task_list.title,
          :positionX => @task_list.positionX,
          :positionY => @task_list.positionY,
          :task_list_items => [
            {
              :id => @task_list_item.id,
              :description => @task_list_item.description,
              :task_completed => @task_list_item.task_completed?
            }
          ]
        }
        render_response("success", task_list)
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
      params.require(:task_list).permit(:title, :positionX, :positionY, :minimized?)
    end
end
