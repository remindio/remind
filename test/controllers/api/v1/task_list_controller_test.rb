require 'test_helper'

class Api::V1::TaskListControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_task_list_index_url
    assert_response :success
  end

end
