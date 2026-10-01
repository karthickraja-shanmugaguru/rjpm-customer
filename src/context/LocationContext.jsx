import React, { createContext, useContext, useState } from 'react'

const LocationContext = createContext(null)

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(() => {
    return localStorage.getItem('evently_customer_location') || 'Chennai'
  })
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)

  const updateLocation = (newLoc) => {
    if (newLoc && newLoc.trim()) {
      const clean = newLoc.trim()
      setLocation(clean)
      localStorage.setItem('evently_customer_location', clean)
    }
  }

  const openLocationPicker = () => setIsLocationModalOpen(true)
  const closeLocationPicker = () => setIsLocationModalOpen(false)

  return (
    <LocationContext.Provider
      value={{
        location,
        updateLocation,
        isLocationModalOpen,
        openLocationPicker,
        closeLocationPicker,
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}

export const useLocation = () => {
  const context = useContext(LocationContext)
  if (!context) throw new Error('useLocation must be used within LocationProvider')
  return context
}
