import api, { apiUrl } from './api'

const Environments = {
  create: () => api.post(`${apiUrl}/environment/`),
  index: () => api.get(`${apiUrl}/environment`),
  show: (id) => api.get(`${apiUrl}/environment/${id}`),
  update: (id, params) => api.put(`${apiUrl}/environment/${id}`, params),
  delete: (id) => api.delete(`${apiUrl}/environment/${id}`)
}

const Notes = {
  create: (environmentId, params) => api.post(`${apiUrl}/environment/${environmentId}/note`, params),
  update: (environmentId, noteId, params) => api.put(`${apiUrl}/environment/${environmentId}/note/${noteId}`, params),
  delete: (environmentId, noteId) => api.delete(`${apiUrl}/environment/${environmentId}/note/${noteId}`)
}

const Tasks = {
  create: (environmentId, params) => api.post(`${apiUrl}/environment/${environmentId}/task_list`, params),
  update: (environmentId, taskId, params) => api.put(`${apiUrl}/environment/${environmentId}/task_list/${taskId}`, params),
  delete: (environmentId, taskId) => api.delete(`${apiUrl}/environment/${environmentId}/task_list/${taskId}`)
}

const TaskItems = {
  create: (environmentId, taskId) => api.post(`${apiUrl}/environment/${environmentId}/task_list/${taskId}/task_list_item`),
  index: (environmentId, taskId) => api.get(`${apiUrl}/environment/${environmentId}/task_list/${taskId}/task_list_item`),
  update: (environmentId, taskId, itemId, params) => api.put(`${apiUrl}/environment/${environmentId}/task_list/${taskId}/task_list_item/${itemId}`, params),
  delete: (environmentId, taskId, itemId) => api.delete(`${apiUrl}/environment/${environmentId}/task_list/${taskId}/task_list_item/${itemId}`),
}  

const User = {
  show: () => api.get(`${apiUrl}/user`),
  update: (userId, params) => api.put(`${apiUrl}/user/${userId}`, params)
}

const UserEnvironment = {
  create: (environmentId, params) => api.post(`${apiUrl}/environment/${environmentId}/user_environment`, params),
  delete: (environmentId, userId) => api.delete(`${apiUrl}/environment/${environmentId}/user_environment/${userId}`)
}

export { Environments, Notes, Tasks, TaskItems, User, UserEnvironment }
