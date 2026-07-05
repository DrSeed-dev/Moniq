// src/components/sections/TrustBar.tsx
//
// PURPOSE: Immediate credibility signal right after the hero.
// Nigerian users are naturally skeptical of fintech apps — and rightfully so.
// Showing CBN licensing, NDIC insurance, and SSL encryption before anything
// else answers the unspoken question: "Is this real and safe?"
//
// DESIGN: A quiet horizontal strip — not a full section.
// It doesn't compete with the hero. It whispers authority.
// Thin top border, light background, small iconography.

import { motion } from 'framer-motion'
import { ShieldCheck, Lock, BadgeCheck, Building2 } from 'lucide-react'

const badges = [
  {
    icon:    Building2,
    title:   'CBN Licensed',
    sub:     'Central Bank of Nigeria',
    color:   'text-blue-accent',
    bgColor: 'bg-blue-light',
  },
  {
    icon:    ShieldCheck,
    title:   'NDIC Insured',
    sub:     'Up to ₦5,000,000',
    color:   'text-mint',
    bgColor: 'bg-mint-light',
  },
  {
    icon:    Lock,
    title:   '256-bit SSL',
    sub:     'Bank-grade encryption',
    color:   'text-blue-accent',
    bgColor: 'bg-blue-light',
  },
  {
    icon:    BadgeCheck,
    title:   'ISO 27001',
    sub:     'Security certified',
    color:   'text-mint',
    bgColor: 'bg-mint-light',
  },
]

export function TrustBar() {
  return (
    <div className="border-y border-navy-100 bg-white">
      <div className="container-main py-5">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 md:gap-16">

          {badges.map((badge, i) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.07 }}
              className="flex items-center gap-3"
            >
              {/* Icon */}
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${badge.bgColor}`}>
                <badge.icon size={17} className={badge.color} aria-hidden="true" />
              </div>

              {/* Text */}
              <div>
                <p className="text-sm font-bold font-body text-navy leading-tight">
                  {badge.title}
                </p>
                <p className="text-xs text-navy-400 font-body">
                  {badge.sub}
                </p>
              </div>

              {/* Divider — hidden after last item */}
              {i < badges.length - 1 && (
                <div className="hidden md:block w-px h-8 bg-navy-100 ml-10" aria-hidden="true" />
              )}
            </motion.div>
          ))}

        </div>
      </div>
    </div>
  )
}
