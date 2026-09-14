import React, { useEffect, useState, useRef } from 'react';

/* ==========================================================================
   EDITABLE CONSTANTS — Update these figures as metrics evolve
   ========================================================================== */
export const STAT_PROJECTS_SHIPPED = 24;
export const STAT_COUNTRIES_SERVED = 6;
export const STAT_YEARS_BUILDING = 5;
export const STAT_STACK_DISCIPLINES = 3;

interface StatItem {
  id: string;
  targetValue: number;
  suffix: string;
  label: string;
}

const STATS: StatItem[] = [
  {
    id: 'projects',
    targetValue: STAT_PROJECTS_SHIPPED,
    suffix: '+',
    label: 'Projects Shipped',
  },
  {
    id: 'countries',
    targetValue: STAT_COUNTRIES_SERVED,
    suffix: '',
    label: 'Countries Served',
  },
  {
    id: 'years',
    targetValue: STAT_YEARS_BUILDING,
    suffix: '+',
    label: 'Years Building',
  },
  {
    id: 'disciplines',
    targetValue: STAT_STACK_DISCIPLINES,
    suffix: '',
    label: 'Stack Disciplines',
  },
];

export const Numbers: React.FC = () => {
  const [hasTriggered, setHasTriggered] = useState(false);
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    projects: 0,
    countries: 0,
    years: 0,
    disciplines: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      // Show final values statically immediately
      setCounts({
        projects: STAT_PROJECTS_SHIPPED,
        countries: STAT_COUNTRIES_SERVED,
        years: STAT_YEARS_BUILDING,
        disciplines: STAT_STACK_DISCIPLINES,
      });
      setHasTriggered(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);

          const startTime = performance.now();
          const duration = 1200; // 1.2s smooth count-up

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(1, elapsed / duration);
            // Ease out cubic
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            setCounts({
              projects: Math.round(easedProgress * STAT_PROJECTS_SHIPPED),
              countries: Math.round(easedProgress * STAT_COUNTRIES_SERVED),
              years: Math.round(easedProgress * STAT_YEARS_BUILDING),
              disciplines: Math.round(easedProgress * STAT_STACK_DISCIPLINES),
            });

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasTriggered]);

  return (
    <section
      id="numbers"
      ref={containerRef}
      aria-label="Key Performance Metrics"
      className="section-cream relative py-16 sm:py-20 border-b border-[var(--rule-cream)]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat) => (
            <div key={stat.id} className="flex flex-col border-l border-[var(--rule-cream)] pl-6">
              <div className="flex items-baseline">
                <span className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--text-on-cream)] leading-none tabular-nums">
                  {counts[stat.id]}
                </span>
                {stat.suffix && (
                  <span className="font-display text-3xl sm:text-4xl text-[var(--clay)] ml-0.5">
                    {stat.suffix}
                  </span>
                )}
              </div>
              <span className="font-mono-custom text-xs uppercase tracking-wider text-[var(--muted-on-cream)] mt-3">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
