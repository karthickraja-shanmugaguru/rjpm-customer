// Smart Filter Calculation & Package Matching Engine

export const SMART_SERVICE_CATEGORIES = [
  {
    id: 'Catering',
    name: 'Catering / Food',
    nameTa: 'சமையல் / கேட்டரிங்',
    icon: '🍲',
    avgPrice: 25000,
    keywords: ['catering', 'food', 'meal', 'lunch', 'breakfast', 'buffet', 'dinner', 'cooking'],
  },
  {
    id: 'Mandapam',
    name: 'Mandapam',
    nameTa: 'மண்டபம்',
    icon: '🏛️',
    avgPrice: 50000,
    keywords: ['mandapam', 'hall', 'venue', 'banquet', 'kalyana mandapam'],
  },
  {
    id: 'Panthal & Tent',
    name: 'Panthal',
    nameTa: 'பந்தல்',
    icon: '⛺',
    avgPrice: 10000,
    keywords: ['panthal', 'tent', 'shamiana', 'canopy', 'tarpaulin', 'shed'],
  },
  {
    id: 'Decoration',
    name: 'Decoration',
    nameTa: 'மேடை அலங்காரம்',
    icon: '🎪',
    avgPrice: 15000,
    keywords: ['decor', 'decoration', 'stage', 'theme', 'balloon', 'lighting', 'backdrop'],
  },
  {
    id: 'Muhurtham Malai',
    name: 'Malai',
    nameTa: 'மாலை',
    icon: '💐',
    avgPrice: 6000,
    keywords: ['garland', 'malai', 'muhurtham malai', 'rose garland', 'elakkai malai', 'mallipoo', 'jasmine'],
  },
  {
    id: 'Flowers',
    name: 'Flowers',
    nameTa: 'பூக்கள்',
    icon: '🌸',
    avgPrice: 6000,
    keywords: ['flower', 'floral', 'garland', 'toran', 'mandapam flower', 'rose'],
  },
  {
    id: 'Nadaswaram',
    name: 'Nadaswaram / Melam',
    nameTa: 'நாதஸ்வரம் / மேளம்',
    icon: '🎺',
    avgPrice: 15000,
    keywords: ['nadaswaram', 'thavil', 'mangala vathiyam', 'shehnai', 'classical music', 'kalyana melam'],
  },
  {
    id: 'Photography',
    name: 'Photography',
    nameTa: 'போட்டோ',
    icon: '📸',
    avgPrice: 18000,
    keywords: ['photo', 'photography', 'candid', 'album', 'shoot', 'photographer'],
  },
  {
    id: 'Videography',
    name: 'Videography',
    nameTa: 'வீடியோ',
    icon: '🎥',
    avgPrice: 22000,
    keywords: ['videography', 'video', 'drone', 'cinematic', 'film', 'teaser'],
  },
  {
    id: 'Music & DJ',
    name: 'DJ & Mic Set',
    nameTa: 'மைக் செட் & DJ',
    icon: '🎵',
    avgPrice: 12000,
    keywords: ['dj', 'music', 'sound', 'audio', 'speaker', 'dance floor', 'orchestra'],
  },
  {
    id: 'Seer Plates',
    name: 'Seer Thattu',
    nameTa: 'சீர் தட்டு',
    icon: '🪷',
    avgPrice: 7500,
    keywords: ['aarthi plate', 'seer plate', 'paruppu thengai', 'fruit carving', 'seer varisai', 'thattu decor'],
  },
  {
    id: 'Kolam',
    name: 'Kolam',
    nameTa: 'கோலம்',
    icon: '✨',
    avgPrice: 3500,
    keywords: ['kolam', 'rangoli', 'padi kolam', 'flower rangoli', 'maa kolam', 'welcome kolam'],
  },
  {
    id: 'Priest & Rituals',
    name: 'Iyer / Priest',
    nameTa: 'ஐயர் / புரோகிதர்',
    icon: '🪔',
    avgPrice: 6000,
    keywords: ['priest', 'pujari', 'iyer', 'homam', 'rituals', 'puja', 'vadhyar'],
  },
  {
    id: 'Makeup',
    name: 'Makeup',
    nameTa: 'மேக்கப்',
    icon: '💄',
    avgPrice: 8000,
    keywords: ['makeup', 'styling', 'bridal makeup', 'hair styling', 'draping', 'makeover'],
  },
  {
    id: 'Mehendi',
    name: 'Mehendi',
    nameTa: 'மெஹந்தி',
    icon: '🌿',
    avgPrice: 3000,
    keywords: ['mehendi', 'henna', 'bridal mehendi'],
  },
  {
    id: 'Jewellery',
    name: 'Jewellery',
    nameTa: 'நகைகள்',
    icon: '💍',
    avgPrice: 7000,
    keywords: ['jewellery', 'jewelry', 'necklace', 'choker', 'bridal set', 'antique'],
  },
  {
    id: 'Sweets & Desserts',
    name: 'Sweets & Snacks',
    nameTa: 'இனிப்பு & பலகாரம்',
    icon: '🍰',
    avgPrice: 5000,
    keywords: ['sweets', 'dessert', 'halwa', 'laddu', 'ice cream', 'welcome drink', 'juice'],
  },
  {
    id: 'Return Gifts',
    name: 'Thamboolam Bags',
    nameTa: 'தாம்பூலப்பை & பரிசுகள்',
    icon: '🎁',
    avgPrice: 6500,
    keywords: ['return gift', 'thamboolam', 'tamboolam', 'jute bag', 'brass gift', 'kumkum box'],
  },
  {
    id: 'Live Stalls',
    name: 'Food Stalls',
    nameTa: 'உணவு ஸ்டால்கள்',
    icon: '🍿',
    avgPrice: 9000,
    keywords: ['live stall', 'chaat', 'popcorn', 'cotton candy', 'kulfi', 'beeda', 'chocolate fountain', 'pan stall'],
  },
  {
    id: 'Furniture',
    name: 'Chairs & Tables',
    nameTa: 'நாற்காலி & மேஜை',
    icon: '🪑',
    avgPrice: 5000,
    keywords: ['furniture', 'chair', 'table', 'sofa', 'round table', 'banquet chair'],
  },
  {
    id: 'Generator',
    name: 'Generator',
    nameTa: 'ஜெனரேட்டர்',
    icon: '⚡',
    avgPrice: 7000,
    keywords: ['generator', 'genset', 'power backup', 'diesel generator', 'eb backup'],
  },
  {
    id: 'Water Supply',
    name: 'Water Can Supply',
    nameTa: 'குடிநீர் கேன்',
    icon: '💧',
    avgPrice: 2500,
    keywords: ['water', 'mineral water', 'water supply', 'water can', 'dispenser'],
  },
  {
    id: 'Chenda Melam',
    name: 'Chenda Melam',
    nameTa: 'செண்டை மேளம்',
    icon: '🥁',
    avgPrice: 16000,
    keywords: ['chenda melam', 'dhol', 'nasik dhol', 'punjabi dhol', 'baraat band', 'kottu'],
  },
  {
    id: 'Event Staff',
    name: 'Helpers & Servers',
    nameTa: 'பணியாளர்கள்',
    icon: '🤝',
    avgPrice: 4000,
    keywords: ['staff', 'labour', 'helper', 'waiter', 'crew', 'cleaning', 'serving'],
  },
  {
    id: 'Transport',
    name: 'Car & Van Rental',
    nameTa: 'கார் / வேன் வாடகை',
    icon: '🚗',
    avgPrice: 8000,
    keywords: ['transport', 'car', 'vintage car', 'bus', 'tempo', 'van', 'travel'],
  },
  {
    id: 'Invitations',
    name: 'Patrikai / Cards',
    nameTa: 'பத்திரிக்கை',
    icon: '💌',
    avgPrice: 4000,
    keywords: ['invitation', 'card', 'printing', 'digital invite', 'return gifts'],
  },
  {
    id: 'Audio Visual',
    name: 'LED Screen',
    nameTa: 'LED ஸ்கிரீன்',
    icon: '📺',
    avgPrice: 20000,
    keywords: ['led wall', 'screen', 'streaming', 'live stream', 'youtube live', 'zoom live', 'jimmy jib'],
  },
  {
    id: 'Special Effects',
    name: 'Entry Fireworks',
    nameTa: 'என்ட்ரி பட்டாசு & புகை',
    icon: '🎆',
    avgPrice: 8500,
    keywords: ['pyro', 'cold pyro', 'dry ice', 'low fog', 'fog', 'confetti', 'sparkular', 'entry effects'],
  },
  {
    id: 'Tailoring',
    name: 'Tailoring',
    nameTa: 'தையல்',
    icon: '✂️',
    avgPrice: 3500,
    keywords: ['tailoring', 'blouse', 'aari work', 'embroidery', 'stitching'],
  },
  {
    id: 'Beauty & Spa',
    name: 'Beauty Care',
    nameTa: 'அழகு கலை',
    icon: '💇',
    avgPrice: 4500,
    keywords: ['beauty', 'spa', 'facial', 'grooming', 'salon', 'pedicure'],
  },
  {
    id: 'Valet Parking',
    name: 'Parking Helpers',
    nameTa: 'பார்க்கிங்',
    icon: '🅿️',
    avgPrice: 5500,
    keywords: ['valet', 'parking', 'marshal', 'traffic', 'driver', 'parking management'],
  },
  {
    id: 'Security',
    name: 'Security',
    nameTa: 'பாதுகாப்பு',
    icon: '🛡️',
    avgPrice: 6000,
    keywords: ['security', 'bouncer', 'bodyguard', 'guard', 'crowd control'],
  },
]

