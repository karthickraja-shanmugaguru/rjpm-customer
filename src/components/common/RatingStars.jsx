import React from 'react'
import { ICONS } from '../../constants/icons'

export const RatingStars = ({ rating = 5 }) => {
  const rounded = Math.round(Number(rating) || 5)
  return (
    <span className="stars" aria-label={`${rating} stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ opacity: i < rounded ? 1 : 0.25 }}>
          {ICONS.star(14)}
        </span>
      ))}
    </span>
  )
}
