// src/components/sections/AppShowcaseSection.tsx
//
// DESIGN DECISION — Coded UI Mockup (no image files needed)
// ──────────────────────────────────────────────────────────
// Instead of a PNG screenshot, we build the dashboard preview
// entirely with HTML + CSS + SVG. This is better because:
//   1. It scales perfectly at any resolution
//   2. It animates — numbers count up, cards slide in
//   3. No external image dependency
//   4. It demonstrates UI skill, not Photoshop skill
//
// STRUCTURE:
//   Left col  — headline, supporting copy, feature bullets
//   Right col — floating browser/phone mockup with live UI
//
// The mockup shows a simplified Moniq dashboard:
//   - Balance card with account number
//   - Recent transactions list
//   - Quick action buttons

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, ArrowDownLeft, Send, PiggyBank, BarChart3, CheckCircle2 } from 'lucide-react'
import { Section } from '@/components/layout/Section'

// Feature bullets shown in the left column
const highlights = [
  { icon: CheckCircle2, text: 'Real-time balance and transaction updates'   },
  { icon: CheckCircle2, text: 'Instant transfers to 200+ Nigerian banks'     },
  { icon: CheckCircle2, text: 'Smart savings goals with progress tracking'   },
  { icon: CheckCircle2, text: 'Spending analytics by category'               },
]

// Mock transactions shown in the dashboard preview
const mockTransactions = [
  {
    icon:   ArrowUpRight,
    label:  'Transfer to Emeka',
    amount: '- ₦25,000',
    time:   '2 min ago',
    color:  'text-orange bg-orange/8',
    amountColor: 'text-orange',
  },
  {
    icon:   ArrowDownLeft,
    label:  'Salary — GTBank',
    amount: '+ ₦350,000',
    time:   '1 hr ago',
    color:  'text-mint bg-mint-light',
    amountColor: 'text-mint',
  },
  {
    icon:   ArrowUpRight,
    label:  'Konga — Purchase',
    amount: '- ₦12,500',
    time:   'Yesterday',
    color:  'text-orange bg-orange/8',
    amountColor: 'text-orange',
  },
]

// Quick action buttons inside the mockup
const quickActions = [
  { icon: Send,       label: 'Send'   },
  { icon: PiggyBank,  label: 'Save'   },
  { icon: BarChart3,  label: 'Stats'  },
]

// ─── Dashboard Mockup ─────────────────────────────────────────────────────────
// This is a pure CSS/JSX "screenshot" of the Moniq app.
// It lives inside a phone-shaped frame.

