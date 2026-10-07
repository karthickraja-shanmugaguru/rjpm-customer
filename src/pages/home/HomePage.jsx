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

export const HomePage = () => {
  const [packages, setPackages] = useState([])
  const [providers, setProviders] = useState([])
  const [services, setServices] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  // Smart Filter State for Home Page
  const [isSmartModalOpen, setIsSmartModalOpen] = useState(false)
  const [smartFilterData, setSmartFilterData] = useState(null)

  useEffect(() => {
    let isMounted = true

    const loadHomeData = async () => {
      setLoading(true)
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
        } else {
          setPackages([])
        }

        if (provRes.status === 'fulfilled' && provRes.value?.data) {
          setProviders(provRes.value.data)
        } else {
          setProviders([])
        }

        if (catRes.status === 'fulfilled' && catRes.value?.data?.length) {
          setCategories(catRes.value.data)
        }

        if (svcRes.status === 'fulfilled' && svcRes.value?.data?.length) {
          setServices(svcRes.value.data)
        }
      } catch {
        if (isMounted) {
          setPackages([])
          setProviders([])
        }
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
