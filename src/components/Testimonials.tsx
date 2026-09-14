import React, { useState, useEffect, useCallback, useRef } from 'react';

/* ==========================================================================
   PLACEHOLDER TESTIMONIALS — Replace these records with verified client quotes
   ========================================================================== */
interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  location: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'placeholder-1',
    quote:
      'Olivia executed the entire programmatic architecture for our regional expansion. The lead volume tripled within forty days of deployment, and the site runs flawlessly.',
    name: 'Marcus Vance',
    role: 'Managing Director',
    company: 'HPM Electrical Group',
    location: 'Philadelphia, PA',
  },
  {
    id: 'placeholder-2',
    quote:
      'Her dual command of high-end design sensibilities and server-side deployment pipelines is extraordinarily rare. She delivered our luxury residence portal ahead of schedule.',
    name: 'Amara Nwosu',
    role: 'Head of Development',
    company: 'District 9 Properties',
    location: 'Abuja, Nigeria',
  },
  {
    id: 'placeholder-3',
    quote:
      'Implementing both standard Stripe checkout and WhatsApp routing opened up our entire diaspora customer base without friction. An absolute masterclass in e-commerce strategy.',
    name: 'Adeyemi Taylor',
    role: 'Operations Lead',
    company: 'All Grace African Market',
    location: 'London, UK',
  },
];

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const prev = useCallback(() => {
    setCurrentIndex((curr) => (curr === 0 ? TESTIMONIALS.length - 1 : curr - 1));
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((curr) => (curr === TESTIMONIALS.length - 1 ? 0 : curr + 1));
  }, []);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      // Check if carousel or children are focused
      if (containerRef.current.contains(document.activeElement)) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prev();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          next();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prev, next]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    if (diffX > 50) {
      next();
    } else if (diffX < -50) {
      prev();
    }
    touchStartX.current = null;
  };

  const activeTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section
      id="testimonials"
      ref={containerRef}
      tabIndex={0}
      aria-label="Client Testimonials Carousel"
      className="section-ink relative py-24 sm:py-32 border-b border-[var(--rule-ink)] focus:outline-none"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header with Eyebrow and Navigation controls in the corner */}
        <div className="flex items-end justify-between mb-16 pb-6 border-b border-[var(--rule-ink)]">
          <div>
            <span className="eyebrow mb-3">KIND WORDS</span>
            <h2 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] text-[var(--text-on-ink)] leading-[0.95] tracking-tight">
              Testimonials & client remarks.
            </h2>
          </div>

          {/* Corner Prev/Next Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="p-3 border border-[var(--rule-ink)] text-[var(--text-on-ink)] hover:border-[var(--ochre)] hover:text-[var(--ochre)] transition-colors duration-150 font-mono-custom text-sm"
            >
              ← PREV
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="p-3 border border-[var(--rule-ink)] text-[var(--text-on-ink)] hover:border-[var(--ochre)] hover:text-[var(--ochre)] transition-colors duration-150 font-mono-custom text-sm"
            >
              NEXT →
            </button>
          </div>
        </div>

        {/* Carousel Card on --ink-raised with swipe on touch */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative min-h-[320px] sm:min-h-[280px] p-8 sm:p-14 bg-[var(--ink-raised)] border border-[var(--rule-ink)] flex flex-col justify-between"
        >
          {/* Quote in display serif */}
          <blockquote className="mb-10">
            <p className="font-display text-2xl sm:text-3xl lg:text-4xl text-[var(--text-on-ink)] leading-relaxed italic">
              “{activeTestimonial.quote}”
            </p>
          </blockquote>

          {/* Attribution: name, role, company in mono */}
          <div className="pt-6 border-t border-[var(--rule-ink)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <span className="font-mono-custom text-sm font-semibold uppercase tracking-wider text-[var(--ochre)]">
                {activeTestimonial.name}
              </span>
              <span className="hidden sm:inline text-[var(--muted-on-ink)] font-mono-custom text-xs">
                /
              </span>
              <span className="font-mono-custom text-xs text-[var(--text-on-ink)]">
                {activeTestimonial.role}, {activeTestimonial.company}
              </span>
            </div>

            <span className="font-mono-custom text-xs text-[var(--muted-on-ink)]">
              {activeTestimonial.location}
            </span>
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {TESTIMONIALS.map((t, idx) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
              className={`h-2 transition-all duration-150 ${
                currentIndex === idx
                  ? 'w-8 bg-[var(--clay)]'
                  : 'w-2 bg-[var(--muted-on-ink)]/40 hover:bg-[var(--muted-on-ink)]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
