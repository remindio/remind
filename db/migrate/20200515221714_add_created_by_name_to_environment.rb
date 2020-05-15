class AddCreatedByNameToEnvironment < ActiveRecord::Migration[6.0]
  def change
    add_column :environments, :created_by_name, :string
  end
end
