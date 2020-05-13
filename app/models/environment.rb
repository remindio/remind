class Environment < ApplicationRecord
   has_many :task_lists
   has_many :notes

   has_many :users, through: :user_environments
   has_many :user_environments
end
