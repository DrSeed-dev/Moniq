// src/components/layout/Footer.tsx
// Imports FOOTER_LINKS and SITE_CONFIG from constants.

import { MapPin } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { FOOTER_LINKS, SITE_CONFIG } from '@/constants/navigation'

const socialLinks = [
  {
    label: 'X (Twitter)',
    href:  SITE_CONFIG.social.twitter,
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12.6 1.5h2.1L9.9 7.1l5.6 7.4h-4.3L7.7 9.7 3.9 14.5H1.8l5.1-6-5.4-7h4.4l3.2 4.2L12.6 1.5zm-.7 11.2h1.2L4.3 2.7H3L11.9 12.7z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href:  SITE_CONFIG.social.instagram,
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="1.5" y="1.5" width="13" height="13" rx="3.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8" cy="8" r="2.75" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="11.75" cy="4.25" r="0.75" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href:  SITE_CONFIG.social.linkedin,
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="1.5" y="1.5" width="13" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4.5 6.5V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 11V8.5C8 7.67 8.67 7 9.5 7v0C10.33 7 11 7.67 11 8.5V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="4.5" cy="4.75" r="0.75" fill="currentColor" />
      </svg>
    ),
  },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-navy-100">
      <div className="container-main py-14 md:py-20">

        {/* Top: Logo + columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8 mb-14">

          {/* Logo column */}
          <div className="md:col-span-2">
            <Logo size="md" />
            <p className="mt-4 text-navy-400 font-body text-sm leading-relaxed max-w-xs">
              {SITE_CONFIG.description}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-navy-400 hover:text-navy bg-bg-subtle hover:bg-navy-100 border border-navy-100 hover:border-navy-200 transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Location */}
            <div className="mt-6 flex items-center gap-2">
              <MapPin size={13} className="text-navy-400 flex-shrink-0" aria-hidden="true" />
              <span className="text-xs text-navy-400 font-body">
                Operating in Nigeria · CBN Compliant
              </span>
            </div>
          </div>

          {/* Link columns — from constants */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-bold font-body text-navy tracking-widest uppercase mb-4">
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm font-body text-navy-400 hover:text-navy transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-navy-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-navy-400 font-body text-center md:text-left">
            © {currentYear} {SITE_CONFIG.name} Financial Technologies Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {FOOTER_LINKS.Legal.slice(0, 2).map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-navy-400 hover:text-navy font-body transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-1.5 text-xs text-navy-300 font-body">
              <MapPin size={11} aria-hidden="true" />
              Built in Nigeria
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}
