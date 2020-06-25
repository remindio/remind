import axios from 'axios'

export const apiUrl = 'api/v1'

const api = axios.create({
  baseURL: '/'
})

export default api
