import React from 'react'
import { Link } from 'react-router-dom'
import { getPartnerBaseUrl } from '../../utils/urlUtils'
import { useLanguage } from '../../context/LanguageContext'
import { MapPin, Phone, ShieldCheck, ExternalLink, Heart, Sparkles } from 'lucide-react'

export const Footer = () => {
  const { language, setLanguage, t } = useLanguage()
  const partnerUrl = getPartnerBaseUrl()

  return (
    <footer className="site-footer" style={{
      background: '#0f172a',
      color: '#cbd5e1',
      padding: '48px 20px 28px',
      marginTop: 'auto',
      borderTop: '1px solid #1e293b',
      fontSize: '14px',
      lineHeight: 1.6
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Top Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '36px',
          marginBottom: '40px'
        }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 900,
                fontSize: 20
              }}>
                R
              </div>
              <span style={{ fontSize: 20, fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px' }}>
                RJPM<span style={{ color: '#38bdf8' }}>.in</span>
              </span>
            </div>
            <p style={{
              fontSize: '13px',
              color: '#94a3b8',
              margin: '0 0 16px',
              fontWeight: 500
            }}>
              <strong>RJPM – Namma Rajapalayam, Namma Businesses</strong>
            </p>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 16px' }}>
              Rajapalayam's trusted local directory & event services marketplace. Discover verified wedding mandapams, catering, stage decorators, photographers, and celebration specialists.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#38bdf8', fontSize: '13px' }}>
              <MapPin size={16} />
              <span>Rajapalayam, Virudhunagar Dist, Tamil Nadu 626117</span>
            </div>
          </div>

          {/* Popular Services Directory */}
          <div>
            <h3 style={{ color: '#ffffff', fontSize: '15px', fontWeight: 700, margin: '0 0 16px' }}>
              {language === 'ta' ? 'பிரபலமான சேவைகள்' : 'Event Services in Rajapalayam'}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                <Link to="/explore?category=Catering" style={{ color: '#cbd5e1', textDecoration: 'none' }} className="footer-link">
                  {language === 'ta' ? 'கேட்டரிங் & உணவு விருந்து' : 'Wedding Catering & Feasts'}
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Mandapam" style={{ color: '#cbd5e1', textDecoration: 'none' }} className="footer-link">
                  {language === 'ta' ? 'திருமண மண்டபங்கள்' : 'Marriage Mandapams & Halls'}
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Decoration" style={{ color: '#cbd5e1', textDecoration: 'none' }} className="footer-link">
                  {language === 'ta' ? 'மேடை & மலர் அலங்காரம்' : 'Stage & Floral Decoration'}
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Panthal" style={{ color: '#cbd5e1', textDecoration: 'none' }} className="footer-link">
                  {language === 'ta' ? 'பந்தல் & கூடார அமைப்புகள்' : 'Panthal & Shamiana Decor'}
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Photography" style={{ color: '#cbd5e1', textDecoration: 'none' }} className="footer-link">
                  {language === 'ta' ? 'புகைப்படம் & வீடியோகிராபி' : 'Wedding Photography & Studio'}
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Nadaswaram" style={{ color: '#cbd5e1', textDecoration: 'none' }} className="footer-link">
                  {language === 'ta' ? 'நாதஸ்வரம் & மேளம்' : 'Nadaswaram & Thavil Melam'}
                </Link>
              </li>
              <li>
                <Link to="/packages" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 600 }} className="footer-link">
                  {language === 'ta' ? 'முழு திருமண தொகுப்புகள் →' : 'All-in-One Celebration Packages →'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Regional Coverage Areas */}
          <div>
            <h3 style={{ color: '#ffffff', fontSize: '15px', fontWeight: 700, margin: '0 0 16px' }}>
              {language === 'ta' ? 'சேவை பகுதிகள்' : 'Verified Coverage Areas'}
            </h3>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 12px' }}>
              Verified vendors providing on-site services across Rajapalayam and neighboring taluks:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Rajapalayam', 'Srivilliputhur', 'Chatrapatti', 'Seithur', 'Sankarankovil', 'Sivakasi'].map((loc) => (
                <Link
                  key={loc}
                  to={`/explore?city=${encodeURIComponent(loc)}`}
                  style={{
                    background: '#1e293b',
                    color: '#94a3b8',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    textDecoration: 'none',
                    border: '1px solid #334155',
                    transition: 'all 0.2s'
                  }}
                  className="footer-loc-tag"
                >
                  {loc}
                </Link>
              ))}
            </div>
            <div style={{ marginTop: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#10b981', fontSize: '12px', fontWeight: 600 }}>
                <ShieldCheck size={16} />
                <span>100% Verified Local Business Partners</span>
              </div>
            </div>
          </div>

          {/* For Business Partners */}
          <div>
            <h3 style={{ color: '#ffffff', fontSize: '15px', fontWeight: 700, margin: '0 0 16px' }}>
              {language === 'ta' ? 'வணிக கூட்டாளர்கள்' : 'For Local Businesses'}
            </h3>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 14px' }}>
              Own an event or local service business in Rajapalayam? Join RJPM.in to connect directly with customers.
            </p>
            <a
              href={`${partnerUrl}/signup`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#2563eb',
                color: '#ffffff',
                padding: '9px 16px',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '13px',
                textDecoration: 'none',
                marginBottom: 12
              }}
            >
              <span>{language === 'ta' ? 'வணிகத்தை பதிவு செய்' : 'Register Your Business'}</span>
              <ExternalLink size={14} />
            </a>
            <div>
              <a
                href={`${partnerUrl}/login`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#94a3b8', fontSize: '13px', textDecoration: 'none' }}
              >
                {language === 'ta' ? 'கூட்டாளர் உள்நுழைவு' : 'Partner Portal Login →'}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid #1e293b',
          paddingTop: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          fontSize: '12px',
          color: '#64748b'
        }}>
          <div>
            © {new Date().getFullYear()} RJPM.in — Namma Rajapalayam, Namma Businesses. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Link to="/explore" style={{ color: '#94a3b8', textDecoration: 'none' }}>Directory</Link>
            <Link to="/packages" style={{ color: '#94a3b8', textDecoration: 'none' }}>Packages</Link>
            <Link to="/labour" style={{ color: '#94a3b8', textDecoration: 'none' }}>Staff</Link>
            <button
              onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
              style={{
                background: '#1e293b',
                border: '1px solid #334155',
                color: '#38bdf8',
                padding: '3px 8px',
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: 600
              }}
            >
              {language === 'en' ? 'தமிழ்' : 'English'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
