import axios from 'axios'

const api = axios.create({
  baseURL: 'https://pi-2025.onrender.com',
})

export default api

