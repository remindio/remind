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
    { :environment_id => 1, :title => "Test"}
  }

  let(:valid_task_item_attributes) {
    { :task_list_id => 1, :description => "Test 1"}
  }

  let(:valid_note_attributes) {
    { :environment_id => 1, :title => "Test title", :description => "Test description"}
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
    context "when user requests his environments" do
      it "expects the response.body to have a list of environments" do
        get :index, params: {}, session: valid_session, :format => :json
        expect(JSON.parse(response.body)).to include('environments')
      end
    end
  end

  describe "get #show" do
    render_views
    context "when user requests a specific environment to be rendered" do
      it "expects the response.body to have all of the environments objects" do
        get :show, params: {:id => 1}, session: valid_session, :format => :json
        expect(JSON.parse(response.body)).to include('task_lists', 'notes', 'users')
      end
      it "expects the user to not be able to access the environment he's not in" do
        get :show, params: {:id => 2}, session: valid_session, :format => :json
        expect(JSON.parse(response.body)['status']).to eq('error')
      end
    end
  end

  describe "delete #destroy" do
    render_views
    context "when user tries to delete a specific environment" do
      it "expects the user to be able to delete the environment" do
        delete :destroy, params: {:id => 1}, session: valid_session, :format => :json
        expect(JSON.parse(response.body)['status']).to eq('success')
      end
      it "expects the user not to be able to delete the environment as he's not in it" do
        delete :destroy, params: {:id => 2}, session: valid_session, :format => :json
        expect(JSON.parse(response.body)['status']).to eq('error')
      end
    end
  end
end
