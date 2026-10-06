import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { MobileBottomNav } from '../components/layout/MobileBottomNav'

export const CustomerLayout = () => {
  return (
    <div className="customer-app-wrapper">
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <MobileBottomNav />
    </div>
  )
}
