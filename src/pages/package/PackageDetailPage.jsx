import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { packageService } from '../../services/packageService'
import { RatingStars } from '../../components/common/RatingStars'
import { ImageGalleryViewer } from '../../components/common/ImageGalleryViewer'
import {
  ArrowLeft,
  Users,
  CheckCircle,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Calendar,
  Phone,
  MessageCircle,
  Share2,
  Heart,
  Clock,
  CalendarClock,
  AlertCircle,
  Info,
  CheckSquare,
  XCircle,
  Sliders,
} from 'lucide-react'
import { useToast } from '../../context/ToastContext'
import { useLanguage } from '../../context/LanguageContext'
import { useFavorites } from '../../context/FavoritesContext'

export const PackageDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { language, setLanguage, t } = useLanguage()
  const { isPackageFavorited, toggleFavoritePackage } = useFavorites()

  const [pkg, setPkg] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPackage = async () => {
      setLoading(true)
      try {
        const res = await packageService.getPackage(id)
        setPkg(res.data)
      } catch (err) {
        setError(err?.message || 'Package not found.')
      } finally {
        setLoading(false)
      }
    }
    fetchPackage()
  }, [id])

  if (loading) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--muted)' }}>
        <p>{t('loadingPackage', 'Loading package details...')}</p>
      </div>
    )
  }

  if (error || !pkg) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2>{t('packageNotFound', 'Package not found')}</h2>
        <p style={{ color: 'var(--muted)', margin: '12px 0 20px' }}>{error || 'The requested package does not exist.'}</p>
        <button className="btn btn-primary" onClick={() => navigate('/packages')}>
          {t('backToPackages', 'Back to packages')}
        </button>
      </div>
    )
  }

  const includedServices = pkg.services || []
  const packageCover = pkg.coverImage || pkg.cover_image
  const referenceImages = Array.isArray(pkg.images) ? pkg.images : []
  const allPackageImages = []
  if (packageCover) allPackageImages.push(packageCover)
  referenceImages.forEach((img) => {
    if (img && !allPackageImages.includes(img)) {
      allPackageImages.push(img)
    }
  })

  // Parse structured lists (inclusions, exclusions, highlights, terms)
  const parseList = (raw) => {
    if (!raw) return []
    if (Array.isArray(raw)) return raw
    try {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) return parsed
    } catch {}
    return String(raw)
      .split('\n')
      .map((s) => s.trim().replace(/^[-•*]\s*/, ''))
      .filter(Boolean)
  }

  const inclusionsList = parseList(pkg.inclusions)
  const exclusionsList = parseList(pkg.exclusions)
  const highlightsList = parseList(pkg.highlights)
  const termsList = parseList(pkg.terms)

  const providerPhone = pkg.provider?.phone || pkg.provider_phone || '+91 9360226758'
  const providerWhatsapp = pkg.provider?.whatsapp || pkg.provider_whatsapp || '+91 9360226758'
  const rawPhone = providerPhone.replace(/\D/g, '')

  const priceNum =
    pkg.priceAmount !== undefined
      ? pkg.priceAmount
      : pkg.price !== undefined
      ? pkg.price
      : parseFloat(String(pkg.price_display || pkg.priceDisplay || '').replace(/[^0-9.]/g, '')) || 0
  const formattedPrice =
    priceNum > 0 ? `₹${Number(priceNum).toLocaleString('en-IN')}` : pkg.price_display || pkg.priceDisplay || 'Price on request'

  return (
    <section id="packageDetail" className="screen active" style={{ display: 'block' }}>
      <button
        className="link-button"
        onClick={() => navigate('/packages')}
        style={{ marginBottom: 18, display: 'inline-flex', alignItems: 'center', gap: 6 }}
      >
        <ArrowLeft size={16} /> {t('backToPackages', 'Back to packages')}
      </button>

      <div className="service-detail-layout">
        <div>
          {/* Enhanced Image Gallery Viewer (Fullscreen Lightbox, Zoom, Navigation) */}
          <ImageGalleryViewer
            images={allPackageImages}
            title={pkg.name}
            categoryTag={`${t(pkg.eventType, pkg.eventType || 'Celebration')} ${language === 'ta' ? 'தொகுப்பு' : 'Bundle'}`}
            aspectRatio="16 / 10"
            maxHeight={380}
          />

          {/* Package Main Overview Card */}
          <div className="card" style={{ marginTop: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <h1 style={{ fontSize: 26, fontWeight: 800, margin: '0 0 8px 0', color: '#1e293b' }}>{pkg.name}</h1>
                <h2 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 6px 0', color: 'var(--muted, #64748b)' }}>
                  {t('aboutThisPackage', 'About This Package')}
                </h2>
                <Link
                  to={`/providers/${pkg.providerId || pkg.provider_id}`}
                  style={{
                    color: 'var(--primary)',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: 14,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  {t('providedBy', 'Provided by')} {pkg.provider?.businessName || pkg.provider_name || (language === 'ta' ? 'சரிபார்க்கப்பட்ட நிறுவனம்' : 'Verified Provider')} &rarr;
                </Link>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    if (toggleFavoritePackage && pkg) {
                      toggleFavoritePackage(pkg.id)
                      const willBeFav = !(isPackageFavorited && isPackageFavorited(pkg.id))
                      showToast(
                        willBeFav
                          ? language === 'ta'
                            ? 'தொகுப்பு சேமிக்கப்பட்டது!'
                            : 'Package saved to favorites!'
                          : language === 'ta'
                          ? 'தொகுப்பு நீக்கப்பட்டது'
                          : 'Package removed from favorites'
                      )
                    }
                  }}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 20,
                    fontSize: 13,
                    color: isPackageFavorited && isPackageFavorited(pkg?.id) ? '#ef4444' : undefined,
                    borderColor: isPackageFavorited && isPackageFavorited(pkg?.id) ? '#fca5a5' : undefined,
                    background: isPackageFavorited && isPackageFavorited(pkg?.id) ? '#fef2f2' : undefined,
                  }}
                >
                  <Heart size={15} fill={isPackageFavorited && isPackageFavorited(pkg?.id) ? 'currentColor' : 'none'} />
                  {isPackageFavorited && isPackageFavorited(pkg?.id)
                    ? language === 'ta'
                      ? 'சேமிக்கப்பட்டது'
                      : 'Saved'
                    : language === 'ta'
                    ? 'விருப்பம்'
                    : 'Save'}
                </button>

                <button
                  className="btn btn-outline"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                    showToast(t('packageLinkCopied', 'Package link copied to clipboard!'))
                  }}
                  style={{ padding: '6px 14px', borderRadius: 20, fontSize: 13 }}
                >
                  <Share2 size={15} /> {t('share', 'Share')}
                </button>
              </div>
            </div>

            {/* Highlights Selling Badges */}
            {highlightsList.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
                {highlightsList.map((hl, idx) => (
                  <span
                    key={idx}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      background: 'rgba(245, 158, 11, 0.1)',
                      border: '1px solid rgba(245, 158, 11, 0.25)',
                      color: '#b45309',
                      fontSize: 12.5,
                      fontWeight: 700,
                      padding: '4px 12px',
                      borderRadius: 20,
                    }}
                  >
                    <Sparkles size={13} color="#f59e0b" />
                    <span>{hl}</span>
                  </span>
                ))}
              </div>
            )}

            <p style={{ color: 'var(--text-2)', lineHeight: 1.7, marginTop: 16, fontSize: 15 }}>
              {pkg.description ||
                (language === 'ta'
                  ? 'இந்த பிரத்யேக தொகுப்பு அனைத்து அத்தியாவசிய தேவைகளையும் ஒன்றாக இணைக்கிறது. ஒற்றை நம்பகமான ஒருங்கிணைப்பு மூலம் எந்தவித சிரமமும் இன்றி நிகழ்வை வெற்றிகரமாக நடத்தலாம்.'
                  : 'This curated package brings together end-to-end event essentials. Designed to eliminate coordination hassles with a single trusted point of contact and guaranteed quality execution.')}
            </p>

            {/* Specifications Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 130px), 1fr))',
                gap: 12,
                marginTop: 20,
                padding: '14px 14px',
                background: '#f8fafc',
                borderRadius: 16,
                border: '1px solid #e2e8f0',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              <div style={{ minWidth: 0 }}>
                <span style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                  <Users size={14} color="var(--primary)" /> {t('guestCapacity', 'Guest Capacity')}
                </span>
                <strong style={{ fontSize: 15, color: 'var(--text)' }}>
                  {pkg.guestCapacity || pkg.guest_capacity
                    ? language === 'ta'
                      ? `${String(pkg.guestCapacity || pkg.guest_capacity).replace(/\s*guests\s*/gi, '').trim()} விருந்தினர்கள் வரை`
                      : `Up to ${String(pkg.guestCapacity || pkg.guest_capacity).replace(/\s*guests\s*/gi, '').trim()} guests`
                    : t('flexibleCount', 'Flexible count')}
                </strong>
              </div>

              <div>
                <span style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                  <Calendar size={14} color="#8b5cf6" /> {t('eventTypeLabel', 'Event Type')}
                </span>
                <strong style={{ fontSize: 15, color: 'var(--text)' }}>
                  {t(pkg.eventType || pkg.event_type, pkg.eventType || pkg.event_type || 'All Celebrations')}
                </strong>
              </div>

              {pkg.duration && (
                <div>
                  <span style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                    <Clock size={14} color="#0891b2" /> Duration Covered
                  </span>
                  <strong style={{ fontSize: 15, color: 'var(--text)' }}>{pkg.duration}</strong>
                </div>
              )}

              {(pkg.setupTime || pkg.setup_time) && (
                <div>
                  <span style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                    <CalendarClock size={14} color="#059669" /> Setup Time
                  </span>
                  <strong style={{ fontSize: 15, color: 'var(--text)' }}>{pkg.setupTime || pkg.setup_time}</strong>
                </div>
              )}

              {(pkg.advanceNotice || pkg.advance_notice) && (
                <div>
                  <span style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                    <AlertCircle size={14} color="#d97706" /> Advance Notice
                  </span>
                  <strong style={{ fontSize: 15, color: 'var(--text)' }}>{pkg.advanceNotice || pkg.advance_notice}</strong>
                </div>
              )}

              <div>
                <span style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                  <Sparkles size={14} color="#f59e0b" /> Customization
                </span>
                <strong style={{ fontSize: 15, color: pkg.customizable ? '#15803d' : 'var(--text)' }}>
                  {pkg.customizable !== false ? '100% Customizable' : 'Fixed Scope'}
                </strong>
              </div>
            </div>
          </div>

          {/* Section: What's Included (Key Inclusions) */}
          {inclusionsList.length > 0 && (
            <div className="card" style={{ marginTop: 20 }}>
              <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <CheckSquare size={20} color="#16a34a" />
                <span>What&apos;s Included in this Package</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)' }}>({inclusionsList.length} items)</span>
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: 10 }}>
                {inclusionsList.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      padding: '10px 14px',
                      background: '#f0fdf4',
                      border: '1px solid #dcfce7',
                      borderRadius: 12,
                    }}
                  >
                    <CheckCircle2 size={18} color="#16a34a" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 14, color: '#166534', fontWeight: 600, lineHeight: 1.5 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Bundled Services */}
          <div className="card" style={{ marginTop: 20 }}>
            <h2 className="card-title" style={{ marginBottom: 16 }}>
              {t('servicesIncludedInPackage', 'Services Included in this Package')} ({includedServices.length})
            </h2>

            {includedServices.length === 0 ? (
              <p style={{ color: 'var(--muted)', fontSize: 14, margin: 0 }}>
                {language === 'ta'
                  ? 'முழுமையான கேட்டரிங், வண்ண மலர் அலங்காரம், ஒளி ஒலி அமைப்பு மற்றும் களப் பணியாளர்கள் உள்ளடக்கியது.'
                  : 'Includes comprehensive catering, full floral decoration, audio-visual system, and on-ground banquet crew.'}
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {includedServices.map((svc) => (
                  <div
                    key={svc.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      background: '#fff',
                      border: '1px solid var(--border-light, #e2e8f0)',
                      borderRadius: 12,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 8,
                          background: '#e8f0fe',
                          color: '#1a73e8',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <CheckCircle size={18} />
                      </div>
                      <div>
                        <strong style={{ fontSize: 14, display: 'block', color: 'var(--text)' }}>
                          {svc.title || svc.name}
                        </strong>
                        <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                          {language === 'ta' ? 'பிரிவு' : 'Category'}: {t(svc.category || svc.category_name, svc.category || svc.category_name || 'Service')}
                        </span>
                      </div>
                    </div>

                    <Link
                      to={`/services/${svc.id}`}
                      style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}
                    >
                      {t('viewSpecs', 'View Specs')} &rarr;
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section: What's NOT Included (Exclusions / Extra charges) */}
          {exclusionsList.length > 0 && (
            <div className="card" style={{ marginTop: 20 }}>
              <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <XCircle size={20} color="#dc2626" />
                <span>What&apos;s NOT Included (Optional Add-ons / Good to Know)</span>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {exclusionsList.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      padding: '10px 14px',
                      background: '#fef2f2',
                      border: '1px solid #fee2e2',
                      borderRadius: 12,
                    }}
                  >
                    <AlertCircle size={17} color="#dc2626" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 13.5, color: '#991b1b', lineHeight: 1.5 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Booking, Payment & Cancellation Terms */}
          {termsList.length > 0 && (
            <div className="card" style={{ marginTop: 20 }}>
              <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <ShieldCheck size={20} color="#2563eb" />
                <span>Booking & Cancellation Policy</span>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {termsList.map((term, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      padding: '10px 14px',
                      background: '#eff6ff',
                      border: '1px solid #dbeafe',
                      borderRadius: 12,
                    }}
                  >
                    <Info size={17} color="#2563eb" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 13.5, color: '#1e40af', lineHeight: 1.5 }}>
                      {term}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Booking Card */}
        <div>
          <div className="card" style={{ position: 'sticky', top: 90 }}>
            <div style={{ color: 'var(--muted)', fontSize: 13, fontWeight: 500 }}>{t('packageInvestment', 'Package Investment')}</div>
            <div id="packageDetailPrice" style={{ fontSize: 32, fontWeight: 800, margin: '6px 0 14px', color: 'var(--text)' }}>
              {formattedPrice}
              <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--muted)' }}>
                {pkg.pricingType === 'PER_GUEST' || pkg.pricingType === 'PER_PLATE' ? t('perPlate', ' / guest') : t('onwards', ' onwards')}
              </span>
            </div>

            <div
              style={{
                padding: '10px 14px',
                background: '#f0fdf4',
                border: '1px solid #dcfce7',
                borderRadius: 12,
                color: '#16a34a',
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <CheckCircle size={16} /> {t('instantPackageInquiry', 'Instant package inquiry available')}
            </div>

            {/* Direct WhatsApp Action */}
            <button
              className="btn btn-primary"
              style={{
                width: '100%',
                marginBottom: 10,
                padding: '13px 20px',
                borderRadius: 16,
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
              onClick={() => {
                const msg = encodeURIComponent(
                  `Hi, I am interested in booking "${pkg.name}" (${formattedPrice}) on rjpm.in.`
                )
                window.open(`https://wa.me/${rawPhone || '919360226758'}?text=${msg}`, '_blank')
              }}
            >
              <MessageCircle size={18} /> {t('chatWhatsApp', 'Chat on WhatsApp')}
            </button>

            {/* Direct Call Action */}
            <a
              href={`tel:${providerPhone.replace(/\s+/g, '')}`}
              className="btn btn-outline"
              style={{
                width: '100%',
                padding: '12px 20px',
                borderRadius: 16,
                fontSize: 14,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                textDecoration: 'none',
                color: 'var(--text)',
                border: '1.5px solid var(--border)',
              }}
            >
              <Phone size={17} color="var(--primary)" />
              <span>{t('callProvider', 'Call Provider')}</span>
            </a>

            <div style={{ marginTop: 20, borderTop: '1px solid #f1f5f9', paddingTop: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <ShieldCheck size={20} color="#1a73e8" />
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{t('eventlyGuarantee', 'rjpm.in Guarantee')}</span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
                {t('packageGuaranteeDesc', 'Direct communication with the business owner, verified service listings, and milestone-based peace of mind.')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PackageDetailPage
