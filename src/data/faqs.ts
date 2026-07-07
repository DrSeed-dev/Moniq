// src/data/faqs.ts

export interface FAQItem {
  q: string
  a: string
}

export const faqs: FAQItem[] = [
  {
    q: 'Is Moniq a real bank?',
    a: 'Moniq is a licensed financial technology company operating under the Central Bank of Nigeria (CBN) guidelines. Your funds are held in a CBN-regulated institution and protected by the Nigeria Deposit Insurance Corporation (NDIC) up to ₦5 million.',
  },
  {
    q: 'How long does it take to open an account?',
    a: 'Under 2 minutes. All you need is your phone number, BVN, and a valid government ID. No branch visits, no paperwork. Your account is verified instantly and ready to use the moment you finish signing up.',
  },
  {
    q: 'What are the transfer limits?',
    a: 'Starter accounts can send up to ₦100,000 per day. Personal plan accounts go up to ₦5 million per day. Business accounts have custom limits set during onboarding. All transfers are instant, 24/7.',
  },
  {
    q: 'Is my money safe on Moniq?',
    a: 'Yes. Moniq uses 256-bit AES encryption, biometric authentication, and real-time fraud detection. Your funds are held in CBN-regulated custody accounts and insured by the NDIC. We also offer instant card freeze if your phone is lost.',
  },
  {
    q: 'Can I use Moniq for my business?',
    a: 'Absolutely. The Business plan includes a separate business account with NUBAN, bulk payment processing for payroll, invoice generation, team member access, and a dedicated account manager. Over 500 Nigerian SMEs use Moniq for daily operations.',
  },
  {
    q: 'How does the Annual plan discount work?',
    a: 'When you choose annual billing, you pay for 10 months and get 2 months free — a flat 20% saving. The full annual amount is charged once at the start of your billing year. You can cancel before your renewal date for a pro-rated refund.',
  },
  {
    q: 'What happens if I hit my transfer limit?',
    a: "You'll receive a notification when you approach your daily limit. You can upgrade your plan at any time to increase it. Limits reset at midnight every day. Emergency limit increases for verified business needs can be requested via support.",
  },
]
