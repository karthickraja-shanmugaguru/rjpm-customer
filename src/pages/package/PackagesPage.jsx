import React, { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { packageService } from '../../services/packageService'
import { serviceService } from '../../services/serviceService'
import { useLocation } from '../../context/LocationContext'
import { useLanguage } from '../../context/LanguageContext'
import { PACKAGE_META } from '../../constants/categoryMeta'
import { ICONS } from '../../constants/icons'
import { RatingStars } from '../../components/common/RatingStars'
import { useFavorites } from '../../context/FavoritesContext'
import { SmartFilterModal } from '../../components/smart/SmartFilterModal'
import { SmartFilterResults } from '../../components/smart/SmartFilterResults'
import { RefreshCw, User, Check, Sparkles } from 'lucide-react'

const PACKAGE_CATEGORIES = [
  { id: 'All Packages', name: 'All Packages' },
  { id: 'Wedding', name: 'Wedding' },
  { id: 'Reception', name: 'Reception' },
  { id: 'Engagement', name: 'Engagement' },
  { id: 'Baby Shower', name: 'Baby Shower' },
  { id: 'Housewarming', name: 'Housewarming' },
  { id: 'Upanayanam', name: 'Upanayanam' },
  { id: 'Sashtiapthapoorthi', name: 'Sashtiapthapoorthi' },
  { id: 'Ear Piercing', name: 'Ear Piercing' },
  { id: 'Puberty Ceremony', name: 'Puberty Ceremony' },
  { id: 'Festival & Pooja', name: 'Festival & Pooja' },
  { id: 'Birthday', name: 'Birthday' },
  { id: 'Anniversary', name: 'Anniversary' },
  { id: 'Corporate', name: 'Corporate' },
]

const PROTOTYPE_PACKAGES = [
  {
    id: 6,
    event_type: 'Wedding',
    name: 'Grand South Indian Muhurtham Vivaham Package',
    provider_name: 'Sri Lakshmi Events & Catering',
    provider_id: 7,
    rating: 4.9,
    verified: true,
    price_display: '₹2,20,000+',
    price_amount: 220000,
    guest_capacity: 'Up to 600 guests',
    includes: 'Traditional 32-Item Panthi Feast · Mandapam Floral Decor · Nadaswaram & Thavil · Muhurtham Malai · Event Staff',
  },
  {
    id: 'wp_chet',
    event_type: 'Wedding',
    name: 'Royal Chettinad Kalyanam & Traditional Feast',
    provider_name: 'Chettinad Heritage Events',
    provider_id: 11,
    rating: 4.9,
    verified: true,
    price_display: '₹3,50,000+',
    price_amount: 350000,
    guest_capacity: 'Up to 800 guests',
    includes: 'Authentic Chettinad Multi-course Feast · Pandal & Shamiana · Singari Melam · Aarthi & Seer Plates Decor · Full Photography',
  },
  {
    id: 'wp2',
    event_type: 'Wedding',
    name: 'Traditional Temple & Hall Wedding Package',
    provider_name: 'Royal Mandapam Decorators',
    provider_id: 11,
    rating: 4.8,
    verified: true,
    price_display: '₹1,25,000+',
    price_amount: 125000,
    guest_capacity: 'Up to 400 guests',
    includes: 'Mandapam Decor · Fresh Rose Garland · Priest & Vedic Rituals · Padi Kolam · Audio Setup',
  },
  {
    id: 'wp3',
    event_type: 'Wedding',
    name: 'Wedding Memories Candid & Cinematic Suite',
    provider_name: 'Moments Studio',
    provider_id: 9,
    rating: 4.8,
    verified: true,
    price_display: '₹85,000+',
    price_amount: 85000,
    guest_capacity: '2 Days (Muhurtham & Reception)',
    includes: 'Candid Photography · Traditional Videography · 4K Drone Coverage · Premium Leather Wedding Album',
  },
  {
    id: 'wp_sangeet',
    event_type: 'Wedding',
    name: 'Sangeet & Haldi Carnival Extravaganza',
    provider_name: 'BeatWave Sound & DJ',
    provider_id: 10,
    rating: 4.8,
    verified: true,
    price_display: '₹75,000+',
    price_amount: 75000,
    guest_capacity: 'Up to 250 guests',
    includes: 'Marigold Haldi Floral Stage · DJ & Dance Floor · Bridal Mehendi · Cold Pyro Entry · Live Stalls',
  },
  {
    id: 8,
    event_type: 'Reception',
    name: 'Grand Reception Dinner & Musical Orchestra',
    provider_name: 'Sri Lakshmi Events & Catering',
    provider_id: 7,
    rating: 4.8,
    verified: true,
    price_display: '₹1,60,000+',
    price_amount: 160000,
    guest_capacity: 'Up to 500 guests',
    includes: 'Grand 50-Item Multi-Cuisine Buffet · Designer Stage Decor · Live Musical Orchestra · LED Wall Live Stream',
  },
  {
    id: 'rp2',
    event_type: 'Reception',
    name: 'Reception Entertainment, DJ & Light Show',
    provider_name: 'BeatWave Sound & DJ',
    provider_id: 7,
    rating: 4.7,
    verified: true,
    price_display: '₹35,000+',
    price_amount: 35000,
    guest_capacity: 'All evening',
    includes: 'Live DJ · Intelligent Moving Beam Lights · Low Fog Bride-Groom Entry · Dance Floor',
  },
  {
    id: 9,
    event_type: 'Engagement',
    name: 'Traditional Nichayathartham & Seer Varisai Package',
    provider_name: 'Sri Lakshmi Events & Catering',
    provider_id: 7,
    rating: 4.8,
    verified: true,
    price_display: '₹75,000+',
    price_amount: 75000,
    guest_capacity: 'Up to 250 guests',
    includes: 'Engagement Feast · 21 Decorated Seer Plates · Traditional Stage Flowers · Photography · Priest Service',
  },
  {
    id: 'ep2',
    event_type: 'Engagement',
    name: 'Elegant Ring Ceremony & Floral Stage',
    provider_name: 'Bloom Events',
    provider_id: 8,
    rating: 4.9,
    verified: true,
    price_display: '₹48,000+',
    price_amount: 48000,
    guest_capacity: 'Up to 200 guests',
    includes: 'Designer Floral Ring Arch · Warm Ambience Lighting · Welcome Board & Rose Petal Entry',
  },
  {
    id: 'sh_valai',
    event_type: 'Baby Shower',
    name: 'Traditional Valaikappu & Seemantham Grand Package',
    provider_name: 'Sri Lakshmi Events & Catering',
    provider_id: 7,
    rating: 4.9,
    verified: true,
    price_display: '₹48,000+',
    price_amount: 48000,
    guest_capacity: 'Up to 150 guests',
    includes: '7 Variety Rice & Traditional Feast · Bangle Stage Setup · Fresh Jasmine Garland · Photography · Glass Bangles & Thamboolam',
  },
  {
    id: 'sh1',
    event_type: 'Baby Shower',
    name: 'Pastel Floral Baby Shower & Maternity Photoshoot',
    provider_name: 'Bloom Events',
    provider_id: 8,
    rating: 4.9,
    verified: true,
    price_display: '₹32,000+',
    price_amount: 32000,
    guest_capacity: 'Up to 100 guests',
    includes: 'Pastel Balloon & Floral Arch · Mom-to-be Tiara & Sash · Candid Maternity Photoshoot · Welcome Drinks',
  },
  {
    id: 10,
    event_type: 'Housewarming',
    name: 'Complete Grihapravesam & Ganapathi Homam Package',
    provider_name: 'Sri Lakshmi Events & Catering',
    provider_id: 7,
    rating: 4.8,
    verified: true,
    price_display: '₹42,000+',
    price_amount: 42000,
    guest_capacity: 'Up to 150 guests',
    includes: 'Ganapathi & Navagraha Homam with Vedic Priest · Traditional Breakfast Feast · Mango Leaf & Floral Toranam · Padi Kolam',
  },
  {
    id: 'upa_1',
    event_type: 'Upanayanam',
    name: 'Vedic Upanayanam & Brahmopadesham Package',
    provider_name: 'Divya Sankalpam Vedic Priests',
    provider_id: 25,
    rating: 4.9,
    verified: true,
    price_display: '₹55,000+',
    price_amount: 55000,
    guest_capacity: 'Up to 180 guests',
    includes: 'Chief Vadhyar & Rig/Yajur Veda Priests · Homam Samagri · Traditional Brahmin Feast · Nadaswaram · Photography',
  },
  {
    id: 'sashti_1',
    event_type: 'Sashtiapthapoorthi',
    name: 'Grand Sashtiapthapoorthi (60th Kalyanam) Celebration',
    provider_name: 'Sri Lakshmi Events & Catering',
    provider_id: 7,
    rating: 4.9,
    verified: true,
    price_display: '₹68,000+',
    price_amount: 68000,
    guest_capacity: 'Up to 200 guests',
    includes: 'Ayushya & Mrityunjaya Homam · Special Muhurtham Garlands · Nadaswaram · Traditional Feast · Return Thamboolam Gifts',
  },
  {
    id: 'ear_1',
    event_type: 'Ear Piercing',
    name: 'Traditional Mottai & Kaadhu Kuthu (Ear Piercing) Package',
    provider_name: 'Sri Murugan Panthal Works',
    provider_id: 12,
    rating: 4.8,
    verified: true,
    price_display: '₹38,000+',
    price_amount: 38000,
    guest_capacity: 'Up to 150 guests',
    includes: 'Waterproof Panthal & Shamiana · Village Chenda Melam · Non-veg/Veg Feast · Photography · Chairs & Tables',
  },
  {
    id: 'puberty_1',
    event_type: 'Puberty Ceremony',
    name: 'Manjal Neerattu Vizha & Half Saree Ceremony Package',
    provider_name: 'Meenakshi Seer Varisai Plate Decors',
    provider_id: 32,
    rating: 4.8,
    verified: true,
    price_display: '₹45,000+',
    price_amount: 45000,
    guest_capacity: 'Up to 180 guests',
    includes: 'Traditional Floral Stage Decor · Bridal Makeup & Saree Draping · 11 Seer Plates · Traditional Feast · Photography',
  },
  {
    id: 'pooja_1',
    event_type: 'Festival & Pooja',
    name: 'Grand Navaratri Golu & Varalakshmi Pooja Setup',
    provider_name: 'Swarna Kolam & Rangoli Artists',
    provider_id: 33,
    rating: 4.9,
    verified: true,
    price_display: '₹28,000+',
    price_amount: 28000,
    guest_capacity: 'Up to 100 guests',
    includes: '7-Step Traditional Golu Stand Decor · Background Fabric & Fairy Lights · Floral Garlands · Prasadam & Sundal Catering',
  },
  {
    id: 7,
    event_type: 'Birthday',
    name: 'Premium Kids Theme Carnival Birthday Package',
    provider_name: 'Bloom Events',
    provider_id: 8,
    rating: 4.9,
    verified: true,
    price_display: '₹35,000+',
    price_amount: 35000,
    guest_capacity: 'Up to 120 guests',
    includes: 'Jungle/Princess Theme Balloon Stage · Live Cotton Candy & Popcorn Stalls · Sound System & MC · Birthday Cake & Catering',
  },
  {
    id: 'an1',
    event_type: 'Anniversary',
    name: 'Golden Jubilee Anniversary Celebration Package',
    provider_name: 'Sri Lakshmi Events & Catering',
    provider_id: 7,
    rating: 4.8,
    verified: true,
    price_display: '₹40,000+',
    price_amount: 40000,
    guest_capacity: 'Up to 150 guests',
    includes: 'Gourmet Dinner Buffet · Romantic Floral Stage & Lighting · Memory Slideshow AV · Live Violin/Flute Instrumental',
  },
  {
    id: 'co1',
    event_type: 'Corporate',
    name: 'Corporate Annual Gala, Awards & Buffet Night',
    provider_name: 'VisionTech AV & LED Walls',
    provider_id: 37,
    rating: 4.8,
    verified: true,
    price_display: '₹95,000+',
    price_amount: 95000,
    guest_capacity: 'Up to 350 guests',
    includes: 'P3 LED Wall & Podium Setup · Professional Stage Truss Lighting · Sound System & Cordless Mics · Multi-Cuisine Dinner Buffet',
  },
]

export const PackagesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { location } = useLocation()
  const { language, setLanguage, t } = useLanguage()
  const { isPackageFavorited, toggleFavoritePackage } = useFavorites()

  const currentEventType = searchParams.get('eventType') || 'All Packages'
  const [activeCategory, setActiveCategory] = useState(currentEventType)
  const [activeFilter, setActiveFilter] = useState('')
  const [packages, setPackages] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  // Smart Filter State
  const [isSmartModalOpen, setIsSmartModalOpen] = useState(false)
  const [smartFilterData, setSmartFilterData] = useState(null)

  useEffect(() => {
    serviceService.getServices().then((res) => {
      if (res && res.data) setServices(res.data)
    }).catch(() => {})
  }, [])

  useEffect(() => {
    const et = searchParams.get('eventType') || 'All Packages'
    setActiveCategory(et)
  }, [searchParams])

  const handleSelectCategory = (catId) => {
    setActiveCategory(catId)
    if (catId === 'All Packages') {
      searchParams.delete('eventType')
      setSearchParams(searchParams)
    } else {
      setSearchParams({ ...Object.fromEntries(searchParams), eventType: catId })
    }
  }

  useEffect(() => {
    let isMounted = true

    const fetchPackages = async () => {
      setLoading(true)
      try {
        const filters = {}
        if (activeCategory !== 'All Packages') {
          filters.eventType = activeCategory
        }
        const res = await packageService.getPackages(filters)
        if (!isMounted) return

        if (res.data && Array.isArray(res.data)) {
          setPackages(res.data)
        } else {
          setPackages([])
        }
      } catch {
        if (!isMounted) return
        setPackages([])
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchPackages()
    return () => {
      isMounted = false
    }
  }, [activeCategory, location])

  // Filter application
  let displayed = [...packages]
  if (activeFilter === 'rating') {
    displayed = displayed.filter((p) => (p.rating || p.provider_rating || 0) >= 4.8)
  } else if (activeFilter === 'verified') {
    displayed = displayed.filter((p) => p.verified !== false && p.provider_verified !== false)
  } else if (activeFilter === 'price') {
    displayed.sort((a, b) => (a.price_amount || 0) - (b.price_amount || 0))
  }

  return (
    <section id="packages" className="screen active" style={{ display: 'block' }}>
      <div className="listing-header">
        <h1 className="page-title" style={{ margin: 0 }}>
          {activeCategory === 'All Packages'
            ? t('All Packages', 'All Event Packages')
            : `${t(activeCategory, activeCategory)} ${t('explorePackages', 'Packages')}`}
        </h1>
        <p className="page-description" style={{ marginTop: 4, color: 'var(--muted)' }}>
          {t('packagesSubtitle', 'Find ready-made celebration packages with verified vendors.')}
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
            {language === 'ta' ? 'நிகழ்வு தொகுப்புகள்' : 'Event Packages'}
          </div>
          {PACKAGE_CATEGORIES.map((cat) => {
            const meta = PACKAGE_META[cat.id] || PACKAGE_META['Wedding']
            const isActive = cat.id === activeCategory
            return (
              <div
                key={cat.id}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
                onClick={() => handleSelectCategory(cat.id)}
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
            {/* Smart Filter Magic Button */}
            <button
              type="button"
              className={`filter ${Boolean(smartFilterData) ? 'active' : ''}`}
              onClick={() => setIsSmartModalOpen(true)}
              style={{
                background: Boolean(smartFilterData) ? 'linear-gradient(135deg, #eff6ff 0%, #f5f3ff 100%)' : '#fff',
                borderColor: Boolean(smartFilterData) ? '#8b5cf6' : '#c7d2fe',
                color: Boolean(smartFilterData) ? '#7c3aed' : '#6366f1',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                boxShadow: '0 1px 4px rgba(99, 102, 241, 0.1)',
              }}
            >
              <Sparkles size={14} color={Boolean(smartFilterData) ? '#7c3aed' : '#6366f1'} />
              {t('smartFilter', 'Smart Filter')}
              {Boolean(smartFilterData) && smartFilterData?.selectedServices?.length > 0 && (
                <span
                  style={{
                    background: '#7c3aed',
                    color: '#fff',
                    borderRadius: 10,
                    padding: '1px 6px',
                    fontSize: 10,
                    fontWeight: 800,
                  }}
                >
                  {smartFilterData.selectedServices.length}
                </span>
              )}
            </button>

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

          {/* SMART FILTER RESULTS */}
          {smartFilterData && (
            <SmartFilterResults
              smartData={smartFilterData}
              onEditFilter={() => setIsSmartModalOpen(true)}
              onClearFilter={() => setSmartFilterData(null)}
            />
          )}

          {/* PACKAGE LIST GRID */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)' }}>
              <RefreshCw size={32} className="spin-animation" style={{ margin: '0 auto 12px' }} />
              <p>{language === 'ta' ? 'கொண்டாட்ட தொகுப்புகள் ஏற்றப்படுகின்றன...' : 'Loading curated celebration packages...'}</p>
            </div>
          ) : displayed.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">{ICONS.search(48, 'var(--muted)')}</div>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 4 }}>
                {language === 'ta' ? 'தொகுப்புகள் கிடைக்கவில்லை' : 'No packages found'}
              </div>
              <div style={{ fontSize: 14 }}>
                {language === 'ta' ? 'வேறு பிரிவைத் தேர்ந்தெடுக்கவும் அல்லது வடிகட்டிகளை மீட்டமைக்கவும்.' : 'Try selecting another package category or clearing filters.'}
              </div>
            </div>
          ) : (
            <div className="package-list-grid">
              {displayed.map((pkg) => {
                const eventType = pkg.event_type || pkg.type || 'Wedding'
                const meta = PACKAGE_META[eventType] || PACKAGE_META['Wedding']
                const providerName = pkg.provider_name || pkg.provider || 'Sri Lakshmi Events & Catering'
                const providerId = pkg.provider_id || pkg.providerId || 7
                const rating = Number(pkg.rating || pkg.provider_rating || 0)
                const isVerified = pkg.verified !== false && pkg.provider_verified !== false

                const isFav = isPackageFavorited ? isPackageFavorited(pkg.id) : false

                return (
                  <div key={pkg.id} className="package-list-card" style={{ position: 'relative' }}>
                    <button
                      type="button"
                      className={`vendor-favorite ${isFav ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        if (toggleFavoritePackage) toggleFavoritePackage(pkg.id)
                      }}
                      aria-label={isFav ? 'Remove from saved' : 'Save package'}
                      style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        zIndex: 3,
                      }}
                    >
                      {isFav ? ICONS.heartFilled(20) : ICONS.heart(20)}
                    </button>
                    {pkg.coverImage || pkg.cover_image || (Array.isArray(pkg.images) && pkg.images[0]) ? (
                      <div
                        style={{
                          width: '100%',
                          height: 180,
                          borderRadius: 14,
                          overflow: 'hidden',
                          marginBottom: 14,
                          position: 'relative',
                          background: '#f1f5f9',
                        }}
                      >
                        <img
                          src={pkg.coverImage || pkg.cover_image || pkg.images[0]}
                          alt={pkg.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                        <span
                          style={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            background: 'rgba(0,0,0,0.65)',
                            backdropFilter: 'blur(4px)',
                            color: '#fff',
                            padding: '3px 9px',
                            borderRadius: 12,
                            fontSize: 11,
                            fontWeight: 700,
                          }}
                        >
                          {pkg.icon || '💍'} {eventType}
                        </span>
                      </div>
                    ) : (
                      <div
                        className="package-list-icon"
                        style={{
                          background: meta.bg,
                          border: `1px solid ${meta.color}25`,
                        }}
                      >
                        {meta.svg(32)}
                      </div>
                    )}

                    <h3 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 6px 0', letterSpacing: '-0.3px' }}>
                      {pkg.name}
                    </h3>

                    <div className="package-provider">
                      <Link
                        to={`/providers/${providerId}`}
                        style={{
                          color: 'var(--primary)',
                          textDecoration: 'none',
                          fontWeight: 600,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 5,
                        }}
                      >
                        <User size={13} /> {providerName}
                      </Link>
                    </div>

                    <div className="package-rating">
                      {rating > 0 && (
                        <>
                          <RatingStars rating={rating} />
                          <strong style={{ fontSize: 13, marginLeft: 2 }}>{rating.toFixed(1)}</strong>
                        </>
                      )}
                      {isVerified && (
                        <span
                          style={{
                            color: 'var(--success)',
                            fontWeight: 700,
                            fontSize: 12,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 3,
                            marginLeft: 4,
                          }}
                        >
                          <Check size={13} strokeWidth={3} /> {t('verified', 'Verified')}
                        </span>
                      )}
                    </div>

                    <div className="package-price">
                      {pkg.price_display || `₹${Number(pkg.price_amount || pkg.price).toLocaleString('en-IN')}+`}
                    </div>

                    <div className="package-includes">
                      <strong style={{ display: 'block', color: 'var(--text)', fontSize: 13, marginBottom: 3 }}>
                        {t('whatsIncluded', "What's included:")}
                      </strong>
                      <div style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.5 }}>
                        {pkg.includes || pkg.description || `${eventType} Catering · Stage · Decoration · Sound`}
                      </div>
                    </div>

                    <Link
                      to={`/packages/${pkg.id}`}
                      className="btn btn-primary"
                      style={{
                        marginTop: 'auto',
                        padding: '12px 18px',
                        borderRadius: 24,
                        textAlign: 'center',
                        textDecoration: 'none',
                        fontWeight: 700,
                        fontSize: 14,
                        display: 'block',
                      }}
                    >
                      {t('viewPackageDetails', 'View Package Details')}
                    </Link>
                  </div>
                )
              })}
            </div>
          )}
        </main>
      </div>

      {/* Smart Filter Modal */}
      <SmartFilterModal
        isOpen={isSmartModalOpen}
        onClose={() => setIsSmartModalOpen(false)}
        initialServices={smartFilterData?.selectedServices}
        initialMinBudget={smartFilterData?.minBudget}
        initialMaxBudget={smartFilterData?.maxBudget}
        onApply={(data) => setSmartFilterData(data)}
        packages={packages}
        services={services}
      />
    </section>
  )
}
