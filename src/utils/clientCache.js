import {
  FALLBACK_CATEGORIES,
  FALLBACK_PACKAGES,
  FALLBACK_PROVIDERS,
  FALLBACK_SERVICES,
} from './fallbackData'

// In-memory + persistent localStorage client cache for instant 0ms UI rendering
const memoryStore = new Map()
const CACHE_PREFIX = 'rjpm_cache_v2_'

// Default fallback registry to ensure zero-wait rendering on cold starts or first visits
const DEFAULT_FALLBACKS = {
  home_packages: FALLBACK_PACKAGES,
  home_providers: FALLBACK_PROVIDERS,
  home_categories: FALLBACK_CATEGORIES,
  home_services: FALLBACK_SERVICES,
}

export const clientCache = {
  get(key) {
    // 1. Fast in-memory check
    if (memoryStore.has(key)) {
      return memoryStore.get(key)
    }

    // 2. Persistent localStorage check (survives refreshes & tab closes)
    try {
      const stored = localStorage.getItem(`${CACHE_PREFIX}${key}`)
      if (stored) {
        const parsed = JSON.parse(stored)
        memoryStore.set(key, parsed)
        return parsed
      }
    } catch {
      // Ignore localStorage errors (e.g. disabled in privacy mode)
    }

    // 3. Fallback snapshot for explore queries
    if (key.startsWith('explore_')) {
      const parts = key.split('_')
      const cat = parts[1] || 'All'
      const search = (parts[2] || '').toLowerCase().trim()
      const filter = parts[3] || 'near'

      let sData = [...FALLBACK_SERVICES]
      let pData = [...FALLBACK_PROVIDERS]
      let pkgData = [...FALLBACK_PACKAGES]

      if (cat && cat !== 'All') {
        const catLower = cat.toLowerCase()
        sData = sData.filter((s) => (s.category || '').toLowerCase().includes(catLower) || (s.title || '').toLowerCase().includes(catLower))
        pData = pData.filter((p) => (p.category || '').toLowerCase().includes(catLower) || (p.businessName || '').toLowerCase().includes(catLower))
      }

      if (search) {
        sData = sData.filter((s) => (s.title || '').toLowerCase().includes(search) || (s.category || '').toLowerCase().includes(search) || (s.providerName || '').toLowerCase().includes(search))
        pData = pData.filter((p) => (p.businessName || '').toLowerCase().includes(search) || (p.category || '').toLowerCase().includes(search))
      }

      if (filter === 'price') {
        sData.sort((a, b) => Number(a.price || 0) - Number(b.price || 0))
      } else if (filter === 'rating') {
        sData = sData.filter((s) => Number(s.rating || 0) >= 4.0)
        pData = pData.filter((p) => Number(p.rating || 0) >= 4.0)
      } else if (filter === 'verified') {
        sData = sData.filter((s) => Boolean(s.verified))
        pData = pData.filter((p) => Boolean(p.verified))
      }

      const fallbackResult = { sData, pData, pkgData }
      memoryStore.set(key, fallbackResult)
      return fallbackResult
    }

    // 4. Default home fallbacks
    if (DEFAULT_FALLBACKS[key]) {
      const fallbackData = DEFAULT_FALLBACKS[key]
      memoryStore.set(key, fallbackData)
      return fallbackData
    }

    return null
  },

  set(key, data) {
    if (!data) return
    memoryStore.set(key, data)
    try {
      localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(data))
    } catch {
      // Ignore quota errors
    }
  },

  has(key) {
    if (memoryStore.has(key)) return true
    try {
      if (localStorage.getItem(`${CACHE_PREFIX}${key}`)) return true
    } catch {
      // Ignore errors
    }
    return Boolean(DEFAULT_FALLBACKS[key] || key.startsWith('explore_'))
  },

  getServiceById(id) {
    const allServices = this.get('home_services') || FALLBACK_SERVICES
    return allServices.find((s) => String(s.id) === String(id)) || null
  },

  getProviderById(id) {
    const allProviders = this.get('home_providers') || FALLBACK_PROVIDERS
    return allProviders.find((p) => String(p.id) === String(id)) || null
  },

  getPackageById(id) {
    const allPackages = this.get('home_packages') || FALLBACK_PACKAGES
    return allPackages.find((pkg) => String(pkg.id) === String(id)) || null
  },

  clear() {
    memoryStore.clear()
    try {
      for (const k of Object.keys(localStorage)) {
        if (k.startsWith(CACHE_PREFIX)) {
          localStorage.removeItem(k)
        }
      }
    } catch {
      // Ignore errors
    }
  },
}

export default clientCache
