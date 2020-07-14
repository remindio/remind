class CreateNotes < ActiveRecord::Migration[6.0]
  def change
    create_table :notes do |t|
      t.string :title, null: false, default: 'Note title'
      t.string :description, null: false, default: ''
      t.float :positionX, precision: 53, null: false, default: 0
      t.float :positionY, precision: 53, null: false, default: 0
      t.integer :width, null: false, default: 0
      t.integer :height, null: false, default: 0
      t.boolean :minimized?, null: false, default: false

      t.timestamps
    end
    add_reference :notes, :environment, null: false, foreign_key: true
  end
end


