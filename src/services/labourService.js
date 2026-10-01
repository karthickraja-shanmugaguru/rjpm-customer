import api from './api'

export const labourService = {
  async getLabour(params = {}) {
    const res = await api.get('/labour', { params })
    return res.data
  },

  async getLabourItem(id) {
    const res = await api.get(`/labour/${id}`)
    return res.data
  },
}
