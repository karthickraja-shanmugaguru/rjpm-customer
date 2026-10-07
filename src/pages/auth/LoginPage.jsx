import React, { useState } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { User, Phone, LogIn, UserPlus, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react'

export const LoginPage = () => {
  const { loginCustomer } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  // Default tab based on query param or default to 'signin'
  const [activeTab, setActiveTab] = useState(() => {
    return searchParams.get('mode') === 'signup' || searchParams.get('tab') === 'signup'
      ? 'signup'
      : 'signin'
  })

  // Sign In state (mobile only)
  const [signInPhone, setSignInPhone] = useState('')

  // Sign Up state (name + mobile)
  const [signUpName, setSignUpName] = useState('')
  const [signUpPhone, setSignUpPhone] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const redirectAfterLogin = () => {
    const from = location.state?.from?.pathname || '/'
    navigate(from, { replace: true })
  }

  const formatErrorMessage = (err, defaultMsg) => {
    if (err?.code === 'ECONNABORTED' || err?.message?.toLowerCase().includes('timeout')) {
      return 'The server was waking up from idle. Please tap Sign In again now.'
    }
    if (err?.message === 'Network Error' || (!err?.response && !err?.status)) {
      return 'Server is currently connecting. Please wait a few seconds and try again.'
    }
    return err?.response?.data?.message || err?.message || defaultMsg
  }

  // Sign In handler: Mobile number only
  const handleSignIn = async (e) => {
    e.preventDefault()
    setError('')

    const cleanPhone = signInPhone.trim().replace(/\D/g, '')
    if (!cleanPhone || cleanPhone.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.')
      return
    }

    setLoading(true)
    try {
      const res = await loginCustomer({ phone: cleanPhone })
      const userName = res.data?.user?.name || 'Customer'
      showToast(`Welcome back, ${userName}!`)
      redirectAfterLogin()
    } catch (err) {
      setError(formatErrorMessage(err, 'Sign in failed. Please try again.'))
    } finally {
      setLoading(false)
    }
  }

  // Sign Up handler: User name + Mobile
  // If an existing user tries to sign up again, straight login without error!
  const handleSignUp = async (e) => {
    e.preventDefault()
    setError('')

    const trimmedName = signUpName.trim()
    const cleanPhone = signUpPhone.trim().replace(/\D/g, '')

    if (!trimmedName) {
      setError('Please enter your name.')
      return
    }

    if (!cleanPhone || cleanPhone.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.')
      return
    }

    setLoading(true)
    try {
      const res = await loginCustomer({ name: trimmedName, phone: cleanPhone })
      const isExisting = res.data?.isExistingUser
      const userName = res.data?.user?.name || trimmedName

      if (isExisting) {
        // Straight login for existing user trying to sign up again
        showToast(`Welcome back, ${userName}! Signed into your account.`)
      } else {
        showToast(`Account created! Welcome, ${userName}.`)
      }

      redirectAfterLogin()
    } catch (err) {
      setError(formatErrorMessage(err, 'Sign up failed. Please try again.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px 16px',
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: 440,
          width: '100%',
          padding: '36px 28px',
          borderRadius: 24,
          boxShadow: '0 10px 32px rgba(0,0,0,0.07)',
          border: '1px solid var(--border-light, #e2e8f0)',
          background: '#ffffff',
        }}
      >
        {/* Header Branding */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #1a73e8 0%, #1557b0 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 14px',
              boxShadow: '0 6px 20px rgba(26, 115, 232, 0.35)',
            }}
          >
            {activeTab === 'signin' ? <LogIn size={26} /> : <UserPlus size={26} />}
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 6px', color: 'var(--text)' }}>
            {activeTab === 'signin' ? 'Sign in to rjpm.in' : 'Create an Account'}
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 13, margin: 0 }}>
            {activeTab === 'signin'
              ? 'Enter your mobile number to sign in instantly.'
              : 'Enter your name and mobile number to register.'}
          </p>
        </div>

        {/* Tab Switcher: Sign In vs Sign Up */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            background: '#f1f5f9',
            padding: 4,
            borderRadius: 14,
            marginBottom: 22,
            gap: 4,
          }}
        >
          <button
            type="button"
            onClick={() => {
              setActiveTab('signin')
              setError('')
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '10px 14px',
              borderRadius: 11,
              border: 'none',
              background: activeTab === 'signin' ? '#ffffff' : 'transparent',
              color: activeTab === 'signin' ? 'var(--primary, #1a73e8)' : '#64748b',
              fontWeight: 700,
              fontSize: 13.5,
              cursor: 'pointer',
              boxShadow: activeTab === 'signin' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.18s ease',
            }}
          >
            <LogIn size={15} />
            <span>Sign In</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('signup')
              setError('')
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '10px 14px',
              borderRadius: 11,
              border: 'none',
              background: activeTab === 'signup' ? '#ffffff' : 'transparent',
              color: activeTab === 'signup' ? 'var(--primary, #1a73e8)' : '#64748b',
              fontWeight: 700,
              fontSize: 13.5,
              cursor: 'pointer',
              boxShadow: activeTab === 'signup' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.18s ease',
            }}
          >
            <UserPlus size={15} />
            <span>Sign Up</span>
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            style={{
              background: '#fef2f2',
              border: '1px solid #fee2e2',
              color: '#dc2626',
              padding: '10px 14px',
              borderRadius: 10,
              fontSize: 13,
              marginBottom: 18,
            }}
          >
            {error}
          </div>
        )}

        {/* TAB 1: SIGN IN (Mobile only) */}
        {activeTab === 'signin' ? (
          <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 6, color: '#334155' }}>
                Mobile Number
              </label>
              <div style={{ display: 'flex' }}>
                <span
                  style={{
                    padding: '12px 14px',
                    background: '#f8fafc',
                    border: '1px solid #cbd5e1',
                    borderRight: 'none',
                    borderRadius: '12px 0 0 12px',
                    fontSize: 14,
                    color: '#64748b',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  +91
                </span>
                <input
                  type="tel"
                  required
                  autoFocus
                  maxLength={10}
                  value={signInPhone}
                  onChange={(e) => setSignInPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="10-digit mobile number"
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    borderRadius: '0 12px 12px 0',
                    border: '1px solid #cbd5e1',
                    fontSize: 14,
                    outline: 'none',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
                  onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '13px 20px',
                borderRadius: 16,
                fontSize: 15,
                marginTop: 6,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <span>{loading ? 'Signing in...' : 'Sign In'}</span>
              <ArrowRight size={18} />
            </button>

            {/* Toggle to Sign Up */}
            <div style={{ textAlign: 'center', marginTop: 10, fontSize: 13, color: '#64748b' }}>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setActiveTab('signup')
                  setError('')
                  if (signInPhone) setSignUpPhone(signInPhone)
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary, #1a73e8)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  padding: 0,
                  textDecoration: 'underline',
                }}
              >
                Sign Up
              </button>
            </div>
          </form>
        ) : (
          /* TAB 2: SIGN UP (User name + Mobile) */
          <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 6, color: '#334155' }}>
                User Name
              </label>
              <input
                type="text"
                required
                autoFocus
                value={signUpName}
                onChange={(e) => setSignUpName(e.target.value)}
                placeholder="Enter your name"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 12,
                  border: '1px solid #cbd5e1',
                  fontSize: 14,
                  outline: 'none',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
                onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 6, color: '#334155' }}>
                Mobile Number
              </label>
              <div style={{ display: 'flex' }}>
                <span
                  style={{
                    padding: '12px 14px',
                    background: '#f8fafc',
                    border: '1px solid #cbd5e1',
                    borderRight: 'none',
                    borderRadius: '12px 0 0 12px',
                    fontSize: 14,
                    color: '#64748b',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  +91
                </span>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={signUpPhone}
                  onChange={(e) => setSignUpPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="10-digit mobile number"
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    borderRadius: '0 12px 12px 0',
                    border: '1px solid #cbd5e1',
                    fontSize: 14,
                    outline: 'none',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
                  onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '13px 20px',
                borderRadius: 16,
                fontSize: 15,
                marginTop: 6,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <span>{loading ? 'Creating account...' : 'Sign Up'}</span>
              <ArrowRight size={18} />
            </button>

            {/* Hint for existing users */}
            <div style={{ textAlign: 'center', marginTop: 10, fontSize: 13, color: '#64748b' }}>
              Already registered?{' '}
              <button
                type="button"
                onClick={() => {
                  setActiveTab('signin')
                  setError('')
                  if (signUpPhone) setSignInPhone(signUpPhone)
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary, #1a73e8)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  padding: 0,
                  textDecoration: 'underline',
                }}
              >
                Sign In with mobile
              </button>
            </div>
          </form>
        )}

        {/* Footer info note */}
        <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid #f1f5f9', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: '#64748b', fontSize: 12 }}>
            <ShieldCheck size={16} color="#16a34a" />
            <span>Fast & Secure &middot; No OTP verification needed</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
