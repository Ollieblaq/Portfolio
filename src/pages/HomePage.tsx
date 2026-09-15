import React from 'react';
import { Hero } from '../components/Hero';
import { SelectedWork } from '../components/SelectedWork';
import { Capabilities } from '../components/Capabilities';
import { CtaBand } from '../components/CtaBand';
import { Footer } from '../components/Footer';
import { ScrollReveal } from '../components/ScrollReveal';

export const HomePage: React.FC = () => {
  return (
    <main className="w-full">
      {/* 2. HERO (ink, min-height 92vh) */}
      <Hero />

      {/* 4. SELECTED WORK (cream) — the centrepiece */}
      <ScrollReveal>
        <SelectedWork />
      </ScrollReveal>

      {/* 5. CAPABILITIES (ink) */}
      <ScrollReveal>
        <Capabilities />
      </ScrollReveal>

      {/* 8. CTA BAND (full-bleed clay) */}
      <CtaBand />

      {/* 9. FOOTER (ink) */}
      <Footer />
    </main>
  );
};
