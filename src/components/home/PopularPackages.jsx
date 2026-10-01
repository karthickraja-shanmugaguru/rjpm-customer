import React from 'react'
import { Link } from 'react-router-dom'
import { PackageCard } from '../common/PackageCard'
import { ICONS } from '../../constants/icons'
import { useLanguage } from '../../context/LanguageContext'

export const PopularPackages = ({ packages = [], loading = false }) => {
  const { t } = useLanguage()

  return (
    <div className="section">
      <div className="section-header">
        <div>
          <h2 className="section-title">{t('popularPackages', 'Popular packages')}</h2>
          <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '4px' }}>
            {t('popularPackagesSub', 'Ready-made celebration options tailored for your event')}
          </p>
        </div>
        <Link to="/packages" className="link-button">
          {t('viewAll', 'View all')} {ICONS.chevronRight(16, 'var(--primary)')}
        </Link>
      </div>

      {loading ? (
        <div className="package-grid">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="package-card skeleton" style={{ minHeight: '195px' }} />
          ))}
        </div>
      ) : packages.length === 0 ? (
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
            {t('noPackagesYet', 'No celebration packages published yet. Newly created packages will appear here.')}
          </p>
        </div>
      ) : (
        <div className="package-grid">
          {packages.slice(0, 4).map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      )}
    </div>
  )
}
