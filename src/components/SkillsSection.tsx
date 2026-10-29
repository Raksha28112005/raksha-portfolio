import React from 'react';
import { motion } from 'framer-motion';
import {
  Terminal,
  Globe,
  Database,
  CloudLightning,
  CheckCircle2,
  Cpu,
} from 'lucide-react';
import { technicalSkills } from '../data/portfolioData';

const categoryIconMap: Record<string, React.ReactNode> = {
  Terminal: <Terminal className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  CloudLightning: <CloudLightning className="w-5 h-5" />,
  CheckCircle2: <CheckCircle2 className="w-5 h-5" />,
};

const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-12 sm:py-20 md:py-24 px-4 sm:px-6 relative max-w-7xl mx-auto scroll-mt-20">
      {/* Background glow */}
      <div
        className="absolute top-1/3 right-0 w-96 h-96 rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(123, 79, 255, 0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="flex flex-col items-start gap-2.5 sm:gap-3 mb-10 sm:mb-16">
        <span className="section-label">02. Technical Skills</span>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
          Tools, Frameworks &amp; <span className="text-shimmer">Core Disciplines</span>
        </h2>
        <p className="text-white-dim text-xs sm:text-sm md:text-base max-w-2xl font-sans mt-1">
          A verified compilation of programming languages, modern web and backend stacks, cloud &amp; DevOps
          tooling, and professional software engineering principles from my resume.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {technicalSkills.map((category, index) => {
          const isFullWidthOnLarge = index === 4; // Engineering practices card
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`glass glass-hover p-5 sm:p-6 md:p-8 rounded-2xl flex flex-col justify-between relative group ${
                isFullWidthOnLarge ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              {/* Corner accent glow */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 group-hover:opacity-25 transition-opacity pointer-events-none -z-10 blur-2xl"
                style={{ backgroundColor: category.accent }}
                aria-hidden="true"
              />

              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2.5 rounded-xl border"
                      style={{
                        backgroundColor: `${category.accent}15`,
                        borderColor: `${category.accent}35`,
                        color: category.accent,
                      }}
                    >
                      {categoryIconMap[category.icon] || <Cpu className="w-5 h-5" />}
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-white tracking-wide">
                      {category.title}
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-white-dim px-2.5 py-1 rounded-full bg-white/5 border border-white/5">
                    {category.skills.length} skills
                  </span>
                </div>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3.5 py-2 rounded-lg font-mono text-xs md:text-xs text-white-soft bg-surface-2/70 border border-white/10 hover:border-electric/40 hover:text-white transition-all duration-200 flex items-center gap-1.5"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: category.accent }}
                      />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom tag line */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white-faint">
                <span>Verified in Resume</span>
                <span className="capitalize" style={{ color: category.accent }}>
                  {category.id.replace('-', ' ')}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default SkillsSection;

