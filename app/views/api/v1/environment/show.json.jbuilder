json.task_lists @task_lists.each do |task_list|
  json.id task_list.id
  json.title task_list.title
  json.positionX task_list.positionX
  json.positionY task_list.positionY
  json.width task_list.width
  json.height task_list.height
  json.minimized task_list.minimized?
end

json.notes @notes.each do |note|
  json.id note.id
  json.title note.title
  json.description note.description
  json.positionX note.positionX
  json.positionY note.positionY
  json.width note.width
  json.height note.height
  json.minimized note.minimized?
end

json.users @users
