import React from 'react'
import { CATEGORY_META } from '../../constants/categoryMeta'
import { ICONS } from '../../constants/icons'
import { useLanguage } from '../../context/LanguageContext'

// All official service categories including authentic Indian function specializations
export const DEFAULT_SERVICE_CATEGORIES = [
  'Catering',
  'Decoration',
  'Photography',
  'Videography',
  'Mehendi',
  'Jewellery',
  'Mandapam',
  'Music & DJ',
  'Nadaswaram',
  'Chenda Melam',
  'Muhurtham Malai',
  'Seer Plates',
  'Flowers',
  'Kolam',
  'Priest & Rituals',
  'Return Gifts',
  'Live Stalls',
  'Tailoring',
  'Makeup',
  'Beauty & Spa',
  'Sweets & Desserts',
  'Special Effects',
  'Audio Visual',
  'Panthal & Tent',
  'Furniture',
  'Generator',
  'Water Supply',
  'Event Staff',
  'Valet Parking',
  'Security',
  'Invitations',
  'Transport',
]

export const CategorySidebar = ({
  categories = [],
  activeCategory,
  selectedCategory,
  onSelectCategory,
}) => {
  const { t } = useLanguage()
  const current = activeCategory || selectedCategory || 'All'

  // Use provided categories or default 20 categories
  const categoryList =
    categories && categories.length > 0
      ? categories.map((c) => (typeof c === 'string' ? c : c.name))
      : DEFAULT_SERVICE_CATEGORIES

  return (
    <aside className="category-sidebar" aria-label="Service categories">
      {/* Top "All" item */}
      <button
        type="button"
        className={`sidebar-item ${current === 'All' ? 'active' : ''}`}
        onClick={() => onSelectCategory('All')}
      >
        <div
          className="sidebar-icon"
          style={{
            background: 'var(--primary-light, #e8f0fe)',
            color: 'var(--primary, #1a73e8)',
            border: '1px solid rgba(26,115,232,0.15)',
          }}
        >
          {ICONS.grid(20, 'var(--primary, #1a73e8)')}
        </div>
        <strong>{t('All', 'All')}</strong>
      </button>

      {/* List of categories */}
      {categoryList.map((catName) => {
        const meta = CATEGORY_META[catName] || CATEGORY_META['Catering']
        const isActive = current === catName

        return (
          <button
            key={catName}
            type="button"
            className={`sidebar-item ${isActive ? 'active' : ''}`}
            onClick={() => onSelectCategory(catName)}
          >
            <div
              className="sidebar-icon"
              style={{
                background: meta.bg,
                border: `1px solid ${meta.color}25`,
              }}
            >
              {meta.svg(22)}
            </div>
            <strong>{t(catName, catName)}</strong>
          </button>
        )
      })}
    </aside>
  )
}
