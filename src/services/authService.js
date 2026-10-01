import api from './api'

export const authService = {
  async sendOtp(phone) {
    const res = await api.post('/auth/send-otp', { phone })
    return res.data
  },

  async loginCustomer({ name, phone }) {
    const res = await api.post('/auth/verify-otp', {
      name,
      phone,
      otp: '123456',
      role: 'CUSTOMER',
    })
    return res.data
  },

  async verifyOtp(payload) {
    const res = await api.post('/auth/verify-otp', {
      ...payload,
      role: 'CUSTOMER',
    })
    return res.data
  },

  async getMe() {
    const res = await api.get('/auth/me')
    return res.data
  },
}
