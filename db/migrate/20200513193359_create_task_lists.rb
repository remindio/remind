class CreateTaskLists < ActiveRecord::Migration[6.0]
  def change
    create_table :task_lists do |t|
      t.string :title, null: false, default: 'Task list title'
      

      t.timestamps
    end

    add_reference :task_lists, :environment, null: false, foreign_key: true
  end
end
