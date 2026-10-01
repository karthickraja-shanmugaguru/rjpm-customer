import React from 'react'

export const ICONS = {
  logo: (size = 40) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className="icon-svg">
      <defs>
        <linearGradient id="evLgBg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
        <linearGradient id="evLgStar" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="12" fill="url(#evLgBg)" />
      <rect x="0.5" y="0.5" width="39" height="39" rx="11.5" stroke="rgba(255,255,255,0.25)" />
      <text x="44%" y="67%" textAnchor="middle" dominantBaseline="middle" fill="#ffffff" fontSize="22" fontWeight="800" fontFamily="Plus Jakarta Sans, Inter, system-ui, sans-serif">R</text>
      <path d="M28 7L29.2 10.4L32.6 11.6L29.2 12.8L28 16.2L26.8 12.8L23.4 11.6L26.8 10.4L28 7Z" fill="url(#evLgStar)" />
    </svg>
  ),

  search: (size = 20, color = 'currentColor') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="icon-svg">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.5" y2="16.5" />
    </svg>
  ),

  mapPin: (size = 20, color = 'currentColor') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="icon-svg">
      <path d="M12 21C16 16.5 20 13 20 9A8 8 0 1 0 4 9C4 13 8 16.5 12 21Z" />
      <circle cx="12" cy="9" r="3" />
    </svg>
  ),

  chevronDown: (size = 18, color = 'currentColor') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="icon-svg">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),

  chevronRight: (size = 18, color = 'currentColor') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="icon-svg">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),

  chevronLeft: (size = 18, color = 'currentColor') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="icon-svg">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),

  arrowRight: (size = 18, color = 'currentColor') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="icon-svg">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),

  heart: (size = 20, color = 'currentColor') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-svg">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),

  heartFilled: (size = 20, color = '#d93025') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="1" className="icon-svg">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),

  calendar: (size = 20, color = 'currentColor') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="icon-svg">
      <rect x="3" y="4" width="18" height="18" rx="4" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <circle cx="8" cy="15" r="1" fill="currentColor" />
      <circle cx="12" cy="15" r="1" fill="currentColor" />
      <circle cx="16" cy="15" r="1" fill="currentColor" />
    </svg>
  ),

  user: (size = 20, color = 'currentColor') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="icon-svg">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),

  bell: (size = 20, color = 'currentColor') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="icon-svg">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),

  settings: (size = 20, color = 'currentColor') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="icon-svg">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),

  help: (size = 20, color = 'currentColor') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="icon-svg">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),

  logout: (size = 20, color = 'currentColor') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="icon-svg">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),

  star: (size = 15) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1" className="icon-svg">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),

  verifiedBadge: (size = 14) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="icon-svg">
      <path d="M12 2L15.09 4.26L18.88 4.65L20.21 8.22L23 10.82L22.18 14.54L23.27 18.18L19.78 19.86L17.77 23.09L14 22.5L12 24L10 22.5L6.23 23.09L4.22 19.86L0.73 18.18L1.82 14.54L1 10.82L3.79 8.22L5.12 4.65L8.91 4.26L12 2Z" fill="#188038" />
      <polyline points="8 12 11 15 16 9" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  check: (size = 18, color = 'currentColor') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="icon-svg">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),

  phone: (size = 18, color = 'currentColor') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="icon-svg">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),

  share: (size = 18, color = 'currentColor') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="icon-svg">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  ),

  filter: (size = 16, color = 'currentColor') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="icon-svg">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  ),

  grid: (size = 20, color = 'currentColor') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-svg">
      <rect x="3" y="3" width="7" height="7" rx="2" />
      <rect x="14" y="3" width="7" height="7" rx="2" />
      <rect x="14" y="14" width="7" height="7" rx="2" />
      <rect x="3" y="14" width="7" height="7" rx="2" />
    </svg>
  ),

  shop: (size = 18, color = 'currentColor') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="icon-svg">
      <path d="M3 9l1.5-6h15L21 9v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M3 9h18" />
      <path d="M10 13a2 2 0 0 0 4 0" />
    </svg>
  ),

  homeNav: (size = 22) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="icon-svg">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),

  exploreNav: (size = 22) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="icon-svg">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
}

