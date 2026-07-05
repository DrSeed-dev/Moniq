// src/components/sections/BankMarquee.tsx
//
// PURPOSE: Answers "can I send to MY bank?" before the user asks.
// This is a conversion-critical question. The moment a user sees their
// bank name in the strip, the mental barrier drops.
//
// HOW THE INFINITE SCROLL WORKS:
// We render the bank list TWICE side by side in one container.
// The CSS animation moves the container left by exactly 50% of its width —
// which is exactly the width of one list.
// When it reaches -50%, it snaps back to 0% — seamlessly,
// because the second copy looks identical to the first.
// The eye never sees the reset. This is the standard marquee technique.
//
// The `marquee` keyframe is already defined in index.css @theme.
// We reference it via inline style here.
//
// Two rows scrolling in OPPOSITE directions — this is a premium detail.
// Used by Vercel, Linear, and Stripe on their partner/integration pages.

import { motion } from 'framer-motion'

// Nigerian banks — row 1 and row 2 split for visual variety
const banksRow1 = [
  { name: 'GTBank',       abbr: 'GTB'   },
  { name: 'Access Bank',  abbr: 'ACC'   },
  { name: 'Zenith Bank',  abbr: 'ZNT'   },
  { name: 'First Bank',   abbr: 'FBN'   },
  { name: 'UBA',          abbr: 'UBA'   },
  { name: 'Kuda Bank',    abbr: 'KDA'   },
  { name: 'OPay',         abbr: 'OPY'   },
  { name: 'Wema Bank',    abbr: 'WMA'   },
  { name: 'Sterling Bank',abbr: 'STL'   },
  { name: 'Fidelity',     abbr: 'FDL'   },
]

const banksRow2 = [
  { name: 'Stanbic IBTC', abbr: 'STB'   },
  { name: 'Ecobank',      abbr: 'ECO'   },
  { name: 'FCMB',         abbr: 'FCM'   },
  { name: 'Union Bank',   abbr: 'UNB'   },
  { name: 'Polaris Bank', abbr: 'PLR'   },
  { name: 'Keystone',     abbr: 'KYS'   },
  { name: 'PalmPay',      abbr: 'PPY'   },
  { name: 'Moniepoint',   abbr: 'MNP'   },
  { name: 'Carbon',       abbr: 'CBN'   },
  { name: 'VFD Bank',     abbr: 'VFD'   },
]

// A single bank pill — consistent design language with the rest of the site
function BankPill({ name, abbr }: { name: string; abbr: string }) {
  return (
    <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white border border-navy-100 shadow-sm flex-shrink-0">
      {/* Abbreviation badge */}
      <div className="w-7 h-7 rounded-lg bg-blue-light flex items-center justify-center flex-shrink-0">
        <span className="text-[9px] font-black font-mono text-blue-accent tracking-tight">
          {abbr}
        </span>
      </div>
      <span className="text-sm font-semibold text-navy font-body whitespace-nowrap">
        {name}
      </span>
    </div>
  )
}

// A single scrolling row — direction controlled by `reverse` prop
function MarqueeRow({ banks, reverse = false }: { banks: typeof banksRow1; reverse?: boolean }) {
  return (
    // Outer mask: `overflow-hidden` clips the scrolling content.
    // The gradient fade on left/right edges makes it feel infinite.
    <div
      className="relative overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}
    >
      {/* Inner track — flex row, double-width for seamless loop */}
      <div
        className="flex gap-3 w-max"
        style={{
          // Animate left for normal, right for reverse
          // Duration controls speed — higher = slower
          animation: `marquee ${reverse ? '35s' : '30s'} linear infinite ${reverse ? 'reverse' : 'normal'}`,
        }}
      >
        {/* First copy */}
        {banks.map((bank) => (
          <BankPill key={`a-${bank.name}`} name={bank.name} abbr={bank.abbr} />
        ))}
        {/* Second copy — makes the loop seamless */}
        {banks.map((bank) => (
          <BankPill key={`b-${bank.name}`} name={bank.name} abbr={bank.abbr} />
        ))}
      </div>
    </div>
  )
}

export function BankMarquee() {
  return (
    <section className="py-14 md:py-20 bg-bg-subtle overflow-hidden">
      <div className="container-main mb-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center"
        >
          <p className="text-xs font-bold font-body text-navy-300 tracking-widest uppercase mb-2">
            Supported banks
          </p>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-navy">
            Send to any bank in Nigeria
          </h3>
          <p className="text-navy-400 font-body text-base mt-2">
            200+ banks and mobile wallets supported
          </p>
        </motion.div>
      </div>

      {/* Two rows, opposite scroll directions */}
      <div className="flex flex-col gap-3">
        <MarqueeRow banks={banksRow1} reverse={false} />
        <MarqueeRow banks={banksRow2} reverse={true}  />
      </div>
    </section>
  )
}
