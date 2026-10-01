import api from './api'

export const reviewService = {
  async createReview(data) {
    const res = await api.post('/reviews', data)
    return res.data
  },
}
