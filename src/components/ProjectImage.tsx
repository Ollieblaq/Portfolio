import React, { useState } from 'react';
import { getScreenshot } from '../lib/screenshot';

interface ProjectImageProps {
  url: string;
  projectName: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export const ProjectImage: React.FC<ProjectImageProps> = ({
  url,
  projectName,
  className = '',
  width = 1400,
  height = 900,
  priority = false,
}) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const screenshotSrc = getScreenshot(url, width, height);

  return (
    <div
      className={`relative overflow-hidden bg-[var(--ink-raised)] ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {/* Loading shimmer placeholder */}
      {!hasLoaded && !hasError && (
        <div className="absolute inset-0 shimmer-placeholder z-10 flex items-center justify-center">
          <span className="font-mono-custom text-xs uppercase tracking-widest text-[var(--muted-on-ink)]">
            Rendering preview...
          </span>
        </div>
      )}

      {/* Actual image */}
      {!hasError ? (
        <img
          src={screenshotSrc}
          alt={`Screenshot preview of ${projectName} site interface`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setHasLoaded(true)}
          onError={() => setHasError(true)}
          className={`h-full w-full object-cover object-top transition-opacity duration-300 ease-out ${
            hasLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : (
        /* Fallback on --ink-raised with display serif name */
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[var(--ink-raised)] text-[var(--text-on-ink)] border border-[var(--rule-ink)]">
          <span className="font-mono-custom text-[11px] uppercase tracking-widest text-[var(--ochre)] mb-2">
            Live Deployment
          </span>
          <p className="font-display text-2xl md:text-3xl tracking-tight text-[var(--text-on-ink)]">
            {projectName}
          </p>
          <span className="font-mono-custom text-xs text-[var(--muted-on-ink)] mt-2">
            {new URL(url).hostname}
          </span>
        </div>
      )}
    </div>
  );
};
