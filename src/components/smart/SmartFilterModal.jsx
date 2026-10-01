import React, { useState, useEffect } from 'react'
import {
  SMART_SERVICE_CATEGORIES,
  SMART_PRESETS,
  calculateSmartMatches,
} from '../../utils/smartFilterEngine'
import { useLanguage } from '../../context/LanguageContext'
import { Sparkles, Check, X, RotateCcw, ArrowRight, CheckSquare, Square } from 'lucide-react'

const DEFAULT_SERVICES = ['Mehendi']

export const SmartFilterModal = ({
  isOpen,
  onClose,
  initialServices,
  initialMinBudget = 10000,
  initialMaxBudget = 80000,
  onApply,
  packages = [],
  services = [],
}) => {
  const { language, t } = useLanguage()

  const liveCategoryNames = Array.from(
    new Set((services || []).map((s) => s.category_name || s.category).filter(Boolean))
  )

  const [selectedServices, setSelectedServices] = useState(() => {
    if (Array.isArray(initialServices) && initialServices.length > 0) return initialServices
    return liveCategoryNames.length > 0 ? liveCategoryNames : DEFAULT_SERVICES
  })
  const [minBudget, setMinBudget] = useState(initialMinBudget || 10000)
  const [maxBudget, setMaxBudget] = useState(initialMaxBudget || 80000)
  const [activePreset, setActivePreset] = useState('')

  useEffect(() => {
    if (isOpen) {
      const activeCats = Array.from(
        new Set((services || []).map((s) => s.category_name || s.category).filter(Boolean))
      )
      const list = Array.isArray(initialServices) && initialServices.length > 0
        ? initialServices
        : activeCats.length > 0
        ? activeCats
        : DEFAULT_SERVICES
      setSelectedServices(list)
      setMinBudget(Number(initialMinBudget) || 10000)
      setMaxBudget(Number(initialMaxBudget) || 80000)
      setActivePreset('')
    }
  }, [isOpen])

  const getLiveMatchCount = (catId) => {
    return (services || []).filter((s) => {
      const sCat = (s.category_name || s.category || '').toLowerCase()
      if (sCat === catId.toLowerCase()) return true
      const meta = SMART_SERVICE_CATEGORIES.find((c) => c.id === catId)
      return meta && meta.keywords.some((kw) => (s.name || '').toLowerCase().includes(kw))
    }).length
  }

  if (!isOpen) return null

  const toggleService = (serviceId) => {
    setActivePreset('')
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    )
  }

  const handleSelectAll = () => {
    setActivePreset('')
    setSelectedServices(SMART_SERVICE_CATEGORIES.map((c) => c.id))
  }

  const handleClearAllServices = () => {
    setActivePreset('')
    setSelectedServices([])
  }

  const applyPreset = (preset) => {
    setActivePreset(preset.id)
    setSelectedServices([...preset.services])
    setMinBudget(preset.minBudget || 20000)
    setMaxBudget(preset.maxBudget || 80000)
  }

  const handleReset = () => {
    setSelectedServices(DEFAULT_SERVICES)
    setMinBudget(20000)
    setMaxBudget(80000)
    setActivePreset('')
  }

  const applyBudgetPreset = (min, max) => {
    setMinBudget(min)
    setMaxBudget(max)
  }

  // Live calculation for preview
  const preview = calculateSmartMatches({
    selectedServices,
    minBudget,
    maxBudget,
    packages,
    services,
  })

  const handleApply = (e) => {
    if (e) e.preventDefault()
    if (selectedServices.length === 0) return

    onApply({
      selectedServices,
      minBudget,
      maxBudget,
      preview,
    })
    onClose()

    // Smooth scroll down to results container
    setTimeout(() => {
      const resultsEl = document.getElementById('smart-results') || document.querySelector('.smart-results-container')
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 120)
  }

  const budgetRanges = [
    { label: '₹15k - ₹40k', min: 15000, max: 40000 },
    { label: '₹40k - ₹80k', min: 40000, max: 80000 },
    { label: '₹80k - ₹1.5L', min: 80000, max: 150000 },
    { label: '₹1.5L - ₹3L', min: 150000, max: 300000 },
    { label: '₹3L - ₹5L', min: 300000, max: 500000 },
  ]

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 5000, padding: 14 }}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 720,
          width: '100%',
          padding: '24px 22px',
          borderRadius: 24,
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                background: 'linear-gradient(135deg, #1a73e8 0%, #7c3aed 100%)',
                color: '#fff',
                display: 'grid',
                placeItems: 'center',
                boxShadow: '0 4px 14px rgba(124, 58, 237, 0.3)',
                flexShrink: 0,
              }}
            >
              <Sparkles size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0, letterSpacing: '-0.3px', color: 'var(--text)' }}>
                {t('smartFilter', 'Smart Package & Budget Filter')}
              </h2>
              <p style={{ margin: '3px 0 0', fontSize: 13, color: 'var(--muted)' }}>
                {language === 'ta'
                  ? 'சேவைகளையும் உங்கள் குறைந்த & அதிகபட்ச பட்ஜெட்டையும் தேர்வு செய்து சிறந்த தொகுப்புகளைக் கண்டறியுங்கள்.'
                  : 'Select required services and set your min & max budget to find matching packages.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="modal-close"
            style={{
              position: 'static',
              width: 32,
              height: 32,
              borderRadius: 16,
              background: '#f1f5f9',
              border: 'none',
              display: 'grid',
              placeItems: 'center',
              color: 'var(--muted)',
              cursor: 'pointer',
            }}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div style={{ overflowY: 'auto', flex: 1, paddingRight: 4, margin: '4px 0 12px' }}>
          {/* Quick Presets */}
          <div style={{ marginBottom: 16, background: '#faf5ff', padding: '10px 14px', borderRadius: 16, border: '1px solid #f3e8ff' }}>
            <label style={{ fontSize: 11, fontWeight: 800, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 8 }}>
              ✨ {language === 'ta' ? 'விரைவு நிகழ்வு தேர்வுகள் (Presets)' : 'Quick Event Presets'}
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {SMART_PRESETS.map((p) => {
                const isActive = activePreset === p.id
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => applyPreset(p)}
                    style={{
                      padding: '7px 14px',
                      borderRadius: 18,
                      fontSize: 12,
                      fontWeight: 700,
                      border: isActive ? '1.5px solid #7c3aed' : '1px solid #e9d5ff',
                      background: isActive ? '#7c3aed' : '#ffffff',
                      color: isActive ? '#ffffff' : '#6b21a8',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      boxShadow: isActive ? '0 2px 8px rgba(124, 58, 237, 0.25)' : 'none',
                    }}
                  >
                    {language === 'ta' ? p.nameTa : p.name}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Section 1: All 20 Services (NO prices mentioned) */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {language === 'ta' ? '1. தேவையான சேவைகளைத் தேர்ந்தெடுக்கவும்' : '1. Select Required Services'}
                </label>
                <span
                  style={{
                    marginLeft: 8,
                    fontSize: 12,
                    color: 'var(--primary)',
                    fontWeight: 800,
                    background: 'var(--primary-light, #eff6ff)',
                    padding: '2px 8px',
                    borderRadius: 10,
                  }}
                >
                  {selectedServices.length} / {SMART_SERVICE_CATEGORIES.length} {language === 'ta' ? 'தேர்வு' : 'selected'}
                </span>
              </div>

              {/* Convenience buttons: Select All / Clear All */}
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  type="button"
                  onClick={handleSelectAll}
                  style={{
                    background: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    padding: '4px 10px',
                    borderRadius: 12,
                    fontSize: 11,
                    fontWeight: 700,
                    color: 'var(--text)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <CheckSquare size={13} color="var(--primary)" />
                  {language === 'ta' ? 'அனைத்தையும் தேர்ந்தெடு' : 'Select All'}
                </button>
                <button
                  type="button"
                  onClick={handleClearAllServices}
                  style={{
                    background: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    padding: '4px 10px',
                    borderRadius: 12,
                    fontSize: 11,
                    fontWeight: 700,
                    color: 'var(--muted)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <Square size={13} />
                  {language === 'ta' ? 'நீக்கு' : 'Clear All'}
                </button>
              </div>
            </div>

            {/* Grid of ALL 20 Services - NO prices mentioned */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
                gap: 8,
              }}
            >
              {SMART_SERVICE_CATEGORIES.map((cat) => {
                const isChecked = selectedServices.includes(cat.id)
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleService(cat.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '10px 12px',
                      borderRadius: 14,
                      cursor: 'pointer',
                      border: isChecked ? '1.5px solid var(--primary, #1a73e8)' : '1px solid var(--border-light, #e2e8f0)',
                      background: isChecked ? 'var(--primary-light, #eff6ff)' : '#fff',
                      transition: 'all 0.15s ease',
                      boxShadow: isChecked ? '0 2px 8px rgba(26,115,232,0.12)' : '0 1px 2px rgba(0,0,0,0.02)',
                      textAlign: 'left',
                      fontFamily: 'inherit',
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: isChecked ? '#fff' : '#f8fafc',
                        border: '1px solid #e2e8f0',
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: 16,
                        flexShrink: 0,
                      }}
                    >
                      {cat.icon}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          lineHeight: 1.25,
                          color: isChecked ? 'var(--primary)' : 'var(--text)',
                        }}
                      >
                        {language === 'ta' ? cat.nameTa : cat.name}
                      </div>
                      {getLiveMatchCount(cat.id) > 0 && (
                        <div style={{ fontSize: 10, color: '#16a34a', fontWeight: 800, marginTop: 2, display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                          <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: 3, background: '#16a34a' }} />
                          {getLiveMatchCount(cat.id)} {language === 'ta' ? 'சேவை தயார்' : 'live in Rajapalayam'}
                        </div>
                      )}
                    </div>

                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 9,
                        border: isChecked ? 'none' : '1.5px solid #cbd5e1',
                        background: isChecked ? 'var(--primary, #1a73e8)' : 'transparent',
                        color: '#fff',
                        display: 'grid',
                        placeItems: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {isChecked && <Check size={12} strokeWidth={3} />}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Section 2: MIN & MAX BUDGET CONTROLS */}
          <div style={{ marginBottom: 18, background: '#f8fafc', padding: '16px 18px', borderRadius: 18, border: '1px solid #e2e8f0' }}>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {language === 'ta' ? '2. பட்ஜெட் வரம்பு (குறைந்தபட்சம் & அதிகபட்சம்)' : '2. Budget Range (Min & Max)'}
              </label>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                {language === 'ta'
                  ? 'உங்கள் பட்ஜெட் வரம்பிற்குள் உள்ள தொகுப்புகள் மற்றும் விற்பனையாளர்கள் வடிகட்டப்படும்'
                  : 'Packages & services will be matched between your minimum and maximum budget'}
              </div>
            </div>

            {/* Dual Range Numeric Inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              {/* Min Budget Input */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  {language === 'ta' ? 'குறைந்தபட்ச பட்ஜெட் (Min)' : 'Minimum Budget (Min)'}
                </label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <span style={{ position: 'absolute', left: 12, fontWeight: 700, color: 'var(--muted)' }}>₹</span>
                  <input
                    type="number"
                    min={5000}
                    max={maxBudget - 5000}
                    step={5000}
                    value={minBudget}
                    onChange={(e) => setMinBudget(Math.min(Number(e.target.value) || 0, maxBudget - 5000))}
                    style={{
                      width: '100%',
                      padding: '8px 12px 8px 28px',
                      borderRadius: 12,
                      border: '1.5px solid #cbd5e1',
                      fontSize: 15,
                      fontWeight: 700,
                      color: 'var(--text)',
                      background: '#fff',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Max Budget Input */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
                  {language === 'ta' ? 'அதிகபட்ச பட்ஜெட் (Max)' : 'Maximum Budget (Max)'}
                </label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <span style={{ position: 'absolute', left: 12, fontWeight: 700, color: 'var(--primary)' }}>₹</span>
                  <input
                    type="number"
                    min={minBudget + 5000}
                    max={500000}
                    step={5000}
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(Math.max(Number(e.target.value) || 0, minBudget + 5000))}
                    style={{
                      width: '100%',
                      padding: '8px 12px 8px 28px',
                      borderRadius: 12,
                      border: '1.5px solid var(--primary, #1a73e8)',
                      fontSize: 15,
                      fontWeight: 800,
                      color: 'var(--primary, #1a73e8)',
                      background: '#fff',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Dual Budget Sliders */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              {/* Min Budget Slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>
                  <span>{language === 'ta' ? 'குறைந்தபட்சம்' : 'Min Slider'}: <strong style={{ color: '#1a73e8' }}>₹{minBudget.toLocaleString('en-IN')}</strong></span>
                </div>
                <input
                  type="range"
                  min={5000}
                  max={250000}
                  step={5000}
                  value={minBudget}
                  onChange={(e) => {
                    const val = Number(e.target.value)
                    setMinBudget(val)
                    if (val >= maxBudget) {
                      setMaxBudget(val + 5000)
                    }
                  }}
                  style={{
                    width: '100%',
                    height: 6,
                    borderRadius: 6,
                    accentColor: '#1a73e8',
                    cursor: 'pointer',
                  }}
                />
              </div>

              {/* Max Budget Slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>
                  <span>{language === 'ta' ? 'அதிகபட்சம்' : 'Max Slider'}: <strong style={{ color: '#7c3aed' }}>₹{maxBudget.toLocaleString('en-IN')}</strong></span>
                </div>
                <input
                  type="range"
                  min={minBudget + 5000}
                  max={500000}
                  step={5000}
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(Number(e.target.value))}
                  style={{
                    width: '100%',
                    height: 6,
                    borderRadius: 6,
                    accentColor: '#7c3aed',
                    cursor: 'pointer',
                  }}
                />
              </div>
            </div>

            {/* Quick Budget Range Chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {budgetRanges.map((rng, idx) => {
                const isActive = minBudget === rng.min && maxBudget === rng.max
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => applyBudgetPreset(rng.min, rng.max)}
                    style={{
                      padding: '5px 12px',
                      borderRadius: 14,
                      fontSize: 11,
                      fontWeight: 700,
                      border: isActive ? '1.5px solid var(--primary)' : '1px solid #cbd5e1',
                      background: isActive ? 'var(--primary-light, #eff6ff)' : '#fff',
                      color: isActive ? 'var(--primary)' : 'var(--text)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {rng.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Live Match Summary Banner */}
          <div
            style={{
              padding: '12px 16px',
              borderRadius: 16,
              background: '#f0fdf4',
              border: '1.5px solid #86efac',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 10,
            }}
          >
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#166534' }}>
                {language === 'ta' ? 'தேர்ந்தெடுக்கப்பட்ட வரம்பு:' : 'Selected Range:'}{' '}
                <span>₹{minBudget.toLocaleString('en-IN')} — ₹{maxBudget.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ fontSize: 11, color: '#15803d', marginTop: 2 }}>
                {language === 'ta'
                  ? `✓ ${selectedServices.length} சேவைகள் தேர்வு செய்யப்பட்டுள்ளன`
                  : `✓ ${selectedServices.length} services selected for bundle & package calculation`}
              </div>
            </div>

            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: '#166534',
                background: '#fff',
                padding: '4px 10px',
                borderRadius: 12,
                border: '1px solid #bbf7d0',
              }}
            >
              {preview.matchedPackages.length} {language === 'ta' ? 'தொகுப்புகள் தயார்' : 'packages matched'}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', gap: 12, paddingTop: 14, borderTop: '1px solid var(--border-light, #e2e8f0)' }}>
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-outline"
            style={{
              minHeight: 44,
              padding: '0 18px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 13,
              borderRadius: 20,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <RotateCcw size={15} />
            {t('reset', 'Reset')}
          </button>

          <button
            type="button"
            onClick={handleApply}
            className="btn btn-primary"
            disabled={selectedServices.length === 0}
            style={{
              flex: 1,
              minHeight: 44,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              fontSize: 14,
              fontWeight: 800,
              background: 'linear-gradient(135deg, #1a73e8 0%, #7c3aed 100%)',
              border: 'none',
              borderRadius: 20,
              boxShadow: '0 4px 14px rgba(124, 58, 237, 0.3)',
              cursor: selectedServices.length === 0 ? 'not-allowed' : 'pointer',
              opacity: selectedServices.length === 0 ? 0.6 : 1,
            }}
          >
            <Sparkles size={17} />
            {language === 'ta'
              ? `தொகுப்புகளைக் காண்க (${selectedServices.length} சேவைகள்)`
              : `Find Matching Packages & Bundles (${selectedServices.length} Services)`}
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </div>
  )
}
