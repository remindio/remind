require 'rails_helper'

RSpec.describe Api::V1::NoteController, type: :controller do
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

  let(:valid_note_attributes) {
    { :environment_id => 1, :title => "Test title", :description => "Test description" }
  }

  before do
    Environment.create! valid_attributes
    Environment.create! valid_attributes_2
    UserEnvironment.create! valid_user_environment_attributes
    Note.create! valid_note_attributes
  end

  let(:valid_session) { { } }

  describe "post #create" do
    render_views
    context "when trying to create a note" do
      it "expects note to be successfuly created" do
        post :create, params: { :environment_id => 1 }, session: valid_session, :format => :json
        expect(JSON.parse(response.body)['status']).to eq('success')
      end
      it "expects the user to not be able to create a note, because he's no in the environment" do
        post :create, params: { :environment_id => 2 }, session: valid_session, :format => :json
        expect(JSON.parse(response.body)['status']).to eq('error')
      end
    end
  end

  describe "put #update" do
    render_views
    context "when trying to update a note" do
      it "expects the user to update a note successfuly" do
        put :update, params: { :environment_id => 1, :id => 1 }, session: valid_session, :format => :json
        expect(JSON.parse(response.body)['status']).to eq('success')
      end
      it "expects the user to not be able to update a note, as he's not in the environment" do
        put :update, params: { :environment_id => 2, :id => 1 }, session: valid_session, :format => :json
        expect(JSON.parse(response.body)['status']).to eq('error')
      end
    end
  end

  describe "delete #destroy" do
    render_views
    context "when trying to delete a note" do
      it "expects the user to be able to delete a note" do
        delete :destroy, params: { :environment_id => 1, :id => 1 }, session: valid_session, :format => :json
        expect(JSON.parse(response.body)['status']).to eq('success')
      end
      it "expects user to not be able the delete a note; as he's in not in the environment" do
        delete :destroy, params: { :environment_id => 2, :id => 1 }, session: valid_session, :format => :json
        expect(JSON.parse(response.body)['status']).to eq('error')
      end
    end
  end
end
