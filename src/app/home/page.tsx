//landing-page/src/app/home/page.tsx
import dynamic from 'next/dynamic';
import Hero from "@/components/home/Hero";
import AboutUs from "@/components/home/AboutUs";
import WhyUs from "@/components/home/WhyUs";
import FAQ from "@/components/home/FAQ";
import CTA from "@/components/home/CTA";
import OurServices from "@/components/home/OurServices";
import Roadmap from "@/components/home/Roadmap";
import ScrollToTop from "@/components/ScrollToTop";

// Dynamically import Pricing component with SSR disabled
const Pricing = dynamic(() => import('@/components/home/Pricing'), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <div className="space-y-20">
        <section id="hero">
          <Hero />
        </section>
        
        <section id="about">
          <AboutUs />
        </section>
        
        <section id="why-us">
          <WhyUs />
        </section>
        
        <section id="services">
          <OurServices />
        </section>
        
        <section id="pricing">
          <Pricing />
        </section>
        
        <section id="roadmap">
          <Roadmap />
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