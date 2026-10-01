import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { SMART_SERVICE_CATEGORIES } from '../../utils/smartFilterEngine'
import { Sparkles, CheckCircle2, Phone, MessageCircle, SlidersHorizontal, X, ArrowUpRight, ShieldCheck, Star } from 'lucide-react'

export const SmartFilterResults = ({
  smartData,
  onEditFilter,
  onClearFilter,
}) => {
  const { language, t } = useLanguage()
  const [activeTab, setActiveTab] = useState('packages') // 'packages' | 'bundle' | 'economy'

  if (!smartData) return null

  const { selectedServices = [], minBudget = 10000, maxBudget = 100000, preview } = smartData
  const { matchedPackages = [], customBundle, economyBundle } = preview || {}

  const currentBundle = activeTab === 'economy' ? economyBundle : customBundle

  // Construct combined WhatsApp message for all selected services
  const handleContactEntireBundle = (bundle) => {
    if (!bundle || !bundle.items) return
    const servicesList = bundle.items
      .map((item) => `- ${item.categoryId}: ${item.name} (${item.provider_name} - ${item.price_display})`)
      .join('\n')

    const firstPhone = (bundle.items.find((i) => i.phone)?.phone || '919876543210').replace(/[^0-9]/g, '')
    const targetPhone = firstPhone.length >= 10 ? firstPhone : '919876543210'

    const message = encodeURIComponent(
      `Hello rjpm.in! I used the Smart Package Builder for my upcoming celebration.\n\n` +
      `Requested Services:\n${servicesList}\n\n` +
      `Estimated Total: ₹${bundle.totalPrice.toLocaleString('en-IN')}\n` +
      `My Budget Range: ₹${minBudget.toLocaleString('en-IN')} - ₹${maxBudget.toLocaleString('en-IN')}\n\n` +
      `Please help me coordinate and confirm availability for these vendors.`
    )
    window.open(`https://wa.me/${targetPhone}?text=${message}`, '_blank')
  }

  return (
    <div id="smart-results" className="smart-results-container" style={{ marginBottom: 28 }}>
      {/* Smart Filter Header / Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #f0f7ff 0%, #f5f3ff 100%)',
          border: '1.5px solid #c7d2fe',
          borderRadius: 20,
          padding: '16px 20px',
          marginBottom: 20,
          boxShadow: '0 4px 16px rgba(124, 58, 237, 0.06)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'linear-gradient(135deg, #1a73e8 0%, #7c3aed 100%)',
                color: '#fff',
                padding: '4px 12px',
                borderRadius: 16,
                fontSize: 12,
                fontWeight: 800,
                boxShadow: '0 2px 8px rgba(124, 58, 237, 0.25)',
              }}
            >
              <Sparkles size={14} />
              {t('smartFilterActive', 'Smart Filter Active')}
            </div>

            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>
              {language === 'ta' ? 'பட்ஜெட் வரம்பு:' : 'Budget Range:'}{' '}
              <span style={{ color: 'var(--primary)', fontWeight: 800 }}>
                ₹{minBudget.toLocaleString('en-IN')} — ₹{maxBudget.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              type="button"
              onClick={onEditFilter}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: '#fff',
                border: '1px solid #cbd5e1',
                padding: '6px 14px',
                borderRadius: 18,
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--text)',
                cursor: 'pointer',
              }}
            >
              <SlidersHorizontal size={13} color="var(--primary)" />
              {t('editFilter', 'Modify')}
            </button>
            <button
              type="button"
              onClick={onClearFilter}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                background: 'transparent',
                border: 'none',
                padding: '6px 10px',
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--muted)',
                cursor: 'pointer',
              }}
            >
              <X size={14} />
              {t('clearFilter', 'Clear')}
            </button>
          </div>
        </div>

        {/* Selected Services Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
          {selectedServices.map((catId) => {
            const meta = SMART_SERVICE_CATEGORIES.find((c) => c.id === catId)
            return (
              <span
                key={catId}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  background: '#fff',
                  border: '1px solid #e2e8f0',
                  padding: '3px 10px',
                  borderRadius: 14,
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--text)',
                }}
              >
                <span>{meta?.icon || '✨'}</span>
                <span>{language === 'ta' ? meta?.nameTa : meta?.name || catId}</span>
              </span>
            )
          })}
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 10,
          borderBottom: '1px solid var(--border-light, #e2e8f0)',
          paddingBottom: 10,
          marginBottom: 20,
          overflowX: 'auto',
        }}
      >
        <button
          type="button"
          onClick={() => setActiveTab('packages')}
          style={{
            padding: '8px 16px',
            borderRadius: 20,
            border: 'none',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            background: activeTab === 'packages' ? 'var(--primary, #1a73e8)' : '#f1f5f9',
            color: activeTab === 'packages' ? '#fff' : 'var(--muted)',
            transition: 'all 0.15s ease',
            whiteSpace: 'nowrap',
          }}
        >
          📦 {language === 'ta' ? 'முழுமையான தொகுப்புகள்' : 'Turnkey Packages'} ({matchedPackages.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('bundle')}
          style={{
            padding: '8px 16px',
            borderRadius: 20,
            border: 'none',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            background: activeTab === 'bundle' ? 'linear-gradient(135deg, #1a73e8 0%, #7c3aed 100%)' : '#f1f5f9',
            color: activeTab === 'bundle' ? '#fff' : 'var(--muted)',
            transition: 'all 0.15s ease',
            whiteSpace: 'nowrap',
          }}
        >
          ⚡ {language === 'ta' ? 'கணக்கிடப்பட்ட ஸ்மார்ட் தொகுப்பு' : 'Calculated Smart Bundle'} (₹{(customBundle?.totalPrice || 0).toLocaleString('en-IN')})
        </button>

        {economyBundle && economyBundle.totalPrice < (customBundle?.totalPrice || 0) && (
          <button
            type="button"
            onClick={() => setActiveTab('economy')}
            style={{
              padding: '8px 16px',
              borderRadius: 20,
              border: 'none',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              background: activeTab === 'economy' ? '#16a34a' : '#f1f5f9',
              color: activeTab === 'economy' ? '#fff' : 'var(--muted)',
              transition: 'all 0.15s ease',
              whiteSpace: 'nowrap',
            }}
          >
            💰 {language === 'ta' ? 'பட்ஜெட் காப்பு காம்போ' : 'Budget Saver Combo'} (₹{economyBundle.totalPrice.toLocaleString('en-IN')})
          </button>
        )}
      </div>

      {/* TAB CONTENT 1: TURNKEY PACKAGES */}
      {activeTab === 'packages' && (
        <div>
          {matchedPackages.length === 0 ? (
            <div className="empty-state" style={{ padding: '40px 20px', background: '#fff', borderRadius: 16 }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>📦</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 6px' }}>
                {language === 'ta' ? 'பொருந்தும் முழு தொகுப்புகள் இல்லை' : 'No pre-made packages match all criteria'}
              </h3>
              <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 16px' }}>
                {language === 'ta'
                  ? 'கவலை வேண்டாம்! மேலே உள்ள "கணக்கிடப்பட்ட ஸ்மார்ட் தொகுப்பு" தாவலை சொடுக்கவும் — தனிப்பட்ட சேவைகளை ஒருங்கிணைத்து உங்களுக்கான பிரத்யேக தொகுப்பு தயாராக உள்ளது.'
                  : 'Check out the "Calculated Smart Bundle" tab above to see your exact services combined across top vendors under your budget!'}
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setActiveTab('bundle')}
                style={{ fontSize: 13 }}
              >
                ⚡ {language === 'ta' ? 'ஸ்மார்ட் தொகுப்பைப் பார்க்கவும்' : 'View Calculated Smart Bundle'}
              </button>
            </div>
          ) : (
            <div className="package-list-grid">
              {matchedPackages.map((pkg) => {
                const isFullMatch = pkg.matchScore >= 0.99
                return (
                  <div
                    key={pkg.id}
                    className="package-list-card"
                    style={{
                      border: isFullMatch ? '2px solid #8b5cf6' : '1px solid var(--border)',
                      position: 'relative',
                    }}
                  >
                    {/* Match Score Badge */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 14,
                        right: 14,
                        background: isFullMatch ? '#f5f3ff' : '#f1f5f9',
                        color: isFullMatch ? '#7c3aed' : 'var(--primary)',
                        border: `1px solid ${isFullMatch ? '#ddd6fe' : '#e2e8f0'}`,
                        padding: '3px 8px',
                        borderRadius: 12,
                        fontSize: 11,
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <CheckCircle2 size={12} color={isFullMatch ? '#7c3aed' : 'var(--primary)'} />
                      {Math.round(pkg.matchScore * 100)}% {language === 'ta' ? 'பொருத்தம்' : 'Match'} (
                      {pkg.matchedServices.length}/{selectedServices.length})
                    </div>

                    <h3 style={{ fontSize: 17, fontWeight: 800, margin: '0 0 6px', paddingRight: 80 }}>
                      {pkg.name}
                    </h3>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, marginBottom: 8 }}>
                      <Link
                        to={`/providers/${pkg.provider_id || 7}`}
                        style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}
                      >
                        {pkg.provider_name}
                      </Link>
                      {pkg.verified && (
                        <span style={{ color: '#16a34a', display: 'inline-flex', alignItems: 'center', gap: 2, fontSize: 11, fontWeight: 700 }}>
                          <ShieldCheck size={13} /> {t('verified', 'Verified')}
                        </span>
                      )}
                      {Number(pkg.rating || 0) > 0 && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, fontSize: 12, fontWeight: 700, marginLeft: 'auto' }}>
                          <Star size={13} fill="#eab308" color="#eab308" /> {Number(pkg.rating).toFixed(1)}
                        </span>
                      )}
                    </div>

                    {/* Inclusion Match Chips */}
                    <div style={{ margin: '10px 0', background: '#f8fafc', padding: '8px 10px', borderRadius: 12 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 4 }}>
                        {language === 'ta' ? 'உள்ளடக்கிய சேவைகள்:' : 'Included In Package:'}
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        {pkg.matchedServices.map((s) => (
                          <span
                            key={s.id}
                            style={{
                              background: '#dcfce7',
                              color: '#15803d',
                              fontSize: 11,
                              fontWeight: 700,
                              padding: '2px 7px',
                              borderRadius: 10,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 3,
                            }}
                          >
                            ✓ {language === 'ta' ? s.nameTa : s.name}
                          </span>
                        ))}
                        {pkg.missingServices.map((s) => (
                          <span
                            key={s.id}
                            style={{
                              background: '#f1f5f9',
                              color: 'var(--muted)',
                              fontSize: 11,
                              padding: '2px 7px',
                              borderRadius: 10,
                              textDecoration: 'line-through',
                            }}
                          >
                            {language === 'ta' ? s.nameTa : s.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price & Action Footer */}
                    <div
                      style={{
                        marginTop: 'auto',
                        paddingTop: 12,
                        borderTop: '1px solid var(--border-light, #e2e8f0)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 10,
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                          {language === 'ta' ? 'தொகுப்பு விலை' : 'Package Price'}
                        </div>
                        <div style={{ fontSize: 19, fontWeight: 900, color: 'var(--text)' }}>
                          {pkg.price_display || `₹${pkg.price_amount?.toLocaleString('en-IN')}+`}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: 6 }}>
                        <a
                          href={`tel:${pkg.provider_phone || '+919840122334'}`}
                          className="btn btn-outline"
                          title="Call Provider"
                          style={{
                            padding: '6px 10px',
                            minHeight: 34,
                            borderRadius: 18,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                            fontSize: 12,
                          }}
                        >
                          <Phone size={14} color="#16a34a" />
                          {t('callProvider', 'Call')}
                        </a>

                        <Link
                          to={`/packages/${pkg.id}`}
                          className="btn btn-primary"
                          style={{
                            padding: '6px 12px',
                            minHeight: 34,
                            borderRadius: 18,
                            fontSize: 12,
                            fontWeight: 700,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          {t('details', 'Details')}
                          <ArrowUpRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT 2 & 3: SMART CALCULATED CUSTOM BUNDLE */}
      {/* TAB CONTENT 2 & 3: SMART CALCULATED CUSTOM BUNDLE */}
      {(activeTab === 'bundle' || activeTab === 'economy') && (
        !currentBundle || !currentBundle.items || currentBundle.items.length === 0 ? (
          <div className="empty-state" style={{ padding: '48px 24px', background: '#fff', borderRadius: 20, textAlign: 'center', border: '1.5px dashed var(--border-light, #cbd5e1)' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <h3 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 8px', color: 'var(--text)' }}>
              {language === 'ta' ? 'தேர்ந்தெடுக்கப்பட்ட வகைகளில் நேரடி சேவைகள் இல்லை' : 'No verified services found for selected categories'}
            </h3>
            <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 auto 20px', maxWidth: 460, lineHeight: 1.6 }}>
              {language === 'ta'
                ? 'ராஜபாளையத்தில் பதிவுசெய்யப்பட்ட உண்மையான விற்பனையாளர்கள் மட்டுமே கணக்கிடப்படுகிறார்கள். வேறு சேவைகளைத் தேர்ந்தெடுக்கவும் அல்லது பதிவுசெய்யப்பட்ட பேக்கேஜ்களைப் பார்க்கவும்.'
                : 'Only real, verified vendor services registered in Rajapalayam are included. Try selecting other active categories or explore turnkey event packages.'}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onEditFilter}
                style={{ fontSize: 13, padding: '10px 20px' }}
              >
                {language === 'ta' ? 'தேர்வுகளை மாற்றவும்' : 'Modify Filter Selection'}
              </button>
              {matchedPackages.length > 0 && (
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setActiveTab('packages')}
                  style={{ fontSize: 13, padding: '10px 20px' }}
                >
                  {language === 'ta' ? 'பேக்கேஜ்களைப் பார்க்கவும்' : 'View Matching Packages'} ({matchedPackages.length})
                </button>
              )}
            </div>
          </div>
        ) : (
          <div>
            {/* Bundle Summary Banner */}
            <div
              style={{
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                color: '#fff',
                borderRadius: 20,
                padding: '20px 24px',
                marginBottom: 20,
                boxShadow: '0 8px 24px rgba(15, 23, 42, 0.15)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14 }}>
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', padding: '3px 10px', borderRadius: 12, fontSize: 12, fontWeight: 700, marginBottom: 8 }}>
                    <Sparkles size={13} color="#a78bfa" />
                    {language === 'ta' ? currentBundle.titleTa : currentBundle.title}
                  </div>
                  <h3 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 6px', color: '#fff' }}>
                    ₹{currentBundle.totalPrice.toLocaleString('en-IN')}
                  </h3>
                  <div style={{ fontSize: 13, color: '#94a3b8' }}>
                    {language === 'ta'
                      ? `${currentBundle.serviceCount} உண்மையான நேரடி சேவைகள் ராஜபாளையத்தின் சரிபார்க்கப்பட்ட விற்பனையாளர்களிடமிருந்து தேர்ந்தெடுக்கப்பட்டது.`
                      : `${currentBundle.serviceCount} verified original services from registered Rajapalayam providers.`}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, color: '#94a3b8' }}>
                    {language === 'ta' ? 'உங்கள் பட்ஜெட்:' : 'Your Budget:'} ₹{maxBudget.toLocaleString('en-IN')}
                  </div>
                  <div
                    style={{
                      display: 'inline-block',
                      marginTop: 6,
                      padding: '4px 10px',
                      borderRadius: 12,
                      fontSize: 12,
                      fontWeight: 700,
                      background: currentBundle.withinBudget ? '#14532d' : '#7f1d1d',
                      color: currentBundle.withinBudget ? '#86efac' : '#fca5a5',
                    }}
                  >
                    {currentBundle.withinBudget
                      ? language === 'ta'
                        ? `✓ ₹${currentBundle.savings.toLocaleString('en-IN')} பட்ஜெட்டுக்குள் சேமிப்பு`
                        : `✓ ₹${currentBundle.savings.toLocaleString('en-IN')} Under Budget`
                      : language === 'ta'
                      ? `⚠️ ₹${(currentBundle.totalPrice - maxBudget).toLocaleString('en-IN')} அதிகம்`
                      : `⚠️ ₹${(currentBundle.totalPrice - maxBudget).toLocaleString('en-IN')} Over Budget`}
                  </div>
                </div>
              </div>

              {/* Note on missing / unlisted categories if any */}
              {currentBundle.missingCategories && currentBundle.missingCategories.length > 0 && (
                <div style={{ marginTop: 14, padding: '10px 14px', background: 'rgba(255,255,255,0.08)', borderRadius: 12, fontSize: 12, color: '#cbd5e1', lineHeight: 1.5 }}>
                  ℹ️ {language === 'ta'
                    ? `குறிப்பு: நீங்கள் தேர்ந்தெடுத்த ${selectedServices.length} வகைகளில் ${currentBundle.serviceCount} வகை மட்டுமே தற்போது ராஜபாளையத்தில் நேரடி பதிவில் உள்ளன. மீதமுள்ள வகைகளில் புதிய விற்பனையாளர்கள் இணையும்போது அவை தானாகவே சேர்க்கப்படும்.`
                    : `Note: ${currentBundle.serviceCount} of your ${selectedServices.length} selected categories currently have live verified listings in Rajapalayam. Other categories will appear automatically as local vendors onboard.`}
                </div>
              )}

              {/* Quick Action Button for Entire Combo */}
              <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.12)', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => handleContactEntireBundle(currentBundle)}
                  style={{
                    background: '#22c55e',
                    color: '#fff',
                    border: 'none',
                    padding: '9px 18px',
                    borderRadius: 20,
                    fontSize: 13,
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
                  }}
                >
                  <MessageCircle size={16} />
                  {language === 'ta' ? 'அனைத்து விற்பனையாளர்களையும் வாட்ஸ்அப்பில் தொடர்பு கொள்ள' : 'Contact All Vendors on WhatsApp'}
                </button>
              </div>
            </div>

            {/* Itemized Service Breakdown Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 14,
              }}
            >
              {currentBundle.items.map((item, idx) => {
                const meta = SMART_SERVICE_CATEGORIES.find((c) => c.id === item.categoryId)
                return (
                  <div
                    key={`${item.categoryId}-${idx}`}
                    style={{
                      background: '#fff',
                      border: '1px solid var(--border-light, #e2e8f0)',
                      borderRadius: 16,
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 5,
                          background: '#f1f5f9',
                          padding: '3px 8px',
                          borderRadius: 10,
                          fontSize: 11,
                          fontWeight: 700,
                          color: 'var(--primary)',
                        }}
                      >
                        {meta?.icon || '✨'} {language === 'ta' ? meta?.nameTa : item.categoryId}
                      </span>

                      <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)' }}>
                        {item.price_display}
                      </span>
                    </div>

                    <h4 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 6px', color: 'var(--text)' }}>
                      <Link
                        to={`/services/${item.serviceId}`}
                        style={{ color: 'inherit', textDecoration: 'none' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}
                      >
                        {item.name}
                      </Link>
                    </h4>

                    <div style={{ fontSize: 13, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                      <Link
                        to={`/providers/${item.provider_id}`}
                        style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}
                      >
                        {item.provider_name}
                      </Link>
                    {item.verified && (
                      <span style={{ color: '#16a34a', display: 'inline-flex', alignItems: 'center', gap: 2, fontSize: 11, fontWeight: 700 }}>
                        <ShieldCheck size={12} />
                      </span>
                    )}
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, fontSize: 11, fontWeight: 700, marginLeft: 'auto' }}>
                      <Star size={11} fill="#eab308" color="#eab308" /> {item.rating}
                    </span>
                  </div>

                  {/* Contact Buttons */}
                  <div style={{ marginTop: 'auto', display: 'flex', gap: 6, paddingTop: 10, borderTop: '1px solid var(--border-light, #f1f5f9)' }}>
                    <a
                      href={`tel:${item.phone}`}
                      className="btn btn-outline"
                      style={{ flex: 1, minHeight: 32, fontSize: 11, padding: '0 8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}
                    >
                      <Phone size={13} color="#16a34a" />
                      {t('callProvider', 'Call')}
                    </a>

                    <a
                      href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${item.provider_name}, I'm interested in your ${item.name} (${item.price_display}) through rjpm.in.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn"
                      style={{
                        flex: 1,
                        minHeight: 32,
                        fontSize: 11,
                        padding: '0 8px',
                        background: '#dcfce7',
                        color: '#15803d',
                        border: '1px solid #bbf7d0',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 4,
                        fontWeight: 700,
                        textDecoration: 'none',
                      }}
                    >
                      <MessageCircle size={13} />
                      WhatsApp
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        )
      )}
    </div>
  )
}
