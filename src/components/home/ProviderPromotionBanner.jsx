import React from 'react'
import { useLanguage } from '../../context/LanguageContext'
import {
  Sparkles,
  TrendingUp,
  PhoneCall,
  ShieldCheck,
  PackagePlus,
  ArrowRight,
  LogIn,
  Store,
  CheckCircle2,
} from 'lucide-react'

export const ProviderPromotionBanner = () => {
  const { language } = useLanguage()

  // Support environment variable or default to local provider portal
  const providerBaseUrl = import.meta.env.VITE_PROVIDER_URL || 'http://localhost:3001'
  const signupUrl = `${providerBaseUrl}/signup`
  const loginUrl = `${providerBaseUrl}/login`

  return (
    <section
      className="provider-promo-banner"
      style={{
        marginTop: 50,
        marginBottom: 40,
        borderRadius: 24,
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #2563eb 100%)',
        color: '#ffffff',
        padding: 'clamp(28px, 5vw, 48px)',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 40px -15px rgba(37, 99, 235, 0.35)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
      }}
    >
      {/* Background Decorative Circles & Glows */}
      <div
        style={{
          position: 'absolute',
          top: -80,
          right: -80,
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.22) 0%, rgba(37, 99, 235, 0) 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -60,
          left: '20%',
          width: 260,
          height: 260,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, rgba(15, 23, 42, 0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 36,
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Left Column: Motivational Copy & CTA */}
        <div>
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#fde047',
              padding: '6px 14px',
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: '0.04em',
              marginBottom: 16,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            }}
          >
            <Sparkles size={14} color="#fde047" />
            <span>
              {language === 'ta'
                ? '💼 RJPM பார்ட்னர் தளம் • உங்கள் சேவையை சேர்க்க'
                : '💼 RJPM PARTNER NETWORK • LIST YOUR SERVICE'}
            </span>
          </div>

          {/* Heading */}
          <h2
            style={{
              fontSize: 'clamp(24px, 4vw, 36px)',
              fontWeight: 800,
              lineHeight: 1.18,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              margin: '0 0 14px',
            }}
          >
            {language === 'ta' ? (
              <>
                RJPM-ல் விழா சேவை வழங்குகிறீர்களா? <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #fde047 0%, #f59e0b 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  உங்கள் சேவையை சேர்த்து வாடிக்கையாளர்களைப் பெறுங்கள்!
                </span>
              </>
            ) : (
              <>
                Are You an Event Service Provider in RJPM? <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #fde047 0%, #f59e0b 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Grow Your Business & Direct Bookings with rjpm.in
                </span>
              </>
            )}
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              lineHeight: 1.6,
              color: '#cbd5e1',
              margin: '0 0 26px',
              maxWidth: 580,
            }}
          >
            {language === 'ta'
              ? 'கேட்டரிங், அலங்காரம், புகைப்படக்கலை, மெஹந்தி, ஆடியோ/ஒளி அமைப்பு மற்றும் நிகழ்வு தொழிலாளர்கள் — rjpm.in தளத்தில் இலவசமாகப் பதிவு செய்து RJPM மற்றும் சுற்றுவட்டார குடும்பங்களின் நேரடி ஆர்டர்களைப் பெறுங்கள்.'
              : 'Join our trusted network of caterers, decorators, photographers, mehendi artists, DJ/sound teams & event specialists. Showcase your packages and receive direct customer calls across RJPM with 0% middleman commission.'}
          </p>

          {/* Primary & Secondary Action Buttons */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 14,
              alignItems: 'center',
            }}
          >
            {/* Primary Signup / Add Service CTA */}
            <a
              href={signupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '14px 26px',
                fontSize: 15,
                fontWeight: 800,
                borderRadius: 16,
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: '#ffffff',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(245, 158, 11, 0.4)',
                border: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(245, 158, 11, 0.55)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(245, 158, 11, 0.4)'
              }}
            >
              <Store size={18} />
              <span>
                {language === 'ta'
                  ? 'உங்கள் சேவையை இலவசமாகச் சேர்க்க'
                  : 'Add Your Service Free'}
              </span>
              <ArrowRight size={18} />
            </a>

            {/* Secondary Partner Login CTA */}
            <a
              href={loginUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 22px',
                fontSize: 14,
                fontWeight: 700,
                borderRadius: 16,
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(8px)',
                border: '1.5px solid rgba(255, 255, 255, 0.28)',
                color: '#ffffff',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <LogIn size={16} />
              <span>
                {language === 'ta' ? 'பார்ட்னர் உள்நுழைவு' : 'Partner Portal Login'}
              </span>
            </a>
          </div>

          {/* Dedicated Contact Support Section */}
          <div
            style={{
              marginTop: 22,
              padding: '12px 18px',
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
              borderRadius: 16,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              border: '1px solid rgba(255, 255, 255, 0.18)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background: 'rgba(16, 185, 129, 0.25)',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#34d399',
                  flexShrink: 0,
                }}
              >
                <PhoneCall size={18} />
              </div>
              <div style={{ fontSize: 13, color: '#e2e8f0' }}>
                <span style={{ fontWeight: 700, color: '#ffffff' }}>
                  {language === 'ta' ? 'உதவிக்கு தொடர்பு கொள்ள: ' : 'Contact Support: '}
                </span>
                <span style={{ color: '#cbd5e1' }}>
                  {language === 'ta' ? 'சேவை பதிவு & ஆலோசனைகளுக்கு' : 'Onboarding & partner help'}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <a
                href="tel:+919360226758"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '7px 14px',
                  borderRadius: 10,
                  background: '#10b981',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: 13,
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(16, 185, 129, 0.35)',
                  transition: 'transform 0.15s ease',
                }}
              >
                <PhoneCall size={14} />
                <span>+91 9360226758</span>
              </a>
              <a
                href="https://wa.me/919360226758?text=Hello%20RJPM%20Support,%20I%20need%20help%20with%20listing%20my%20service"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '7px 14px',
                  borderRadius: 10,
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: 13,
                  textDecoration: 'none',
                }}
              >
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Trust reassurance note */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginTop: 18,
              fontSize: 12.5,
              color: '#94a3b8',
              flexWrap: 'wrap',
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <CheckCircle2 size={14} color="#10b981" />
              {language === 'ta' ? '2 நிமிடத்தில் சுலபமான பதிவு' : 'Quick 2-minute registration'}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <CheckCircle2 size={14} color="#10b981" />
              {language === 'ta' ? '0% கமிஷன் கட்டணம்' : 'Zero commission charges'}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <CheckCircle2 size={14} color="#10b981" />
              {language === 'ta' ? 'நேரடி வாடிக்கையாளர் தொடர்பு' : '100% direct customer leads'}
            </span>
          </div>
        </div>

        {/* Right Column: 4 Key Value Prop Cards & Visual Badge */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 14,
          }}
        >
          {/* Card 1: 0% Commission */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 18,
              padding: '18px 16px',
              transition: 'all 0.2s ease',
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                background: 'rgba(245, 158, 11, 0.2)',
                color: '#fde047',
                display: 'grid',
                placeItems: 'center',
                marginBottom: 10,
              }}
            >
              <TrendingUp size={20} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#ffffff', marginBottom: 4 }}>
              {language === 'ta' ? '0% கமிஷன்' : '0% Commission'}
            </div>
            <div style={{ fontSize: 12, color: '#cbd5e1', lineHeight: 1.4 }}>
              {language === 'ta'
                ? 'உங்கள் உழைப்பின் வருமானம் முழுமையாக உங்களுக்கே.'
                : 'Keep 100% of your booking fee without any middleman deduction.'}
            </div>
          </div>

          {/* Card 2: Direct Inquiries */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 18,
              padding: '18px 16px',
              transition: 'all 0.2s ease',
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                background: 'rgba(16, 185, 129, 0.2)',
                color: '#34d399',
                display: 'grid',
                placeItems: 'center',
                marginBottom: 10,
              }}
            >
              <PhoneCall size={20} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#ffffff', marginBottom: 4 }}>
              {language === 'ta' ? 'நேரடி அழைப்புகள்' : 'Direct Inquiries'}
            </div>
            <div style={{ fontSize: 12, color: '#cbd5e1', lineHeight: 1.4 }}>
              {language === 'ta'
                ? 'வாடிக்கையாளர்கள் உங்களை போன் மற்றும் வாட்ஸ்அப்பில் நேரடியாக தொடர்பு கொள்வார்கள்.'
                : 'Receive calls and WhatsApp messages directly from local event hosts.'}
            </div>
          </div>

          {/* Card 3: Custom Packages */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 18,
              padding: '18px 16px',
              transition: 'all 0.2s ease',
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                background: 'rgba(99, 102, 241, 0.2)',
                color: '#a5b4fc',
                display: 'grid',
                placeItems: 'center',
                marginBottom: 10,
              }}
            >
              <PackagePlus size={20} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#ffffff', marginBottom: 4 }}>
              {language === 'ta' ? 'பேக்கேஜ் & கட்டணம்' : 'Manage Packages'}
            </div>
            <div style={{ fontSize: 12, color: '#cbd5e1', lineHeight: 1.4 }}>
              {language === 'ta'
                ? 'உங்கள் தயாரிப்புகள், புகைப்படங்கள், சலுகைகளை மொபைலிலேயே நிர்வகிக்கலாம்.'
                : 'Create bundles, set transparent pricing, and showcase past event photos.'}
            </div>
          </div>

          {/* Card 4: Verified Partner */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 18,
              padding: '18px 16px',
              transition: 'all 0.2s ease',
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                background: 'rgba(56, 189, 248, 0.2)',
                color: '#38bdf8',
                display: 'grid',
                placeItems: 'center',
                marginBottom: 10,
              }}
            >
              <ShieldCheck size={20} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#ffffff', marginBottom: 4 }}>
              {language === 'ta' ? 'சரிபார்க்கப்பட்ட பேட்ஜ்' : 'Verified Badge'}
            </div>
            <div style={{ fontSize: 12, color: '#cbd5e1', lineHeight: 1.4 }}>
              {language === 'ta'
                ? 'நம்பகமான உள்ளூர் பார்ட்னராக அங்கீகாரம் பெற்று முன்னிலை பெறுங்கள்.'
                : 'Build instant customer trust with a verified local vendor badge.'}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProviderPromotionBanner
