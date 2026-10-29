/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-void': '#020408',
        'bg-deep': '#050B14',
        'surface-1': '#0A1220',
        'surface-2': '#0F1A2E',
        'surface-3': '#141E36',
        'electric': '#00D4FF',
        'cyan-hl': '#22EEF8',
        'purple-acc': '#7B4FFF',
        'violet-acc': '#9D6EFF',
        'white-dim': '#8A96B0',
        'white-faint': '#4A5568',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backdropBlur: {
        glass: '20px',
      },
      boxShadow: {
        'glow-blue': '0 0 40px -8px rgba(0,212,255,0.55)',
        'glow-purple': '0 0 40px -8px rgba(123,79,255,0.45)',
        'glow-cyan': '0 0 25px -5px rgba(34,238,248,0.4)',
        'card': '0 20px 60px -20px rgba(0,0,0,0.9)',
        'card-hover': '0 30px 80px -20px rgba(0,0,0,0.95), 0 0 40px -10px rgba(0,212,255,0.15)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'float-delay': 'float 7s ease-in-out 1.5s infinite',
        'pulse-ring': 'pulseRing 2.5s ease-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
        'orbit-1': 'orbit1 8s linear infinite',
        'orbit-2': 'orbit2 12s linear infinite',
        'orbit-3': 'orbit3 16s linear infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'scan-line': 'scanLine 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        pulseRing: {
          '0%': { boxShadow: '0 0 0 0 rgba(0,212,255,0.5)' },
          '70%': { boxShadow: '0 0 0 14px rgba(0,212,255,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(0,212,255,0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        orbit1: {
          '0%': { transform: 'rotate(0deg) translateX(90px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(90px) rotate(-360deg)' },
        },
        orbit2: {
          '0%': { transform: 'rotate(120deg) translateX(130px) rotate(-120deg)' },
          '100%': { transform: 'rotate(480deg) translateX(130px) rotate(-480deg)' },
        },
        orbit3: {
          '0%': { transform: 'rotate(240deg) translateX(170px) rotate(-240deg)' },
          '100%': { transform: 'rotate(600deg) translateX(170px) rotate(-600deg)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        scanLine: {
          '0%': { top: '0%', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { top: '100%', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
