// In-memory + sessionStorage client cache for instant 0ms UI rendering
const memoryStore = new Map()

export const clientCache = {
  get(key) {
    if (memoryStore.has(key)) {
      return memoryStore.get(key)
    }
    try {
      const stored = sessionStorage.getItem(`rjpm_cache_${key}`)
      if (stored) {
        const parsed = JSON.parse(stored)
        memoryStore.set(key, parsed)
        return parsed
      }
    } catch {
      // Ignore sessionStorage errors
    }
    return null
  },

  set(key, data) {
    if (!data) return
    memoryStore.set(key, data)
    try {
      sessionStorage.setItem(`rjpm_cache_${key}`, JSON.stringify(data))
    } catch {
      // Ignore quota errors
    }
  },

  has(key) {
    if (memoryStore.has(key)) return true
    try {
      return Boolean(sessionStorage.getItem(`rjpm_cache_${key}`))
    } catch {
      return false
    }
  },

  clear() {
    memoryStore.clear()
    try {
      for (const k of Object.keys(sessionStorage)) {
        if (k.startsWith('rjpm_cache_')) {
          sessionStorage.removeItem(k)
        }
      }
    } catch {
      // Ignore errors
    }
  },
}

export default clientCache
