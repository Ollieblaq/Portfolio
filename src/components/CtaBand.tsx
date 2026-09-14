import React from 'react';

export const CtaBand: React.FC = () => {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.getElementById('contact');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="cta-band"
      aria-label="Direct Call to Action"
      className="relative w-full py-28 sm:py-36 bg-[var(--clay)] text-[var(--cream)] select-none border-b border-[var(--clay)]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center justify-center">
        {/* Single display-serif line */}
        <h2 className="font-display text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.95] tracking-tight mb-10 text-[var(--cream)]">
          Have something worth building?
        </h2>

        {/* Cream button */}
        <a
          href="#contact"
          onClick={scrollToContact}
          className="inline-flex items-center justify-center bg-[var(--cream)] text-[var(--clay)] px-10 py-4 font-mono-custom text-xs uppercase tracking-widest font-semibold hover:bg-[var(--cream-soft)] active:scale-[0.98] transition-all duration-150"
        >
          Let’s Talk →
        </a>
      </div>
    </section>
  );
};
