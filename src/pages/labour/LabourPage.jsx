import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { labourService } from '../../services/labourService'
import { useLocation } from '../../context/LocationContext'
import { useLanguage } from '../../context/LanguageContext'
import { LABOUR_META } from '../../constants/categoryMeta'
import { ICONS } from '../../constants/icons'
import { RatingStars } from '../../components/common/RatingStars'
import { RefreshCw, User, Check, Phone, MessageCircle } from 'lucide-react'

const LABOUR_CATEGORIES = [
  { id: 'All Labour', name: 'All Labour' },
  { id: 'Food & Panthi Servers', name: 'Food & Panthi Servers' },
  { id: 'Kitchen Helpers & Cutters', name: 'Kitchen Helpers & Cutters' },
  { id: 'Dishwashers & Vessel Cleaners', name: 'Dishwashers & Vessel Cleaners' },
  { id: 'Cleaning Staff', name: 'Cleaning Staff' },
  { id: 'Panthal & Shamiana Riggers', name: 'Panthal & Shamiana Riggers' },
  { id: 'Setup & Furniture Crew', name: 'Setup & Furniture Crew' },
  { id: 'Valet Parking & Marshals', name: 'Valet Parking & Marshals' },
  { id: 'Security & Bouncers', name: 'Security & Bouncers' },
  { id: 'Hospitality & Thamboolam Staff', name: 'Hospitality & Thamboolam Staff' },
  { id: 'Luggage & Room Attendants', name: 'Luggage & Room Attendants' },
  { id: 'Sound, Light & Generator Crew', name: 'Sound, Light & Generator Crew' },
  { id: 'Flower & Garland Helpers', name: 'Flower & Garland Helpers' },
  { id: 'Pooja & Homam Assistants', name: 'Pooja & Homam Assistants' },
]



const LABOUR_TRANSLATIONS_TA = {
  'Traditional Panthi & Buffet Food Servers': {
    name: 'பாரம்பரிய பந்தி & பஃபே உணவு பரிமாறுவோர்',
    details: 'வாழை இலை பந்தி பரிமாறும் முறை (உப்பு, இனிப்பு, கூட்டு, பொரியல், சாதம், சாம்பார், ரசம், பாயாசம்) நன்கு அறிந்த தூய சீருடை பணியாளர்கள்.',
  },
  'Vegetable Cutters & Kitchen Assistants': {
    name: 'காய் நறுக்குவோர் & சமையல் உதவியாளர்கள்',
    details: 'பெரிய விசேஷங்களுக்கான விரைவான காய் வெட்டுதல், தேங்காய் துருவுதல் மற்றும் தலைமை சமையல்காரருக்கு முழுமையான சமையல் உதவி.',
  },
  'Heavy Catering Boiler & Vessel Cleaners': {
    name: 'மண்டப பாத்திரம் & தட்டு கழுவுவோர்',
    details: 'பெரிய சமையல் அண்டா, கொப்பரை, எவர்சில்வர் தட்டுகள் மற்றும் டம்ளர்களை சுடுநீர் கொண்டு விரைவாக சுத்தம் செய்யும் குழு.',
  },
  'Dining Hall & Mandapam Cleaners': {
    name: 'சாப்பாட்டு கூடம் & மண்டப துப்புரவு பணியாளர்கள்',
    details: 'ஒவ்வொரு பந்தி முடிந்ததும் உடனடியாக மேஜை துடைத்தல், இலை அகற்றுதல், தரை துடைத்தல் மற்றும் குப்பை மேலாண்மை.',
  },
  'Heavy Pandal & Bamboo Rigging Crew': {
    name: 'பந்தல் & மூங்கில் கட்டமைப்பு அமைப்பாளர்கள்',
    details: 'உயரமான மூங்கில் பந்தல், மழை நீர் புகா ஜெர்மன் ஷாமியானா மற்றும் மேடை துணி அலங்காரங்களை அமைக்கும் வல்லுநர்கள்.',
  },
  'Banquet Furniture & Stage Setup Crew': {
    name: 'மேஜை, நாற்காலி & மேடை அமைப்பு குழு',
    details: '500+ விருந்து நாற்காலிகள், வட்ட மேஜைகள், வி.ஐ.பி சோபாக்கள் மற்றும் மேடை விரிப்புகளை விரைவாக ஒழுங்கமைக்கும் குழு.',
  },
  'Uniformed Valet Parking Drivers': {
    name: 'சீருடை அணிந்த வேலட் பார்க்கிங் ஓட்டுநர்கள்',
    details: 'ஓட்டுநர் உரிமம் பெற்ற பண்பான ஓட்டுநர்கள், டோக்கன் முறை, வாகனங்களை பாதுகாப்பாக நிறுத்துதல் மற்றும் போக்குவரத்து கட்டுப்பாடு.',
  },
  'Certified Bouncers & Event Security Guards': {
    name: 'பவுன்சர்கள் & நிகழ்வு பாதுகாப்பு காவலர்கள்',
    details: 'முக்கிய பிரமுகர்கள் பாதுகாப்பு, நுழைவு வாயில் கட்டுப்பாடு மற்றும் பரிசுப் பொருட்கள் மேடை பாதுகாப்பு பணிகளுக்கான பவுன்சர்கள்.',
  },
  'Traditional Welcome & Thamboolam Hosts': {
    name: 'பாரம்பரிய வரவேற்பு & தாம்பூலம் வழங்குவோர்',
    details: 'பன்னீர் செம்பு, சந்தனம், கல்கண்டுடன் பாரம்பரிய புடவை அணிந்த வரவேற்பாளர்கள் மற்றும் விடைபெறும் விருந்தினர்களுக்கு தாம்பூல பை வழங்குவோர்.',
  },
  'Mandapam Room Attendants & Luggage Boys': {
    name: 'மண்டப அறை உதவியாளர்கள் & லக்கேஜ் பாய்ஸ்',
    details: 'விருந்தினர்களின் உடைமைகளை வாகனங்களிலிருந்து ஏசி அறைகளுக்கு கொண்டு செல்லுதல், தண்ணீர் மற்றும் டவல் வசதிகளை கவனித்தல்.',
  },
  'Electrical, Lighting & Generator Attendants': {
    name: 'மின்சாரம், விளக்கு & ஜெனரேட்டர் உதவியாளர்கள்',
    details: 'தடையில்லா மின்சாரத்திற்கு ஜெனரேட்டர் எரிபொருள் கண்காணிப்பு, மேடை ஸ்பாட்லைட் மற்றும் ஒலிபெருக்கி வயரிங் பணியாளர்கள்.',
  },
  'On-site Floral Stringers & Garland Assistants': {
    name: 'மலர் தொடுப்போர் & மாலை கட்டும் உதவியாளர்கள்',
    details: 'புதிய மல்லிகைப் பூ கட்டுதல், மேடை பூங்கொத்துகள், வாசற்படி தோரணம் மற்றும் கார் மலர் அலங்கார உதவியாளர்கள்.',
  },
  'Vedic Pooja & Homakunda Helpers': {
    name: 'வேத பூஜை & ஹோம உதவியாளர்கள்',
    details: 'ஹோம குண்டம் செங்கல் அமைப்பு, சமித்து குச்சிகள், குத்துவிளக்கு துலக்குதல் மற்றும் சாஸ்திரிகளின் பூஜைக்கு தேவையான பொருட்கள் ஏற்பாடு.',
  },
}

