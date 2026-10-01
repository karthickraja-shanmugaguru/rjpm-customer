import React from 'react'
import { ICONS } from '../../constants/icons'
import { useLanguage } from '../../context/LanguageContext'
import { Sparkles } from 'lucide-react'

export const FilterBar = ({
  activeFilter = 'near',
  onFilterChange,
  filters = {},
  onToggleFilter,
  onOpenSmartFilter,
  isSmartActive = false,
  smartCount = 0,
}) => {
  const { t } = useLanguage()

  const handleClick = (key) => {
    if (onFilterChange) onFilterChange(key)
    if (onToggleFilter) onToggleFilter(key)
  }

  const isNear = activeFilter === 'near' || filters.nearMe
  const isRating = activeFilter === 'rating' || filters.rating4Plus
  const isVerified = activeFilter === 'verified' || filters.verifiedOnly
  const isPrice = activeFilter === 'price' || filters.priceSort

  return (
    <div className="filter-bar">
      {/* Smart Filter Magic Button */}
      {onOpenSmartFilter && (
        <button
          type="button"
          className={`filter ${isSmartActive ? 'active' : ''}`}
          onClick={onOpenSmartFilter}
          style={{
            background: isSmartActive ? 'linear-gradient(135deg, #eff6ff 0%, #f5f3ff 100%)' : '#fff',
            borderColor: isSmartActive ? '#8b5cf6' : '#c7d2fe',
            color: isSmartActive ? '#7c3aed' : '#6366f1',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            boxShadow: '0 1px 4px rgba(99, 102, 241, 0.1)',
          }}
        >
          <Sparkles size={14} color={isSmartActive ? '#7c3aed' : '#6366f1'} />
          {t('smartFilter', 'Smart Filter')}
          {isSmartActive && smartCount > 0 && (
            <span
              style={{
                background: '#7c3aed',
                color: '#fff',
                borderRadius: 10,
                padding: '1px 6px',
                fontSize: 10,
                fontWeight: 800,
              }}
            >
              {smartCount}
            </span>
          )}
        </button>
      )}

      <button
        type="button"
        className={`filter ${isNear ? 'active' : ''}`}
        onClick={() => handleClick('near')}
      >
        <span>{ICONS.mapPin(15, isNear ? 'var(--primary)' : 'var(--muted)')}</span>
        {t('nearMe', 'Near me')}
      </button>

      <button
        type="button"
        className={`filter ${isPrice ? 'active' : ''}`}
        onClick={() => handleClick('price')}
      >
        <span>₹</span>
        {t('price', 'Price')}
      </button>

      <button
        type="button"
        className={`filter ${isRating ? 'active' : ''}`}
        onClick={() => handleClick('rating')}
      >
        <span>{ICONS.star(14)}</span>
        {t('rating4Plus', '4+ Rating')}
      </button>

      <button
        type="button"
        className={`filter ${isVerified ? 'active' : ''}`}
        onClick={() => handleClick('verified')}
      >
        <span>{ICONS.check(15, 'var(--success)')}</span>
        {t('verified', 'Verified')}
      </button>
    </div>
  )
}
