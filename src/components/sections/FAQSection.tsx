// src/components/sections/FAQSection.tsx
// Data imported from src/data/faqs.ts — component only handles rendering.

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Section } from '@/components/layout/Section'
import { faqs } from '@/data/faqs'
import type { FAQItem } from '@/data/faqs'

function FAQItemCard({
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
      transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.05 }}
      className={cn(
        'border rounded-2xl overflow-hidden transition-colors duration-200',
        isOpen
          ? 'border-blue-mid bg-blue-light/30'
          : 'border-navy-100 bg-white hover:border-navy-200'
      )}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className={cn(
          'font-display font-semibold text-base leading-snug transition-colors duration-200',
          isOpen ? 'text-blue-accent' : 'text-navy'
        )}>
          {item.q}
        </span>
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

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0    }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{   height: 0, opacity: 0    }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-6 pb-5 pt-0">
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

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <Section id="faq" className="bg-bg-subtle">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-center max-w-xl mx-auto mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-light border border-blue-mid mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-accent" aria-hidden="true" />
          <span className="text-xs font-semibold font-body text-blue-accent tracking-wide uppercase">FAQ</span>
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

      <div className="max-w-3xl mx-auto flex flex-col gap-3">
        {faqs.map((item, i) => (
          <FAQItemCard
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
