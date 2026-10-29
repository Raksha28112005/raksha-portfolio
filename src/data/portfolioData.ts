import type {
  PersonalInfo,
  SkillCategory,
  ExperienceItem,
  ProjectItem,
  EducationItem,
  CertificationItem,
  AchievementItem,
  ContactInfo,
} from '../types';

/**
 * ==============================================================================
 * CENTRAL STRUCTURED CONTENT FILE
 * ==============================================================================
 * All personal and professional facts in this file are strictly verified
 * against Raksha R's authoritative resume PDF (RakshaBNMIT.pdf).
 *
 * To update your portfolio facts in the future, simply update the records below.
 * Components render directly from this file without code changes.
 * ==============================================================================
 */

// ─── SECTION 1: ABOUT ME & PERSONAL INFO ─────────────────────────────────────
export const personalInfo: PersonalInfo = {
  name: 'Raksha R',
  role: 'Computer Science & Engineering Undergrad · SIH 2025 National Winner',
  tagline: 'Building intelligent, scalable software solutions with Cloud, AI/ML, and robust backend engineering.',
  location: 'Bengaluru, India',
  phone: '+91 78923 51231',
  email: 'raksha281105@gmail.com',
  github: 'https://github.com/Raksha28112005',
  linkedin: 'https://www.linkedin.com/in/raksha-r-6a8473349/',
  portfolio: 'https://portfolio-plum-rho-60.vercel.app/',
  
  // Professional Summary directly from the resume:
  summary:
    'Computer Science & Engineering undergraduate and Smart India Hackathon (SIH) 2025 National Winner with project and internship experience in software development, object-oriented programming, backend development, cloud computing, and machine learning. Develops applications using Java, Python, JavaScript, SQL, React, Spring Boot, Flask, and REST APIs. Familiar with Git/GitHub, CI/CD workflows, database concepts, debugging, troubleshooting, and collaborative software development.',

  // Key interest and expertise pillars requested:
  focusAreas: [
    {
      title: 'Software Development',
      description: 'End-to-end engineering of modern web and mobile applications using React, Next.js, and Flutter with clean architectural patterns.',
      icon: 'Code2',
    },
    {
      title: 'Backend Development',
      description: 'Designing resilient microservices, robust REST APIs, and event-driven architectures with Spring Boot, Node.js, and Flask.',
      icon: 'Server',
    },
    {
      title: 'Cloud Computing',
      description: 'Architecting scalable cloud pipelines and serverless integrations using AWS (API Gateway, IAM, S3) and Azure IoT.',
      icon: 'Cloud',
    },
    {
      title: 'Machine Learning',
      description: 'Developing high-accuracy deep learning and classification pipelines with TensorFlow, Keras, CNNs, XGBoost, and ONNX Runtime.',
      icon: 'Cpu',
    },
    {
      title: 'Object-Oriented Programming',
      description: 'Structuring clean, modular, and maintainable systems applying strong OOP principles, design patterns, and SOLID foundations.',
      icon: 'Layers',
    },
  ],
};

// ─── SECTION 2: TECHNICAL SKILLS ─────────────────────────────────────────────
export const technicalSkills: SkillCategory[] = [
  {
    id: 'programming',
    title: 'Programming',
    icon: 'Terminal',
    accent: '#00D4FF',
    skills: ['Java', 'Python', 'JavaScript', 'SQL', 'OOP'],
  },
  {
    id: 'web-backend',
    title: 'Web & Backend',
    icon: 'Globe',
    accent: '#22EEF8',
    skills: ['React', 'Next.js', 'Node.js', 'Spring Boot', 'Flask', 'REST APIs'],
  },
  {
    id: 'databases-tools',
    title: 'Databases & Tools',
    icon: 'Database',
    accent: '#9D6EFF',
    skills: ['MySQL', 'SQLite', 'MongoDB', 'Postman', 'Git', 'GitHub', 'Maven'],
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    icon: 'CloudLightning',
    accent: '#7B4FFF',
    skills: ['AWS API Gateway', 'IAM', 'S3', 'Azure IoT', 'Jenkins', 'CI/CD', 'Linux'],
  },
  {
    id: 'engineering-practices',
    title: 'Engineering Practices',
    icon: 'CheckCircle2',
    accent: '#00E5A3',
    skills: [
      'Software engineering',
      'Debugging',
      'Code quality',
      'Problem-solving',
      'Analytical skills',
      'Team collaboration',
      'Technical communication',
      'Agile development',
    ],
  },
];

// ─── SECTION 3: EXPERIENCE ───────────────────────────────────────────────────
export const experienceList: ExperienceItem[] = [
  {
    id: 'exp-robomanthan',
    role: 'AI & Machine Learning Intern',
    company: 'Robomanthan',
    affiliation: 'with BNM Institute of Technology',
    location: 'Bengaluru, India',
    period: 'June 2025 to July 2025',
    bullets: [
      'Completed practical assignments and workshops in artificial intelligence, machine learning, and robotics.',
      'Worked with sensors, microcontrollers, and automation concepts for robotics and embedded-AI applications.',
    ],
    tech: ['AI / Machine Learning', 'Robotics', 'Sensors & Microcontrollers', 'Embedded-AI'],
    icon: 'Bot',
  },
  {
    id: 'exp-tru-projects',
    role: 'Software & Cloud Computing Intern',
    company: 'Tru Projects',
    location: 'Hyderabad, India',
    period: 'January 2024 to April 2024',
    bullets: [
      'Developed AWS cloud data pipelines for a 5G Smart Diabetes healthcare analytics project, preparing healthcare datasets for machine learning analysis.',
      'Assisted with deployment, monitoring, and management of machine learning models across cloud platforms to support reliable operation.',
    ],
    tech: ['AWS Cloud', 'Data Pipelines', 'Healthcare Analytics', 'Model Deployment & Monitoring'],
    icon: 'Cloud',
  },
];

