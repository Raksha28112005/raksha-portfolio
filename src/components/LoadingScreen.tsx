import React from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: '#020408' }}
      role="status"
      aria-label="Loading portfolio"
      aria-busy="true"
    >
      {/* Ambient glows */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(123,79,255,0.1) 0%, transparent 70%)' }}
      />

      <div className="relative text-center space-y-8">
        {/* Animated logo mark */}
        <div className="flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute w-24 h-24 rounded-full border border-electric/20"
            style={{ borderTopColor: '#00D4FF' }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            className="absolute w-16 h-16 rounded-full border border-purple-acc/20"
            style={{ borderBottomColor: '#7B4FFF' }}
          />
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-bg-void font-display font-bold text-xl"
            style={{ background: 'linear-gradient(135deg, #00D4FF, #7B4FFF)' }}
          >
            R
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="font-display text-2xl font-bold text-white">Raksha R</h1>
          <div className="flex items-center justify-center gap-2 font-mono text-xs text-white-dim">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
            Initialising portfolio
          </div>
        </div>

        {/* Loading bar */}
        <div className="w-48 mx-auto h-px bg-surface-2 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #00D4FF, #7B4FFF)' }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
