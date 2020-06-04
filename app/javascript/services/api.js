import axios from 'axios'

export const apiUrl = 'api/v1/'

const api = axios.create({
  baseURL: 'http://localhost:3000/'
})

export default api
