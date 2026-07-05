// src/components/sections/PricingSection.tsx
//
// WHAT THIS SECTION TEACHES:
// ──────────────────────────
// `useState` for toggling between Monthly and Annual pricing.
// This is your first piece of real interactive UI state.
//
// HOW THE TOGGLE WORKS:
//   const [isAnnual, setIsAnnual] = useState(false)
//   When the toggle is clicked → setIsAnnual(!isAnnual)
//   React re-renders with the new value → prices update
//   The animation between price values uses Framer Motion's AnimatePresence
//
// PRICING STRATEGY (real product thinking):
//   Free    → Acquisition: get users in the door
//   Personal→ Conversion: where most users should land
//   Business→ Expansion: where revenue comes from
//
// Annual discount is 20% — shown as "Save 20%" badge.
// This is the most common SaaS pricing pattern (Stripe, Linear, Notion).

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Zap } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/layout/Section'

// ─── Pricing Data ─────────────────────────────────────────────────────────────

interface Plan {
  id:          string
  name:        string
  description: string
  monthlyPrice: number | null    // null = free
  features:    string[]
  cta:         string
  highlighted: boolean           // the "recommended" plan
  badge?:      string            // optional badge text e.g. "Most popular"
}

const plans: Plan[] = [
  {
    id:           'free',
    name:         'Starter',
    description:  'Everything you need to get started with digital banking.',
    monthlyPrice: 0,
    highlighted:  false,
    cta:          'Get started free',
    features: [
      'Free bank account with NUBAN',
      'Up to ₦100,000 daily transfers',
      '5 free transfers per month',
      'Bill payments',
      'Savings goals (1 active)',
      'Basic spend analytics',
      'Mobile app access',
    ],
  },
  {
    id:           'personal',
    name:         'Personal',
    description:  'For individuals who move money seriously.',
    monthlyPrice: 999,
    highlighted:  true,
    badge:        'Most popular',
    cta:          'Start free trial',
    features: [
      'Everything in Starter',
      'Unlimited free transfers',
      'Up to ₦5M daily transfer limit',
      'Savings goals (unlimited)',
      'Advanced spend analytics',
      'Bill payment automation',
      'Priority customer support',
      'Virtual USD card',
    ],
  },
  {
    id:           'business',
    name:         'Business',
    description:  'Built for Nigerian businesses that mean business.',
    monthlyPrice: 4999,
    highlighted:  false,
    cta:          'Talk to sales',
    features: [
      'Everything in Personal',
      'Business account + NUBAN',
      'Bulk payment processing',
      'Payroll management (up to 50)',
      'Invoice generation',
      'Team member access (5 seats)',
      'API access',
      'Dedicated account manager',
    ],
  },
]

// ─── Plan Card ────────────────────────────────────────────────────────────────

function PlanCard({
  plan,
  isAnnual,
  index,
}: {
  plan:     Plan
  isAnnual: boolean
  index:    number
}) {
  // Annual price = monthly × 12 × 0.8 (20% discount)
  const displayPrice = plan.monthlyPrice === null || plan.monthlyPrice === 0
    ? 0
    : isAnnual
      ? Math.round((plan.monthlyPrice * 12 * 0.8) / 12)
      : plan.monthlyPrice

  const isFree = plan.monthlyPrice === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      className={cn(
        'relative flex flex-col rounded-2xl border p-8 transition-all duration-300',
        plan.highlighted
          // Highlighted plan: navy background, glowing
          ? 'bg-navy border-navy text-white shadow-[0_8px_48px_rgba(0,82,255,0.25)]'
          : 'bg-white border-navy-100 shadow-card hover:shadow-card-hover hover:border-navy-200'
      )}
    >
      {/* "Most popular" badge */}
      {plan.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-blue-accent text-white text-xs font-bold font-body tracking-wide shadow-[0_2px_12px_rgba(0,82,255,0.4)]">
            <Zap size={10} aria-hidden="true" />
            {plan.badge}
          </span>
        </div>
      )}

      {/* Plan name + description */}
      <div className="mb-6">
        <h3
          className={cn(
            'text-xl font-display font-bold mb-2',
            plan.highlighted ? 'text-white' : 'text-navy'
          )}
        >
          {plan.name}
        </h3>
        <p
          className={cn(
            'text-sm font-body leading-relaxed',
            plan.highlighted ? 'text-white/60' : 'text-navy-400'
          )}
        >
          {plan.description}
        </p>
      </div>

      {/* Price — AnimatePresence makes it animate when switching billing period */}
      <div className="mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            // The key changes when isAnnual changes — this triggers exit + enter animation
            key={isAnnual ? 'annual' : 'monthly'}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y:  0 }}
            exit={{   opacity: 0, y:  8 }}
            transition={{ duration: 0.2 }}
            className="flex items-baseline gap-1"
          >
            {isFree ? (
              <span
                className={cn(
                  'text-5xl font-display font-extrabold tracking-tight',
                  plan.highlighted ? 'text-white' : 'text-navy'
                )}
              >
                Free
              </span>
            ) : (
              <>
                <span
                  className={cn(
                    'text-2xl font-display font-bold',
                    plan.highlighted ? 'text-white/70' : 'text-navy-400'
                  )}
                >
                  ₦
                </span>
                <span
                  className={cn(
                    'text-5xl font-display font-extrabold tracking-tight font-mono',
                    plan.highlighted ? 'text-white' : 'text-navy'
                  )}
                >
                  {displayPrice.toLocaleString()}
                </span>
                <span
                  className={cn(
                    'text-sm font-body',
                    plan.highlighted ? 'text-white/50' : 'text-navy-400'
                  )}
                >
                  / mo
                </span>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Annual savings callout */}
        {isAnnual && !isFree && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className={cn(
              'text-xs font-body mt-1',
              plan.highlighted ? 'text-mint' : 'text-mint'
            )}
          >
            Billed ₦{(displayPrice * 12).toLocaleString()}/year — 20% saved
          </motion.p>
        )}
      </div>

      {/* CTA button */}
      <div className="mb-8">
        {plan.highlighted
          ? (
            <a
              href="#"
              className="block w-full text-center px-6 py-3 rounded-xl bg-blue-accent text-white font-semibold font-body text-sm hover:bg-blue-hover transition-colors duration-200 shadow-[0_2px_12px_rgba(0,82,255,0.35)]"
            >
              {plan.cta}
            </a>
          ) : (
            <Button
              variant={plan.id === 'business' ? 'outline' : 'secondary'}
              size="md"
              className="w-full justify-center"
            >
              {plan.cta}
            </Button>
          )
        }
      </div>

      {/* Divider */}
      <div
        className={cn(
          'w-full h-px mb-6',
          plan.highlighted ? 'bg-white/10' : 'bg-navy-100'
        )}
      />

      {/* Feature list */}
      <ul className="flex flex-col gap-3 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check
              size={16}
              className={cn(
                'flex-shrink-0 mt-0.5',
                plan.highlighted ? 'text-mint' : 'text-blue-accent'
              )}
              aria-hidden="true"
            />
            <span
              className={cn(
                'text-sm font-body leading-snug',
                plan.highlighted ? 'text-white/75' : 'text-navy-400'
              )}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

    </motion.div>
  )
}

