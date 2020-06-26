class CreateTaskLists < ActiveRecord::Migration[6.0]
  def change
    create_table :task_lists do |t|
      t.string :title, null: false, default: 'Task list title'
      t.integer :positionX, null: false, default: 0
      t.integer :positionY, null: false, default: 0
      t.integer :width, null: false, default: 0
      t.integer :height, null: false, default: 0
      t.boolean :minimized?, null: false, default: false

      t.timestamps
    end

    add_reference :task_lists, :environment, null: false, foreign_key: true
  end
end
