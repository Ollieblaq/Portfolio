import React, { useState } from 'react';

interface CapabilityBlock {
  number: string;
  title: string;
  summary: string;
  specifics: string[];
}

const CAPABILITIES: CapabilityBlock[] = [
  {
    number: '01',
    title: 'Development',
    summary:
      'End-to-end full-stack and frontend development specializing in responsive, high-speed architectures, rigid type safety, and clean business logic integration.',
    specifics: [
      'Next.js, React & Astro SPAs/SSGs',
      'TypeScript Architecture & Clean APIs',
      'WooCommerce & Headless Commerce',
      'State Management & Performance Auditing',
    ],
  },
  {
    number: '02',
    title: 'Design',
    summary:
      'Deliberate UI/UX interfaces constructed around mathematical typographic scales, accessibility standards, and reusable Figma design token libraries.',
    specifics: [
      'Figma Design Systems & Token Architecture',
      'WCAG AA Contrast & Accessibility Compliance',
      'High-Fidelity Prototyping & Flow Mapping',
      'Responsive Layout Geometry & Micro-Interactions',
    ],
  },
  {
    number: '03',
    title: 'Infrastructure',
    summary:
      'Automated deployment pipelines, server provisioning, and edge routing to ensure web products scale with zero downtime and strict security posture.',
    specifics: [
      'Docker Containerisation & Multi-stage Builds',
      'GitHub Actions Automated CI/CD Workflows',
      'Nginx Reverse Proxy & Linux Administration',
      'Cloudflare Edge Caching, DNS & SSL Hardening',
    ],
  },
];

export const Capabilities: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="capabilities"
      className="section-ink relative py-24 sm:py-32 border-b border-[var(--rule-ink)]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Eyebrow and Section Heading */}
        <div className="mb-16">
          <span className="eyebrow mb-3">WHAT I DO</span>
          <h2 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] text-[var(--text-on-ink)] leading-[0.95] tracking-tight max-w-[24ch]">
            Cross-disciplinary engineering from prototype to production.
          </h2>
        </div>

        {/* Three Large Numbered Blocks separated by hairlines */}
        <div className="border-t border-[var(--rule-ink)] divide-y divide-[var(--rule-ink)]">
          {CAPABILITIES.map((cap, idx) => {
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={cap.number}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`py-12 sm:py-16 px-4 sm:px-8 transition-colors duration-150 ${
                  isHovered ? 'bg-[var(--ink-raised)]' : 'bg-transparent'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  {/* Left: Number (turns clay on hover) */}
                  <div className="lg:col-span-2">
                    <span
                      className={`font-mono-custom text-2xl sm:text-3xl font-semibold tabular-nums transition-colors duration-150 ${
                        isHovered ? 'text-[var(--clay)]' : 'text-[var(--ochre)]'
                      }`}
                    >
                      {cap.number}
                    </span>
                  </div>

                  {/* Center: Display-serif title and summary */}
                  <div className="lg:col-span-5">
                    <h3 className="font-display text-3xl sm:text-4xl text-[var(--text-on-ink)] mb-4 leading-[1.05]">
                      {cap.title}
                    </h3>
                    <p className="font-body text-base text-[var(--muted-on-ink)] leading-relaxed">
                      {cap.summary}
                    </p>
                  </div>

                  {/* Right: Mono list of 4 specifics */}
                  <div className="lg:col-span-5 pt-2 lg:pt-0">
                    <span className="font-mono-custom text-[11px] uppercase tracking-widest text-[var(--muted-on-ink)] mb-4 block">
                      KEY DELIVERABLES
                    </span>
                    <ul className="space-y-3 font-mono-custom text-xs sm:text-sm text-[var(--text-on-ink)]">
                      {cap.specifics.map((spec, sIdx) => (
                        <li key={sIdx} className="flex items-center gap-3">
                          <span
                            className="inline-block w-1.5 h-1.5 rounded-none bg-[var(--ochre)]"
                            aria-hidden="true"
                          />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
