import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { CustomerLayout } from '../layouts/CustomerLayout'

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

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<CustomerLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/services/:id" element={<ServiceDetailPage />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/packages/:id" element={<PackageDetailPage />} />
        <Route path="/labour" element={<LabourPage />} />
        <Route path="/labour/:id" element={<LabourDetailPage />} />
        <Route path="/providers/:id" element={<ProviderDetailPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
