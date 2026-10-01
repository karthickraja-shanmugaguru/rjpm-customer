import api from './api'

export const bookingService = {
  async createEnquiry(data) {
    const res = await api.post('/enquiries', data)
    return res.data
  },

  async getBookings() {
    const res = await api.get('/customer/bookings')
    return res.data
  },
}
