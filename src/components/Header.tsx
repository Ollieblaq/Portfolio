import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lagosTime, setLagosTime] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Lagos WAT time counter (Africa/Lagos)
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Africa/Lagos',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        setLagosTime(`${formatter.format(now)} WAT`);
      } catch {
        // Fallback calculation UTC+1
        const now = new Date();
        const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
        const watDate = new Date(utcMs + 3600000);
        const pad = (n: number) => n.toString().padStart(2, '0');
        setLagosTime(
          `${pad(watDate.getHours())}:${pad(watDate.getMinutes())}:${pad(watDate.getSeconds())} WAT`
        );
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Shrink and blur after 80px scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = (anchorId: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      window.location.href = `/${anchorId}`;
      return;
    }
    const elem = document.getElementById(anchorId.replace('#', ''));
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="site-header"
      className={`sticky top-0 z-40 w-full transition-[height,padding,background-color,border-color,backdrop-filter] duration-200 ease-out border-b ${
        isScrolled
          ? 'py-3 bg-[var(--ink)]/85 backdrop-blur-md border-[var(--rule-ink)]'
          : 'py-5 bg-[var(--ink)] border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Left: Logo/Name in mono */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="font-mono-custom font-semibold tracking-wider text-sm sm:text-base text-[var(--text-on-ink)] hover:text-[var(--clay)] transition-colors duration-150"
          >
            OLIVIA ONYEKABA
          </Link>
          <span className="hidden lg:inline-block font-mono-custom text-xs text-[var(--muted-on-ink)] border-l border-[var(--rule-ink)] pl-4">
            LAGOS, NG
          </span>
        </div>

        {/* Center: Nav links */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-8 font-mono-custom text-xs tracking-wider uppercase text-[var(--text-on-ink)]"
        >
          <button
            type="button"
            onClick={() => handleNavClick('#work')}
            className="hover:text-[var(--clay)] transition-colors duration-150 py-1"
          >
            Work
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('#capabilities')}
            className="hover:text-[var(--clay)] transition-colors duration-150 py-1"
          >
            Capabilities
          </button>
          <Link
            to="/about"
            className="hover:text-[var(--clay)] transition-colors duration-150 py-1"
          >
            About
          </Link>
          <button
            type="button"
            onClick={() => handleNavClick('#contact')}
            className="hover:text-[var(--clay)] transition-colors duration-150 py-1"
          >
            Contact
          </button>
        </nav>

        {/* Right side: Lagos Time, Theme Toggle, Start a project button */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Lagos Time (mono) */}
          <div
            className="hidden sm:flex items-center gap-2 font-mono-custom text-xs text-[var(--muted-on-ink)] px-2.5 py-1 border border-[var(--rule-ink)] rounded-none"
            title="Current time in Lagos, Nigeria (WAT)"
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--sage)] animate-pulse"
              aria-hidden="true"
            />
            <span className="text-[var(--text-on-ink)] font-mono-custom tabular-nums">
              {lagosTime || '14:32:07 WAT'}
            </span>
          </div>

          {/* Theme toggle: inverts ink and cream sections */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2 border border-[var(--rule-ink)] text-[var(--text-on-ink)] hover:text-[var(--ochre)] hover:border-[var(--ochre)] transition-colors duration-150 flex items-center justify-center font-mono-custom text-xs"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <span className="sr-only">Toggle Theme</span>
            {theme === 'dark' ? (
              <span className="font-mono-custom text-[11px] tracking-widest uppercase">
                LIGHT
              </span>
            ) : (
              <span className="font-mono-custom text-[11px] tracking-widest uppercase">
                DARK
              </span>
            )}
          </button>

          {/* Clay "Start a project" button */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contact');
            }}
            className="hidden sm:inline-flex items-center justify-center bg-[var(--clay)] text-[var(--cream)] px-4 py-2 text-xs font-mono-custom uppercase tracking-wider font-medium hover:opacity-90 active:scale-[0.98] transition-opacity duration-150"
          >
            Start a project
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[var(--text-on-ink)] border border-[var(--rule-ink)] font-mono-custom text-xs"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--rule-ink)] bg-[var(--ink)] px-6 py-6 font-mono-custom text-sm space-y-4">
          <div className="flex sm:hidden items-center justify-between pb-3 border-b border-[var(--rule-ink)] text-xs text-[var(--muted-on-ink)]">
            <span>LAGOS WAT</span>
            <span className="text-[var(--text-on-ink)] tabular-nums">{lagosTime}</span>
          </div>
          <div>
            <button
              type="button"
              onClick={() => handleNavClick('#work')}
              className="block w-full text-left py-2 uppercase hover:text-[var(--clay)]"
            >
              Selected Work
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={() => handleNavClick('#capabilities')}
              className="block w-full text-left py-2 uppercase hover:text-[var(--clay)]"
            >
              Capabilities
            </button>
          </div>
          <div>
            <Link
              to="/about"
              className="block py-2 uppercase hover:text-[var(--clay)]"
            >
              About
            </Link>
          </div>
          <div>
            <button
              type="button"
              onClick={() => handleNavClick('#contact')}
              className="block w-full text-left py-2 uppercase hover:text-[var(--clay)]"
            >
              Contact
            </button>
          </div>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleNavClick('#contact')}
              className="w-full text-center bg-[var(--clay)] text-[var(--cream)] py-3 uppercase tracking-wider font-medium"
            >
              Start a project
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
