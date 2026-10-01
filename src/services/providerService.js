import api from './api'

export const providerService = {
  async getProviders(params = {}) {
    const res = await api.get('/providers', { params })
    return res.data
  },

  async getProvider(id) {
    const res = await api.get(`/providers/${id}`)
    return res.data
  },

  async getProviderServices(id) {
    const res = await api.get(`/providers/${id}/services`)
    return res.data
  },

  async getProviderPackages(id) {
    const res = await api.get(`/providers/${id}/packages`)
    return res.data
  },

  async getProviderReviews(id) {
    const res = await api.get(`/providers/${id}/reviews`)
    return res.data
  },
}
