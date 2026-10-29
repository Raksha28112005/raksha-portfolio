import React from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  BookOpen,
  Sparkles,
  Award,
  Cloud,
  Cpu,
  Bot,
  Network,
  CheckCircle,
} from 'lucide-react';
import { achievementsList, certificationsList } from '../data/portfolioData';

const certIconMap: Record<string, React.ReactNode> = {
  Cloud: <Cloud className="w-5 h-5 text-cyan-hl" />,
  Cpu: <Cpu className="w-5 h-5 text-electric" />,
  Bot: <Bot className="w-5 h-5 text-purple-acc" />,
  Network: <Network className="w-5 h-5 text-violet-acc" />,
};

const AchievementsSection: React.FC = () => {
  return (
    <section id="achievements" className="py-12 sm:py-20 md:py-24 px-4 sm:px-6 relative max-w-7xl mx-auto scroll-mt-20">
      {/* Background glow */}
      <div
        className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(234, 179, 8, 0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="flex flex-col items-start gap-2.5 sm:gap-3 mb-10 sm:mb-16">
        <span className="section-label">07. Achievements &amp; Certifications</span>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
          Honors, Awards &amp; <span className="text-shimmer">Credentials</span>
        </h2>
        <p className="text-white-dim text-xs sm:text-sm md:text-base max-w-2xl font-sans mt-1">
          Distinguished competitive awards, international peer-reviewed research presentations,
          and verified professional certifications from Microsoft, NPTEL, UiPath, and Cisco.
        </p>
      </div>

      {/* Part 1: National & Academic Achievements */}
      <div className="mb-10 sm:mb-14">
        <div className="flex items-center gap-3 mb-5 sm:mb-6">
          <Trophy className="w-5 h-5 text-yellow-400 shrink-0" />
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight font-display">
            Major Honors &amp; Presentations
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {achievementsList.map((item, index) => {
            const isSIH = item.id.includes('sih');

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`glass glass-hover p-5 sm:p-7 md:p-8 rounded-2xl relative overflow-hidden flex flex-col justify-between border ${
                  isSIH ? 'border-yellow-500/25' : 'border-electric/25'
                }`}
              >
                {/* Corner ambient glow */}
                <div
                  className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 blur-3xl pointer-events-none -z-10"
                  style={{
                    background: isSIH ? '#EAB308' : '#00D4FF',
                  }}
                  aria-hidden="true"
                />

                <div>
                  {/* Header with badge */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div
                      className={`p-3 rounded-xl border shrink-0 ${
                        isSIH
                          ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                          : 'bg-electric/10 border-electric/20 text-cyan-hl'
                      }`}
                    >
                      {isSIH ? <Trophy className="w-6 h-6" /> : <BookOpen className="w-6 h-6" />}
                    </div>

                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border ${
                        isSIH
                          ? 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30'
                          : 'bg-electric/10 text-cyan-hl border-electric/30'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {item.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-snug">
                    {item.title}
                  </h4>

                  {/* Subtitle / Organisation */}
                  <p className="text-xs font-mono text-electric mt-1.5 font-medium">
                    {item.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-white-soft/85 text-sm md:text-sm font-sans leading-relaxed mt-4">
                    {item.description}
                  </p>
                </div>

                {/* Event Footer */}
                <div className="mt-8 pt-5 border-t border-white/5 flex items-center justify-between font-mono text-xs">
                  <span className="text-white-dim">Event</span>
                  <span
                    className="font-bold tracking-wider"
                    style={{ color: isSIH ? '#FACC15' : '#22EEF8' }}
                  >
                    {item.dateOrEvent}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Part 2: Verified Technical Certifications */}
      <div className="pt-8 border-t border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <Award className="w-5 h-5 text-electric" />
          <h3 className="text-lg md:text-xl font-bold text-white tracking-tight font-display">
            Verified Certifications
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificationsList.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="glass glass-hover p-6 rounded-2xl flex flex-col justify-between relative group"
            >
              <div>
                {/* Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-xl bg-surface-2 border border-white/10 shrink-0">
                    {cert.icon && certIconMap[cert.icon] ? (
                      certIconMap[cert.icon]
                    ) : (
                      <Award className="w-5 h-5 text-electric" />
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-sm md:text-base font-bold text-white tracking-tight leading-snug group-hover:text-electric transition-colors">
                  {cert.name}
                </h4>
              </div>

              {/* Issuer */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs font-mono text-white-dim">Issuer</span>
                <span className="text-xs font-mono font-semibold text-cyan-hl">
                  {cert.issuer}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
