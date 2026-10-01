import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { MobileBottomNav } from '../components/layout/MobileBottomNav'
import { LocationModal } from '../components/layout/LocationModal'

export const CustomerLayout = () => {
  return (
    <div className="customer-app-wrapper">
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <MobileBottomNav />
      <LocationModal />
    </div>
  )
}
