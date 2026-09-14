import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { projects, Project, Discipline } from '../data/projects';
import { ProjectImage } from './ProjectImage';

type FilterType = 'All' | Discipline;

export const SelectedWork: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [visibleCount, setVisibleCount] = useState<number>(5);
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [laggedPos, setLaggedPos] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);

    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Smooth cursor follow with easing lag
  useEffect(() => {
    if (prefersReducedMotion || isTouchDevice) return;

    const updateLag = () => {
      setLaggedPos((prev) => {
        const dx = mousePos.x - prev.x;
        const dy = mousePos.y - prev.y;
        // Ease factor 0.12 gives smooth floating lag
        return {
          x: prev.x + dx * 0.12,
          y: prev.y + dy * 0.12,
        };
      });
      animFrameRef.current = requestAnimationFrame(updateLag);
    };

    animFrameRef.current = requestAnimationFrame(updateLag);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [mousePos, prefersReducedMotion, isTouchDevice]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'All') return true;
    return project.disciplines.includes(activeFilter);
  });

  const displayedProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  return (
    <section
      id="work"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="section-cream relative py-24 sm:py-32 border-b border-[var(--rule-cream)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header and Eyebrow */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-6 border-b border-[var(--rule-cream)]">
          <div>
            <span className="eyebrow mb-3">SELECTED WORK</span>
            <h2 className="font-display text-[clamp(2.5rem,5.5vw,4.75rem)] text-[var(--text-on-cream)] leading-[0.95] tracking-tight">
              Architected systems & web products.
            </h2>
          </div>

          {/* Filter row in mono: All / Development / Design / Infrastructure */}
          <div
            role="tablist"
            aria-label="Filter Projects"
            className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono-custom text-xs uppercase tracking-wider"
          >
            {(['All', 'Development', 'Design', 'Infrastructure'] as FilterType[]).map(
              (filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      setActiveFilter(filter);
                      setVisibleCount(5); // reset visible count when filter changes
                    }}
                    className={`px-3.5 py-1.5 border transition-colors duration-150 ${
                      isActive
                        ? 'border-[var(--clay)] bg-[var(--clay)] text-[var(--cream)] font-medium'
                        : 'border-[var(--rule-cream)] text-[var(--muted-on-cream)] hover:text-[var(--text-on-cream)] hover:border-[var(--text-on-cream)]'
                    }`}
                  >
                    {filter}
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* Vertical Index List */}
        <div className="divide-y divide-[var(--rule-cream)] border-t border-[var(--rule-cream)]">
          {displayedProjects.map((project) => {
            const isHovered = hoveredProject?.slug === project.slug;
            const isOtherHovered = hoveredProject !== null && !isHovered;

            return (
              <div
                key={project.slug}
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
                className={`group relative min-h-[96px] py-6 sm:py-8 transition-opacity duration-150 ${
                  isOtherHovered ? 'opacity-40' : 'opacity-100'
                }`}
              >
                <Link
                  to={`/work/${project.slug}`}
                  className="block focus-visible:ring-2 focus-visible:ring-[var(--clay)]"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center">
                    {/* Index number in ochre mono & Project name */}
                    <div className="lg:col-span-5 flex items-baseline gap-4 sm:gap-6">
                      <span
                        className={`font-mono-custom text-sm sm:text-base font-semibold transition-colors duration-150 tabular-nums ${
                          isHovered ? 'text-[var(--clay)]' : 'text-[var(--ochre)]'
                        }`}
                      >
                        {project.index}
                      </span>
                      <h3
                        className="font-body text-xl sm:text-2xl lg:text-[1.85rem] font-medium text-[var(--text-on-cream)] tracking-tight transition-transform duration-150 ease-out"
                        style={{
                          transform: isHovered && !isTouchDevice ? 'translateX(16px)' : 'none',
                        }}
                      >
                        {project.name}
                      </h3>
                    </div>

                    {/* One-line description */}
                    <div className="lg:col-span-4">
                      <p className="font-body text-sm sm:text-base text-[var(--muted-on-cream)] line-clamp-2 lg:line-clamp-1">
                        {project.description}
                      </p>
                    </div>

                    {/* Metadata: Year pill in sage & stack tags in mono */}
                    <div className="lg:col-span-3 flex items-center justify-between lg:justify-end gap-3 flex-wrap">
                      {/* Year pill in sage */}
                      <span className="inline-flex items-center px-2.5 py-0.5 text-[11px] font-mono-custom font-medium uppercase tracking-wider bg-[var(--sage)]/15 text-[var(--sage)] border border-[var(--sage)]/30">
                        {project.year}
                      </span>

                      {/* Stack tags in mono */}
                      <div className="hidden sm:flex items-center gap-1.5 font-mono-custom text-xs text-[var(--muted-on-cream)]">
                        {project.stack.slice(0, 2).map((st) => (
                          <span
                            key={st}
                            className="px-2 py-0.5 bg-[var(--cream-soft)] border border-[var(--rule-cream)] text-[11px]"
                          >
                            {st}
                          </span>
                        ))}
                      </div>

                      {/* Touch inline thumbnail indicator */}
                      {isTouchDevice && (
                        <div className="w-16 h-11 overflow-hidden border border-[var(--rule-cream)] bg-[var(--ink-raised)]">
                          <ProjectImage
                            url={project.liveUrl}
                            projectName={project.name}
                            width={300}
                            height={200}
                            className="w-full h-full"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 4)}
              className="inline-flex items-center justify-center font-mono-custom text-xs uppercase tracking-wider px-8 py-3.5 border border-[var(--rule-cream)] text-[var(--text-on-cream)] hover:border-[var(--clay)] hover:text-[var(--clay)] transition-colors duration-150"
            >
              Load more projects ({filteredProjects.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>

      {/* Floating cursor preview (desktop only, disabled with prefers-reduced-motion) */}
      {!prefersReducedMotion && !isTouchDevice && hoveredProject && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed z-50 w-[440px] aspect-[3/2] overflow-hidden border border-[var(--rule-ink)] bg-[var(--ink-raised)] transition-opacity duration-200"
          style={{
            left: `${laggedPos.x + 24}px`,
            top: `${laggedPos.y - 120}px`,
            opacity: hoveredProject ? 1 : 0,
            transform: 'translate3d(0,0,0)',
          }}
        >
          <ProjectImage
            url={hoveredProject.liveUrl}
            projectName={hoveredProject.name}
            width={660}
            height={440}
            priority
            className="w-full h-full"
          />
          <div className="absolute bottom-0 inset-x-0 bg-[var(--ink)]/90 px-3 py-1.5 border-t border-[var(--rule-ink)] flex items-center justify-between text-[11px] font-mono-custom text-[var(--text-on-ink)]">
            <span className="text-[var(--ochre)]">{hoveredProject.name}</span>
            <span className="text-[var(--sage)]">VIEW CASE STUDY →</span>
          </div>
        </div>
      )}
    </section>
  );
};
