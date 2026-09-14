import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

export const Footer: React.FC = () => {
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    discipline: 'Development',
    details: '',
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    // Construct mailto
    const subject = encodeURIComponent(`Project Inquiry: ${formData.discipline} — ${formData.name}`);
    const body = encodeURIComponent(
      `Hello Olivia,\n\nName: ${formData.name}\nEmail: ${formData.email}\nDiscipline: ${formData.discipline}\n\nProject Scope:\n${formData.details}`
    );
    window.location.href = `mailto:oliviaimmaculate1@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <footer
      id="contact"
      className="section-ink relative pt-24 pb-12 border-t border-[var(--rule-ink)]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Contact Form & Direct Connection Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24 pb-20 border-b border-[var(--rule-ink)]">
          {/* Left Column (5 cols): Display Email & Positioning */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <span className="eyebrow mb-4">GET IN TOUCH</span>
              <h3 className="font-display text-[clamp(2.5rem,5.5vw,4.75rem)] text-[var(--text-on-ink)] leading-[0.95] tracking-tight mb-8">
                Initiate a project or consultation.
              </h3>
              <p className="font-body text-base sm:text-lg text-[var(--muted-on-ink)] max-w-[50ch] mb-8 leading-relaxed">
                Available for contract engineering, design system leadership, and infrastructure architecture across West Africa, the UK, Europe, and North America.
              </p>

              {/* Large display email with ochre hover underline */}
              <div className="mb-8">
                <span className="font-mono-custom text-xs uppercase tracking-wider text-[var(--muted-on-ink)] block mb-2">
                  DIRECT EMAIL
                </span>
                <a
                  href="mailto:oliviaimmaculate1@gmail.com"
                  className="font-display text-2xl sm:text-3xl lg:text-4xl text-[var(--text-on-ink)] hover:text-[var(--clay)] transition-colors duration-150 inline-block border-b-2 border-transparent hover:border-[var(--ochre)] pb-1"
                >
                  oliviaimmaculate1@gmail.com
                </a>
              </div>

              {/* WhatsApp direct link */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://wa.me/2349039908443?text=Hello%20Olivia,%20I'd%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono-custom text-xs uppercase tracking-wider px-4 py-2 border border-[var(--rule-ink)] text-[var(--text-on-ink)] hover:border-[var(--ochre)] hover:text-[var(--ochre)] transition-colors duration-150"
                >
                  <span className="w-2 h-2 rounded-full bg-[var(--sage)]" aria-hidden="true" />
                  WhatsApp (+234 903 990 8443) →
                </a>
              </div>
            </div>
          </div>

          {/* Right Column (6 cols): Direct Contact Form */}
          <div className="lg:col-span-6 bg-[var(--ink-raised)] p-8 sm:p-10 border border-[var(--rule-ink)]">
            <span className="font-mono-custom text-xs uppercase tracking-widest text-[var(--ochre)] mb-6 block">
              // PROJECT BRIEF
            </span>

            {formSent ? (
              <div className="py-12 text-center">
                <span className="inline-block w-3 h-3 rounded-full bg-[var(--sage)] mb-4" />
                <h4 className="font-display text-2xl text-[var(--text-on-ink)] mb-2">
                  Inquiry Dispatched
                </h4>
                <p className="font-mono-custom text-xs text-[var(--muted-on-ink)]">
                  Your mail client has been opened. You can also message directly on WhatsApp.
                </p>
                <button
                  type="button"
                  onClick={() => setFormSent(false)}
                  className="mt-6 font-mono-custom text-xs uppercase underline text-[var(--ochre)]"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block font-mono-custom text-xs uppercase tracking-wider text-[var(--muted-on-ink)] mb-2"
                  >
                    Your Name / Organisation
                  </label>
                  <input
                    id="contact-name"
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Adeyemi Adeleke"
                    className="w-full bg-[var(--ink)] border border-[var(--rule-ink)] px-4 py-3 text-sm text-[var(--text-on-ink)] placeholder:text-[var(--muted-on-ink)]/50 focus:border-[var(--clay)] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block font-mono-custom text-xs uppercase tracking-wider text-[var(--muted-on-ink)] mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="adeyemi@domain.com"
                      className="w-full bg-[var(--ink)] border border-[var(--rule-ink)] px-4 py-3 text-sm text-[var(--text-on-ink)] placeholder:text-[var(--muted-on-ink)]/50 focus:border-[var(--clay)] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-discipline"
                      className="block font-mono-custom text-xs uppercase tracking-wider text-[var(--muted-on-ink)] mb-2"
                    >
                      Discipline
                    </label>
                    <select
                      id="contact-discipline"
                      value={formData.discipline}
                      onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                      className="w-full bg-[var(--ink)] border border-[var(--rule-ink)] px-4 py-3 text-sm text-[var(--text-on-ink)] focus:border-[var(--clay)] focus:outline-none"
                    >
                      <option value="Development">Development (Next.js, Astro, React)</option>
                      <option value="Design">UI/UX & Design Systems</option>
                      <option value="Infrastructure">DevOps & Cloud Infrastructure</option>
                      <option value="Full Spectrum">Full Spectrum Product Build</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-details"
                    className="block font-mono-custom text-xs uppercase tracking-wider text-[var(--muted-on-ink)] mb-2"
                  >
                    Project Scope & Objectives
                  </label>
                  <textarea
                    id="contact-details"
                    rows={4}
                    required
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="Briefly describe what you're building, target timeline, or infrastructure challenge..."
                    className="w-full bg-[var(--ink)] border border-[var(--rule-ink)] px-4 py-3 text-sm text-[var(--text-on-ink)] placeholder:text-[var(--muted-on-ink)]/50 focus:border-[var(--clay)] focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[var(--clay)] text-[var(--cream)] font-mono-custom text-xs uppercase tracking-wider font-semibold hover:opacity-95 active:scale-[0.99] transition-opacity"
                >
                  Transmit Brief →
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Four link columns: Pages, Work, Connect, Downloads */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-20">
          {/* Column 1: Pages */}
          <div>
            <span className="font-mono-custom text-xs uppercase tracking-widest text-[var(--ochre)] mb-4 block">
              PAGES
            </span>
            <ul className="space-y-2.5 font-mono-custom text-xs text-[var(--muted-on-ink)]">
              <li>
                <Link to="/" className="hover:text-[var(--text-on-ink)] transition-colors">
                  Index / Home
                </Link>
              </li>
              <li>
                <a href="#work" className="hover:text-[var(--text-on-ink)] transition-colors">
                  Selected Work
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-[var(--text-on-ink)] transition-colors">
                  Capabilities
                </a>
              </li>
              <li>
                <Link to="/about" className="hover:text-[var(--text-on-ink)] transition-colors">
                  About Olivia
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Work */}
          <div>
            <span className="font-mono-custom text-xs uppercase tracking-widest text-[var(--ochre)] mb-4 block">
              WORK
            </span>
            <ul className="space-y-2.5 font-mono-custom text-xs text-[var(--muted-on-ink)]">
              {projects.slice(0, 5).map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/work/${p.slug}`}
                    className="hover:text-[var(--text-on-ink)] transition-colors"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div>
            <span className="font-mono-custom text-xs uppercase tracking-widest text-[var(--ochre)] mb-4 block">
              CONNECT
            </span>
            <ul className="space-y-2.5 font-mono-custom text-xs text-[var(--muted-on-ink)]">
              <li>
                <a
                  href="https://github.com/oliviaonyekaba"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--text-on-ink)] transition-colors"
                >
                  GitHub ↗
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/oliviaonyekaba"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--text-on-ink)] transition-colors"
                >
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/oliviaonyekaba"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--text-on-ink)] transition-colors"
                >
                  Twitter / X ↗
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/2349039908443?text=Hello%20Olivia,%20I'd%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--text-on-ink)] transition-colors"
                >
                  WhatsApp ↗
                </a>
              </li>
              <li>
                <a
                  href="https://read.cv/oliviaonyekaba"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--text-on-ink)] transition-colors"
                >
                  Read.cv ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Downloads */}
          <div>
            <span className="font-mono-custom text-xs uppercase tracking-widest text-[var(--ochre)] mb-4 block">
              DOWNLOADS
            </span>
            <ul className="space-y-2.5 font-mono-custom text-xs text-[var(--muted-on-ink)]">
              <li>
                <a
                  href="#hero"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[var(--text-on-ink)] transition-colors"
                >
                  Curriculum Vitae (2026)
                </a>
              </li>
              <li>
                <a
                  href="mailto:oliviaimmaculate1@gmail.com?subject=Request%20Architecture%20Deck"
                  className="hover:text-[var(--text-on-ink)] transition-colors"
                >
                  Engineering Case Study Deck
                </a>
              </li>
              <li>
                <a
                  href="mailto:oliviaimmaculate1@gmail.com?subject=GPG%20Public%20Key"
                  className="hover:text-[var(--text-on-ink)] transition-colors"
                >
                  GPG Security Key
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Slow linear marquee of the three disciplines above copyright */}
        <div
          aria-hidden="true"
          className="relative w-full py-4 border-y border-[var(--rule-ink)] overflow-hidden select-none mb-10"
        >
          <div className="flex w-max items-center animate-marquee-slow font-mono-custom text-xs tracking-widest uppercase text-[var(--muted-on-ink)]">
            <span className="px-6">DEVELOPMENT</span>
            <span className="text-[var(--ochre)]">·</span>
            <span className="px-6">UI/UX DESIGN</span>
            <span className="text-[var(--ochre)]">·</span>
            <span className="px-6">DEVOPS & INFRASTRUCTURE</span>
            <span className="text-[var(--ochre)]">·</span>
            <span className="px-6">DEVELOPMENT</span>
            <span className="text-[var(--ochre)]">·</span>
            <span className="px-6">UI/UX DESIGN</span>
            <span className="text-[var(--ochre)]">·</span>
            <span className="px-6">DEVOPS & INFRASTRUCTURE</span>
            <span className="text-[var(--ochre)]">·</span>
          </div>
        </div>

        {/* Copyright Line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-custom text-xs text-[var(--muted-on-ink)]">
          <p>© {new Date().getFullYear()} OLIVIA ONYEKABA · ALL RIGHTS RESERVED</p>
          <p className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--sage)]" />
            <span>HOSTED ON CONTAINERIZED RUNTIME · LAGOS, NIGERIA</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
