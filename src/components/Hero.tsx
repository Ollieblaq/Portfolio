import React, { useState, useEffect, useRef } from 'react';
import { PortraitImage } from './PortraitImage';

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
    const cvText = `OLIVIA ONYEKABA — WEB DEVELOPER
Lagos, Nigeria | oliviaimmaculate1@gmail.com | 0903 990 8443 | github.com/Ollieblaq

================================================================================
PROFILE
================================================================================
Web developer with five years' experience building and shipping production websites
and web applications for clients across Nigeria, the United Kingdom and the United States.
Comfortable across the stack — Next.js and React on the front end, Laravel on the back end —
and equally at home delivering commerce, membership and lead-generation builds on WordPress
and WooCommerce. Currently Chief Technology Officer at AfroVoy, a Nigerian travel technology company.

================================================================================
TECHNICAL SKILLS
================================================================================
Languages:             TypeScript, JavaScript, PHP, HTML5, CSS3
Frameworks & Libraries: Next.js, React, Laravel, Astro, Tailwind CSS
CMS & E-commerce:      WordPress, WooCommerce, Elementor, Gravity Forms, Stripe, PayPal
Practices:             Responsive development, REST API integration, technical SEO,
                       Schema.org structured data, Git version control, cross-browser testing

================================================================================
EXPERIENCE
================================================================================
Chief Technology Officer, AfroVoy (2025 – Present)
Lagos, Nigeria — travel technology
• Technical lead and founding-team member at a Nigerian travel technology company building a platform for discovering, planning and booking hotels, destinations and tours across Africa.
• Set the technical direction and built the product as a Next.js front end against a Laravel API, owning architecture decisions on both sides of the stack.
• Designed the platform around three distinct user types — travellers, hotel partners and tour operators — covering listing management, availability and booking flows.
• Implemented international card payment handling so diaspora travellers can book from abroad in their local currency.

Web Developer, Bature Digital (2025 – Present)
Lagos, Nigeria — subscription digital marketing agency
• In-house web developer for an agency serving clients across the United States, United Kingdom, Australia and Canada, delivering the web development arm of its marketing-as-a-service offering.
• Build and maintain conversion-focused client websites, working to Core Web Vitals performance targets and handing over sites the client's own team can run.
• Run conversion-rate optimisation experiments on live client sites and implement the winning variants.
• Work alongside the SEO, paid ads, social and email specialists so that site builds support the wider channel strategy rather than sitting apart from it.

Freelance Web Developer (2021 – Present)
Lagos, Nigeria — clients in Nigeria, the UK and the US
• Deliver end-to-end website builds for clients across real estate, e-commerce, education, enterprise ICT and skilled trades, from requirements through to launch and handover.
• Built a programmatic page architecture in Astro for a US electrical contractor, generating individually optimised landing pages for every service and service-area combination, each with its own metadata and schema markup.
• Delivered commerce and membership systems including a multi-currency WooCommerce storefront, a several-hundred-SKU store with a parallel WhatsApp ordering path, and a gated student portal with registration, login and dashboard.
• Work directly with non-technical clients to scope requirements, agree timelines and provide post-launch support.

================================================================================
SELECTED PROJECTS
================================================================================
• AfroVoy (afrovoy.com): Travel technology platform for discovering and booking hotels, destinations and tours across Africa. Full-stack build across front end and API (Next.js · Laravel · TypeScript).
• HPM Electric (hpmelectric.com): Site for a Pennsylvania electrical contractor built on a programmatic page matrix spanning 4 service categories, ~20 sub-services and 8 service areas (Astro · TypeScript · Schema.org · Technical SEO).
• All Grace African Market (allgraceafricanmarket.co.uk): WooCommerce storefront for a UK African grocery retailer with several hundred SKUs, Stripe, order tracking and WhatsApp ordering (WordPress · WooCommerce · Elementor · Stripe).
• District 9 Branded Residences (district9brandedresidences.com): Sales site for luxury branded-residence development in Abuja with 2-step Expression of Interest form (WordPress · Elementor · Gravity Forms).
• London Bible Academy (londonbibleacademy.com): Site and student portal for UK-registered theological training charity with gated student layer and PayPal donation flow (WordPress · Elementor · Membership · PayPal).
• Aura Cayane (auracayane.com): WooCommerce store for fragrance brand with 3-currency switcher (naira/sterling/dollar), accounts, wishlists (WordPress · WooCommerce · Multi-currency).
• TheCampStack (thecampstack.com): Single-page React application for camp software integration platform (React · JavaScript).
• HYTENS Solutions (hytens-services.com): Corporate site for enterprise ICT infrastructure provider across 6 service verticals and 6 industry segments (WordPress · Elementor).
• Kúnlé Ìlòrí-Diamond (kunleiloridiamond.com): Personal site for real estate entrepreneur with holdings across Dubai, US, UK and Nigeria (WordPress).

================================================================================
EDUCATION
================================================================================
Higher National Diploma, Electrical/Electronics Engineering
Federal Polytechnic Oko, Anambra State, Nigeria

References: Available on request
`;
    const blob = new Blob([cvText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Olivia_Onyekaba_CV.txt';
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
                <PortraitImage
                  alt="Portrait of Olivia Onyekaba, web developer and DevOps engineer"
                  className="w-full h-full object-cover object-center contrast-[1.03] brightness-[0.98] transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
