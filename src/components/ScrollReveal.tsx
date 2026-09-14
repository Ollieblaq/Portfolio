import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
}) => {
  const [revealed, setRevealed] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If prefers-reduced-motion, reveal immediately without translation
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !revealed) {
          setRevealed(true);
          observer.disconnect(); // once only, never re-triggering on scroll back
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [revealed]);

  return (
    <div
      ref={elementRef}
      className={`transition-[opacity,transform] duration-400 ease-out ${className}`}
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0px)' : 'translateY(24px)',
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'var(--ease-out)',
      }}
    >
      {children}
    </div>
  );
};
