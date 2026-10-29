import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../context/navigation-state';

const Navbar: React.FC = () => {
  const { activeSectionIndex, sections, navigateTo } = useNavigation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (i: number) => {
    navigateTo(i);
    setMobileOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2.5' : 'py-4'
      }`}
      style={{
        background: scrolled
          ? 'rgba(2, 4, 8, 0.94)'
          : 'linear-gradient(to bottom, rgba(2, 4, 8, 0.90), transparent)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0, 212, 255, 0.08)',
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNav(0)}
          className="flex items-center gap-2.5 group focus:outline-none"
          aria-label="Go to home section"
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-bg-void font-display font-bold text-sm"
            style={{
              background: 'linear-gradient(135deg, #00D4FF, #7B4FFF)',
              boxShadow: '0 0 20px -4px rgba(0, 212, 255, 0.6)',
            }}
          >
            R
          </div>
          <span className="font-display font-semibold text-white text-base md:text-lg tracking-tight group-hover:text-electric transition-colors">
            Raksha R<span className="text-electric">.</span>
          </span>
        </button>

        {/* Desktop Navigation Pills */}
        <div
          role="tablist"
          aria-label="Portfolio sections"
          className="hidden md:flex items-center gap-1 bg-surface-1/90 rounded-full p-1.5 border border-white/10 shadow-lg"
        >
          {sections.map((p, i) => {
            const isActive = activeSectionIndex === i;
            return (
              <button
                key={p.id}
                role="tab"
                onClick={() => handleNav(i)}
                aria-label={`Navigate to ${p.label}`}
                aria-selected={isActive}
                className="relative px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 focus:outline-none"
                style={{
                  color: isActive ? '#020408' : 'rgba(200, 208, 232, 0.75)',
                  background: isActive
                    ? 'linear-gradient(135deg, #00D4FF, #7B4FFF)'
                    : 'transparent',
                  fontWeight: isActive ? 700 : 500,
                  boxShadow: isActive ? '0 0 16px -2px rgba(0, 212, 255, 0.7)' : 'none',
                }}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        {/* Desktop CTA actions */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => handleNav(7)}
            className="btn-accent text-xs py-2 px-4"
            aria-label="Navigate to contact section"
            style={{ padding: '8px 16px', fontSize: '0.72rem' }}
          >
            Contact Me
          </button>
          <a
            href="/resume.pdf"
            download
            className="btn-ghost text-xs py-2 px-4"
            aria-label="Download Raksha R's verified resume PDF"
            style={{ padding: '8px 16px', fontSize: '0.72rem' }}
          >
            Resume ↓
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-white-dim min-w-[44px] min-h-[44px] p-2 flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-electric rounded-lg"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          <div className="space-y-1.5 w-6">
            <span
              className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                mobileOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                mobileOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                mobileOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-white/10 overflow-hidden"
            style={{ background: 'rgba(5, 11, 20, 0.98)', backdropFilter: 'blur(24px)' }}
          >
            <div className="px-4 py-4 space-y-1">
              {sections.map((p, i) => {
                const isActive = activeSectionIndex === i;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleNav(i)}
                    className="flex items-center justify-between w-full text-left px-4 py-3 min-h-[44px] rounded-xl font-mono text-sm transition-all"
                    style={{
                      color: isActive ? '#00D4FF' : 'rgba(200, 208, 232, 0.85)',
                      background: isActive ? 'rgba(0, 212, 255, 0.12)' : 'transparent',
                      fontWeight: isActive ? 700 : 500,
                    }}
                  >
                    <span>
                      <span className="text-white-dim text-xs mr-2">{p.number}.</span>
                      {p.label}
                    </span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-electric shadow-[0_0_8px_#00D4FF]" />}
                  </button>
                );
              })}

              <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
                <button
                  onClick={() => handleNav(7)}
                  className="btn-accent text-center justify-center text-xs py-3 min-h-[44px] w-full"
                >
                  Contact Me
                </button>
                <a
                  href="/resume.pdf"
                  download
                  className="btn-ghost text-center justify-center text-xs py-3 min-h-[44px] w-full"
                >
                  Download Resume ↓
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