function DashboardMockup({ isInView }: { isInView: boolean }) {
  return (
    // Phone frame — rounded corners, border, shadow
    <motion.div
      initial={{ opacity: 0, y: 32, rotate: 2 }}
      animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="relative mx-auto w-[300px] md:w-[320px]"
    >
      {/* Outer phone frame */}
      <div
        className="relative rounded-[2.5rem] overflow-hidden border-[6px] border-navy/10"
        style={{
          boxShadow: '0 32px 80px rgba(8,13,26,0.18), 0 8px 24px rgba(0,82,255,0.10)',
          background: '#F3F5FC',
        }}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pt-4 pb-2 bg-navy">
          <span className="text-[10px] font-mono text-white/60">9:41</span>
          <div className="flex items-center gap-1">
            {/* Signal bars */}
            {[3, 5, 7, 9].map((h) => (
              <div key={h} style={{ height: h, width: 3 }} className="bg-white/70 rounded-sm" />
            ))}
            {/* Battery */}
            <div className="w-5 h-2.5 rounded-sm border border-white/50 ml-1 flex items-center px-0.5">
              <div className="w-3 h-1.5 bg-white/70 rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* App header */}
        <div className="bg-navy px-5 pb-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-white/50 text-[11px] font-body">Good morning,</p>
              <p className="text-white font-display font-bold text-base">Adaeze</p>
            </div>
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-blue-accent/30 border-2 border-blue-accent/40 flex items-center justify-center">
              <span className="text-xs font-bold text-blue-accent font-mono">AO</span>
            </div>
          </div>

          {/* Balance card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="rounded-2xl p-4 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #0052FF 0%, #0041CC 60%, #003AB8 100%)',
            }}
          >
            {/* Glow on card */}
            <div
              className="absolute top-0 right-0 w-24 h-24 opacity-20"
              style={{ background: 'radial-gradient(circle, #00C49A, transparent 70%)' }}
              aria-hidden="true"
            />
            <p className="text-white/60 text-[10px] font-body mb-1">Total Balance</p>
            <p className="text-white font-mono font-bold text-2xl tracking-tight mb-3">
              ₦ 1,285,430<span className="text-base text-white/60">.00</span>
            </p>
            <div className="flex items-center justify-between">
              <span className="text-white/50 text-[10px] font-mono tracking-widest">
                •••• •••• •••• 4821
              </span>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded-full bg-white/20" />
                <div className="w-4 h-4 rounded-full bg-white/30 -ml-2" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* App body — white background */}
        <div className="bg-white px-4 pb-6">

          {/* Quick actions */}
          <div className="grid grid-cols-3 gap-2 py-4 border-b border-navy-100">
            {quickActions.map(({ icon: Icon, label }, i) => (
              <motion.button
                key={label}
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                className="flex flex-col items-center gap-1.5 py-2 rounded-xl hover:bg-bg-subtle transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-light flex items-center justify-center">
                  <Icon size={16} className="text-blue-accent" aria-hidden="true" />
                </div>
                <span className="text-[10px] font-semibold text-navy-400 font-body">{label}</span>
              </motion.button>
            ))}
          </div>

          {/* Transactions */}
          <div className="pt-4">
            <p className="text-xs font-bold text-navy font-body tracking-wide mb-3">
              Recent Activity
            </p>
            <div className="flex flex-col gap-2">
              {mockTransactions.map((tx, i) => (
                <motion.div
                  key={tx.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${tx.color}`}>
                    <tx.icon size={14} aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-navy font-body truncate">{tx.label}</p>
                    <p className="text-[10px] text-navy-400 font-body">{tx.time}</p>
                  </div>
                  <span className={`text-[11px] font-bold font-mono flex-shrink-0 ${tx.amountColor}`}>
                    {tx.amount}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Floating notification card — outside the phone */}
      <motion.div
        initial={{ opacity: 0, x: 24, y: 0 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.85 }}
        className="absolute -right-8 top-24 bg-white rounded-2xl shadow-card-hover border border-navy-100 p-3 w-44"
      >
        <div className="flex items-start gap-2">
          <div className="w-7 h-7 rounded-lg bg-mint-light flex items-center justify-center flex-shrink-0">
            <ArrowDownLeft size={13} className="text-mint" aria-hidden="true" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-navy font-body leading-tight">Money received</p>
            <p className="text-[10px] text-navy-400 font-body">₦350,000 from GTBank</p>
          </div>
        </div>
      </motion.div>

      {/* Floating savings badge */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute -left-8 bottom-24 bg-white rounded-2xl shadow-card-hover border border-navy-100 p-3 w-40"
      >
        <p className="text-[10px] font-bold text-navy font-body mb-1.5">Savings goal</p>
        <div className="w-full h-1.5 rounded-full bg-navy-100 overflow-hidden mb-1">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '68%' } : {}}
            transition={{ duration: 1, delay: 1.1, ease: 'easeOut' }}
            className="h-full rounded-full bg-mint"
          />
        </div>
        <p className="text-[10px] text-navy-400 font-body">68% · ₦680k of ₦1M</p>
      </motion.div>
    </motion.div>
  )
}

// ─── Section Shell ────────────────────────────────────────────────────────────

export function AppShowcaseSection() {
  const ref      = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section id="app" className="bg-bg-subtle overflow-hidden">
      <div
        ref={ref}
        className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center"
      >

        {/* Left — copy */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-light border border-blue-mid mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-accent" aria-hidden="true" />
            <span className="text-xs font-semibold font-body text-blue-accent tracking-wide uppercase">
              The Moniq App
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-navy tracking-tight mb-6 leading-[1.1]">
            Your entire financial life,{' '}
            <span className="text-gradient">one screen</span>
          </h2>

          <p className="text-navy-400 font-body text-lg leading-relaxed mb-8">
            Designed from the ground up for the Nigerian user — fast,
            intuitive, and built to handle everything from daily transfers
            to long-term savings goals.
          </p>

          {/* Feature bullets */}
          <ul className="flex flex-col gap-4">
            {highlights.map(({ icon: Icon, text }, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                className="flex items-center gap-3"
              >
                <Icon size={18} className="text-mint flex-shrink-0" aria-hidden="true" />
                <span className="text-navy-500 font-body text-base">{text}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Right — dashboard mockup */}
        <div className="flex items-center justify-center py-12 lg:py-0">
          <DashboardMockup isInView={isInView} />
        </div>

      </div>
    </Section>
  )
}
