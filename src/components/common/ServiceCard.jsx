import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CATEGORY_META } from '../../constants/categoryMeta'
import { ICONS } from '../../constants/icons'
import { useFavorites } from '../../context/FavoritesContext'
import { MessageCircle } from 'lucide-react'

export const ServiceCard = ({ service }) => {
  const navigate = useNavigate()
  const { isServiceFavorited, toggleFavoriteService } = useFavorites()
  const favorited = isServiceFavorited ? isServiceFavorited(service.id) : false

  const handleCardClick = (e) => {
    // If the click originated from an interactive element like button or link, let it handle its own action
    if (e.target.closest('button') || e.target.closest('a')) {
      return
    }
    navigate(`/services/${service.id}`)
  }

  const handleFavoriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (toggleFavoriteService) {
      toggleFavoriteService(service.id)
    }
  }

  const meta = CATEGORY_META[service.category_name || service.category] || CATEGORY_META['Catering']
  const coverImg = service.cover_image || service.coverImage
  const serviceName = service.name || service.title || 'Untitled Service'
  const categoryName = service.category_name || service.category || 'Service'
  const priceDisplay = service.price_display || (service.price ? `₹${Number(service.price).toLocaleString('en-IN')}` : 'Price on request')

  const handleWhatsApp = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const msg = encodeURIComponent(`Hi, I am interested in booking "${serviceName}" on rjpm.in.`)
    window.open(`https://wa.me/919876543210?text=${msg}`, '_blank')
  }

  return (
    <div
      className="service-card-modern"
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest('button') && !e.target.closest('a')) {
          e.preventDefault()
          navigate(`/services/${service.id}`)
        }
      }}
      tabIndex={0}
      role="button"
      style={{ cursor: 'pointer' }}
    >
      {/* Cover Photo / Header Banner */}
      <div className="service-card-banner">
        <button
          type="button"
          className={`vendor-favorite ${favorited ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={favorited ? 'Remove from saved' : 'Save service'}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 3,
          }}
        >
          {favorited ? ICONS.heartFilled(20) : ICONS.heart(20)}
        </button>

        {coverImg ? (
          <img
            src={coverImg}
            alt={serviceName}
            className="service-card-cover-img"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        ) : (
          <div className="service-card-banner-fallback" style={{ background: meta.bg }}>
            {meta.svg(46)}
          </div>
        )}
        <span className="service-card-cat-pill" style={{ color: meta.color }}>
          {categoryName}
        </span>
      </div>

      {/* Body Info */}
      <div className="service-card-body">
        <h3 className="service-card-heading">{serviceName}</h3>
        <p className="service-card-snippet">
          {service.description || 'Verified event service with turnkey execution and customized setup.'}
        </p>

        <div className="service-card-footer">
          <div className="service-card-price-block">
            <span className="service-card-amount">{priceDisplay}</span>
            <span className="service-card-unit">
              {service.pricing_type === 'PER_PLATE' ? '/ plate' : service.pricing_type === 'PER_DAY' ? '/ day' : 'onwards'}
            </span>
          </div>

          <div className="service-card-cta">
            <Link
              to={`/services/${service.id}`}
              className="btn btn-outline"
              onClick={(e) => e.stopPropagation()}
              style={{ minHeight: '34px', padding: '0 12px', fontSize: '12px' }}
            >
              Details
            </Link>
            <button
              type="button"
              className="btn btn-primary"
              style={{
                minHeight: '34px',
                padding: '0 12px',
                fontSize: '12px',
                background: '#16a34a',
                borderColor: '#16a34a',
                color: '#ffffff',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                cursor: 'pointer',
              }}
              onClick={handleWhatsApp}
            >
              <MessageCircle size={13} /> WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

