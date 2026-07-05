// src/components/ui/ScrollProgress.tsx
//
// PURPOSE: A thin progress bar fixed at the very top of the page.
// As you scroll down, it fills left-to-right from 0% to 100%.
// It disappears when you're at the top (opacity 0) and
// reappears the moment you start scrolling.
//
// WHY IT MATTERS:
// It's a micro-interaction that signals craftsmanship.
// Users don't consciously notice it — but they feel the polish.
// Used by Linear, Notion, and most top-tier SaaS documentation sites.
//
// HOW IT WORKS:
// 1. A `useEffect` hook listens to the `scroll` event
// 2. On every scroll, it calculates:
//    scrolled distance ÷ total scrollable distance × 100
//    = percentage from 0 to 100
// 3. The width of the progress bar is set to that percentage
// 4. Framer Motion's `motion.div` animates the width change smoothly
//
// WHY `useEffect` WITH `passive: true`:
// Scroll listeners fire many times per second.
// `passive: true` tells the browser "this listener won't call
// preventDefault()" — which lets the browser optimise scrolling
// performance. Always use this for scroll listeners.

import { motion, useSpring, useTransform, useScroll } from 'framer-motion'

export function ScrollProgress() {
  // useScroll from Framer Motion tracks scroll progress as a MotionValue
  // It gives us a value from 0 (top) to 1 (bottom) automatically.
  // This is cleaner than a manual useEffect + state approach.
  const { scrollYProgress } = useScroll()

  // useSpring smooths the raw scroll value — without this,
  // the bar jumps on every scroll tick.
  // stiffness + damping control how "springy" the smoothing feels.
  // These values give a tight, responsive feel — not bouncy.
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping:   30,
    restDelta: 0.001,
  })

  // Hide the bar when at the very top (progress < 1%)
  const opacity = useTransform(scrollYProgress, [0, 0.01], [0, 1])

  return (
    // Fixed — stays at top of viewport always
    // z-[100] — above the navbar (which is z-50)
    // pointer-events-none — never blocks clicks
    <div className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
      <motion.div
        style={{
          scaleX,
          opacity,
          // `transformOrigin: left` means it grows from the left edge
          transformOrigin: 'left',
          height:          '3px',
          background:      'linear-gradient(to right, #0052FF, #00C49A)',
          // Subtle glow on the bar itself
          boxShadow:       '0 0 8px rgba(0,82,255,0.5)',
        }}
      />
    </div>
  )
}
