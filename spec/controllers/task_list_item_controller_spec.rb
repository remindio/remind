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
    { :environment_id => 1, :title => "TestANDOSAJDNASKJD"}
  }

  let(:valid_task_item_attributes) {
    { :task_list_id => 1, :description => "Fazer testes"}
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
    it "creates a task list item in task list" do
      post :create, params: { :environment_id => 1, :task_list_id => 1 }, session: valid_session, :format => :json
      expect(JSON.parse(response.body)['status']).to eq('success')
    end
    it "User isn't in the environment" do
      post :create, params: { :environment_id => 2, :task_list_id => 1 }, session: valid_session, :format => :json
      expect(JSON.parse(response.body)['status']).to eq('error')
    end
    it "Return error: invalid task_list_id" do
      post :create, params: { :environment_id => 1, :task_list_id => 2 }, session: valid_session, :format => :json
      expect(JSON.parse(response.body)['status']).to eq('error')
    end
  end

  describe "put #update" do
    render_views
    it "update a task list item in task list" do
      put :update, params: { :environment_id => 1, :task_list_id => 1, :id => 1 }, session: valid_session, :format => :json
      expect(JSON.parse(response.body)['status']).to eq('success')
    end
    it "User isn't in the environment" do
      put :update, params: { :environment_id => 2, :task_list_id => 1, :id => 1 }, session: valid_session, :format => :json
      expect(JSON.parse(response.body)['status']).to eq('error')
    end
    it "Return error: invalid task_list_id" do
      put :update, params: { :environment_id => 1, :task_list_id => 33, :id => 1 }, session: valid_session, :format => :json
      expect(JSON.parse(response.body)['status']).to eq('error')
    end
  end

  describe "delete #destroy" do
    render_views
    it "delete a task list item" do
      delete :destroy, params: { :environment_id => 1, :task_list_id => 1, :id => 1 }, session: valid_session, :format => :json
      expect(JSON.parse(response.body)['status']).to eq('success')
    end
    it "User isn't in the environment" do
      delete :destroy, params: { :environment_id => 2, :task_list_id => 1, :id => 1 }, session: valid_session, :format => :json
      expect(JSON.parse(response.body)['status']).to eq('error')
    end
    it "Return error: invalid task_list_id" do
      delete :destroy, params: { :environment_id => 1, :task_list_id => 19, :id => 1 }, session: valid_session, :format => :json
      expect(JSON.parse(response.body)['status']).to eq('error')
    end
  end
end