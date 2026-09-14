import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { NoiseOverlay } from './components/NoiseOverlay';
import { ScrollProgress } from './components/ScrollProgress';
import { HomePage } from './pages/HomePage';
import { WorkDetailPage } from './pages/WorkDetailPage';
import { AboutPage } from './pages/AboutPage';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Initialize theme from storage or default to dark
  useEffect(() => {
    const savedTheme = (localStorage.getItem('olivia_theme') as 'dark' | 'light') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('olivia_theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

  return (
    <BrowserRouter>
      <div className="relative min-h-screen selection:bg-[var(--clay)] selection:text-[var(--cream)]">
        {/* Fixed full-viewport SVG noise overlay at ~3% opacity */}
        <NoiseOverlay />

        {/* Thin clay scroll-progress bar fixed at the very top of viewport */}
        <ScrollProgress />

        {/* Sticky Header with Lagos time, theme toggle, and project button */}
        <Header theme={theme} onToggleTheme={toggleTheme} />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work/:slug" element={<WorkDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
