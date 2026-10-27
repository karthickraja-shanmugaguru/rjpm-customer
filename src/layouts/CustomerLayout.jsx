import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { MobileBottomNav } from '../components/layout/MobileBottomNav'

export const CustomerLayout = () => {
  return (
    <div className="customer-app-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main className="main" style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  )
}
