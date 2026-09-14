import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import { ProjectImage } from '../components/ProjectImage';
import { Footer } from '../components/Footer';

export const WorkDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [hoverNext, setHoverNext] = useState(false);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[currentIndex];

  if (!project) {
    return (
      <div className="section-ink min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <span className="eyebrow mb-4">404 · PROJECT NOT FOUND</span>
        <h1 className="font-display text-4xl sm:text-5xl text-[var(--text-on-ink)] mb-6">
          The requested case study does not exist.
        </h1>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-[var(--clay)] text-[var(--cream)] font-mono-custom text-xs uppercase tracking-wider"
        >
          Return to Selected Work
        </Link>
      </div>
    );
  }

  // Next project calculation
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div className="w-full section-ink">
      {/* Back button and breadcrumb bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6 border-b border-[var(--rule-ink)] flex items-center justify-between font-mono-custom text-xs">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[var(--muted-on-ink)] hover:text-[var(--ochre)] transition-colors uppercase tracking-wider"
        >
          ← INDEX / SELECTED WORK
        </Link>
        <span className="text-[var(--ochre)] tabular-nums">
          PROJECT {project.index} OF {projects.length.toString().padStart(2, '0')}
        </span>
      </div>

      {/* 1. Full-bleed screenshot at top with the project name overlaid in display serif */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] max-h-[680px] overflow-hidden border-b border-[var(--rule-ink)] bg-[var(--ink-raised)]">
        <ProjectImage
          url={project.liveUrl}
          projectName={project.name}
          priority
          width={1800}
          height={1000}
          className="w-full h-full object-cover object-top opacity-70"
        />

        {/* Gradient dark mask for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/40 to-transparent pointer-events-none" />

        {/* Overlaid Project Name in display serif */}
        <div className="absolute bottom-0 inset-x-0 p-6 sm:p-12 max-w-7xl mx-auto flex flex-col justify-end">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono-custom text-sm font-semibold text-[var(--ochre)]">
              {project.index}
            </span>
            <span className="font-mono-custom text-xs uppercase tracking-widest text-[var(--sage)] border border-[var(--sage)]/40 px-2 py-0.5">
              {project.year}
            </span>
          </div>
          <h1 className="font-display text-[clamp(2.75rem,7vw,6.5rem)] text-[var(--text-on-ink)] leading-[0.95] tracking-tight">
            {project.name}
          </h1>
        </div>
      </div>

      {/* 2. Main Content Grid: Sticky Left Metadata Rail (3 cols) & Offset Right Column (7 cols) */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Sticky Left Metadata Rail (3 cols, mono: year, role, disciplines, stack, live URL) */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-8 p-6 sm:p-8 bg-[var(--ink-raised)] border border-[var(--rule-ink)]">
              {/* Live URL with external action */}
              <div>
                <span className="font-mono-custom text-[11px] uppercase tracking-widest text-[var(--ochre)] block mb-2">
                  LIVE DEPLOYMENT
                </span>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono-custom text-xs uppercase tracking-wider text-[var(--clay)] hover:underline break-all"
                >
                  <span>{new URL(project.liveUrl).hostname}</span>
                  <span className="text-base leading-none">↗</span>
                </a>
              </div>

              {/* Year */}
              <div>
                <span className="font-mono-custom text-[11px] uppercase tracking-widest text-[var(--muted-on-ink)] block mb-1">
                  YEAR
                </span>
                <span className="font-mono-custom text-xs font-semibold text-[var(--text-on-ink)]">
                  {project.year}
                </span>
              </div>

              {/* Role */}
              <div>
                <span className="font-mono-custom text-[11px] uppercase tracking-widest text-[var(--muted-on-ink)] block mb-1">
                  ROLE
                </span>
                <span className="font-mono-custom text-xs text-[var(--text-on-ink)]">
                  {project.role}
                </span>
              </div>

              {/* Disciplines */}
              <div>
                <span className="font-mono-custom text-[11px] uppercase tracking-widest text-[var(--muted-on-ink)] block mb-1">
                  DISCIPLINES
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {project.disciplines.map((d) => (
                    <span
                      key={d}
                      className="px-2 py-0.5 bg-[var(--ink)] border border-[var(--rule-ink)] font-mono-custom text-[11px] text-[var(--text-on-ink)]"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stack */}
              <div>
                <span className="font-mono-custom text-[11px] uppercase tracking-widest text-[var(--muted-on-ink)] block mb-1">
                  TECHNOLOGIES
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="px-2 py-0.5 bg-[var(--ink)] border border-[var(--rule-ink)] font-mono-custom text-[11px] text-[var(--ochre)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status Indicator */}
              <div className="pt-4 border-t border-[var(--rule-ink)] flex items-center gap-2 font-mono-custom text-xs text-[var(--sage)]">
                <span className="w-2 h-2 rounded-full bg-[var(--sage)]" aria-hidden="true" />
                <span>Production Live Verified</span>
              </div>
            </div>
          </aside>

          {/* Offset Right Column (7 cols) of prose */}
          <div className="lg:col-span-8 space-y-16">
            {/* Overview statement */}
            <div>
              <span className="eyebrow mb-3">// PROJECT OVERVIEW</span>
              <p className="font-body text-xl sm:text-2xl text-[var(--text-on-ink)] leading-relaxed font-light">
                {project.description}
              </p>
            </div>

            {/* Prose Sections */}
            {project.sections && project.sections.length > 0 ? (
              <div className="space-y-12">
                {project.sections.map((sec, sIdx) => (
                  <div
                    key={sIdx}
                    className="pt-8 border-t border-[var(--rule-ink)] space-y-4"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono-custom text-xs text-[var(--ochre)]">
                        0{sIdx + 1}
                      </span>
                      <h2 className="font-display text-2xl sm:text-3xl text-[var(--text-on-ink)]">
                        {sec.heading}
                      </h2>
                    </div>
                    <p className="font-body text-base sm:text-lg text-[var(--muted-on-ink)] leading-relaxed max-w-[68ch]">
                      {sec.body}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* 3. One cream band per case study holding a pulled-out line at display size */}
      <section className="section-cream w-full py-20 sm:py-28 border-y border-[var(--rule-cream)] my-12">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center">
          <span className="eyebrow mb-4 text-center">ARCHITECTURAL IMPERATIVE</span>
          <blockquote className="font-display text-[clamp(1.85rem,4.5vw,3.5rem)] text-[var(--text-on-cream)] leading-[1.1] italic">
            “Engineered with rigorous performance parameters, clean typography, and zero compromises on load velocity.”
          </blockquote>
        </div>
      </section>

      {/* 4. Full-bleed screenshots between prose sections */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
        <div className="relative aspect-[16/10] overflow-hidden border border-[var(--rule-ink)] bg-[var(--ink-raised)]">
          <ProjectImage
            url={project.liveUrl}
            projectName={project.name}
            width={1600}
            height={1000}
            className="w-full h-full"
          />
        </div>
        <p className="font-mono-custom text-xs text-[var(--muted-on-ink)] mt-3 text-right">
          FIG. 01 — FULL VIEWPORT RENDERING FOR {project.name.toUpperCase()} ({new URL(project.liveUrl).hostname})
        </p>
      </div>

      {/* 5. Bottom: next-project link at display size with its screenshot as a hover preview and a clay arrow */}
      <div className="border-t border-[var(--rule-ink)] py-20 sm:py-28 section-ink">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col items-start sm:items-end justify-between gap-8 mb-4">
            <span className="font-mono-custom text-xs uppercase tracking-widest text-[var(--muted-on-ink)]">
              NEXT UP IN SELECTED WORK
            </span>
          </div>

          <div
            onMouseEnter={() => setHoverNext(true)}
            onMouseLeave={() => setHoverNext(false)}
            onClick={() => navigate(`/work/${nextProject.slug}`)}
            className="group cursor-pointer block pt-4 pb-8"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="flex items-baseline gap-4 sm:gap-6">
                <span className="font-mono-custom text-xl sm:text-2xl text-[var(--ochre)] group-hover:text-[var(--clay)] transition-colors">
                  {nextProject.index}
                </span>
                <h3 className="font-display text-[clamp(2.75rem,6vw,5.5rem)] text-[var(--text-on-ink)] group-hover:text-[var(--clay)] transition-colors leading-[0.95] tracking-tight">
                  {nextProject.name}
                </h3>
              </div>

              {/* Clay Arrow */}
              <div className="flex items-center gap-4">
                <span className="font-mono-custom text-xs uppercase tracking-wider text-[var(--muted-on-ink)] hidden sm:inline">
                  EXPLORE CASE STUDY
                </span>
                <span className="font-display text-4xl sm:text-6xl text-[var(--clay)] transform group-hover:translate-x-3 transition-transform duration-150">
                  →
                </span>
              </div>
            </div>

            {/* Hover preview screenshot preview */}
            <div
              className={`mt-8 max-w-xl aspect-[16/10] overflow-hidden border border-[var(--rule-ink)] bg-[var(--ink-raised)] transition-all duration-200 ${
                hoverNext ? 'opacity-100 max-h-[360px]' : 'opacity-0 max-h-0'
              }`}
            >
              <ProjectImage
                url={nextProject.liveUrl}
                projectName={nextProject.name}
                width={800}
                height={500}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
