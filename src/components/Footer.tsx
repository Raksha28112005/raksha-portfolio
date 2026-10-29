import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons';
import { contactDetails, personalInfo } from '../data/portfolioData';

const CURRENT_YEAR = new Date().getFullYear();

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/5 bg-void py-8 sm:py-12 px-4 sm:px-6 relative mt-12 sm:mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Branding & Verification notice */}
        <div className="flex flex-col items-center md:items-start gap-1.5 text-center md:text-left">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-bg-void font-display font-bold text-xs"
              style={{
                background: 'linear-gradient(135deg, #00D4FF, #7B4FFF)',
              }}
            >
              R
            </div>
            <span className="font-display font-bold text-white text-base tracking-tight">
              {personalInfo.name}<span className="text-electric">.</span>
            </span>
          </div>
          <p className="text-xs text-white-dim font-mono">
            Authoritative portfolio sourced directly from verified resume PDF.
          </p>
        </div>

        {/* Center: Social Quick Links */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href={contactDetails.github}
            target="_blank"
            rel="noreferrer"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 rounded-xl bg-surface-1 border border-white/10 text-white-dim hover:text-electric transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={contactDetails.linkedin}
            target="_blank"
            rel="noreferrer"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 rounded-xl bg-surface-1 border border-white/10 text-white-dim hover:text-cyan-hl transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={`mailto:${contactDetails.email}`}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 rounded-xl bg-surface-1 border border-white/10 text-white-dim hover:text-purple-acc transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Right: Scroll to top */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-white-dim font-mono">
            &copy; {CURRENT_YEAR} {personalInfo.name}
          </span>
          <button
            onClick={scrollToTop}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 rounded-xl bg-surface-1 hover:bg-surface-2 border border-white/10 text-white-dim hover:text-white transition-colors"
            aria-label="Scroll back to top"
            title="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
