import React from 'react'
import { ICONS } from './icons'

export const CATEGORY_META = {
  'Catering': {
    color: '#ea580c',
    bg: 'linear-gradient(135deg,#ffedd5,#fff7ed)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <path d="M4 22H28C28 15.37 22.63 10 16 10C9.37 10 4 15.37 4 22Z" fill="#fdba74" />
        <path d="M16 6C17.1 6 18 6.9 18 8H14C14 6.9 14.9 6 16 6Z" fill="#ea580c" />
        <path d="M2 24C2 23.45 2.45 23 3 23H29C29.55 23 30 23.45 30 24C30 24.55 29.55 25 29 25H3C2.45 25 2 24.55 2 24Z" fill="#ea580c" />
        <path d="M12 15C13.5 13 18.5 13 20 15" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  'Decoration': {
    color: '#e11d48',
    bg: 'linear-gradient(135deg,#ffe4e6,#fff1f2)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <path d="M6 16C6 10.48 10.48 6 16 6C21.52 6 26 10.48 26 16V26H22V16C22 12.69 19.31 10 16 10C12.69 10 10 12.69 10 16V26H6V16Z" fill="#fda4af" />
        <circle cx="16" cy="6" r="3" fill="#e11d48" />
        <circle cx="10" cy="18" r="2.5" fill="#e11d48" />
        <circle cx="22" cy="18" r="2.5" fill="#e11d48" />
        <path d="M16 12L17.2 14.8L20 16L17.2 17.2L16 20L14.8 17.2L12 16L14.8 14.8L16 12Z" fill="#ffffff" />
      </svg>
    ),
  },
  'Photography': {
    color: '#0284c7',
    bg: 'linear-gradient(135deg,#e0f2fe,#f0f9ff)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <path d="M5 10C5 8.9 5.9 8 7 8H10L12 5H20L22 8H25C26.1 8 27 8.9 27 10V24C27 25.1 26.1 26 25 26H7C5.9 26 5 25.1 5 24V10Z" fill="#7dd3fc" />
        <circle cx="16" cy="17" r="6" fill="#ffffff" />
        <circle cx="16" cy="17" r="4" fill="#0284c7" />
        <circle cx="17.5" cy="15.5" r="1.2" fill="#ffffff" />
        <circle cx="23" cy="11.5" r="1.5" fill="#0369a1" />
      </svg>
    ),
  },
  'Videography': {
    color: '#7c3aed',
    bg: 'linear-gradient(135deg,#ede9fe,#f5f3ff)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <rect x="4" y="8" width="16" height="16" rx="4" fill="#c4b5fd" />
        <path d="M20 13.5L28 9V23L20 18.5V13.5Z" fill="#7c3aed" />
        <circle cx="10" cy="13" r="2.5" fill="#ffffff" />
        <circle cx="15" cy="18" r="2.5" fill="#ffffff" />
        <circle cx="8" cy="10.5" r="1" fill="#dc2626" />
      </svg>
    ),
  },
  'Mehendi': {
    color: '#059669',
    bg: 'linear-gradient(135deg,#d1fae5,#ecfdf5)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <path d="M16 4C16 4 23 11 23 18C23 21.87 19.87 25 16 25C12.13 25 9 21.87 9 18C9 11 16 4 16 4Z" fill="#6ee7b7" />
        <circle cx="16" cy="17" r="4" fill="#059669" />
        <circle cx="16" cy="17" r="2" fill="#ffffff" />
        <path d="M16 11V13M16 21V23M10 17H12M20 17H22" stroke="#047857" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="16" cy="27" r="1.5" fill="#059669" />
      </svg>
    ),
  },
  'Jewellery': {
    color: '#d97706',
    bg: 'linear-gradient(135deg,#fef3c7,#fffbeb)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <path d="M9 8H23L27 14L16 26L5 14L9 8Z" fill="#fcd34d" />
        <path d="M9 8L16 26L23 8" stroke="#d97706" strokeWidth="1.6" />
        <path d="M5 14H27" stroke="#b45309" strokeWidth="1.6" />
        <path d="M12.5 8L10 14L16 26L22 14L19.5 8" fill="#ffffff" fillOpacity="0.35" />
      </svg>
    ),
  },
  'Mandapam': {
    color: '#b45309',
    bg: 'linear-gradient(135deg,#ffedd5,#fff7ed)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <path d="M16 4L4 12H28L16 4Z" fill="#fba647" />
        <rect x="7" y="14" width="3.5" height="11" rx="1" fill="#b45309" />
        <rect x="21.5" y="14" width="3.5" height="11" rx="1" fill="#b45309" />
        <rect x="14.25" y="14" width="3.5" height="11" rx="1" fill="#ea580c" />
        <rect x="4" y="25" width="24" height="3" rx="1.5" fill="#9a3412" />
        <circle cx="16" cy="8" r="1.8" fill="#ffffff" />
      </svg>
    ),
  },
  'Music & DJ': {
    color: '#9333ea',
    bg: 'linear-gradient(135deg,#f3e8ff,#faf5ff)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <circle cx="16" cy="16" r="11" fill="#d8b4fe" />
        <circle cx="16" cy="16" r="6" fill="#9333ea" />
        <circle cx="16" cy="16" r="2.2" fill="#ffffff" />
        <path d="M21 7C23.5 9.5 25 12.5 25 16" stroke="#9333ea" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M7 16C7 12.5 8.5 9.5 11 7" stroke="#9333ea" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  'Tailoring': {
    color: '#0d9488',
    bg: 'linear-gradient(135deg,#ccfbf1,#f0fdfa)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <circle cx="10" cy="22" r="4" fill="#5eead4" />
        <circle cx="22" cy="22" r="4" fill="#5eead4" />
        <path d="M12.5 19L24 7M19.5 19L8 7" stroke="#0d9488" strokeWidth="2.6" strokeLinecap="round" />
        <circle cx="16" cy="15" r="1.8" fill="#0f766e" />
      </svg>
    ),
  },
  'Makeup': {
    color: '#db2777',
    bg: 'linear-gradient(135deg,#fce7f3,#fdf2f8)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <rect x="11" y="14" width="10" height="13" rx="2" fill="#f472b6" />
        <path d="M13 14V8C13 6 15 5 16 5C17 5 19 6 19 8V14H13Z" fill="#db2777" />
        <path d="M14 7L18 10" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="10" y="22" width="12" height="3" fill="#be185d" />
      </svg>
    ),
  },
  'Makeup & Hair': {
    color: '#db2777',
    bg: 'linear-gradient(135deg,#fce7f3,#fdf2f8)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <rect x="11" y="14" width="10" height="13" rx="2" fill="#f472b6" />
        <path d="M13 14V8C13 6 15 5 16 5C17 5 19 6 19 8V14H13Z" fill="#db2777" />
        <path d="M14 7L18 10" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="10" y="22" width="12" height="3" fill="#be185d" />
      </svg>
    ),
  },
  'Flowers': {
    color: '#16a34a',
    bg: 'linear-gradient(135deg,#dcfce7,#f0fdf4)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <circle cx="16" cy="11" r="4.5" fill="#f43f5e" />
        <circle cx="11.5" cy="15" r="4.5" fill="#fb7185" />
        <circle cx="20.5" cy="15" r="4.5" fill="#fb7185" />
        <circle cx="13.5" cy="20" r="4.5" fill="#f43f5e" />
        <circle cx="18.5" cy="20" r="4.5" fill="#f43f5e" />
        <circle cx="16" cy="16" r="3.2" fill="#fbbf24" />
        <path d="M16 22V28" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  'Furniture': {
    color: '#4f46e5',
    bg: 'linear-gradient(135deg,#e0e7ff,#eef2ff)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <rect x="8" y="6" width="16" height="10" rx="3" fill="#818cf8" />
        <rect x="6" y="16" width="20" height="4" rx="2" fill="#4f46e5" />
        <rect x="8" y="20" width="2.8" height="7" rx="1.4" fill="#3730a3" />
        <rect x="21.2" y="20" width="2.8" height="7" rx="1.4" fill="#3730a3" />
      </svg>
    ),
  },
  'Beauty & Spa': {
    color: '#0891b2',
    bg: 'linear-gradient(135deg,#cffafe,#ecfeff)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <path d="M16 6C16 11 11 16 11 20C11 23 13 25 16 25C19 25 21 23 21 20C21 16 16 11 16 6Z" fill="#67e8f9" />
        <circle cx="15" cy="18" r="2.5" fill="#ffffff" />
        <path d="M8 25C10 27 13 28 16 28C19 28 22 27 24 25" stroke="#0891b2" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  'Panthal & Tent': {
    color: '#c2410c',
    bg: 'linear-gradient(135deg,#ffedd5,#fff7ed)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <path d="M16 5L4 25H28L16 5Z" fill="#fdba74" />
        <path d="M16 5V25L21 25L16 5Z" fill="#c2410c" />
        <path d="M16 16L12 25H20L16 16Z" fill="#ffffff" fillOpacity="0.6" />
        <line x1="2" y1="26" x2="30" y2="26" stroke="#9a3412" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  'Sweets & Desserts': {
    color: '#f59e0b',
    bg: 'linear-gradient(135deg,#fef3c7,#fffbeb)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <path d="M8 18C8 16.34 9.34 15 11 15H21C22.66 15 24 16.34 24 18V24H8V18Z" fill="#fcd34d" />
        <rect x="6" y="24" width="20" height="3" rx="1.5" fill="#d97706" />
        <circle cx="16" cy="10" r="3" fill="#ef4444" />
        <path d="M16 12V15" stroke="#d97706" strokeWidth="2" />
        <path d="M10 18C12 19 14 19 16 18C18 19 20 19 22 18" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  'Water Supply': {
    color: '#2563eb',
    bg: 'linear-gradient(135deg,#dbeafe,#eff6ff)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <path d="M16 5C16 5 8 15 8 20C8 24.42 11.58 28 16 28C20.42 28 24 24.42 24 20C24 15 16 5 16 5Z" fill="#93c5fd" />
        <path d="M14 17C14 15.5 15.5 13 16 12C16.5 13 18 15.5 18 17C18 19 16.5 20.5 15 20.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        <circle cx="14" cy="22" r="1.5" fill="#ffffff" />
      </svg>
    ),
  },
  'Event Staff': {
    color: '#475569',
    bg: 'linear-gradient(135deg,#e2e8f0,#f8fafc)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <circle cx="16" cy="9" r="4.5" fill="#94a3b8" />
        <path d="M8 25C8 20.58 11.58 17 16 17C20.42 17 24 20.58 24 25V26H8V25Z" fill="#475569" />
        <path d="M14.5 17.5L16 20L17.5 17.5" fill="#ffffff" />
        <circle cx="23" cy="11" r="2.5" fill="#cbd5e1" />
      </svg>
    ),
  },
  'Priest & Rituals': {
    color: '#d97706',
    bg: 'linear-gradient(135deg,#fef3c7,#fffbeb)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <path d="M9 18C9 14.69 11.69 12 15 12H17C20.31 12 23 14.69 23 18C23 21.31 20.31 24 17 24H15C11.69 24 9 21.31 9 18Z" fill="#fcd34d" />
        <path d="M16 4C17.5 7 18 9 17 11C16 11.5 15 10 15 8C15 6.5 15.5 5 16 4Z" fill="#ef4444" />
        <circle cx="16.2" cy="7.5" r="1.5" fill="#fef08a" />
        <rect x="12" y="24" width="8" height="3" rx="1.5" fill="#d97706" />
      </svg>
    ),
  },
  'Invitations': {
    color: '#be185d',
    bg: 'linear-gradient(135deg,#fce7f3,#fdf2f8)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <rect x="4" y="8" width="24" height="16" rx="3" fill="#f472b6" />
        <path d="M4 10L16 18L28 10" stroke="#be185d" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="16" cy="18" r="3.5" fill="#f59e0b" />
        <circle cx="16" cy="18" r="1.5" fill="#ffffff" />
      </svg>
    ),
  },
  'Transport': {
    color: '#1d4ed8',
    bg: 'linear-gradient(135deg,#dbeafe,#eff6ff)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <path d="M6 17L9 9H23L26 17V23H6V17Z" fill="#93c5fd" />
        <circle cx="10" cy="23" r="3" fill="#1e3a8a" />
        <circle cx="22" cy="23" r="3" fill="#1e3a8a" />
        <rect x="9.5" y="11" width="13" height="4" rx="1" fill="#ffffff" />
      </svg>
    ),
  },
  'Nadaswaram': {
    color: '#d97706',
    bg: 'linear-gradient(135deg,#fef3c7,#fffbeb)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <path d="M6 22L18 10L22 14L10 26L6 22Z" fill="#fcd34d" />
        <path d="M18 10L24 6L26 8L22 14L18 10Z" fill="#d97706" />
        <circle cx="8" cy="24" r="3" fill="#b45309" />
        <path d="M14 14L15 15M17 17L18 18" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  'Chenda Melam': {
    color: '#dc2626',
    bg: 'linear-gradient(135deg,#fee2e2,#fef2f2)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <ellipse cx="16" cy="10" rx="9" ry="4" fill="#f87171" />
        <path d="M7 10V22C7 24.2 11 26 16 26C21 26 25 24.2 25 22V10" fill="#dc2626" />
        <path d="M9 12L16 24L23 12" stroke="#ffffff" strokeWidth="1.6" />
      </svg>
    ),
  },
  'Return Gifts': {
    color: '#059669',
    bg: 'linear-gradient(135deg,#d1fae5,#ecfdf5)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <rect x="6" y="12" width="20" height="14" rx="3" fill="#6ee7b7" />
        <rect x="4" y="9" width="24" height="4" rx="2" fill="#059669" />
        <line x1="16" y1="9" x2="16" y2="26" stroke="#047857" strokeWidth="2.5" />
        <path d="M12 9C12 6.5 14 5 16 7C18 5 20 6.5 20 9" stroke="#059669" strokeWidth="2" fill="none" />
      </svg>
    ),
  },
  'Seer Plates': {
    color: '#9333ea',
    bg: 'linear-gradient(135deg,#f3e8ff,#faf5ff)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <ellipse cx="16" cy="22" rx="12" ry="4" fill="#d8b4fe" />
        <path d="M10 20C10 16 12 12 16 8C20 12 22 16 22 20" fill="#c084fc" />
        <circle cx="16" cy="7" r="2" fill="#f59e0b" />
        <ellipse cx="16" cy="21" rx="10" ry="3" stroke="#9333ea" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
  'Kolam': {
    color: '#ea580c',
    bg: 'linear-gradient(135deg,#ffedd5,#fff7ed)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <circle cx="16" cy="16" r="3" fill="#ea580c" />
        <circle cx="16" cy="8" r="2" fill="#f97316" />
        <circle cx="16" cy="24" r="2" fill="#f97316" />
        <circle cx="8" cy="16" r="2" fill="#f97316" />
        <circle cx="24" cy="16" r="2" fill="#f97316" />
        <path d="M16 8C20 12 20 20 16 24C12 20 12 12 16 8Z" stroke="#ea580c" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
  'Muhurtham Malai': {
    color: '#e11d48',
    bg: 'linear-gradient(135deg,#ffe4e6,#fff1f2)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <path d="M8 8C8 16 12 24 16 26C20 24 24 16 24 8" stroke="#e11d48" strokeWidth="3" strokeLinecap="round" fill="none" />
        <circle cx="16" cy="26" r="3" fill="#f59e0b" />
        <circle cx="10" cy="12" r="2.5" fill="#fda4af" />
        <circle cx="22" cy="12" r="2.5" fill="#fda4af" />
      </svg>
    ),
  },
  'Live Stalls': {
    color: '#ca8a04',
    bg: 'linear-gradient(135deg,#fef9c3,#fefce8)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <path d="M5 14L8 6H24L27 14H5Z" fill="#fde047" />
        <rect x="7" y="14" width="18" height="12" rx="2" fill="#ca8a04" />
        <circle cx="12" cy="20" r="2" fill="#ffffff" />
        <circle cx="20" cy="20" r="2" fill="#ffffff" />
      </svg>
    ),
  },
  'Special Effects': {
    color: '#7c3aed',
    bg: 'linear-gradient(135deg,#ede9fe,#f5f3ff)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <path d="M16 4L18 10L24 12L18 14L16 20L14 14L8 12L14 10L16 4Z" fill="#a78bfa" />
        <circle cx="24" cy="22" r="2.5" fill="#f59e0b" />
        <circle cx="8" cy="22" r="2.5" fill="#ec4899" />
      </svg>
    ),
  },
  'Audio Visual': {
    color: '#2563eb',
    bg: 'linear-gradient(135deg,#dbeafe,#eff6ff)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <rect x="4" y="6" width="24" height="16" rx="3" fill="#60a5fa" />
        <rect x="7" y="9" width="18" height="10" rx="1.5" fill="#1e40af" />
        <path d="M12 25H20M16 22V25" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  'Generator': {
    color: '#475569',
    bg: 'linear-gradient(135deg,#e2e8f0,#f8fafc)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <rect x="5" y="8" width="22" height="16" rx="3" fill="#94a3b8" />
        <path d="M17 11L13 17H18L15 22" stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  'Valet Parking': {
    color: '#0891b2',
    bg: 'linear-gradient(135deg,#cffafe,#ecfeff)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <rect x="6" y="6" width="20" height="20" rx="5" fill="#0891b2" />
        <path d="M12 21V11H17C18.66 11 20 12.34 20 14C20 15.66 18.66 17 17 17H12" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  'Security': {
    color: '#1e293b',
    bg: 'linear-gradient(135deg,#e2e8f0,#f8fafc)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <path d="M16 4L6 8V16C6 22 10.5 26.5 16 28C21.5 26.5 26 22 26 16V8L16 4Z" fill="#334155" />
        <path d="M12 16L15 19L20 13" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
}

export const PACKAGE_META = {
  'All Packages': {
    color: '#1a73e8',
    bg: 'linear-gradient(135deg,#e8f0fe,#f8f9fa)',
    svg: (s = 28) => ICONS.grid(s, '#1a73e8'),
  },
  'Wedding': {
    color: '#e11d48',
    bg: 'linear-gradient(135deg,#ffe4e6,#fff1f2)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <circle cx="12" cy="18" r="7" stroke="#e11d48" strokeWidth="2.8" />
        <circle cx="20" cy="18" r="7" stroke="#f59e0b" strokeWidth="2.8" />
        <path d="M12 7L13.5 10L16.5 11.5L13.5 13L12 16L10.5 13L7.5 11.5L10.5 10L12 7Z" fill="#f59e0b" />
      </svg>
    ),
  },
  'Birthday': {
    color: '#f59e0b',
    bg: 'linear-gradient(135deg,#fef3c7,#fffbeb)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <path d="M7 17C7 15.5 8.5 14 10 14H22C23.5 14 25 15.5 25 17V25H7V17Z" fill="#fcd34d" />
        <rect x="5" y="25" width="22" height="3" rx="1.5" fill="#d97706" />
        <rect x="15" y="9" width="2" height="5" fill="#ef4444" />
        <circle cx="16" cy="7" r="2" fill="#f59e0b" />
        <path d="M10 17C12 18 14 18 16 17C18 18 20 18 22 17" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  'Reception': {
    color: '#8b5cf6',
    bg: 'linear-gradient(135deg,#ede9fe,#f5f3ff)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <path d="M10 6L14 15V24H8V26H18V24H14V15L18 6H10Z" fill="#c4b5fd" />
        <path d="M18 10L22 17V24H20V26H26V24H22V17L25 10H18Z" fill="#8b5cf6" />
        <circle cx="14" cy="5" r="1.5" fill="#f59e0b" />
        <circle cx="21" cy="7" r="1.2" fill="#f59e0b" />
      </svg>
    ),
  },
  'Engagement': {
    color: '#0284c7',
    bg: 'linear-gradient(135deg,#e0f2fe,#f0f9ff)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <circle cx="16" cy="18" r="8" stroke="#0284c7" strokeWidth="2.8" />
        <path d="M12 9H20L22 12L16 15L10 12L12 9Z" fill="#38bdf8" />
        <circle cx="16" cy="8" r="2" fill="#f59e0b" />
      </svg>
    ),
  },
  'Housewarming': {
    color: '#16a34a',
    bg: 'linear-gradient(135deg,#dcfce7,#f0fdf4)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <path d="M16 4L4 14H8V26H24V14H28L16 4Z" fill="#86efac" />
        <rect x="13" y="17" width="6" height="9" rx="1" fill="#16a34a" />
        <circle cx="16" cy="10" r="2" fill="#f59e0b" />
      </svg>
    ),
  },
  'Baby Shower': {
    color: '#ec4899',
    bg: 'linear-gradient(135deg,#fce7f3,#fdf2f8)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <path d="M16 6C11 6 7 10 7 15C7 19 10 22 14 22V24C12 24 10 25.5 10 27H22C22 25.5 20 24 18 24V22C22 22 25 19 25 15C25 10 21 6 16 6Z" fill="#f9a8d4" />
        <circle cx="16" cy="14" r="3.5" fill="#ec4899" />
        <circle cx="16" cy="14" r="1.5" fill="#ffffff" />
      </svg>
    ),
  },
  'Anniversary': {
    color: '#dc2626',
    bg: 'linear-gradient(135deg,#fee2e2,#fef2f2)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <path d="M16 26L6 15C3.5 12 4 7.5 8 5.5C12 3.5 14.5 6 16 8C17.5 6 20 3.5 24 5.5C28 7.5 28.5 12 26 15L16 26Z" fill="#f87171" />
        <path d="M12 11C13 9.5 15 10 16 11C17 10 19 9.5 20 11" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  'Corporate': {
    color: '#334155',
    bg: 'linear-gradient(135deg,#e2e8f0,#f8fafc)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <rect x="6" y="8" width="12" height="18" rx="2" fill="#94a3b8" />
        <rect x="18" y="14" width="8" height="12" rx="2" fill="#475569" />
      </svg>
    ),
  },
  'Upanayanam': {
    color: '#d97706',
    bg: 'linear-gradient(135deg,#fef3c7,#fffbeb)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <path d="M16 4C17.5 7 18 9 17 11C16 11.5 15 10 15 8C15 6.5 15.5 5 16 4Z" fill="#ef4444" />
        <circle cx="16" cy="18" r="8" stroke="#d97706" strokeWidth="2.5" />
        <line x1="8" y1="12" x2="24" y2="24" stroke="#b45309" strokeWidth="2" strokeDasharray="2 2" />
      </svg>
    ),
  },
  'Sashtiapthapoorthi': {
    color: '#b45309',
    bg: 'linear-gradient(135deg,#ffedd5,#fff7ed)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <circle cx="16" cy="16" r="11" fill="#fed7aa" />
        <path d="M12 12C12 9 14 7 16 7C18 7 20 9 20 12C20 15 18 16 16 17" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="16" cy="22" r="1.5" fill="#ea580c" />
      </svg>
    ),
  },
  'Ear Piercing': {
    color: '#059669',
    bg: 'linear-gradient(135deg,#d1fae5,#ecfdf5)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <circle cx="16" cy="16" r="7" stroke="#059669" strokeWidth="2.5" fill="#a7f3d0" />
        <circle cx="16" cy="16" r="2.5" fill="#d97706" />
      </svg>
    ),
  },
  'Puberty Ceremony': {
    color: '#db2777',
    bg: 'linear-gradient(135deg,#fce7f3,#fdf2f8)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <path d="M16 6C11 10 9 15 9 22H23C23 15 21 10 16 6Z" fill="#f472b6" />
        <circle cx="16" cy="5" r="2" fill="#f59e0b" />
      </svg>
    ),
  },
  'Festival & Pooja': {
    color: '#ea580c',
    bg: 'linear-gradient(135deg,#ffedd5,#fff7ed)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <path d="M10 20C10 16 16 11 16 11C16 11 22 16 22 20C22 23 19 25 16 25C13 25 10 23 10 20Z" fill="#fb923c" />
        <circle cx="16" cy="7" r="2" fill="#ef4444" />
      </svg>
    ),
  },
}

