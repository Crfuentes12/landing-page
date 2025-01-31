'use client';
//landing-page/src/components/home/PricingWrapper.tsx
import dynamic from 'next/dynamic';

const Pricing = dynamic(() => import('./Pricing'), {
  ssr: false,
});

export default function PricingWrapper() {
  return <Pricing />;
}