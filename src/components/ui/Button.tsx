// src/components/ui/Button.tsx
//
// WHY THE FIX:
// Extending React.ButtonHTMLAttributes<HTMLButtonElement> brought in
// `onAnimationStart: AnimationEventHandler` which conflicts with
// Framer Motion's `onAnimationStart: (definition: AnimationDefinition) => void`.
// Fix: define only the props we actually need instead of spreading everything.

import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
type ButtonSize    = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?:   ButtonVariant
  size?:      ButtonSize
  isLoading?: boolean
  leftIcon?:  React.ReactNode
  rightIcon?: React.ReactNode
  children:   React.ReactNode
  className?: string
  disabled?:  boolean
  onClick?:   React.MouseEventHandler<HTMLButtonElement>
  type?:      'button' | 'submit' | 'reset'
  // aria attributes for accessibility
  'aria-label'?:       string
  'aria-expanded'?:    boolean
  'aria-controls'?:    string
  'aria-describedby'?: string
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'bg-blue-accent text-white',
    'hover:bg-blue-hover',
    'shadow-[0_1px_3px_rgba(0,82,255,0.3),0_4px_16px_rgba(0,82,255,0.2)]',
    'hover:shadow-[0_2px_6px_rgba(0,82,255,0.35),0_8px_24px_rgba(0,82,255,0.25)]',
  ].join(' '),
  secondary: 'bg-bg-subtle text-navy border border-navy-100 hover:bg-navy-100 hover:border-navy-200',
  ghost:     'text-navy-500 hover:text-navy hover:bg-bg-subtle',
  outline:   'border border-blue-accent text-blue-accent hover:bg-blue-light',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2    text-sm  rounded-lg',
  md: 'px-5 py-2.5  text-sm  rounded-xl',
  lg: 'px-7 py-3.5  text-base rounded-xl',
}

export function Button({
  variant   = 'primary',
  size      = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  onClick,
  type = 'button',
  ...ariaProps
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.975 }}
      transition={{ duration: 0.15 }}
      className={cn(
        'inline-flex items-center justify-center gap-2',
        'font-semibold font-body cursor-pointer select-none',
        'transition-all duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...ariaProps}
    >
      {isLoading
        ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        : leftIcon
      }
      {children}
      {!isLoading && rightIcon}
    </motion.button>
  )
}
