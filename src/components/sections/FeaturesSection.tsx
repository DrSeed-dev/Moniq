// src/components/sections/FeaturesSection.tsx
// Bento grid layout. Lucide icons throughout.

import { motion } from 'framer-motion'
import { Zap, Target, BarChart3, Briefcase, ShieldCheck, Tag } from 'lucide-react'
import { cn } from '@/utils/cn'

interface Feature {
  id:          string
  icon:        React.ReactNode
  label:       string
  title:       string
  description: string
  accent:      'blue' | 'mint' | 'orange'
  size:        'large' | 'medium' | 'small'
}

const accentMap = {
  blue: {
    label:     'text-blue-accent bg-blue-light border-blue-mid',
    iconBg:    'bg-blue-light text-blue-accent',
  },
  mint: {
    label:     'text-mint bg-mint-light border-mint/25',
    iconBg:    'bg-mint-light text-mint',
  },
  orange: {
    label:     'text-orange bg-orange/8 border-orange/20',
    iconBg:    'bg-orange/8 text-orange',
  },
}

const features: Feature[] = [
  {
    id:          'transfers',
    size:        'large',
    accent:      'blue',
    label:       'Instant Transfers',
    icon:        <Zap size={24} aria-hidden="true" />,
    title:       'Send money in seconds',
    description: 'Transfer to any Nigerian bank account instantly — 24/7, including weekends and public holidays. No waiting, no delays, no excuses.',
  },
  {
    id:          'savings',
    size:        'medium',
    accent:      'mint',
    label:       'Smart Savings',
    icon:        <Target size={24} aria-hidden="true" />,
    title:       'Save with a goal',
    description: 'Set savings targets and watch your money grow with competitive interest rates.',
  },
  {
    id:          'analytics',
    size:        'small',
    accent:      'orange',
    label:       'Analytics',
    icon:        <BarChart3 size={24} aria-hidden="true" />,
    title:       'Know where it goes',
    description: 'Real-time spending breakdowns by category.',
  },
  {
    id:          'business',
    size:        'medium',
    accent:      'blue',
    label:       'Business',
    icon:        <Briefcase size={24} aria-hidden="true" />,
    title:       'Built for Nigerian businesses',
    description: 'Bulk payments, invoicing, and payroll — all in one dashboard built for how Nigerian businesses actually operate.',
  },
  {
    id:          'security',
    size:        'small',
    accent:      'mint',
    label:       'Security',
    icon:        <ShieldCheck size={24} aria-hidden="true" />,
    title:       'Bank-grade protection',
    description: '256-bit encryption, biometric auth, and real-time fraud detection.',
  },
  {
    id:          'fees',
    size:        'small',
    accent:      'blue',
    label:       'Pricing',
    icon:        <Tag size={24} aria-hidden="true" />,
    title:       'Zero hidden fees',
    description: 'No monthly charges. No setup costs. No surprises.',
  },
]

function FeatureCard({ feature, className }: { feature: Feature; className?: string }) {
  const colors  = accentMap[feature.accent]
  const isLarge = feature.size === 'large'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'group relative bg-white rounded-2xl',
        'border border-navy-100',
        'shadow-card hover:shadow-card-hover hover:border-navy-200',
        'transition-all duration-300 overflow-hidden',
        isLarge ? 'p-8' : 'p-6',
        className
      )}
    >
      {/* Hover glow wash */}
      <div
        className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: feature.accent === 'blue'
            ? 'radial-gradient(circle, rgba(0,82,255,0.04) 0%, transparent 70%)'
            : feature.accent === 'mint'
            ? 'radial-gradient(circle, rgba(0,196,154,0.05) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255,107,53,0.04) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Icon */}
      <div
        className={cn(
          'inline-flex items-center justify-center rounded-xl mb-4',
          colors.iconBg,
          isLarge ? 'w-12 h-12' : 'w-10 h-10'
        )}
      >
        {feature.icon}
      </div>

      {/* Label */}
      <div className="mb-3">
        <span
          className={cn(
            'inline-flex items-center px-2.5 py-1 rounded-full',
            'text-[11px] font-semibold font-body tracking-wide uppercase border',
            colors.label
          )}
        >
          {feature.label}
        </span>
      </div>

      {/* Title */}
      <h3
        className={cn(
          'font-display font-bold text-navy leading-snug mb-2',
          isLarge ? 'text-2xl md:text-3xl' : 'text-lg'
        )}
      >
        {feature.title}
      </h3>

      {/* Description */}
      <p
        className={cn(
          'font-body text-navy-400 leading-relaxed',
          isLarge ? 'text-base max-w-sm' : 'text-sm'
        )}
      >
        {feature.description}
      </p>

      {/* Large card stats strip */}
      {isLarge && (
        <div className="mt-8 pt-6 border-t border-navy-100 flex items-center gap-6">
          {[
            { value: '< 5s',   label: 'Avg transfer time' },
            { value: '24/7',   label: 'Always available'  },
            { value: '200+',   label: 'Banks supported'   },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-xl font-bold font-mono text-navy tracking-tight">{stat.value}</div>
              <div className="text-xs text-navy-400 font-body mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export function FeaturesSection() {
  const [transfers, savings, analytics, business, security, fees] = features

  return (
    <section id="features" className="section-padding bg-bg-subtle">
      <div className="container-main">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-light border border-blue-mid mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-accent" aria-hidden="true" />
            <span className="text-xs font-semibold font-body text-blue-accent tracking-wide uppercase">Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-navy tracking-tight mb-4">
            Everything you need to{' '}
            <span className="text-gradient">move money better</span>
          </h2>
          <p className="text-navy-400 font-body text-lg leading-relaxed">
            Built ground-up for Nigeria. Every feature solves a real problem
            that Nigerians face with traditional banking every day.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          <FeatureCard feature={transfers} className="md:col-span-2" />
          <FeatureCard feature={savings}   className="md:col-span-1" />
          <FeatureCard feature={analytics} className="md:col-span-1" />
          <FeatureCard feature={business}  className="md:col-span-2" />
          <FeatureCard feature={security}  className="md:col-span-1" />
          <FeatureCard feature={fees}      className="md:col-span-2" />
        </div>
      </div>
    </section>
  )
}