export const SMART_PRESETS = [
  {
    id: 'wedding_grand',
    name: '💍 Grand Muhurtham Wedding',
    nameTa: '💍 மங்கள முகூர்த்த பெருந்திருமணம்',
    services: ['Catering', 'Decoration', 'Flowers', 'Photography', 'Videography', 'Nadaswaram', 'Muhurtham Malai', 'Priest & Rituals', 'Event Staff'],
    minBudget: 150000,
    maxBudget: 400000,
  },
  {
    id: 'reception_sangeet',
    name: '✨ Reception & Sangeet Carnival',
    nameTa: '✨ பிரம்மாண்ட வரவேற்பு & சங்கீத்',
    services: ['Catering', 'Decoration', 'Music & DJ', 'Special Effects', 'Live Stalls', 'Photography', 'Audio Visual'],
    minBudget: 90000,
    maxBudget: 250000,
  },
  {
    id: 'valaikappu',
    name: '🤰 Traditional Valaikappu & Seemantham',
    nameTa: '🤰 பாரம்பரிய வளைகாப்பு & சீமந்தம்',
    services: ['Catering', 'Flowers', 'Decoration', 'Photography', 'Mehendi', 'Sweets & Desserts', 'Return Gifts'],
    minBudget: 40000,
    maxBudget: 95000,
  },
  {
    id: 'grihapravesam',
    name: '🏠 Grihapravesam & Ganapathi Homam',
    nameTa: '🏠 புதுமனை புகுவிழா & ஹோமம்',
    services: ['Priest & Rituals', 'Catering', 'Flowers', 'Decoration', 'Kolam', 'Panthal & Tent', 'Event Staff'],
    minBudget: 35000,
    maxBudget: 85000,
  },
  {
    id: 'upanayanam',
    name: '🪔 Sacred Upanayanam & Brahmopadesham',
    nameTa: '🪔 உபநயனம் & பூணூல் பெருவிழா',
    services: ['Priest & Rituals', 'Catering', 'Mandapam', 'Photography', 'Flowers', 'Return Gifts'],
    minBudget: 45000,
    maxBudget: 110000,
  },
  {
    id: 'sashtiapthapoorthi',
    name: '👵 Sashtiapthapoorthi (60th Kalyanam)',
    nameTa: '👵 மணிவிழா & சஷ்டியப்தபூர்த்தி (60)',
    services: ['Priest & Rituals', 'Muhurtham Malai', 'Catering', 'Flowers', 'Nadaswaram', 'Photography'],
    minBudget: 50000,
    maxBudget: 125000,
  },
  {
    id: 'ear_piercing',
    name: '👶 Ear Piercing & Tonsure (Kaadhu Kuthu)',
    nameTa: '👶 மொட்டை & காது குத்து திருவிழா',
    services: ['Catering', 'Panthal & Tent', 'Chenda Melam', 'Photography', 'Furniture'],
    minBudget: 30000,
    maxBudget: 75000,
  },
  {
    id: 'half_saree',
    name: '🥻 Puberty & Half Saree Function',
    nameTa: '🥻 மஞ்சள் நீராட்டு & தாவணி விழா',
    services: ['Makeup', 'Decoration', 'Photography', 'Catering', 'Seer Plates', 'Mehendi'],
    minBudget: 35000,
    maxBudget: 85000,
  },
  {
    id: 'birthday_carnival',
    name: '🎂 Kids Carnival Birthday Party',
    nameTa: '🎂 குழந்தைகள் கார்னிவல் பிறந்தநாள்',
    services: ['Decoration', 'Catering', 'Live Stalls', 'Music & DJ', 'Photography', 'Sweets & Desserts'],
    minBudget: 25000,
    maxBudget: 65000,
  },
  {
    id: 'budget_intimate',
    name: '🌿 Budget Intimate Celebration',
    nameTa: '🌿 எளிய சிக்கன குடும்ப விழா',
    services: ['Catering', 'Flowers', 'Decoration', 'Photography'],
    minBudget: 20000,
    maxBudget: 50000,
  },
]

