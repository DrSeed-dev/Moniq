// src/components/sections/TestimonialsSection.tsx
// Masonry layout testimonials. No emojis — location shown as text only.

import { motion } from 'framer-motion'
import { MapPin, Star } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { cn } from '@/utils/cn'

interface Testimonial {
  name:     string
  role:     string
  location: string
  avatar:   string
  color:    string
  quote:    string
  feature:  string
}

const testimonials: Testimonial[] = [
  {
    name:     'Adaeze Okonkwo',
    role:     'Fashion Designer',
    location: 'Lagos',
    avatar:   'AO',
    color:    'bg-blue-light text-blue-accent',
    feature:  'Instant Transfers',
    quote:    "I used to spend 20 minutes in my bank's app just to send money to my suppliers in Aba. With Moniq it takes 5 seconds. I genuinely don't understand why every bank can't do this.",
  },
  {
    name:     'Emeka Nwosu',
    role:     'Tech Entrepreneur',
    location: 'Abuja',
    avatar:   'EN',
    color:    'bg-mint-light text-mint',
    feature:  'Business Payments',
    quote:    "Running payroll for 12 staff used to be a whole Friday afternoon exercise. Now I batch it from my phone in under 3 minutes. The business banking features are built by people who actually understand Nigerian SMEs.",
  },
  {
    name:     'Halima Bello',
    role:     'Medical Doctor',
    location: 'Kano',
    avatar:   'HB',
    color:    'bg-orange/10 text-orange',
    feature:  'Smart Savings',
    quote:    "I set a savings goal for my house deposit in January. The interest rate is competitive and I can see my progress daily. It finally made saving feel motivating rather than painful.",
  },
  {
    name:     'Tunde Adesanya',
    role:     'Logistics Manager',
    location: 'Port Harcourt',
    avatar:   'TA',
    color:    'bg-blue-light text-blue-accent',
    feature:  'Zero Fees',
    quote:    "I was paying over ₦15,000 monthly in bank charges and transfer fees. Switched everything to Moniq two months ago. The savings alone pay for my data subscription.",
  },
  {
    name:     'Ngozi Chibuike',
    role:     'Content Creator',
    location: 'Enugu',
    avatar:   'NC',
    color:    'bg-mint-light text-mint',
    feature:  'Spend Analytics',
    quote:    "The spending breakdown showed me I was spending ₦45,000 a month on food delivery without realising it. Moniq is basically a financial therapist.",
  },
]

function StarRating() {
  return (
    <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={13} fill="#0052FF" stroke="none" aria-hidden="true" />
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      className="bg-white rounded-2xl border border-navy-100 shadow-card hover:shadow-card-hover hover:border-navy-200 transition-all duration-300 p-6 flex flex-col gap-4"
    >
      <div className="flex items-center justify-between">
        <StarRating />
        <span className="text-[11px] font-semibold font-body text-navy-400 bg-bg-subtle px-2.5 py-1 rounded-full border border-navy-100">
          {testimonial.feature}
        </span>
      </div>

      <blockquote className="text-navy-500 font-body text-[15px] leading-relaxed">
        "{testimonial.quote}"
      </blockquote>

      <div className="flex items-center gap-3 pt-2 border-t border-navy-100">
        <div
          className={cn(
            'w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0',
            'text-xs font-bold font-mono',
            testimonial.color
          )}
          aria-hidden="true"
        >
          {testimonial.avatar}
        </div>
        <div>
          <p className="text-sm font-semibold text-navy font-body leading-tight">
            {testimonial.name}
          </p>
          <div className="flex items-center gap-1 mt-0.5">
            <MapPin size={10} className="text-navy-300" aria-hidden="true" />
            <p className="text-xs text-navy-400 font-body">
              {testimonial.role} · {testimonial.location}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function TestimonialsSection() {
  const col0 = [testimonials[0], testimonials[3]]
  const col1 = [testimonials[1], testimonials[4]]
  const col2 = [testimonials[2]]

  return (
    <Section id="testimonials" className="bg-bg-subtle">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-xl mx-auto mb-14"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange/8 border border-orange/20 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-orange" aria-hidden="true" />
          <span className="text-xs font-semibold font-body text-orange tracking-wide uppercase">Testimonials</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-display font-extrabold text-navy tracking-tight mb-4">
          Real people.{' '}
          <span className="text-gradient">Real results.</span>
        </h2>
        <p className="text-navy-400 font-body text-lg leading-relaxed">
          From Lagos to Kano — here's what Nigerians are saying about Moniq.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:items-start">
        <div className="flex flex-col gap-5">
          {col0.map((t, i) => <TestimonialCard key={t.name} testimonial={t} index={i} />)}
        </div>
        <div className="flex flex-col gap-5 md:mt-10">
          {col1.map((t, i) => <TestimonialCard key={t.name} testimonial={t} index={i + 2} />)}
        </div>
        <div className="flex flex-col gap-5">
          {col2.map((t, i) => <TestimonialCard key={t.name} testimonial={t} index={i + 4} />)}
        </div>
      </div>

    </Section>
  )
}
