import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { favoritesService } from '../services/favoritesService'
import { useAuth } from './AuthContext'
import { useToast } from './ToastContext'

const FavoritesContext = createContext(null)

export const FavoritesProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { showToast } = useToast()

  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      const saved = localStorage.getItem('evently_customer_favorites')
      return saved ? Array.from(new Set(JSON.parse(saved).map(Number))) : []
    } catch {
      return []
    }
  })

  const [favoritePackageIds, setFavoritePackageIds] = useState(() => {
    try {
      const saved = localStorage.getItem('rjpm_customer_fav_packages')
      return saved ? Array.from(new Set(JSON.parse(saved).map(Number))) : []
    } catch {
      return []
    }
  })

  const [favoriteServiceIds, setFavoriteServiceIds] = useState(() => {
    try {
      const saved = localStorage.getItem('rjpm_customer_fav_services')
      return saved ? Array.from(new Set(JSON.parse(saved).map(Number))) : []
    } catch {
      return []
    }
  })

  const [loading, setLoading] = useState(false)

  // Sync favorites from backend database whenever authenticated
  useEffect(() => {
    if (isAuthenticated) {
      favoritesService
        .getFavorites()
        .then((res) => {
          if (res.success && res.data) {
            const cleanProviderIds = Array.from(new Set((res.data.providerIds || []).map(Number)))
            const cleanPackageIds = Array.from(new Set((res.data.packageIds || []).map(Number)))
            const cleanServiceIds = Array.from(new Set((res.data.serviceIds || []).map(Number)))

            setFavoriteIds(cleanProviderIds)
            setFavoritePackageIds(cleanPackageIds)
            setFavoriteServiceIds(cleanServiceIds)

            localStorage.setItem('evently_customer_favorites', JSON.stringify(cleanProviderIds))
            localStorage.setItem('rjpm_customer_fav_packages', JSON.stringify(cleanPackageIds))
            localStorage.setItem('rjpm_customer_fav_services', JSON.stringify(cleanServiceIds))
          }
        })
        .catch(() => {})
    } else {
      setFavoriteIds([])
      setFavoritePackageIds([])
      setFavoriteServiceIds([])
    }
  }, [isAuthenticated, user?.id])

  /**
   * Helper: requires user to be logged in before favoriting.
   * If not logged in, redirects directly to /login.
   */
  const ensureAuthOrRedirect = () => {
    if (!isAuthenticated) {
      showToast('Please sign in to save your favorites.')
      navigate('/login', { state: { from: location } })
      return false
    }
    return true
  }

  const isFavorited = (providerId) => {
    if (!isAuthenticated) return false
    return favoriteIds.includes(Number(providerId))
  }

  const isFavorite = (providerId) => {
    return isFavorited(providerId)
  }

  const isPackageFavorited = (packageId) => {
    if (!isAuthenticated) return false
    return favoritePackageIds.includes(Number(packageId))
  }

  const isServiceFavorited = (serviceId) => {
    if (!isAuthenticated) return false
    return favoriteServiceIds.includes(Number(serviceId))
  }

  const refreshFavorites = async () => {
    if (!isAuthenticated) return
    setLoading(true)
    try {
      const res = await favoritesService.getFavorites()
      if (res.success && res.data) {
        const cleanProviderIds = Array.from(new Set((res.data.providerIds || []).map(Number)))
        const cleanPackageIds = Array.from(new Set((res.data.packageIds || []).map(Number)))
        const cleanServiceIds = Array.from(new Set((res.data.serviceIds || []).map(Number)))

        setFavoriteIds(cleanProviderIds)
        setFavoritePackageIds(cleanPackageIds)
        setFavoriteServiceIds(cleanServiceIds)

        localStorage.setItem('evently_customer_favorites', JSON.stringify(cleanProviderIds))
        localStorage.setItem('rjpm_customer_fav_packages', JSON.stringify(cleanPackageIds))
        localStorage.setItem('rjpm_customer_fav_services', JSON.stringify(cleanServiceIds))
      }
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = async (providerId) => {
    if (!ensureAuthOrRedirect()) return

    const pId = Number(providerId)
    const exists = favoriteIds.includes(pId)

    // 1. Optimistic UI update
    const updated = exists ? favoriteIds.filter((id) => id !== pId) : Array.from(new Set([...favoriteIds, pId]))
    setFavoriteIds(updated)
    localStorage.setItem('evently_customer_favorites', JSON.stringify(updated))

    // 2. Persist to backend database
    try {
      await favoritesService.toggleFavorite(pId)
    } catch {
      // Rollback on failure
      setFavoriteIds(favoriteIds)
      localStorage.setItem('evently_customer_favorites', JSON.stringify(favoriteIds))
    }
  }

  const toggleFavoritePackage = async (packageId) => {
    if (!ensureAuthOrRedirect()) return

    const pId = Number(packageId)
    const exists = favoritePackageIds.includes(pId)

    // 1. Optimistic UI update
    const updated = exists
      ? favoritePackageIds.filter((id) => id !== pId)
      : Array.from(new Set([...favoritePackageIds, pId]))
    setFavoritePackageIds(updated)
    localStorage.setItem('rjpm_customer_fav_packages', JSON.stringify(updated))

    // 2. Persist to backend database
    try {
      await favoritesService.toggleFavoritePackage(pId)
    } catch {
      // Rollback on failure
      setFavoritePackageIds(favoritePackageIds)
      localStorage.setItem('rjpm_customer_fav_packages', JSON.stringify(favoritePackageIds))
    }
  }

  const toggleFavoriteService = async (serviceId) => {
    if (!ensureAuthOrRedirect()) return

    const sId = Number(serviceId)
    const exists = favoriteServiceIds.includes(sId)

    // 1. Optimistic UI update
    const updated = exists
      ? favoriteServiceIds.filter((id) => id !== sId)
      : Array.from(new Set([...favoriteServiceIds, sId]))
    setFavoriteServiceIds(updated)
    localStorage.setItem('rjpm_customer_fav_services', JSON.stringify(updated))

    // 2. Persist to backend database
    try {
      await favoritesService.toggleFavoriteService(sId)
    } catch {
      // Rollback on failure
      setFavoriteServiceIds(favoriteServiceIds)
      localStorage.setItem('rjpm_customer_fav_services', JSON.stringify(favoriteServiceIds))
    }
  }

  const favorites = favoriteIds.map((id) => ({
    id,
    targetId: id,
    providerId: id,
  }))

  const totalFavoriteCount = isAuthenticated
    ? favoriteIds.length + favoritePackageIds.length + favoriteServiceIds.length
    : 0

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        favoritePackageIds,
        favoriteServiceIds,
        favoriteCount: totalFavoriteCount,
        favorites,
        loading,
        refreshFavorites,
        isFavorited,
        isFavorite,
        toggleFavorite,
        isPackageFavorited,
        toggleFavoritePackage,
        isServiceFavorited,
        toggleFavoriteService,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider')
  return context
}
