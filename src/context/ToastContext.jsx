import React, { createContext, useContext, useState, useRef } from 'react'

const ToastContext = createContext(null)

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ message: '', visible: false })
  const timerRef = useRef(null)

  const showToast = (message) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setToast({ message, visible: true })
    timerRef.current = setTimeout(() => {
      setToast({ message: '', visible: false })
    }, 2800)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div id="toast" className={`toast ${toast.visible ? 'show' : ''}`}>
        <span style={{ color: '#60a5fa', display: 'flex', alignItems: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        <span>{toast.message}</span>
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}
