json.environments @environments.each do |environment|
  json.id environment.id
  json.name environment.name
end
