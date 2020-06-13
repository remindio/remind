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
  update: (environmentId, taskId, itemId, params) => api.put(`${apiUrl}/environment/${environmentId}/task_list/${taskId}/task_list_item/${itemId}`, params),
  delete: (environmentId, taskId, itemId) => api.delete(`${apiUrl}/environment/${environmentId}/task_list/${taskId}/task_list_item/${itemId}`)
}

export { Environments, Notes, Tasks, TaskItems }
