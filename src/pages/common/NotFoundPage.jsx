import React from 'react'
import { Link } from 'react-router-dom'
import { useSEO } from '../../utils/useSEO'
import { useLanguage } from '../../context/LanguageContext'
import { Home, Compass, Package, ArrowLeft } from 'lucide-react'

export const NotFoundPage = () => {
  const { language, t } = useLanguage()

  useSEO({
    title: '404 — Page Not Found | RJPM.in',
    description: 'The requested page could not be found on RJPM.in. Explore local businesses, catering, mandapams, and event services in Rajapalayam.',
    canonical: 'https://rjpm.in/404',
  })

  return (
    <div style={{
      maxWidth: 600,
      margin: '60px auto',
      padding: '40px 24px',
      textAlign: 'center',
      background: '#ffffff',
      borderRadius: '24px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)'
    }}>
      <div style={{
        width: 72,
        height: 72,
        borderRadius: '50%',
        background: '#eff6ff',
        color: '#2563eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px',
        fontSize: 32,
        fontWeight: 800
      }}>
        404
      </div>

      <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: '0 0 12px' }}>
        {language === 'ta' ? 'பக்கம் கிடைக்கவில்லை' : 'Page Not Found'}
      </h1>

      <p style={{ color: '#64748b', fontSize: '15px', lineHeight: 1.6, margin: '0 0 28px' }}>
        {language === 'ta'
          ? 'நீங்கள் தேடும் பக்கம் மாற்றப்பட்டிருக்கலாம் அல்லது கிடைக்காமல் இருக்கலாம். ராஜபாளையம் சேவைகளை கீழே காண்க.'
          : 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: '#2563eb',
            color: '#ffffff',
            padding: '10px 20px',
            borderRadius: '12px',
            fontWeight: 600,
            textDecoration: 'none',
            fontSize: '14px'
          }}
        >
          <Home size={18} />
          <span>{language === 'ta' ? 'முகப்புக்குச் செல்' : 'Back to Home'}</span>
        </Link>

        <Link
          to="/explore"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: '#f1f5f9',
            color: '#1e293b',
            padding: '10px 20px',
            borderRadius: '12px',
            fontWeight: 600,
            textDecoration: 'none',
            fontSize: '14px'
          }}
        >
          <Compass size={18} />
          <span>{language === 'ta' ? 'சேவைகளைத் தேடு' : 'Browse Services'}</span>
        </Link>

        <Link
          to="/packages"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: '#f1f5f9',
            color: '#1e293b',
            padding: '10px 20px',
            borderRadius: '12px',
            fontWeight: 600,
            textDecoration: 'none',
            fontSize: '14px'
          }}
        >
          <Package size={18} />
          <span>{language === 'ta' ? 'தொகுப்புகள்' : 'Celebration Packages'}</span>
        </Link>
      </div>
    </div>
  )
}