export const LabourPage = () => {
  const navigate = useNavigate()
  const { location } = useLocation()
  const { language, setLanguage, t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState('All Labour')
  const [activeFilter, setActiveFilter] = useState('')
  const [labourList, setLabourList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const fetchLabour = async () => {
      setLoading(true)
      try {
        const filters = {}
        if (activeCategory !== 'All Labour') {
          filters.category = activeCategory
          filters.type = activeCategory
        }
        const res = await labourService.getLabour(filters)
        if (!isMounted) return

        if (res.data && Array.isArray(res.data)) {
          setLabourList(res.data)
        } else {
          setLabourList([])
        }
      } catch {
        if (!isMounted) return
        setLabourList([])
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchLabour()
    return () => {
      isMounted = false
    }
  }, [activeCategory, location])

  const handleCall = (e, phone = '+919876543210') => {
    e.stopPropagation()
    window.location.href = `tel:${phone}`
  }

  const handleWhatsApp = (e, name = 'Staffing', provider = 'Provider') => {
    e.stopPropagation()
    const msg = encodeURIComponent(`Hi ${provider}, I am interested in booking "${name}" via rjpm.in.`)
    window.open(`https://wa.me/919876543210?text=${msg}`, '_blank')
  }

  // Ensure category filtering is strictly honored
  let displayed =
    activeCategory === 'All Labour'
      ? [...labourList]
      : labourList.filter((l) => (l.type || l.category) === activeCategory)

  // Secondary filters
  if (activeFilter === 'rating') {
    displayed = displayed.filter((l) => (l.rating || 0) >= 4.0)
  } else if (activeFilter === 'verified') {
    displayed = displayed.filter((l) => Boolean(l.verified))
  } else if (activeFilter === 'price') {
    displayed.sort((a, b) => (a.price_amount || 0) - (b.price_amount || 0))
  }

  return (
    <section id="labour" className="screen active" style={{ display: 'block' }}>
      <div className="listing-header">
        <h1 className="page-title" style={{ margin: 0 }}>
          {t('labourTitle', 'Event Staff & Labour Support')}
        </h1>
        <p className="page-description" style={{ marginTop: 4, color: 'var(--muted)' }}>
          {t('labourSubtitle', 'Book trained event staff for smooth catering, setup, hospitality and cleanup.')}
        </p>
      </div>

      <div className="explore-layout">
        {/* LEFT SIDEBAR */}
        <aside className="category-sidebar">
          <div
            style={{
              padding: '10px 14px 8px',
              fontSize: '11px',
              fontWeight: 800,
              color: 'var(--muted)',
              textTransform: 'uppercase',
              letterSpacing: '.05em',
            }}
          >
            {t('eventSupportStaff', 'Event Support Staff')}
          </div>
          {LABOUR_CATEGORIES.map((cat) => {
            const meta = LABOUR_META[cat.id] || LABOUR_META['All Labour']
            const isActive = cat.id === activeCategory
            return (
              <div
                key={cat.id}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <div
                  className="sidebar-icon"
                  style={{
                    background: meta.bg,
                    border: `1px solid ${meta.color}25`,
                  }}
                >
                  {meta.svg(22)}
                </div>
                <strong>{t(cat.id, cat.name)}</strong>
              </div>
            )
          })}
        </aside>

        {/* RIGHT MAIN AREA */}
        <main className="explore-main">
          {/* FILTER BAR */}
          <div className="filter-bar">
            <button
              className={`filter ${activeFilter === 'near' ? 'active' : ''}`}
              onClick={() => setActiveFilter(activeFilter === 'near' ? '' : 'near')}
            >
              {ICONS.mapPin(14)} {t('nearMe', 'Near me')}
            </button>
            <button
              className={`filter ${activeFilter === 'price' ? 'active' : ''}`}
              onClick={() => setActiveFilter(activeFilter === 'price' ? '' : 'price')}
            >
              ₹ {t('price', 'Price')}
            </button>
            <button
              className={`filter ${activeFilter === 'rating' ? 'active' : ''}`}
              onClick={() => setActiveFilter(activeFilter === 'rating' ? '' : 'rating')}
            >
              ★ {t('rating4Plus', '4+ Rating')}
            </button>
            <button
              className={`filter ${activeFilter === 'verified' ? 'active' : ''}`}
              onClick={() => setActiveFilter(activeFilter === 'verified' ? '' : 'verified')}
            >
              {ICONS.check(14)} {t('verified', 'Verified')}
            </button>
            <button
              className={`filter ${activeFilter ? 'active' : ''}`}
              onClick={() => setActiveFilter('')}
            >
              {ICONS.filter(14)} {activeFilter ? t('clearFilter', 'Clear filter') : t('moreFilters', 'More filters')}
            </button>
          </div>

          {/* LABOUR LIST GRID */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)' }}>
              <RefreshCw size={32} className="spin-animation" style={{ margin: '0 auto 12px' }} />
              <p>{language === 'ta' ? 'நிகழ்வு ஊழியர்கள் ஏற்றப்படுகின்றனர்...' : 'Loading event support staff...'}</p>
            </div>
          ) : displayed.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">{ICONS.search(48, 'var(--muted)')}</div>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 4 }}>
                {language === 'ta' ? 'ஊழியர்கள் கிடைக்கவில்லை' : 'No staff found'}
              </div>
              <div style={{ fontSize: 14 }}>
                {language === 'ta' ? 'வேறு பிரிவைத் தேர்ந்தெடுக்கவும் அல்லது வடிகட்டிகளை மீட்டமைக்கவும்.' : 'Try selecting another staff category or clearing filters.'}
              </div>
            </div>
          ) : (
            <div className="package-list-grid">
              {displayed.map((item) => {
                const category = item.type || item.category || 'Food Servers'
                const meta = LABOUR_META[category] || LABOUR_META['Food Servers']
                const providerName = item.provider_name || item.provider || 'HelpingHands Event Staffing'
                const providerId = item.provider_id || item.providerId || 12
                const rating = item.rating || 4.6
                const isVerified = Boolean(item.verified)

                const itemName =
                  language === 'ta' && LABOUR_TRANSLATIONS_TA[item.name]?.name
                    ? LABOUR_TRANSLATIONS_TA[item.name].name
                    : item.name

                const itemDetails =
                  language === 'ta' && LABOUR_TRANSLATIONS_TA[item.name]?.details
                    ? LABOUR_TRANSLATIONS_TA[item.name].details
                    : (item.details || item.description || (language === 'ta' ? 'பயிற்சி பெற்ற சரிபார்க்கப்பட்ட நிகழ்வு ஊழியர்கள்.' : 'Trained and background-verified event staff.'))

                const priceDisplay =
                  language === 'ta'
                    ? `தொடக்கம் ₹${Number(item.price_amount || 500).toLocaleString('en-IN')} / நபர்`
                    : (item.price_display || `From ₹${Number(item.price_amount || 500).toLocaleString('en-IN')} / staff`)

                const itemImages = Array.isArray(item.images)
                  ? item.images
                  : (typeof item.images === 'string' && item.images.trim()
                      ? (() => { try { return JSON.parse(item.images) } catch { return [] } })()
                      : [])

                return (
                  <div
                    key={item.id}
                    className="package-list-card"
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                    }}
                    onClick={() => navigate(`/labour/${item.id}`)}
                    title={`Click to view ${itemName} details`}
                  >
                    {/* Cover Photo / Role Icon */}
                    {item.cover_image || item.coverImage || (itemImages.length > 0 && itemImages[0]) ? (
                      <div
                        style={{
                          width: '100%',
                          height: 160,
                          borderRadius: 14,
                          overflow: 'hidden',
                          marginBottom: 14,
                          position: 'relative',
                          background: '#f1f5f9',
                        }}
                      >
                        <img
                          src={item.cover_image || item.coverImage || itemImages[0]}
                          alt={itemName}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                        {isVerified && (
                          <span
                            style={{
                              position: 'absolute',
                              top: 8,
                              left: 8,
                              color: 'var(--success)',
                              fontWeight: 700,
                              fontSize: 11,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 3,
                              background: 'rgba(255, 255, 255, 0.95)',
                              padding: '3px 8px',
                              borderRadius: 12,
                              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                            }}
                          >
                            <Check size={12} strokeWidth={3} /> {t('verified', 'Verified')}
                          </span>
                        )}
                        {itemImages.length > 0 && (
                          <span
                            style={{
                              position: 'absolute',
                              top: 8,
                              right: 8,
                              background: 'rgba(0,0,0,0.65)',
                              backdropFilter: 'blur(4px)',
                              color: '#fff',
                              padding: '3px 8px',
                              borderRadius: 12,
                              fontSize: 11,
                              fontWeight: 600,
                            }}
                          >
                            📷 {itemImages.length} photos
                          </span>
                        )}
                      </div>
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                        <div
                          className="package-list-icon"
                          style={{
                            background: meta.bg,
                            border: `1px solid ${meta.color}25`,
                            margin: 0,
                          }}
                        >
                          {meta.svg(32)}
                        </div>
                        {isVerified && (
                          <span
                            style={{
                              color: 'var(--success)',
                              fontWeight: 700,
                              fontSize: 12,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 3,
                              background: '#f0fdf4',
                              padding: '4px 10px',
                              borderRadius: 16,
                              border: '1px solid #dcfce7',
                            }}
                          >
                            <Check size={13} strokeWidth={3} /> {t('verified', 'Verified')}
                          </span>
                        )}
                      </div>
                    )}

                    <h3
                      style={{
                        fontSize: 18,
                        fontWeight: 800,
                        margin: '0 0 6px 0',
                        letterSpacing: '-0.3px',
                        color: 'var(--text)',
                      }}
                    >
                      {itemName}
                    </h3>

                    <div className="package-provider" style={{ marginBottom: 6 }}>
                      <Link
                        to={`/providers/${providerId}`}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          color: 'var(--primary)',
                          fontWeight: 600,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 5,
                          textDecoration: 'none',
                        }}
                      >
                        <User size={13} /> {providerName}
                      </Link>
                    </div>

                    <div className="package-rating" style={{ marginBottom: 8 }}>
                      <RatingStars rating={rating} />
                      <strong style={{ fontSize: 13, marginLeft: 2 }}>{rating}</strong>
                    </div>

                    <div className="package-price" style={{ marginBottom: 8 }}>
                      {priceDisplay}
                    </div>

                    <div className="package-includes" style={{ marginBottom: 16 }}>
                      <div style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.5 }}>
                        {itemDetails}
                      </div>
                    </div>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1.25fr',
                        gap: 10,
                        marginTop: 'auto',
                        paddingTop: 14,
                        borderTop: '1px solid #f1f5f9',
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        className="btn btn-outline"
                        onClick={(e) => handleCall(e)}
                        style={{
                          padding: '10px 12px',
                          borderRadius: 24,
                          fontSize: 13,
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 6,
                          cursor: 'pointer',
                        }}
                      >
                        <Phone size={14} /> {t('call', 'Call')}
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={(e) => handleWhatsApp(e, itemName, providerName)}
                        style={{
                          padding: '10px 12px',
                          borderRadius: 24,
                          fontSize: 13,
                          fontWeight: 700,
                          background: '#16a34a',
                          borderColor: '#16a34a',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 6,
                          cursor: 'pointer',
                        }}
                      >
                        <MessageCircle size={14} /> {t('whatsapp', 'WhatsApp')}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </main>
      </div>
    </section>
  )
}
