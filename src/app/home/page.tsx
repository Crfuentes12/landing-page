//landing-page/src/app/home/page.tsx
import Hero from "@/components/home/Hero";
import AboutUs from "@/components/home/AboutUs";
import FAQ from "@/components/home/FAQ";
import CTA from "@/components/home/CTA";
import OurServices from "@/components/home/OurServices";
import Roadmap from "@/components/home/Roadmap";
import ScrollToTop from "@/components/ScrollToTop";
import PricingWrapper from "@/components/home/PricingWrapper";

export default function Home() {
  return (
    <>
      <div>
        <section id="hero">
          <Hero />
        </section>

        <section id="services">
          <OurServices />
        </section>

        <section id="roadmap">
          <Roadmap />
        </section>
        
        <section id="about">
          <AboutUs />
        </section>
        
        <section id="pricing">
          <PricingWrapper />
        </section>
        
        <section id="faq">
          <FAQ />
        </section>
        
        <section id="contact">
          <CTA />
        </section>
      </div>
      <ScrollToTop />
    </>
  );
}