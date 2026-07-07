// src/hooks/useMediaQuery.ts
//
// WHY THIS HOOK EXISTS:
// Tailwind handles responsive *styling* via CSS breakpoints.
// But sometimes you need to know the screen size in JavaScript —
// for example, to disable an animation on mobile, or render
// a completely different component tree.
//
// This hook wraps the browser's `window.matchMedia` API in React state.
// It returns true/false and updates automatically when the window resizes.
//
// USAGE:
//   const isMobile  = useMediaQuery('(max-width: 767px)')
//   const isTablet  = useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
//   const isDesktop = useMediaQuery('(min-width: 1024px)')

import { useState, useEffect } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    // Check on initial render — important for SSR safety
    // and for getting the correct value before first paint
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const media = window.matchMedia(query)

    // Sync state if query changes
    setMatches(media.matches)

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)

    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}

// Pre-built breakpoints matching Tailwind's default scale
// Import these instead of writing the query string every time
export const breakpoints = {
  sm:  '(min-width: 640px)',
  md:  '(min-width: 768px)',
  lg:  '(min-width: 1024px)',
  xl:  '(min-width: 1280px)',
  mobile:  '(max-width: 767px)',
  tablet:  '(min-width: 768px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',
} as const
