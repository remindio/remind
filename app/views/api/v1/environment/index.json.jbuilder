json.environments @environments.each do |environment|
  json.id environment.id
  json.name environment.name
  json.created_by environment.created_by
  json.created_by_name environment.created_by_name
end
