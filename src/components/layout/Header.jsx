import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFavorites } from '../../context/FavoritesContext'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import { useToast } from '../../context/ToastContext'
import { ICONS } from '../../constants/icons'

export const Header = () => {
  const navigate = useNavigate()
  const { favoriteCount } = useFavorites()
  const { user, isAuthenticated } = useAuth()
  const { showToast } = useToast()
  const { language, setLanguage, t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      const q = searchTerm.trim()
      if (q) {
        navigate(`/explore?search=${encodeURIComponent(q)}`)
      }
    }
  }

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo" aria-label="rjpm.in Home">
          <div className="logo-icon">{ICONS.logo(40)}</div>
          <span>rjpm.in</span>
        </Link>

        <div className="header-search">
          <span className="search-icon">{ICONS.search(18, 'var(--muted)')}</span>
          <input
            type="text"
            placeholder={t('searchPlaceholder', 'Search catering, decoration, photography, packages...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
        </div>

        <div className="header-actions">
          {/* Language Switcher for Tamil / English */}
          <div
            className="lang-switcher"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#f1f5f9',
              borderRadius: 20,
              padding: '2px',
              border: '1px solid var(--border-light, #e2e8f0)',
              marginRight: 6,
            }}
            title={t('switchLanguage', 'Language: English / தமிழ்')}
          >
            <button
              type="button"
              onClick={() => setLanguage('en')}
              style={{
                border: 'none',
                background: language === 'en' ? 'var(--primary, #1a73e8)' : 'transparent',
                color: language === 'en' ? '#ffffff' : 'var(--muted, #64748b)',
                fontSize: 12,
                fontWeight: 700,
                padding: '4px 8px',
                borderRadius: 16,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('ta')}
              style={{
                border: 'none',
                background: language === 'ta' ? 'var(--primary, #1a73e8)' : 'transparent',
                color: language === 'ta' ? '#ffffff' : 'var(--muted, #64748b)',
                fontSize: 12,
                fontWeight: 700,
                padding: '4px 8px',
                borderRadius: 16,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              தமிழ்
            </button>
          </div>

          <a
            href={import.meta.env.VITE_PROVIDER_URL || 'https://rjpm-partner.netlify.app'}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost header-desktop-only"
            style={{
              fontSize: 12,
              fontWeight: 700,
              padding: '5px 11px',
              borderRadius: 14,
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              color: 'var(--primary)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              textDecoration: 'none',
              marginRight: 6,
            }}
            title="Partner Portal & Service Listing"
          >
            <span>💼</span>
            <span>{language === 'ta' ? 'சேவை சேர்க்க' : 'Add Service'}</span>
          </a>

          <button
            type="button"
            onClick={() => {
              if (!isAuthenticated) {
                showToast('Please sign in to view your saved favorites.')
                navigate('/login', { state: { from: { pathname: '/favorites' } } })
              } else {
                navigate('/favorites')
              }
            }}
            className="icon-button header-desktop-only"
            title={t('savedVendors', 'Saved Vendors')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative' }}
          >
            <span>{ICONS.heart(20, 'var(--muted)')}</span>
            {isAuthenticated && favoriteCount > 0 && <span className="fav-badge">{favoriteCount}</span>}
          </button>


          <Link to="/profile" className="avatar header-desktop-only" title={t('myProfile', 'My Profile')}>
            {user?.name ? user.name.substring(0, 1).toUpperCase() : ICONS.user(20, 'var(--primary-dark)')}
          </Link>
        </div>
      </div>
    </header>
  )
}
