// src/data/testimonials.ts
//
// WHY DATA LIVES HERE AND NOT IN THE COMPONENT:
// The TestimonialsSection component should only know HOW to render.
// It should not also be responsible for WHAT to render.
// This separation is called "separation of concerns" —
// one of the most important principles in software engineering.
//
// Benefit: if you want to update a testimonial, add a new one,
// or eventually pull this from an API, you only touch this file.
// The component never changes.

export interface Testimonial {
  name:     string
  role:     string
  location: string
  avatar:   string
  color:    string
  quote:    string
  feature:  string
}

export const testimonials: Testimonial[] = [
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
