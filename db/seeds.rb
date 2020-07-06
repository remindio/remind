# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

erick_johnson = User.create(name: "Erick Johnson", email: "erick@johnson.com", password: "123456", company_name: "Facebook", occupation: "Full Stack Rails Developer")
calculo = Environment.create(name: "Calculo IV", created_by: 1, created_by_name: "Erick Johnson")
modelagem = Environment.create(name: "Modelagem e Simulação", created_by: 1, created_by_name: "Erick Johnson")
mac0323 = Environment.create(name: "MAC0323", created_by: 1, created_by_name: "Erick Johnson")
user_environment1 = UserEnvironment.create(user_id: 1, environment_id: 1)
user_environment2 = UserEnvironment.create(user_id: 1, environment_id: 2)
user_environment3 = UserEnvironment.create(user_id: 1, environment_id: 3)

daniel_johnson = User.create(name: "Daniel Johnson", email: "daniel@johnson.com", password: "123456", company_name: "Google", occupation: "Full Stack Rails Developer")
user_environment4 = UserEnvironment.create(user_id: 2, environment_id: 1)
user_environment5 = UserEnvironment.create(user_id: 2, environment_id: 2)

gubi_johnson = User.create(name: "Gubi Johnson", email: "gubi@johnson.com", password: "123456", company_name: "USP", occupation: "Teacher")
user_environment6 = UserEnvironment.create(user_id: 3, environment_id: 1)

note1 = Note.create(title: "Séries", description: "Séries de taylor é muito chato", environment_id: 1, positionX: 1201, positionY: 92)
note2 = Note.create(title: "Sequências", description: "Sequências é muito chato", environment_id: 1, positionX: 916, positionY: 90)
task_list1 = TaskList.create(title: "Assuntos da prova", environment_id: 1, positionX: 622, positionY: 89)
task_list2 = TaskList.create(title: "O que falta estudar", environment_id: 1, positionX: 344, positionY: 86)
task_list_item1 = TaskListItem.create(description: "Séries de taylor", task_list_id: 1, task_completed?: true)
task_list_item2 = TaskListItem.create(description: "Funções sequenciais", task_list_id: 1, task_completed?: false)
task_list_item3 = TaskListItem.create(description: "Sequências", task_list_id: 2, task_completed?: true)

note3 = Note.create(title: "Método de Euler", description: "Xn+1 = Xn + dx", environment_id: 2, positionX: 1201, positionY: 92)
note4 = Note.create(title: "Método analítica", description: "Integrar pra achar as equações", environment_id: 2, positionX: 916, positionY: 90)
task_list3 = TaskList.create(title: "EP1", environment_id: 2, positionX: 622, positionY: 89)
task_list4 = TaskList.create(title: "EP2", environment_id: 2, positionX: 344, positionY: 86)
task_list_item4 = TaskListItem.create(description: "Movimento circular", task_list_id: 3, task_completed?: false)
task_list_item5 = TaskListItem.create(description: "Descida em rampa", task_list_id: 3, task_completed?: false)
task_list_item6 = TaskListItem.create(description: "Fazer tudo", task_list_id: 4, task_completed?: true)

note5 = Note.create(title: "Hash tables", description: "Usa função de hash e inserção fica O(1)", environment_id: 3, positionX: 1201, positionY: 92)
note6 = Note.create(title: "DFS e BFS", description: "Um usa recursão e o outro usa fila", environment_id: 3, positionX: 916, positionY: 90)
task_list5 = TaskList.create(title: "EP2", environment_id: 3, positionX: 622, positionY: 89)
task_list6 = TaskList.create(title: "Vídeo-aulas", environment_id: 3,  positionX: 344, positionY: 86)
task_list_item7 = TaskListItem.create(description: "Função inCircle", task_list_id: 5, task_completed?: false)
task_list_item8 = TaskListItem.create(description: "Função de distância", task_list_id: 5, task_completed?: false)
task_list_item9 = TaskListItem.create(description: "Assistir da última aula", task_list_id: 6, task_completed?: true)

gubi_johnson = User.create(name: "Gubi Johnson da Silva", email: "alo@johnson.com", password: "123456", company_name: "USP", occupation: "Teacher")
user_environment6 = UserEnvironment.create(user_id: 4, environment_id: 1)
gubi_johnson = User.create(name: "Gubi Johnson da Silva Jose Alves", email: "ola@johnson.com", password: "123456", company_name: "USP", occupation: "Teacher")
user_environment6 = UserEnvironment.create(user_id: 5, environment_id: 1)
gubi_johnson = User.create(name: "Gubi Johnson AKSJDHSAJDLKAS", email: "qqq@johnson.com", password: "123456", company_name: "USP", occupation: "Teacher")
user_environment6 = UserEnvironment.create(user_id: 6, environment_id: 1)
gubi_johnson = User.create(name: "Gubi Johnson", email: "aaa@johnson.com", password: "123456", company_name: "USP", occupation: "Teacher")
user_environment6 = UserEnvironment.create(user_id: 7, environment_id: 1)
gubi_johnson = User.create(name: "Gubi Johnson", email: "bbb@johnson.com", password: "123456", company_name: "USP", occupation: "Teacher")
user_environment6 = UserEnvironment.create(user_id: 8, environment_id: 1)