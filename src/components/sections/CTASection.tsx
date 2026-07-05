// src/components/sections/CTASection.tsx
// Dark navy finale card. No emojis. Lucide icons.

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

export function CTASection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl px-8 py-16 md:px-16 md:py-24 text-center"
          style={{ background: 'linear-gradient(145deg, #080D1A 0%, #0D1530 50%, #111827 100%)' }}
        >
          {/* Background details */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px]"
              style={{ background: 'radial-gradient(ellipse, rgba(0,82,255,0.18) 0%, transparent 70%)' }}
            />
            <div
              className="absolute bottom-0 right-0 w-72 h-72"
              style={{ background: 'radial-gradient(circle, rgba(0,196,154,0.12) 0%, transparent 65%)' }}
            />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize:  '40px 40px',
              }}
            />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">

            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex justify-center mb-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-semibold font-body tracking-widest uppercase">
                <Sparkles size={12} className="text-mint" aria-hidden="true" />
                Join the waitlist
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-white leading-[1.08] tracking-tight mb-6"
            >
              Your money deserves{' '}
              <br className="hidden sm:block" />
              <span className="text-gradient">better banking</span>
            </motion.h2>

            {/* Supporting text */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/50 font-body text-lg leading-relaxed max-w-xl mx-auto mb-10"
            >
              Join 10,000+ Nigerians who've already secured their spot.
              We're rolling out access in batches — get in early.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
            >
              <a
                href="#"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-accent text-white font-semibold font-body text-base hover:bg-blue-hover transition-colors duration-200 shadow-[0_2px_12px_rgba(0,82,255,0.4)] hover:shadow-[0_4px_20px_rgba(0,82,255,0.5)]"
              >
                Open a free account
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 font-semibold font-body text-base transition-all duration-200"
              >
                Learn more
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="text-white/25 text-sm font-body"
            >
              No credit card required · 2-minute setup · Cancel anytime
            </motion.p>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
