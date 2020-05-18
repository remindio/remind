class Environment < ApplicationRecord
   has_many :task_lists, :dependent => :destroy
   has_many :notes, :dependent => :delete_all

   has_many :users, through: :user_environments
   has_many :user_environments, :dependent => :delete_all
end
