import React, { lazy, Suspense, useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useNavigation } from '../../context/navigation-state';

/* ─── Lazy-load the heavy 3D scene ───────────────────────────── */
const HeroScene = lazy(() => import('./HeroScene'));

/* ─── Check for WebGL support ────────────────────────────────── */
function detectWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

/* ─── Animated typed subtitle ────────────────────────────────── */
const ROLES = [
  'Software Developer',
  'Backend & Cloud Engineer',
  'Machine Learning Specialist',
  'SIH 2025 National Winner',
];

function TypedSubtitle() {
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState(() => (reducedMotion ? ROLES[0] : ''));
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    if (paused) {
      const t = setTimeout(() => setPaused(false), 1400);
      return () => clearTimeout(t);
    }
    const current = ROLES[roleIdx];
    if (!deleting && displayed.length < current.length) {
      const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 55);
      return () => clearTimeout(t);
    }
    if (!deleting && displayed.length === current.length) {
      const t = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 32);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length === 0) {
      const t = setTimeout(() => {
        setDeleting(false);
        setPaused(true);
        setRoleIdx((i) => (i + 1) % ROLES.length);
      }, 50);
      return () => clearTimeout(t);
    }
  }, [displayed, deleting, paused, roleIdx, reducedMotion]);

  return (
    <span className="hero-typed-subtitle font-mono text-electric" aria-live="polite">
      {displayed}
      <span className="hero-cursor" aria-hidden="true">|</span>
    </span>
  );
}

/* ─── Stat counter ────────────────────────────────────────────── */
interface StatProps { value: string; label: string; delay?: number }
function Stat({ value, label, delay = 0 }: StatProps) {
  return (
    <motion.div
      className="hero-stat"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4 + delay, duration: 0.5 }}
    >
      <span className="hero-stat-value">{value}</span>
      <span className="hero-stat-label">{label}</span>
    </motion.div>
  );
}

/* ─── WebGL fallback background ──────────────────────────────── */
function FallbackBg() {
  return (
    <div className="hero-fallback-bg" aria-hidden="true">
      <div className="hero-fallback-orb hero-fallback-orb-cyan" />
      <div className="hero-fallback-orb hero-fallback-orb-violet" />
    </div>
  );
}

/* ─── Scene loading skeleton ─────────────────────────────────── */
function SceneLoadingFallback() {
  return (
    <div className="hero-scene-loading" aria-hidden="true">
      <FallbackBg />
      <div className="hero-scene-loading-pulse" />
    </div>
  );
}

/* ─── Floating achievement badge ──────────────────────────────── */
interface FloatingBadgeProps {
  reducedMotion: boolean;
}
function FloatingBadge({ reducedMotion }: FloatingBadgeProps) {
  return (
    <motion.div
      className="hero-badge"
      animate={reducedMotion ? {} : { y: [0, -7, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <span className="hero-badge-emoji">🏆</span>
      <div className="hero-badge-content">
        <span className="hero-badge-title">SIH 2025</span>
        <span className="hero-badge-sub">National Winner</span>
      </div>
    </motion.div>
  );
}

/* ─── Orbiting decoration dot ─────────────────────────────────── */
function OrbitDot({ className }: { className: string }) {
  return <div className={`hero-orbit-dot ${className}`} aria-hidden="true" />;
}

/* ─── Tech tag strip above photo ──────────────────────────────── */
function TechStrip({ reducedMotion }: { reducedMotion: boolean }) {
  const tags = ['React', 'Python', 'AWS', 'TensorFlow', 'DevOps'];
  return (
    <motion.div
      className="hero-tech-strip"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.5 }}
    >
      {tags.map((tag, i) => (
        <motion.span
          key={tag}
          className="hero-tech-tag"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.7 + i * 0.08, duration: 0.35 }}
          animate-hover={reducedMotion ? {} : { y: -3 }}
        >
          {tag}
        </motion.span>
      ))}
    </motion.div>
  );
}

/* ─── Social link icons ───────────────────────────────────────── */
function SocialLinks() {
  const links = [
    { href: 'https://github.com/Raksha28112005', label: 'GitHub', icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    )},
    { href: 'https://www.linkedin.com/in/raksha-r-6a8473349/', label: 'LinkedIn', icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    )},
  ];

  return (
    <motion.div
      className="hero-social-row"
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.8, duration: 0.45 }}
    >
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noreferrer"
          className="hero-social-link"
          aria-label={l.label}
        >
          {l.icon}
        </a>
      ))}
      <div className="hero-social-divider" />
      <span className="hero-social-label">Connect</span>
    </motion.div>
  );
}

