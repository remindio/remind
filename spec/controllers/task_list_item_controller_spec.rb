require 'rails_helper'

RSpec.describe Api::V1::TaskListItemController, type: :controller do
  login_user

  let(:valid_attributes) {
      { :name => "Test name!", :created_by => 1 }
  }

  let(:valid_attributes_2) {
    { :name => "Test name!", :created_by => 2 }
  }

  let(:valid_user_environment_attributes) {
    { :user_id => 1, :environment_id => 1 }
  }

  let(:valid_task_attributes) {
    { :environment_id => 1, :title => "Test" }
  }

  let(:valid_task_item_attributes) {
    { :task_list_id => 1, :description => "Test 1" }
  }

  before do
    Environment.create! valid_attributes
    Environment.create! valid_attributes_2
    UserEnvironment.create! valid_user_environment_attributes
    TaskList.create! valid_task_attributes
    TaskListItem.create! valid_task_item_attributes
  end

  let(:valid_session) { { } }

  describe "post #create" do
    render_views
    context "when trying to create a task list item" do
      it "expects task list item to be created successfuly" do
        post :create, params: { :environment_id => 1, :task_list_id => 1 }, session: valid_session, :format => :json
        expect(JSON.parse(response.body)['status']).to eq('success')
      end
      it "expects user to be unable to create task list item in a environment he's not in" do
        post :create, params: { :environment_id => 2, :task_list_id => 1 }, session: valid_session, :format => :json
        expect(JSON.parse(response.body)['status']).to eq('error')
      end
      it "expects to not be able to create a task list item on a task list that doesn't exist" do
        post :create, params: { :environment_id => 1, :task_list_id => 2 }, session: valid_session, :format => :json
        expect(JSON.parse(response.body)['status']).to eq('error')
      end
    end
  end

  describe "put #update" do
    render_views
    context "when trying to update a task list item" do
      it "expects the user to update a task list item successfuly" do
        put :update, params: { :environment_id => 1, :task_list_id => 1, :id => 1 }, session: valid_session, :format => :json
        expect(JSON.parse(response.body)['status']).to eq('success')
      end
      it "expects user to be unable to update task list item in a environment he's not in" do
        put :update, params: { :environment_id => 2, :task_list_id => 1, :id => 1 }, session: valid_session, :format => :json
        expect(JSON.parse(response.body)['status']).to eq('error')
      end
      it "expects to not be able to update a task list item on a task list that doesn't exist" do
        put :update, params: { :environment_id => 1, :task_list_id => 33, :id => 1 }, session: valid_session, :format => :json
        expect(JSON.parse(response.body)['status']).to eq('error')
      end
    end
  end

  describe "delete #destroy" do
    render_views
    context "when trying to delete a task list item" do
      it "expects the user to be able to delete a task list item" do
        delete :destroy, params: { :environment_id => 1, :task_list_id => 1, :id => 1 }, session: valid_session, :format => :json
        expect(JSON.parse(response.body)['status']).to eq('success')
      end
      it "expects user to be unable to delete task list item in a environment he's not in" do
        delete :destroy, params: { :environment_id => 2, :task_list_id => 1, :id => 1 }, session: valid_session, :format => :json
        expect(JSON.parse(response.body)['status']).to eq('error')
      end
      it "expects to not be able to delete a task list item on a task list that doesn't exist" do
        delete :destroy, params: { :environment_id => 1, :task_list_id => 19, :id => 1 }, session: valid_session, :format => :json
        expect(JSON.parse(response.body)['status']).to eq('error')
      end
    end
  end
end