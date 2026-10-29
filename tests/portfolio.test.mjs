import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

test('CHECK 1 — Project Assets & Build files exist', () => {
  const publicDir = path.join(rootDir, 'public');
  assert.ok(fs.existsSync(path.join(publicDir, 'resume.pdf')), 'resume.pdf must exist in public directory');
  assert.ok(fs.existsSync(path.join(publicDir, 'profile.jpg')), 'profile.jpg must exist in public directory');
  assert.ok(fs.existsSync(path.join(publicDir, 'favicon.svg')), 'favicon.svg must exist in public directory');
});

test('CHECK 2 — Authoritative facts in portfolioData.ts match RakshaBNMIT.pdf', () => {
  const dataFilePath = path.join(rootDir, 'src', 'data', 'portfolioData.ts');
  const content = fs.readFileSync(dataFilePath, 'utf8');

  // Personal Info
  assert.match(content, /name:\s*'Raksha R'/, 'Name must be Raksha R');
  assert.match(content, /raksha281105@gmail\.com/, 'Email must be verified');
  assert.match(content, /\+91 78923 51231/, 'Phone must be verified');
  assert.match(content, /Bengaluru,\s*India/, 'Location must be Bengaluru, India');
  assert.match(content, /https:\/\/github\.com\/Raksha28112005/, 'GitHub must be verified profile');
  assert.match(content, /https:\/\/www\.linkedin\.com\/in\/raksha-r-6a8473349\//, 'LinkedIn must be verified profile');

  // Education CGPA
  assert.match(content, /8\.85 \/ 10/, 'BNMIT CGPA must be 8.85 / 10');
  assert.match(content, /9\.6 \/ 10/, 'Polytechnic CGPA must be 9.6 / 10');

  // Internships
  assert.match(content, /Tru Projects/, 'Tru Projects internship must be present');
  assert.match(content, /Robomanthan/, 'Robomanthan internship must be present');

  // Projects
  assert.match(content, /Digital Contact Tracing & Screening Tool for MDR Pathogens/, 'Contact Tracing project must be present');
  assert.match(content, /WhatsApp Digital Forensics Investigation Tool/, 'WhatsApp forensics tool must be present');
  assert.match(content, /DevOps Video-to-Audio Converter/, 'DevOps converter project must be present');
  assert.match(content, /Cotton Leaf Disease Detection/, 'Cotton leaf disease project must be present');
  assert.match(content, /94\.2%/, 'Cotton Leaf Disease validation accuracy must be 94.2%');

  // Certifications
  assert.match(content, /Azure IoT Fundamentals/, 'Azure IoT cert must be present');
  assert.match(content, /NPTEL – Introduction to IoT/, 'NPTEL cert must be present');
  assert.match(content, /RPA Basics & Introduction to UiPath/, 'UiPath cert must be present');
  assert.match(content, /Cisco Network Addressing/, 'Cisco cert must be present');

  // Achievements
  assert.match(content, /Smart India Hackathon 2025 National Winner/, 'SIH 2025 Winner must be present');
  assert.match(content, /ACICS 2025/, 'ACICS 2025 Presenter must be present');
});

test('CHECK 3 — Sections and Horizontal Navigation structure', () => {
  const navFilePath = path.join(rootDir, 'src', 'types', 'navigation.ts');
  const navContent = fs.readFileSync(navFilePath, 'utf8');

  const expectedSections = [
    'home',
    'about',
    'skills',
    'experience',
    'projects',
    'education',
    'achievements',
    'contact',
  ];

  for (const sec of expectedSections) {
    assert.ok(navContent.includes(`id: '${sec}'`), `Section '${sec}' must exist in navigation`);
  }
});
