json.task_lists @task_lists.each do |task_list|
  json.id task_list.id
  json.title task_list.title
  json.positionX task_list.positionX
  json.positionY task_list.positionY
  json.minimized task_list.minimized?

  json.task_list_items task_list.task_list_items.each do |task_list_item|
    json.id task_list_item.id
    json.description task_list_item.description
    json.task_completed task_list_item.task_completed?
  end
end

json.notes @notes.each do |note|
  json.id note.id
  json.title note.title
  json.description note.description
  json.positionX note.positionX
  json.positionY note.positionY
  json.minimized note.minimized?
end

json.users @users.each do |user|
  json.id user.id
  json.name user.name
  json.email user.email
end
