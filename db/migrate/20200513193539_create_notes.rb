class CreateNotes < ActiveRecord::Migration[6.0]
  def change
    create_table :notes do |t|
      t.string :title
      t.string :description

      t.timestamps
    end
    add_reference :notes, :environment, null: false, foreign_key: true
  end
end


