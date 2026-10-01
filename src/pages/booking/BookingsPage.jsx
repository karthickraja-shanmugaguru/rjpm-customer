import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { bookingService } from '../../services/bookingService'
import { reviewService } from '../../services/reviewService'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { useLanguage } from '../../context/LanguageContext'
import { RatingStars } from '../../components/common/RatingStars'
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Store,
  Phone,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Star,
  RefreshCw,
  MessageSquare,
} from 'lucide-react'

export const BookingsPage = () => {
  const { isAuthenticated, user } = useAuth()
  const { showToast } = useToast()
  const { t } = useLanguage()

  const [activeTab, setActiveTab] = useState('All') // 'All', 'Pending', 'Accepted', 'Completed', 'Cancelled'
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Review modal state
  const [reviewBooking, setReviewBooking] = useState(null)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [submittingReview, setSubmittingReview] = useState(false)

  const fetchBookings = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await bookingService.getBookings()
      setBookings(res.data || [])
    } catch (err) {
      setError(err?.message || 'Failed to load bookings.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  const filteredBookings =
    activeTab === 'All'
      ? bookings
      : bookings.filter((b) => b.status?.toUpperCase() === activeTab.toUpperCase())

  const getStatusBadge = (status) => {
    const s = status?.toUpperCase()
    if (s === 'ACCEPTED') {
      return (
        <span
          style={{
            padding: '4px 12px',
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 700,
            background: '#dcfce7',
            color: '#16a34a',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <CheckCircle2 size={14} /> Accepted
        </span>
      )
    }
    if (s === 'PENDING') {
      return (
        <span
          style={{
            padding: '4px 12px',
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 700,
            background: '#fef3c7',
            color: '#d97706',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Clock size={14} /> Pending Provider Response
        </span>
      )
    }
    if (s === 'COMPLETED') {
      return (
        <span
          style={{
            padding: '4px 12px',
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 700,
            background: '#e0f2fe',
            color: '#0284c7',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <CheckCircle2 size={14} /> Completed
        </span>
      )
    }
    if (s === 'DECLINED' || s === 'CANCELLED') {
      return (
        <span
          style={{
            padding: '4px 12px',
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 700,
            background: '#fee2e2',
            color: '#dc2626',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <XCircle size={14} /> {s === 'DECLINED' ? 'Declined' : 'Cancelled'}
        </span>
      )
    }
    return <span className="status-badge">{status}</span>
  }

  const handleOpenReview = (booking) => {
    setReviewBooking(booking)
    setRating(5)
    setComment('')
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    if (!comment.trim()) {
      showToast('Please enter your review feedback.')
      return
    }

    setSubmittingReview(true)
    try {
      await reviewService.createReview({
        providerId: reviewBooking.providerId,
        bookingId: reviewBooking.id,
        rating,
        comment,
      })
      showToast('Thank you! Your review has been submitted.')
      setReviewBooking(null)
      fetchBookings()
    } catch (err) {
      showToast(err?.response?.data?.message || err?.message || 'Failed to submit review.')
    } finally {
      setSubmittingReview(false)
    }
  }

  return (
    <section id="bookings" className="screen active" style={{ display: 'block' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 className="page-title" style={{ margin: 0 }}>
          {t('bookingsTitle', 'My Bookings & Enquiries')}
        </h1>
        <p className="page-description" style={{ marginTop: 6, color: 'var(--muted)' }}>
          {t('bookingsSubtitle', 'Track quotes, provider responses, and upcoming celebration schedules.')}
        </p>
      </div>

      {/* Tabs */}
      <div className="tabs" style={{ marginBottom: 24 }}>
        {[
          { key: 'All', label: t('tabAll', 'All') },
          { key: 'Pending', label: t('tabPending', 'Pending') },
          { key: 'Accepted', label: t('tabAccepted', 'Confirmed') },
          { key: 'Completed', label: t('tabCompleted', 'Completed') },
          { key: 'Cancelled', label: t('tabCancelled', 'Cancelled') },
        ].map((tab) => (
          <button
            key={tab.key}
            className={`tab ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)' }}>
          <RefreshCw size={32} className="spin-animation" style={{ margin: '0 auto 12px' }} />
          <p>Loading your event reservations...</p>
        </div>
      ) : error ? (
        <div
          style={{
            padding: '40px 20px',
            textAlign: 'center',
            background: '#fef2f2',
            borderRadius: 16,
            border: '1px solid #fee2e2',
            color: '#dc2626',
          }}
        >
          <AlertCircle size={36} style={{ margin: '0 auto 8px' }} />
          <p>{error}</p>
          <button className="btn btn-primary" onClick={fetchBookings}>
            Try Again
          </button>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: '#fff',
            borderRadius: 16,
            border: '1px solid var(--border-light, #e2e8f0)',
          }}
        >
          <Calendar size={44} color="#94a3b8" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px' }}>
            {t('noBookingsFound', 'No bookings found')}
          </h3>
          <p style={{ color: 'var(--muted)', fontSize: 14, margin: '0 0 20px' }}>
            {t('noBookingsSubtitle', 'You have not made any bookings in this section yet.')}
          </p>
          <Link to="/explore" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            {t('exploreServicesBtn', 'Explore Event Services')}
          </Link>
        </div>
      ) : (
        <div className="booking-list" id="bookingCardList" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filteredBookings.map((b) => {
            const providerName = b.provider?.businessName || b.providerName || 'Sri Lakshmi Events & Catering'
            const itemTitle = b.service?.title || b.package?.name || b.serviceName || 'Custom Event Service'

            return (
              <div
                key={b.id}
                className="card"
                style={{
                  padding: 20,
                  borderRadius: 16,
                  border: '1px solid var(--border-light, #e2e8f0)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 14 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0, color: 'var(--text)' }}>
                        {itemTitle}
                      </h3>
                      {getStatusBadge(b.status)}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 600, marginTop: 4 }}>
                      <Link to={`/providers/${b.providerId}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        By {providerName} &rarr;
                      </Link>
                    </div>
                  </div>

                  {b.totalAmount > 0 && (
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: 12, color: 'var(--muted)', display: 'block' }}>Estimated Value</span>
                      <strong style={{ fontSize: 18, color: 'var(--text)' }}>
                        ₹{Number(b.totalAmount).toLocaleString('en-IN')}
                      </strong>
                    </div>
                  )}
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: 12,
                    padding: '12px 16px',
                    background: '#f8fafc',
                    borderRadius: 12,
                    fontSize: 13,
                    marginBottom: 14,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-2)' }}>
                    <Calendar size={16} color="var(--primary)" />
                    <span>
                      Date: <strong>{b.eventDate || 'Scheduled Date'}</strong>
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-2)' }}>
                    <Users size={16} color="var(--primary)" />
                    <span>
                      Guests: <strong>{b.guestCount || '150'}</strong>
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-2)' }}>
                    <MapPin size={16} color="var(--primary)" />
                    <span>
                      Venue: <strong>{b.venueCity || 'Chennai'}</strong>
                    </span>
                  </div>
                </div>

                {b.notes && (
                  <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 14px 0', lineHeight: 1.5 }}>
                    <strong>Your notes:</strong> {b.notes}
                  </p>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, paddingTop: 12, borderTop: '1px solid #f1f5f9' }}>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                    Booking Ref: #{b.id} &middot; Created on {b.createdAt ? new Date(b.createdAt).toLocaleDateString() : 'Today'}
                  </div>

                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      className="btn btn-outline"
                      style={{ padding: '6px 14px', borderRadius: 20, fontSize: 13 }}
                      onClick={() => {
                        if (b.provider?.phone) {
                          window.location.href = `tel:${b.provider.phone}`
                        } else {
                          showToast(`Contacting provider: +91 98765 43210`)
                        }
                      }}
                    >
                      <Phone size={14} /> Call Provider
                    </button>

                    {b.status?.toUpperCase() === 'COMPLETED' && !b.reviewed && (
                      <button
                        className="btn btn-primary"
                        style={{ padding: '6px 14px', borderRadius: 20, fontSize: 13 }}
                        onClick={() => handleOpenReview(b)}
                      >
                        <Star size={14} /> Write Review
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Review Modal */}
      {reviewBooking && (
        <div className="modal-overlay open" onClick={() => setReviewBooking(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 480 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px 0' }}>
              Review {reviewBooking.provider?.businessName || 'Provider'}
            </h2>
            <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 16px 0' }}>
              Share your celebration experience with other hosts.
            </p>

            <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>Rating</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 2,
                      }}
                    >
                      <Star
                        size={28}
                        fill={star <= rating ? '#f59e0b' : 'none'}
                        color={star <= rating ? '#f59e0b' : '#cbd5e1'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>
                  Your Comments
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="How was the food quality, punctuality, and staff behaviour?"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: 13,
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
                <button
                  type="button"
                  onClick={() => setReviewBooking(null)}
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    background: '#fff',
                    fontWeight: 600,
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="btn btn-primary"
                  style={{ flex: 2, borderRadius: 8 }}
                >
                  {submittingReview ? 'Submitting...' : 'Post Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
