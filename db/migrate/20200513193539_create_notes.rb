class CreateNotes < ActiveRecord::Migration[6.0]
  def change
    create_table :notes do |t|
      t.string :title, null: false, default: 'Note title'
      t.string :description, null: false, default: ''
      t.integer :positionX, null: false, default: 0
      t.integer :positionY, null: false, default: 65
      t.boolean :minimized?, null: false, default: false

      t.timestamps
    end
    add_reference :notes, :environment, null: false, foreign_key: true
  end
end


