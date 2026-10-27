/**
 * Google Analytics 4 (GA4) Integration for RJPM.in SPA
 * Configurable via VITE_GA_MEASUREMENT_ID environment variable
 */

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || ''

let isInitialized = false

export const initGA = () => {
  if (isInitialized || !GA_ID || typeof window === 'undefined') return

  // Load gtag.js asynchronously without blocking rendering
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag
  gtag('js', new Date())
  gtag('config', GA_ID, {
    send_page_view: false, // Managed manually on SPA route change
  })

  isInitialized = true
}

export const trackPageView = (path) => {
  if (!GA_ID || typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', 'page_view', {
    page_path: path || window.location.pathname + window.location.search,
    page_title: document.title,
    page_location: window.location.href,
  })
}

export const trackEvent = (action, params = {}) => {
  if (!GA_ID || typeof window === 'undefined' || !window.gtag) {
    if (import.meta.env.DEV) {
      console.log(`[Analytics Event - Dev Mode]: ${action}`, params)
    }
    return
  }
  window.gtag('event', action, params)
}

export default {
  initGA,
  trackPageView,
  trackEvent,
}
