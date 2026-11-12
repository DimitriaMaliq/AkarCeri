import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Beranda', to: '/' },
  { label: 'Profil AKAR CERI', to: '/profil' },
  { label: 'Eksplorasi', to: '/eksplorasi' },
  { label: 'Peta PIK-R', to: '/peta-pik-r' },
  { label: 'Sumber Belajar', to: '/sumber-belajar' },
  { label: 'Komunitas', to: '/komunitas' },
];

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

  return (
    <>
      {/* Sticky header */}
      <header
        className={`sticky top-0 z-50 bg-cream/95 backdrop-blur-md border-b transition-all duration-200 ${
          scrolled ? 'border-sage/60 shadow-sm' : 'border-sage/30'
        }`}
        data-purpose="navbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Wordmark */}
          <Link
            to="/"
            className="flex items-baseline gap-0.5 group flex-shrink-0"
            aria-label="AKAR CERI — Beranda"
          >
            <span className="font-serif text-2xl lg:text-3xl font-medium tracking-tight text-chocolate group-hover:opacity-80 transition-opacity">
              AKAR
            </span>
            <span className="font-serif text-2xl lg:text-3xl font-medium tracking-tight text-cherry group-hover:opacity-80 transition-opacity">
              &nbsp;CERI
            </span>
            <span className="inline-block w-2 h-2 rounded-full bg-cherry ml-1.5 group-hover:scale-125 transition-transform" aria-hidden="true" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Navigasi utama">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? 'bg-cherry text-cream font-semibold'
                    : 'text-chocolate/80 hover:text-chocolate hover:bg-sage/25'
                }`}
                aria-current={isActive(link.to) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/eksplorasi"
              className="group inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-cherry text-cream text-sm font-semibold hover:bg-chocolate border border-transparent hover:border-chocolate/20 transition-all duration-200 shadow-sm hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-cherry focus-visible:outline-none motion-reduce:hover:translate-y-0"
            >
              <span>Mulai Bertumbuh</span>
              <span className="material-symbols-outlined text-base transition-transform duration-200 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl border border-chocolate/20 bg-cream-muted text-chocolate hover:bg-sage/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cherry"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-sage/30 bg-cream/98 backdrop-blur-md px-4 pb-4 pt-3 animate-fade-in-up">
            <nav className="flex flex-col gap-1" aria-label="Navigasi mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive(link.to)
                      ? 'bg-cherry text-cream font-semibold'
                      : 'text-chocolate/80 hover:text-chocolate hover:bg-sage/20'
                  }`}
                  aria-current={isActive(link.to) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/eksplorasi"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-4 py-3 rounded-xl bg-cherry text-cream text-sm font-semibold text-center hover:bg-chocolate transition-colors"
              >
                Mulai Bertumbuh →
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
