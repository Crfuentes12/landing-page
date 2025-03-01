// src/app/home/page.tsx
'use client';

import Hero from "@/components/home/Hero";
import OurClientsCarousel from '@/components/home/OurClientsCarousel';
import WhyWeDoThis from '@/components/home/WhyWeDoThis';
import AboutUs from "@/components/home/AboutUs";
import FAQ from "@/components/home/FAQ";
import CTA from "@/components/home/CTA";
import Roadmap from "@/components/home/Roadmap";
import PricingWrapper from "@/components/home/PricingWrapper";
import ComparisonMatrix from "@/components/home/ComparisonMatrix";
import BannerCTA from "@/components/home/BannerCTA";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <>
      <div>
        <section id="hero">
          <Hero />
        </section>

        <section id="carousel">
          <OurClientsCarousel />
        </section>

        <section id="why-we-do-this">
          <WhyWeDoThis />
        </section>

        <section id="roadmap">
          <Roadmap />
        </section>

        <section id="comparison-matrix">
          <ComparisonMatrix />
        </section>

        <section id="about">
          <AboutUs />
        </section>

        <section id="banner-cta">
          <BannerCTA />
        </section>
        
        <section id="pricing">
          <PricingWrapper />
        </section>
        
        <section id="faq">
          <FAQ />
        </section>
        
        <section className="cta" id="contact">
          <CTA />
        </section>
      </div>
      <ScrollToTop />
    </>
  );
}