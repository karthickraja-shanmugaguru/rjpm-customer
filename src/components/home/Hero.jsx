import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { ICONS, ILLUSTRATIONS } from '../../constants/icons'
import { Sparkles } from 'lucide-react'

export const Hero = ({ onOpenSmartFilter }) => {
  const navigate = useNavigate()
  const { language, t } = useLanguage()
  const [query, setQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/explore?search=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <div className="hero">
      <div>
        <h1>
          {t('heroTitle', 'Plan your perfect')} <span>{t('heroEvent', 'event.')}</span>
        </h1>
        <p>
          {t('heroSubtitle', 'Find catering, decoration, photography, mehendi, jewellery, music and everything else you need — all from verified local providers.')}
        </p>

        <form onSubmit={handleSearch} className="hero-search">
          <span className="hero-search-icon" style={{ display: 'flex', alignItems: 'center', color: 'var(--muted)', flexShrink: 0 }}>
            {ICONS.search(20, 'var(--muted)')}
          </span>
          <input
            type="text"
            placeholder={t('searchPlaceholder', 'Search catering, decoration, photography, packages...')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            {t('searchBtn', 'Search')}
          </button>
        </form>

        {/* Home Page Smart Filter Trigger */}
        {onOpenSmartFilter && (
          <div
            onClick={onOpenSmartFilter}
            className="hero-smart-banner"
            style={{
              marginTop: 16,
              background: 'linear-gradient(135deg, rgba(238, 242, 255, 0.95) 0%, rgba(245, 243, 255, 0.95) 100%)',
              border: '1.5px solid #c7d2fe',
              borderRadius: 18,
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.08)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #1a73e8 0%, #7c3aed 100%)',
                  color: '#fff',
                  display: 'grid',
                  placeItems: 'center',
                  boxShadow: '0 3px 8px rgba(124, 58, 237, 0.3)',
                  flexShrink: 0,
                }}
              >
                <Sparkles size={18} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>{t('smartFilter', '✨ Smart Package & Budget Matcher')}</span>
                  <span
                    style={{
                      background: '#8b5cf6',
                      color: '#fff',
                      fontSize: 9,
                      fontWeight: 800,
                      padding: '2px 6px',
                      borderRadius: 8,
                      letterSpacing: '0.04em',
                    }}
                  >
                    AI
                  </span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                  {language === 'ta'
                    ? 'உணவு, அலங்காரம், மெஹந்தி, மலர்கள் தேர்வு செய்து பட்ஜெட்டுக்குள் பேக்கேஜ் கண்டறியுங்கள்'
                    : 'Select Food, Decor, Mehendi, Flowers & budget to get custom turnkey packages'}
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              style={{
                padding: '7px 14px',
                fontSize: 12,
                fontWeight: 700,
                borderRadius: 16,
                background: 'linear-gradient(135deg, #1a73e8 0%, #7c3aed 100%)',
                border: 'none',
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 8px rgba(124, 58, 237, 0.25)',
              }}
            >
              {language === 'ta' ? 'தொடங்குக' : 'Try Smart Match'} →
            </button>
          </div>
        )}
      </div>

      <div className="hero-art">
        {ILLUSTRATIONS.hero()}
      </div>
    </div>
  )
}
