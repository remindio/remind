class Api::V1::TaskListController < ApplicationController
  def index
    @task_lists = TaskList.all
  end
end
