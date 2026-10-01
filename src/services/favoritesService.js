import api from './api'

export const favoritesService = {
  async getFavorites() {
    const res = await api.get('/customer/favorites')
    return res.data
  },

  async toggleFavorite(providerId) {
    const res = await api.post('/customer/favorites/toggle', { providerId: Number(providerId) })
    return res.data
  },

  async toggleFavoritePackage(packageId) {
    const res = await api.post('/customer/favorites/toggle', { packageId: Number(packageId) })
    return res.data
  },

  async toggleFavoriteService(serviceId) {
    const res = await api.post('/customer/favorites/toggle', { serviceId: Number(serviceId) })
    return res.data
  },
}
