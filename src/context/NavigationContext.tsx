import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { SECTIONS } from '../types/navigation';
import { NavigationContext, type NavigationContextType } from './navigation-state';

function getIndexFromHash(hash: string): number {
  const clean = hash.replace(/^#/, '').toLowerCase().trim();
  if (!clean) return 0;

  const foundIndex = SECTIONS.findIndex(
    (s) => s.id === clean || (s.aliases && s.aliases.includes(clean))
  );
  return foundIndex >= 0 ? foundIndex : 0;
}

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check reduced motion preference
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  // Check mobile screen (< 768px)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  });

  // View mode for mobile ('slides' or natural 'scroll')
  const [mobileViewMode, setMobileViewMode] = useState<'slides' | 'scroll'>('slides');

  // Active section index and slide direction
  const [activeSectionIndex, setActiveSectionIndex] = useState(() => {
    if (typeof window === 'undefined') return 0;
    return getIndexFromHash(window.location.hash);
  });
  const [direction, setDirection] = useState<number>(1);

  const prevIndexRef = useRef(activeSectionIndex);

  // Sync with reduced-motion and resize events
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Primary navigation function
  const navigateTo = useCallback(
    (target: number | string) => {
      let targetIndex: number;
      if (typeof target === 'number') {
        targetIndex = target;
      } else {
        const clean = target.replace(/^#/, '').toLowerCase().trim();
        targetIndex = SECTIONS.findIndex(
          (s) => s.id === clean || (s.aliases && s.aliases.includes(clean))
        );
        if (targetIndex < 0) targetIndex = 0;
      }

      // Clamp target index
      targetIndex = Math.max(0, Math.min(SECTIONS.length - 1, targetIndex));

      if (targetIndex === prevIndexRef.current) return;

      const newDir = targetIndex > prevIndexRef.current ? 1 : -1;
      setDirection(newDir);
      prevIndexRef.current = targetIndex;
      setActiveSectionIndex(targetIndex);

      // Update URL hash without jumping page scroll
      const section = SECTIONS[targetIndex];
      const newHash = `#${section.id}`;
      if (window.location.hash !== newHash) {
        window.history.pushState(null, '', newHash);
      }
    },
    []
  );

  const nextSection = useCallback(() => {
    if (activeSectionIndex < SECTIONS.length - 1) {
      navigateTo(activeSectionIndex + 1);
    }
  }, [activeSectionIndex, navigateTo]);

  const prevSection = useCallback(() => {
    if (activeSectionIndex > 0) {
      navigateTo(activeSectionIndex - 1);
    }
  }, [activeSectionIndex, navigateTo]);

  // Handle browser Back / Forward (popstate / hashchange)
  useEffect(() => {
    const handleHashSync = () => {
      const targetIndex = getIndexFromHash(window.location.hash);
      if (targetIndex !== prevIndexRef.current) {
        const newDir = targetIndex > prevIndexRef.current ? 1 : -1;
        setDirection(newDir);
        prevIndexRef.current = targetIndex;
        setActiveSectionIndex(targetIndex);
      }
    };

    window.addEventListener('popstate', handleHashSync);
    window.addEventListener('hashchange', handleHashSync);

    return () => {
      window.removeEventListener('popstate', handleHashSync);
      window.removeEventListener('hashchange', handleHashSync);
    };
  }, []);

  // Keyboard navigation support:
  // ArrowRight / PageDown -> Next section
  // ArrowLeft / PageUp -> Prev section
  // Home -> Section 1 (Home)
  // End -> Section 8 (Contact)
  // Keys 1 to 8 -> Direct jump
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside an input, textarea or contenteditable element
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        nextSection();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSection();
      } else if (e.key === 'Home') {
        e.preventDefault();
        navigateTo(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        navigateTo(SECTIONS.length - 1);
      } else if (e.key >= '1' && e.key <= '8' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        navigateTo(parseInt(e.key, 10) - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSection, prevSection, navigateTo]);

  const value: NavigationContextType = {
    activeSectionIndex,
    currentSection: SECTIONS[activeSectionIndex],
    sections: SECTIONS,
    direction,
    navigateTo,
    nextSection,
    prevSection,
    isFirst: activeSectionIndex === 0,
    isLast: activeSectionIndex === SECTIONS.length - 1,
    reducedMotion,
    isMobile,
    mobileViewMode,
    setMobileViewMode,
  };

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
};
