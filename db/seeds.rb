# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

erick_johnson = User.create(name: "Erick Johnson", email: "erick@johnson.com", password: "123456", company_name: "Facezap", occupation: "Full Stack Rails Ruby Nodejs Dev React Vue", profile_url: "askjdhksasddca")
calculo = Environment.create(name: "Calculo IV", created_by: 1, created_by_name: "Erick Johnson")
fudeu = Environment.create(name: "fudeu IV", created_by: 1, created_by_name: "Erick Johnson")
tudo = Environment.create(name: "tudo IV", created_by: 1, created_by_name: "Erick Johnson")
meuDeus = UserEnvironment.create(user_id: 1, environment_id: 1)
vai = UserEnvironment.create(user_id: 1, environment_id: 2)
dar = UserEnvironment.create(user_id: 1, environment_id: 3)

daniel_johnson = User.create(name: "Daniel Johnson", email: "daniel@johnson.com", password: "123456", company_name: "Facezap", occupation: "Fasd", profile_url: "askjdhksasddca")
caralho = UserEnvironment.create(user_id: 2, environment_id: 1)
merda = UserEnvironment.create(user_id: 2, environment_id: 2)

seila = Note.create(title: "ALOALO", description: "GALERA DE COWBOY", environment_id: 1)
aloalo = Note.create(title: "OLAOLA", description: "GALERA DE COWBOY", environment_id: 1)
task1 = TaskList.create(title: "seila", environment_id: 1)
task2 = TaskList.create(title: "maisumatask", environment_id: 1)
taskitem1 = TaskListItem.create(description: "MEU DEUS ME ELIMINA", task_list_id: 1, task_completed?: false)
taskitem2 = TaskListItem.create(description: "MEU DEUS ME AJUDA", task_list_id: 1, task_completed?: false)
taskitem3 = TaskListItem.create(description: "MEU DEUS ME SENHOR", task_list_id: 2, task_completed?: true)