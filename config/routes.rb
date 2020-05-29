Rails.application.routes.draw do
  get 'home/index'
  root 'home#index'
  devise_for :users, :skip => [:registrations] 
  as :user do
    get 'users/cancel' => 'users/registrations#cancel', :as => :cancel_user_registration
    get 'users/sign_up' => 'users/registrations#new', :as => :new_user_registration
    patch 'users/' => 'users/registrations#update', :as => :user_registration
    put 'users/' => 'users/registrations#update'
    delete 'users/' => 'users/registrations#destroy'
    post 'users/' => 'users/registrations#create'
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :environment, only: :show do
        resources :task_list, only: [:update, :destroy, :create] do 
          resources :task_list_item, only: [:create, :update, :destroy]
        end
        resources :user_environment, only: [:create]
        resources :note, only: [:update, :destroy, :create]
      end

      resources :environment, only: [:index, :create, :destroy, :update]
    end
  end

  get "*path", to: "home#index", :constraints => lambda{|req| req.path !~ /.(png|jpg|js|css|json)$/ }
end