// ─── Section Shell ────────────────────────────────────────────────────────────

export function PricingSection() {
  // THE CORE STATE:
  // false = Monthly billing (default)
  // true  = Annual billing (discounted)
  // When this changes, every PlanCard re-renders with the new price.
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <Section id="pricing" className="bg-white">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-light border border-blue-mid mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-accent" aria-hidden="true" />
          <span className="text-xs font-semibold font-body text-blue-accent tracking-wide uppercase">
            Pricing
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-display font-extrabold text-navy tracking-tight mb-4">
          Simple pricing,{' '}
          <span className="text-gradient">no surprises</span>
        </h2>

        <p className="text-navy-400 font-body text-lg leading-relaxed">
          No hidden fees. No confusing tiers. Cancel anytime.
        </p>
      </motion.div>

      {/* ── Billing Toggle ──
          This is the interactive state element.
          Clicking switches between monthly and annual pricing.
          The pill slides using layout animation. */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex items-center justify-center gap-4 mb-14"
      >
        <span
          className={cn(
            'text-sm font-semibold font-body transition-colors duration-200',
            !isAnnual ? 'text-navy' : 'text-navy-400'
          )}
        >
          Monthly
        </span>

        {/* Toggle pill */}
        <button
          onClick={() => setIsAnnual((prev) => !prev)}
          role="switch"
          aria-checked={isAnnual}
          aria-label="Toggle annual billing"
          className={cn(
            'relative w-12 h-6 rounded-full transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-blue-accent',
            isAnnual ? 'bg-blue-accent' : 'bg-navy-200'
          )}
        >
          {/* Sliding dot */}
          <motion.div
            // layout animation — React moves this div smoothly
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            className={cn(
              'absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm',
              isAnnual ? 'left-7' : 'left-1'
            )}
          />
        </button>

        <span
          className={cn(
            'text-sm font-semibold font-body transition-colors duration-200',
            isAnnual ? 'text-navy' : 'text-navy-400'
          )}
        >
          Annual
        </span>

        {/* Savings badge — only visible when annual is selected */}
        <AnimatePresence>
          {isAnnual && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8, x: -8 }}
              animate={{ opacity: 1, scale: 1,   x:  0 }}
              exit={{   opacity: 0, scale: 0.8, x: -8 }}
              transition={{ duration: 0.2 }}
              className="px-2.5 py-1 rounded-full bg-mint-light border border-mint/25 text-xs font-bold text-mint font-body"
            >
              Save 20%
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Plan cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-start">
        {plans.map((plan, i) => (
          <PlanCard key={plan.id} plan={plan} isAnnual={isAnnual} index={i} />
        ))}
      </div>

      {/* Bottom reassurance */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center text-navy-300 text-sm font-body mt-10"
      >
        All plans include a 14-day free trial · No credit card required · Cancel anytime
      </motion.p>

    </Section>
  )
}