// ─── SECTION 4: PROJECTS ─────────────────────────────────────────────────────
export const projectsList: ProjectItem[] = [
  {
    id: 'proj-contact-tracing',
    title: 'Digital Contact Tracing & Screening Tool for MDR Pathogens in Hospitals',
    achievementBadge: 'SIH 2025 National Winner',
    description:
      'Developed an offline-first, cross-platform hospital contact-tracing application using on-device inference across 19 clinical features and a hybrid risk score combining machine learning (70%) with rules (30%).',
    technologies: ['Flutter', 'XGBoost', 'AWS', 'ONNX Runtime'],
    metrics: '19 Clinical Features · 70% ML / 30% Rules Hybrid Risk Engine',
    // Note: Specific project repository URLs are not invented per prompt requirements.
    githubUrl: undefined,
    demoUrl: undefined,
    icon: 'Activity',
  },
  {
    id: 'proj-forensics-tool',
    title: 'WhatsApp Digital Forensics Investigation Tool',
    description:
      'Built a forensic analysis tool for WhatsApp .crypt14 database files, including chain-of-custody hashing and an interactive evidence dashboard.',
    technologies: ['AES-256-GCM', 'SQLite', 'SHA-256'],
    metrics: 'Cryptographic Decryption · Tamper-evident Chain-of-Custody',
    githubUrl: undefined,
    demoUrl: undefined,
    icon: 'ShieldCheck',
  },
  {
    id: 'proj-devops-converter',
    title: 'DevOps Video-to-Audio Converter',
    description:
      'Implemented a Spring Boot backend using a Plan–Code–Build–Test–Release–Deploy workflow in a Maven-managed, CI/CD-ready architecture.',
    technologies: ['Spring Boot', 'Maven', 'FFmpeg', 'CI/CD'],
    metrics: 'Automated CI/CD Pipeline · High-throughput Media Processing',
    githubUrl: undefined,
    demoUrl: undefined,
    icon: 'Radio',
  },
  {
    id: 'proj-crop-disease',
    title: 'Cotton Leaf Disease Detection',
    achievementBadge: 'ACICS 2025 Research Presenter · 94.2% Acc',
    description:
      'Trained a CNN for four-class cotton leaf disease detection, achieving 94.2% validation accuracy; presented the work at the ACICS 2025 international conference.',
    technologies: ['CNN', 'TensorFlow/Keras', 'OpenCV'],
    metrics: '94.2% Validation Accuracy · 4-Class Diagnostic Model',
    githubUrl: undefined,
    demoUrl: undefined,
    icon: 'Cpu',
  },
];

// ─── SECTION 5: EDUCATION ────────────────────────────────────────────────────
export const educationList: EducationItem[] = [
  {
    id: 'edu-be',
    degree: 'B.E. in Computer Science & Engineering',
    institution: 'BNM Institute of Technology',
    location: 'Bengaluru, India',
    period: 'August 2024 to January 2027',
    score: '8.85 / 10',
    scoreLabel: 'CGPA',
    status: 'Pursuing',
  },
  {
    id: 'edu-diploma',
    degree: 'Diploma in Computer Science & Engineering',
    institution: 'Government Polytechnic College',
    location: 'India',
    period: 'January 2021 to June 2024',
    score: '9.6 / 10',
    scoreLabel: 'CGPA',
    status: 'Completed',
  },
];

// ─── SECTION 6: CERTIFICATIONS ───────────────────────────────────────────────
export const certificationsList: CertificationItem[] = [
  {
    id: 'cert-azure-iot',
    name: 'Azure IoT Fundamentals',
    issuer: 'Microsoft',
    icon: 'Cloud',
  },
  {
    id: 'cert-nptel-iot',
    name: 'NPTEL – Introduction to IoT',
    issuer: 'NPTEL / IIT',
    icon: 'Cpu',
  },
  {
    id: 'cert-rpa-uipath',
    name: 'RPA Basics & Introduction to UiPath',
    issuer: 'UiPath',
    icon: 'Bot',
  },
  {
    id: 'cert-cisco-networking',
    name: 'Cisco Network Addressing',
    issuer: 'Cisco',
    icon: 'Network',
  },
];

// ─── SECTION 7: ACHIEVEMENTS ─────────────────────────────────────────────────
export const achievementsList: AchievementItem[] = [
  {
    id: 'ach-sih-winner',
    title: 'Smart India Hackathon 2025 National Winner',
    subtitle: 'Ministry of Education & AICTE, Government of India',
    description:
      'National Winner for the Digital Contact Tracing and Screening Tool for MDR Pathogens in Hospitals.',
    badge: 'National Winner 🏆',
    dateOrEvent: 'SIH 2025',
    icon: 'Trophy',
  },
  {
    id: 'ach-acics-presenter',
    title: 'ACICS 2025 International Conference Research Presenter',
    subtitle: 'International Conference on Advanced Computing & Intelligent Systems',
    description:
      'Presented research on Cotton Leaf Disease Detection using CNN with 94.2% validation accuracy at the ACICS 2025 International Conference.',
    badge: 'Research Presenter 📜',
    dateOrEvent: 'ACICS 2025',
    icon: 'BookOpen',
  },
];

// ─── SECTION 8: CONTACT ──────────────────────────────────────────────────────
export const contactDetails: ContactInfo = {
  email: 'raksha281105@gmail.com',
  phone: '+91 78923 51231',
  location: 'Bengaluru, India',
  github: 'https://github.com/Raksha28112005',
  linkedin: 'https://www.linkedin.com/in/raksha-r-6a8473349/',
  portfolio: 'https://portfolio-plum-rho-60.vercel.app/',
};

