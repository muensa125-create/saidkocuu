'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Hakkımda', href: '#about' },
  { label: 'İstatistikler', href: '#istatistikler' },
  { label: 'Projeler', href: '#projects' },
  { label: 'Yazılar', href: '#articles' },
  { label: 'İletişim', href: '#iletisim' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.substring(1))
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(`#${section}`)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (href: string) => {
    setIsOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Name */}
          <button
            onClick={() => handleClick('#home')}
            className="font-serif text-lg text-gold hover:text-gold/80 transition-colors"
          >
            Said Koçu
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleClick(item.href)}
                className={`text-sm text-white/70 hover:text-white transition-colors ${
                  activeSection === item.href ? 'text-gold' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white/70 hover:text-white transition-colors"
            aria-label="Menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleClick(item.href)}
                className={`block w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                  activeSection === item.href
                    ? 'text-gold bg-white/5'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
