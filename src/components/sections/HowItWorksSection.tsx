// src/components/sections/HowItWorksSection.tsx
// Connected 3-step flow. Lucide icons. Zero emojis.

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { UserCircle2, Wallet, TrendingUp, ArrowRight } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { Button  } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

interface Step {
  number:  string
  title:   string
  body:    string
  icon:    React.ReactNode
  accent:  string
  iconBg:  string
}

const steps: Step[] = [
  {
    number: '01',
    title:  'Create your account',
    body:   'Sign up in under 2 minutes with just your phone number and BVN. No paperwork, no branch visits, no waiting.',
    icon:   <UserCircle2  size={26} aria-hidden="true" />,
    accent: 'text-blue-accent',
    iconBg: 'bg-blue-light border-blue-mid',
  },
  {
    number: '02',
    title:  'Fund your wallet',
    body:   'Add money instantly from any Nigerian bank via transfer, USSD, or card. Your funds are available the moment they arrive.',
    icon:   <Wallet size={26} aria-hidden="true" />,
    accent: 'text-mint',
    iconBg: 'bg-mint-light border-mint/25',
  },
  {
    number: '03',
    title:  'Send, save & grow',
    body:   'Transfer money, set savings goals, pay bills, and manage your business — all from one beautifully simple dashboard.',
    icon:   <TrendingUp size={26} aria-hidden="true" />,
    accent: 'text-orange',
    iconBg: 'bg-orange/8 border-orange/20',
  },
]

function StepCard({
  step,
  index,
  isInView,
}: {
  step:     Step
  index:    number
  isInView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 + index * 0.15 }}
      className="relative flex flex-col"
    >
      {/* Mobile: left timeline */}
      <div className="flex items-start gap-4 mb-6 md:block">
        <div className="flex flex-col items-center md:hidden flex-shrink-0 pt-1">
          <div className="w-8 h-8 rounded-full bg-white border-2 border-navy-200 flex items-center justify-center z-10">
            <span className="text-xs font-bold font-mono text-navy-400">{step.number}</span>
          </div>
          {index < steps.length - 1 && (
            <div className="w-px flex-1 bg-navy-100 mt-2 min-h-[3rem]" aria-hidden="true" />
          )}
        </div>

        {/* Icon */}
        <div
          className={cn(
            'inline-flex items-center justify-center',
            'w-14 h-14 rounded-2xl border flex-shrink-0',
            step.accent,
            step.iconBg
          )}
        >
          {step.icon}
        </div>
      </div>

      {/* Step label — desktop */}
      <div className="hidden md:flex items-center gap-2 mb-3">
        <span className="text-xs font-mono font-bold text-navy-200 tracking-widest">
          STEP {step.number}
        </span>
        <div className="h-px w-6 bg-navy-200" aria-hidden="true" />
      </div>

      <h3 className="text-xl font-display font-bold text-navy mb-3 leading-snug">
        {step.title}
      </h3>
      <p className="text-navy-400 font-body text-base leading-relaxed">
        {step.body}
      </p>
    </motion.div>
  )
}

export function HowItWorksSection() {
  const ref      = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section id="how-it-works" className="bg-white">
      <div ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-xl mx-auto mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-mint-light border border-mint/25 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-mint" aria-hidden="true" />
            <span className="text-xs font-semibold font-body text-mint tracking-wide uppercase">
              How it works
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-navy tracking-tight mb-4">
            Up and running{' '}
            <span className="text-gradient">in minutes</span>
          </h2>
          <p className="text-navy-400 font-body text-lg leading-relaxed">
            No branch. No form. No queue. Just your phone and 2 minutes.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">

          {/* Connector line — desktop only, draws left to right */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={{ transformOrigin: 'left center' }}
            className="hidden md:block absolute top-7 left-[calc(16.66%+1.75rem)] right-[calc(16.66%+1.75rem)] h-px bg-gradient-to-r from-blue-mid via-mint/30 to-orange/20"
            aria-hidden="true"
          />

          {/* Dots on connector */}
          <div
            className="hidden md:flex absolute top-[1.625rem] left-[calc(16.66%+1.75rem)] right-[calc(16.66%+1.75rem)] justify-between"
            aria-hidden="true"
          >
            {steps.map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.15 }}
                className="w-3 h-3 rounded-full bg-white border-2 border-navy-200 -mt-1"
              />
            ))}
          </div>

          <div className="flex flex-col gap-10 md:grid md:grid-cols-3 md:gap-10 md:items-start">
            {steps.map((step, i) => (
              <StepCard key={step.number} step={step} index={i} isInView={isInView} />
            ))}
          </div>
        </div>

        {/* Bottom inline CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16 md:mt-20"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-8 py-5 rounded-2xl bg-bg-subtle border border-navy-100">
            <div className="text-left">
              <p className="text-sm font-semibold text-navy font-body">Ready to get started?</p>
              <p className="text-sm text-navy-400 font-body">Join 10,000+ Nigerians on the waitlist</p>
            </div>
            <Button variant="primary" size="md" rightIcon={<ArrowRight size={15} aria-hidden="true" />}>
              Open free account
            </Button>
          </div>
        </motion.div>

      </div>
    </Section>
  )
}
