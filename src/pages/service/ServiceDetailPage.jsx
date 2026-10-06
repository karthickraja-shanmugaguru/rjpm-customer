import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { serviceService } from '../../services/serviceService'
import { RatingStars } from '../../components/common/RatingStars'
import { ImageGalleryViewer } from '../../components/common/ImageGalleryViewer'
import { useToast } from '../../context/ToastContext'
import { useLanguage } from '../../context/LanguageContext'
import { useFavorites } from '../../context/FavoritesContext'
import {
  ArrowLeft,
  MapPin,
  Store,
  Phone,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Share2,
  RefreshCw,
  Heart,
  Clock,
  ExternalLink,
  Globe,
  Star,
} from 'lucide-react'
import { StarRatingInput } from '../../components/reviews/StarRatingInput'

const SOCIAL_PLATFORMS = {
  youtube: {
    name: 'YouTube',
    color: '#ff0000',
    bg: '#fef2f2',
    borderColor: '#fee2e2',
    descriptionEn: 'Watch event videos & live recordings',
    descriptionTa: 'நிகழ்வு வீடியோக்கள் & நேரலை பதிவுகள்',
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
    descriptionEn: 'Photos, stories & recent event reels',
    descriptionTa: 'புகைப்படங்கள் & சமீபத்திய ரீல்ஸ்',
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
    descriptionEn: 'Customer reviews & community page',
    descriptionTa: 'வாடிக்கையாளர் மதிப்புரைகள் & பக்கம்',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877f2">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  whatsapp: {
    name: 'WhatsApp',
    color: '#16a34a',
    bg: '#f0fdf4',
    borderColor: '#dcfce7',
    descriptionEn: 'Direct chat & event inquiries',
    descriptionTa: 'நேரடி அரட்டை & நிகழ்வு விசாரணைகள்',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#16a34a">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
      </svg>
    ),
  },
  website: {
    name: 'Website',
    color: '#4f46e5',
    bg: '#eef2ff',
    borderColor: '#e0e7ff',
    descriptionEn: 'Official business website',
    descriptionTa: 'அதிகாரப்பூர்வ வணிக வலைதளம்',
    icon: <Globe size={18} color="#4f46e5" />,
  },
  other: {
    name: 'Official Link',
    color: '#0f172a',
    bg: '#f8fafc',
    borderColor: '#e2e8f0',
    descriptionEn: 'Verified vendor web link',
    descriptionTa: 'சரிபார்க்கப்பட்ட இணைய இணைப்பு',
    icon: <Globe size={18} color="#0f172a" />,
  },
}

const getPlatformMeta = (plat) => {
  const p = String(plat || '').toLowerCase().trim()
  if (p.includes('youtube') || p.includes('youtu.be')) return SOCIAL_PLATFORMS.youtube
  if (p.includes('insta')) return SOCIAL_PLATFORMS.instagram
  if (p.includes('face') || p.includes('fb')) return SOCIAL_PLATFORMS.facebook
  if (p.includes('whats') || p.includes('wa.me')) return SOCIAL_PLATFORMS.whatsapp
  if (p.includes('site') || p.includes('web') || p.startsWith('http')) return SOCIAL_PLATFORMS.website
  return SOCIAL_PLATFORMS[p] || SOCIAL_PLATFORMS.other
}

const getYouTubeEmbedUrl = (url) => {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = String(url).match(regExp)
  return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : null
}

