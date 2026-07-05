// src/components/ui/Badge.tsx
// Updated for light theme backgrounds.

import { cn } from '@/utils/cn'

type BadgeVariant = 'blue' | 'mint' | 'orange' | 'neutral' | 'outline'

interface BadgeProps {
  variant?:   BadgeVariant
  dot?:       boolean
  children:   React.ReactNode
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  blue:    'bg-blue-light  text-blue-accent  border border-blue-mid',
  mint:    'bg-mint-light  text-mint          border border-mint/25',
  orange:  'bg-orange/8    text-orange        border border-orange/20',
  neutral: 'bg-bg-subtle   text-navy-400      border border-navy-100',
  outline: 'bg-transparent text-navy-400      border border-navy-200',
}

const dotColors: Record<BadgeVariant, string> = {
  blue:    'bg-blue-accent',
  mint:    'bg-mint',
  orange:  'bg-orange',
  neutral: 'bg-navy-200',
  outline: 'bg-navy-200',
}

export function Badge({ variant = 'blue', dot = false, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5',
        'px-3 py-1 rounded-full',
        'text-xs font-semibold font-body',
        variantStyles[variant],
        className
      )}
    >
      {dot && (
        <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])} />
      )}
      {children}
    </span>
  )
}
