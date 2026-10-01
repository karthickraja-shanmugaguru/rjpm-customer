import React from 'react'
import { Link } from 'react-router-dom'
import { PACKAGE_META } from '../../constants/categoryMeta'
import { ICONS } from '../../constants/icons'
import { useFavorites } from '../../context/FavoritesContext'

export const PackageCard = ({ pkg }) => {
  const { isPackageFavorited, toggleFavoritePackage } = useFavorites()
  const favorited = isPackageFavorited ? isPackageFavorited(pkg.id) : false

  const handleFavoriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (toggleFavoritePackage) {
      toggleFavoritePackage(pkg.id)
    }
  }

  const eventType = pkg.event_type || pkg.type || pkg.eventType || 'Wedding'
  const meta = PACKAGE_META[eventType] || PACKAGE_META['Wedding']
  const cover = pkg.coverImage || pkg.cover_image || (Array.isArray(pkg.images) && pkg.images[0])
  const priceNum = pkg.priceAmount !== undefined ? pkg.priceAmount : (pkg.price !== undefined ? pkg.price : (parseFloat(String(pkg.price_display || pkg.priceDisplay || '').replace(/[^0-9.]/g, '')) || 0))
  const formattedPrice = priceNum > 0 ? `₹${Number(priceNum).toLocaleString('en-IN')}` : (pkg.price_display || pkg.priceDisplay || 'On request')
  const rawGuests = pkg.guestCapacity || pkg.guest_capacity || pkg.guests
  const guestDisplay = rawGuests ? `Up to ${String(rawGuests).replace(/^(Up to\s*)?/i, '').replace(/\s*guests\s*/gi, '').trim()} guests` : 'Complete bundle'

  return (
    <Link
      to={`/packages/${pkg.id}`}
      className="package-card"
      style={{
        padding: cover ? 0 : '24px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <button
        type="button"
        className={`vendor-favorite ${favorited ? 'active' : ''}`}
        onClick={handleFavoriteClick}
        aria-label={favorited ? 'Remove from saved' : 'Save package'}
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 3,
        }}
      >
        {favorited ? ICONS.heartFilled(20) : ICONS.heart(20)}
      </button>

      {cover ? (
        <div style={{ position: 'relative', width: '100%', height: 160, overflow: 'hidden', background: '#f8fafc' }}>
          <img
            src={cover}
            alt={pkg.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.35s ease',
            }}
          />
          <span
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(6px)',
              padding: '4px 10px',
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 700,
              color: 'var(--text)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            }}
          >
            <span>{pkg.icon || '✨'}</span> {eventType}
          </span>
        </div>
      ) : (
        <div className="package-icon" style={{ background: meta.bg, border: `1px solid ${meta.color}25` }}>
          {meta.svg(32)}
        </div>
      )}

      <div style={{ padding: cover ? '16px 18px 20px' : '0', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ margin: '0 0 5px', fontSize: 17, fontWeight: 800 }}>{pkg.name}</h3>
        <p style={{ margin: '0 0 12px', fontSize: 13, color: 'var(--muted)', lineHeight: 1.45 }}>
          {pkg.includes || pkg.description || `${eventType} celebration bundle`}
        </p>

        <div style={{ marginTop: 'auto', paddingTop: '8px' }}>
          <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text)', marginBottom: '4px' }}>
            {formattedPrice}
          </div>
          <span className="package-count">
            {guestDisplay}
          </span>
        </div>

        <div className="package-arrow">
          {ICONS.arrowRight(16)}
        </div>
      </div>
    </Link>
  )
}
