import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { PortraitImage } from '../components/PortraitImage';

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full section-ink min-h-screen flex flex-col justify-between">
      {/* Top navigation breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6 w-full border-b border-[var(--rule-ink)] flex items-center justify-between font-mono-custom text-xs">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[var(--muted-on-ink)] hover:text-[var(--ochre)] transition-colors uppercase tracking-wider"
        >
          ← INDEX / SELECTED WORK
        </Link>
        <span className="text-[var(--ochre)]">ABOUT OLIVIA</span>
      </div>

      <main className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Portrait */}
          <div className="lg:col-span-5">
            <div className="relative w-full max-w-[420px] mx-auto lg:mx-0 aspect-[3/4]">
              <div
                aria-hidden="true"
                className="absolute -top-3 -left-3 w-full h-full border border-[var(--ochre)] opacity-30 pointer-events-none -rotate-2"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-3 -right-3 w-full h-full bg-[var(--sage)] opacity-15 pointer-events-none rotate-1"
              />
              <div className="relative w-full h-full overflow-hidden bg-[var(--ink-raised)] border border-[var(--rule-ink)] z-10">
                <PortraitImage
                  alt="Portrait of Olivia Onyekaba"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* Quick credentials card */}
            <div className="mt-8 p-6 bg-[var(--ink-raised)] border border-[var(--rule-ink)] max-w-[420px] mx-auto lg:mx-0">
              <span className="font-mono-custom text-xs text-[var(--ochre)] uppercase tracking-wider block mb-3">
                // AT A GLANCE
              </span>
              <dl className="space-y-3 font-mono-custom text-xs">
                <div className="flex justify-between border-b border-[var(--rule-ink)] pb-2">
                  <dt className="text-[var(--muted-on-ink)]">PRIMARY ROLE</dt>
                  <dd className="text-[var(--text-on-ink)] font-medium">Web Developer & CTO</dd>
                </div>
                <div className="flex justify-between border-b border-[var(--rule-ink)] pb-2">
                  <dt className="text-[var(--muted-on-ink)]">LOCATION</dt>
                  <dd className="text-[var(--text-on-ink)] font-medium">Lagos, Nigeria</dd>
                </div>
                <div className="flex justify-between border-b border-[var(--rule-ink)] pb-2">
                  <dt className="text-[var(--muted-on-ink)]">GITHUB</dt>
                  <dd>
                    <a
                      href="https://github.com/Ollieblaq"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--ochre)] hover:underline font-medium"
                    >
                      github.com/Ollieblaq ↗
                    </a>
                  </dd>
                </div>
                <div className="flex justify-between border-b border-[var(--rule-ink)] pb-2">
                  <dt className="text-[var(--muted-on-ink)]">EMAIL</dt>
                  <dd>
                    <a
                      href="mailto:oliviaimmaculate1@gmail.com"
                      className="text-[var(--text-on-ink)] hover:text-[var(--clay)] transition-colors"
                    >
                      oliviaimmaculate1@gmail.com
                    </a>
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--muted-on-ink)]">PHONE / WA</dt>
                  <dd className="text-[var(--ochre)] font-medium">0903 990 8443</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Right Column: Bio & Principles */}
          <div className="lg:col-span-7">
            <span className="eyebrow mb-4">// BIOGRAPHY & PRINCIPLES</span>
            <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-[var(--text-on-ink)] leading-[0.98] tracking-tight mb-8">
              Olivia Onyekaba
            </h1>

            <div className="space-y-6 font-body text-base sm:text-lg text-[var(--muted-on-ink)] leading-relaxed border-l border-[var(--rule-ink)] pl-6 sm:pl-8">
              <p>
                Web developer with five years' experience building and shipping production websites and web
                applications for clients across Nigeria, the United Kingdom and the United States.
              </p>
              <p>
                Comfortable across the entire stack — Next.js and React on the front end, Laravel on the back
                end — and equally at home delivering commerce, membership and lead-generation builds on WordPress
                and WooCommerce. Currently Chief Technology Officer at AfroVoy, a Nigerian travel technology company.
              </p>
            </div>

            {/* Direct contact and action links */}
            <div className="mt-8 flex flex-wrap items-center gap-3 font-mono-custom text-xs">
              <a
                href="https://github.com/Ollieblaq"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--clay)] text-[var(--cream)] font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                GitHub (Ollieblaq) ↗
              </a>
              <a
                href="https://wa.me/2349039908443?text=Hello%20Olivia,%20I'd%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--rule-ink)] text-[var(--text-on-ink)] uppercase tracking-wider hover:border-[var(--ochre)] hover:text-[var(--ochre)] transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--sage)]" aria-hidden="true" />
                WhatsApp: 0903 990 8443
              </a>
              <a
                href="mailto:oliviaimmaculate1@gmail.com"
                className="inline-flex items-center px-5 py-2.5 border border-[var(--rule-ink)] text-[var(--text-on-ink)] uppercase tracking-wider hover:border-[var(--ochre)] hover:text-[var(--ochre)] transition-colors"
              >
                Email
              </a>
            </div>

            {/* Technical Skills Matrix */}
            <div className="mt-14 pt-10 border-t border-[var(--rule-ink)]">
              <span className="eyebrow mb-6">// TECHNICAL SKILLS</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono-custom text-xs">
                <div className="p-4 bg-[var(--ink-raised)] border border-[var(--rule-ink)]">
                  <span className="text-[var(--ochre)] uppercase tracking-wider block mb-2 font-semibold">
                    Languages
                  </span>
                  <p className="text-[var(--text-on-ink)] leading-relaxed">
                    TypeScript, JavaScript, PHP, HTML5, CSS3
                  </p>
                </div>
                <div className="p-4 bg-[var(--ink-raised)] border border-[var(--rule-ink)]">
                  <span className="text-[var(--ochre)] uppercase tracking-wider block mb-2 font-semibold">
                    Frameworks & Libraries
                  </span>
                  <p className="text-[var(--text-on-ink)] leading-relaxed">
                    Next.js, React, Laravel, Astro, Tailwind CSS
                  </p>
                </div>
                <div className="p-4 bg-[var(--ink-raised)] border border-[var(--rule-ink)]">
                  <span className="text-[var(--ochre)] uppercase tracking-wider block mb-2 font-semibold">
                    CMS & E-commerce
                  </span>
                  <p className="text-[var(--text-on-ink)] leading-relaxed">
                    WordPress, WooCommerce, Elementor, Gravity Forms, Stripe, PayPal
                  </p>
                </div>
                <div className="p-4 bg-[var(--ink-raised)] border border-[var(--rule-ink)]">
                  <span className="text-[var(--ochre)] uppercase tracking-wider block mb-2 font-semibold">
                    Engineering Practices
                  </span>
                  <p className="text-[var(--text-on-ink)] leading-relaxed">
                    Responsive development, REST API integration, technical SEO, Schema.org structured data, Git version control, cross-browser testing
                  </p>
                </div>
              </div>
            </div>

            {/* Chronological Work Experience */}
            <div className="mt-14 pt-10 border-t border-[var(--rule-ink)]">
              <span className="eyebrow mb-8">// EXPERIENCE</span>
              <div className="space-y-12">
                {/* AfroVoy */}
                <div className="border-l-2 border-[var(--clay)] pl-6 relative">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                    <h3 className="font-display text-2xl text-[var(--text-on-ink)]">
                      Chief Technology Officer
                    </h3>
                    <span className="font-mono-custom text-xs text-[var(--clay)] uppercase tracking-wider">
                      2025 – Present
                    </span>
                  </div>
                  <p className="font-mono-custom text-xs text-[var(--ochre)] uppercase tracking-wider mb-4">
                    AfroVoy · Lagos, Nigeria — Travel Technology
                  </p>
                  <ul className="space-y-2.5 font-body text-sm text-[var(--muted-on-ink)] leading-relaxed list-disc list-outside pl-4">
                    <li>
                      Technical lead and founding-team member at a Nigerian travel technology company building a platform for discovering, planning and booking hotels, destinations and tours across Africa.
                    </li>
                    <li>
                      Set the technical direction and built the product as a Next.js front end against a Laravel API, owning architecture decisions on both sides of the stack.
                    </li>
                    <li>
                      Designed the platform around three distinct user types — travellers, hotel partners and tour operators — covering listing management, availability and booking flows.
                    </li>
                    <li>
                      Implemented international card payment handling so diaspora travellers can book from abroad in their local currency.
                    </li>
                  </ul>
                </div>

                {/* Bature Digital */}
                <div className="border-l-2 border-[var(--ochre)] pl-6 relative">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                    <h3 className="font-display text-2xl text-[var(--text-on-ink)]">
                      Web Developer
                    </h3>
                    <span className="font-mono-custom text-xs text-[var(--ochre)] uppercase tracking-wider">
                      2025 – Present
                    </span>
                  </div>
                  <p className="font-mono-custom text-xs text-[var(--ochre)] uppercase tracking-wider mb-4">
                    Bature Digital · Lagos, Nigeria — Subscription Digital Marketing Agency
                  </p>
                  <ul className="space-y-2.5 font-body text-sm text-[var(--muted-on-ink)] leading-relaxed list-disc list-outside pl-4">
                    <li>
                      In-house web developer for an agency serving clients across the United States, United Kingdom, Australia and Canada, delivering the web development arm of its marketing-as-a-service offering.
                    </li>
                    <li>
                      Build and maintain conversion-focused client websites, working to Core Web Vitals performance targets and handing over sites the client's own team can run.
                    </li>
                    <li>
                      Run conversion-rate optimisation experiments on live client sites and implement the winning variants.
                    </li>
                    <li>
                      Work alongside the SEO, paid ads, social and email specialists so that site builds support the wider channel strategy rather than sitting apart from it.
                    </li>
                  </ul>
                </div>

                {/* Freelance Web Developer */}
                <div className="border-l-2 border-[var(--sage)] pl-6 relative">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                    <h3 className="font-display text-2xl text-[var(--text-on-ink)]">
                      Freelance Web Developer
                    </h3>
                    <span className="font-mono-custom text-xs text-[var(--sage)] uppercase tracking-wider">
                      2021 – Present
                    </span>
                  </div>
                  <p className="font-mono-custom text-xs text-[var(--ochre)] uppercase tracking-wider mb-4">
                    Lagos, Nigeria — Clients in Nigeria, the UK and the US
                  </p>
                  <ul className="space-y-2.5 font-body text-sm text-[var(--muted-on-ink)] leading-relaxed list-disc list-outside pl-4">
                    <li>
                      Deliver end-to-end website builds for clients across real estate, e-commerce, education, enterprise ICT and skilled trades, from requirements through to launch and handover.
                    </li>
                    <li>
                      Built a programmatic page architecture in Astro for a US electrical contractor, generating individually optimised landing pages for every service and service-area combination, each with its own metadata and schema markup.
                    </li>
                    <li>
                      Delivered commerce and membership systems including a multi-currency WooCommerce storefront, a several-hundred-SKU store with a parallel WhatsApp ordering path, and a gated student portal with registration, login and dashboard.
                    </li>
                    <li>
                      Work directly with non-technical clients to scope requirements, agree timelines and provide post-launch support.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="mt-14 pt-10 border-t border-[var(--rule-ink)]">
              <span className="eyebrow mb-4">// EDUCATION</span>
              <div className="p-6 bg-[var(--ink-raised)] border border-[var(--rule-ink)]">
                <h3 className="font-display text-xl text-[var(--text-on-ink)] mb-1">
                  Higher National Diploma, Electrical/Electronics Engineering
                </h3>
                <p className="font-mono-custom text-xs text-[var(--ochre)] uppercase tracking-wider">
                  Federal Polytechnic Oko, Anambra State, Nigeria
                </p>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-4">
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 bg-[var(--clay)] text-[var(--cream)] font-mono-custom text-xs uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity"
              >
                ← Back to Index & Work
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