/* ─── Main HeroSection ────────────────────────────────────────── */
const HeroSection: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [webglAvailable] = useState(() => {
    if (typeof window === 'undefined') return false;
    return detectWebGL();
  });
  const [sceneReady, setSceneReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Parallax for profile photo ──────────────────────────────── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 55, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 55, damping: 20 });
  const photoX = useTransform(smoothX, [-1, 1], [-12, 12]);
  const photoY = useTransform(smoothY, [-1, 1], [-9, 9]);
  // Parallax layer for text (opposite, gentler)
  const textX  = useTransform(smoothX, [-1, 1], [5, -5]);
  const textY  = useTransform(smoothY, [-1, 1], [3, -3]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (reducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }, [reducedMotion, mouseX, mouseY]);

  const handlePointerLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (reducedMotion || !containerRef.current) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(((touch.clientX - rect.left) / rect.width) * 2 - 1);
    mouseY.set(((touch.clientY - rect.top) / rect.height) * 2 - 1);
  }, [reducedMotion, mouseX, mouseY]);

  // Delay scene mount slightly for faster text/nav render
  useEffect(() => {
    const t = setTimeout(() => setSceneReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      className="hero-section"
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onTouchMove={handleTouchMove}
      aria-label="Hero section"
    >
      {/* ── 3D Canvas Layer ─────────────────────────────────────── */}
      <div className="hero-canvas-layer" aria-hidden="true">
        {webglAvailable ? (
          sceneReady ? (
            <Suspense fallback={<SceneLoadingFallback />}>
              <HeroScene reducedMotion={reducedMotion} />
            </Suspense>
          ) : (
            <SceneLoadingFallback />
          )
        ) : (
          <FallbackBg />
        )}
      </div>

      {/* ── Gradient overlay ───────────────────────────────────── */}
      <div className="hero-gradient-overlay" aria-hidden="true" />

      {/* ── Content Layer ─────────────────────────────────────── */}
      <div className="hero-content">

        {/* ── Left: text column ──────────────────────────────── */}
        <motion.div
          className="hero-text-col"
          style={reducedMotion ? {} : { x: textX, y: textY }}
        >

          {/* Label pill */}
          <motion.div
            className="hero-label-pill"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="hero-label-dot" aria-hidden="true" />
            Computer Science & Engineering · BNMIT Bengaluru
          </motion.div>

          {/* Name */}
          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.45 }}
          >
            Raksha
            <br />
            <span className="text-shimmer">R.</span>
          </motion.h1>

          {/* Typed role */}
          <motion.p
            className="hero-role"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            <TypedSubtitle />
          </motion.p>

          {/* Bio */}
          <motion.p
            className="hero-bio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.85 }}
          >
            SIH 2025 National Winner · CS undergraduate at BNMIT Bengaluru.
            Experience in software development, backend engineering, cloud computing,
            machine learning, and object-oriented programming.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="hero-cta-row"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05 }}
          >
            <button
              onClick={() => navigateTo('projects')}
              className="btn-primary"
              id="hero-cta-projects"
              aria-label="View Projects section"
            >
              View Projects
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="btn-accent"
              id="hero-cta-contact"
              aria-label="Navigate to contact section"
            >
              Contact Me
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <path d="M1.5 2.5h10a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                <path d="M1 3l5.5 4L12 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <a href="/resume.pdf" download className="btn-ghost" id="hero-cta-resume">
              Download Resume
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <path d="M6.5 1v8M3 7l3.5 3 3.5-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1.5 11h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </a>
          </motion.div>

          {/* Social links */}
          <SocialLinks />

          {/* Stats row */}
          <div className="hero-stats-row">
            <Stat value="4" label="Key Projects" delay={0} />
            <div className="hero-stat-divider" />
            <Stat value="8.85" label="BNMIT CGPA" delay={0.1} />
            <div className="hero-stat-divider" />
            <Stat value="SIH '25" label="Winner" delay={0.2} />
            <div className="hero-stat-divider" />
            <Stat value="2" label="Internships" delay={0.3} />
          </div>
        </motion.div>

        {/* ── Right: profile photo ────────────────────────────── */}
        <div className="hero-photo-col">
          <motion.div
            className="hero-photo-wrapper"
            style={{ x: photoX, y: photoY }}
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Outer rotating dashed ring */}
            <motion.div
              className="hero-ring hero-ring-outer"
              animate={reducedMotion ? {} : { rotate: 360 }}
              transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
            />
            {/* Inner counter-rotating ring */}
            <motion.div
              className="hero-ring hero-ring-inner"
              animate={reducedMotion ? {} : { rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            />
            {/* Orbit dots on the outer ring */}
            <OrbitDot className="hero-orbit-dot-cyan" />
            <OrbitDot className="hero-orbit-dot-violet" />

            {/* Glow halo behind photo */}
            <div className="hero-photo-glow" aria-hidden="true" />

            {/* Actual photo — cropped to portrait from top */}
            <div className="hero-photo-frame">
              <img
                src="/profile.jpg"
                alt="Raksha R — AI & ML Engineer, SIH 2025 National Winner"
                className="hero-photo-img"
                loading="eager"
                width={400}
                height={500}
              />
            </div>

            {/* SIH Winner floating badge */}
            <FloatingBadge reducedMotion={reducedMotion} />

            {/* CS&E pill — top left of photo */}
            <motion.div
              className="hero-cse-pill"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <span>🎓</span>
              <span>CS &amp; Engineering</span>
            </motion.div>
          </motion.div>

          {/* Tech strip below photo */}
          <TechStrip reducedMotion={reducedMotion} />
        </div>
      </div>

      {/* ── Scroll indicator ──────────────────────────────────── */}
      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
        aria-hidden="true"
      >
        <motion.div
          className="hero-scroll-dot"
          animate={reducedMotion ? {} : { y: [0, 9, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
