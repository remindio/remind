FactoryBot.define do
   factory :random_environments, class: Environment do
      name { Faker::Company }
   end

   factory :random_tasklists, class: TaskList do
      title { Faker::Verbs }
      
   end
 end