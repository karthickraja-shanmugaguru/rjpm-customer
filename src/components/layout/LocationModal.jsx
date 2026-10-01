import React, { useState } from 'react'
import { useLocation } from '../../context/LocationContext'
import { useLanguage } from '../../context/LanguageContext'
import { useToast } from '../../context/ToastContext'
import { ICONS } from '../../constants/icons'

const POPULAR_LOCALITIES = [
  'T. Nagar',
  'Adyar',
  'Anna Nagar',
  'Velachery',
  'OMR',
  'Mylapore',
  'Tambaram',
  'Besant Nagar',
  'Porur',
  'Guindy',
  'Nungambakkam',
  'Kilpauk',
]

export const LocationModal = () => {
  const { location, updateLocation, isLocationModalOpen, closeLocationPicker } = useLocation()
  const { t } = useLanguage()
  const { showToast } = useToast()
  const [customInput, setCustomInput] = useState('')

  if (!isLocationModalOpen) return null

  const handleSelect = (loc) => {
    updateLocation(loc)
    closeLocationPicker()
    showToast(`Celebration location set to ${loc}`)
  }

  const handleCustomSubmit = (e) => {
    e.preventDefault()
    if (customInput.trim()) {
      handleSelect(customInput.trim())
      setCustomInput('')
    }
  }

  return (
    <div className="modal-overlay" onClick={closeLocationPicker}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={closeLocationPicker} aria-label="Close">
          ✕
        </button>
        <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '6px' }}>
          {t('selectLocation', 'Select Celebration Location')}
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '20px' }}>
          {t('exploreArea', 'Explore verified vendors and services in your area.')}
        </p>

        <form onSubmit={handleCustomSubmit} style={{ marginBottom: '22px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              className="form-control"
              placeholder={t('locationPlaceholder', 'Enter city or area (e.g. T. Nagar, Chennai)')}
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              autoFocus
            />
            <button type="submit" className="btn btn-primary" style={{ flexShrink: 0 }}>
              {t('apply', 'Apply')}
            </button>
          </div>
        </form>

        <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--muted)', letterSpacing: '0.05em', marginBottom: '12px' }}>
          {t('popularAreas', 'Popular Chennai Localities')}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {POPULAR_LOCALITIES.map((loc) => {
            const isSelected = location.toLowerCase().includes(loc.toLowerCase())
            return (
              <button
                key={loc}
                type="button"
                onClick={() => handleSelect(loc)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: isSelected ? '1px solid var(--primary)' : '1px solid var(--border)',
                  background: isSelected ? 'var(--primary-light)' : 'var(--surface)',
                  color: isSelected ? 'var(--primary)' : 'var(--text)',
                  fontWeight: isSelected ? 700 : 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: '0.2s',
                }}
              >
                <span>{ICONS.mapPin(14, isSelected ? 'var(--primary)' : 'var(--muted)')}</span>
                {loc}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
