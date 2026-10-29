export interface SectionMeta {
  id: string;
  label: string;
  number: string;
  aliases?: string[];
}

export const SECTIONS: SectionMeta[] = [
  { id: 'home', label: 'Home', number: '01', aliases: ['hero'] },
  { id: 'about', label: 'About', number: '02' },
  { id: 'skills', label: 'Skills', number: '03' },
  { id: 'experience', label: 'Experience', number: '04', aliases: ['journey'] },
  { id: 'projects', label: 'Projects', number: '05' },
  { id: 'education', label: 'Education', number: '06' },
  { id: 'achievements', label: 'Achievements', number: '07', aliases: ['certifications', 'honors'] },
  { id: 'contact', label: 'Contact', number: '08' },
];
