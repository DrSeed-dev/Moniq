// src/components/layout/Navbar.tsx
// Floating island navbar. All icons from lucide-react. Zero emojis.

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight, MapPin } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Logo } from '@/components/ui/Logo'

const NAV_LINKS = [
  { label: 'Features',     href: '#features'     },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing',      href: '#pricing'      },
  { label: 'Business',     href: '#business'     },
]

export function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 md:px-6 md:pt-5">

      {/* Floating island card */}
      <motion.div
        animate={{
          boxShadow: scrolled
            ? '0 4px 32px rgba(8,13,26,0.10), 0 1px 4px rgba(8,13,26,0.06)'
            : '0 2px 20px rgba(8,13,26,0.06), 0 1px 4px rgba(8,13,26,0.04)',
        }}
        transition={{ duration: 0.3 }}
        className={cn(
          'max-w-5xl mx-auto',
          'bg-white/95 backdrop-blur-md',
          'rounded-2xl',
          'border border-navy-100',
          'px-5 py-3',
          'flex items-center justify-between gap-4',
          scrolled && 'border-navy-200'
        )}
      >
        {/* Logo */}
        <a href="/" aria-label="Moniq home">
          <Logo size="sm" />
        </a>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={cn(
                'px-4 py-2 rounded-xl',
                'text-sm font-medium font-body',
                'text-navy-400 hover:text-navy hover:bg-bg-subtle',
                'transition-all duration-150'
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Location badge + mobile trigger */}
        <div className="flex items-center gap-3">

          {/* Nigeria location badge — icon only, no emoji */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg-subtle border border-navy-100">
            <MapPin size={12} className="text-navy-400" aria-hidden="true" />
            <span className="text-xs font-semibold text-navy-400 font-body tracking-wide">
              Nigeria
            </span>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-bg-subtle border border-navy-100 text-navy"
            aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen
                ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate:  90,  opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={16} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate:  90, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate: -90,  opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={16} />
                  </motion.span>
                )
              }
            </AnimatePresence>
          </button>
        </div>
      </motion.div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
            animate={{ opacity: 1, y:  0, scaleY: 1    }}
            exit={{   opacity: 0, y: -8, scaleY: 0.95  }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{ transformOrigin: 'top center' }}
            className="max-w-5xl mx-auto mt-2 bg-white/98 backdrop-blur-md rounded-2xl border border-navy-100 shadow-card overflow-hidden"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-navy-500 hover:text-navy hover:bg-bg-subtle transition-all duration-150 font-body font-medium text-sm"
                >
                  {link.label}
                  <ChevronRight size={14} className="text-navy-200" aria-hidden="true" />
                </a>
              ))}

              {/* Location row in mobile menu */}
              <div className="mt-2 pt-3 border-t border-navy-100 flex items-center gap-2 px-4 py-2">
                <MapPin size={13} className="text-navy-400" aria-hidden="true" />
                <span className="text-xs text-navy-400 font-body">Available in Nigeria</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
