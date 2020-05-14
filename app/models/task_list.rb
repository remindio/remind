class TaskList < ApplicationRecord
   has_many :task_list_items
   belongs_to :environment
end
