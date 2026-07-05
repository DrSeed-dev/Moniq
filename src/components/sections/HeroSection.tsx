// src/components/sections/HeroSection.tsx
//
// ANIMATION APPROACH — inline props only, no variants
// ────────────────────────────────────────────────────
// Framer Motion's `Variants` type does NOT accept functions as values.
// The `custom` prop pattern fails TypeScript strict checks.
//
// CORRECT pattern for staggered per-element animations:
// Use `initial`, `animate`, and `transition` directly on each element.
// Each element gets its own explicit `delay` inside `transition`.
// Fully type-safe. No casting needed.
//
// EASE — we use the string 'easeOut' throughout this file.
// The cubic bezier array [0.22, 1, 0.36, 1] causes TS errors because
// TypeScript infers it as `number[]` not the tuple `[number,number,number,number]`.
// 'easeOut' is a valid Easing literal and requires no casting.

import { motion } from 'framer-motion'
import { ShieldCheck, Zap, CreditCard } from 'lucide-react'
import { Button  } from '@/components/ui/Button'
import { Section } from '@/components/layout/Section'

const trustSignals = [
  { icon: ShieldCheck, text: 'Bank-grade security' },
  { icon: Zap,         text: '2-minute setup'      },
  { icon: CreditCard,  text: 'Zero fees forever'   },
]

// Shared starting state — every element fades up from the same position
const from = { opacity: 0, y: 20 }
const to   = { opacity: 1, y: 0  }

export function HeroSection() {
  return (
    <Section
      id="hero"
      className="relative overflow-hidden pt-36 md:pt-48 pb-24 md:pb-36"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 90% 55% at 50% -5%, rgba(0,82,255,0.055) 0%, transparent 65%)',
          }}
        />
        <div
          className="absolute top-0 right-0 w-1/2 h-full"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 100% 20%, rgba(0,196,154,0.04) 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(8,13,26,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(8,13,26,1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">

        {/* Gradient-border announcement badge */}
        <motion.div
          initial={from}
          animate={to}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0 }}
          className="flex justify-center mb-8"
        >
          <div className="badge-gradient-border inline-flex items-center gap-2.5">
            <span
              className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase"
              style={{ background: 'linear-gradient(135deg, #0052FF, #00C49A)', color: '#fff' }}
            >
              New
            </span>
            <span className="text-[13px] font-medium text-navy-500 font-body pr-1">
              Moniq is launching in Nigeria
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={from}
          animate={to}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.08 }}
          className="text-[52px] md:text-[68px] lg:text-[80px] font-display font-extrabold text-navy leading-[1.06] tracking-[-0.03em] mb-6"
        >
          Banking built for
          <br />
          <span className="text-gradient">modern Nigeria</span>
        </motion.h1>

        {/* Supporting copy */}
        <motion.p
          initial={from}
          animate={to}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.16 }}
          className="text-lg md:text-xl text-navy-400 max-w-2xl mx-auto mb-10 font-body leading-relaxed"
        >
          Send money instantly, save with purpose, and grow your business —
          all on one platform built for the speed and ambition of
          Nigeria's digital generation.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={from}
          animate={to}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.24 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
        >
          <Button variant="primary" size="lg">Open a free account</Button>
          <Button variant="ghost"   size="lg">See how it works</Button>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={from}
          animate={to}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.32 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          {trustSignals.map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-center gap-2">
              <Icon size={15} className="text-navy-300" aria-hidden="true" />
              <span className="text-sm font-medium text-navy-400 font-body">{text}</span>
              {i < trustSignals.length - 1 && (
                <span className="w-1 h-1 rounded-full bg-navy-200 ml-3" aria-hidden="true" />
              )}
            </div>
          ))}
        </motion.div>

      </div>
    </Section>
  )
}
