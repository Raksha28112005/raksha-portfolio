import React, { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NavigationProvider } from './context/NavigationContext';
import { useNavigation } from './context/navigation-state';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import { HorizontalControls } from './components/navigation/HorizontalControls';

// 8 Sections
import HeroSection from './components/hero/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import EducationSection from './components/EducationSection';
import AchievementsSection from './components/AchievementsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

import './components/hero/hero.css';
import './App.css';

const PortfolioStage: React.FC = () => {
  const { activeSectionIndex, direction, reducedMotion, nextSection, prevSection } =
    useNavigation();

  // Scroll ref for the active panel to reset scroll on slide change
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Touch gesture tracking for mobile swipe
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Reset scroll to top whenever active section changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [activeSectionIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Horizontal swipe must dominate vertical scroll and exceed 50px threshold
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        nextSection(); // Swiped left -> Move to Next section (L to R traversal)
      } else {
        prevSection(); // Swiped right -> Move to Previous section
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Horizontal slide animation variants:
  // Forward (direction > 0): Incoming enters from RIGHT, outgoing leaves to LEFT
  // Backward (direction < 0): Incoming enters from LEFT, outgoing leaves to RIGHT
  const slideVariants = {
    enter: (dir: number) => ({
      x: reducedMotion ? 0 : dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: {
          type: 'spring',
          stiffness: 280,
          damping: 32,
          mass: 0.9,
        },
        opacity: { duration: 0.3 },
      },
    },
    exit: (dir: number) => ({
      x: reducedMotion ? 0 : dir > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: {
        x: {
          type: 'spring',
          stiffness: 280,
          damping: 32,
          mass: 0.9,
        },
        opacity: { duration: 0.25 },
      },
    }),
  };

  const renderSectionComponent = (index: number) => {
    switch (index) {
      case 0:
        return <HeroSection />;
      case 1:
        return <AboutSection />;
      case 2:
        return <SkillsSection />;
      case 3:
        return <ExperienceSection />;
      case 4:
        return <ProjectsSection />;
      case 5:
        return <EducationSection />;
      case 6:
        return <AchievementsSection />;
      case 7:
        return <ContactSection />;
      default:
        return <HeroSection />;
    }
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden select-text"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait" custom={direction} initial={false}>
        <motion.div
          key={activeSectionIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full flex flex-col"
          style={{ willChange: 'transform, opacity' }}
        >
          {/* Scrollable container for the active section */}
          <div
            ref={scrollContainerRef}
            tabIndex={0}
            className="w-full h-full overflow-y-auto overflow-x-hidden pt-20 md:pt-24 pb-28 md:pb-32 focus:outline-none"
            style={{
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {renderSectionComponent(activeSectionIndex)}

            {/* Footer attached at bottom of slide */}
            <Footer />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Floating horizontal next/prev chevrons & bottom dock */}
      <HorizontalControls />
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial loading animation
    const t = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <NavigationProvider>
      {/* ── Loading screen ─────────────────────────────────────── */}
      <AnimatePresence>
        {isLoading && <LoadingScreen isLoading={isLoading} />}
      </AnimatePresence>

      {/* ── Subtle background noise texture ─────────────────────── */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* ── Persistent Navigation Header ───────────────────────── */}
      <Navbar />

      {/* ── Main Horizontal Portfolio Stage ─────────────────────── */}
      <main>
        <PortfolioStage />
      </main>
    </NavigationProvider>
  );
}

export default App;
