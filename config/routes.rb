Rails.application.routes.draw do
  devise_for :users

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :environment, only: :show do
        resources :task_list, only: [:update, :destroy, :create] do 
          resources :task_list_item, only: [:create, :update, :destroy]
        end
        resources :note, only: [:update, :destroy, :create]
      end
      resources :environment, only: [:index, :create, :destroy, :update]
    end
  end
end
