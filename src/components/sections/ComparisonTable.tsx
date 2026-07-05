// src/components/sections/ComparisonTable.tsx
//
// PURPOSE: Kill objections with data. Side-by-side proof.
// "₦0 fees" vs "₦52.50 per transfer" is more powerful than any headline.
// This section converts fence-sitters.
//
// DESIGN DECISION — Card-style comparison, not a spreadsheet:
// A raw HTML <table> looks like a government form.
// We use a custom grid layout that looks designed — each row is its
// own card-like strip, alternating subtle backgrounds for readability.
// The Moniq column is visually elevated with blue accent indicators.
//
// The check (✓) and cross (✗) icons use Lucide — consistent with the system.

import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { cn } from '@/utils/cn'

// ─── Comparison Data ──────────────────────────────────────────────────────────

type CellValue =
  | { type: 'check' }
  | { type: 'cross' }
  | { type: 'text'; value: string }
  | { type: 'highlight'; value: string }  // green/positive highlight
  | { type: 'muted'; value: string }      // grey/negative

interface ComparisonRow {
  feature: string
  moniq:   CellValue
  trad:    CellValue
}

const rows: ComparisonRow[] = [
  {
    feature: 'Transfer fees',
    moniq:   { type: 'highlight', value: '₦0 always'         },
    trad:    { type: 'muted',     value: '₦52.50 per transfer'},
  },
  {
    feature: 'Account opening',
    moniq:   { type: 'highlight', value: '2 minutes online'  },
    trad:    { type: 'muted',     value: '1–3 weeks in-branch'},
  },
  {
    feature: 'Transfer speed',
    moniq:   { type: 'highlight', value: 'Instant, 24/7'     },
    trad:    { type: 'muted',     value: '24–48 hrs weekdays' },
  },
  {
    feature: 'Weekend banking',
    moniq:   { type: 'check'                                  },
    trad:    { type: 'cross'                                  },
  },
  {
    feature: 'Savings interest',
    moniq:   { type: 'highlight', value: 'Up to 12% p.a.'    },
    trad:    { type: 'muted',     value: '3–5% p.a.'         },
  },
  {
    feature: 'Monthly maintenance fee',
    moniq:   { type: 'highlight', value: '₦0'                },
    trad:    { type: 'muted',     value: '₦50–₦200/month'    },
  },
  {
    feature: 'Bill payments',
    moniq:   { type: 'check'                                  },
    trad:    { type: 'check'                                  },
  },
  {
    feature: 'Spend analytics',
    moniq:   { type: 'check'                                  },
    trad:    { type: 'cross'                                  },
  },
  {
    feature: 'Virtual USD card',
    moniq:   { type: 'check'                                  },
    trad:    { type: 'cross'                                  },
  },
  {
    feature: 'Customer support',
    moniq:   { type: 'highlight', value: 'Chat · Call · 24/7'},
    trad:    { type: 'muted',     value: 'Branch only'       },
  },
]

// ─── Cell Renderer ────────────────────────────────────────────────────────────

function Cell({ value, isMoniq }: { value: CellValue; isMoniq: boolean }) {
  switch (value.type) {
    case 'check':
      return (
        <div className="flex justify-center">
          <div className={cn(
            'w-6 h-6 rounded-full flex items-center justify-center',
            isMoniq ? 'bg-mint-light' : 'bg-mint-light'
          )}>
            <Check size={13} className="text-mint" aria-label="Yes" />
          </div>
        </div>
      )
    case 'cross':
      return (
        <div className="flex justify-center">
          <div className="w-6 h-6 rounded-full bg-orange/8 flex items-center justify-center">
            <X size={13} className="text-orange" aria-label="No" />
          </div>
        </div>
      )
    case 'highlight':
      return (
        <span className={cn(
          'text-sm font-bold font-body',
          isMoniq ? 'text-blue-accent' : 'text-mint'
        )}>
          {value.value}
        </span>
      )
    case 'muted':
      return (
        <span className="text-sm font-body text-navy-400">
          {value.value}
        </span>
      )
    case 'text':
      return (
        <span className="text-sm font-body text-navy">{value.value}</span>
      )
  }
}

// ─── Section Shell ────────────────────────────────────────────────────────────

export function ComparisonTable() {
  return (
    <Section id="compare" className="bg-white">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-center max-w-2xl mx-auto mb-14"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange/8 border border-orange/20 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-orange" aria-hidden="true" />
          <span className="text-xs font-semibold font-body text-orange tracking-wide uppercase">
            The difference
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-display font-extrabold text-navy tracking-tight mb-4">
          Why Nigerians are{' '}
          <span className="text-gradient">switching to Moniq</span>
        </h2>

        <p className="text-navy-400 font-body text-lg leading-relaxed">
          The numbers speak for themselves. Traditional banking was built for
          a different era — Moniq was built for now.
        </p>
      </motion.div>

      {/* Comparison grid */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
        className="max-w-3xl mx-auto"
      >

        {/* Column headers */}
        <div className="grid grid-cols-[1fr_1fr_1fr] gap-0 mb-3 px-4">
          <div /> {/* Empty — feature label column */}

          {/* Moniq header — elevated */}
          <div className="flex flex-col items-center gap-1">
            <div className="px-4 py-2 rounded-xl bg-blue-accent shadow-[0_2px_12px_rgba(0,82,255,0.25)]">
              <span className="text-sm font-bold font-display text-white tracking-tight">
                Moniq
              </span>
            </div>
          </div>

          {/* Traditional banks header */}
          <div className="flex flex-col items-center gap-1">
            <div className="px-4 py-2 rounded-xl bg-bg-subtle border border-navy-100">
              <span className="text-sm font-semibold font-body text-navy-400">
                Traditional Banks
              </span>
            </div>
          </div>
        </div>

        {/* Rows */}
        <div className="rounded-2xl border border-navy-100 overflow-hidden">
          {rows.map((row, i) => (
            <div
              key={row.feature}
              className={cn(
                'grid grid-cols-[1fr_1fr_1fr] gap-0 items-center px-4 py-4',
                i % 2 === 0 ? 'bg-white' : 'bg-bg-subtle/60',
                i < rows.length - 1 && 'border-b border-navy-100'
              )}
            >
              {/* Feature label */}
              <span className="text-sm font-semibold text-navy font-body pr-4">
                {row.feature}
              </span>

              {/* Moniq value */}
              <div className="flex justify-center">
                <Cell value={row.moniq} isMoniq={true} />
              </div>

              {/* Traditional value */}
              <div className="flex justify-center">
                <Cell value={row.trad} isMoniq={false} />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-navy-300 font-body mt-4">
          * Fee comparison based on average charges from top 5 Nigerian commercial banks, Q1 2024.
        </p>
      </motion.div>

    </Section>
  )
}
