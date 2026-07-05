// src/components/layout/Section.tsx
// Wraps every page section with consistent vertical padding.

import { cn } from '@/utils/cn'

interface SectionProps {
  children:   React.ReactNode
  className?: string
  id?:        string
  contained?: boolean
}

export function Section({
  children,
  className,
  id,
  contained = true,
}: SectionProps) {
  return (
    <section id={id} className={cn('section-padding', className)}>
      {contained
        ? <div className="container-main">{children}</div>
        : children
      }
    </section>
  )
}
