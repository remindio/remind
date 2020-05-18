class TaskList < ApplicationRecord
   has_many :task_list_items, :dependent => :delete_all
   belongs_to :environment
end
