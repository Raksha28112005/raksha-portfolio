import React from 'react';
import { motion } from 'framer-motion';
import { Award, Cloud, Cpu, Bot, Network, CheckCircle } from 'lucide-react';
import { certificationsList } from '../data/portfolioData';

const certIconMap: Record<string, React.ReactNode> = {
  Cloud: <Cloud className="w-5 h-5 text-cyan-hl" />,
  Cpu: <Cpu className="w-5 h-5 text-electric" />,
  Bot: <Bot className="w-5 h-5 text-purple-acc" />,
  Network: <Network className="w-5 h-5 text-violet-acc" />,
};

const CertificationsSection: React.FC = () => {
  return (
    <section id="certifications" className="py-24 px-6 relative max-w-7xl mx-auto scroll-mt-20">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="flex flex-col items-start gap-3 mb-16">
        <span className="section-label">06. Certifications</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
          Industry &amp; Academic <span className="text-shimmer">Credentials</span>
        </h2>
        <p className="text-white-dim text-sm md:text-base max-w-2xl font-sans mt-1">
          Verified professional certifications and technical specializations across cloud, IoT, automation,
          and computer networks.
        </p>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {certificationsList.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 18 }}
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
              <h3 className="text-base font-bold text-white tracking-tight leading-snug group-hover:text-electric transition-colors">
                {cert.name}
              </h3>
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
    </section>
  );
};

export default CertificationsSection;
