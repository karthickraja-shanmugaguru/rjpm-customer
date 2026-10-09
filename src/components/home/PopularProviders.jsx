import React from 'react'
import { Link } from 'react-router-dom'
import { VendorCard } from '../common/VendorCard'
import { ICONS } from '../../constants/icons'
import { useLanguage } from '../../context/LanguageContext'

export const PopularProviders = ({ providers = [], loading = false }) => {
  const { t } = useLanguage()

  return (
    <div className="section">
      <div className="section-header">
        <div>
          <h2 className="section-title">{t('popularProviders', 'Popular Companies')}</h2>
          <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '4px' }}>
            {t('popularProvidersSub', 'Top rated event companies and experienced vendors')}
          </p>
        </div>
        <Link to="/explore?category=All" className="link-button">
          {t('viewAll', 'View all')} {ICONS.chevronRight(16, 'var(--primary)')}
        </Link>
      </div>

      {loading ? (
        <div className="vendor-grid">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="vendor-card skeleton" style={{ height: '360px' }} />
          ))}
        </div>
      ) : providers.length === 0 ? (
        <div
          className="card"
          style={{
            padding: '36px 20px',
            textAlign: 'center',
            color: 'var(--muted)',
            background: '#fafafa',
            borderRadius: '16px',
            border: '1px dashed #cbd5e1',
          }}
        >
          <p style={{ margin: 0, fontSize: '14px' }}>
            {t('noProvidersYet', 'No service providers registered yet. Registered event professionals will appear here.')}
          </p>
        </div>
      ) : (
        <div className="vendor-grid">
          {(() => {
            const seen = new Set()
            const unique = providers.filter((p) => {
              if (!p.claimed || p.providerStatus === 'SHADOW') return false
              const clean = (p.phone || '').replace(/\D/g, '').slice(-10)
              const nameKey = (p.businessName || '').toLowerCase().replace(/rjp[m]?/g, '').trim()
              const key = clean || nameKey
              if (seen.has(key)) return false
              seen.add(key)
              return true
            })
            return unique.slice(0, 4).map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))
          })()}
        </div>
      )}
    </div>
  )
}
