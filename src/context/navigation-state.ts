import { createContext, useContext } from 'react';
import type { SectionMeta } from '../types/navigation';

export interface NavigationContextType {
  activeSectionIndex: number;
  currentSection: SectionMeta;
  sections: SectionMeta[];
  direction: number; // 1 for forward (L to R), -1 for backward (R to L)
  navigateTo: (target: number | string) => void;
  nextSection: () => void;
  prevSection: () => void;
  isFirst: boolean;
  isLast: boolean;
  reducedMotion: boolean;
  isMobile: boolean;
  mobileViewMode: 'slides' | 'scroll';
  setMobileViewMode: (mode: 'slides' | 'scroll') => void;
}

export const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
