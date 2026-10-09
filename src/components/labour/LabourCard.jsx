import React from 'react'
import { Users, MapPin, CheckCircle2, Star, ShieldCheck, ArrowRight } from 'lucide-react'
import { RatingStars } from '../common/RatingStars'

export const LabourCard = ({ item, onBook }) => {
  return (
    <div
      className="card vendor-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px',
        borderRadius: '18px',
        border: '1px solid var(--border-light, #e2e8f0)',
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {item.cover_image || item.coverImage || (Array.isArray(item.images) && item.images[0]) ? (
              <img
                src={item.cover_image || item.coverImage || item.images[0]}
                alt={item.title || item.name}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '12px',
                  objectFit: 'cover',
                  border: '1px solid var(--border-light, #e2e8f0)',
                }}
              />
            ) : (
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                  color: '#1a73e8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                }}
              >
                {item.avatarText || 'LB'}
              </div>
            )}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: 'var(--text, #202124)' }}>
                  {item.title || item.name}
                </h3>
                {item.verified && (
                  <span title="Verified Staff" style={{ color: '#1a73e8', display: 'flex' }}>
                    <ShieldCheck size={16} fill="#1a73e8" color="#fff" />
                  </span>
                )}
              </div>
              <div style={{ fontSize: 13, color: 'var(--muted, #5f6368)', marginTop: 2 }}>
                By {item.providerName || 'HelpingHands Staffing'} &middot; {item.city || 'Rajapalayam'}
              </div>
            </div>
          </div>
        </div>

        <p style={{ fontSize: 13, color: '#4b5563', lineHeight: 1.5, margin: '10px 0 14px' }}>
          {item.description || 'Professional, uniformed event staff trained for high-end banquets, marriages, and private gatherings.'}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          <span
            style={{
              padding: '4px 10px',
              borderRadius: 20,
              fontSize: 12,
              background: '#f1f5f9',
              color: '#475569',
              fontWeight: 500,
            }}
          >
            {item.category || 'Event Staff'}
          </span>
          <span
            style={{
              padding: '4px 10px',
              borderRadius: 20,
              fontSize: 12,
              background: '#e8f0fe',
              color: '#1a73e8',
              fontWeight: 500,
            }}
          >
            Uniformed & Trained
          </span>
          <span
            style={{
              padding: '4px 10px',
              borderRadius: 20,
              fontSize: 12,
              background: '#f0fdf4',
              color: '#16a34a',
              fontWeight: 500,
            }}
          >
            Available This Week
          </span>
        </div>
      </div>

      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            paddingTop: 12,
            borderTop: '1px solid #f1f5f9',
            marginBottom: 14,
          }}
        >
          <div>
            <span style={{ fontSize: 12, color: 'var(--muted, #5f6368)', display: 'block' }}>Daily shift rate</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text, #202124)' }}>
              ₹{Number(item.price || 950).toLocaleString('en-IN')}
            </span>
            <span style={{ fontSize: 12, color: '#64748b' }}> / person</span>
          </div>
          {Number(item.rating || 0) > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <RatingStars rating={item.rating} />
              <strong style={{ fontSize: 13, marginLeft: 4 }}>{Number(item.rating).toFixed(1)}</strong>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12 }}>
          <button
            type="button"
            className="btn btn-outline"
            style={{ padding: '8px 12px', borderRadius: 20, fontSize: 13, fontWeight: 700 }}
            onClick={(e) => {
              e.stopPropagation()
              const raw = String(item.phone || item.service_phone || '9360226758').replace(/\s+/g, '')
              window.location.href = `tel:${raw}`
            }}
          >
            Call
          </button>
          <button
            type="button"
            className="btn btn-primary"
            style={{ padding: '8px 12px', borderRadius: 20, fontSize: 13, fontWeight: 700, background: '#16a34a', borderColor: '#16a34a', color: '#fff' }}
            onClick={(e) => {
              e.stopPropagation()
              let raw = String(item.whatsapp || item.service_whatsapp || item.phone || item.service_phone || '9360226758').replace(/[^0-9]/g, '')
              if (raw.length === 10) raw = `91${raw}`
              const msg = encodeURIComponent(`Hi, I am interested in booking "${item.name}" via rjpm.in.`)
              window.open(`https://wa.me/${raw}?text=${msg}`, '_blank')
            }}
          >
            WhatsApp
          </button>
        </div>
      </div>
    </div>
  )
}
