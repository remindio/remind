FactoryBot.define do
   factory :random_environments, class: Environment do
      name { Faker::Company }
      
   end
 end