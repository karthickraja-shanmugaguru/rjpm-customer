import api from './api'

export const serviceService = {
  async getServices(params = {}) {
    const res = await api.get('/services', { params })
    return res.data
  },

  async getService(id) {
    const res = await api.get(`/services/${id}`)
    return res.data
  },
}
