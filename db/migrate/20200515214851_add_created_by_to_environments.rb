class AddCreatedByToEnvironments < ActiveRecord::Migration[6.0]
  def change
    add_column :environments, :created_by, :integer
  end
end
