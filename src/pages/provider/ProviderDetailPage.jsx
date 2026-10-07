import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { providerService } from '../../services/providerService'
import { RatingStars } from '../../components/common/RatingStars'
import { ServiceCard } from '../../components/common/ServiceCard'
import { PackageCard } from '../../components/common/PackageCard'
import { useFavorites } from '../../context/FavoritesContext'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { useLanguage } from '../../context/LanguageContext'
import { StarRatingInput } from '../../components/reviews/StarRatingInput'
import { CATEGORY_META } from '../../constants/categoryMeta'
import { ICONS } from '../../constants/icons'
import {
  ShieldCheck,
  MapPin,
  Calendar,
  Phone,
  MessageCircle,
  Share2,
  Heart,
  Award,
  Clock,
  CheckCircle2,
  ArrowLeft,
  RefreshCw,
  ExternalLink,
  Globe,
  Star,
} from 'lucide-react'

const SOCIAL_PLATFORMS = {
  youtube: {
    name: 'YouTube',
    color: '#ff0000',
    bg: '#fef2f2',
    borderColor: '#fee2e2',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#ff0000">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  instagram: {
    name: 'Instagram',
    color: '#e1306c',
    bg: '#fdf2f8',
    borderColor: '#fce7f3',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e1306c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  facebook: {
    name: 'Facebook',
    color: '#1877f2',
    bg: '#eff6ff',
    borderColor: '#dbeafe',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877f2">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  telegram: {
    name: 'Telegram',
    color: '#229ed9',
    bg: '#f0f9ff',
    borderColor: '#e0f2fe',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#229ed9">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
  },
  linkedin: {
    name: 'LinkedIn',
    color: '#0a66c2',
    bg: '#eff6ff',
    borderColor: '#dbeafe',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#0a66c2">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
  },
  twitter: {
    name: 'X (Twitter)',
    color: '#0f172a',
    bg: '#f8fafc',
    borderColor: '#e2e8f0',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#0f172a">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  website: {
    name: 'Website',
    color: '#1f73e8',
    bg: '#eff6ff',
    borderColor: '#dbeafe',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1f73e8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  other: {
    name: 'Online Profile',
    color: '#475569',
    bg: '#f8fafc',
    borderColor: '#e2e8f0',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    ),
  },
}

export const ProviderDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { isFavorited, isFavorite, toggleFavorite } = useFavorites()
  const { language, setLanguage, t } = useLanguage()
  const { user } = useAuth()

  const [provider, setProvider] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [activeTab, setActiveTab] = useState('All')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    const fetchProvider = async () => {
      setLoading(true)
      try {
        const res = await providerService.getProvider(id)
        setProvider(res.data)
      } catch (err) {
        setError(err?.message || 'Provider not found.')
      } finally {
        setLoading(false)
      }
    }
    fetchProvider()
  }, [id])

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--muted)' }}>
        <RefreshCw size={36} className="spin-animation" style={{ margin: '0 auto 12px' }} />
        <p>{t('loadingProvider', 'Loading provider profile...')}</p>
      </div>
    )
  }

  if (error || !provider) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <h2>{t('providerNotFound', 'Provider Not Found')}</h2>
        <p style={{ color: 'var(--muted)', margin: '10px 0 20px' }}>{error || 'Unable to locate this provider.'}</p>
        <button className="btn btn-primary" onClick={() => navigate('/explore')}>
          {t('browseProviders', 'Browse Providers')}
        </button>
      </div>
    )
  }

  const services = provider.services || []
  const packages = provider.packages || []
  const reviews = provider.reviews || []
  const serviceAreas = provider.serviceAreas || []

  // Check if current logged-in user has already submitted a star rating
  const userReview = reviews.find(
    (r) => user?.id && (Number(r.customer_id) === Number(user.id) || Number(r.customerId) === Number(user.id))
  )

  const handleRatingSubmitted = (data) => {
    setProvider((prev) => ({
      ...prev,
      rating: data.providerRating,
      reviewCount: data.reviewCount,
    }))
    providerService.getProvider(id).then((res) => {
      if (res?.data) setProvider(res.data)
    })
  }

  // Extract active social links
  const activeSocialLinks = (() => {
    if (!provider?.socialLinks) return []
    if (Array.isArray(provider.socialLinks)) {
      return provider.socialLinks
        .filter((item) => item && (item.url || item.link))
        .map((item) => ({
          platform: String(item.platform || '').toLowerCase(),
          url: String(item.url || item.link).trim(),
        }))
    }
    if (typeof provider.socialLinks === 'object') {
      return Object.entries(provider.socialLinks)
        .filter(([_, url]) => url && String(url).trim())
        .map(([platform, url]) => ({
          platform: String(platform).toLowerCase(),
          url: String(url).trim(),
        }))
    }
    return []
  })()

  // Unique categories for service filtering
  const serviceCategories = ['All', ...new Set(services.map((s) => s.category || s.category_name).filter(Boolean))]

  const filteredServices =
    activeTab === 'All' ? services : services.filter((s) => (s.category || s.category_name) === activeTab)

  const handleShare = async () => {
    const shareData = {
      title: provider?.businessName || 'Event Service Provider on rjpm.in',
      text: `Check out ${provider?.businessName || 'this event specialist'} on rjpm.in!`,
      url: window.location.href,
    }

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData)
        return
      } catch (err) {
        if (err.name === 'AbortError') return
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href)
      showToast(t('profileLinkCopied', 'Provider profile link copied to clipboard!'))
    } catch {
      showToast('Profile link copied!')
    }
  }

  const handleCall = () => {
    if (provider.phone) {
      window.location.href = `tel:${provider.phone}`
    } else {
      showToast(t('connectingCall', `Connecting call to provider...`))
    }
  }

  const handleWhatsApp = () => {
    const phone = provider.whatsapp || provider.phone || '919876543210'
    let cleanPhone = phone.replace(/[^0-9]/g, '')
    if (cleanPhone.length === 10) cleanPhone = '91' + cleanPhone
    const msg = encodeURIComponent(`Hi ${provider.businessName}, I found your profile on rjpm.in and would like to enquire about your event services.`)
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank')
  }

  const fav = (isFavorited ? isFavorited(provider.id) : isFavorite?.(provider.id)) || false

  return (
    <section id="provider" className="screen active" style={{ display: 'block' }}>
      <button
        className="link-button"
        onClick={() => navigate(-1)}
        style={{ marginBottom: 16, display: 'inline-flex', alignItems: 'center', gap: 6 }}
      >
        <ArrowLeft size={16} /> {t('back', 'Back')}
      </button>

      {/* Cover Image & Category Emblem */}
      {(() => {
        const catMeta = CATEGORY_META[provider.category] || CATEGORY_META['Decoration']
        const expNum = provider.yearsOfExperience ?? provider.experienceYears
        const exp = (expNum !== undefined && expNum !== null) ? `${expNum} yrs` : (provider.experience || '10 yrs')
        const eventsNum = provider.completedEvents !== undefined && provider.completedEvents !== null ? Math.round(Number(provider.completedEvents)) : 0
        const eventsText = `${eventsNum}+`

        return (
          <>
            <div className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--border-light, #e2e8f0)', borderRadius: 'var(--radius-xl, 24px)', marginBottom: 24, background: '#fff' }}>
              <div
                className="provider-cover"
                style={{
                  height: 250,
                  background: (provider.coverImage || provider.cover_image)
                    ? `linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.3) 100%), url(${provider.coverImage || provider.cover_image}) center/cover no-repeat`
                    : `linear-gradient(135deg, ${catMeta.color}15 0%, #eef2ff 50%, #f8f9fa 100%)`,
                  display: 'grid',
                  placeItems: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Center Emblem only if no custom cover photo */}
                {!(provider.coverImage || provider.cover_image) && (
                  <div
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 32,
                      background: 'rgba(255,255,255,0.92)',
                      display: 'grid',
                      placeItems: 'center',
                      border: `2px solid ${catMeta.color}30`,
                      boxShadow: '0 14px 32px rgba(0,0,0,0.08)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    {catMeta.svg(64)}
                  </div>
                )}

                <div className="provider-cover-actions" style={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 8, zIndex: 10 }}>
                  <button className="cover-action" onClick={handleShare} title={t('shareProfile', 'Share Profile')}>
                    <Share2 size={16} color="var(--text)" />
                  </button>
                  <button
                    className="cover-action"
                    onClick={() => toggleFavorite(provider.id, 'provider')}
                    title={t('saveVendor', 'Save Vendor')}
                  >
                    <Heart size={16} fill={fav ? '#d93025' : 'none'} color={fav ? '#d93025' : 'var(--text)'} />
                  </button>
                </div>
              </div>

              {/* Provider Info Row - cleanly on the white card background */}
              <div className="provider-hero-card-body">
                <div
                  className="provider-avatar"
                  style={{
                    width: 110,
                    height: 110,
                    borderRadius: 24,
                    marginTop: -55,
                    background: '#fff',
                    border: '4px solid #fff',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                    position: 'relative',
                    zIndex: 5,
                    overflow: 'hidden',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  {(provider.logoImage || provider.logo_image) ? (
                    <img
                      src={provider.logoImage || provider.logo_image}
                      alt={provider.businessName}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    catMeta.svg(54)
                  )}
                </div>

                <div className="provider-main-info" style={{ flex: 1, minWidth: 0, paddingTop: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <h1 id="providerName" className="provider-name-large" style={{ margin: 0, color: '#1e293b', fontSize: 28, fontWeight: 800 }}>
                      {provider.businessName}
                    </h1>
                  </div>

                  <div id="providerMeta" className="provider-meta" style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', color: '#64748b', fontSize: 13 }}>
                    <span
                      style={{
                        color: 'var(--success)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        fontWeight: 700,
                      }}
                    >
                      {ICONS.verifiedBadge(14)} {provider.verified ? t('verifiedProvider', 'Verified Provider') : t('registeredProvider', 'Registered Provider')}
                    </span>
                    <span>&middot;</span>
                    <span>{provider.location || provider.city || (language === 'ta' ? 'ராஜபாளையம்' : 'Rajapalayam')}</span>
                    <span>&middot;</span>
                    <span>{exp} {t('yearsExperience', 'experience')}</span>
                    <span>&middot;</span>
                    <span>{eventsText} {t('eventsCompleted', 'completed')}</span>
                  </div>

                  <div className="rating-row" style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    {Number(provider.rating || 0) > 0 && Number(provider.reviewCount ?? reviews.length ?? 0) > 0 ? (
                      <>
                        <RatingStars rating={provider.rating} />
                        <strong id="providerRating" style={{ fontSize: 14, color: '#1e293b' }}>
                          {Number(provider.rating).toFixed(1)}
                        </strong>
                        <span id="providerReviewCount" style={{ color: 'var(--muted)', fontSize: 13 }}>
                          ({provider.reviewCount || reviews.length} {t('reviews', 'reviews')})
                        </span>
                      </>
                    ) : (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 13, color: 'var(--muted)' }}>
                        <Star size={14} color="#cbd5e1" />
                        <span>{t('noRatingsYet', 'No ratings yet')}</span>
                      </span>
                    )}
                  </div>

                  {/* Quick Social Badges in Hero */}
                  {activeSocialLinks.length > 0 && (
                    <div
                      className="provider-social-badges"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        flexWrap: 'wrap',
                        marginTop: 10,
                        width: '100%',
                      }}
                    >
                      {activeSocialLinks.map(({ platform, url }) => {
                        const meta = SOCIAL_PLATFORMS[platform] || SOCIAL_PLATFORMS['other']
                        return (
                          <a
                            key={platform}
                            href={url.startsWith('http') ? url : `https://${url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 6,
                              padding: '4px 10px',
                              borderRadius: 16,
                              background: meta.bg,
                              border: `1px solid ${meta.borderColor}`,
                              textDecoration: 'none',
                              fontSize: 11.5,
                              fontWeight: 700,
                              color: meta.color,
                              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                              transition: 'all 0.15s ease',
                              whiteSpace: 'nowrap',
                            }}
                            title={`Open ${meta.name} profile`}
                          >
                            {meta.icon}
                            <span>{meta.name}</span>
                            <ExternalLink size={10} />
                          </a>
                        )
                      })}
                    </div>
                  )}
                </div>

                <div className="provider-actions" style={{ marginLeft: 'auto', paddingTop: 14, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <button
                    className="btn btn-outline"
                    onClick={handleShare}
                    title={t('shareProfile', 'Share Profile')}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
                  >
                    <Share2 size={16} /> {t('share', 'Share')}
                  </button>
                  <button
                    className="btn btn-outline"
                    onClick={handleCall}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
                  >
                    <Phone size={16} /> {t('call', 'Call')}
                  </button>
                  <button
                    className="btn btn-primary"
                    style={{ background: '#16a34a', borderColor: '#16a34a', color: '#ffffff', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                    onClick={handleWhatsApp}
                  >
                    <MessageCircle size={16} /> {t('whatsapp', 'WhatsApp')}
                  </button>
                </div>
              </div>
            </div>
          </>
        )
      })()}

      {/* Main Provider Layout */}
      <div className="provider-layout">
        <div>
          {/* About Card */}
          <div className="card">
            <h2 className="card-title">{t('aboutProvider', 'About')} {provider.businessName}</h2>
            <p id="providerAbout" style={{ color: 'var(--muted)', lineHeight: 1.7, fontSize: 14 }}>
              {provider.about || (language === 'ta'
                ? `${provider.businessName} ${t('defaultAbout')}`
                : `${provider.businessName} is one of Rajapalayam's premier event specialists with extensive experience in weddings, receptions, and corporate celebrations. Renowned for authentic flavours, hygienic execution, stunning thematic decor, and courteous hospitality staff.`)}
            </p>

            {/* Official Social Links in About Card */}
            {activeSocialLinks.length > 0 && (
              <div style={{ marginTop: 18, paddingTop: 14, borderTop: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>
                  Official Online Channels &amp; Videos:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {activeSocialLinks.map(({ platform, url }) => {
                    const meta = SOCIAL_PLATFORMS[platform] || SOCIAL_PLATFORMS['other']
                    return (
                      <a
                        key={platform}
                        href={url.startsWith('http') ? url : `https://${url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 8,
                          padding: '8px 16px',
                          borderRadius: 24,
                          background: meta.bg,
                          border: `1px solid ${meta.borderColor}`,
                          color: meta.color,
                          fontSize: 13,
                          fontWeight: 700,
                          textDecoration: 'none',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {meta.icon}
                        <span>Watch on {meta.name}</span>
                        <ExternalLink size={13} />
                      </a>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Services Offered Card */}
          <div className="card">
            <div className="section-header">
              <h2 className="card-title" style={{ margin: 0 }}>
                {t('servicesOffered', 'Services Offered')}
              </h2>
              <span id="serviceCount" style={{ color: 'var(--muted)', fontSize: 13 }}>
                {services.length} {t('servicesCount', 'services')}
              </span>
            </div>

            {/* Service Category Filter Tabs */}
            {serviceCategories.length > 1 && (
              <div id="serviceTabs" className="service-tabs" style={{ marginTop: 14 }}>
                {serviceCategories.map((cat) => (
                  <button
                    key={cat}
                    className={`service-tab ${activeTab === cat ? 'active' : ''}`}
                    onClick={() => setActiveTab(cat)}
                  >
                    {cat === 'All' ? t('All', 'All') : t(cat, cat)}
                  </button>
                ))}
              </div>
            )}

            <div id="providerServices" className="provider-services" style={{ marginTop: 16 }}>
              {filteredServices.length === 0 ? (
                <p style={{ color: 'var(--muted)', padding: '20px 0' }}>{t('noServicesCategory', 'No services in this category.')}</p>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: 20 }}>
                  {filteredServices.map((svc) => (
                    <ServiceCard
                      key={svc.id}
                      service={svc}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Packages Card */}
          {packages.length > 0 && (
            <div className="card">
              <div className="section-header">
                <h2 className="card-title" style={{ margin: 0 }}>
                  {t('curatedPackagesCount', 'Curated Packages')} ({packages.length})
                </h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))', gap: 16, marginTop: 16 }}>
                {packages.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            </div>
          )}

          {/* Customer Reviews Card */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
              <h2 className="card-title" style={{ margin: 0 }}>
                {t('customerReviewsCount', 'Customer Reviews')} ({reviews.length})
              </h2>
              {Number(provider.rating || 0) > 0 && Number(provider.reviewCount ?? reviews.length ?? 0) > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <RatingStars rating={provider.rating} />
                  <strong style={{ fontSize: 14, color: 'var(--text)' }}>
                    {Number(provider.rating).toFixed(1)}
                  </strong>
                </div>
              )}
            </div>

            {/* Interactive Star Rating Input */}
            <StarRatingInput
              providerId={provider.id}
              providerName={provider.businessName}
              initialRating={userReview?.rating || 0}
              onRatingSubmitted={handleRatingSubmitted}
            />

            {reviews.length === 0 ? (
              <p style={{ color: 'var(--muted)', marginTop: 12 }}>
                {t('noReviewsYet', 'No reviews yet. Be the first to review after your event!')}
              </p>
            ) : (
              <div id="providerReviews" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    style={{
                      padding: '16px',
                      background: '#f8fafc',
                      borderRadius: 14,
                      border: '1px solid var(--border-light, #e2e8f0)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <div>
                        <strong style={{ fontSize: 14, color: 'var(--text)' }}>
                          {rev.customer?.name || rev.userName || t('verifiedHost', 'Verified Host')}
                        </strong>
                        <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                          {rev.createdAt ? new Date(rev.createdAt).toLocaleDateString() : t('recentCelebration', 'Recent Celebration')}
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <RatingStars rating={rev.rating || 5} />
                        <span style={{ fontSize: 13, fontWeight: 700 }}>{rev.rating}.0</span>
                      </div>
                    </div>

                    <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5, margin: '6px 0 0 0' }}>
                      {rev.comment}
                    </p>

                    {/* Provider Reply */}
                    {rev.reply && (
                      <div
                        style={{
                          marginTop: 12,
                          padding: '10px 14px',
                          background: '#e8f0fe',
                          borderRadius: 10,
                          borderLeft: '3px solid var(--primary)',
                        }}
                      >
                        <strong style={{ fontSize: 12, color: 'var(--primary)', display: 'block' }}>
                          {t('responseFrom', 'Response from')} {provider.businessName}:
                        </strong>
                        <p style={{ fontSize: 12, color: '#334155', margin: '4px 0 0 0', lineHeight: 1.4 }}>
                          {rev.reply}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Info Sidebar */}
        <div>
          {/* Provider Info List */}
          <div className="card">
            <h3 className="card-title">{t('providerInformation', 'Provider Information')}</h3>
            <ul id="providerInfoList" className="check-list" style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                <Award size={18} color="#1a73e8" />
                <span style={{ fontSize: 13, fontWeight: 600 }}>
                  {Math.round(Number(provider.yearsOfExperience ?? provider.experienceYears ?? 10))}+ {t('yearsInIndustry', 'Years in Event Industry')}
                </span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                <CheckCircle2 size={18} color="#16a34a" />
                <span style={{ fontSize: 13, fontWeight: 600 }}>
                  {provider.verified !== false ? t('documentVerified', 'Document & Identity Verified') : 'Verification Pending'}
                </span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                <Clock size={18} color="#f59e0b" />
                <span style={{ fontSize: 13, fontWeight: 600 }}>
                  {provider.responseTime || t('respondsWithin', 'Usually responds within 2 hours')}
                </span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0' }}>
                <Calendar size={18} color="#1a73e8" />
                <span style={{ fontSize: 13, fontWeight: 600 }}>
                  {Math.round(Number(provider.completedEvents ?? 0))}+ {t('successfulGatherings', 'Successful Gatherings')}
                </span>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div className="card">
            <h3 className="card-title">{t('serviceLocalities', 'Service Localities')}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
              {(serviceAreas.length > 0
                ? serviceAreas.map((a) => a.areaName || a)
                : [provider.location || provider.city || 'All Localities']
              ).map((loc, idx) => (
                <span
                  key={idx}
                  style={{
                    background: '#f8fafc',
                    color: '#334155',
                    fontSize: 12,
                    fontWeight: 600,
                    padding: '5px 12px',
                    borderRadius: 20,
                    border: '1px solid #e2e8f0',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                  }}
                >
                  <MapPin size={12} color="#1a73e8" /> {loc}
                </span>
              ))}
            </div>
          </div>

          {/* Social Profiles & Online Links Card */}
          {activeSocialLinks.length > 0 && (
            <div className="card">
              <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Globe size={18} color="#1a73e8" />
                <span>Social Profiles &amp; Online Links</span>
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: 12, margin: '4px 0 12px 0' }}>
                Explore past events, behind-the-scenes videos, and official gallery updates.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {activeSocialLinks.map(({ platform, url }) => {
                  const meta = SOCIAL_PLATFORMS[platform] || SOCIAL_PLATFORMS['other']
                  return (
                    <a
                      key={platform}
                      href={url.startsWith('http') ? url : `https://${url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '11px 14px',
                        borderRadius: 12,
                        background: meta.bg,
                        border: `1px solid ${meta.borderColor}`,
                        color: '#1e293b',
                        textDecoration: 'none',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ display: 'flex', alignItems: 'center' }}>{meta.icon}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: meta.color }}>
                          {meta.name} Channel
                        </span>
                      </div>
                      <ExternalLink size={14} color={meta.color} />
                    </a>
                  )
                })}
              </div>
            </div>
          )}

          {/* Availability Block */}
          <div className="card">
            <h3 className="card-title">{t('checkAvailability', 'Check Date Availability')}</h3>
            <p style={{ color: 'var(--muted)', marginBottom: 15, lineHeight: 1.6, fontSize: 13 }}>
              {t('checkAvailabilityDesc', 'Select your wedding, birthday, or celebration date to verify open booking slots.')}
            </p>
            <button
              className="btn btn-primary"
              style={{ width: '100%', marginBottom: 10, padding: '12px 20px', borderRadius: 24, background: '#16a34a', borderColor: '#16a34a', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              onClick={handleWhatsApp}
            >
              <MessageCircle size={16} /> {t('chatWhatsApp', 'Chat on WhatsApp')}
            </button>
            <button
              className="btn btn-outline"
              style={{ width: '100%', padding: '12px 20px', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              onClick={handleCall}
            >
              <Phone size={16} /> {t('callProvider', 'Call Provider')}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
