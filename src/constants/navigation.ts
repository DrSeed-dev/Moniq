// src/constants/navigation.ts
//
// WHY THIS FILE EXISTS:
// Navigation links appear in multiple places — Navbar, Footer, mobile menu.
// If you define them in each component separately, updating one link
// means finding and editing 3 different files.
// Define once here, import everywhere. Single source of truth.

export const NAV_LINKS = [
  { label: 'Features',     href: '#features'     },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing',      href: '#pricing'      },
  { label: 'Business',     href: '#business'     },
]

// Footer link columns — Product, Company, Legal
// These are anchor links that scroll to real sections on the page,
// or placeholder # for pages that don't exist yet (Blog, Careers etc.)
export const FOOTER_LINKS = {
  Product: [
    { label: 'Features',       href: '#features'     },
    { label: 'How it works',   href: '#how-it-works' },
    { label: 'Pricing',        href: '#pricing'      },
    { label: 'Business',       href: '#business'     },
    { label: 'Security',       href: '#'             },
  ],
  Company: [
    { label: 'About us',       href: '#'             },
    { label: 'Blog',           href: '#'             },
    { label: 'Careers',        href: '#'             },
    { label: 'Press',          href: '#'             },
    { label: 'Contact',        href: '#'             },
  ],
  Legal: [
    { label: 'Privacy Policy',   href: '#'           },
    { label: 'Terms of Service', href: '#'           },
    { label: 'Cookie Policy',    href: '#'           },
  ],
}

// Site-wide config — single source for anything that appears in multiple places
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
