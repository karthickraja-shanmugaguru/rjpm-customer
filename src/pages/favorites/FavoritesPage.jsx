import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFavorites } from '../../context/FavoritesContext'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import { VendorCard } from '../../components/common/VendorCard'
import { PackageCard } from '../../components/common/PackageCard'
import { ServiceCard } from '../../components/common/ServiceCard'
import { providerService } from '../../services/providerService'
import { packageService } from '../../services/packageService'
import { serviceService } from '../../services/serviceService'
import { Heart, RefreshCw, Package as PackageIcon, Store, Sparkles } from 'lucide-react'

export const FavoritesPage = () => {
  const { favoriteIds, favoritePackageIds, favoriteServiceIds, refreshFavorites } = useFavorites()
  const { isAuthenticated } = useAuth()
  const { t, language } = useLanguage()
  const navigate = useNavigate()

  const [providers, setProviders] = useState([])
  const [packages, setPackages] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/favorites' } }, replace: true })
      return
    }
    refreshFavorites()
  }, [isAuthenticated, navigate])

  useEffect(() => {
    let isMounted = true

    const loadFavorites = async () => {
      const hasProv = favoriteIds && favoriteIds.length > 0
      const hasPkg = favoritePackageIds && favoritePackageIds.length > 0
      const hasSvc = favoriteServiceIds && favoriteServiceIds.length > 0

      if (!hasProv && !hasPkg && !hasSvc) {
        setProviders([])
        setPackages([])
        setServices([])
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        const [provRes, pkgRes, svcRes] = await Promise.allSettled([
          hasProv ? providerService.getProviders() : Promise.resolve({ data: [] }),
          hasPkg ? packageService.getPackages() : Promise.resolve({ data: [] }),
          hasSvc ? serviceService.getServices() : Promise.resolve({ data: [] }),
        ])

        if (!isMounted) return

        if (provRes.status === 'fulfilled' && provRes.value?.data) {
          const matched = provRes.value.data.filter((p) => favoriteIds.includes(Number(p.id)))
          setProviders(matched)
        } else {
          setProviders([])
        }

        if (pkgRes.status === 'fulfilled' && pkgRes.value?.data) {
          const matched = pkgRes.value.data.filter((p) => favoritePackageIds.includes(Number(p.id)))
          setPackages(matched)
        } else {
          setPackages([])
        }

        if (svcRes.status === 'fulfilled' && svcRes.value?.data) {
          const matched = svcRes.value.data.filter((s) => favoriteServiceIds.includes(Number(s.id)))
          setServices(matched)
        } else {
          setServices([])
        }
      } catch {
        if (isMounted) {
          setProviders([])
          setPackages([])
          setServices([])
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadFavorites()
    return () => {
      isMounted = false
    }
  }, [favoriteIds, favoritePackageIds, favoriteServiceIds])

  const totalCount = providers.length + packages.length + services.length

  return (
    <section id="favorites" className="screen active" style={{ display: 'block' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 className="page-title" style={{ margin: 0 }}>
          {t('favoritesTitle', 'Saved Vendors & Services')}
        </h1>
        <p className="page-description" style={{ marginTop: 6, color: 'var(--muted)' }}>
          {t('favoritesSubtitle', 'Providers and celebration packages you have shortlisted for your special event.')}
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)' }}>
          <RefreshCw size={32} className="spin-animation" style={{ margin: '0 auto 12px' }} />
          <p>Loading your saved shortlist...</p>
        </div>
      ) : totalCount === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: '#fff',
            borderRadius: 16,
            border: '1px solid var(--border-light, #e2e8f0)',
          }}
        >
          <Heart size={44} color="#fca5a5" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px' }}>
            {t('emptyFavoritesTitle', 'Your shortlist is empty')}
          </h3>
          <p style={{ color: 'var(--muted)', fontSize: 14, margin: '0 0 20px' }}>
            {t('emptyFavoritesSubtitle', 'Tap the heart icon on any vendor, service, or package to save it here for easy comparison.')}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/explore?category=All" className="btn btn-primary" style={{ textDecoration: 'none' }}>
              {language === 'ta' ? 'சேவைகளை ஆராய்க' : 'Explore Services'}
            </Link>
            <Link to="/packages" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
              {language === 'ta' ? 'தொகுப்புகளை ஆராய்க' : 'Explore Packages'}
            </Link>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
          {/* Saved Services Section */}
          {services.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <Sparkles size={20} color="var(--primary)" />
                <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>
                  {language === 'ta' ? 'சேமிக்கப்பட்ட சேவைகள்' : 'Saved Services'} ({services.length})
                </h2>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: 18,
                }}
              >
                {services.map((svc) => (
                  <ServiceCard key={svc.id} service={svc} />
                ))}
              </div>
            </div>
          )}

          {/* Saved Packages Section */}
          {packages.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <PackageIcon size={20} color="var(--primary)" />
                <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>
                  {language === 'ta' ? 'சேமிக்கப்பட்ட தொகுப்புகள்' : 'Saved Packages'} ({packages.length})
                </h2>
              </div>
              <div className="package-grid">
                {packages.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            </div>
          )}

          {/* Saved Vendors Section */}
          {providers.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <Store size={20} color="var(--primary)" />
                <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>
                  {language === 'ta' ? 'சேமிக்கப்பட்ட நிறுவனங்கள்' : 'Saved Companies & Vendors'} ({providers.length})
                </h2>
              </div>
              <div id="favoritesGrid" className="vendor-grid">
                {providers.map((vendor) => (
                  <VendorCard key={vendor.id} vendor={vendor} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
