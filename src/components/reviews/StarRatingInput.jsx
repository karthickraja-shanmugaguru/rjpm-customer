import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Star, CheckCircle, Loader2 } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { useLanguage } from '../../context/LanguageContext'
import { reviewService } from '../../services/reviewService'

const LABELS = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent',
}

const LABELS_TA = {
  1: 'மோசம்',
  2: 'சுமார்',
  3: 'நன்று',
  4: 'மிக நன்று',
  5: 'சிறப்பானது',
}

export const StarRatingInput = ({
  providerId,
  providerName = '',
  initialRating = 0,
  onRatingSubmitted,
  compact = false,
}) => {
  const { isAuthenticated, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { showToast } = useToast()
  const { t, language } = useLanguage()

  const [rating, setRating] = useState(initialRating)
  const [hover, setHover] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [hasRated, setHasRated] = useState(Boolean(initialRating > 0))

  useEffect(() => {
    if (initialRating > 0) {
      setRating(initialRating)
      setHasRated(true)
    }
  }, [initialRating])

  const handleStarClick = async (starValue) => {
    if (!isAuthenticated) {
      showToast(t('signInToRate', 'Please sign in to rate'))
      navigate('/login', { state: { from: location } })
      return
    }

    if (submitting) return

    try {
      setSubmitting(true)
      setRating(starValue)

      const res = await reviewService.createReview({
        providerId: Number(providerId),
        rating: starValue,
        comment: '',
      })

      setHasRated(true)
      showToast(t('ratingSubmitted', 'Thank you for your rating!'))

      if (onRatingSubmitted && res?.data) {
        onRatingSubmitted(res.data)
      }
    } catch (err) {
      console.error('Failed to submit star rating:', err)
      showToast(err.response?.data?.message || 'Failed to submit rating. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const activeRating = hover || rating
  const labelsMap = language === 'ta' ? LABELS_TA : LABELS
  const currentLabel = labelsMap[activeRating] || ''

  if (compact) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          padding: '12px 14px',
          background: '#ffffff',
          borderRadius: 12,
          border: '1px solid #e2e8f0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>
            {hasRated ? t('yourRating', 'Your Rating') : t('rateThisService', 'Rate this Service')}
          </span>
          {submitting && <Loader2 size={14} className="spin" color="var(--primary)" />}
          {hasRated && !submitting && (
            <span style={{ fontSize: 12, color: '#16a34a', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600 }}>
              <CheckCircle size={13} /> {rating}.0 / 5
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {[1, 2, 3, 4, 5].map((star) => {
            const isFilled = star <= (hover || rating)
            return (
              <button
                key={star}
                type="button"
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                disabled={submitting}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  padding: 2,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: hover === star ? 'scale(1.2)' : 'scale(1)',
                  transition: 'transform 0.15s ease',
                }}
                aria-label={`Rate ${star} star`}
              >
                <Star
                  size={20}
                  fill={isFilled ? '#eab308' : 'none'}
                  color={isFilled ? '#eab308' : '#cbd5e1'}
                  strokeWidth={2}
                />
              </button>
            )
          })}
          {currentLabel && (
            <span style={{ fontSize: 12, color: '#64748b', marginLeft: 4, fontWeight: 500 }}>
              {currentLabel}
            </span>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        padding: '18px 20px',
        background: '#ffffff',
        borderRadius: 16,
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        marginTop: 16,
        marginBottom: 16,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <div>
          <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>
            {hasRated ? t('yourRating', 'Your Rating') : t('rateThisProvider', 'Rate this Provider')}
          </h4>
          <p style={{ margin: '2px 0 0 0', fontSize: 12, color: 'var(--muted)' }}>
            {hasRated
              ? (language === 'ta' ? 'மாற்ற விரும்பினால் வேறு நட்சத்திரத்தைத் தொடவும்' : 'Tap any star to update your rating')
              : (language === 'ta' ? 'உங்கள் அனுபவத்தை 1-5 நட்சத்திரங்களில் மதிப்பிடவும்' : 'Select 1 to 5 stars to share your experience')}
          </p>
        </div>

        {submitting ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--primary)', fontWeight: 600 }}>
            <Loader2 size={15} className="spin" />
            Saving...
          </span>
        ) : hasRated ? (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#16a34a', fontWeight: 700, background: '#f0fdf4', padding: '4px 10px', borderRadius: 20 }}>
            <CheckCircle size={14} /> {rating}.0 / 5
          </span>
        ) : null}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          {[1, 2, 3, 4, 5].map((star) => {
            const isFilled = star <= (hover || rating)
            return (
              <button
                key={star}
                type="button"
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                disabled={submitting}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  padding: 4,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: hover === star ? 'scale(1.25)' : 'scale(1)',
                  transition: 'transform 0.15s ease',
                }}
                aria-label={`Rate ${star} star`}
              >
                <Star
                  size={26}
                  fill={isFilled ? '#eab308' : 'none'}
                  color={isFilled ? '#eab308' : '#cbd5e1'}
                  strokeWidth={2}
                />
              </button>
            )
          })}
        </div>

        {currentLabel && (
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: '#d97706',
              background: '#fffbeb',
              padding: '4px 10px',
              borderRadius: 8,
              border: '1px solid #fef3c7',
            }}
          >
            {currentLabel}
          </span>
        )}

        {!isAuthenticated && (
          <span style={{ fontSize: 12, color: 'var(--muted)', marginLeft: 'auto' }}>
            {t('signInToRate', 'Please sign in to rate')}
          </span>
        )}
      </div>
    </div>
  )
}
