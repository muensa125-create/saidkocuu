'use client'

import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isAnimating, setIsAnimating] = useState(true)
  const [showAIText, setShowAIText] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const addHoverListeners = () => {
      const hoverElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select')
      
      hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => setIsHovering(true))
        element.addEventListener('mouseleave', () => setIsHovering(false))
      })
    }

    // Page load animation - start from top area where heart would be
    const startX = window.innerWidth / 2
    const startY = 200 // Heart sembolünün olduğu alan
    
    setPosition({ x: startX, y: startY })
    
    // Start animation after a short delay
    setTimeout(() => {
      setIsAnimating(false)
      setShowAIText(true)
    }, 2000)

    const observer = new MutationObserver(addHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    addHoverListeners()

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      observer.disconnect()
    }
  }, [])

  const getCursorClass = () => {
    if (isAnimating) return 'cursor-centering'
    if (isClicking) return 'cursor-click'
    if (isHovering) return 'cursor-hover'
    return ''
  }

  return (
    <>
      {/* Altın kalp cursor */}
      <div
        className={`custom-cursor ${getCursorClass()}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) ${isAnimating ? 'scale(0.1)' : isClicking ? 'scale(0.5)' : isHovering ? 'scale(1.2)' : 'scale(0.75)'}`
        }}
      >
        <div className="cursor-heart" />
      </div>
      
      {/* AI Koordinasyon Metni */}
      {showAIText && (
        <div
          className="fixed top-24 right-4 md:right-12 lg:right-24 z-50 text-right animate-fade-in"
        >
          <p className="text-gold text-sm font-serif mb-2">
            Bu test Ordina AI sayesinde oluşturuldu
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=com.saidkocu.ayna"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-gold transition-colors text-xs underline"
          >
            Daha detaylı analiz için tıkla
          </a>
        </div>
      )}
      
      {/* Küçük nokta */}
      <div
        className="cursor-dot"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: isAnimating ? 0 : 1
        }}
      />
    </>
  )
}
