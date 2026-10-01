import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useLocation } from '../../context/LocationContext'
import { useLanguage } from '../../context/LanguageContext'
import { useToast } from '../../context/ToastContext'
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Heart,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Sparkles,
  Languages,
} from 'lucide-react'

export const ProfilePage = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const { location, openLocationPicker } = useLocation()
  const { language, toggleLanguage, t } = useLanguage()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    showToast(t('logOut', 'You have been logged out.'))
    navigate('/')
  }

  if (!isAuthenticated) {
    return (
      <section id="profile" className="screen active" style={{ display: 'block' }}>
        <div
          className="card"
          style={{
            textAlign: 'center',
            padding: '60px 24px',
            maxWidth: 480,
            margin: '40px auto',
            borderRadius: 20,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: '#e8f0fe',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}
          >
            <User size={32} />
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px' }}>
            {t('signInTitle', 'Sign in to rjpm.in')}
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 14, margin: '0 0 24px' }}>
            {t('signInSubtitle', 'Access your celebration quotes, booked vendors, and saved preferences.')}
          </p>
          <button
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px 24px', borderRadius: 24, fontWeight: 700 }}
            onClick={() => navigate('/login?tab=signin')}
          >
            {t('signInButton', 'Sign In with Mobile')}
          </button>
          <div style={{ marginTop: 14, fontSize: 13, color: '#64748b' }}>
            New user?{' '}
            <button
              type="button"
              onClick={() => navigate('/login?tab=signup')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary, #1a73e8)',
                fontWeight: 700,
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </section>
    )
  }

  const initials = user?.name ? user.name.substring(0, 2).toUpperCase() : 'CU'

  return (
    <section id="profile" className="screen active" style={{ display: 'block' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 className="page-title" style={{ margin: 0 }}>
          {t('myAccount', 'My Account')}
        </h1>
        <p className="page-description" style={{ marginTop: 6, color: 'var(--muted)' }}>
          {t('accountSubtitle', 'Manage your personal details, celebration bookings, and city preferences.')}
        </p>
      </div>

      {/* Customer Profile Card */}
      <div className="profile-card">
        <div
          className="profile-avatar"
          style={{
            background: 'linear-gradient(135deg, #1a73e8 0%, #1557b0 100%)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          {initials}
        </div>
        <div>
          <div className="profile-name">{user?.name || t('eventHost', 'rjpm.in Host')}</div>
          <div className="profile-muted" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Phone size={14} /> +91 {user?.phone || '9876543210'}
          </div>
          <div className="profile-muted" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <MapPin size={14} /> {location}, Tamil Nadu
          </div>
        </div>
      </div>

      {/* Settings / Menu List */}
      <div className="settings" style={{ marginTop: 24 }}>

        <div className="setting" onClick={() => navigate('/favorites')}>
          <span className="setting-title">
            <span className="setting-icon">
              <Heart size={18} color="#d93025" />
            </span>{' '}
            {t('savedVendorsAndPackages', 'Saved Vendors & Packages')}
          </span>
          <ChevronRight size={18} color="var(--muted)" />
        </div>

        {/* Language Switch Option */}
        <div className="setting" onClick={toggleLanguage} style={{ cursor: 'pointer' }}>
          <span className="setting-title">
            <span className="setting-icon">
              <Languages size={18} color="var(--primary)" />
            </span>{' '}
            {t('languageSetting', 'Language / மொழி')}
          </span>
          <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            {language === 'ta' ? 'தமிழ்' : 'English'} <ChevronRight size={18} color="var(--muted)" />
          </span>
        </div>

        <div className="setting" onClick={openLocationPicker}>
          <span className="setting-title">
            <span className="setting-icon">
              <MapPin size={18} color="#16a34a" />
            </span>{' '}
            {t('eventLocation', 'Event Location')}
          </span>
          <span style={{ color: 'var(--muted)', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            {location} <ChevronRight size={18} color="var(--muted)" />
          </span>
        </div>

        <div className="setting" onClick={() => showToast('All notifications are up to date.')}>
          <span className="setting-title">
            <span className="setting-icon">
              <Bell size={18} color="#f59e0b" />
            </span>{' '}
            {t('notificationsAlerts', 'Notifications & Alerts')}
          </span>
          <ChevronRight size={18} color="var(--muted)" />
        </div>

        <div className="setting" onClick={() => showToast('Customer preferences saved.')}>
          <span className="setting-title">
            <span className="setting-icon">
              <Settings size={18} color="#64748b" />
            </span>{' '}
            {t('preferencesEventTypes', 'Preferences & Event Types')}
          </span>
          <ChevronRight size={18} color="var(--muted)" />
        </div>

        <div
          className="setting"
          onClick={() => {
            showToast('Support helpline: +91 9360226758')
            window.location.href = 'tel:+919360226758'
          }}
        >
          <span className="setting-title">
            <span className="setting-icon">
              <HelpCircle size={18} color="#8b5cf6" />
            </span>{' '}
            {t('helpSupport', 'Help & Customer Support')}
          </span>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginRight: 4 }}>
            +91 9360226758
          </span>
        </div>

        <div className="setting" onClick={handleLogout}>
          <span className="setting-title" style={{ color: 'var(--danger)' }}>
            <span className="setting-icon">
              <LogOut size={18} color="var(--danger)" />
            </span>{' '}
            {t('logOut', 'Logout')}
          </span>
          <ChevronRight size={18} color="var(--danger)" />
        </div>
      </div>
    </section>
  )
}
