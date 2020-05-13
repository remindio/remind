# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

freddie_mercury = User.create(name: "Freddie Mercury", email: "freddie@mercury.com", password: "123456", company_name: "Google", occupation: "Full Stack Rails Ruby Nodejs Dev React", profile_url: "askjdhksadca")
calculo = Environment.create(name: "Calculo IV")
fudeu = Environment.create(name: "fudeu IV")
tudo = Environment.create(name: "tudo IV")
meuDeus = UserEnvironment.create(user_id: 1, environment_id: 1)
vai = UserEnvironment.create(user_id: 1, environment_id: 2)
dar = UserEnvironment.create(user_id: 1, environment_id: 3)
erick_johnson = User.create(name: "Erick Johnson", email: "erick@johnson.com", password: "123456", company_name: "Facezap", occupation: "Full Stack Rails Ruby Nodejs Dev React Vue", profile_url: "askjdhksasddca")
merda = UserEnvironment.create(user_id: 2, environment_id: 1)
daniel_johnson = User.create(name: "Daniel Johnson", email: "daniel@johnson.com", password: "123456", company_name: "Facezap", occupation: "Fasd", profile_url: "askjdhksasddca")
caralho = UserEnvironment.create(user_id: 3, environment_id: 1)

seila = Note.create(title: "ALOALO", description: "GALERA DE COWBOY", environment_id: 1)
aloalo = Note.create(title: "OLAOLA", description: "GALERA DE COWBOY", environment_id: 1)

task1 = TaskList.create(title: "seila", environment_id: 1)
taskitem1 = TaskListItem.create(description: "MEU DEUS ME ELIMINA", task_list_id: 1, is_completed: false)
taskitem1 = TaskListItem.create(description: "MEU DEUS ME AJUDA", task_list_id: 1, is_completed: false)