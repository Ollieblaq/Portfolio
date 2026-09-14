import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';

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

      <main className="max-w-7xl mx-auto px-6 sm:px-8 py-24 sm:py-32 w-full">
        <div className="max-w-4xl">
          <span className="eyebrow mb-4">// BIOGRAPHY & PRINCIPLES</span>
          {/* Placeholder, single heading, to be filled later */}
          <h1 className="font-display text-[clamp(2.75rem,7vw,6.5rem)] text-[var(--text-on-ink)] leading-[0.95] tracking-tight mb-12">
            About Olivia Onyekaba
          </h1>

          <div className="space-y-8 font-body text-lg sm:text-xl text-[var(--muted-on-ink)] leading-relaxed border-l border-[var(--rule-ink)] pl-6 sm:pl-8">
            <p>
              Web developer, UI/UX designer and DevOps engineer based in Lagos, Nigeria.
              Focusing on building high-integrity web applications, resilient deployment
              systems, and mathematical design tokens for founders, institutions, and global teams.
            </p>
            <p className="font-mono-custom text-xs uppercase tracking-widest text-[var(--sage)]">
              [Profile content to be expanded with full chronology and speaking records]
            </p>
          </div>

          <div className="mt-12 flex items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-[var(--clay)] text-[var(--cream)] font-mono-custom text-xs uppercase tracking-wider font-semibold"
            >
              Explore Selected Work →
            </Link>
            <a
              href="mailto:oliviaimmaculate1@gmail.com"
              className="inline-flex items-center px-6 py-3 border border-[var(--rule-ink)] text-[var(--text-on-ink)] font-mono-custom text-xs uppercase tracking-wider hover:border-[var(--ochre)] hover:text-[var(--ochre)]"
            >
              Contact Olivia
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
