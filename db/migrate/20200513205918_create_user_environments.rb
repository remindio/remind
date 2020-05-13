class CreateUserEnvironments < ActiveRecord::Migration[6.0]
  def change
    create_table :user_environments do |t|
      t.references :user, null: false, foreign_key: true
      t.references :environment, null: false, foreign_key: true

      t.timestamps
    end
  end
end
