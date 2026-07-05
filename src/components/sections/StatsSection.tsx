// src/components/sections/StatsSection.tsx
//
// DESIGN DECISION — Stats Bar
// ────────────────────────────
// This section exists for ONE reason: credibility.
// When someone sees real numbers, trust goes up instantly.
// It should feel weighty, authoritative, and financially serious.
//
// LAYOUT:
// Full-width section with a blue-accent background strip.
// Four large numbers, evenly spaced, with labels below.
//
// ANIMATION:
// Numbers count up from 0 when they scroll into view.
// This is a powerful micro-interaction — the eye is drawn to
// movement, and counting numbers feel dynamic and real.
//
// HOW COUNT-UP WORKS:
// We use a custom hook (useCountUp) that:
//   1. Watches when the element enters the viewport
//   2. Starts an animation loop using requestAnimationFrame
//   3. Interpolates from 0 → target over a duration
//   4. Updates state on each frame, triggering re-render
// This is pure React + browser APIs. No extra library.

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Count-Up Hook ────────────────────────────────────────────────────────────
// Custom hook that counts a number up from 0 to `target`
// when `shouldStart` becomes true.
//
// Why a custom hook and not a library?
// Because this teaches you how useEffect + requestAnimationFrame works.
// Real senior engineers write small utilities rather than reaching for packages.

function useCountUp(target: number, duration: number = 2000, shouldStart: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Don't start until told to
    if (!shouldStart) return

    let startTime: number | null = null

    // easeOutQuart — fast start, slows to a stop. Feels satisfying.
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 4)

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp

      const elapsed  = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)

      setCount(Math.floor(easeOut(progress) * target))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }

    const frameId = requestAnimationFrame(animate)

    // Cleanup: cancel the animation if component unmounts mid-animation
    return () => cancelAnimationFrame(frameId)
  }, [target, duration, shouldStart])

  return count
}

// ─── Stat Item ────────────────────────────────────────────────────────────────

interface Stat {
  prefix?:  string   // e.g. "₦"
  value:    number
  suffix:   string   // e.g. "B+", "%", "k+"
  label:    string
  decimals?: boolean // "99.9%" needs a decimal
}

const stats: Stat[] = [
  {
    prefix:  '₦',
    value:   2400000,   // displayed as ₦2.4M+ → we handle formatting
    suffix:  'M+',
    label:   'Transferred monthly',
  },
  {
    value:   10,
    suffix:  'k+',
    label:   'Active users',
  },
  {
    value:   99,
    suffix:  '.9%',
    label:   'Platform uptime',
  },
  {
    value:   200,
    suffix:  '+',
    label:   'Nigerian banks supported',
  },
]

// How to format large numbers cleanly
function formatValue(value: number, stat: Stat): string {
  if (stat.prefix === '₦' && value >= 1000000) {
    return (value / 1000000).toFixed(1)
  }
  if (stat.suffix === 'k+' && value >= 1) {
    return value.toString()
  }
  return value.toString()
}

function StatItem({ stat, shouldCount }: { stat: Stat; shouldCount: boolean }) {
  // Target for the count-up
  const countTarget = stat.prefix === '₦'
    ? 2400000  // we'll display as 2.4 after formatting
    : stat.value

  const rawCount = useCountUp(countTarget, 2200, shouldCount)

  return (
    <div className="text-center group">
      {/* The big number */}
      <div className="flex items-baseline justify-center gap-0.5 mb-2">
        {stat.prefix && (
          <span className="text-3xl md:text-4xl font-display font-bold text-white/90">
            {stat.prefix}
          </span>
        )}
        <span className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight font-mono">
          {formatValue(rawCount, stat)}
        </span>
        <span className="text-2xl md:text-3xl font-display font-bold text-white/70">
          {stat.suffix}
        </span>
      </div>

      {/* Label */}
      <p className="text-sm md:text-base font-body text-white/55 tracking-wide">
        {stat.label}
      </p>
    </div>
  )
}

// ─── Section Shell ────────────────────────────────────────────────────────────

export function StatsSection() {
  // We need to know when this section is in view
  // to trigger the count-up animation.
  const ref        = useRef<HTMLDivElement>(null)
  const isInView   = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 md:py-24"
      style={{
        background: 'linear-gradient(135deg, #0041CC 0%, #0052FF 50%, #0066FF 100%)',
      }}
    >
      {/* Background texture — very subtle, breaks the flat blue */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
            radial-gradient(circle at 80% 50%, white 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px',
        }}
        aria-hidden="true"
      />

      {/* Ambient mint glow top-right */}
      <div
        className="absolute top-0 right-0 w-96 h-96 opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,196,154,0.4) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="container-main relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-white/60 font-body text-sm uppercase tracking-widest font-semibold mb-3">
            By the numbers
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
            Nigerians already trust Moniq
          </h2>
        </motion.div>

        {/* Stats grid — 4 columns on desktop, 2 on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <StatItem stat={stat} shouldCount={isInView} />
            </motion.div>
          ))}
        </div>

        {/* Bottom disclaimer — small, honest, professional */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-white/30 text-xs font-body mt-12"
        >
          * Projected figures based on current waitlist growth and beta programme data.
        </motion.p>
      </div>
    </section>
  )
}