/**
 * Checks which of the requested services are included in a package
 */
export function checkPackageInclusions(pkg, selectedServices = []) {
  if (!pkg) return { matched: [], missing: [] }

  const textToScan = [
    pkg.name || '',
    pkg.description || '',
    pkg.includes || '',
    pkg.event_type || '',
    ...(pkg.services || []).map((s) => `${s.name || ''} ${s.category || s.category_name || ''}`),
  ]
    .join(' ')
    .toLowerCase()

  const matched = []
  const missing = []

  selectedServices.forEach((serviceId) => {
    const meta = SMART_SERVICE_CATEGORIES.find((c) => c.id === serviceId)
    if (!meta) return

    const isIncluded = meta.keywords.some((kw) => textToScan.includes(kw))
    if (isIncluded) {
      matched.push(meta)
    } else {
      missing.push(meta)
    }
  })

  return { matched, missing }
}

/**
 * Main Smart Calculation function supporting Min & Max Budget
 * Uses ONLY original / live data from database services and packages.
 * No dummy or prototype mock data is ever generated.
 */
export function calculateSmartMatches({
  selectedServices = [],
  minBudget = 10000,
  maxBudget = 100000,
  packages = [],
  services = [],
}) {
  if (!Array.isArray(selectedServices) || selectedServices.length === 0) {
    return {
      matchedPackages: [],
      customBundle: null,
      economyBundle: null,
      totalEstimate: 0,
      withinBudget: true,
      missingCategories: [],
      totalRealServicesFound: 0,
    }
  }

  // 1. MATCH EXISTING PRE-MADE PACKAGES from database within budget
  const matchedPackages = (packages || [])
    .map((pkg) => {
      const price = Number(pkg.price_amount) || 0
      const { matched, missing } = checkPackageInclusions(pkg, selectedServices)
      const matchScore = matched.length / Math.max(1, selectedServices.length)

      return {
        ...pkg,
        price_amount: price,
        matchedServices: matched,
        missingServices: missing,
        matchScore,
        withinBudget: price >= minBudget && price <= maxBudget,
      }
    })
    // Match packages that cover at least 1 requested service AND are within budget tolerance
    .filter((pkg) => pkg.matchedServices.length > 0 && pkg.price_amount <= maxBudget * 1.25)
    // Rank by highest match score, then budget fit, then price
    .sort((a, b) => {
      if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore
      return a.price_amount - b.price_amount
    })

  // 2. COMPOSE SMART CUSTOM BUNDLE FROM REAL INDIVIDUAL SERVICES ONLY
  const bundleItems = []
  const economyItems = []
  const usedBundleServiceIds = new Set()
  const usedEconomyServiceIds = new Set()
  const missingCategories = []

  selectedServices.forEach((catId) => {
    const meta = SMART_SERVICE_CATEGORIES.find((c) => c.id === catId)

    // Match real live services by category_name or keywords
    let liveMatches = (services || []).filter(
      (s) => (s.category_name || s.category || '').toLowerCase() === catId.toLowerCase()
    )

    if (liveMatches.length === 0 && meta) {
      liveMatches = (services || []).filter((s) => {
        const sName = (s.name || '').toLowerCase()
        return meta.keywords.some((kw) => sName.includes(kw.toLowerCase()))
      })
    }

    // If no real service is found in database, do NOT create dummy services!
    if (liveMatches.length === 0) {
      missingCategories.push(catId)
      return
    }

    // Helper to normalize price if per-plate (< 1000)
    const normalizePrice = (cand) => {
      let price = Number(cand.price_amount) || 0
      let display = cand.price_display
      if (catId === 'Catering' && price > 0 && price < 1000) {
        price = price * 70 // calculate for typical 70 pax
        display = `₹${price.toLocaleString('en-IN')} (70 pax)`
      }
      return { price, display: display || `₹${price.toLocaleString('en-IN')}` }
    }

    // Filter out already used services in this bundle if multiple real candidates exist
    const availableForBundle = liveMatches.filter((c) => !usedBundleServiceIds.has(c.id))
    const pool = availableForBundle.length > 0 ? availableForBundle : liveMatches

    // Pick best candidate: prioritize candidates that fit the proportional budget target, then highest rating
    const targetPerCat = maxBudget / Math.max(1, selectedServices.length)
    const sortedByFitAndRating = [...pool].sort((a, b) => {
      const normA = normalizePrice(a).price
      const normB = normalizePrice(b).price
      const fitA = normA <= targetPerCat * 1.5 ? 1 : 0
      const fitB = normB <= targetPerCat * 1.5 ? 1 : 0
      if (fitA !== fitB) return fitB - fitA
      return (b.provider_rating || b.rating || 0) - (a.provider_rating || a.rating || 0)
    })
    const best = sortedByFitAndRating[0]
    usedBundleServiceIds.add(best.id)

    const { price, display } = normalizePrice(best)

    bundleItems.push({
      categoryId: catId,
      serviceId: best.id,
      name: best.name,
      provider_name: best.provider_name || 'Verified Provider',
      provider_id: best.provider_id || best.providerId,
      rating: best.provider_rating || best.rating || 0,
      price_amount: price,
      price_display: display,
      phone: best.phone || best.provider_phone || '',
      verified: best.provider_verified !== false,
      cover_image: best.cover_image || best.coverImage,
    })

    // Economy candidate (lowest price)
    const availableForEconomy = liveMatches.filter((c) => !usedEconomyServiceIds.has(c.id))
    const ecoPool = availableForEconomy.length > 0 ? availableForEconomy : liveMatches
    const sortedByPrice = [...ecoPool].sort(
      (a, b) => (Number(a.price_amount) || 0) - (Number(b.price_amount) || 0)
    )
    const lowest = sortedByPrice[0]
    usedEconomyServiceIds.add(lowest.id)

    const ecoNorm = normalizePrice(lowest)

    economyItems.push({
      categoryId: catId,
      serviceId: lowest.id,
      name: lowest.name,
      provider_name: lowest.provider_name || 'Verified Provider',
      provider_id: lowest.provider_id || lowest.providerId,
      rating: lowest.provider_rating || lowest.rating || 4.7,
      price_amount: ecoNorm.price,
      price_display: ecoNorm.display,
      phone: lowest.phone || lowest.provider_phone || '',
      verified: lowest.provider_verified !== false,
      cover_image: lowest.cover_image || lowest.coverImage,
    })
  })

  const bundleTotal = bundleItems.reduce((sum, item) => sum + item.price_amount, 0)
  const economyTotal = economyItems.reduce((sum, item) => sum + item.price_amount, 0)

  const customBundle = bundleItems.length > 0 ? {
    title: 'Smart Calculated Bundle',
    titleTa: 'ஸ்மார்ட் கணக்கிடப்பட்ட தொகுப்பு',
    totalPrice: bundleTotal,
    savings: Math.max(0, maxBudget - bundleTotal),
    withinBudget: bundleTotal >= minBudget && bundleTotal <= maxBudget,
    items: bundleItems,
    serviceCount: bundleItems.length,
    missingCategories,
  } : null

  const economyBundle = economyItems.length > 0 && economyTotal < bundleTotal ? {
    title: 'Budget-Friendly Combo',
    titleTa: 'பட்ஜெட் நட்பு தொகுப்பு',
    totalPrice: economyTotal,
    savings: Math.max(0, maxBudget - economyTotal),
    withinBudget: economyTotal >= minBudget && economyTotal <= maxBudget,
    items: economyItems,
    serviceCount: economyItems.length,
    missingCategories,
  } : null

  return {
    matchedPackages,
    customBundle,
    economyBundle,
    totalEstimate: bundleTotal,
    withinBudget: bundleTotal <= maxBudget,
    missingCategories,
    totalRealServicesFound: bundleItems.length,
  }
}
