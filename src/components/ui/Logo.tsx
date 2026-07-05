// src/components/ui/Logo.tsx
// Moniq brand mark — SVG icon + wordmark. Zero emojis.

interface LogoProps {
  size?:  'sm' | 'md' | 'lg'
  theme?: 'dark' | 'light'
}

const sizeMap = {
  sm: { icon: 28, text: '1.1rem',  gap: '0.5rem'  },
  md: { icon: 36, text: '1.35rem', gap: '0.625rem' },
  lg: { icon: 44, text: '1.65rem', gap: '0.75rem'  },
}

export function Logo({ size = 'md', theme = 'dark' }: LogoProps) {
  const { icon, text, gap } = sizeMap[size]
  const wordColor = theme === 'dark' ? '#080D1A' : '#FFFFFF'

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap }}>
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="40" height="40" rx="11" fill="#0052FF" />
        <path
          d="M8 28 L8 15 L20 23.5 L32 15 L32 28"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="32" cy="11" r="3.5" fill="#00C49A" />
      </svg>

      <span
        style={{
          fontFamily:    "'Plus Jakarta Sans', sans-serif",
          fontSize:      text,
          fontWeight:    800,
          letterSpacing: '-0.03em',
          lineHeight:    1,
          userSelect:    'none',
        }}
      >
        <span style={{ color: wordColor }}>mon</span>
        <span style={{ color: '#0052FF'  }}>iq</span>
      </span>
    </div>
  )
}
