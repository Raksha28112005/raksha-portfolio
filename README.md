# Raksha R — Software Engineer & Cloud Developer Portfolio

[![Vite](https://img.shields.io/badge/Vite-6.0+-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3+-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

An interactive, responsive developer portfolio showcasing software engineering projects, research publications, achievements, and technical expertise of **Raksha R**.

---

## 🌟 Key Features

- **Bidirectional Horizontal Navigation**: Polished left-to-right section transitions with edge controls, floating dock, keyboard shortcuts (`←`, `→`, `Home`, `End`, `1-8`), and mobile touch swipe.
- **Dynamic 3D Particle Visuals**: WebGL interactive node-field scene with automatic 2D fallback for devices without WebGL support and accessibility support for `prefers-reduced-motion`.
- **Authoritative Fact Verification**: Verbatim synchronization with academic and industry credentials (Smart India Hackathon 2025 National Winner, BNMIT B.E. CSE 8.85 CGPA, Govt Polytechnic 9.6 CGPA, ACICS 2025 Conference presenter).
- **Responsive Design**: Audited and optimized across all major breakpoints (`320px`, `375px`, `390px`, `430px`, `768px`, `1024px`, `1440px+`).
- **Centralized Data Architecture**: All portfolio information is cleanly separated into [`src/data/portfolioData.ts`](src/data/portfolioData.ts) for effortless maintenance and extension.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide Icons
- **Graphics & Animation**: Three.js, Canvas 2D fallback
- **Tooling & Build**: Vite, Oxlint, Vitest/Node test runner
- **Deployment**: Vercel & GitHub Actions

---

## 📁 Project Structure

```text
├── public/                  # Static assets (resume.pdf, profile.jpg, favicon.svg)
├── src/
│   ├── components/
│   │   ├── hero/            # Hero section, 3D/2D particle visualizer, styles
│   │   ├── icons/           # Custom SVG brand icons (GitHub, LinkedIn)
│   │   ├── navigation/      # Horizontal transitions & dock controls
│   │   └── sections/        # About, Skills, Experience, Projects, Education,
│   │                        # Achievements & Certifications, Contact, Footer
│   ├── context/             # Navigation state machine and keyboard/touch hooks
│   ├── data/
│   │   └── portfolioData.ts # Centralized authoritative data store
│   ├── types/               # TypeScript data models and navigation types
│   ├── App.tsx              # Root horizontal layout manager
│   ├── main.tsx             # Application entrypoint
│   └── index.css            # Tailwind directives and core animations
├── tests/                   # Automated audit and integrity test suite
└── package.json             # Scripts and dependencies
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

```bash
git clone https://github.com/Raksha28112005/<repo-name>.git
cd <repo-name>
npm install
```

### Development Server

```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### Lint & Automated Tests

```bash
npm run lint
npm test
```

### Production Build

```bash
npm run build
npm run preview
```

---

## 📬 Contact & Profiles

- **Email**: [raksha281105@gmail.com](mailto:raksha281105@gmail.com)
- **GitHub**: [github.com/Raksha28112005](https://github.com/Raksha28112005)
- **LinkedIn**: [linkedin.com/in/raksha-r-6a8473349](https://www.linkedin.com/in/raksha-r-6a8473349/)

---

© 2026 Raksha R. All rights reserved.
