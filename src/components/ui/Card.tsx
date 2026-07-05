// src/components/ui/Card.tsx
//
// WHY THE FIX:
// Framer Motion's `ease` prop expects the specific union type `Easing`,
// not a plain `string`. TypeScript inferred `ease: 'easeOut'` as `string`.
// Fix: `as const` narrows the type to the exact literal 'easeOut',
// which IS assignable to Easing.

import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface CardProps {
  children:   React.ReactNode
  className?: string
  hover?:     boolean
  glow?:      boolean
  padding?:   'sm' | 'md' | 'lg'
}

const paddingMap = { sm: 'p-4', md: 'p-6', lg: 'p-8' }

export function Card({
  children,
  className,
  hover   = false,
  glow    = false,
  padding = 'md',
}: CardProps) {
  return hover ? (
    <motion.div
      whileHover={{ y: -3 }}
      // `as const` is the fix — tells TypeScript this is the literal 'easeOut',
      // not a generic string. Framer Motion accepts it as a valid Easing value.
      transition={{ duration: 0.2, ease: 'easeOut' as const }}
      className={cn(
        'rounded-2xl bg-white border border-navy-100 shadow-card',
        'hover:border-blue-mid hover:shadow-card-hover transition-all duration-200 cursor-pointer',
        glow && 'shadow-glow',
        paddingMap[padding],
        className
      )}
    >
      {children}
    </motion.div>
  ) : (
    <div
      className={cn(
        'rounded-2xl bg-white border border-navy-100 shadow-card',
        glow && 'shadow-glow',
        paddingMap[padding],
        className
      )}
    >
      {children}
    </div>
  )
}
