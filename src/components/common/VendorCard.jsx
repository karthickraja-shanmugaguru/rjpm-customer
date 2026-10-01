import React from 'react'
import { Link } from 'react-router-dom'
import { RatingStars } from './RatingStars'
import { useFavorites } from '../../context/FavoritesContext'
import { useLanguage } from '../../context/LanguageContext'
import { CATEGORY_META } from '../../constants/categoryMeta'
import { ICONS } from '../../constants/icons'

export const VendorCard = ({ vendor }) => {
  const { isFavorited, toggleFavorite } = useFavorites()
  const { t } = useLanguage()
  const favorited = isFavorited(vendor.id)

  const meta = CATEGORY_META[vendor.category] || CATEGORY_META['Catering']

  const handleFavoriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(vendor.id)
  }

  const profileImg = vendor.logoImage || vendor.logo_image || vendor.profileImage
  const coverImg = vendor.coverImage || vendor.cover_image

  return (
    <Link to={`/providers/${vendor.id}`} className="vendor-card">
      <div
        className="vendor-image"
        style={{
          background: coverImg
            ? `linear-gradient(rgba(0,0,0,0.12), rgba(0,0,0,0.35)), url(${coverImg}) center/cover no-repeat`
            : meta.bg,
        }}
      >
        <button
          type="button"
          className={`vendor-favorite ${favorited ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={favorited ? 'Remove from saved' : 'Save vendor'}
        >
          {favorited ? ICONS.heartFilled(20) : ICONS.heart(20)}
        </button>

        <div
          className="vendor-badge-wrap"
          style={{
            overflow: 'hidden',
            border: '3px solid #fff',
            borderRadius: 24,
            background: '#fff',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          }}
        >
          {profileImg ? (
            <img
              src={profileImg}
              alt={vendor.businessName || vendor.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          ) : (
            meta.svg(50)
          )}
        </div>

        {vendor.verified ? (
          <span className="verified">
            {ICONS.verifiedBadge(14)} {t('verified', 'Verified')}
          </span>
        ) : (
          <span className="new-badge">{t('popular', 'Popular')}</span>
        )}
      </div>

      <div className="vendor-body">
        <h3 className="vendor-name">{vendor.businessName || vendor.name}</h3>
        <div className="vendor-category">
          {t(vendor.category, vendor.category)} &middot; {vendor.experience || 'Experienced'}
        </div>

        <div className="rating-row">
          {Number(vendor.rating || 0) > 0 && Number(vendor.reviewCount || vendor.reviews || 0) > 0 ? (
            <>
              <RatingStars rating={vendor.rating} />
              <strong>{Number(vendor.rating).toFixed(1)}</strong>
              <span style={{ color: 'var(--muted)', fontSize: '12px' }}>
                ({vendor.reviewCount || vendor.reviews} {t('reviews', 'reviews')})
              </span>
            </>
          ) : (
            <span style={{ color: 'var(--muted)', fontSize: '12px' }}>
              {t('noRatingsYet', 'No ratings yet')}
            </span>
          )}
        </div>

        <div className="vendor-location">
          <span>{ICONS.mapPin(14, 'var(--muted)')}</span>
          <span>{vendor.location || 'Rajapalayam'} &middot; {String(vendor.completedEvents || '50+').replace(/\.0+$/, '')} {t('events', 'events')}</span>
        </div>

        <div className="vendor-bottom">
          <span>{t('startingPrice', 'Starting price')}</span>
          <span className="vendor-price">{vendor.price || 'On request'}</span>
        </div>
      </div>
    </Link>
  )
}
