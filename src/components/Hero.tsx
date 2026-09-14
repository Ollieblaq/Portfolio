import React, { useState, useEffect, useRef } from 'react';

const CYCLING_WORDS = ['websites', 'design systems', 'web apps', 'infrastructure'];

export const Hero: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const wordMeasureRef = useRef<HTMLSpanElement>(null);
  const [wordWidth, setWordWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Word cycling every 2.4s
  useEffect(() => {
    if (prefersReducedMotion) {
      setWordIndex(CYCLING_WORDS.length - 1); // show final word statically
      return;
    }

    const interval = setInterval(() => {
      setIsExiting(true);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % CYCLING_WORDS.length);
        setIsExiting(false);
      }, 260); // fast exit out upward
    }, 2400);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  // Update container width to match current word width for smooth non-jumping layout
  useEffect(() => {
    if (wordMeasureRef.current) {
      const rect = wordMeasureRef.current.getBoundingClientRect();
      if (rect.width > 0) {
        setWordWidth(rect.width);
      }
    }
  }, [wordIndex]);

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.getElementById('contact');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadCv = (e: React.MouseEvent) => {
    e.preventDefault();
    // Provide clean curriculum vitae summary download/modal
    const cvText = `OLIVIA ONYEKABA — CURRICULUM VITAE
Location: Lagos, Nigeria
Disciplines: Web Development, UI/UX Design, DevOps Engineering
Contact: oliviaimmaculate1@gmail.com

SUMMARY:
Multidisciplinary engineer bridging interface craft and robust infrastructure. Experienced in building full-stack applications with Next.js, React, Astro, Laravel, and WordPress, complemented by automated deployment pipelines, Docker containerisation, and cloud architecture.

TECHNICAL EXPERTISE:
- Languages & Frameworks: TypeScript, JavaScript, PHP, React, Next.js, Astro, Tailwind CSS, Node.js, Laravel
- Infrastructure & DevOps: Docker, GitHub Actions, Nginx, Linux Server Administration, Vercel, DigitalOcean, Cloudflare DNS & SSL
- Design: UI/UX Design Systems, Figma, Responsive Architecture, WCAG Accessibility

SELECTED CLIENT ENGAGEMENTS:
- AfroVoy: Diaspora travel marketplace connecting travellers with verified Lagos stays and experiences (Next.js, Laravel).
- HPM Electric: Programmatic multi-township SEO service matrix generating localized leads for Pennsylvania electrical contractor (Astro, TypeScript).
- District 9 Branded Residences: Luxury residential sales platform with two-step investor expression of interest flow (WordPress, Gravity Forms).
- All Grace African Market: High-volume UK grocery commerce with parallel WhatsApp checkout routing (WooCommerce, Stripe).
- HYTENS Solutions: Enterprise ICT infrastructure corporate platform with structured service verticals.
`;
    const blob = new Blob([cvText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Olivia_Onyekaba_CV_2026.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="hero"
      className="section-ink relative min-h-[92vh] flex items-center pt-8 pb-16 overflow-hidden border-b border-[var(--rule-ink)]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full">
        {/* 12-column grid with deliberate asymmetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: 7 columns on desktop */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Small mono greeting line */}
            <div className="flex items-center gap-3 mb-6">
              <span className="eyebrow">// PORTFOLIO 2026 · BASED IN LAGOS, NIGERIA</span>
            </div>

            {/* Display-serif headline where ONE WORD CYCLES */}
            <h1 className="font-display text-[clamp(2.75rem,6.8vw,6.25rem)] text-[var(--text-on-ink)] leading-[0.95] tracking-[-0.025em] mb-8">
              I build{' '}
              <span
                className="relative inline-block overflow-hidden align-baseline transition-[width] duration-300 ease-out"
                style={{
                  width: prefersReducedMotion || !wordWidth ? 'auto' : `${wordWidth}px`,
                  verticalAlign: 'baseline',
                }}
              >
                {/* Hidden measuring span */}
                <span
                  ref={wordMeasureRef}
                  className="invisible absolute pointer-events-none whitespace-nowrap text-[var(--clay)]"
                  aria-hidden="true"
                >
                  {CYCLING_WORDS[wordIndex]}
                </span>

                {/* Visible animated word */}
                <span
                  className={`inline-block text-[var(--clay)] whitespace-nowrap transition-transform duration-260 ${
                    prefersReducedMotion
                      ? ''
                      : isExiting
                      ? '-translate-y-full opacity-0'
                      : 'translate-y-0 opacity-100'
                  }`}
                  style={{
                    transitionTimingFunction: 'var(--ease-out)',
                  }}
                >
                  {CYCLING_WORDS[wordIndex]}
                </span>
              </span>{' '}
              that ship.
            </h1>

            {/* Two-sentence positioning paragraph */}
            <p className="font-body text-base sm:text-lg lg:text-xl text-[var(--muted-on-ink)] leading-relaxed max-w-[62ch] mb-10">
              Bridging the gap between meticulous interface craft and resilient DevOps infrastructure.
              I architect performant digital products, custom client platforms, and reliable deployment systems from Lagos to the world.
            </p>

            {/* Two buttons */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Clay filled "Start a project" */}
              <a
                href="#contact"
                onClick={scrollToContact}
                className="inline-flex items-center justify-center bg-[var(--clay)] text-[var(--cream)] px-7 py-3.5 text-xs font-mono-custom uppercase tracking-wider font-semibold hover:opacity-95 active:scale-[0.98] transition-opacity duration-150"
              >
                Start a project
              </a>

              {/* Outlined "Download CV" */}
              <button
                type="button"
                onClick={handleDownloadCv}
                className="inline-flex items-center justify-center border border-[var(--rule-ink)] text-[var(--text-on-ink)] hover:border-[var(--ochre)] hover:text-[var(--ochre)] px-7 py-3.5 text-xs font-mono-custom uppercase tracking-wider font-semibold transition-colors duration-150 active:scale-[0.98]"
              >
                Download CV
              </button>
            </div>
          </div>

          {/* Right Column: 5 columns on desktop holding portrait placeholder with layered geometric shapes */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[360px] sm:max-w-[420px] aspect-[3/4]">
              {/* Offset geometric shape 1: Ochre layered behind at low opacity */}
              <div
                aria-hidden="true"
                className="absolute -top-4 -left-4 w-full h-full border-2 border-[var(--ochre)] opacity-20 pointer-events-none -rotate-2"
              />

              {/* Offset geometric shape 2: Sage layered behind at low opacity */}
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -right-4 w-full h-full bg-[var(--sage)] opacity-15 pointer-events-none rotate-1"
              />

              {/* Portrait image container */}
              <div className="relative w-full h-full overflow-hidden bg-[var(--ink-raised)] border border-[var(--rule-ink)] z-10">
                <img
                  src="/images/portrait.webp"
                  alt="Portrait of Olivia Onyekaba, web developer and DevOps engineer"
                  className="w-full h-full object-cover object-center grayscale contrast-105"
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    // Fallback to elegant graphic if image path cannot be fetched in preview
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class="w-full h-full flex flex-col justify-between p-8 bg-[var(--ink-raised)]">
                          <span class="font-mono-custom text-xs text-[var(--ochre)] uppercase tracking-widest">// OLIVIA ONYEKABA</span>
                          <div>
                            <p class="font-display text-4xl text-[var(--text-on-ink)] leading-none">DevOps & Frontend Engineer</p>
                            <p class="font-mono-custom text-xs text-[var(--muted-on-ink)] mt-3">Lagos, Nigeria</p>
                          </div>
                          <div class="flex gap-2">
                            <span class="w-3 h-3 rounded-full bg-[var(--clay)]"></span>
                            <span class="w-3 h-3 rounded-full bg-[var(--ochre)]"></span>
                            <span class="w-3 h-3 rounded-full bg-[var(--sage)]"></span>
                          </div>
                        </div>
                      `;
                    }
                  }}
                />

                {/* Subtle caption pill in corner */}
                <div className="absolute bottom-3 left-3 z-20 px-2.5 py-1 bg-[var(--ink)]/90 border border-[var(--rule-ink)] font-mono-custom text-[11px] text-[var(--text-on-ink)] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--sage)]" aria-hidden="true" />
                  <span>OLIVIA ONYEKABA · LAGOS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
