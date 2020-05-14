json.task_list @task_list_items.each do |task_list_item|
  json.id task_list_item.id
  json.description task_list_item.description
  json.task_completed task_list_item.task_completed?
  json.task_list_id task_list_item.task_list.id
  json.task_list_title task_list_item.task_list.title
end

json.notes @notes.each do |note|
  json.id note.id
  json.title note.title
  json.description note.description
end

json.users @users.each do |user|
  json.id user.id
  json.name user.name
  json.email user.email
end
