import React, { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('evently_customer_user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })
  const [token, setToken] = useState(() => localStorage.getItem('evently_customer_token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const res = await authService.getMe()
          if (res.success && res.data.user) {
            setUser(res.data.user)
            localStorage.setItem('evently_customer_user', JSON.stringify(res.data.user))
          }
        } catch {
          // invalid token
          logout()
        }
      }
      setLoading(false)
    }
    initAuth()
  }, [token])

  const loginCustomer = async (arg1, arg2) => {
    let name = ''
    let phone = ''
    if (typeof arg1 === 'object' && arg1 !== null) {
      name = arg1.name || ''
      phone = arg1.phone || ''
    } else {
      name = arg1 || ''
      phone = arg2 || ''
    }
    const res = await authService.loginCustomer({ name, phone })
    if (res.success && res.data.token) {
      setToken(res.data.token)
      setUser(res.data.user)
      localStorage.setItem('evently_customer_token', res.data.token)
      localStorage.setItem('evently_customer_user', JSON.stringify(res.data.user))
      return res
    }
    throw new Error(res.message || 'Login failed')
  }

  const loginWithOtp = async (phone, otp) => {
    const res = await authService.verifyOtp({ phone, otp })
    if (res.success && res.data.token) {
      setToken(res.data.token)
      setUser(res.data.user)
      localStorage.setItem('evently_customer_token', res.data.token)
      localStorage.setItem('evently_customer_user', JSON.stringify(res.data.user))
      return res
    }
    throw new Error(res.message || 'Login failed')
  }

  const registerCustomer = async (data) => {
    const res = await authService.verifyOtp(data)
    if (res.success && res.data.token) {
      setToken(res.data.token)
      setUser(res.data.user)
      localStorage.setItem('evently_customer_token', res.data.token)
      localStorage.setItem('evently_customer_user', JSON.stringify(res.data.user))
      return res
    }
    throw new Error(res.message || 'Registration failed')
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('evently_customer_token')
    localStorage.removeItem('evently_customer_user')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(token),
        loading,
        loginCustomer,
        loginWithOtp,
        registerCustomer,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
