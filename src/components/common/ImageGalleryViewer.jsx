import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  X,
  Sparkles,
  Camera,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Layers,
} from 'lucide-react'

export const ImageGalleryViewer = ({
  images = [],
  title = 'Service Photo',
  categoryTag = '',
  aspectRatio = '4 / 5',
  maxHeight = 520,
}) => {
  // Normalize and clean image list
  const validImages = React.useMemo(() => {
    const list = Array.isArray(images) ? images.filter(Boolean) : []
    return list.length > 0
      ? list
      : ['https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80']
  }, [images])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [fitMode, setFitMode] = useState('cover') // 'cover' or 'contain'
  const [zoomLevel, setZoomLevel] = useState(1) // 1x, 1.5x, 2x, 2.5x
  const [touchStart, setTouchStart] = useState(null)

  const thumbnailScrollRef = useRef(null)
  const lightboxThumbRef = useRef(null)

  // Clamp index if list changes
  useEffect(() => {
    if (currentIndex >= validImages.length) {
      setCurrentIndex(0)
    }
  }, [validImages.length, currentIndex])

  // Reset zoom level whenever active image changes or lightbox opens/closes
  useEffect(() => {
    setZoomLevel(1)
  }, [currentIndex, isLightboxOpen])

  const handlePrev = useCallback(
    (e) => {
      if (e) e.stopPropagation()
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : validImages.length - 1))
    },
    [validImages.length]
  )

  const handleNext = useCallback(
    (e) => {
      if (e) e.stopPropagation()
      setCurrentIndex((prev) => (prev < validImages.length - 1 ? prev + 1 : 0))
    },
    [validImages.length]
  )

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    if (thumbnailScrollRef.current) {
      const activeEl = thumbnailScrollRef.current.children[currentIndex]
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        })
      }
    }
    if (lightboxThumbRef.current) {
      const activeEl = lightboxThumbRef.current.children[currentIndex]
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        })
      }
    }
  }, [currentIndex, isLightboxOpen])

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false)
      } else if (e.key === 'ArrowLeft') {
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      } else if (e.key === '+' || e.key === '=') {
        setZoomLevel((z) => Math.min(2.5, +(z + 0.5).toFixed(1)))
      } else if (e.key === '-') {
        setZoomLevel((z) => Math.max(1, +(z - 0.5).toFixed(1)))
      } else if (e.key === '0') {
        setZoomLevel(1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isLightboxOpen, handlePrev, handleNext])

  // Touch Swipe for mobile gestures
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e) => {
    if (touchStart === null) return
    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext()
      } else {
        handlePrev()
      }
    }
    setTouchStart(null)
  }

  const scrollThumbnails = (direction) => {
    if (thumbnailScrollRef.current) {
      const amount = direction === 'left' ? -220 : 220
      thumbnailScrollRef.current.scrollBy({ left: amount, behavior: 'smooth' })
    }
  }

  const currentImg = validImages[currentIndex] || validImages[0]

  return (
    <div style={{ width: '100%', maxWidth: 480, margin: '0 auto' }}>
      {/* Main Interactive Stage */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: aspectRatio,
          maxHeight: maxHeight,
          borderRadius: 20,
          overflow: 'hidden',
          backgroundColor: '#0b1120',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
          cursor: 'pointer',
          userSelect: 'none',
        }}
        onClick={() => setIsLightboxOpen(true)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Blurred ambient background when in contain mode */}
        {fitMode === 'contain' && (
          <div
            style={{
              position: 'absolute',
              inset: -20,
              backgroundImage: `url(${currentImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(25px) brightness(0.6)',
              transform: 'scale(1.15)',
              opacity: 0.8,
            }}
          />
        )}

        {/* Main Display Image */}
        <img
          src={currentImg}
          alt={`${title} - photo ${currentIndex + 1}`}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            objectFit: fitMode,
            display: 'block',
            transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: 1,
          }}
          onError={(e) => {
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80'
          }}
        />

        {/* Category Pill Tag (top-left) */}
        {categoryTag && (
          <span
            style={{
              position: 'absolute',
              top: 14,
              left: 14,
              background: 'rgba(255, 255, 255, 0.94)',
              backdropFilter: 'blur(8px)',
              padding: '5px 12px',
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 700,
              color: '#1e293b',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
              zIndex: 3,
            }}
          >
            <Sparkles size={13} color="var(--primary, #1a73e8)" /> {categoryTag}
          </span>
        )}

        {/* Action Controls (top-right): Fit Mode & Fullscreen */}
        <div
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            zIndex: 3,
          }}
        >
          {/* Fit / Fill toggle button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setFitMode((m) => (m === 'cover' ? 'contain' : 'cover'))
            }}
            title={fitMode === 'cover' ? 'Switch to Fit (show full uncropped image)' : 'Switch to Fill (cover 4:5)'}
            style={{
              height: 34,
              padding: '0 10px',
              borderRadius: 17,
              background: 'rgba(15, 23, 42, 0.72)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.18s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(15, 23, 42, 0.9)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(15, 23, 42, 0.72)'
            }}
          >
            <Layers size={13} />
            {fitMode === 'cover' ? 'Fit' : 'Fill'}
          </button>

          {/* Fullscreen Trigger */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setIsLightboxOpen(true)
            }}
            title="Expand to Fullscreen Lightbox"
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: 'rgba(15, 23, 42, 0.72)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#ffffff',
              display: 'grid',
              placeItems: 'center',
              cursor: 'pointer',
              transition: 'all 0.18s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.08)'
              e.currentTarget.style.background = 'rgba(15, 23, 42, 0.9)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.background = 'rgba(15, 23, 42, 0.72)'
            }}
          >
            <Maximize2 size={15} />
          </button>
        </div>

        {/* Counter Badge (bottom-right) */}
        {validImages.length > 1 && (
          <span
            style={{
              position: 'absolute',
              bottom: 14,
              right: 14,
              background: 'rgba(15, 23, 42, 0.76)',
              backdropFilter: 'blur(8px)',
              color: '#ffffff',
              padding: '5px 12px',
              borderRadius: 16,
              fontSize: 11,
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              letterSpacing: '0.4px',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              zIndex: 3,
            }}
          >
            <Camera size={13} /> {currentIndex + 1} / {validImages.length}
          </span>
        )}

        {/* Previous / Next Floating Arrow Buttons */}
        {validImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous photo"
              style={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(8px)',
                border: 'none',
                color: '#1e293b',
                display: 'grid',
                placeItems: 'center',
                boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
                zIndex: 3,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.12)'
                e.currentTarget.style.background = '#ffffff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.92)'
              }}
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next photo"
              style={{
                position: 'absolute',
                right: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(8px)',
                border: 'none',
                color: '#1e293b',
                display: 'grid',
                placeItems: 'center',
                boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
                zIndex: 3,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.12)'
                e.currentTarget.style.background = '#ffffff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.92)'
              }}
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Navigation Row (Clean without OS scrollbar) */}
      {validImages.length > 1 && (
        <div style={{ marginTop: 12, position: 'relative' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 8,
              padding: '0 2px',
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text, #1e293b)' }}>
              Work Photos ({validImages.length})
            </span>
            <span style={{ fontSize: 12, color: 'var(--muted, #64748b)' }}>
              Click to preview
            </span>
          </div>

          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            {/* Scroll Left Button */}
            {validImages.length > 5 && (
              <button
                type="button"
                onClick={() => scrollThumbnails('left')}
                aria-label="Scroll left"
                style={{
                  position: 'absolute',
                  left: -10,
                  zIndex: 4,
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.96)',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 3px 8px rgba(0,0,0,0.14)',
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer',
                  color: '#1e293b',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <ChevronLeft size={16} />
              </button>
            )}

            {/* Scrollable Thumbnails Strip with NO OS SCROLLBAR */}
            <div
              ref={thumbnailScrollRef}
              className="hide-scrollbar"
              style={{
                display: 'flex',
                gap: 10,
                overflowX: 'auto',
                overflowY: 'hidden',
                padding: '4px 2px 8px',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                width: '100%',
                scrollBehavior: 'smooth',
              }}
            >
              {validImages.map((imgUrl, i) => {
                const isActive = i === currentIndex
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrentIndex(i)}
                    style={{
                      width: 62,
                      height: 78,
                      aspectRatio: '4 / 5',
                      flexShrink: 0,
                      borderRadius: 10,
                      backgroundImage: `url(${imgUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      cursor: 'pointer',
                      border: isActive
                        ? '2.5px solid var(--primary, #1a73e8)'
                        : '1.5px solid rgba(226, 232, 240, 0.9)',
                      boxShadow: isActive
                        ? '0 0 0 3px rgba(26, 115, 232, 0.25), 0 4px 10px rgba(0,0,0,0.12)'
                        : 'none',
                      transform: isActive ? 'scale(1.05)' : 'scale(1)',
                      transition: 'all 0.18s ease',
                      opacity: isActive ? 1 : 0.72,
                      padding: 0,
                    }}
                    title={`View photo ${i + 1}`}
                  />
                )
              })}
            </div>

            {/* Scroll Right Button */}
            {validImages.length > 5 && (
              <button
                type="button"
                onClick={() => scrollThumbnails('right')}
                aria-label="Scroll right"
                style={{
                  position: 'absolute',
                  right: -10,
                  zIndex: 4,
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.96)',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 3px 8px rgba(0,0,0,0.14)',
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer',
                  color: '#1e293b',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'rgba(6, 10, 20, 0.96)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '20px 24px',
            animation: 'fadeIn 0.2s ease',
          }}
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Lightbox Top Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#ffffff',
              zIndex: 10,
              gap: 16,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#f8fafc' }}>{title}</div>
              <div style={{ fontSize: 13, color: '#94a3b8' }}>
                Photo {currentIndex + 1} of {validImages.length}
                {zoomLevel > 1 && ` • ${Math.round(zoomLevel * 100)}% Zoom`}
              </div>
            </div>

            {/* Lightbox Action Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {/* Zoom Out */}
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(1, +(z - 0.5).toFixed(1)))}
                disabled={zoomLevel <= 1}
                title="Zoom Out (-)"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.12)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  display: 'grid',
                  placeItems: 'center',
                  cursor: zoomLevel <= 1 ? 'not-allowed' : 'pointer',
                  opacity: zoomLevel <= 1 ? 0.4 : 1,
                  transition: 'background 0.2s',
                }}
              >
                <ZoomOut size={18} />
              </button>

              {/* Zoom Reset / In */}
              {zoomLevel > 1 ? (
                <button
                  type="button"
                  onClick={() => setZoomLevel(1)}
                  title="Reset Zoom (0)"
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.12)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    display: 'grid',
                    placeItems: 'center',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                >
                  <RotateCcw size={17} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(2.5, +(z + 0.5).toFixed(1)))}
                  title="Zoom In (+)"
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.12)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    display: 'grid',
                    placeItems: 'center',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                >
                  <ZoomIn size={18} />
                </button>
              )}

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                title="Close Lightbox (Esc)"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: '#ffffff',
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239, 68, 68, 0.8)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)')}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Lightbox Center Stage with Prev & Next */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              padding: '16px 0',
              overflow: 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {validImages.length > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                style={{
                  position: 'absolute',
                  left: 20,
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.16)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#ffffff',
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer',
                  zIndex: 20,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.35)'
                  e.currentTarget.style.transform = 'scale(1.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.16)'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
                title="Previous (Left arrow)"
              >
                <ChevronLeft size={26} />
              </button>
            )}

            {/* Lightbox High-res Display Image */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                cursor: zoomLevel > 1 ? 'zoom-out' : 'zoom-in',
              }}
              onClick={() => setZoomLevel((z) => (z > 1 ? 1 : 1.8))}
              title={zoomLevel > 1 ? 'Click to reset zoom' : 'Click to zoom in'}
            >
              <img
                src={currentImg}
                alt={`${title} - full preview`}
                style={{
                  maxWidth: '85vw',
                  maxHeight: '74vh',
                  objectFit: 'contain',
                  borderRadius: 14,
                  boxShadow: '0 25px 70px rgba(0, 0, 0, 0.7)',
                  userSelect: 'none',
                  transform: `scale(${zoomLevel})`,
                  transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            </div>

            {validImages.length > 1 && (
              <button
                type="button"
                onClick={handleNext}
                style={{
                  position: 'absolute',
                  right: 20,
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.16)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#ffffff',
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer',
                  zIndex: 20,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.35)'
                  e.currentTarget.style.transform = 'scale(1.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.16)'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
                title="Next (Right arrow)"
              >
                <ChevronRight size={26} />
              </button>
            )}
          </div>

          {/* Bottom Thumbnails inside Lightbox */}
          {validImages.length > 1 && (
            <div
              ref={lightboxThumbRef}
              className="hide-scrollbar"
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 8,
                overflowX: 'auto',
                overflowY: 'hidden',
                paddingTop: 8,
                zIndex: 10,
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {validImages.map((imgUrl, i) => {
                const isActive = i === currentIndex
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrentIndex(i)}
                    style={{
                      width: 52,
                      height: 65,
                      aspectRatio: '4 / 5',
                      flexShrink: 0,
                      borderRadius: 8,
                      backgroundImage: `url(${imgUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      cursor: 'pointer',
                      border: isActive
                        ? '2px solid #38bdf8'
                        : '1px solid rgba(255, 255, 255, 0.25)',
                      opacity: isActive ? 1 : 0.45,
                      transform: isActive ? 'scale(1.08)' : 'scale(1)',
                      transition: 'all 0.15s ease',
                      padding: 0,
                    }}
                    title={`Go to photo ${i + 1}`}
                  />
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
