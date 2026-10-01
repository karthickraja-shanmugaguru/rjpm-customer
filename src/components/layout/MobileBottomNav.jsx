import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ICONS } from '../../constants/icons'
import { useLanguage } from '../../context/LanguageContext'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'

export const MobileBottomNav = () => {
  const { t } = useLanguage()
  const { isAuthenticated } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  return (
    <nav className="mobile-nav">
      <NavLink
        to="/"
        end
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        <span className="nav-icon">{ICONS.homeNav(22)}</span>
        <span>{t('navHome', 'Home')}</span>
      </NavLink>

      <NavLink
        to="/explore"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        <span className="nav-icon">{ICONS.exploreNav(22)}</span>
        <span>{t('navExplore', 'Explore')}</span>
      </NavLink>

      <NavLink
        to="/favorites"
        onClick={(e) => {
          if (!isAuthenticated) {
            e.preventDefault()
            showToast('Please sign in to view your saved favorites.')
            navigate('/login', { state: { from: { pathname: '/favorites' } } })
          }
        }}
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        <span className="nav-icon">{ICONS.heart(22)}</span>
        <span>{t('navSaved', 'Saved')}</span>
      </NavLink>


      <NavLink
        to="/profile"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        <span className="nav-icon">{ICONS.user(22)}</span>
        <span>{t('navProfile', 'Profile')}</span>
      </NavLink>
    </nav>
  )
}
