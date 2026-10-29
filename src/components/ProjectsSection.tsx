import React from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  BookOpen,
  Activity,
  ShieldCheck,
  Radio,
  Cpu,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { GithubIcon } from './icons/BrandIcons';
import { projectsList } from '../data/portfolioData';

const projectIconMap: Record<string, React.ReactNode> = {
  Activity: <Activity className="w-6 h-6 text-electric" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-cyan-hl" />,
  Radio: <Radio className="w-6 h-6 text-purple-acc" />,
  Cpu: <Cpu className="w-6 h-6 text-violet-acc" />,
};

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-12 sm:py-20 md:py-24 px-4 sm:px-6 relative max-w-7xl mx-auto scroll-mt-20">
      {/* Background glow */}
      <div
        className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="flex flex-col items-start gap-2.5 sm:gap-3 mb-10 sm:mb-16">
        <span className="section-label">04. Projects</span>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
          Featured &amp; Award-Winning <span className="text-shimmer">Engineering Work</span>
        </h2>
        <p className="text-white-dim text-xs sm:text-sm md:text-base max-w-2xl font-sans mt-1">
          High-impact solutions engineered across national hackathons, research conferences, and production
          architectures. Every project fact, accuracy metric, and technology stack is directly verified from my resume.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {projectsList.map((project, index) => {
          const isWinner = project.achievementBadge?.includes('Winner');
          const isResearch = project.achievementBadge?.includes('Research') || project.achievementBadge?.includes('ACICS');

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass glass-hover p-5 sm:p-7 md:p-8 rounded-2xl flex flex-col justify-between relative group overflow-hidden border ${
                isWinner ? 'border-electric/30' : 'border-white/10'
              }`}
            >
              {/* Highlight ribbon / subtle corner accent */}
              <div
                className="absolute top-0 right-0 w-44 h-44 rounded-full opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none -z-10 blur-3xl"
                style={{
                  background: isWinner
                    ? 'linear-gradient(135deg, #00D4FF, #7B4FFF)'
                    : isResearch
                    ? 'linear-gradient(135deg, #22EEF8, #9D6EFF)'
                    : 'linear-gradient(135deg, #7B4FFF, #00D4FF)',
                }}
                aria-hidden="true"
              />

              <div>
                {/* Top Bar: Icon + Achievement Badge */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="p-3 rounded-xl bg-surface-2 border border-white/10 shrink-0">
                    {project.icon ? projectIconMap[project.icon] : <Layers className="w-6 h-6 text-electric" />}
                  </div>

                  {project.achievementBadge && (
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wide border ${
                        isWinner
                          ? 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30'
                          : 'bg-electric/10 text-cyan-hl border-electric/30'
                      }`}
                    >
                      {isWinner ? (
                        <Trophy className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                      ) : (
                        <BookOpen className="w-3.5 h-3.5 text-cyan-hl shrink-0" />
                      )}
                      <span>{project.achievementBadge}</span>
                    </div>
                  )}
                </div>

                {/* Project Title */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-electric transition-colors break-words">
                  {project.title}
                </h3>

                {/* Metrics / Key highlights badge if available */}
                {project.metrics && (
                  <div className="mt-2.5 inline-block text-[11px] font-mono text-cyan-hl/90 bg-cyan-hl/5 px-2.5 py-1 rounded border border-cyan-hl/15 max-w-full break-words">
                    {project.metrics}
                  </div>
                )}

                {/* Verified Description */}
                <p className="text-white-soft/85 text-xs sm:text-sm font-sans leading-relaxed mt-4">
                  {project.description}
                </p>
              </div>

              {/* Bottom: Tech Tags + Links */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-white/5 space-y-4">
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-chip break-words">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action / Verification Links */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] font-mono text-white-dim flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Verified Project
                  </span>

                  <div className="flex items-center gap-3">
                    {/* Repository link only if verified */}
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-mono text-electric hover:text-white flex items-center gap-1 transition-colors"
                        aria-label={`View source code for ${project.title}`}
                      >
                        <GithubIcon size={14} />
                        <span>Source</span>
                      </a>
                    ) : null}

                    {/* Demo link only if available and verified */}
                    {project.demoUrl ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-mono text-cyan-hl hover:text-white flex items-center gap-1 transition-colors"
                        aria-label={`View live demo for ${project.title}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Demo</span>
                      </a>
                    ) : null}

                    {/* If individual repo/demo is not published in resume, provide link to user verified GitHub profile without inventing fake repo URLs */}
                    {!project.githubUrl && !project.demoUrl && (
                      <a
                        href="https://github.com/Raksha28112005"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-mono text-white-dim hover:text-electric flex items-center gap-1 transition-colors"
                        title="GitHub Profile"
                      >
                        <GithubIcon size={14} />
                        <span>Raksha28112005</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* GitHub Callout Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-12 glass p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/10"
      >
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="p-2.5 rounded-lg bg-white/5 text-electric shrink-0">
            <GithubIcon size={20} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Explore more code repositories</h4>
            <p className="text-xs text-white-dim">
              Verified GitHub Profile: <code className="text-cyan-hl break-all">github.com/Raksha28112005</code>
            </p>
          </div>
        </div>

        <a
          href="https://github.com/Raksha28112005"
          target="_blank"
          rel="noreferrer"
          className="btn-ghost text-xs py-2 px-4 shrink-0 min-h-[44px] flex items-center justify-center w-full sm:w-auto"
        >
          View GitHub Profile
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
