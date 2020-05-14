class CreateTaskListItems < ActiveRecord::Migration[6.0]
  def change
    create_table :task_list_items do |t|
      t.string :description
      t.boolean :task_completed?

      t.timestamps
    end

    add_reference :task_list_items, :task_list, null: false, foreign_key: true
  end
end
