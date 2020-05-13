class UserEnvironment < ApplicationRecord
  belongs_to :user
  belongs_to :environment
end
