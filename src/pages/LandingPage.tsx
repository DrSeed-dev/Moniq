// src/pages/LandingPage.tsx
// Complete landing page — every section assembled in production order.

import { Navbar              } from '@/components/layout/Navbar'
import { Footer              } from '@/components/layout/Footer'
import { ScrollProgress      } from '@/components/ui/ScrollProgress'
import { HeroSection         } from '@/components/sections/HeroSection'
import { TrustBar            } from '@/components/sections/TrustBar'
import { FeaturesSection     } from '@/components/sections/FeaturesSection'
import { BankMarquee         } from '@/components/sections/BankMarquee'
import { AppShowcaseSection  } from '@/components/sections/AppShowcaseSection'
import { ComparisonTable     } from '@/components/sections/ComparisonTable'
import { StatsSection        } from '@/components/sections/StatsSection'
import { HowItWorksSection   } from '@/components/sections/HowItWorksSection'
import { MobileAppSection    } from '@/components/sections/MobileAppSection'
import { PricingSection      } from '@/components/sections/PricingSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { FAQSection          } from '@/components/sections/FAQSection'
import { CTASection          } from '@/components/sections/CTASection'

export function LandingPage() {
  return (
    <>
      {/* Scroll progress — fixed, always on top */}
      <ScrollProgress />

      <Navbar />

      <main>
        <HeroSection         />  {/* First impression              */}
        <TrustBar            />  {/* Immediate credibility         */}
        <FeaturesSection     />  {/* What Moniq does               */}
        <BankMarquee         />  {/* Which banks are supported     */}
        <AppShowcaseSection  />  {/* Visual proof of the product   */}
        <ComparisonTable     />  {/* Moniq vs traditional banks    */}
        <StatsSection        />  {/* Credibility numbers           */}
        <HowItWorksSection   />  {/* How to get started            */}
        <MobileAppSection    />  {/* App download CTA              */}
        <PricingSection      />  {/* Plans + billing toggle        */}
        <TestimonialsSection />  {/* Social proof                  */}
        <FAQSection          />  {/* Handle objections             */}
        <CTASection          />  {/* Final conversion push         */}
      </main>

      <Footer />
    </>
  )
}
