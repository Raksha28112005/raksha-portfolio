import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle, Bot, Cloud } from 'lucide-react';
import { experienceList } from '../data/portfolioData';

const iconMap: Record<string, React.ReactNode> = {
  Bot: <Bot className="w-5 h-5 text-electric" />,
  Cloud: <Cloud className="w-5 h-5 text-cyan-hl" />,
};

const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-12 sm:py-20 md:py-24 px-4 sm:px-6 relative max-w-7xl mx-auto scroll-mt-20">
      {/* Background ambient glow */}
      <div
        className="absolute top-1/2 left-10 w-96 h-96 rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.07) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="flex flex-col items-start gap-2.5 sm:gap-3 mb-10 sm:mb-16">
        <span className="section-label">03. Experience</span>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
          Internships &amp; <span className="text-shimmer">Industry Work</span>
        </h2>
        <p className="text-white-dim text-xs sm:text-sm md:text-base max-w-2xl font-sans mt-1">
          Hands-on software and cloud computing engineering, machine learning pipelines, and embedded-AI
          workshops with verified responsibilities from my resume.
        </p>
      </div>

      {/* Experience Timeline */}
      <div className="relative border-l border-white/10 ml-2.5 sm:ml-4 md:ml-6 pl-4 sm:pl-6 md:pl-10 space-y-8 sm:space-y-12">
        {experienceList.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative group"
          >
            {/* Timeline bullet on vertical line */}
            <div
              className="absolute -left-[25px] sm:-left-[33px] md:-left-[49px] top-6 w-4 h-4 rounded-full bg-void border-2 border-electric group-hover:scale-125 transition-transform"
              style={{ boxShadow: '0 0 12px rgba(0, 212, 255, 0.7)' }}
            />

            {/* Experience Card */}
            <div className="glass glass-hover p-5 sm:p-6 md:p-8 rounded-2xl relative overflow-hidden">
              {/* Subtle top indicator */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-surface-2 border border-white/10 shrink-0">
                    {item.icon ? iconMap[item.icon] : <Briefcase className="w-5 h-5 text-electric" />}
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
                      {item.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-electric mt-0.5">
                      <span className="font-semibold">{item.company}</span>
                      {item.affiliation && (
                        <span className="text-white-dim">({item.affiliation})</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Metadata Pills */}
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-cyan-hl border border-white/5">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.period}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-white-dim border border-white/5">
                    <MapPin className="w-3.5 h-3.5 text-violet-acc" />
                    {item.location}
                  </span>
                </div>
              </div>

              {/* Responsibilities list directly from resume */}
              <div className="space-y-3 mt-4">
                {item.bullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-3 text-sm md:text-sm text-white-soft/90 leading-relaxed font-sans">
                    <CheckCircle className="w-4 h-4 text-electric shrink-0 mt-1" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Associated Tech / Domains */}
              {item.tech && item.tech.length > 0 && (
                <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-white-dim mr-2">Key Areas:</span>
                  {item.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/5 text-white-soft border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;

