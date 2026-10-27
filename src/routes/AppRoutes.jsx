import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { CustomerLayout } from '../layouts/CustomerLayout'
import { initGA, trackPageView } from '../utils/analytics'

// Pages
import { HomePage } from '../pages/home/HomePage'
import { ExplorePage } from '../pages/explore/ExplorePage'
import { PackagesPage } from '../pages/package/PackagesPage'
import { PackageDetailPage } from '../pages/package/PackageDetailPage'
import { LabourPage } from '../pages/labour/LabourPage'
import { LabourDetailPage } from '../pages/labour/LabourDetailPage'
import { ProviderDetailPage } from '../pages/provider/ProviderDetailPage'
import { ServiceDetailPage } from '../pages/service/ServiceDetailPage'
import { BookingsPage } from '../pages/booking/BookingsPage'
import { FavoritesPage } from '../pages/favorites/FavoritesPage'
import { ProfilePage } from '../pages/profile/ProfilePage'
import { LoginPage } from '../pages/auth/LoginPage'
import { NotFoundPage } from '../pages/common/NotFoundPage'

export const AppRoutes = () => {
  const routerLocation = useLocation()

  useEffect(() => {
    initGA()
  }, [])

  useEffect(() => {
    trackPageView(routerLocation.pathname + routerLocation.search)
  }, [routerLocation])

  return (
    <Routes>
      <Route element={<CustomerLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/services" element={<ExplorePage />} />
        <Route path="/services/:id" element={<ServiceDetailPage />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/packages/:id" element={<PackageDetailPage />} />
        <Route path="/providers" element={<ExplorePage />} />
        <Route path="/providers/:id" element={<ProviderDetailPage />} />
        <Route path="/labour" element={<LabourPage />} />
        <Route path="/labour/:id" element={<LabourDetailPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
