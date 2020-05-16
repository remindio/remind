Rails.application.routes.draw do
  devise_for :users

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :environment, only: [:index, :show, :create, :destroy, :update]
      resources :task_list, only: :index
    end
  end
end
