import React from 'react'
import { Link } from 'react-router-dom'
import { ICONS, ILLUSTRATIONS } from '../../constants/icons'
import { CATEGORY_META, PACKAGE_META, LABOUR_META } from '../../constants/categoryMeta'
import { useLanguage } from '../../context/LanguageContext'

export const DiscoveryCards = () => {
  const { t } = useLanguage()

  return (
    <div className="quick-discovery">
      {/* 01. SERVICES */}
      <Link to="/explore?category=All" className="quick-card services">
        <div className="quick-kicker">01 &middot; DISCOVER</div>
        <h3>{t('exploreServices', 'Explore Services')}</h3>
        <div className="quick-subtitle">{t('exploreServicesSub', 'Find top-rated individual services for your event.')}</div>
        <div className="quick-tags">
          <span className="quick-tag">
            <span>{CATEGORY_META['Catering'].svg(16)}</span> Catering
          </span>
          <span className="quick-tag">
            <span>{CATEGORY_META['Decoration'].svg(16)}</span> Decoration
          </span>
          <span className="quick-tag">
            <span>{CATEGORY_META['Photography'].svg(16)}</span> Photography
          </span>
          <span className="quick-tag">
            <span>{CATEGORY_META['Mehendi'].svg(16)}</span> Mehendi
          </span>
        </div>
        <div className="quick-arrow">{ICONS.arrowRight(20, '#ffffff')}</div>
        <div className="quick-visual">{ILLUSTRATIONS.services()}</div>
      </Link>

      {/* 02. PACKAGES */}
      <Link to="/packages" className="quick-card packages">
        <div className="quick-kicker">02 &middot; READY MADE</div>
        <h3>{t('explorePackages', 'Explore Packages')}</h3>
        <div className="quick-subtitle">{t('explorePackagesSub', 'Complete celebration bundles, expertly curated.')}</div>
        <div className="quick-tags">
          <span className="quick-tag">
            <span>{PACKAGE_META['Wedding'].svg(16)}</span> Wedding
          </span>
          <span className="quick-tag">
            <span>{PACKAGE_META['Birthday'].svg(16)}</span> Birthday
          </span>
          <span className="quick-tag">
            <span>{PACKAGE_META['Reception'].svg(16)}</span> Reception
          </span>
          <span className="quick-tag">
            <span>{PACKAGE_META['Engagement'].svg(16)}</span> Engagement
          </span>
        </div>
        <div className="quick-arrow">{ICONS.arrowRight(20, '#ffffff')}</div>
        <div className="quick-visual">{ILLUSTRATIONS.packages()}</div>
      </Link>

      {/* 03. LABOUR */}
      <Link to="/labour" className="quick-card labour">
        <div className="quick-kicker">03 &middot; EVENT SUPPORT</div>
        <h3>{t('findLabour', 'Find Event Labour')}</h3>
        <div className="quick-subtitle">{t('findLabourSub', 'Book trained staff to set up and manage your event.')}</div>
        <div className="quick-tags">
          <span className="quick-tag">
            <span>{LABOUR_META['Food & Panthi Servers']?.svg(16) || LABOUR_META['Food Servers']?.svg(16)}</span> Servers
          </span>
          <span className="quick-tag">
            <span>{LABOUR_META['Cleaning Staff']?.svg(16)}</span> Cleaners
          </span>
          <span className="quick-tag">
            <span>{LABOUR_META['Setup & Furniture Crew']?.svg(16) || LABOUR_META['Setup Crew']?.svg(16)}</span> Setup Crew
          </span>
          <span className="quick-tag">
            <span>{LABOUR_META['Security & Bouncers']?.svg(16) || LABOUR_META['Event Helpers']?.svg(16)}</span> Security
          </span>
        </div>
        <div className="quick-arrow">{ICONS.arrowRight(20, '#ffffff')}</div>
        <div className="quick-visual">{ILLUSTRATIONS.labour()}</div>
      </Link>
    </div>
  )
}
