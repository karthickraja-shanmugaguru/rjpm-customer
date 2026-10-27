import React, { useState, useEffect } from 'react'
import { Hero } from '../../components/home/Hero'
import { DiscoveryCards } from '../../components/home/DiscoveryCards'
import { PopularServices } from '../../components/home/PopularServices'
import { PopularPackages } from '../../components/home/PopularPackages'
import { PopularProviders } from '../../components/home/PopularProviders'
import { packageService } from '../../services/packageService'
import { providerService } from '../../services/providerService'
import { serviceService } from '../../services/serviceService'
import { categoryService } from '../../services/categoryService'
import { useLocation } from '../../context/LocationContext'
import { SmartFilterModal } from '../../components/smart/SmartFilterModal'
import { SmartFilterResults } from '../../components/smart/SmartFilterResults'
import { ProviderPromotionBanner } from '../../components/home/ProviderPromotionBanner'
import { CategoryCarousel } from '../../components/home/CategoryCarousel'
import { clientCache } from '../../utils/clientCache'
import { useSEO } from '../../utils/useSEO'

export const HomePage = () => {
  useSEO({
    title: 'RJPM — Event Services Marketplace in Rajapalayam',
    description: 'Find & book top verified event services in Rajapalayam (RJPM). Compare catering, mandapams, stage decorations, and celebration packages with transparent pricing.',
    keywords: 'Rajapalayam, RJPM, event services Rajapalayam, wedding catering Rajapalayam, mandapam booking Rajapalayam, stage decoration Rajapalayam',
    canonical: 'https://rjpm.in/',
  })

  const cachedPkgs = clientCache.get('home_packages')
  const cachedProvs = clientCache.get('home_providers')
  const cachedCats = clientCache.get('home_categories')
  const cachedSvcs = clientCache.get('home_services')

  const [packages, setPackages] = useState(cachedPkgs || [])
  const [providers, setProviders] = useState(cachedProvs || [])
  const [services, setServices] = useState(cachedSvcs || [])
  const [categories, setCategories] = useState(cachedCats || [])
  const [loading, setLoading] = useState(!cachedProvs && !cachedPkgs)

  // Smart Filter State for Home Page
  const [isSmartModalOpen, setIsSmartModalOpen] = useState(false)
  const [smartFilterData, setSmartFilterData] = useState(null)

  useEffect(() => {
    let isMounted = true

    const loadHomeData = async () => {
      // Only show full loading skeleton if no cached data exists
      if (!clientCache.has('home_providers') && !clientCache.has('home_packages')) {
        setLoading(true)
      }

      try {
        const [pkgRes, provRes, catRes, svcRes] = await Promise.allSettled([
          packageService.getPackages(),
          providerService.getProviders(),
          categoryService.getCategories(),
          serviceService.getServices(),
        ])

        if (!isMounted) return

        if (pkgRes.status === 'fulfilled' && pkgRes.value?.data) {
          setPackages(pkgRes.value.data)
          clientCache.set('home_packages', pkgRes.value.data)
        } else if (!cachedPkgs) {
          setPackages([])
        }

        if (provRes.status === 'fulfilled' && provRes.value?.data) {
          setProviders(provRes.value.data)
          clientCache.set('home_providers', provRes.value.data)
        } else if (!cachedProvs) {
          setProviders([])
        }

        if (catRes.status === 'fulfilled' && catRes.value?.data?.length) {
          setCategories(catRes.value.data)
          clientCache.set('home_categories', catRes.value.data)
        }

        if (svcRes.status === 'fulfilled' && svcRes.value?.data?.length) {
          setServices(svcRes.value.data)
          clientCache.set('home_services', svcRes.value.data)
        }
      } catch {
        // Keep cached data on network error
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadHomeData()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section id="home" className="screen active">
      <Hero onOpenSmartFilter={() => setIsSmartModalOpen(true)} />

      {/* Smart Filter Results when applied on Home Page */}
      {smartFilterData && (
        <div style={{ marginTop: 28, marginBottom: 20 }}>
          <SmartFilterResults
            smartData={smartFilterData}
            onEditFilter={() => setIsSmartModalOpen(true)}
            onClearFilter={() => setSmartFilterData(null)}
          />
        </div>
      )}

      <DiscoveryCards />
      <PopularServices categories={categories} />
      <CategoryCarousel />
      <PopularPackages packages={packages} loading={loading} />
      <PopularProviders providers={providers} loading={loading} />

      {/* Partner / Provider Motivation Banner at the end of the page */}
      <ProviderPromotionBanner />

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
