import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://rjpm-api.onrender.com/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor: attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('evently_customer_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor: handle errors & 401s
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token on unauthorized if session invalid
      localStorage.removeItem('evently_customer_token')
      localStorage.removeItem('evently_customer_user')
    }
    return Promise.reject(error)
  }
)

export default api
