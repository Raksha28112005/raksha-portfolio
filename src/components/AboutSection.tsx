import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Server,
  Cloud,
  Cpu,
  Layers,
  Sparkles,
  MapPin,
  Trophy,
  ArrowUpRight,
} from 'lucide-react';
import { useNavigation } from '../context/navigation-state';
import { personalInfo } from '../data/portfolioData';

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-6 h-6 text-electric" />,
  Server: <Server className="w-6 h-6 text-cyan-hl" />,
  Cloud: <Cloud className="w-6 h-6 text-purple-acc" />,
  Cpu: <Cpu className="w-6 h-6 text-violet-acc" />,
  Layers: <Layers className="w-6 h-6 text-[#00E5A3]" />,
};

const AboutSection: React.FC = () => {
  const { navigateTo } = useNavigation();
  return (
    <section id="about" className="py-12 sm:py-20 md:py-24 px-4 sm:px-6 relative max-w-7xl mx-auto scroll-mt-20">
      {/* Background ambient glow */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Section Header */}
      <div className="flex flex-col items-start gap-2.5 sm:gap-3 mb-10 sm:mb-16">
        <span className="section-label">01. About Me</span>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
          Engineering with <span className="text-shimmer">Precision & Impact</span>
        </h2>
        <p className="text-white-dim text-xs sm:text-sm md:text-base max-w-2xl font-sans mt-1">
          Bridging system architecture, machine learning, and scalable cloud pipelines to solve
          tangible problems in healthcare, forensics, and modern software systems.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column: Authoritative Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 glass p-5 sm:p-8 md:p-10 rounded-2xl relative overflow-hidden"
        >
          {/* Subtle top accent bar */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: 'linear-gradient(90deg, #00D4FF, #7B4FFF, #22EEF8)' }}
          />

          <div className="flex items-center gap-3 mb-6">
            <span className="p-2.5 rounded-xl bg-electric/10 text-electric border border-electric/20">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-electric block">
                Professional Profile
              </span>
              <h3 className="text-lg font-semibold text-white">Undergraduate & National Winner</h3>
            </div>
          </div>

          <div className="space-y-4 text-white-soft text-sm md:text-base leading-relaxed font-sans">
            <p className="text-white-soft/95 font-normal">{personalInfo.summary}</p>
          </div>

          {/* Quick Verified Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 pt-6 border-t border-white/10 font-mono text-xs">
            <div className="flex items-center gap-2 text-white-dim">
              <MapPin className="w-4 h-4 text-cyan-hl shrink-0" />
              <span>Location: <strong className="text-white">{personalInfo.location}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-white-dim">
              <Trophy className="w-4 h-4 text-yellow-400 shrink-0" />
              <span>National Winner: <strong className="text-white">SIH 2025</strong></span>
            </div>
          </div>

          {/* CTA Link to Contact */}
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-stretch sm:items-center">
            <button
              onClick={() => navigateTo('contact')}
              className="btn-primary text-xs py-3 px-5 min-h-[44px] justify-center"
              aria-label="Navigate to contact section"
            >
              Get in Touch
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <a
              href="/resume.pdf"
              download
              className="btn-ghost text-xs py-3 px-5 min-h-[44px] justify-center"
            >
              Verified Resume PDF ↓
            </a>
          </div>
        </motion.div>

        {/* Right Column: 5 Core Focus Pillars */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="text-xs font-mono text-white-dim uppercase tracking-wider mb-1 flex items-center gap-2">
            <span>Core Pillars &amp; Interests</span>
            <div className="h-[1px] flex-1 bg-white/10" />
          </div>

          {personalInfo.focusAreas.map((area, idx) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="glass glass-hover p-4 md:p-5 flex items-start gap-4"
            >
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 shrink-0 mt-0.5">
                {iconMap[area.icon] || <Code2 className="w-5 h-5 text-electric" />}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-white tracking-wide">{area.title}</h4>
                <p className="text-xs text-white-dim mt-1 leading-relaxed">{area.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