export const RAJAPALAYAM_DOODLES = {
  // 1. The Royal Rajapalayam Hound (ராஜபாளையம் நாய்)
  hound: (size = 48) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="houndBody" x1="20" y1="10" x2="60" y2="70">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f1f5f9" />
        </linearGradient>
        <radialGradient id="houndNose" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fda4af" />
          <stop offset="100%" stopColor="#e11d48" />
        </radialGradient>
      </defs>
      <circle cx="40" cy="40" r="38" fill="#fdf2f4" stroke="#fecdd3" strokeWidth="1.5" />
      <path
        d="M26 68C26 56 31 46 36 38L38 24C38 21 41 18 45 18H52C58 18 64 22 66 28L68 34C68.5 35.5 67 37 65.5 37H57L50 46C48 49 48 57 49 68H26Z"
        fill="url(#houndBody)"
        stroke="#64748b"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M38 24C34 26 31 31 32 37C32.5 40 35 42 37 40C38 39 39 34 38 24Z"
        fill="#ffe4e6"
        stroke="#e2e8f0"
        strokeWidth="1.5"
      />
      <ellipse cx="67" cy="33" rx="3.5" ry="2.8" fill="url(#houndNose)" />
      <circle cx="68" cy="32" r="0.8" fill="#fff" />
      <ellipse cx="49" cy="25" rx="2.5" ry="2" fill="#d97706" />
      <circle cx="49.5" cy="24.5" r="0.8" fill="#ffffff" />
      <path d="M46 22C48 21 51 21.5 53 23" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M36 49L49 53" stroke="#8b1e3f" strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="42.5" cy="51" r="3.2" fill="#f59e0b" stroke="#8b1e3f" strokeWidth="1" />
      <circle cx="42.5" cy="51" r="1.2" fill="#fff" />
      <path d="M63 35L67 37" stroke="#cbd5e1" strokeWidth="1" strokeLinecap="round" />
      <path d="M62 33L67 34" stroke="#cbd5e1" strokeWidth="1" strokeLinecap="round" />
      <path d="M47 8L49 13L54 14L49 16L47 21L45 16L40 14L45 13L47 8Z" fill="#f59e0b" />
    </svg>
  ),

  // 2. Surgical Cotton City Pod (பருத்தி நகரம்)
  cotton: (size = 48) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="cottonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="85%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </radialGradient>
      </defs>
      <circle cx="40" cy="40" r="38" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1.5" />
      <path d="M40 70C40 58 40 50 40 46" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M40 60C45 57 52 58 55 52C55 58 47 64 40 64" fill="#10b981" />
      <path d="M26 48C30 42 36 44 40 46C44 44 50 42 54 48C48 54 32 54 26 48Z" fill="#b45309" stroke="#78350f" strokeWidth="1" />
      <path d="M33 46L24 38C26 42 30 44 33 46Z" fill="#92400e" />
      <path d="M47 46L56 38C54 42 50 44 47 46Z" fill="#92400e" />
      <circle cx="32" cy="34" r="12" fill="url(#cottonGlow)" stroke="#cbd5e1" strokeWidth="1.2" />
      <circle cx="48" cy="34" r="12" fill="url(#cottonGlow)" stroke="#cbd5e1" strokeWidth="1.2" />
      <circle cx="40" cy="24" r="12" fill="url(#cottonGlow)" stroke="#cbd5e1" strokeWidth="1.2" />
      <circle cx="40" cy="33" r="10" fill="#ffffff" />
      <path d="M30 33C32 30 36 31 36 34" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M44 32C46 29 50 30 50 33" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M38 23C40 20 44 21 43 25" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="21" cy="22" r="2" fill="#047857" />
      <path d="M59 18L61 22L65 23L61 24L59 28L57 24L53 23L57 22L59 18Z" fill="#f59e0b" />
    </svg>
  ),

  // 3. Sanjeevi Hills & Ayyanar Waterfalls (சஞ்சீவி மலை)
  sanjeevi: (size = 48) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="38" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1.5" />
      <circle cx="40" cy="26" r="11" fill="#f59e0b" opacity="0.9" />
      <path d="M40 10V14M40 38V42M24 26H28M52 26H56" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 60L32 30L48 50L68 24L74 60H12Z" fill="#065f46" opacity="0.4" />
      <path d="M10 65L28 34L44 54L56 38L70 65H10Z" fill="#047857" />
      <path d="M16 66L35 40L50 66H16Z" fill="#059669" />
      <path d="M35 40C34 46 36 52 35 58C34 62 33 66 33 66" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
      <path d="M37 45C36 50 38 56 37 66" stroke="#e0f2fe" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M22 64C27 62 33 65 38 64C43 63 50 65 56 64" stroke="#6ee7b7" strokeWidth="2" strokeLinecap="round" />
      <path d="M48 20C48 18 51 16 54 17C57 15 62 17 62 20C65 20 67 22 66 25C65 26 50 26 48 25C47 23 47 21 48 20Z" fill="#ffffff" opacity="0.8" />
    </svg>
  ),

  // 4. Rajapalayam Sappatai Mango (சப்படை மாம்பழம்)
  mango: (size = 48) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sappataiGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="30%" stopColor="#f59e0b" />
          <stop offset="80%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#b91c1c" />
        </radialGradient>
      </defs>
      <circle cx="40" cy="40" r="38" fill="#fffbeb" stroke="#fde68a" strokeWidth="1.5" />
      <path d="M40 22C40 16 42 13 46 11" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M40 20C46 14 56 16 60 21C58 27 49 28 40 20Z" fill="#10b981" stroke="#047857" strokeWidth="1.2" />
      <path d="M43 19C48 18 53 19 57 21" stroke="#a7f3d0" strokeWidth="1" strokeLinecap="round" />
      <path d="M38 21C32 15 22 17 19 22C21 28 30 28 38 21Z" fill="#059669" stroke="#047857" strokeWidth="1.2" />
      <path d="M40 22C52 23 63 32 63 46C63 60 48 68 37 66C24 64 19 52 21 40C23 28 31 22 40 22Z" fill="url(#sappataiGrad)" stroke="#b45309" strokeWidth="1.5" />
      <path d="M28 33C29 27 34 25 39 25" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
      <circle cx="28" cy="38" r="1.5" fill="#ffffff" opacity="0.7" />
      <path d="M57 56L58 59L61 60L58 61L57 64L56 61L53 60L56 59L57 56Z" fill="#d97706" />
    </svg>
  ),

  // 5. Andal Gopuram (ஸ்ரீவில்லிபுத்தூர் / ஆண்டாள் கோபுரம்)
  gopuram: (size = 48) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gopuramGold" x1="20" y1="10" x2="60" y2="70">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="40%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#8b1e3f" />
        </linearGradient>
      </defs>
      <circle cx="40" cy="40" r="38" fill="#fff7ed" stroke="#fed7aa" strokeWidth="1.5" />
      <circle cx="34" cy="14" r="1.8" fill="#d97706" />
      <circle cx="40" cy="12" r="2.2" fill="#f59e0b" />
      <circle cx="46" cy="14" r="1.8" fill="#d97706" />
      <line x1="31" y1="16" x2="49" y2="16" stroke="#b45309" strokeWidth="1.8" strokeLinecap="round" />
      <polygon points="33,16 47,16 45,23 35,23" fill="#8b1e3f" stroke="#d97706" strokeWidth="1" />
      <polygon points="31,23 49,23 48,31 32,31" fill="#9f1239" stroke="#d97706" strokeWidth="1" />
      <polygon points="29,31 51,31 50,40 30,40" fill="#8b1e3f" stroke="#d97706" strokeWidth="1" />
      <polygon points="26,40 54,40 53,50 27,50" fill="#9f1239" stroke="#d97706" strokeWidth="1" />
      <rect x="23" y="50" width="34" height="17" rx="1.5" fill="#8b1e3f" stroke="#d97706" strokeWidth="1.2" />
      <path d="M34 67V57C34 53.5 46 53.5 46 57V67H34Z" fill="#fef3c7" stroke="#b45309" strokeWidth="1" />
      <circle cx="40" cy="27" r="1.5" fill="#fef08a" />
      <circle cx="40" cy="35" r="2" fill="#fef08a" />
      <circle cx="40" cy="45" r="2" fill="#fef08a" />
      <path d="M18 26L20 30L24 31L20 32L18 36L16 32L12 31L16 30L18 26Z" fill="#f59e0b" />
      <path d="M62 26L64 30L68 31L64 32L62 36L60 32L56 31L60 30L62 26Z" fill="#f59e0b" />
    </svg>
  ),

  // 6. Mangala Kuthuvilakku (மங்கள குத்துவிளக்கு & முகூர்த்தம்)
  kuthuvilakku: (size = 48) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="lampFlame" cx="50%" cy="70%" r="60%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="45%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ef4444" />
        </radialGradient>
        <linearGradient id="brassGrad" x1="30" y1="15" x2="50" y2="70">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>
      <circle cx="40" cy="40" r="38" fill="#fefce8" stroke="#fef08a" strokeWidth="1.5" />
      <path d="M40 18C42 16 43 14 42 12C39 12 38 15 40 18Z" fill="#b45309" />
      <circle cx="40" cy="18" r="2.5" fill="#f59e0b" />
      <path d="M40 22C42 27 45 28 40 35C35 28 38 27 40 22Z" fill="url(#lampFlame)" />
      <path d="M30 33C31 36 33 37 30 41C27 37 29 36 30 33Z" fill="url(#lampFlame)" />
      <path d="M50 33C51 36 53 37 50 41C47 37 49 36 50 33Z" fill="url(#lampFlame)" />
      <ellipse cx="40" cy="42" rx="17" ry="5.5" fill="url(#brassGrad)" stroke="#78350f" strokeWidth="1.2" />
      <ellipse cx="40" cy="41" rx="14" ry="3" fill="#ea580c" />
      <path d="M38 45H42V56H38V45Z" fill="url(#brassGrad)" stroke="#78350f" strokeWidth="1" />
      <circle cx="40" cy="50" r="3.5" fill="#f59e0b" />
      <ellipse cx="40" cy="57" rx="9" ry="3" fill="url(#brassGrad)" stroke="#78350f" strokeWidth="1" />
      <path d="M38 58H42V63H38V58Z" fill="url(#brassGrad)" />
      <path d="M26 68C26 64 33 63 40 63C47 63 54 64 54 68H26Z" fill="url(#brassGrad)" stroke="#78350f" strokeWidth="1.2" />
      <ellipse cx="40" cy="68" rx="15" ry="3" fill="#b45309" />
      <circle cx="28" cy="46" r="2" fill="#ffffff" stroke="#d97706" strokeWidth="0.8" />
      <circle cx="33" cy="49" r="2" fill="#ffffff" stroke="#d97706" strokeWidth="0.8" />
      <circle cx="40" cy="51" r="2.2" fill="#ffffff" stroke="#d97706" strokeWidth="0.8" />
      <circle cx="47" cy="49" r="2" fill="#ffffff" stroke="#d97706" strokeWidth="0.8" />
      <circle cx="52" cy="46" r="2" fill="#ffffff" stroke="#d97706" strokeWidth="0.8" />
    </svg>
  ),
}

