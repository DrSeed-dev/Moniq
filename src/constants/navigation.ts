// src/constants/navigation.ts
//
// Each link now has an optional `comingSoon` flag.
// When true, the Footer renders it with a toast onClick
// instead of a real href navigation.
// Product links scroll to real sections — no flag needed.

export const NAV_LINKS = [
  { label: 'Features',     href: '#features'     },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing',      href: '#pricing'      },
  { label: 'Business',     href: '#business'     },
]

export const FOOTER_LINKS: {
  [category: string]: { label: string; href: string; comingSoon?: boolean }[]
} = {
  Product: [
    { label: 'Features',     href: '#features'     },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Pricing',      href: '#pricing'      },
    { label: 'Business',     href: '#business'     },
    { label: 'Security',     href: '#'             },
  ],
  Company: [
    { label: 'About us',  href: '#', comingSoon: true },
    { label: 'Blog',      href: '#', comingSoon: true },
    { label: 'Careers',   href: '#', comingSoon: true },
    { label: 'Press',     href: '#', comingSoon: true },
    { label: 'Contact',   href: '#', comingSoon: true },
  ],
  Legal: [
    { label: 'Privacy Policy',   href: '#', comingSoon: true },
    { label: 'Terms of Service', href: '#', comingSoon: true },
    { label: 'Cookie Policy',    href: '#', comingSoon: true },
  ],
}

export const SITE_CONFIG = {
  name:         'Moniq',
  tagline:      'Banking built for modern Nigeria',
  description:  'Modern Nigerian fintech platform for fast, simple, and intelligent banking.',
  waitlistUrl:  '#',
  appStoreUrl:  '#',
  playStoreUrl: '#',
  social: {
    twitter:   '#',
    instagram: '#',
    linkedin:  '#',
  },
}
