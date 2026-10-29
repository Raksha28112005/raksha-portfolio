import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import { educationList } from '../data/portfolioData';

const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-12 sm:py-20 md:py-24 px-4 sm:px-6 relative max-w-7xl mx-auto scroll-mt-20">
      {/* Background glow */}
      <div
        className="absolute top-1/2 right-10 w-96 h-96 rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(123, 79, 255, 0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="flex flex-col items-start gap-2.5 sm:gap-3 mb-10 sm:mb-16">
        <span className="section-label">05. Education</span>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
          Academic <span className="text-shimmer">Background</span>
        </h2>
        <p className="text-white-dim text-xs sm:text-sm md:text-base max-w-2xl font-sans mt-1">
          Formal engineering and computer science foundations with sustained high academic excellence.
        </p>
      </div>

      {/* Education Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {educationList.map((edu, index) => {
          const isBE = edu.id === 'edu-be';

          return (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass glass-hover p-5 sm:p-7 md:p-8 rounded-2xl relative overflow-hidden flex flex-col justify-between"
            >
              {/* Top Accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background: isBE
                    ? 'linear-gradient(90deg, #00D4FF, #7B4FFF)'
                    : 'linear-gradient(90deg, #7B4FFF, #22EEF8)',
                }}
              />

              <div>
                <div className="flex items-start justify-between gap-4 mb-5 sm:mb-6">
                  <div className="p-3 rounded-xl bg-surface-2 border border-white/10 text-electric shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-hl">
                    {edu.status || 'Verified'}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight break-words">
                  {edu.degree}
                </h3>

                <p className="text-sm sm:text-base text-electric font-semibold mt-1">
                  {edu.institution}
                </p>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono text-white-dim mt-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-hl" />
                    <span>{edu.period}</span>
                  </div>
                  {edu.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-violet-acc" />
                      <span>{edu.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* CGPA Highlight Metric Banner */}
              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-mono text-white-dim">
                  <Award className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>Cumulative Grade Point:</span>
                </div>
                <div className="flex items-baseline gap-1 font-mono">
                  <span className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-hl transition-colors">
                    {edu.score.split('/')[0].trim()}
                  </span>
                  <span className="text-xs text-white-dim">/ 10 {edu.scoreLabel}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default EducationSection;
