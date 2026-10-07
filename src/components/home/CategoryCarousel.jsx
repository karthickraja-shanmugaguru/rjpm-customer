import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { CATEGORY_META } from '../../constants/categoryMeta'
import { useLanguage } from '../../context/LanguageContext'

// Instamart-style full service category showcase
const CAROUSEL_CATEGORIES = [
  { id: 'Catering', name: 'Catering / Food', nameTa: 'சமையல் & கேட்டரிங்' },
  { id: 'Mandapam', name: 'Mandapam & Halls', nameTa: 'மண்டபம்' },
  { id: 'Panthal & Tent', name: 'Panthal & Shamiana', nameTa: 'பந்தல்' },
  { id: 'Decoration', name: 'Stage Decoration', nameTa: 'மேடை அலங்காரம்' },
  { id: 'Muhurtham Malai', name: 'Malai & Garlands', nameTa: 'மாலை' },
  { id: 'Flowers', name: 'Fresh Flowers', nameTa: 'பூக்கள்' },
  { id: 'Nadaswaram', name: 'Nadaswaram & Melam', nameTa: 'நாதஸ்வரம் & மேளம்' },
  { id: 'Chenda Melam', name: 'Chenda Melam', nameTa: 'செண்டை மேளம்' },
  { id: 'Photography', name: 'Photography', nameTa: 'போட்டோ' },
  { id: 'Videography', name: 'Videography', nameTa: 'வீடியோ' },
  { id: 'Music & DJ', name: 'DJ & Mic Set', nameTa: 'மைக் செட் & DJ' },
  { id: 'Seer Plates', name: 'Seer Thattu', nameTa: 'சீர் தட்டு' },
  { id: 'Kolam', name: 'Kolam Artists', nameTa: 'கோலம்' },
  { id: 'Priest & Rituals', name: 'Iyer / Priest', nameTa: 'ஐயர் / புரோகிதர்' },
  { id: 'Makeup', name: 'Bridal Makeup', nameTa: 'மேக்கப்' },
  { id: 'Mehendi', name: 'Mehendi Design', nameTa: 'மெஹந்தி' },
  { id: 'Jewellery', name: 'Bridal Jewellery', nameTa: 'நகைகள்' },
  { id: 'Sweets & Desserts', name: 'Sweets & Snacks', nameTa: 'இனிப்பு & பலகாரம்' },
  { id: 'Return Gifts', name: 'Thamboolam Bags', nameTa: 'தாம்பூலப்பை' },
  { id: 'Live Stalls', name: 'Live Food Stalls', nameTa: 'உணவு ஸ்டால்கள்' },
  { id: 'Furniture', name: 'Chairs & Tables', nameTa: 'நாற்காலி & மேஜை' },
  { id: 'Generator', name: 'Generator Backup', nameTa: 'ஜெனரேட்டர்' },
  { id: 'Water Supply', name: 'Water Can Supply', nameTa: 'குடிநீர் கேன்' },
  { id: 'Event Staff', name: 'Helpers & Servers', nameTa: 'பணியாளர்கள்' },
  { id: 'Transport', name: 'Car & Van Rental', nameTa: 'கார் / வேன் வாடகை' },
  { id: 'Invitations', name: 'Patrikai / Cards', nameTa: 'பத்திரிக்கை' },
  { id: 'Audio Visual', name: 'LED Screen', nameTa: 'LED ஸ்கிரீன்' },
  { id: 'Special Effects', name: 'Entry Fireworks', nameTa: 'என்ட்ரி பட்டாசு' },
]

export const CategoryCarousel = () => {
  const { language } = useLanguage()
  const scrollContainerRef = useRef(null)

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div className="section category-showcase-section">
      <div className="section-header" style={{ marginBottom: 18 }}>
        <div>
          <h2 className="section-title">
            {language === 'ta' ? 'அனைத்து நிகழ்வு சேவைகளும்' : 'Explore by Event Categories'}
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 4 }}>
            {language === 'ta'
              ? 'ராஜபாளையத்தில் உள்ள அனைத்து நிகழ்வு சேவைகளையும் நேரில் பாருங்கள்'
              : 'Browse verified specialists, decor, food, music & rentals in Rajapalayam'}
          </p>
        </div>

        {/* Carousel Arrow Navigation */}
        <div className="carousel-nav-controls" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            type="button"
            className="instamart-nav-btn"
            onClick={() => handleScroll('left')}
            aria-label="Previous categories"
            title="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            className="instamart-nav-btn"
            onClick={() => handleScroll('right')}
            aria-label="Next categories"
            title="Next"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Instamart-Style Category Scroll Track */}
      <div
        ref={scrollContainerRef}
        className="instamart-category-track"
      >
        {CAROUSEL_CATEGORIES.map((cat) => {
          const meta = CATEGORY_META[cat.id] || CATEGORY_META['Catering']
          const displayName = language === 'ta' ? cat.nameTa : cat.name

          return (
            <Link
              key={cat.id}
              to={`/explore?category=${encodeURIComponent(cat.id)}`}
              className="instamart-category-card"
            >
              <div
                className="instamart-card-surface"
                style={{
                  background: meta.bg || 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                }}
              >
                <div className="instamart-card-icon">
                  {meta.svg(52)}
                </div>
              </div>
              <div className="instamart-card-label" title={displayName}>
                {displayName}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default CategoryCarousel
