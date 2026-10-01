import React, { useState } from 'react'
import { Calendar, Users, MapPin, MessageSquare, Phone, User, CheckCircle2, X } from 'lucide-react'
import { bookingService } from '../../services/bookingService'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { useNavigate } from 'react-router-dom'

export const BookingEnquiryModal = ({ isOpen, onClose, targetItem, type = 'service' }) => {
  const { user, isAuthenticated } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    eventType: 'Wedding',
    eventDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
    guestCount: 150,
    venueCity: 'Chennai',
    venueAddress: '',
    customerName: user?.name || '',
    customerPhone: user?.phone || '',
    notes: '',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.customerPhone) {
      setError('Please provide your contact phone number.')
      return
    }

    if (!formData.eventDate) {
      setError('Please select an event date.')
      return
    }

    setLoading(true)
    try {
      const payload = {
        providerId: targetItem?.providerId || targetItem?.id,
        serviceId: type === 'service' ? targetItem?.id : null,
        packageId: type === 'package' ? targetItem?.id : null,
        eventType: formData.eventType,
        eventDate: formData.eventDate,
        guestCount: Number(formData.guestCount) || 100,
        venueCity: formData.venueCity,
        venueAddress: formData.venueAddress,
        customerName: formData.customerName || user?.name || 'Customer',
        customerPhone: formData.customerPhone || user?.phone || '9876543210',
        notes: formData.notes,
      }

      await bookingService.createEnquiry(payload)
      setSuccess(true)
      showToast('Enquiry sent successfully! The provider will contact you shortly.')
      setTimeout(() => {
        setSuccess(false)
        onClose()
        if (isAuthenticated) {
          navigate('/bookings')
        }
      }, 1800)
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || 'Failed to submit enquiry. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay open" onClick={onClose}>
      <div
        className="modal-box"
        style={{ maxWidth: 540, width: '92%', maxHeight: '90vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              Send Booking Enquiry
            </h2>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
              {targetItem?.title || targetItem?.name || targetItem?.businessName || 'Service Provider'}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#f1f5f9',
              border: 'none',
              borderRadius: '50%',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={18} color="#64748b" />
          </button>
        </div>

        {success ? (
          <div style={{ textAlign: 'center', padding: '32px 16px' }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: '#dcfce7',
                color: '#16a34a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
              }}
            >
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px 0', color: '#16a34a' }}>
              Enquiry Submitted!
            </h3>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: 0 }}>
              The provider has received your requirements and will respond shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {error && (
              <div
                style={{
                  background: '#fef2f2',
                  border: '1px solid #fee2e2',
                  color: '#dc2626',
                  padding: '8px 12px',
                  borderRadius: 8,
                  fontSize: 13,
                }}
              >
                {error}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: '#475569' }}>
                  Event Type
                </label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: 13,
                    background: '#fff',
                  }}
                >
                  <option value="Wedding">Wedding</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Reception">Reception</option>
                  <option value="Engagement">Engagement</option>
                  <option value="Housewarming">Housewarming</option>
                  <option value="Baby Shower">Baby Shower</option>
                  <option value="Corporate">Corporate Event</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: '#475569' }}>
                  Event Date
                </label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: 13,
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: '#475569' }}>
                  Expected Guests
                </label>
                <input
                  type="number"
                  name="guestCount"
                  min="1"
                  value={formData.guestCount}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: 13,
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: '#475569' }}>
                  City / Locality
                </label>
                <input
                  type="text"
                  name="venueCity"
                  value={formData.venueCity}
                  onChange={handleChange}
                  required
                  placeholder="e.g. T. Nagar, Chennai"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: 13,
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: '#475569' }}>
                Venue Address (Optional)
              </label>
              <input
                type="text"
                name="venueAddress"
                value={formData.venueAddress}
                onChange={handleChange}
                placeholder="Hall or venue details"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: 8,
                  border: '1px solid #cbd5e1',
                  fontSize: 13,
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: '#475569' }}>
                  Your Name
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                  placeholder="Full Name"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: 13,
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: '#475569' }}>
                  Your Mobile Number
                </label>
                <input
                  type="tel"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  required
                  placeholder="10-digit mobile"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid #cbd5e1',
                    fontSize: 13,
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4, color: '#475569' }}>
                Specific Requirements / Notes
              </label>
              <textarea
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleChange}
                placeholder="e.g. Pure vegetarian food counter needed, specific floral theme, etc."
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: 8,
                  border: '1px solid #cbd5e1',
                  fontSize: 13,
                  fontFamily: 'inherit',
                  resize: 'vertical',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  borderRadius: 8,
                  border: '1px solid #cbd5e1',
                  background: '#fff',
                  color: '#475569',
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 2,
                  padding: '10px 16px',
                  borderRadius: 8,
                  border: 'none',
                  background: 'var(--brand-primary, #1a73e8)',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                }}
              >
                {loading ? 'Submitting...' : 'Submit Booking Request'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
