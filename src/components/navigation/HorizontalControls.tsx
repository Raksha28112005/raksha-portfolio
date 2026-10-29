import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { useNavigation } from '../../context/navigation-state';

export const HorizontalControls: React.FC = () => {
  const {
    activeSectionIndex,
    currentSection,
    sections,
    nextSection,
    prevSection,
    navigateTo,
    isFirst,
    isLast,
    isMobile,
  } = useNavigation();

  const prevTitle = !isFirst ? sections[activeSectionIndex - 1].label : null;
  const nextTitle = !isLast ? sections[activeSectionIndex + 1].label : null;

  return (
    <>
      {/* ── Screen-Reader Live Region for Page Transitions ─────────── */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Showing section {currentSection.number}: {currentSection.label} of {sections.length}
      </div>

      {/* ── Desktop Edge Floating Chevron: PREVIOUS ────────────────── */}
      <AnimatePresence>
        {!isFirst && !isMobile && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden md:block"
          >
            <button
              onClick={prevSection}
              className="group flex items-center gap-2 p-3 rounded-2xl glass hover:border-electric/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-electric shadow-xl"
              aria-label={`Previous section: ${prevTitle}`}
              title={`Previous: ${prevTitle} (Press Left Arrow)`}
            >
              <div className="w-8 h-8 rounded-xl bg-surface-2 border border-white/10 flex items-center justify-center text-white-dim group-hover:text-electric group-hover:border-electric/30 transition-colors">
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              </div>
              <div className="hidden lg:block text-left pr-2">
                <span className="block text-[10px] font-mono text-white-faint uppercase">Prev</span>
                <span className="block text-xs font-semibold text-white group-hover:text-electric transition-colors">
                  {prevTitle}
                </span>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Desktop Edge Floating Chevron: NEXT ────────────────────── */}
      <AnimatePresence>
        {!isLast && !isMobile && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:block"
          >
            <button
              onClick={nextSection}
              className="group flex items-center gap-2 p-3 rounded-2xl glass hover:border-electric/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-electric shadow-xl"
              aria-label={`Next section: ${nextTitle}`}
              title={`Next: ${nextTitle} (Press Right Arrow)`}
            >
              <div className="hidden lg:block text-right pl-2">
                <span className="block text-[10px] font-mono text-white-faint uppercase">Next</span>
                <span className="block text-xs font-semibold text-white group-hover:text-electric transition-colors">
                  {nextTitle}
                </span>
              </div>
              <div className="w-8 h-8 rounded-xl bg-surface-2 border border-white/10 flex items-center justify-center text-white-dim group-hover:text-electric group-hover:border-electric/30 transition-colors">
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bottom Dock Controls (Desktop & Mobile) ────────────────── */}
      <nav
        aria-label="Horizontal section navigation"
        className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-40 w-[96%] max-w-2xl"
      >
        <div
          className="glass px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl border border-white/10 shadow-2xl flex items-center justify-between gap-1.5 sm:gap-4 backdrop-blur-xl"
          style={{
            background: 'rgba(5, 11, 20, 0.92)',
            boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.8), 0 0 20px -5px rgba(0, 212, 255, 0.15)',
          }}
        >
          {/* Previous Button */}
          <button
            onClick={prevSection}
            disabled={isFirst}
            className={`flex items-center justify-center gap-1 min-h-[42px] px-2.5 sm:px-3 py-1.5 rounded-xl font-mono text-xs transition-all ${
              isFirst
                ? 'opacity-30 cursor-not-allowed text-white-faint'
                : 'text-white-soft hover:text-white hover:bg-white/10 text-electric'
            }`}
            aria-label="Go to previous section"
            title={prevTitle ? `Previous: ${prevTitle} [←]` : undefined}
          >
            <ChevronLeft className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Prev</span>
          </button>

          {/* Center: Slide Indicators / Progress Dots */}
          <div className="flex items-center gap-1 sm:gap-2">
            {sections.map((sec, idx) => {
              const isActive = idx === activeSectionIndex;
              return (
                <button
                  key={sec.id}
                  onClick={() => navigateTo(idx)}
                  className="group relative min-h-[42px] py-2 px-1 sm:px-1.5 focus:outline-none flex items-center justify-center"
                  aria-label={`Jump to section ${sec.number}: ${sec.label}`}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {/* Indicator Dot / Pill */}
                  <span
                    className={`block transition-all duration-300 rounded-full ${
                      isActive
                        ? 'w-5 sm:w-7 md:w-8 h-2 bg-gradient-to-r from-electric to-purple-acc shadow-[0_0_10px_rgba(0,212,255,0.7)]'
                        : 'w-2 h-2 bg-white/20 group-hover:bg-white/40'
                    }`}
                  />

                  {/* Hover Tooltip (Desktop) */}
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden md:group-hover:flex flex-col items-center pointer-events-none z-50">
                    <span className="px-2 py-1 rounded-md text-[10px] font-mono bg-surface-2 text-white border border-white/10 whitespace-nowrap shadow-lg">
                      {sec.number}. {sec.label}
                    </span>
                    <span className="w-1.5 h-1.5 rotate-45 bg-surface-2 border-r border-b border-white/10 -mt-1" />
                  </span>
                </button>
              );
            })}
          </div>

          {/* Current Section Label & Progress */}
          <div className="hidden lg:flex items-center gap-2 border-l border-white/10 pl-3 font-mono text-xs text-white-dim">
            <Compass className="w-3.5 h-3.5 text-electric animate-spin-slow shrink-0" />
            <span className="text-white font-semibold">{currentSection.number}</span>
            <span className="text-white-faint">/</span>
            <span>{sections.length}</span>
            <span className="text-electric truncate max-w-[90px]">{currentSection.label}</span>
          </div>

          {/* Next Button */}
          <button
            onClick={nextSection}
            disabled={isLast}
            className={`flex items-center justify-center gap-1 min-h-[42px] px-2.5 sm:px-3 py-1.5 rounded-xl font-mono text-xs transition-all ${
              isLast
                ? 'opacity-30 cursor-not-allowed text-white-faint'
                : 'text-white-soft hover:text-white hover:bg-white/10 text-electric'
            }`}
            aria-label="Go to next section"
            title={nextTitle ? `Next: ${nextTitle} [→]` : undefined}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </nav>
    </>
  );
};
