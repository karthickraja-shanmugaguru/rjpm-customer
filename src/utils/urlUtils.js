export const getPartnerBaseUrl = () => {
  if (import.meta.env.VITE_PROVIDER_URL) {
    return import.meta.env.VITE_PROVIDER_URL.replace(/\/$/, '')
  }
  if (typeof window !== 'undefined') {
    const host = window.location.hostname
    const isLocal = host === 'localhost' || host === '127.0.0.1'
    return isLocal ? 'http://localhost:3001' : 'https://partner.rjpm.in'
  }
  return 'https://partner.rjpm.in'
}

export const getCustomerBaseUrl = () => {
  if (import.meta.env.VITE_CUSTOMER_URL) {
    return import.meta.env.VITE_CUSTOMER_URL.replace(/\/$/, '')
  }
  if (typeof window !== 'undefined') {
    const host = window.location.hostname
    const isLocal = host === 'localhost' || host === '127.0.0.1'
    return isLocal ? 'http://localhost:3000' : 'https://rjpm.in'
  }
  return 'https://rjpm.in'
}
