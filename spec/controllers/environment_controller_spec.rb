require 'rails_helper'

RSpec.describe Api::V1::EnvironmentController, type: :controller do
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

  let(:valid_note_attributes) {
    { :environment_id => 1, :title => "Teste title", :description => "Tomara q de bom carai"}
  }

  before do
    Environment.create! valid_attributes
    Environment.create! valid_attributes_2
    UserEnvironment.create! valid_user_environment_attributes
    TaskList.create! valid_task_attributes
    TaskListItem.create! valid_task_item_attributes
    Note.create! valid_note_attributes
  end

  let(:valid_session) { { } }

  describe "get #index" do
    render_views
    it "creates an environment and returns a successful response" do
      get :index, params: {}, session: valid_session, :format => :json
      expect(JSON.parse(response.body)).to include('environments')
    end
  end

  describe "get #show" do
    render_views
    it "succesfuly returns the environment created" do
      get :show, params: {:id => 1}, session: valid_session, :format => :json
      expect(JSON.parse(response.body)).to include('task_lists', 'notes', 'users')
    end
    it "User doesn't have permission to access the environment" do
      get :show, params: {:id => 2}, session: valid_session, :format => :json
      expect(JSON.parse(response.body)['status']).to eq('error')
    end
  end

  describe "delete #destroy" do
    render_views
    it "user withing the environment successfuly deletes the environment" do
      delete :destroy, params: {:id => 1}, session: valid_session, :format => :json
      expect(JSON.parse(response.body)['status']).to eq('success')
    end
    it "user not inside the environment tries to delete it" do
      delete :destroy, params: {:id => 2}, session: valid_session, :format => :json
      expect(JSON.parse(response.body)['status']).to eq('error')
    end
  end
end