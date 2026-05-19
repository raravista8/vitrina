import { BenefitsStack } from "@/components/BenefitsStack";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { ICPCards } from "@/components/ICPCards";
import { Pricing } from "@/components/Pricing";

export default function HomePage() {
  return (
    <main id="top">
      <Hero />
      <BenefitsStack />
      <HowItWorks />
      <ICPCards />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