export const LABOUR_META = {
  'All Labour': {
    color: '#7c3aed',
    bg: 'linear-gradient(135deg,#ede9fe,#f5f3ff)',
    svg: (s = 28) => ICONS.grid(s, '#7c3aed'),
  },
  'Food & Panthi Servers': {
    color: '#ea580c',
    bg: 'linear-gradient(135deg,#ffedd5,#fff7ed)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <path d="M5 21C5 15.5 9.5 11 16 11C22.5 11 27 15.5 27 21H5Z" fill="#fb923c" />
        <line x1="3" y1="23" x2="29" y2="23" stroke="#c2410c" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="16" cy="8.5" r="2.5" fill="#ea580c" />
      </svg>
    ),
  },
  'Kitchen Helpers & Cutters': {
    color: '#ca8a04',
    bg: 'linear-gradient(135deg,#fef9c3,#fefce8)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <path d="M7 10L14 17L12 19L5 12L7 10Z" fill="#facc15" />
        <path d="M12 15L25 7L27 9L15 21L12 15Z" fill="#a16207" />
        <circle cx="20" cy="22" r="4" fill="#ca8a04" />
      </svg>
    ),
  },
  'Dishwashers & Vessel Cleaners': {
    color: '#0284c7',
    bg: 'linear-gradient(135deg,#e0f2fe,#f0f9ff)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <circle cx="16" cy="16" r="10" stroke="#0284c7" strokeWidth="2.5" fill="#bae6fd" />
        <path d="M11 16C11 13.5 13.5 11 16 11" stroke="#0369a1" strokeWidth="2" strokeLinecap="round" />
        <circle cx="21" cy="11" r="1.5" fill="#38bdf8" />
      </svg>
    ),
  },
  'Cleaning Staff': {
    color: '#0891b2',
    bg: 'linear-gradient(135deg,#cffafe,#ecfeff)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <path d="M18 5L9 20H15L13 27L23 12H17L18 5Z" fill="#38bdf8" />
        <circle cx="24" cy="7" r="1.8" fill="#f59e0b" />
      </svg>
    ),
  },
  'Panthal & Shamiana Riggers': {
    color: '#c2410c',
    bg: 'linear-gradient(135deg,#ffedd5,#fff7ed)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <path d="M16 6L5 25H27L16 6Z" fill="#fb923c" />
        <path d="M16 6V25" stroke="#9a3412" strokeWidth="2" />
      </svg>
    ),
  },
  'Setup & Furniture Crew': {
    color: '#4f46e5',
    bg: 'linear-gradient(135deg,#e0e7ff,#eef2ff)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <rect x="7" y="7" width="18" height="12" rx="3" fill="#818cf8" />
        <line x1="10" y1="19" x2="10" y2="26" stroke="#4f46e5" strokeWidth="2.8" strokeLinecap="round" />
        <line x1="22" y1="19" x2="22" y2="26" stroke="#4f46e5" strokeWidth="2.8" strokeLinecap="round" />
      </svg>
    ),
  },
  'Valet Parking & Marshals': {
    color: '#2563eb',
    bg: 'linear-gradient(135deg,#dbeafe,#eff6ff)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <rect x="6" y="6" width="20" height="20" rx="5" fill="#60a5fa" />
        <path d="M12 21V11H17C18.66 11 20 12.34 20 14C20 15.66 18.66 17 17 17H12" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  'Security & Bouncers': {
    color: '#1e293b',
    bg: 'linear-gradient(135deg,#e2e8f0,#f8fafc)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <path d="M16 4L6 8V16C6 22 10.5 26.5 16 28C21.5 26.5 26 22 26 16V8L16 4Z" fill="#334155" />
        <path d="M12 16L15 19L20 13" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  'Hospitality & Thamboolam Staff': {
    color: '#059669',
    bg: 'linear-gradient(135deg,#d1fae5,#ecfdf5)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <circle cx="16" cy="10" r="5" fill="#6ee7b7" />
        <path d="M8 25C8 21 11.5 18 16 18C20.5 18 24 21 24 25" stroke="#059669" strokeWidth="2.8" strokeLinecap="round" />
        <circle cx="16" cy="10" r="2" fill="#ffffff" />
      </svg>
    ),
  },
  'Luggage & Room Attendants': {
    color: '#d97706',
    bg: 'linear-gradient(135deg,#fef3c7,#fffbeb)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <rect x="6" y="10" width="20" height="15" rx="3" fill="#fcd34d" />
        <path d="M12 10V7C12 5.9 12.9 5 14 5H18C19.1 5 20 5.9 20 7V10" stroke="#b45309" strokeWidth="2" fill="none" />
        <circle cx="10" cy="25" r="1.5" fill="#b45309" />
        <circle cx="22" cy="25" r="1.5" fill="#b45309" />
      </svg>
    ),
  },
  'Sound, Light & Generator Crew': {
    color: '#9333ea',
    bg: 'linear-gradient(135deg,#f3e8ff,#faf5ff)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <circle cx="16" cy="16" r="10" fill="#d8b4fe" />
        <path d="M16 8V24M8 16H24" stroke="#9333ea" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="16" cy="16" r="3" fill="#ffffff" />
      </svg>
    ),
  },
  'Flower & Garland Helpers': {
    color: '#16a34a',
    bg: 'linear-gradient(135deg,#dcfce7,#f0fdf4)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <circle cx="16" cy="12" r="4" fill="#f43f5e" />
        <circle cx="12" cy="18" r="4" fill="#fb7185" />
        <circle cx="20" cy="18" r="4" fill="#fb7185" />
        <circle cx="16" cy="16" r="2" fill="#fbbf24" />
      </svg>
    ),
  },
  'Pooja & Homam Assistants': {
    color: '#ea580c',
    bg: 'linear-gradient(135deg,#ffedd5,#fff7ed)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <path d="M16 5C17.5 8 18 10 17 12C16 12.5 15 11 15 9C15 7.5 15.5 6 16 5Z" fill="#ef4444" />
        <path d="M8 24H24L20 16H12L8 24Z" fill="#fdba74" />
        <rect x="6" y="24" width="20" height="3" rx="1.5" fill="#ea580c" />
      </svg>
    ),
  },
  // Legacy aliases for backward compatibility
  'Food Servers': {
    color: '#ea580c',
    bg: 'linear-gradient(135deg,#ffedd5,#fff7ed)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <path d="M5 21C5 15.5 9.5 11 16 11C22.5 11 27 15.5 27 21H5Z" fill="#fb923c" />
        <line x1="3" y1="23" x2="29" y2="23" stroke="#c2410c" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="16" cy="8.5" r="2.5" fill="#ea580c" />
      </svg>
    ),
  },
  'Setup Crew': {
    color: '#4f46e5',
    bg: 'linear-gradient(135deg,#e0e7ff,#eef2ff)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <rect x="7" y="7" width="18" height="12" rx="3" fill="#818cf8" />
        <line x1="10" y1="19" x2="10" y2="26" stroke="#4f46e5" strokeWidth="2.8" strokeLinecap="round" />
        <line x1="22" y1="19" x2="22" y2="26" stroke="#4f46e5" strokeWidth="2.8" strokeLinecap="round" />
      </svg>
    ),
  },
  'Event Helpers': {
    color: '#d97706',
    bg: 'linear-gradient(135deg,#fef3c7,#fffbeb)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <rect x="6" y="10" width="20" height="16" rx="2" fill="#fcd34d" />
        <path d="M6 15H26" stroke="#b45309" strokeWidth="2" />
        <path d="M16 10V26" stroke="#b45309" strokeWidth="2" />
      </svg>
    ),
  },
  'Panthal Staff': {
    color: '#c2410c',
    bg: 'linear-gradient(135deg,#ffedd5,#fff7ed)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <path d="M16 6L5 25H27L16 6Z" fill="#fb923c" />
        <path d="M16 6V25" stroke="#9a3412" strokeWidth="2" />
      </svg>
    ),
  },
  'Hospitality Staff': {
    color: '#059669',
    bg: 'linear-gradient(135deg,#d1fae5,#ecfdf5)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <circle cx="16" cy="10" r="5" fill="#6ee7b7" />
        <path d="M8 25C8 21 11.5 18 16 18C20.5 18 24 21 24 25" stroke="#059669" strokeWidth="2.8" strokeLinecap="round" />
        <circle cx="16" cy="10" r="2" fill="#ffffff" />
      </svg>
    ),
  },
  'Makeup & Hair': {
    color: '#ec4899',
    bg: 'linear-gradient(135deg,#fce7f3,#fdf2f8)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <path d="M12 4C8.686 4 6 6.686 6 10C6 14.5 10 18 10 24H14C14 18 18 14.5 18 10C18 6.686 15.314 4 12 4Z" fill="#f472b6" />
        <circle cx="22" cy="18" r="5" fill="#fbcfe8" />
        <path d="M22 13V23M17 18H27" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="10" r="2" fill="#ffffff" />
      </svg>
    ),
  },
  'Makeup': {
    color: '#ec4899',
    bg: 'linear-gradient(135deg,#fce7f3,#fdf2f8)',
    svg: (s = 28) => (
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className="icon-svg">
        <path d="M12 4C8.686 4 6 6.686 6 10C6 14.5 10 18 10 24H14C14 18 18 14.5 18 10C18 6.686 15.314 4 12 4Z" fill="#f472b6" />
        <circle cx="22" cy="18" r="5" fill="#fbcfe8" />
        <path d="M22 13V23M17 18H27" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="10" r="2" fill="#ffffff" />
      </svg>
    ),
  },
}