export const ServiceDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { language, setLanguage, t } = useLanguage()
  const { isServiceFavorited, toggleFavoriteService } = useFavorites()

  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true)
      try {
        const res = await serviceService.getService(id)
        setService(res.data)
      } catch (err) {
        setError(err?.message || 'Service not found.')
      } finally {
        setLoading(false)
      }
    }
    fetchService()
  }, [id])

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--muted)' }}>
        <RefreshCw size={36} className="spin-animation" style={{ margin: '0 auto 12px' }} />
        <p>{t('loadingService', 'Loading service specs...')}</p>
      </div>
    )
  }

  if (error || !service) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <h2>{t('serviceNotFound', 'Service Not Found')}</h2>
        <p style={{ color: 'var(--muted)', margin: '10px 0 20px' }}>{error || 'The requested service does not exist.'}</p>
        <button className="btn btn-primary" onClick={() => navigate('/explore')}>
          {t('browseAllServices', 'Browse All Services')}
        </button>
      </div>
    )
  }

  const provider = service.provider || {}

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    showToast('Service link copied to clipboard!')
  }

  const handleCall = () => {
    if (provider.phone) {
      window.location.href = `tel:${provider.phone}`
    } else {
      showToast('Connecting call to provider...')
    }
  }

  const handleWhatsApp = () => {
    const phone = provider.whatsapp || provider.phone || '919876543210'
    const cleanPhone = phone.replace(/[^0-9]/g, '')
    const msg = encodeURIComponent(`Hi ${provider.businessName || ''}, I am interested in booking "${service.title}" via rjpm.in.`)
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank')
  }

  const coverImage = service.coverImage || service.cover_image
  const pastImages = Array.isArray(service.images) ? service.images : []
  const allImages = []
  if (coverImage) allImages.push(coverImage)
  pastImages.forEach((img) => {
    if (img && !allImages.includes(img)) {
      allImages.push(img)
    }
  })

  const inclusionsList = (() => {
    if (service.inclusions && typeof service.inclusions === 'string') {
      const items = service.inclusions
        .split(/\r?\n/)
        .map((s) => s.trim().replace(/^[-*•]\s*/, ''))
        .filter(Boolean)
      if (items.length > 0) return items
    }
    return [
      t('consultationPlanning', 'Complimentary consultation & customized planning'),
      t('uniformedCrew', 'Professionally uniformed and background-checked crew'),
      t('setupCleanup', 'Complete on-site setup and post-event cleanup'),
      t('onTimeGuarantee', 'On-time execution guarantee with dedicated lead coordinator'),
    ]
  })()

  const displayLocation =
    service.serviceArea ||
    service.serviceAreaOverride ||
    service.service_area_override ||
    provider.location ||
    provider.city ||
    (language === 'ta' ? 'ராஜபாளையம் மற்றும் சுற்றியுள்ள பகுதிகள்' : 'Rajapalayam & surroundings')

  const activeSocialLinks = (() => {
    const list = []
    const seen = new Set()

    // 1. From service videoUrl
    if (service.videoUrl || service.video_url) {
      const vUrl = String(service.videoUrl || service.video_url).trim()
      if (vUrl && !seen.has(vUrl)) {
        seen.add(vUrl)
        const plat = vUrl.includes('youtube') || vUrl.includes('youtu.be')
          ? 'youtube'
          : vUrl.includes('instagram')
          ? 'instagram'
          : 'website'
        list.push({
          platform: plat,
          url: vUrl,
          title: plat === 'youtube' ? 'Showcase Video' : 'Official Showcase',
        })
      }
    }

    // 2. From provider / service socialLinks array
    const source = service.socialLinks || service.social_links || provider.socialLinks || provider.social_links || []
    if (Array.isArray(source)) {
      source.forEach((item) => {
        if (!item) return
        const url = String(item.url || item.link || '').trim()
        if (url && !seen.has(url)) {
          seen.add(url)
          const plat = String(item.platform || 'other').toLowerCase()
          list.push({
            platform: plat,
            url,
            title: item.title,
          })
        }
      })
    }

    return list
  })()

  const embeddableVideoUrl = (() => {
    for (const item of activeSocialLinks) {
      const embed = getYouTubeEmbedUrl(item.url)
      if (embed) return embed
    }
    return null
  })()

  return (
    <section id="serviceDetail" className="screen active" style={{ display: 'block' }}>
      <button
        className="link-button"
        onClick={() => navigate(-1)}
        style={{ marginBottom: 18, display: 'inline-flex', alignItems: 'center', gap: 6 }}
      >
        <ArrowLeft size={16} /> {t('back', 'Back')}
      </button>

      <div className="service-detail-layout">
        <div>
          {/* Enhanced Image Gallery Viewer (4:5 Ratio, Lightbox, Zoom, Navigation) */}
          <ImageGalleryViewer
            images={allImages}
            title={service.title}
            categoryTag={t(service.category, service.category)}
            aspectRatio="4 / 5"
          />

          {/* Service Header Info */}
          <div className="card" style={{ marginTop: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <span
                  style={{
                    background: '#e8f0fe',
                    color: 'var(--primary)',
                    padding: '4px 12px',
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 600,
                    display: 'inline-block',
                    marginBottom: 8,
                  }}
                >
                  {t(service.category, service.category)}
                </span>
                <h1 id="serviceDetailName" className="page-title" style={{ margin: 0, fontSize: 26 }}>
                  {service.title}
                </h1>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    if (toggleFavoriteService && service) {
                      toggleFavoriteService(service.id)
                      const willBeFav = !(isServiceFavorited && isServiceFavorited(service.id))
                      showToast(willBeFav ? (language === 'ta' ? 'சேவை சேமிக்கப்பட்டது!' : 'Service saved to favorites!') : (language === 'ta' ? 'சேவை நீக்கப்பட்டது' : 'Service removed from favorites'))
                    }
                  }}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 20,
                    fontSize: 13,
                    color: isServiceFavorited && isServiceFavorited(service?.id) ? '#ef4444' : undefined,
                    borderColor: isServiceFavorited && isServiceFavorited(service?.id) ? '#fca5a5' : undefined,
                    background: isServiceFavorited && isServiceFavorited(service?.id) ? '#fef2f2' : undefined,
                  }}
                >
                  <Heart size={15} fill={isServiceFavorited && isServiceFavorited(service?.id) ? 'currentColor' : 'none'} />
                  {isServiceFavorited && isServiceFavorited(service?.id) ? (language === 'ta' ? 'சேமிக்கப்பட்டது' : 'Saved') : (language === 'ta' ? 'விருப்பம்' : 'Save')}
                </button>

                <button
                  className="btn btn-outline"
                  onClick={handleShare}
                  style={{ padding: '6px 14px', borderRadius: 20, fontSize: 13 }}
                >
                  <Share2 size={15} /> {t('share', 'Share')}
                </button>
              </div>
            </div>

            <p id="serviceDetailDescription" className="page-description" style={{ marginTop: 14, color: 'var(--text-2)', lineHeight: 1.7, fontSize: 15 }}>
              {service.description ||
                (language === 'ta'
                  ? 'உங்கள் நிகழ்வுத் தேவைகளை முழுமையான சுகாதாரம், தொழில்முறை ஒருங்கிணைப்பு மற்றும் உயர் தரத்துடன் பூர்த்தி செய்ய வடிவமைக்கப்பட்ட சிறந்த சேவை.'
                  : 'Complete top-tier service tailored to meet your event requirements with utmost hygiene, professional coordination, and pristine quality.')}
            </p>

            <div style={{ marginTop: 22, display: 'flex', gap: 20, flexWrap: 'wrap', fontWeight: 600, fontSize: 14 }}>
              <Link
                to={`/providers/${provider.id || service.providerId}`}
                style={{
                  color: 'var(--primary)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  textDecoration: 'none',
                }}
              >
                <Store size={18} /> {t('providedBy', 'Provided by')} {provider.businessName || (language === 'ta' ? 'சரிபார்க்கப்பட்ட நிறுவனம்' : 'Verified Vendor')}
              </Link>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-2)' }}>
                <MapPin size={18} color="var(--primary)" /> {displayLocation}
              </span>
            </div>

            {/* Quick Social Badges in Header */}
            {activeSocialLinks.length > 0 && (
              <div
                style={{
                  marginTop: 18,
                  paddingTop: 16,
                  borderTop: '1px solid #f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  flexWrap: 'wrap',
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)' }}>
                  {language === 'ta' ? 'அதிகாரப்பூர்வ பக்கங்கள்:' : 'Official Portfolios:'}
                </span>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {activeSocialLinks.map((item, idx) => {
                    const meta = getPlatformMeta(item.platform)
                    return (
                      <a
                        key={idx}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '5px 12px',
                          borderRadius: 20,
                          background: meta.bg,
                          border: `1px solid ${meta.borderColor}`,
                          color: meta.color,
                          fontSize: 12,
                          fontWeight: 700,
                          textDecoration: 'none',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                        }}
                      >
                        {meta.icon}
                        <span>{meta.name}</span>
                        <ExternalLink size={12} style={{ opacity: 0.7 }} />
                      </a>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* What's Included */}
          <div className="card" style={{ marginTop: 20 }}>
            <h2 className="card-title">{t('whatsIncludedTitle', "What's Included")}</h2>
            <ul className="check-list" id="serviceIncludedList" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {inclusionsList.map((item, idx) => (
                <li
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 0',
                    borderBottom: idx < inclusionsList.length - 1 ? '1px solid #f1f5f9' : 'none',
                    fontSize: 14,
                    color: 'var(--text)',
                  }}
                >
                  <CheckCircle2 size={18} color="#16a34a" style={{ flexShrink: 0 }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Timing & Booking Policy */}
          {(service.duration || service.setupTime || service.terms) && (
            <div className="card" style={{ marginTop: 20 }}>
              <h2 className="card-title" style={{ fontSize: 18, marginBottom: 14 }}>
                {language === 'ta' ? 'கால அவகாசம் & விதிமுறைகள்' : 'Timing & Policies'}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: 14 }}>
                {service.duration && (
                  <div style={{ padding: '12px 14px', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
                      <Clock size={14} color="var(--primary)" />
                      <span>{language === 'ta' ? 'சேவை கால அளவு' : 'Service Duration'}</span>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>
                      {service.duration}
                    </div>
                  </div>
                )}
                {service.setupTime && (
                  <div style={{ padding: '12px 14px', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
                      <Calendar size={14} color="var(--primary)" />
                      <span>{language === 'ta' ? 'அமைப்பு நேரம்' : 'Setup Time'}</span>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>
                      {service.setupTime}
                    </div>
                  </div>
                )}
                {service.terms && (
                  <div style={{ padding: '12px 14px', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0', gridColumn: '1 / -1' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
                      <ShieldCheck size={14} color="#16a34a" />
                      <span>{language === 'ta' ? 'முன்பதிவு விதிமுறைகள்' : 'Advance & Cancellation Policy'}</span>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>
                      {service.terms}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Official Social Media & Videos Card */}
          {activeSocialLinks.length > 0 && (
            <div className="card" style={{ marginTop: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 14 }}>
                <div>
                  <h2 className="card-title" style={{ fontSize: 18, margin: 0 }}>
                    {language === 'ta' ? 'அதிகாரப்பூர்வ சமூக ஊடகங்கள் & வீடியோக்கள்' : 'Official Videos & Social Channels'}
                  </h2>
                  <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--muted)' }}>
                    {language === 'ta'
                      ? 'வழங்குநரின் உண்மையான நிகழ்வு வேலைகள் மற்றும் வாடிக்கையாளர் திருப்தியை நேரடியாகப் பார்வையிடுங்கள்'
                      : 'Explore live event footage, portfolio shoots, and official updates from this vendor'}
                  </p>
                </div>
              </div>

              {/* If YouTube video is embeddable */}
              {embeddableVideoUrl && (
                <div style={{ marginBottom: 18, borderRadius: 12, overflow: 'hidden', background: '#000', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                  <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                    <iframe
                      src={embeddableVideoUrl}
                      title="Service Showcase Video"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 0,
                      }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {/* Grid of Social Channels */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 12 }}>
                {activeSocialLinks.map((item, idx) => {
                  const meta = getPlatformMeta(item.platform)
                  return (
                    <a
                      key={idx}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '14px 16px',
                        background: meta.bg,
                        border: `1px solid ${meta.borderColor}`,
                        borderRadius: 14,
                        textDecoration: 'none',
                        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow = '0 6px 14px rgba(0,0,0,0.06)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, overflow: 'hidden' }}>
                        <div
                          style={{
                            width: 38,
                            height: 38,
                            borderRadius: 10,
                            background: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                          }}
                        >
                          {meta.icon}
                        </div>
                        <div style={{ overflow: 'hidden' }}>
                          <div style={{ fontWeight: 700, fontSize: 14, color: meta.color }}>
                            {meta.name}
                          </div>
                          <div
                            style={{
                              fontSize: 12,
                              color: 'var(--muted)',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              maxWidth: 160,
                            }}
                          >
                            {language === 'ta' ? meta.descriptionTa : meta.descriptionEn}
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          fontSize: 12,
                          fontWeight: 700,
                          color: meta.color,
                          flexShrink: 0,
                        }}
                      >
                        <span>{language === 'ta' ? 'திறக்க' : 'Visit'}</span>
                        <ExternalLink size={13} />
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Pricing & Booking Action Card */}
        <div>
          <div className="card" style={{ position: 'sticky', top: 90 }}>
            <div style={{ color: 'var(--muted)', fontSize: 13 }}>
              {service.pricingType === 'PER_PLATE'
                ? t('pricePerPlate', 'Price per plate')
                : service.pricingType === 'PER_DAY'
                ? t('dailyRate', 'Daily rate')
                : t('startingPrice', 'Starting price')}
            </div>
            <div id="servicePrice" style={{ fontSize: 32, fontWeight: 800, margin: '4px 0 16px', color: 'var(--text)' }}>
              ₹{Number(service.price).toLocaleString('en-IN')}
              <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--muted)' }}>
                {service.pricingType === 'PER_PLATE'
                  ? t('perPlate', ' / plate')
                  : service.pricingType === 'PER_DAY'
                  ? t('perDay', ' / day')
                  : t('onwards', ' onwards')}
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 12px',
                background: '#f8fafc',
                borderRadius: 8,
                marginBottom: 12,
              }}
            >
              {Number(provider.rating || 0) > 0 && Number(provider.reviewCount || 0) > 0 ? (
                <>
                  <RatingStars rating={provider.rating} />
                  <strong style={{ fontSize: 13, marginLeft: 4 }}>
                    {Number(provider.rating).toFixed(1)}
                  </strong>
                  <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                    ({provider.reviewCount} {t('reviews', 'reviews')})
                  </span>
                </>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--muted)' }}>
                  <Star size={14} color="#cbd5e1" />
                  <span>{t('noRatingsYet', 'No ratings yet')}</span>
                </div>
              )}
            </div>

            {/* User Star Rating Input */}
            {provider?.id && (
              <div style={{ marginBottom: 16 }}>
                <StarRatingInput
                  providerId={provider.id}
                  providerName={provider.businessName}
                  compact={true}
                  onRatingSubmitted={(data) => {
                    setService((prev) => ({
                      ...prev,
                      provider: {
                        ...prev.provider,
                        rating: data.providerRating,
                        reviewCount: data.reviewCount,
                      },
                    }))
                  }}
                />
              </div>
            )}

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
              <Phone size={18} /> {t('callProvider', 'Call Provider')}
            </button>

            {/* Quick Link to Watch Work / Social Channels */}
            {activeSocialLinks.length > 0 && (
              <a
                href={activeSocialLinks[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{
                  width: '100%',
                  marginBottom: 12,
                  padding: '12px 20px',
                  borderRadius: 24,
                  fontSize: 13,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  textDecoration: 'none',
                  color: getPlatformMeta(activeSocialLinks[0].platform).color,
                  borderColor: getPlatformMeta(activeSocialLinks[0].platform).borderColor,
                  background: getPlatformMeta(activeSocialLinks[0].platform).bg,
                }}
              >
                {getPlatformMeta(activeSocialLinks[0].platform).icon}
                <span>
                  {activeSocialLinks.some((s) => s.platform.includes('youtube'))
                    ? (language === 'ta' ? 'YouTube சேனலைப் பார்க்கவும்' : 'Watch YouTube Portfolio')
                    : activeSocialLinks.some((s) => s.platform.includes('insta'))
                    ? (language === 'ta' ? 'Instagram பக்கத்தைப் பார்க்கவும்' : 'View Instagram Reels')
                    : (language === 'ta' ? 'அதிகாரப்பூர்வ பக்கத்தைப் பார்க்கவும்' : 'View Official Channel')}
                </span>
                <ExternalLink size={14} />
              </a>
            )}

            <div style={{ marginTop: 24, borderTop: '1px solid #f1f5f9', paddingTop: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <ShieldCheck size={18} color="#1a73e8" />
                <strong style={{ fontSize: 13 }}>{t('verifiedListing', 'Verified rjpm.in Listing')}</strong>
              </div>
              <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
                {t('directPricingAssurance', 'Direct pricing with no middleman markup. 100% money-back booking assurance.')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
