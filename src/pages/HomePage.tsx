import React from 'react';
import { Hero } from '../components/Hero';
import { StackMarquee } from '../components/StackMarquee';
import { SelectedWork } from '../components/SelectedWork';
import { Capabilities } from '../components/Capabilities';
import { Numbers } from '../components/Numbers';
import { Testimonials } from '../components/Testimonials';
import { CtaBand } from '../components/CtaBand';
import { Footer } from '../components/Footer';
import { ScrollReveal } from '../components/ScrollReveal';

export const HomePage: React.FC = () => {
  return (
    <main className="w-full">
      {/* 2. HERO (ink, min-height 92vh) */}
      <Hero />

      {/* 3. STACK MARQUEE (ink, thin band, hairline rules above and below) */}
      <StackMarquee />

      {/* 4. SELECTED WORK (cream) — the centrepiece */}
      <ScrollReveal>
        <SelectedWork />
      </ScrollReveal>

      {/* 5. CAPABILITIES (ink) */}
      <ScrollReveal>
        <Capabilities />
      </ScrollReveal>

      {/* 6. NUMBERS (cream, thin band) */}
      <ScrollReveal>
        <Numbers />
      </ScrollReveal>

      {/* 7. TESTIMONIALS (ink) */}
      <ScrollReveal>
        <Testimonials />
      </ScrollReveal>

      {/* 8. CTA BAND (full-bleed clay) */}
      <CtaBand />

      {/* 9. FOOTER (ink) */}
      <Footer />
    </main>
  );
};
