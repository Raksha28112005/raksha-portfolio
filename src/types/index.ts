// ─── TypeScript interfaces for Raksha's Portfolio ─────────────────────────────

export interface PersonalInfo {
  name: string;
  role: string;
  tagline: string;
  location: string;
  phone: string;
  email: string;
  github: string;
  linkedin: string;
  portfolio: string;
  summary: string;
  focusAreas: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  accent: string;
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  affiliation?: string;
  location: string;
  period: string;
  bullets: string[];
  tech?: string[];
  icon?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  achievementBadge?: string;
  description: string;
  technologies: string[];
  metrics?: string;
  githubUrl?: string; // Only if verified, do not invent
  demoUrl?: string;   // Only if verified, do not invent
  icon?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  score: string;
  scoreLabel: string;
  status?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  icon?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  dateOrEvent: string;
  icon: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  portfolio: string;
}
