import React from 'react'
import { Link } from 'react-router-dom'
import { CATEGORY_META } from '../../constants/categoryMeta'
import { ICONS } from '../../constants/icons'
import { useLanguage } from '../../context/LanguageContext'

const FEATURED_CATEGORIES = [
  'Catering',
  'Decoration',
  'Photography',
  'Mehendi',
  'Jewellery',
  'Mandapam',
  'Music & DJ',
  'Makeup',
]

export const PopularServices = ({ categories = [] }) => {
  const { t } = useLanguage()

  const displayList = categories.length > 0
    ? categories.slice(0, 8)
    : FEATURED_CATEGORIES.map((name, i) => ({ id: i + 1, name }))

  return (
    <div className="section home-section-label">
      <div className="section-header">
        <div>
          <h2 className="section-title">{t('popularServices', 'Popular services')}</h2>
          <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '4px' }}>
            {t('popularServicesSub', 'Browse categories and book verified specialists')}
          </p>
        </div>
        <Link to="/explore?category=All" className="link-button">
          {t('viewAll', 'View all')} {ICONS.chevronRight(16, 'var(--primary)')}
        </Link>
      </div>

      <div className="category-grid">
        {displayList.map((cat) => {
          const meta = CATEGORY_META[cat.name] || CATEGORY_META['Catering']
          return (
            <Link
              key={cat.id || cat.name}
              to={`/explore?category=${encodeURIComponent(cat.name)}`}
              className="category-card"
            >
              <div className="category-icon" style={{ background: meta.bg }}>
                {meta.svg(28)}
              </div>
              <strong>{t(cat.name, cat.name)}</strong>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