export const ILLUSTRATIONS = {
  hero: () => (
    <svg width="280" height="260" viewBox="0 0 280 260" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="hGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1a73e8" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#1a73e8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="hGlass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#dbeafe" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <circle cx="140" cy="130" r="120" fill="url(#hGlow)" />
      {/* Confetti flakes */}
      <circle cx="45" cy="65" r="6" fill="#ec4899" />
      <rect x="65" y="45" width="8" height="14" rx="2" transform="rotate(25 65 45)" fill="#3b82f6" />
      <rect x="220" y="60" width="10" height="10" rx="3" transform="rotate(45 220 60)" fill="#f59e0b" />
      <circle cx="235" cy="110" r="7" fill="#10b981" />
      <rect x="50" y="180" width="8" height="16" rx="2" transform="rotate(-30 50 180)" fill="#8b5cf6" />
      <circle cx="215" cy="195" r="8" fill="#f43f5e" />
      {/* Sparkle stars */}
      <path d="M140 25L143 35L153 38L143 41L140 51L137 41L127 38L137 35L140 25Z" fill="url(#hGold)" />
      <path d="M80 115L82 121L88 123L82 125L80 131L78 125L72 123L78 121L80 115Z" fill="url(#hGold)" />
      <path d="M205 135L207 141L213 143L207 145L205 151L203 145L197 143L203 141L205 135Z" fill="url(#hGold)" />
      {/* Intertwined celebration rings */}
      <circle cx="115" cy="135" r="38" stroke="url(#hGold)" strokeWidth="7" fill="none" />
      <circle cx="165" cy="135" r="38" stroke="#3b82f6" strokeWidth="7" fill="none" />
      {/* Solitaire Diamond on ring */}
      <path d="M115 88L122 97H108L115 88Z" fill="#38bdf8" />
      {/* Celebration Flute */}
      <path d="M165 95L172 125V155H162V158H182V155H172V125L179 95H165Z" fill="url(#hGlass)" stroke="#2563eb" strokeWidth="1.5" />
    </svg>
  ),

  services: () => (
    <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
      <defs>
        <radialGradient id="vSGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8b1e3f" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#8b1e3f" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="75" cy="75" r="65" fill="url(#vSGrad)" />
      <circle cx="75" cy="75" r="50" fill="#ffffff" fillOpacity="0.9" stroke="rgba(139,30,63,0.2)" strokeWidth="2" />
      <path d="M42 85L75 48L108 85H42Z" fill="#fbcfe8" />
      <path d="M75 48V85L91 85L75 48Z" fill="#8b1e3f" />
      <rect x="48" y="85" width="4" height="24" rx="2" fill="#67102a" />
      <rect x="98" y="85" width="4" height="24" rx="2" fill="#67102a" />
      <rect x="73" y="85" width="4" height="24" rx="2" fill="#8b1e3f" />
      <circle cx="75" cy="45" r="4" fill="#f59e0b" />
      <line x1="38" y1="109" x2="112" y2="109" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),

  packages: () => (
    <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
      <defs>
        <radialGradient id="vPGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="75" cy="75" r="65" fill="url(#vPGrad)" />
      <circle cx="75" cy="75" r="50" fill="#ffffff" fillOpacity="0.9" stroke="rgba(245,158,11,0.2)" strokeWidth="2" />
      <rect x="48" y="65" width="54" height="42" rx="6" fill="#fcd34d" />
      <rect x="44" y="58" width="62" height="12" rx="3" fill="#f59e0b" />
      <rect x="70" y="58" width="10" height="49" fill="#dc2626" />
      <path d="M75 58C68 50 60 52 65 44C70 36 75 50 75 58Z" fill="#ef4444" />
      <path d="M75 58C82 50 90 52 85 44C80 36 75 50 75 58Z" fill="#ef4444" />
      <circle cx="75" cy="56" r="3.5" fill="#fef08a" />
    </svg>
  ),

  labour: () => (
    <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
      <defs>
        <radialGradient id="vLGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="75" cy="75" r="65" fill="url(#vLGrad)" />
      <circle cx="75" cy="75" r="50" fill="#ffffff" fillOpacity="0.9" stroke="rgba(124,58,237,0.2)" strokeWidth="2" />
      <path d="M50 75C50 61 61 50 75 50C89 50 100 61 100 75H50Z" fill="#c4b5fd" />
      <rect x="45" y="75" width="60" height="7" rx="3.5" fill="#7c3aed" />
      <path d="M60 88C60 84 66 82 75 82C84 82 90 84 90 88V106H60V88Z" fill="#475569" />
      <path d="M72 82L75 87L78 82" fill="#ffffff" />
      <circle cx="75" cy="46" r="3" fill="#f59e0b" />
    </svg>
  ),
}
