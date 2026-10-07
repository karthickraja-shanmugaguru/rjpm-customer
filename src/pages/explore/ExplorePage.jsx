import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CategorySidebar } from '../../components/explore/CategorySidebar'
import { FilterBar } from '../../components/explore/FilterBar'
import { ServiceCard } from '../../components/common/ServiceCard'
import { VendorCard } from '../../components/common/VendorCard'
import { serviceService } from '../../services/serviceService'
import { providerService } from '../../services/providerService'
import { packageService } from '../../services/packageService'
import { useLocation } from '../../context/LocationContext'
import { useLanguage } from '../../context/LanguageContext'
import { SmartFilterModal } from '../../components/smart/SmartFilterModal'
import { SmartFilterResults } from '../../components/smart/SmartFilterResults'
import { Search, SlidersHorizontal, AlertCircle, RefreshCw, MessageCircle } from 'lucide-react'

export const ExplorePage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { location } = useLocation()
  const { language, setLanguage, t } = useLanguage()

  const currentCategory = searchParams.get('category') || 'All'
  const initialSearch = searchParams.get('search') || ''

  const typeParam = searchParams.get('type') || searchParams.get('view')
  const [activeCategory, setActiveCategory] = useState(currentCategory)
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [activeFilter, setActiveFilter] = useState('near') // 'near', 'price', 'rating', 'verified'
  const [viewType, setViewType] = useState(typeParam === 'vendors' ? 'vendors' : 'services')

  const [services, setServices] = useState([])
  const [providers, setProviders] = useState([])
  const [allPackages, setAllPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Smart Filter State
  const [isSmartModalOpen, setIsSmartModalOpen] = useState(false)
  const [smartFilterData, setSmartFilterData] = useState(null)

  useEffect(() => {
    const cat = searchParams.get('category') || 'All'
    setActiveCategory(cat)
    const q = searchParams.get('search') || ''
    setSearchQuery(q)
    const tParam = searchParams.get('type') || searchParams.get('view')
    if (tParam) {
      setViewType(tParam === 'vendors' ? 'vendors' : 'services')
    }
  }, [searchParams])

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const filters = {
        category: activeCategory !== 'All' ? activeCategory : undefined,
        search: searchQuery || undefined,
        city: location,
      }

      if (activeFilter === 'rating') filters.minRating = 4.0
      if (activeFilter === 'verified') filters.verified = true

      const [servicesRes, providersRes, packagesRes] = await Promise.all([
        serviceService.getServices(filters),
        providerService.getProviders(filters),
        packageService.getPackages().catch(() => ({ data: [] })),
      ])

      let sData = servicesRes.data || []
      let pData = providersRes.data || []
      let pkgData = packagesRes.data || []

      if (activeFilter === 'price') {
        sData = [...sData].sort((a, b) => Number(a.price) - Number(b.price))
      }

      setServices(sData)
      setProviders(pData)
      setAllPackages(pkgData)
    } catch (err) {
      setError(err?.message || 'Failed to load services.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [activeCategory, searchQuery, activeFilter, location])

  const handleCategorySelect = (category) => {
    setActiveCategory(category)
    const params = new URLSearchParams(searchParams)
    if (category === 'All') {
      params.delete('category')
    } else {
      params.set('category', category)
    }
    setSearchParams(params)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim())
    } else {
      params.delete('search')
    }
    setSearchParams(params)
  }

  return (
    <section id="listing" className="screen active" style={{ display: 'block' }}>
      <div className="explore-header-row">
        <div>
          <h1 id="listingTitle" className="page-title" style={{ margin: 0 }}>
            {activeCategory === 'All'
              ? (viewType === 'vendors' ? t('allVerifiedProviders', 'All verified providers near you') : t('allEventServices', 'All Event Services'))
              : `${t(activeCategory, activeCategory)} ${viewType === 'vendors' ? t('providersNearYou', 'providers near you') : `${t('servicesNearYou', 'services in')} ${location}`}`}
          </h1>
          <p className="page-description" style={{ marginTop: 4, color: 'var(--muted)' }}>
            {viewType === 'vendors'
              ? t('packagesSubtitle', 'Find ready-made celebration packages with verified vendors.')
              : t('popularServicesSub', 'Compare verified specialists, read reviews, and book direct with transparent pricing.')}
          </p>
        </div>

        {/* View Toggle */}
        <div className="explore-view-toggle">
            <button
              onClick={() => setViewType('services')}
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                border: 'none',
                fontSize: 13,
                fontWeight: 600,
                background: viewType === 'services' ? '#fff' : 'transparent',
                color: viewType === 'services' ? 'var(--primary)' : 'var(--muted)',
                boxShadow: viewType === 'services' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                cursor: 'pointer',
                transition: '0.2s',
              }}
            >
              {language === 'ta' ? `சேவைகள் (${services.length})` : `Services (${services.length})`}
            </button>
            <button
              onClick={() => setViewType('vendors')}
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                border: 'none',
                fontSize: 13,
                fontWeight: 600,
                background: viewType === 'vendors' ? '#fff' : 'transparent',
                color: viewType === 'vendors' ? 'var(--primary)' : 'var(--muted)',
                boxShadow: viewType === 'vendors' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                cursor: 'pointer',
                transition: '0.2s',
              }}
            >
              {language === 'ta' ? `வழங்குநர்கள் (${providers.length})` : `Vendors (${providers.length})`}
            </button>
          </div>
      </div>

      <div className="explore-layout">
        {/* Category Sidebar */}
        <CategorySidebar
          activeCategory={activeCategory}
          onSelectCategory={handleCategorySelect}
        />

        <div className="explore-main">
          {/* Search bar inside Explore */}
          <form
            onSubmit={handleSearchSubmit}
            className="explore-search-bar"
          >
            <Search size={16} color="var(--muted)" style={{ marginRight: 8, flexShrink: 0 }} />
            <input
              type="text"
              placeholder={t('searchServicesOrVendors', 'Search services or vendors...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                background: 'transparent',
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--muted)',
                  fontSize: 12,
                  cursor: 'pointer',
                  marginRight: 6,
                }}
              >
                ✕
              </button>
            )}
            <button
              type="submit"
              className="btn btn-primary search-btn"
              style={{ minHeight: 28, padding: '0 12px', borderRadius: 16 }}
            >
              {t('search', 'Search')}
            </button>
          </form>

          {/* Filter Bar */}
          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            onOpenSmartFilter={() => setIsSmartModalOpen(true)}
            isSmartActive={Boolean(smartFilterData)}
            smartCount={smartFilterData?.selectedServices?.length || 0}
          />

          {/* Smart Filter Results View (Packages + Custom Bundle) */}
          {smartFilterData && (
            <SmartFilterResults
              smartData={smartFilterData}
              onEditFilter={() => setIsSmartModalOpen(true)}
              onClearFilter={() => setSmartFilterData(null)}
            />
          )}

          {/* Content Loading / Error / Empty / Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)' }}>
              <RefreshCw size={32} className="spin-animation" style={{ margin: '0 auto 12px' }} />
              <p style={{ fontSize: 15 }}>Finding verified event services in {location}...</p>
            </div>
          ) : error ? (
            <div
              style={{
                padding: '40px 20px',
                textAlign: 'center',
                background: '#fef2f2',
                borderRadius: 16,
                border: '1px solid #fee2e2',
                color: '#dc2626',
              }}
            >
              <AlertCircle size={36} style={{ margin: '0 auto 8px' }} />
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 6px' }}>Unable to load services</h3>
              <p style={{ fontSize: 13, margin: '0 0 16px' }}>{error}</p>
              <button className="btn btn-primary" onClick={fetchData}>
                Try Again
              </button>
            </div>
          ) : viewType === 'services' ? (
            services.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '48px 24px',
                  background: '#fff',
                  borderRadius: 20,
                  border: '1px solid var(--border-light, #e2e8f0)',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                  maxWidth: 560,
                  margin: '20px auto',
                }}
              >
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#eff6ff', color: 'var(--primary)', display: 'grid', placeItems: 'center', margin: '0 auto 16px' }}>
                  <Search size={26} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 8px', color: '#1e293b' }}>
                  {language === 'ta' ? 'சேவைகள் எதுவும் கிடைக்கவில்லை' : `No ${activeCategory === 'All' ? '' : activeCategory} services found`}
                </h3>
                <p style={{ color: 'var(--muted)', fontSize: 14, margin: '0 0 22px', lineHeight: 1.5 }}>
                  {language === 'ta'
                    ? `${location}-ல் இந்த வடிகட்டிக்கு சேவைகள் இல்லை. வேறு பிரிவை தேர்வு செய்யவும் அல்லது வடிகட்டிகளை மீட்டமைக்கவும்.`
                    : `No verified services currently match your selection in ${location}. Try resetting your filters or exploring another category.`}
                </p>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      handleCategorySelect('All')
                      setSearchQuery('')
                      setActiveFilter('near')
                    }}
                  >
                    {language === 'ta' ? 'அனைத்து சேவைகளையும் பார்க்க' : 'View All Services'}
                  </button>
                  <a
                    href="https://wa.me/919360226758?text=Hi%2C%20I%20am%20looking%20for%20event%20services%20in%20Rajapalayam."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    style={{ borderColor: '#16a34a', color: '#16a34a', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                  >
                    <MessageCircle size={16} />
                    {language === 'ta' ? 'WhatsApp-ல் கேட்க' : 'Enquire on WhatsApp'}
                  </a>
                </div>
              </div>
            ) : (
              <div id="listingGrid" className="services-grid">
                {services.map((svc) => (
                  <ServiceCard
                    key={svc.id}
                    service={svc}
                  />
                ))}
              </div>
            )
          ) : providers.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '48px 24px',
                background: '#fff',
                borderRadius: 20,
                border: '1px solid var(--border-light, #e2e8f0)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                maxWidth: 560,
                margin: '20px auto',
              }}
            >
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#eff6ff', color: 'var(--primary)', display: 'grid', placeItems: 'center', margin: '0 auto 16px' }}>
                <Search size={26} />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 8px', color: '#1e293b' }}>
                {language === 'ta' ? 'வழங்குநர்கள் கிடைக்கவில்லை' : `No ${activeCategory === 'All' ? '' : activeCategory} providers found`}
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: 14, margin: '0 0 22px', lineHeight: 1.5 }}>
                {language === 'ta'
                  ? `இந்த பிரிவில் பதிவு செய்யப்பட்ட கலைஞர்கள்/வழங்குநர்கள் தற்போது இல்லை. பிற பிரிவுகளை ஆராய்க.`
                  : `No registered vendors found matching this criteria in ${location}. Try viewing all providers or explore related categories.`}
              </p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    handleCategorySelect('All')
                    setSearchQuery('')
                    setActiveFilter('near')
                  }}
                >
                  {language === 'ta' ? 'அனைத்து வழங்குநர்களையும் பார்க்க' : 'View All Providers'}
                </button>
                <a
                  href="https://wa.me/919360226758?text=Hi%2C%20I%20am%20looking%20for%20event%20vendors%20in%20Rajapalayam."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{ borderColor: '#16a34a', color: '#16a34a', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                >
                  <MessageCircle size={16} />
                  {language === 'ta' ? 'WhatsApp-ல் கேட்க' : 'Enquire on WhatsApp'}
                </a>
              </div>
            </div>
          ) : (
            <div className="vendor-grid">
              {providers.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Smart Filter Modal */}
      <SmartFilterModal
        isOpen={isSmartModalOpen}
        onClose={() => setIsSmartModalOpen(false)}
        initialServices={smartFilterData?.selectedServices}
        initialMinBudget={smartFilterData?.minBudget}
        initialMaxBudget={smartFilterData?.maxBudget}
        onApply={(data) => setSmartFilterData(data)}
        packages={allPackages}
        services={services}
      />
    </section>
  )
}
