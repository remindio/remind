json.task_list_items  @task_list_items.each do |item|
  json.id item.id
  json.description item.description
  json.task_completed item.task_completed?
end