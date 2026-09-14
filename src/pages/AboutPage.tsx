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
                  <dd className="text-[var(--text-on-ink)] font-medium">DevOps & Frontend Engineer</dd>
                </div>
                <div className="flex justify-between border-b border-[var(--rule-ink)] pb-2">
                  <dt className="text-[var(--muted-on-ink)]">LOCATION</dt>
                  <dd className="text-[var(--text-on-ink)] font-medium">Lagos, Nigeria (UTC+1)</dd>
                </div>
                <div className="flex justify-between border-b border-[var(--rule-ink)] pb-2">
                  <dt className="text-[var(--muted-on-ink)]">AVAILABILITY</dt>
                  <dd className="text-[var(--sage)] font-medium">Available Q2/Q3 2026</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--muted-on-ink)]">WHATSAPP</dt>
                  <dd className="text-[var(--ochre)] font-medium">+234 903 990 8443</dd>
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
                Web developer, UI/UX designer, and DevOps engineer based in Lagos, Nigeria.
                I build high-integrity web applications, resilient deployment pipelines,
                and mathematically structured design systems for founders, institutions, and global teams.
              </p>
              <p>
                My work exists at the intersection of design precision and systems architecture:
                crafting typography and layout with extreme optical fidelity, backed by CI/CD pipelines,
                Dockerized microservices, and high-availability cloud infrastructure.
              </p>
              <p>
                Whether architecting an end-to-end fintech dashboard or structuring zero-downtime
                Kubernetes rollouts, I believe great software should be as dependable under the hood
                as it is intuitive on the glass.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 bg-[var(--clay)] text-[var(--cream)] font-mono-custom text-xs uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity"
              >
                Explore Selected Work →
              </Link>
              <a
                href="mailto:oliviaimmaculate1@gmail.com"
                className="inline-flex items-center px-6 py-3 border border-[var(--rule-ink)] text-[var(--text-on-ink)] font-mono-custom text-xs uppercase tracking-wider hover:border-[var(--ochre)] hover:text-[var(--ochre)] transition-colors"
              >
                Email Olivia
              </a>
              <a
                href="https://wa.me/2349039908443?text=Hello%20Olivia,%20I'd%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--rule-ink)] text-[var(--text-on-ink)] font-mono-custom text-xs uppercase tracking-wider hover:border-[var(--ochre)] hover:text-[var(--ochre)] transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--sage)]" aria-hidden="true" />
                WhatsApp (+234 903 990 8443) →
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
