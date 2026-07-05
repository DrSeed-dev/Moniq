// src/components/sections/MobileAppSection.tsx
//
// PURPOSE: Every serious Nigerian fintech has an app download section.
// Its presence signals product maturity — even as a portfolio project.
// The "coming soon" framing is honest and creates anticipation.
//
// DESIGN:
// Dark navy card (matches the CTA section visual language)
// Left col — headline + download buttons + rating strip
// Right col — a clean phone frame with the Moniq logo centered
//
// APP STORE BUTTONS:
// Custom SVG logos for Apple and Google Play.
// Both lucide-react and most icon libraries don't include
// these brand icons — always use custom SVGs for brand marks.

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'

// ─── App Store Button ─────────────────────────────────────────────────────────

function AppStoreButton() {
  return (
    <a
      href="#"
      aria-label="Download on the App Store"
      className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-white/25 transition-all duration-200 group"
    >
      {/* Apple logo SVG */}
      <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path
          d="M16.462 12.748c-.026-3.116 2.544-4.632 2.66-4.706-1.451-2.123-3.708-2.413-4.508-2.443-1.91-.194-3.742 1.134-4.712 1.134-.977 0-2.47-1.11-4.065-1.079-2.082.03-4.007 1.216-5.077 3.073C-1.426 12.624.09 18.534 1.8 21.748c.851 1.58 1.866 3.352 3.195 3.293 1.288-.053 1.773-.84 3.332-.84 1.557 0 2.004.84 3.362.814 1.386-.023 2.26-1.6 3.1-3.184a15.6 15.6 0 001.41-3.42c-.033-.015-2.703-1.045-2.737-4.163zM13.594 3.7C14.293 2.833 14.76 1.638 14.633.42c-1.042.044-2.322.7-3.048 1.549-.661.76-1.245 1.99-1.09 3.16 1.167.09 2.357-.597 3.099-1.429z"
          fill="white"
        />
      </svg>

      <div className="text-left">
        <p className="text-[10px] text-white/60 font-body leading-none mb-0.5">
          Download on the
        </p>
        <p className="text-[15px] font-bold text-white font-display leading-none">
          App Store
        </p>
      </div>
    </a>
  )
}

// ─── Google Play Button ───────────────────────────────────────────────────────

function GooglePlayButton() {
  return (
    <a
      href="#"
      aria-label="Get it on Google Play"
      className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-white/25 transition-all duration-200 group"
    >
      {/* Google Play triangle logo SVG */}
      <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M1.07 0.434C0.628 0.692 0.333 1.182 0.333 1.782v20.436c0 .6.295 1.09.737 1.348l.116.065 11.45-11.45v-.27L1.186 0.368l-.116.066z" fill="#4FC3F7"/>
        <path d="M16.45 15.97l-3.814-3.814v-.27l3.817-3.817.086.049 4.52 2.568c1.29.732 1.29 1.933 0 2.666l-4.52 2.567-.09.051z" fill="#FFD54F"/>
        <path d="M16.54 15.919L12.636 12 1.07 23.566c.426.45 1.127.506 1.923.057l13.547-7.704" fill="#F48FB1"/>
        <path d="M16.54 8.081L2.993.377C2.197-.072 1.496-.016 1.07.434L12.636 12l3.904-3.919z" fill="#A5D6A7"/>
      </svg>

      <div className="text-left">
        <p className="text-[10px] text-white/60 font-body leading-none mb-0.5">
          Get it on
        </p>
        <p className="text-[15px] font-bold text-white font-display leading-none">
          Google Play
        </p>
      </div>
    </a>
  )
}

// ─── Phone Visual ─────────────────────────────────────────────────────────────

function PhoneVisual({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, rotate: -2 }}
      animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
      className="relative mx-auto w-[200px]"
    >
      {/* Phone frame */}
      <div
        className="relative rounded-[2.5rem] overflow-hidden border-[5px] border-white/10"
        style={{
          height: 380,
          background: 'linear-gradient(160deg, #111827 0%, #0A0F1E 100%)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)',
        }}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <span className="text-[10px] font-mono text-white/40">9:41</span>
          <div className="flex items-center gap-1">
            {[3, 5, 7, 9].map((h) => (
              <div key={h} style={{ height: h, width: 2.5 }} className="bg-white/40 rounded-sm" />
            ))}
          </div>
        </div>

        {/* App content — centered logo + coming soon */}
        <div className="flex flex-col items-center justify-center h-[calc(100%-40px)] gap-6 px-6">
          <Logo size="md" theme="light" />

          <div className="text-center">
            <p className="text-white/50 text-xs font-body leading-relaxed">
              Banking built for
              <br />modern Nigeria
            </p>
          </div>

          {/* Simulated loading bar */}
          <div className="w-full">
            <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: '100%' } : {}}
                transition={{ duration: 2, ease: 'easeInOut', delay: 0.8 }}
                className="h-full rounded-full bg-gradient-to-r from-blue-accent to-mint"
              />
            </div>
            <p className="text-[10px] text-white/30 font-body text-center mt-2">
              Coming soon
            </p>
          </div>
        </div>

      </div>

      {/* Glow under phone */}
      <div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-8 blur-xl opacity-40"
        style={{ background: 'radial-gradient(ellipse, #0052FF, transparent)' }}
        aria-hidden="true"
      />
    </motion.div>
  )
}

// ─── Section Shell ────────────────────────────────────────────────────────────

import { useRef } from 'react'
import { useInView } from 'framer-motion'

export function MobileAppSection() {
  const ref      = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section-padding bg-bg-subtle">
      <div className="container-main">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-3xl px-8 py-14 md:px-16 md:py-20"
          style={{ background: 'linear-gradient(145deg, #080D1A 0%, #0D1530 50%, #111827 100%)' }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div
              className="absolute top-0 left-0 w-96 h-96 opacity-20"
              style={{ background: 'radial-gradient(circle, rgba(0,82,255,0.4), transparent 70%)' }}
            />
            <div
              className="absolute bottom-0 right-0 w-64 h-64 opacity-15"
              style={{ background: 'radial-gradient(circle, rgba(0,196,154,0.5), transparent 70%)' }}
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left — copy + buttons */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-mint" aria-hidden="true" />
                <span className="text-xs font-semibold font-body text-white/50 tracking-wide uppercase">
                  Mobile App
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-white leading-tight tracking-tight mb-4">
                Your bank.{' '}
                <span className="text-gradient">In your pocket.</span>
              </h2>

              <p className="text-white/50 font-body text-lg leading-relaxed mb-8 max-w-md">
                The Moniq app brings everything to your fingertips.
                Send money, track spending, and grow your savings
                — anywhere, anytime.
              </p>

              {/* Download buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <AppStoreButton />
                <GooglePlayButton />
              </div>

              {/* Rating strip */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} fill="#FFD700" stroke="none" aria-hidden="true" />
                  ))}
                </div>
                <span className="text-white/40 text-sm font-body">
                  4.9 · Launching on iOS & Android
                </span>
              </div>
            </div>

            {/* Right — phone visual */}
            <div className="flex items-center justify-center">
              <PhoneVisual isInView={isInView} />
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
