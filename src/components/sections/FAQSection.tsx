// src/components/sections/FAQSection.tsx
//
// WHAT THIS TEACHES:
// ──────────────────
// Managing MULTIPLE pieces of state — which FAQ item is open.
// We use a single `openIndex` state (number | null).
// null  = nothing open
// 0     = first item open
// 1     = second item open, etc.
//
// WHY NOT AN ARRAY OF BOOLEANS?
// You could do [false, true, false, false] — one bool per item.
// But then clicking a new item doesn't close the previous one automatically.
// A single `openIndex` number is cleaner: only one item can be open at a time.
//
// ANIMATION:
// AnimatePresence + motion.div for the answer content.
// Height animates from 0 to auto using Framer Motion's layout animation.
// The chevron icon rotates 180° when open.

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Section } from '@/components/layout/Section'

// ─── FAQ Data ─────────────────────────────────────────────────────────────────

interface FAQItem {
  q: string
  a: string
}

const faqs: FAQItem[] = [
  {
    q: 'Is Moniq a real bank?',
    a: 'Moniq is a licensed financial technology company operating under the Central Bank of Nigeria (CBN) guidelines. Your funds are held in a CBN-regulated institution and protected by the Nigeria Deposit Insurance Corporation (NDIC) up to ₦5 million.',
  },
  {
    q: 'How long does it take to open an account?',
    a: 'Under 2 minutes. All you need is your phone number, BVN, and a valid government ID. No branch visits, no paperwork. Your account is verified instantly and ready to use the moment you finish signing up.',
  },
  {
    q: 'What are the transfer limits?',
    a: 'Starter accounts can send up to ₦100,000 per day. Personal plan accounts go up to ₦5 million per day. Business accounts have custom limits set during onboarding. All transfers are instant, 24/7.',
  },
  {
    q: 'Is my money safe on Moniq?',
    a: 'Yes. Moniq uses 256-bit AES encryption, biometric authentication, and real-time fraud detection. Your funds are held in CBN-regulated custody accounts and insured by the NDIC. We also offer instant card freeze if your phone is lost.',
  },
  {
    q: 'Can I use Moniq for my business?',
    a: 'Absolutely. The Business plan includes a separate business account with NUBAN, bulk payment processing for payroll, invoice generation, team member access, and a dedicated account manager. Over 500 Nigerian SMEs use Moniq for daily operations.',
  },
  {
    q: 'How does the Annual plan discount work?',
    a: 'When you choose annual billing, you pay for 10 months and get 2 months free — a flat 20% saving. The full annual amount is charged once at the start of your billing year. You can cancel before your renewal date for a pro-rated refund.',
  },
  {
    q: 'What happens if I hit my transfer limit?',
    a: "You'll receive a notification when you approach your daily limit. You can upgrade your plan at any time to increase it. Limits reset at midnight every day. Emergency limit increases for verified business needs can be requested via support.",
  },
]

// ─── Single FAQ Item ──────────────────────────────────────────────────────────

function FAQItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item:     FAQItem
  index:    number
  isOpen:   boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
      className={cn(
        'border rounded-2xl overflow-hidden transition-colors duration-200',
        isOpen
          ? 'border-blue-mid bg-blue-light/30'
          : 'border-navy-100 bg-white hover:border-navy-200'
      )}
    >
      {/* Question button */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span
          className={cn(
            'font-display font-semibold text-base leading-snug transition-colors duration-200',
            isOpen ? 'text-blue-accent' : 'text-navy'
          )}
        >
          {item.q}
        </span>

        {/* Rotating chevron icon */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className={cn(
            'flex-shrink-0 transition-colors duration-200',
            isOpen ? 'text-blue-accent' : 'text-navy-300'
          )}
        >
          <ChevronDown size={18} aria-hidden="true" />
        </motion.div>
      </button>

      {/* Answer — AnimatePresence handles mount/unmount animation */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            // These animate height from 0 to its natural height
            initial={{ height: 0, opacity: 0   }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{   height: 0, opacity: 0   }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-6 pb-5 pt-0">
              {/* Top rule separates Q from A */}
              <div className="h-px bg-blue-mid/40 mb-4" />
              <p className="text-navy-400 font-body text-base leading-relaxed">
                {item.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Section Shell ────────────────────────────────────────────────────────────

export function FAQSection() {
  // Single number tracks which item is open.
  // null = all closed. i = item at index i is open.
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (index: number) => {
    // If clicked item is already open → close it (set to null)
    // If it's a different item → open it (set to its index)
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <Section id="faq" className="bg-bg-subtle">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-xl mx-auto mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-light border border-blue-mid mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-accent" aria-hidden="true" />
          <span className="text-xs font-semibold font-body text-blue-accent tracking-wide uppercase">
            FAQ
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-display font-extrabold text-navy tracking-tight mb-4">
          Questions we{' '}
          <span className="text-gradient">always get asked</span>
        </h2>

        <p className="text-navy-400 font-body text-lg">
          Can't find your answer?{' '}
          <a href="#" className="text-blue-accent hover:underline font-semibold">
            Talk to us directly.
          </a>
        </p>
      </motion.div>

      {/* Two-column layout on desktop */}
      <div className="max-w-3xl mx-auto flex flex-col gap-3">
        {faqs.map((item, i) => (
          <FAQItem
            key={i}
            item={item}
            index={i}
            isOpen={openIndex === i}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>

    </Section>
  )
}
