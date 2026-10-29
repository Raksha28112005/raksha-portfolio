import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Globe,
  Phone,
  MapPin,
  Copy,
  Check,
  ExternalLink,
  Download,
  Send,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons';
import { contactDetails } from '../data/portfolioData';

const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactDetails.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const contactLinks = [
    {
      id: 'email',
      label: 'Email Address',
      value: contactDetails.email,
      href: `mailto:${contactDetails.email}`,
      icon: <Mail className="w-5 h-5 text-electric" />,
      actionText: 'Send Email',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn Profile',
      value: 'raksha-r-6a8473349',
      href: contactDetails.linkedin,
      icon: <LinkedinIcon size={20} className="text-cyan-hl" />,
      actionText: 'Connect',
    },
    {
      id: 'github',
      label: 'GitHub Repositories',
      value: 'Raksha28112005',
      href: contactDetails.github,
      icon: <GithubIcon size={20} className="text-purple-acc" />,
      actionText: 'Follow',
    },
    {
      id: 'portfolio',
      label: 'Existing Portfolio',
      value: 'portfolio-plum-rho-60.vercel.app',
      href: contactDetails.portfolio,
      icon: <Globe className="w-5 h-5 text-violet-acc" />,
      actionText: 'Visit Live',
    },
    {
      id: 'phone',
      label: 'Phone Contact',
      value: contactDetails.phone,
      href: `tel:${contactDetails.phone.replace(/\s+/g, '')}`,
      icon: <Phone className="w-5 h-5 text-[#00E5A3]" />,
      actionText: 'Call',
    },
    {
      id: 'location',
      label: 'Current Location',
      value: contactDetails.location,
      href: 'https://maps.google.com/?q=Bengaluru,India',
      icon: <MapPin className="w-5 h-5 text-yellow-400" />,
      actionText: 'Locate',
    },
  ];

  return (
    <section id="contact" className="py-12 sm:py-20 md:py-24 px-4 sm:px-6 relative max-w-7xl mx-auto scroll-mt-20">
      {/* Background glow */}
      <div
        className="absolute bottom-0 right-1/4 w-[450px] h-[450px] rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="flex flex-col items-start gap-2.5 sm:gap-3 mb-10 sm:mb-16">
        <span className="section-label">08. Contact</span>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
          Let’s Build Something <span className="text-shimmer">Remarkable</span>
        </h2>
        <p className="text-white-dim text-xs sm:text-sm md:text-base max-w-2xl font-sans mt-1">
          Open to software engineering roles, cloud computing initiatives, backend architecture,
          and machine learning research opportunities. Reach out directly through any channel below.
        </p>
      </div>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column: Direct Action Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 glass p-5 sm:p-7 md:p-8 rounded-2xl relative overflow-hidden flex flex-col justify-between"
        >
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: 'linear-gradient(90deg, #00D4FF, #7B4FFF)' }}
          />

          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-electric block mb-2">
              Fastest Response
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Get in Touch Directly
            </h3>
            <p className="text-white-dim text-xs sm:text-sm mt-2.5 leading-relaxed">
              Feel free to email me regarding software development opportunities, internship queries,
              or collaborative tech projects.
            </p>

            {/* Email Box with One-Click Copy */}
            <div className="mt-5 sm:mt-6 p-3 sm:p-4 rounded-xl bg-surface-2 border border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <Mail className="w-5 h-5 text-electric shrink-0" />
                <span className="font-mono text-xs sm:text-sm text-white truncate">
                  {contactDetails.email}
                </span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-2.5 min-w-[44px] min-h-[44px] rounded-lg bg-white/5 hover:bg-white/10 text-white-soft hover:text-white transition-colors shrink-0 flex items-center justify-center"
                aria-label="Copy email address"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {copied && (
              <p className="text-xs font-mono text-emerald-400 mt-2 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Email address copied to clipboard!
              </p>
            )}
          </div>

          <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/5 space-y-3">
            <a
              href={`mailto:${contactDetails.email}?subject=Opportunity%20Inquiry%20via%20Portfolio`}
              className="btn-primary w-full justify-center text-xs py-3 min-h-[44px]"
            >
              Compose Email
              <Send className="w-4 h-4" />
            </a>

            <a
              href="/resume.pdf"
              download
              className="btn-ghost w-full justify-center text-xs py-3 min-h-[44px]"
            >
              Download Verified Resume PDF
              <Download className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Right Column: Verified Channel Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contactLinks.map((item, idx) => (
            <motion.a
              key={item.id}
              href={item.href}
              target={item.href.startsWith('mailto') || item.href.startsWith('tel') ? '_self' : '_blank'}
              rel="noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className="glass glass-hover p-5 rounded-xl flex flex-col justify-between group transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="p-2.5 rounded-lg bg-surface-2 border border-white/10 shrink-0">
                  {item.icon}
                </div>
                <ExternalLink className="w-4 h-4 text-white-dim group-hover:text-electric transition-colors" />
              </div>

              <div>
                <span className="text-[11px] font-mono text-white-dim uppercase tracking-wider block">
                  {item.label}
                </span>
                <span className="text-sm font-semibold text-white group-hover:text-electric transition-colors truncate block mt-0.5">
                  {item.value}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-electric">
                <span>{item.actionText}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
