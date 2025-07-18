import { CTASection } from "./_sections/cta-section";
import { FeaturesSection } from "./_sections/features-section";
import { FlowSection } from "./_sections/flow-section";
import { HeroSection } from "./_sections/hero-section";
import { HowSection } from "./_sections/how-section";
import { ShowcaseSection } from "./_sections/showcase-section";
import { TestimonialsSection } from "./_sections/testimonials-section";

export default function RootPage() {
  return (
    <>
      <HeroSection />
      <ShowcaseSection />
      <FlowSection />
      <HowSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
