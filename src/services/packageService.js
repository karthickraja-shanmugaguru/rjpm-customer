import api from './api'

export const packageService = {
  async getPackages(params = {}) {
    const res = await api.get('/packages', { params })
    return res.data
  },

  async getPackage(id) {
    const res = await api.get(`/packages/${id}`)
    return res.data
  },
}
