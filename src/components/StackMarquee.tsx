import React from 'react';

/* Stack list - placeholders to be confirmed */
const STACK_ITEMS = [
  'Next.js',
  'React',
  'TypeScript',
  'Laravel',
  'PHP',
  'Astro',
  'Tailwind CSS',
  'WordPress',
  'WooCommerce',
  'Elementor',
  'Gravity Forms',
  'Stripe',
  'PayPal',
  'REST APIs',
  'Technical SEO',
  'Schema.org',
  'HTML5 & CSS3',
  'Git',
];

export const StackMarquee: React.FC = () => {
  return (
    <div
      aria-label="Core Technical Stack"
      className="section-ink relative w-full py-4 border-y border-[var(--rule-ink)] overflow-hidden select-none"
    >
      <div className="flex w-max items-center animate-marquee group">
        {/* Set 1 */}
        <div className="flex items-center gap-6 sm:gap-8 px-4">
          {STACK_ITEMS.map((item, idx) => (
            <React.Fragment key={`s1-${idx}`}>
              <span className="font-mono-custom text-xs sm:text-sm tracking-wider uppercase text-[var(--muted-on-ink)] hover:text-[var(--text-on-ink)] transition-colors duration-150 whitespace-nowrap">
                {item}
              </span>
              <span
                className="text-[var(--ochre)] font-mono-custom text-xs select-none"
                aria-hidden="true"
              >
                ·
              </span>
            </React.Fragment>
          ))}
        </div>

        {/* Set 2 (duplicated for seamless loop) */}
        <div className="flex items-center gap-6 sm:gap-8 px-4" aria-hidden="true">
          {STACK_ITEMS.map((item, idx) => (
            <React.Fragment key={`s2-${idx}`}>
              <span className="font-mono-custom text-xs sm:text-sm tracking-wider uppercase text-[var(--muted-on-ink)] hover:text-[var(--text-on-ink)] transition-colors duration-150 whitespace-nowrap">
                {item}
              </span>
              <span
                className="text-[var(--ochre)] font-mono-custom text-xs select-none"
                aria-hidden="true"
              >
                ·
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
