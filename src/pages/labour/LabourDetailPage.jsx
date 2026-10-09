import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { labourService } from '../../services/labourService'
import { ImageGalleryViewer } from '../../components/common/ImageGalleryViewer'
import { RatingStars } from '../../components/common/RatingStars'
import { LABOUR_META } from '../../constants/categoryMeta'
import { ICONS } from '../../constants/icons'
import { useToast } from '../../context/ToastContext'
import { useLocation } from '../../context/LocationContext'
import { useLanguage } from '../../context/LanguageContext'
import {
  ArrowLeft,
  Users,
  Building2,
  CheckCircle2,
  Clock,
  Phone,
  MessageCircle,
  ShieldCheck,
  Share2,
  RefreshCw,
  Globe,
} from 'lucide-react'

export const LabourDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { location } = useLocation()
  const { language, setLanguage, t } = useLanguage()

  const [labour, setLabour] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchDetail = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await labourService.getLabourItem(id)
        if (!isMounted) return

        if (res.data) {
          const item = res.data
          let parsedImages = []
          if (Array.isArray(item.images)) {
            parsedImages = item.images
          } else if (typeof item.images === 'string' && item.images.trim()) {
            try {
              const parsed = JSON.parse(item.images)
              if (Array.isArray(parsed)) parsedImages = parsed
            } catch {
              parsedImages = []
            }
          }
          setLabour({
            ...item,
            images: parsedImages,
          })
        } else {
          setError(language === 'ta' ? 'பணியாளர் விவரங்கள் கிடைக்கவில்லை' : 'Staff listing not found')
        }
      } catch (err) {
        if (!isMounted) return
        setError(language === 'ta' ? 'பணியாளர் விவரங்கள் கிடைக்கவில்லை' : 'Staff listing not found')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchDetail()
    return () => {
      isMounted = false
    }
  }, [id, language])

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--muted)' }}>
        <RefreshCw size={36} className="spin-animation" style={{ margin: '0 auto 12px' }} />
        <p>{t('loadingProvider', 'Loading labour support details...')}</p>
      </div>
    )
  }

  if (error || !labour) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <h2>{language === 'ta' ? 'பணியாளர் விவரங்கள் கிடைக்கவில்லை' : 'Staff Listing Not Found'}</h2>
        <p style={{ color: 'var(--muted)', margin: '10px 0 20px' }}>
          {error || (language === 'ta' ? 'இப்பணியாளர் பட்டியலைக் கண்டறிய இயலவில்லை.' : 'Unable to locate this event staffing listing.')}
        </p>
        <button className="btn btn-primary" onClick={() => navigate('/labour')}>
          {t('backToLabour', 'Back to Labour Support')}
        </button>
      </div>
    )
  }

  const category = labour.type || labour.category || 'Food Servers'
  const meta = LABOUR_META[category] || LABOUR_META['Food Servers']
  const hasClaimedProvider = Boolean(labour.provider_id && labour.provider_claimed && labour.provider_status === 'CLAIMED_ACTIVE')
  const providerName = labour.provider_name || labour.provider || 'Google Search'
  const providerId = labour.provider_id || null
  const contactPhone = labour.phone || labour.provider_phone || '919876543210'
  const contactWhatsapp = labour.whatsapp || labour.provider_whatsapp || contactPhone

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    showToast(t('profileLinkCopied', 'Staff listing link copied to clipboard!'))
  }

  const handleCall = () => {
    window.location.href = `tel:${contactPhone.replace(/\s+/g, '')}`
  }

  const handleWhatsApp = () => {
    const clean = contactWhatsapp.replace(/[^0-9]/g, '')
    const msg = encodeURIComponent(
      `Hi, I am interested in booking "${labour.name}" via rjpm.in.`
    )
    window.open(`https://wa.me/${clean}?text=${msg}`, '_blank')
  }

  const coverImage = labour.coverImage || labour.cover_image
  let pastImages = []
  if (Array.isArray(labour.images)) {
    pastImages = labour.images
  } else if (typeof labour.images === 'string' && labour.images.trim()) {
    try {
      const parsed = JSON.parse(labour.images)
      if (Array.isArray(parsed)) pastImages = parsed
    } catch {
      pastImages = []
    }
  }

  const allImages = []
  if (coverImage) allImages.push(coverImage)
  pastImages.forEach((img) => {
    if (img && !allImages.includes(img)) {
      allImages.push(img)
    }
  })

  return (
    <section id="labourDetail" className="screen active" style={{ display: 'block' }}>
      <button
        className="link-button"
        onClick={() => navigate('/labour')}
        style={{ marginBottom: 18, display: 'inline-flex', alignItems: 'center', gap: 6 }}
      >
        <ArrowLeft size={16} /> {t('backToLabour', 'Back to labour support')}
      </button>

      <div className="service-detail-layout">
        <div>
          {/* Main Cover Banner or Enhanced Image Gallery */}
          {allImages.length > 0 ? (
            <ImageGalleryViewer
              images={allImages}
              title={labour.name}
              categoryTag={category}
              aspectRatio="16 / 10"
            />
          ) : (
            <div
              className="service-detail-image"
              style={{
                background: `linear-gradient(135deg, ${meta.color}20 0%, #eef2ff 50%, #f8f9fa 100%)`,
                borderRadius: 20,
                height: 280,
                display: 'grid',
                placeItems: 'center',
                border: `1px solid ${meta.color}25`,
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: 130,
                  height: 130,
                  borderRadius: 36,
                  background: 'rgba(255,255,255,0.92)',
                  display: 'grid',
                  placeItems: 'center',
                  border: `2px solid ${meta.color}30`,
                  boxShadow: '0 14px 32px rgba(0,0,0,0.08)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {meta.svg(68)}
              </div>

              <button
                className="btn btn-outline"
                onClick={handleShare}
                style={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  background: 'rgba(255,255,255,0.9)',
                  padding: '8px 14px',
                  borderRadius: 20,
                  fontSize: 13,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <Share2 size={15} /> {t('share', 'Share')}
              </button>
            </div>
          )}

          {/* Role Header Info */}
          <div className="card" style={{ marginTop: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <span
                  style={{
                    background: meta.bg,
                    color: meta.color,
                    border: `1px solid ${meta.color}30`,
                    padding: '4px 12px',
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 700,
                    display: 'inline-block',
                    marginBottom: 8,
                  }}
                >
                  {t(category, category)}
                </span>
                <h1 className="page-title" style={{ margin: 0, fontSize: 26 }}>
                  {labour.name}
                </h1>
              </div>
            </div>

            <p style={{ marginTop: 14, color: 'var(--text-2)', lineHeight: 1.7, fontSize: 15 }}>
              {labour.details ||
                labour.description ||
                (language === 'ta'
                  ? 'சிறந்த விருந்தோம்பல், சரியான நேரத்தில் கேட்டரிங் மேலாண்மை மற்றும் சுத்தமான மண்டப ஒருங்கிணைப்புக்கு பயிற்சி பெற்ற தகுதியான பணியாளர்கள்.'
                  : 'Professionally trained, background-verified event staff dedicated to seamless hospitality, timely banquet management, and clean venue coordination.')}
            </p>

            <div style={{ marginTop: 22, display: 'flex', gap: 20, flexWrap: 'wrap', fontWeight: 600, fontSize: 14 }}>
              {hasClaimedProvider ? (
                <Link
                  to={`/providers/${providerId}`}
                  style={{
                    color: 'var(--primary)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    textDecoration: 'none',
                  }}
                >
                  <Building2 size={18} /> {t('managedBy', 'Managed by')} {providerName}
                </Link>
              ) : (
                <span
                  style={{
                    color: '#b45309',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    background: '#fef3c7',
                    padding: '4px 12px',
                    borderRadius: 20,
                    border: '1px solid #fde68a',
                  }}
                >
                  <Globe size={16} /> {language === 'ta' ? 'கூகிள் தேடல் மூலம் வழங்கப்படுகிறது' : 'Provided by Google Search'}
                </span>
              )}
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-2)' }}>
                {ICONS.mapPin(18, 'var(--primary)')} {language === 'ta' ? `${location} மற்றும் அனைத்து பகுதிகளிலும் கிடைக்கும்` : `Available in ${location} · All Areas`}
              </span>
            </div>
          </div>

          {/* Staff Responsibilities & Inclusions */}
          <div className="card" style={{ marginTop: 20 }}>
            <h2 className="card-title">{t('responsibilitiesInclusions', 'Staff Responsibilities & Inclusions')}</h2>
            <ul className="check-list" style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                <CheckCircle2 size={18} color="#16a34a" />
                <span>{language === 'ta' ? 'அரசு புகைப்பட அடையாளத்துடன் 100% பின்னணி சரிபார்க்கப்பட்ட ஊழியர்கள்' : '100% background-verified crew with government photo identity'}</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                <CheckCircle2 size={18} color="#16a34a" />
                <span>{language === 'ta' ? 'பெயர் பட்டை மற்றும் கையுறைகளுடன் சுத்தமான, தரப்படுத்தப்பட்ட சீருடை' : 'Clean, standardized uniform with name badge and gloves'}</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                <CheckCircle2 size={18} color="#16a34a" />
                <span>{language === 'ta' ? 'நிகழ்வு தொடங்குவதற்கு குறைந்தது 30 நிமிடங்களுக்கு முன்பே வருகை தரும் உத்தரவாதம்' : 'Punctual reporting guarantee (minimum 30 minutes before event start)'}</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                <CheckCircle2 size={18} color="#16a34a" />
                <span>{language === 'ta' ? '5+ ஊழியர்கள் கொண்ட முன்பதிவுகளுக்கு பிரத்யேக கள மேற்பார்வையாளர்' : 'Dedicated on-ground team supervisor for orders with 5+ staff'}</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0' }}>
                <CheckCircle2 size={18} color="#16a34a" />
                <span>{language === 'ta' ? 'ஷிப்ட் முடிவில் மண்டப ஆய்வு மற்றும் முறையான பணி நிறைவு உறுதி' : 'End-of-shift hall inspection and formal completion sign-off'}</span>
              </li>
            </ul>
          </div>

          {/* Shift Guidelines */}
          <div className="card" style={{ marginTop: 20 }}>
            <h2 className="card-title">{t('shiftGuidelines', 'Shift & Booking Guidelines')}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: 16, marginTop: 12 }}>
              <div style={{ padding: 14, background: '#f8fafc', borderRadius: 12 }}>
                <span style={{ fontSize: 12, color: 'var(--muted)', display: 'block' }}>{t('standardShift', 'Standard Shift')}</span>
                <strong style={{ fontSize: 15, color: 'var(--text)' }}>{t('standardShiftVal', '8 Hours Duration')}</strong>
              </div>
              <div style={{ padding: 14, background: '#f8fafc', borderRadius: 12 }}>
                <span style={{ fontSize: 12, color: 'var(--muted)', display: 'block' }}>{t('overtimeBilling', 'Overtime Billing')}</span>
                <strong style={{ fontSize: 15, color: 'var(--text)' }}>{t('overtimeBillingVal', '1.5x Hourly Rate')}</strong>
              </div>
              <div style={{ padding: 14, background: '#f8fafc', borderRadius: 12 }}>
                <span style={{ fontSize: 12, color: 'var(--muted)', display: 'block' }}>{t('cancellationPolicy', 'Cancellation Policy')}</span>
                <strong style={{ fontSize: 15, color: 'var(--text)' }}>{t('cancellationPolicyVal', 'Free before 48 hours')}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing & Booking Action Card */}
        <div>
          <div className="card" style={{ position: 'sticky', top: 90 }}>
            <div style={{ color: 'var(--muted)', fontSize: 13, fontWeight: 500 }}>{t('dailyShiftRate', 'Daily Shift Rate')}</div>
            <div style={{ fontSize: 26, fontWeight: 800, margin: '6px 0 16px', color: 'var(--text)' }}>
              {language === 'ta'
                ? `தொடக்கம் ₹${Number(labour.price_amount || 500).toLocaleString('en-IN')} / நபர்`
                : (labour.price_display || `From ₹${Number(labour.price_amount || 500).toLocaleString('en-IN')} / staff`)}
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 12px',
                background: '#f8fafc',
                borderRadius: 8,
                marginBottom: 20,
              }}
            >
              {Number(labour.rating || 0) > 0 && Number(labour.review_count || 0) > 0 ? (
                <>
                  <RatingStars rating={labour.rating} />
                  <strong style={{ fontSize: 13, marginLeft: 4 }}>{Number(labour.rating).toFixed(1)}</strong>
                  <span style={{ fontSize: 12, color: 'var(--muted)' }}>({labour.review_count} {t('reviews', 'reviews')})</span>
                </>
              ) : (
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>{t('noRatingsYet', 'No ratings yet')}</span>
              )}
            </div>

            <div
              style={{
                padding: '12px 16px',
                background: '#f0fdf4',
                border: '1px solid #dcfce7',
                borderRadius: 12,
                color: '#16a34a',
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <ShieldCheck size={16} /> {t('instantBooking', 'Instant staffing booking available')}
            </div>

            <button
              className="btn btn-primary"
              style={{
                width: '100%',
                marginBottom: 12,
                padding: '13px 20px',
                borderRadius: 24,
                fontSize: 14,
                fontWeight: 700,
                background: '#16a34a',
                borderColor: '#16a34a',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
              onClick={handleWhatsApp}
            >
              <MessageCircle size={18} /> {t('chatWhatsApp', 'Chat on WhatsApp')}
            </button>

            <button
              className="btn btn-outline"
              style={{
                width: '100%',
                marginBottom: 12,
                padding: '13px 20px',
                borderRadius: 24,
                fontSize: 14,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
              onClick={handleCall}
            >
              <Phone size={18} /> {t('callAgency', 'Call Agency')}
            </button>

            {hasClaimedProvider && (
              <div style={{ marginTop: 24, borderTop: '1px solid #f1f5f9', paddingTop: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <ShieldCheck size={20} color="#1a73e8" />
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{t('guaranteeTitle', 'rjpm.in Staffing Guarantee')}</span>
                </div>
                <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
                  {t('guaranteeDesc', '100% verified crew with emergency replacements guaranteed within 60 minutes in case of absence.')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
