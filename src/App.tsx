import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import avatarImg from './assets/images/Kalmux-pf.png';
import {
  Terminal,
  ShieldCheck,
  Bug,
  Mail,
  MessageCircle,
  Linkedin,
  Twitter,
  Github,
  ExternalLink,
  Copy,
  Check,
  Search,
  Command,
  Menu,
  X,
  ArrowUpRight,
  ArrowUp,
  Star,
  GitFork,
  Award,
  Trophy,
  Lock,
  Activity,
  ChevronRight,
  Send,
  FolderGit2,
  Radio,
  Briefcase,
} from 'lucide-react';

// ============================================================================
// DATA CONFIGURATION
// ============================================================================

const ROLES = [
  'Cybersecurity Enthusiast',
  'Python Developer',
  'CTF Competitor',
  'Web Developer',
];

const NAV_ITEMS = [
  { id: 'identity', label: 'Identity', index: '01' },
  { id: 'stack', label: 'Stack', index: '02' },
  { id: 'projects', label: 'Projects', index: '03' },
  { id: 'disclosures', label: 'Bugs', index: '04' },
  { id: 'experience', label: 'Journey', index: '05' },
  { id: 'credentials', label: 'Credentials', index: '06' },
  { id: 'contact', label: 'Contact', index: '07' },
];

const CAPABILITY_DOMAINS = [
  {
    id: 'languages',
    code: 'DOM_01',
    title: 'Languages',
    subtitle: 'Core programming & scripting syntax',
    accent: 'amber',
    items: [
      { name: 'Python', role: 'Primary · Automation & Security', tag: 'CORE' },
      { name: 'TypeScript & JavaScript', role: 'Full-Stack Web Engineering', tag: 'WEB' },
      { name: 'Bash / Shell', role: 'Linux & Recon Scripting', tag: 'OPS' },
      { name: 'HTML5 & CSS3', role: 'Responsive & Tactical UI', tag: 'UI' },
      { name: 'SQL', role: 'Data Modeling & Queries', tag: 'DATA' },
    ],
  },
  {
    id: 'cybersecurity',
    code: 'DOM_02',
    title: 'Cybersecurity & Offensive',
    subtitle: 'Reconnaissance, auditing & exploitation',
    accent: 'emerald',
    items: [
      { name: 'Burp Suite Pro', role: 'Web App Interception & Testing', tag: 'APPSEC' },
      { name: 'Subdomain & OSINT Recon', role: 'Attack Surface Mapping', tag: 'RECON' },
      { name: 'CORS Auditing', role: 'Misconfiguration Validation', tag: 'WEBSEC' },
      { name: 'Network Pentesting', role: 'Enumeration & Vulnerability Analysis', tag: 'NETSEC' },
      { name: 'Vulnerability Tracking', role: 'Structured Reporting Workflows', tag: 'OPS' },
      { name: 'CTF Exploitation', role: 'Web, OSINT & Scripting Challenges', tag: 'CTF' },
    ],
  },
  {
    id: 'web',
    code: 'DOM_03',
    title: 'Web & Engineering',
    subtitle: 'Modern interfaces, APIs & DevOps',
    accent: 'cyan',
    items: [
      { name: 'React 18', role: 'Component Architecture & Hooks', tag: 'FRONTEND' },
      { name: 'Vite', role: 'Fast Build & Bundling Pipeline', tag: 'BUILD' },
      { name: 'Tailwind CSS', role: 'Utility-First Design Systems', tag: 'STYLING' },
      { name: 'Node.js', role: 'Runtime & Backend Tooling', tag: 'BACKEND' },
      { name: 'REST APIs', role: 'Integration & Endpoint Design', tag: 'API' },
      { name: 'Git & GitHub Actions', role: 'CI/CD & Version Control', tag: 'DEVOPS' },
      { name: 'CLI Tooling', role: 'Ergonomic Terminal Utilities', tag: 'CLI' },
      { name: 'Linux Administration', role: 'Shell Environments & Hardening', tag: 'SYS' },
    ],
  },
];

const TELEMETRY_MATRIX = [
  {
    domain: 'RECON & OSINT',
    code: 'REC-01',
    cells: [3, 3, 2, 3, 3, 2, 3, 3],
    note: 'SUBNORYX, FUZZY, PhoneOsint, Passive/Active Enum',
  },
  {
    domain: 'WEB ENGINEERING',
    code: 'WEB-02',
    cells: [2, 3, 3, 3, 2, 3, 3, 3],
    note: 'Kalcy, JC-WMS, GMS, React + TS Systems',
  },
  {
    domain: 'AUTOMATION & CLI',
    code: 'AUT-03',
    cells: [3, 2, 3, 3, 3, 3, 2, 3],
    note: 'Python Tooling, Huntmate, CORS-POC',
  },
  {
    domain: 'LINUX & HARDENING',
    code: 'SYS-04',
    cells: [3, 3, 3, 2, 3, 3, 3, 2],
    note: 'Anon-Mac, dev-details, Shell Pipelines',
  },
];

const PROJECTS = [
  // Web Apps
  {
    id: 'kalcy',
    name: 'kalcy',
    repo: 'kalcy',
    category: 'Web Apps',
    status: 'DEPLOYED',
    description:
      'Fast, modern web-based personal finance and utility PWA built with a clean, responsive interface.',
    stack: ['React', 'TypeScript', 'Tailwind'],
    stars: 4,
    forks: 1,
    accent: 'cyan',
  },
  {
    id: 'JC-WMS',
    name: 'JC-WMS',
    repo: 'JC-WMS',
    category: 'Web Apps',
    status: 'PRODUCTION',
    description:
      'Warehouse & Workflow Management System web application for tracking inventory, records, and operations.',
    stack: ['React', 'Web App', 'Dashboard'],
    stars: 5,
    forks: 1,
    accent: 'cyan',
  },
  {
    id: 'GMS',
    name: 'GMS',
    repo: 'GMS',
    category: 'Web Apps',
    status: 'ACTIVE',
    description:
      'Garage Management System PWA designed for spare parts inventory, barcode POS billing, and service tracking.',
    stack: ['React', 'TypeScript', 'Firebase'],
    stars: 4,
    forks: 0,
    accent: 'cyan',
  },
  // Cybersecurity
  {
    id: 'SUBNORYX',
    name: 'SUBNORYX',
    repo: 'SUBNORYX',
    category: 'Cybersecurity',
    status: 'ACTIVE',
    description:
      'Asynchronous Python subdomain enumeration and reconnaissance engine with DNS resolution, HTTP probing, and safe-harbor headers.',
    stack: ['Python', 'Recon', 'OSINT'],
    stars: 9,
    forks: 2,
    accent: 'emerald',
  },
  {
    id: 'FUZZY',
    name: 'FUZZY',
    repo: 'FUZZY',
    category: 'Cybersecurity',
    status: 'ACTIVE',
    description:
      'Multi-domain subdomain reconnaissance wrapper combining Puredns and ffuf for high-speed batch fuzzing across scope lists.',
    stack: ['Shell', 'Fuzzing', 'Recon'],
    stars: 4,
    forks: 1,
    accent: 'emerald',
  },
  {
    id: 'CORS-POC',
    name: 'CORS-POC',
    repo: 'CORS-POC',
    category: 'Cybersecurity',
    status: 'VERIFIED',
    description:
      'Proof-of-concept tooling for identifying and validating unsafe CORS configurations.',
    stack: ['Python', 'Security'],
    stars: 6,
    forks: 1,
    accent: 'emerald',
  },
  {
    id: 'Huntmate',
    name: 'Huntmate',
    repo: 'Huntmate',
    category: 'Cybersecurity',
    status: 'ACTIVE',
    description:
      'Security testing companion CLI for organizing findings and vulnerability tracking.',
    stack: ['Python', 'CLI'],
    stars: 3,
    forks: 1,
    accent: 'emerald',
  },
  {
    id: 'PhoneOsint',
    name: 'PhoneOsint',
    repo: 'PhoneOsint',
    category: 'Cybersecurity',
    status: 'VERIFIED',
    description:
      'Focused Bash toolkit for fast, ethical phone number OSINT reconnaissance.',
    stack: ['Shell', 'OSINT'],
    stars: 8,
    forks: 2,
    accent: 'emerald',
  },
  {
    id: 'BurpSuite-Pro',
    name: 'BurpSuite-Pro',
    repo: 'BurpSuite-Pro',
    category: 'Cybersecurity',
    status: 'REFERENCE',
    description:
      'Practical reference pack and workflow documentation for Burp Suite Professional 2024.',
    stack: ['Burp Suite', 'Docs'],
    stars: 5,
    forks: 1,
    accent: 'emerald',
  },
  {
    id: 'Anon-Mac',
    name: 'Anon-Mac',
    repo: 'Anon-Mac',
    category: 'Cybersecurity',
    status: 'UTILITY',
    description:
      'MAC address changer wrapped with a three-layer encryption workflow for Linux privacy.',
    stack: ['Shell', 'Linux'],
    stars: 3,
    forks: 0,
    accent: 'emerald',
  },
  // Tools & CLI
  {
    id: 'dev-details',
    name: 'dev-details',
    repo: 'dev-details',
    category: 'Tools & CLI',
    status: 'UTILITY',
    description:
      'Lightweight system information script for clean, useful Linux environment snapshots.',
    stack: ['Shell', 'Linux'],
    stars: 2,
    forks: 0,
    accent: 'amber',
  },
];

const PROJECT_CATEGORIES = ['All', 'Web Apps', 'Cybersecurity', 'Tools & CLI'];

interface BugReportEntry {
  id: string;
  organization: string;
  domain: string;
  program: string;
  status: string;
  sector: string;
  url: string;
  logoType: 'georgia-gov' | 'custom';
  logoUrl?: string;
}

const BUGS_REPORTED: BugReportEntry[] = [
  {
    id: 'georgia-gov',
    organization: 'Georgia Government',
    domain: 'georgia.gov',
    program: 'State of Georgia VDP',
    status: 'REPORTED',
    sector: 'PUBLIC SECTOR // US STATE GOV',
    url: 'https://gta.georgia.gov/cybersecurity-1/governance-risk-and-compliance/vulnerability-disclosure-program',
    logoType: 'georgia-gov',
  },
];

const WORK_EXPERIENCE = [
  {
    id: 'shadowfox-ambassador',
    role: 'Campus Ambassador',
    company: 'ShadowFox',
    type: 'Full-time · Remote',
    period: 'Aug 2024 – Present',
    status: 'ACTIVE',
    summary:
      'Promoting cybersecurity initiatives, organizing campus tech events, and connecting peers with internship opportunities and industry mentors.',
    skills: ['Leadership', 'Community', 'Networking'],
    highlight: '2+ yrs tenure · Referral Code SFNIJA10',
    accent: 'emerald',
  },
  {
    id: 'pinnacle-intern',
    role: 'Cyber Security Intern',
    company: 'Pinnacle Labs',
    type: 'Internship · Remote',
    period: 'Oct 2024',
    status: 'COMPLETED',
    summary:
      'Conducted web application VAPT and built custom Python utilities for keystroke monitoring, image encryption, and password strength auditing.',
    skills: ['Python', 'VAPT', 'Security Tooling'],
    highlight: null,
    accent: 'cyan',
  },
  {
    id: 'prodigy-intern',
    role: 'Cyber Security Intern',
    company: 'Prodigy InfoTech',
    type: 'Internship · Remote',
    period: 'Sep 2024',
    status: 'COMPLETED',
    summary:
      'Engineered GUI-driven Python security applications for encryption, password strength analysis, keylogging, and network packet inspection.',
    skills: ['Python', 'Network Security', 'Packet Analysis'],
    highlight: 'Awarded Letter of Recommendation',
    accent: 'amber',
  },
  {
    id: 'shadowfox-cyber',
    role: 'Cyber Security Intern',
    company: 'ShadowFox',
    type: 'Internship · Remote',
    period: 'Aug 2024',
    status: 'COMPLETED',
    summary:
      'Executed vulnerability assessments, drafted structured security reports, and collaborated on practical cyber defense workflows.',
    skills: ['Vulnerability Assessment', 'Report Writing', 'Cyber Defense'],
    highlight: null,
    accent: 'cyan',
  },
  {
    id: 'mastercard-forage',
    role: 'Cybersecurity Experience Program',
    company: 'Mastercard (Forage)',
    type: 'Job Simulation · Remote',
    period: 'Aug 2024',
    status: 'COMPLETED',
    summary:
      'Simulated Security Awareness team operations—identifying phishing vectors and designing targeted security awareness training modules.',
    skills: ['Phishing Analysis', 'Security Awareness', 'Data Presentation'],
    highlight: null,
    accent: 'amber',
  },
  {
    id: 'shadowfox-python',
    role: 'Python Developer Intern',
    company: 'ShadowFox',
    type: 'Internship · Remote',
    period: 'Jun 2024',
    status: 'COMPLETED',
    summary:
      'Developed Python automation scripts and AI-driven workflow prototypes in a collaborative engineering environment.',
    skills: ['Python', 'Automation', 'AI'],
    highlight: null,
    accent: 'cyan',
  },
  {
    id: 'cfcs2r-intern',
    role: 'Cyber Security Intern',
    company: 'Center for Cyber Security Studies & Research (CFCS2R)',
    type: 'Internship · Remote',
    period: 'Apr 2024 – Jun 2024',
    status: 'COMPLETED',
    summary:
      'Completed a 3-month research-focused cybersecurity internship covering Linux administration, defensive security strategies, and threat analysis.',
    skills: ['Linux', 'Cyber Defense', 'Security Research'],
    highlight: '3-month research track',
    accent: 'emerald',
  },
];

const ACHIEVEMENTS = [
  {
    id: 'thm',
    badge: 'GLOBAL RANKING',
    title: 'TryHackMe Top 5% Global Ranking',
    detail:
      'Consistent hands-on execution across real-world offensive and defensive security labs, privilege escalation, and network defense.',
    metric: 'TOP 5%',
    accent: 'emerald',
  },
  {
    id: 'gov-vdp',
    badge: 'RESPONSIBLE DISCLOSURE',
    title: 'US State Government VDP Disclosure',
    detail:
      'Identified and responsibly reported a security vulnerability to the Georgia Government Vulnerability Disclosure Program.',
    metric: 'GA.GOV VDP',
    accent: 'emerald',
  },
  {
    id: 'ctf',
    badge: 'COMPETITIVE OPS',
    title: 'Active CTF Competitor',
    detail:
      'Competing across Web Exploitation, OSINT, and Python Scripting challenges under timed conditions.',
    metric: 'CTF OPS',
    accent: 'amber',
  },
  {
    id: 'oss',
    badge: 'OPEN SOURCE',
    title: 'Open-Source Security & Web Builder',
    detail:
      'Building and maintaining practical recon scripts, CLI utilities, and full-stack operational web apps for the community.',
    metric: '11 REPOS',
    accent: 'cyan',
  },
  {
    id: 'lor-ambassador',
    badge: 'LEADERSHIP & MERIT',
    title: 'Letter of Recommendation & Campus Lead',
    detail:
      'Awarded a Letter of Recommendation at Prodigy InfoTech for Python security tooling, and serving 2+ years as ShadowFox Campus Ambassador.',
    metric: 'LOR · LEAD',
    accent: 'amber',
  },
];

const CERTIFICATIONS = [
  {
    year: '2024',
    code: 'CEHPT',
    title: 'Certified Ethical Hacker & Penetration Tester',
    issuer: 'NextCode Agency',
    hash: 'SEP-2024',
  },
  {
    year: '2024',
    code: 'CDWS',
    title: 'Certified Deep Web Security',
    issuer: 'NextCode Agency',
    hash: 'SEP-2024',
  },
  {
    year: '2024',
    code: 'CNSP',
    title: 'Certified Network Security Practitioner',
    issuer: 'The SecOps Group',
    hash: 'ID:8845583',
  },
  {
    year: '2024',
    code: 'IBM',
    title: 'Cybersecurity Fundamentals',
    issuer: 'IBM',
    hash: 'JUN-2024',
  },
  {
    year: '2024',
    code: 'EHE',
    title: 'Ethical Hacking Essentials',
    issuer: 'EC-Council',
    hash: 'ID:282938',
  },
  {
    year: '2024',
    code: 'DFE',
    title: 'Digital Forensics Essentials',
    issuer: 'EC-Council',
    hash: 'ID:288109',
  },
  {
    year: '2023',
    code: 'GCP-SEC',
    title: 'Understanding Google Cloud Security and Operations',
    issuer: 'Google',
    hash: 'ID:6389361',
  },
];

const SOCIAL_HANDLES = [
  {
    id: 'github',
    platform: 'GitHub',
    handle: '@kalmux1',
    url: 'https://github.com/kalmux1',
    copyValue: 'https://github.com/kalmux1',
    meta: 'Code & Security Repos',
    icon: Github,
    accent: 'cyan',
  },
  {
    id: 'discord',
    platform: 'Discord',
    handle: 'ID: 1170942026922082390',
    url: 'https://discord.com/users/1170942026922082390',
    copyValue: '1170942026922082390',
    meta: 'Direct Comms & CTF',
    icon: MessageCircle,
    accent: 'emerald',
  },
  {
    id: 'tryhackme',
    platform: 'TryHackMe',
    handle: 'tryhackme.com/p/kalmux',
    url: 'https://tryhackme.com/p/kalmux',
    copyValue: 'https://tryhackme.com/p/kalmux',
    meta: 'Top 5% Global Profile',
    icon: Terminal,
    accent: 'amber',
  },
  {
    id: 'email',
    platform: 'Email',
    handle: 'kal.mux.cyber@gmail.com',
    url: 'mailto:kal.mux.cyber@gmail.com',
    copyValue: 'kal.mux.cyber@gmail.com',
    meta: 'Direct Encrypted Inbox',
    icon: Mail,
    accent: 'cyan',
  },
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    handle: 'in/nitin-jaiswal1',
    url: 'https://www.linkedin.com/in/nitin-jaiswal1/',
    copyValue: 'https://www.linkedin.com/in/nitin-jaiswal1/',
    meta: 'Professional Network',
    icon: Linkedin,
    accent: 'amber',
  },
  {
    id: 'x',
    platform: 'X / Twitter',
    handle: '@kalmux1',
    url: 'https://x.com/kalmux1',
    copyValue: 'https://x.com/kalmux1',
    meta: 'Security Notes & Updates',
    icon: Twitter,
    accent: 'emerald',
  },
];

// ============================================================================
// UTILITIES & ERROR BOUNDARY
// ============================================================================

async function copyTextSafely(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fallback below
  }
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

class PortfolioErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#080B0E] text-[#E5ECEA] flex items-center justify-center p-6 font-mono">
          <div className="max-w-md w-full border border-amber-500/40 bg-[#0F1419] p-6">
            <p className="text-amber-400 text-xs tracking-widest uppercase mb-2">
              [SYS_FAULT // RECOVERABLE]
            </p>
            <h1 className="text-lg font-semibold mb-2">HUD Render Interrupted</h1>
            <p className="text-sm text-slate-400 mb-4">
              An unexpected runtime error occurred. Reload to reinitialize telemetry.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-amber-500 text-[#080B0E] text-xs font-semibold uppercase tracking-wider hover:bg-amber-400 transition-colors"
            >
              Reinitialize HUD
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

function CornerBrackets({ color = 'amber' }: { color?: string }) {
  const strokeClass =
    color === 'cyan'
      ? 'border-cyan-400/60'
      : color === 'emerald'
      ? 'border-emerald-400/60'
      : 'border-amber-500/60';
  return (
    <>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-0 left-0 w-2.5 h-2.5 border-t border-l ${strokeClass}`}
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-0 right-0 w-2.5 h-2.5 border-t border-r ${strokeClass}`}
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l ${strokeClass}`}
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r ${strokeClass}`}
      />
    </>
  );
}

/**
 * Clean inline SVG emblem for State of Georgia (Georgia.gov)
 */
function GeorgiaGovLogo() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="w-9 h-9 flex-shrink-0"
      role="img"
      aria-label="Georgia Government emblem"
    >
      {/* Official seal outer ring */}
      <circle
        cx="24"
        cy="24"
        r="22"
        fill="#0B192C"
        stroke="#F59E0B"
        strokeWidth="1.5"
      />
      <circle
        cx="24"
        cy="24"
        r="18.5"
        fill="none"
        stroke="#38BDF8"
        strokeOpacity="0.35"
        strokeDasharray="2 2"
        strokeWidth="1"
      />
      {/* Capitol dome & arch pillars (inspired by Georgia State Seal) */}
      <path
        d="M15 31h18v2.5H15z"
        fill="#F59E0B"
      />
      <path
        d="M17.5 21h2.2v9.5h-2.2zM22.9 21h2.2v9.5h-2.2zM28.3 21h2.2v9.5h-2.2z"
        fill="#E2E8F0"
      />
      <path
        d="M16 20.5C16 15.5 19.6 13 24 13s8 2.5 8 7.5H16z"
        fill="none"
        stroke="#F59E0B"
        strokeWidth="1.8"
      />
      <circle cx="24" cy="11" r="1.4" fill="#F59E0B" />
      <text
        x="24"
        y="40.5"
        textAnchor="middle"
        fill="#94A3B8"
        fontSize="5.5"
        fontFamily="monospace"
        fontWeight="700"
        letterSpacing="1"
      >
        GA.GOV
      </text>
    </svg>
  );
}

function RadarSweep({ size = 56 }: { size?: number }) {
  return (
    <div
      className="relative flex-shrink-0 flex items-center justify-center rounded-full border border-emerald-400/25 bg-[#080B0E]/90 overflow-hidden"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="radarSweepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00FF94" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#00FF94" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(16,185,129,0.22)" strokeWidth="1" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(16,185,129,0.18)" strokeWidth="1" />
        <circle cx="50" cy="50" r="14" fill="none" stroke="rgba(16,185,129,0.18)" strokeWidth="1" />
        <line x1="50" y1="4" x2="50" y2="96" stroke="rgba(16,185,129,0.16)" strokeWidth="1" />
        <line x1="4" y1="50" x2="96" y2="50" stroke="rgba(16,185,129,0.16)" strokeWidth="1" />
        <g className="hud-radar-spin" style={{ transformOrigin: '50px 50px' }}>
          <path d="M50,50 L50,4 A46,46 0 0,1 90,28 Z" fill="url(#radarSweepGrad)" />
          <line x1="50" y1="50" x2="50" y2="4" stroke="#00FF94" strokeWidth="1.5" />
        </g>
        <circle cx="68" cy="30" r="2.5" fill="#F59E0B" className="animate-pulse" />
        <circle cx="34" cy="64" r="2" fill="#00E5FF" />
        <circle cx="50" cy="50" r="2.2" fill="#00FF94" />
      </svg>
    </div>
  );
}

function Interactive3DPortrait() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    active: false,
  });

  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 18;
    const rotateX = (0.5 - y) * 16;
    setTilt({
      rotateX,
      rotateY,
      glareX: x * 100,
      glareY: y * 100,
      active: true,
    });
  };

  const handlePointerLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, active: false });
  };

  return (
    <div className="relative w-full max-w-[440px] mx-auto" style={{ perspective: '1100px' }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-4 sm:-inset-6 rounded-full border border-cyan-400/15 hud-orbit-slow"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1 sm:-inset-2 rounded-full border border-amber-500/15 hud-orbit-reverse"
      />

      <div
        ref={cardRef}
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
        className="relative rounded-sm border border-white/10 bg-[#0F1419] p-2.5 sm:p-3 shadow-[0_24px_70px_rgba(0,0,0,0.65)] transition-transform duration-200 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        }}
      >
        <CornerBrackets color="amber" />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-200"
          style={{
            background: tilt.active
              ? `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(0,229,255,0.22), rgba(245,158,11,0.08) 40%, transparent 72%)`
              : 'radial-gradient(circle at 20% 20%, rgba(255,46,77,0.14), transparent 55%), radial-gradient(circle at 85% 80%, rgba(0,229,255,0.14), transparent 55%)',
          }}
        />

        <div
          className="absolute -top-3 right-3 z-20 flex items-center gap-2 border border-cyan-400/40 bg-[#080B0E]/95 px-2.5 py-1.5 font-mono text-[10px] tracking-wider text-cyan-300 shadow-lg"
          style={{ transform: 'translateZ(34px)' }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#00FF94] shadow-[0_0_8px_#00FF94]" />
          <span>SYS_INIT // 0x7F</span>
        </div>

        <div
          className="absolute bottom-14 -left-2 sm:-left-4 z-20 border-l-2 border-emerald-400 bg-[#080B0E]/95 px-3 py-1.5 font-mono shadow-lg border border-white/10"
          style={{ transform: 'translateZ(42px)' }}
        >
          <p className="text-[10px] tracking-widest text-emerald-400 uppercase">IDENTITY</p>
          <p className="text-[11px] text-slate-200 font-medium">VERIFIED · ROOT</p>
        </div>

        <div className="relative aspect-[4/4.4] w-full overflow-hidden border border-white/10 bg-[#080B0E]">
          <img
            src={avatarImg}
            alt="Kalmux 3D portrait"
            className="w-full h-full object-cover object-center transition-transform duration-300"
            style={{
              transform: tilt.active ? 'scale(1.04)' : 'scale(1)',
            }}
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#080B0E] via-[#080B0E]/55 to-transparent"
          />

          <div className="absolute bottom-3 left-3 right-3 z-10 flex items-end justify-between gap-2">
            <div>
              <p className="font-mono text-[10px] tracking-[0.18em] text-amber-400 uppercase">
                /// OPERATOR_01
              </p>
              <p className="font-mono text-xs sm:text-sm font-semibold text-white tracking-wider">
                KALMUX · SECOPS
              </p>
            </div>
            <span className="font-mono text-[10px] px-2 py-0.5 border border-cyan-400/30 bg-cyan-500/10 text-cyan-300">
              3D TILT HUD
            </span>
          </div>
        </div>

        <div
          className="mt-2.5 flex items-center justify-between gap-3 border border-emerald-500/25 bg-[#080B0E]/90 px-3 py-2.5"
          style={{ transform: 'translateZ(24px)' }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <RadarSweep size={46} />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[10px] tracking-widest text-emerald-400 uppercase">
                  TRYHACKME TELEMETRY
                </span>
              </div>
              <p className="text-sm font-semibold text-white truncate">
                Top 5% Global Ranking
              </p>
              <p className="font-mono text-[10px] text-slate-400 truncate">
                ACTIVE LABS · OFFENSIVE &amp; DEFENSIVE
              </p>
            </div>
          </div>
          <a
            href="https://tryhackme.com/p/kalmux"
            target="_blank"
            rel="noreferrer"
            className="flex-shrink-0 p-2 border border-white/10 text-slate-300 hover:border-emerald-400/50 hover:text-emerald-300 transition-colors"
            aria-label="Open TryHackMe profile"
          >
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
  onSelectCategory: (cat: string) => void;
  onCopy: (text: string, label: string) => void;
}

function CommandPalette({
  isOpen,
  onClose,
  onNavigate,
  onSelectCategory,
  onCopy,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      const t = window.setTimeout(() => inputRef.current?.focus(), 30);
      return () => window.clearTimeout(t);
    }
  }, [isOpen]);

  const actions = useMemo(() => {
    const base = [
      ...NAV_ITEMS.map((n) => ({
        id: `nav-${n.id}`,
        group: 'Navigation',
        label: `Jump to ${n.label}`,
        hint: `#${n.id}`,
        run: () => onNavigate(n.id),
      })),
      ...PROJECT_CATEGORIES.map((cat) => ({
        id: `cat-${cat}`,
        group: 'Filter Projects',
        label: `Show ${cat} projects`,
        hint: 'FILTER',
        run: () => {
          onSelectCategory(cat);
          onNavigate('projects');
        },
      })),
      ...PROJECTS.map((p) => ({
        id: `proj-${p.id}`,
        group: 'Repositories',
        label: `${p.name} — ${p.category}`,
        hint: 'GITHUB ↗',
        run: () =>
          window.open(`https://github.com/kalmux1/${p.repo}`, '_blank', 'noopener,noreferrer'),
      })),
      {
        id: 'copy-email',
        group: 'Quick Comms',
        label: 'Copy Email (kal.mux.cyber@gmail.com)',
        hint: 'COPY',
        run: () => onCopy('kal.mux.cyber@gmail.com', 'Email copied to clipboard'),
      },
      {
        id: 'copy-discord',
        group: 'Quick Comms',
        label: 'Copy Discord ID (1170942026922082390)',
        hint: 'COPY',
        run: () => onCopy('1170942026922082390', 'Discord ID copied to clipboard'),
      },
    ];

    const q = query.trim().toLowerCase();
    if (!q) return base.slice(0, 12);
    return base.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q) ||
        item.hint.toLowerCase().includes(q)
    );
  }, [query, onNavigate, onSelectCategory, onCopy]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/75 backdrop-blur-sm p-4 pt-[12vh]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        className="relative w-full max-w-xl border border-amber-500/35 bg-[#0F1419] shadow-[0_24px_80px_rgba(0,0,0,0.85)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <CornerBrackets color="amber" />
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
          <Search className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, project name, or section..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none font-mono"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white"
            aria-label="Close command palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-[55vh] overflow-y-auto divide-y divide-white/5">
          {actions.length === 0 ? (
            <div className="px-4 py-8 text-center font-mono text-xs text-slate-500">
              NO MATCHING COMMANDS FOUND FOR &quot;{query}&quot;
            </div>
          ) : (
            actions.map((action) => (
              <button
                key={action.id}
                type="button"
                onClick={() => {
                  action.run();
                  onClose();
                }}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-amber-500/10 transition-colors group"
              >
                <div className="min-w-0">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500 block">
                    {action.group}
                  </span>
                  <span className="text-sm text-slate-200 group-hover:text-amber-300 transition-colors truncate block">
                    {action.label}
                  </span>
                </div>
                <span className="flex-shrink-0 font-mono text-[10px] px-2 py-0.5 border border-white/10 text-slate-400 group-hover:border-amber-500/40 group-hover:text-amber-300">
                  {action.hint}
                </span>
              </button>
            ))
          )}
        </div>

        <div className="flex items-center justify-between border-t border-white/10 bg-[#080B0E] px-4 py-2 font-mono text-[10px] text-slate-500">
          <span>SELECT TO EXECUTE</span>
          <span>ESC TO CLOSE</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN APPLICATION
// ============================================================================

function PortfolioContent() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const [utcTime, setUtcTime] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);

  const [activeDomain, setActiveDomain] = useState('all');
  const [projectCategory, setProjectCategory] = useState('All');
  const [projectSearch, setProjectSearch] = useState('');

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toast, setToast] = useState('');
  const toastTimerRef = useRef<number | undefined>(undefined);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'Security / Collaboration',
    message: '',
  });
  const [commsFeedback, setCommsFeedback] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setUtcTime(now.toISOString().slice(11, 19) + ' UTC');
    };
    updateClock();
    const interval = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timeoutId: number;

    if (!isDeleting && typedRole === currentRole) {
      timeoutId = window.setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && typedRole === '') {
      timeoutId = window.setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }, 260);
    } else {
      const speed = isDeleting ? 40 : 85;
      timeoutId = window.setTimeout(() => {
        const nextText = isDeleting
          ? currentRole.slice(0, typedRole.length - 1)
          : currentRole.slice(0, typedRole.length + 1);
        setTypedRole(nextText);
      }, speed);
    }

    return () => window.clearTimeout(timeoutId);
  }, [roleIndex, typedRole, isDeleting]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setCmdOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const triggerToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(''), 2400);
  }, []);

  const handleCopy = useCallback(
    async (text: string, label?: string, keyId: string | null = null) => {
      const ok = await copyTextSafely(text);
      if (ok) {
        if (keyId) {
          setCopiedId(keyId);
          window.setTimeout(
            () => setCopiedId((curr) => (curr === keyId ? null : curr)),
            1800
          );
        }
        triggerToast(label || 'Copied to clipboard');
      }
    },
    [triggerToast]
  );

  const scrollToSection = useCallback((id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const visibleDomains = useMemo(() => {
    if (activeDomain === 'all') return CAPABILITY_DOMAINS;
    return CAPABILITY_DOMAINS.filter((d) => d.id === activeDomain);
  }, [activeDomain]);

  const visibleProjects = useMemo(() => {
    const q = projectSearch.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      const matchesCat = projectCategory === 'All' || p.category === projectCategory;
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.stack.some((s) => s.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [projectCategory, projectSearch]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: PROJECTS.length };
    PROJECTS.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  const buildMessagePayload = () => {
    const name = formState.name.trim() || 'Visitor';
    const email = formState.email.trim() || 'Not provided';
    const subject = `[Kalmux Portfolio] ${formState.subject} — from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\nCategory: ${formState.subject}\n\nMessage:\n${formState.message.trim()}`;
    return { subject, body };
  };

  const handleMailtoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { subject, body } = buildMessagePayload();
    const mailtoUrl = `mailto:kal.mux.cyber@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    setCommsFeedback('Default mail client launched. Transmission ready.');
    triggerToast('Opening default mail client...');
  };

  const handleGmailCompose = () => {
    if (!formState.name.trim() || !formState.message.trim()) {
      setCommsFeedback('Please enter at least your name and message before composing.');
      return;
    }
    const { subject, body } = buildMessagePayload();
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=kal.mux.cyber@gmail.com&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    setCommsFeedback('Gmail compose window opened in a new tab.');
    triggerToast('Gmail compose opened');
  };

  return (
    <div className="min-h-screen bg-[#080B0E] text-[#E6ECEB] selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden relative">
      <style>{`
        .font-mono { font-family: 'DM Mono', ui-monospace, SFMono-Regular, monospace; }
        .hud-grid-bg {
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.032) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.032) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .hud-scanlines {
          background-image: repeating-linear-gradient(
            0deg,
            transparent 0px,
            transparent 2px,
            rgba(255, 255, 255, 0.025) 3px
          );
        }
        @keyframes radarSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbitSlow {
          from { transform: rotate(0deg) scale(1); }
          to { transform: rotate(360deg) scale(1); }
        }
        @keyframes orbitReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .hud-radar-spin { animation: radarSpin 4s linear infinite; }
        .hud-orbit-slow { animation: orbitSlow 28s linear infinite; }
        .hud-orbit-reverse { animation: orbitReverse 38s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hud-radar-spin, .hud-orbit-slow, .hud-orbit-reverse { animation: none !important; }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 hud-grid-bg opacity-80"
        style={{
          maskImage: 'radial-gradient(circle at 50% 25%, #000 35%, transparent 90%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 hud-scanlines z-10 opacity-60"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 right-0 w-[34rem] h-[34rem] rounded-full bg-amber-500/[0.04] blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-0 left-0 w-[32rem] h-[32rem] rounded-full bg-cyan-500/[0.04] blur-[120px]"
      />

      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#080B0E]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-4 min-w-0">
            <a
              href="#identity"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('identity');
              }}
              className="inline-flex items-center gap-2.5 font-mono text-sm font-semibold tracking-[0.18em] text-white hover:text-amber-400 transition-colors"
            >
              <span className="grid place-items-center w-7 h-7 bg-amber-500 text-[#080B0E] font-bold text-base">
                K
              </span>
              <span className="truncate">
                / KALMUX<span className="text-amber-400 animate-pulse">_</span>
              </span>
            </a>

            <div className="hidden xl:flex items-center gap-2.5 border border-white/[0.08] bg-[#0F1419] px-3 py-1 font-mono text-[11px] text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00FF94] shadow-[0_0_8px_#00FF94]" />
              <span>SYS_INIT: 0x7F</span>
              <span className="text-white/20">|</span>
              <span className="text-emerald-400">ONLINE</span>
              <span className="text-white/20">|</span>
              <span className="text-slate-300 tabular-nums">{utcTime || 'SYNCING...'}</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Primary navigation">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="px-2.5 py-2 font-mono text-xs text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1.5"
              >
                <span className="text-[10px] text-amber-500/70">{item.index}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCmdOpen(true)}
              className="inline-flex items-center gap-2 border border-amber-500/30 bg-[#0F1419] px-3 py-1.5 font-mono text-xs text-slate-200 hover:border-amber-400 hover:text-amber-300 transition-colors"
              aria-label="Open command palette"
            >
              <Command className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">CMD</span>
              <kbd className="text-[10px] px-1.5 py-0.5 bg-white/5 border border-white/10 text-amber-300">
                ⌘K
              </kbd>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 border border-white/10 bg-[#0F1419] text-slate-200 hover:border-amber-500/50 hover:text-amber-400 transition-colors"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#0F1419] px-4 py-4 space-y-2">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10 font-mono text-[11px] text-slate-400">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00FF94]" />
                SYS_INIT: 0x7F / ONLINE
              </span>
              <span className="tabular-nums text-slate-300">{utcTime}</span>
            </div>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="w-full flex items-center justify-between px-3 py-3 border border-white/[0.06] bg-[#080B0E]/70 font-mono text-xs text-slate-200 hover:border-amber-500/40 hover:text-amber-300 transition-colors"
              >
                <span>
                  <span className="text-amber-500 mr-2">{item.index} /</span>
                  {item.label}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
            ))}
          </div>
        )}
      </header>

      {/* MAIN */}
      <main className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION 1: HERO */}
        <section
          id="identity"
          className="scroll-mt-20 pt-10 pb-16 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
        >
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 border border-emerald-500/25 bg-emerald-500/[0.06] px-3 py-1.5 font-mono text-[11px] tracking-widest text-emerald-300 uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF94] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF94]" />
              </span>
              <span>AVAILABLE FOR INTERESTING PROBLEMS</span>
            </div>

            <p className="font-mono text-xs tracking-[0.2em] text-amber-400 uppercase">
              / identity.boot
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] font-bold tracking-[-0.04em] leading-[1.02] text-white">
              Breaking things{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
                ethically.
              </span>
              <br />
              Building things{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-400">
                securely.
              </span>
            </h1>

            <div className="flex items-center gap-3 border-l-2 border-amber-500 bg-[#0F1419]/90 px-4 py-3 font-mono text-sm sm:text-base max-w-xl border border-white/[0.08]">
              <span className="text-amber-400 select-none">$ role --active</span>
              <span className="text-white font-medium min-h-[1.5rem]">
                {typedRole}
                <span className="inline-block w-2 h-4 ml-1 align-middle bg-cyan-400 animate-pulse" />
              </span>
            </div>

            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl">
              I&apos;m <strong className="text-white font-semibold">Kalmux</strong> — a cybersecurity
              enthusiast, Python developer, CTF competitor, and web developer. I dissect systems to
              uncover edge cases, automate offensive recon, and engineer fast, resilient web
              applications.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => scrollToSection('projects')}
                className="inline-flex items-center gap-2 bg-amber-500 text-[#080B0E] px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider hover:bg-amber-400 transition-colors"
              >
                <FolderGit2 className="w-4 h-4" />
                <span>Explore Projects</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center gap-2 border border-white/15 bg-[#0F1419] text-slate-200 px-5 py-3 font-mono text-xs font-medium uppercase tracking-wider hover:border-cyan-400/60 hover:text-cyan-300 transition-colors"
              >
                <Radio className="w-4 h-4 text-cyan-400" />
                <span>Connect / Comms</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 max-w-lg">
              <div className="border border-white/[0.08] bg-[#0F1419]/80 p-3">
                <p className="font-mono text-[10px] text-slate-500 uppercase">TryHackMe</p>
                <p className="font-mono text-base sm:text-lg font-semibold text-emerald-400">
                  Top 5%
                </p>
              </div>
              <div className="border border-white/[0.08] bg-[#0F1419]/80 p-3">
                <p className="font-mono text-[10px] text-slate-500 uppercase">Verified Certs</p>
                <p className="font-mono text-base sm:text-lg font-semibold text-amber-400">
                  07 Active
                </p>
              </div>
              <div className="border border-white/[0.08] bg-[#0F1419]/80 p-3">
                <p className="font-mono text-[10px] text-slate-500 uppercase">Shipped Tools</p>
                <p className="font-mono text-base sm:text-lg font-semibold text-cyan-400">
                  11 Repos
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Interactive3DPortrait />
          </div>
        </section>

        {/* SECTION 2: TECH STACK */}
        <section
          id="stack"
          className="scroll-mt-20 py-16 sm:py-20 border-t border-white/[0.08]"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-amber-400 uppercase mb-2">
                02 / OPERATIONAL CAPABILITY MATRIX
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Tech Stack, Languages &amp; <span className="text-slate-400">Toolbelt.</span>
              </h2>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {[
                { id: 'all', label: 'All Domains' },
                { id: 'languages', label: 'Languages' },
                { id: 'cybersecurity', label: 'Cybersecurity' },
                { id: 'web', label: 'Web & Eng' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveDomain(tab.id)}
                  className={`flex-shrink-0 px-3.5 py-2 font-mono text-xs border transition-colors ${
                    activeDomain === tab.id
                      ? 'border-amber-500/70 bg-amber-500/15 text-amber-300'
                      : 'border-white/10 bg-[#0F1419] text-slate-400 hover:border-white/25 hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {visibleDomains.map((domain) => {
              const accentBorder =
                domain.accent === 'emerald'
                  ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
                  : domain.accent === 'cyan'
                  ? 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10'
                  : 'text-amber-400 border-amber-500/30 bg-amber-500/10';

              return (
                <div
                  key={domain.id}
                  className="relative border border-white/[0.08] bg-[#0F1419] p-5 sm:p-6 flex flex-col"
                >
                  <CornerBrackets color={domain.accent} />
                  <div className="flex items-start justify-between gap-3 pb-4 mb-4 border-b border-white/[0.08]">
                    <div>
                      <span className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">
                        {domain.code}
                      </span>
                      <h3 className="text-lg font-semibold text-white mt-0.5">{domain.title}</h3>
                      <p className="text-xs text-slate-400 mt-1">{domain.subtitle}</p>
                    </div>
                    <span className={`font-mono text-[10px] px-2 py-1 border ${accentBorder}`}>
                      {domain.items.length} MODULES
                    </span>
                  </div>

                  <ul className="space-y-2.5 flex-1">
                    {domain.items.map((item) => (
                      <li
                        key={item.name}
                        className="group flex items-start justify-between gap-3 p-2.5 border border-white/[0.05] bg-[#080B0E]/70 hover:border-white/15 transition-colors"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-100 group-hover:text-white">
                            {item.name}
                          </p>
                          <p className="font-mono text-[11px] text-slate-400 mt-0.5">
                            {item.role}
                          </p>
                        </div>
                        <span className="flex-shrink-0 font-mono text-[10px] px-1.5 py-0.5 border border-white/10 text-slate-400 bg-white/[0.02]">
                          {item.tag}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="relative mt-6 border border-white/[0.08] bg-[#0F1419] p-5 sm:p-6">
            <CornerBrackets color="cyan" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2.5">
                <Activity className="w-4 h-4 text-cyan-400" />
                <h3 className="font-mono text-xs sm:text-sm tracking-wider uppercase text-white">
                  Operational Domain Coverage Telemetry
                </h3>
              </div>
              <div className="flex items-center gap-3 font-mono text-[10px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-slate-800 border border-white/10" /> BASE
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-amber-500/60" /> ACTIVE
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-emerald-400" /> PRIMARY OPS
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {TELEMETRY_MATRIX.map((row) => (
                <div
                  key={row.code}
                  className="border border-white/[0.06] bg-[#080B0E]/80 p-3.5 space-y-2.5"
                >
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-slate-200 font-medium">{row.domain}</span>
                    <span className="text-slate-500">{row.code}</span>
                  </div>
                  <div className="grid grid-cols-8 gap-1.5" aria-hidden="true">
                    {row.cells.map((level, idx) => (
                      <span
                        key={idx}
                        className={`h-4 rounded-[1px] transition-transform hover:scale-110 ${
                          level === 3
                            ? 'bg-emerald-400/90 shadow-[0_0_8px_rgba(16,185,129,0.28)]'
                            : level === 2
                            ? 'bg-amber-500/75'
                            : 'bg-slate-800'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="font-mono text-[10px] text-slate-400 truncate" title={row.note}>
                    {row.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: PROJECTS */}
        <section
          id="projects"
          className="scroll-mt-20 py-16 sm:py-20 border-t border-white/[0.08]"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-amber-400 uppercase mb-2">
                03 / TARGETS &amp; TOOLING
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Categorized <span className="text-slate-400">Projects.</span>
              </h2>
              <p className="text-sm text-slate-400 mt-2 max-w-xl">
                Full-stack web applications, offensive security recon toolkits, and Linux CLI
                utilities. Every repository is inspectable and clone-ready.
              </p>
            </div>

            <a
              href="https://github.com/kalmux1"
              target="_blank"
              rel="noreferrer"
              className="self-start lg:self-auto inline-flex items-center gap-2 border border-white/15 bg-[#0F1419] px-4 py-2.5 font-mono text-xs text-slate-200 hover:border-amber-500/60 hover:text-amber-300 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>github.com/kalmux1</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 mb-6 border-b border-white/[0.08]">
            <div
              className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1"
              role="tablist"
              aria-label="Project categories"
            >
              {PROJECT_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={projectCategory === cat}
                  onClick={() => setProjectCategory(cat)}
                  className={`flex-shrink-0 inline-flex items-center gap-2 px-3.5 py-2 font-mono text-xs border transition-colors ${
                    projectCategory === cat
                      ? 'border-amber-500/70 bg-amber-500/15 text-amber-300'
                      : 'border-white/10 bg-[#0F1419] text-slate-400 hover:border-white/25 hover:text-white'
                  }`}
                >
                  <span>{cat}</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-white/5 text-slate-300">
                    {categoryCounts[cat] || 0}
                  </span>
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={projectSearch}
                onChange={(e) => setProjectSearch(e.target.value)}
                placeholder="Filter by name or stack..."
                className="w-full bg-[#0F1419] border border-white/10 pl-9 pr-8 py-2 font-mono text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/60 transition-colors"
                aria-label="Search projects"
              />
              {projectSearch && (
                <button
                  type="button"
                  onClick={() => setProjectSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {visibleProjects.length === 0 ? (
            <div className="border border-white/10 bg-[#0F1419] p-10 text-center font-mono text-xs text-slate-400">
              NO PROJECTS MATCH YOUR CURRENT FILTER.{' '}
              <button
                type="button"
                onClick={() => {
                  setProjectCategory('All');
                  setProjectSearch('');
                }}
                className="text-amber-400 underline ml-1"
              >
                RESET FILTERS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {visibleProjects.map((project, idx) => {
                const cloneCmd = `git clone https://github.com/kalmux1/${project.repo}.git`;
                const isCopied = copiedId === `clone-${project.id}`;
                const badgeColors =
                  project.accent === 'emerald'
                    ? 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10'
                    : project.accent === 'cyan'
                    ? 'text-cyan-300 border-cyan-500/30 bg-cyan-500/10'
                    : 'text-amber-300 border-amber-500/30 bg-amber-500/10';
                const hoverBorder =
                  project.accent === 'emerald'
                    ? 'hover:border-emerald-400/55'
                    : project.accent === 'cyan'
                    ? 'hover:border-cyan-400/55'
                    : 'hover:border-amber-400/55';

                return (
                  <article
                    key={project.id}
                    className={`relative flex flex-col justify-between border border-white/[0.08] bg-[#0F1419] p-5 transition-all duration-200 hover:-translate-y-0.5 ${hoverBorder}`}
                  >
                    <CornerBrackets color={project.accent} />

                    <div>
                      <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-white/[0.06] font-mono text-[10px]">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-slate-500">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className={`px-2 py-0.5 border uppercase ${badgeColors}`}>
                            {project.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="flex items-center gap-1 text-slate-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF94]" />
                            {project.status}
                          </span>
                          <a
                            href={`https://github.com/kalmux1/${project.repo}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1 text-slate-400 hover:text-white transition-colors"
                            aria-label={`Open ${project.name} on GitHub`}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-white tracking-tight">
                        <a
                          href={`https://github.com/kalmux1/${project.repo}`}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-amber-300 transition-colors"
                        >
                          {project.name}
                        </a>
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed mt-2">
                        {project.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-white/[0.06] space-y-3">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex flex-wrap gap-1.5">
                          {project.stack.map((tech) => (
                            <span
                              key={tech}
                              className="font-mono text-[10px] px-2 py-0.5 border border-white/10 bg-[#080B0E] text-slate-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
                          <span className="inline-flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-amber-400" />
                            {project.stars}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <GitFork className="w-3.5 h-3.5 text-cyan-400" />
                            {project.forks}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2 border border-white/[0.08] bg-[#080B0E] px-2.5 py-2">
                        <code className="font-mono text-[11px] text-slate-300 truncate select-all">
                          {cloneCmd}
                        </code>
                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(
                              cloneCmd,
                              `Copied git clone for ${project.name}`,
                              `clone-${project.id}`
                            )
                          }
                          className={`flex-shrink-0 inline-flex items-center gap-1 px-2 py-1 font-mono text-[10px] border transition-colors ${
                            isCopied
                              ? 'border-emerald-400/60 bg-emerald-500/15 text-emerald-300'
                              : 'border-white/10 bg-white/5 text-slate-300 hover:border-amber-400/50 hover:text-amber-300'
                          }`}
                          aria-label={`Copy git clone command for ${project.name}`}
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3 h-3" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Clone</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* SECTION 4: BUGS REPORTED (RESPONSIBLE DISCLOSURES) */}
        <section
          id="disclosures"
          className="scroll-mt-20 py-16 sm:py-20 border-t border-white/[0.08]"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-emerald-400 uppercase mb-2">
                04 / RESPONSIBLE DISCLOSURES
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Bugs <span className="text-slate-400">Reported.</span>
              </h2>
              <p className="text-sm text-slate-400 mt-2 max-w-xl">
                Organizations and vulnerability disclosure programs where security issues have been
                responsibly identified and reported.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 font-mono text-[11px] text-emerald-300 self-start sm:self-auto">
              <Bug className="w-3.5 h-3.5" />
              <span>{BUGS_REPORTED.length} DISCLOSED TARGET</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {BUGS_REPORTED.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center gap-4 border border-white/[0.1] bg-[#0F1419] px-5 py-4 hover:border-emerald-400/55 hover:bg-[#121920] transition-all duration-200 max-w-full sm:min-w-[330px]"
              >
                <CornerBrackets color="emerald" />

                {/* Organization Logo */}
                <div className="relative flex items-center justify-center w-12 h-12 rounded-sm border border-white/10 bg-[#080B0E] flex-shrink-0">
                  {item.logoType === 'georgia-gov' ? (
                    <GeorgiaGovLogo />
                  ) : (
                    item.logoUrl && (
                      <img
                        src={item.logoUrl}
                        alt={`${item.organization} logo`}
                        className="w-8 h-8 object-contain"
                      />
                    )
                  )}
                </div>

                {/* Badge Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">
                      {item.sector}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <h3 className="text-base font-semibold text-white group-hover:text-emerald-300 transition-colors truncate">
                      {item.organization}
                    </h3>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 flex-shrink-0 transition-colors" />
                  </div>
                  <div className="flex items-center gap-2 mt-1.5 font-mono text-[10px]">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-emerald-500/35 bg-emerald-500/10 text-emerald-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00FF94]" />
                      {item.status}
                    </span>
                    <span className="text-slate-400 truncate">{item.program}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>


        {/* SECTION 5: WORK JOURNEY */}
        <section
          id="experience"
          className="scroll-mt-20 py-16 sm:py-20 border-t border-white/[0.08]"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-amber-400 uppercase mb-2">
                05 / OPERATIONAL TIMELINE
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Work <span className="text-slate-400">Journey.</span>
              </h2>
              <p className="text-sm text-slate-400 mt-2 max-w-xl">
                Hands-on internships, security tooling engineering, and campus community leadership.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 font-mono text-[11px] text-amber-300 self-start sm:self-auto">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{WORK_EXPERIENCE.length} ROLES LOGGED</span>
            </div>
          </div>

          <div className="relative pl-6 sm:pl-8 space-y-5 before:content-[''] before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-amber-500/70 before:via-cyan-400/30 before:to-transparent">
            {WORK_EXPERIENCE.map((exp) => {
              const dotColor =
                exp.status === 'ACTIVE'
                  ? 'bg-[#00FF94] shadow-[0_0_10px_#00FF94]'
                  : exp.accent === 'amber'
                  ? 'bg-amber-400'
                  : 'bg-cyan-400';

              return (
                <div
                  key={exp.id}
                  className="relative border border-white/[0.08] bg-[#0F1419] p-5 hover:border-white/20 transition-colors"
                >
                  <CornerBrackets color={exp.accent} />

                  {/* Timeline Node */}
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[25px] sm:-left-[33px] top-6 w-2.5 h-2.5 rounded-full ${dotColor}`}
                  />

                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-3 mb-3 border-b border-white/[0.06]">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base sm:text-lg font-semibold text-white">
                          {exp.role}
                        </h3>
                        {exp.status === 'ACTIVE' && (
                          <span className="font-mono text-[10px] px-2 py-0.5 border border-emerald-500/40 bg-emerald-500/10 text-emerald-300">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <p className="font-mono text-xs text-amber-300 mt-0.5">
                        {exp.company}{' '}
                        <span className="text-slate-500">· {exp.type}</span>
                      </p>
                    </div>

                    <span className="font-mono text-[11px] text-slate-400 bg-[#080B0E] border border-white/10 px-2.5 py-1 self-start flex-shrink-0">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-sm text-slate-400 leading-relaxed">{exp.summary}</p>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="font-mono text-[10px] px-2 py-0.5 border border-white/10 bg-[#080B0E] text-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {exp.highlight && (
                      <span className="font-mono text-[10px] text-emerald-400">
                        ✦ {exp.highlight}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>


        {/* SECTION 6: CREDENTIALS */}
        <section
          id="credentials"
          className="scroll-mt-20 py-16 sm:py-20 border-t border-white/[0.08]"
        >
          <div className="mb-10">
            <p className="font-mono text-xs tracking-[0.2em] text-amber-400 uppercase mb-2">
              05 / CREDENTIALS &amp; VERIFIED LOGS
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Proof of <span className="text-slate-400">Practice.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-slate-400 uppercase tracking-wider mb-1">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Key Achievements</span>
              </div>

              {ACHIEVEMENTS.map((item) => {
                const metricClass =
                  item.accent === 'emerald'
                    ? 'text-emerald-300 border-emerald-500/35 bg-emerald-500/10'
                    : item.accent === 'cyan'
                    ? 'text-cyan-300 border-cyan-500/35 bg-cyan-500/10'
                    : 'text-amber-300 border-amber-500/35 bg-amber-500/10';
                return (
                  <div
                    key={item.id}
                    className="relative border border-white/[0.08] bg-[#0F1419] p-5 hover:border-white/20 transition-colors"
                  >
                    <CornerBrackets color={item.accent} />
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase">
                        {item.badge}
                      </span>
                      <span className={`font-mono text-[10px] px-2 py-0.5 border ${metricClass}`}>
                        {item.metric}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed mt-1.5">
                      {item.detail}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-7">
                <div className="flex items-center justify-between font-mono text-xs text-slate-400 uppercase tracking-wider mb-3">
                    <span className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>SYSTEM_LOGS // CERTIFICATIONS</span>
                    </span>
                    <span className="text-[10px] text-emerald-400">
                        {CERTIFICATIONS.length}/{CERTIFICATIONS.length} VERIFIED
                    </span>
            </div>

              <div className="relative border border-white/[0.08] bg-[#0F1419] overflow-hidden">
                <CornerBrackets color="emerald" />

                <div className="flex items-center justify-between px-4 py-2.5 bg-[#080B0E] border-b border-white/[0.08] font-mono text-[11px] text-slate-400">
                  <span>/var/log/kalmux/certifications.log</span>
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    SIGNATURE OK
                  </span>
                </div>

                <div className="divide-y divide-white/[0.06]">
                  {CERTIFICATIONS.map((cert) => (
                    <div
                      key={cert.code}
                      className="p-4 sm:p-5 hover:bg-white/[0.02] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                    <div className="space-y-1.5 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                            <span className="text-slate-500">[{cert.year}]</span>
                            <span className="text-emerald-400 font-medium">[CERT_VERIFIED]</span>
                            <span className="px-2 py-0.5 border border-amber-500/35 bg-amber-500/10 text-amber-300 font-semibold">
                                {cert.code}
                            </span>
                            <span className="text-slate-500 hidden sm:inline">{cert.hash}</span>
                        </div>
                        <h3 className="text-base font-semibold text-white">{cert.title}</h3>
                        <p className="font-mono text-xs text-slate-400">
                          ISSUER :: <span className="text-slate-200">{cert.issuer}</span>
                        </p>
                      </div>

                      <div className="flex-shrink-0 flex items-center gap-2 self-start sm:self-center">
                        <div className="grid place-items-center w-9 h-9 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                          <Award className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-4 py-2.5 bg-[#080B0E]/80 border-t border-white/[0.08] font-mono text-[11px] text-slate-500 flex items-center justify-between">
                  <span>EOF :: CONTINUOUS LEARNING ACTIVE</span>
                  <span className="text-amber-400">STATUS: NOMINAL</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: CONTACT */}
        <section
          id="contact"
          className="scroll-mt-20 py-16 sm:py-20 border-t border-white/[0.08]"
        >
          <div className="mb-10">
            <p className="font-mono text-xs tracking-[0.2em] text-amber-400 uppercase mb-2">
              06 / SOCIAL HANDLES &amp; COMMS
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Establish <span className="text-amber-400">Connection.</span>
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Reach out for security research collaborations, full-stack web builds, CTF teaming, or
              technical discussions across any verified channel below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SOCIAL_HANDLES.map((social) => {
                const Icon = social.icon;
                const isCopied = copiedId === `social-${social.id}`;
                return (
                  <div
                    key={social.id}
                    className="relative border border-white/[0.08] bg-[#0F1419] p-4 flex flex-col justify-between gap-3 hover:border-amber-500/40 transition-colors"
                  >
                    <CornerBrackets color={social.accent} />

                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="grid place-items-center w-9 h-9 border border-white/10 bg-[#080B0E] text-amber-400 flex-shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white">{social.platform}</p>
                          <p className="font-mono text-[11px] text-slate-400 truncate">
                            {social.meta}
                          </p>
                        </div>
                      </div>

                      <a
                        href={social.url}
                        target={social.id === 'email' ? undefined : '_blank'}
                        rel={social.id === 'email' ? undefined : 'noreferrer'}
                        className="p-1.5 border border-white/10 text-slate-400 hover:border-cyan-400/50 hover:text-cyan-300 transition-colors flex-shrink-0"
                        aria-label={`Open ${social.platform}`}
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/[0.06]">
                      <a
                        href={social.url}
                        target={social.id === 'email' ? undefined : '_blank'}
                        rel={social.id === 'email' ? undefined : 'noreferrer'}
                        className="font-mono text-xs text-slate-200 hover:text-amber-300 truncate transition-colors"
                      >
                        {social.handle}
                      </a>

                      {social.copyValue && (
                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(
                              social.copyValue!,
                              `Copied ${social.platform} handle`,
                              `social-${social.id}`
                            )
                          }
                          className={`flex-shrink-0 inline-flex items-center gap-1 px-2 py-1 font-mono text-[10px] border transition-colors ${
                            isCopied
                              ? 'border-emerald-400/60 bg-emerald-500/15 text-emerald-300'
                              : 'border-white/10 bg-[#080B0E] text-slate-400 hover:border-amber-400/50 hover:text-amber-300'
                          }`}
                          aria-label={`Copy ${social.platform}`}
                        >
                          {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          <span>{isCopied ? 'Copied' : 'Copy'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <form
              onSubmit={handleMailtoSubmit}
              className="lg:col-span-5 relative border border-white/[0.08] bg-[#0F1419] p-5 sm:p-6 space-y-4"
            >
              <CornerBrackets color="amber" />

              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] font-mono text-xs">
                <span className="text-amber-400 font-medium flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5" />
                  new_message.sh
                </span>
                <span className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                  <Lock className="w-3 h-3" />
                  DIRECT DISPATCH
                </span>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">
                  Operator Name *
                </label>
                <input
                  required
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full bg-[#080B0E] border border-white/10 px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/70 transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">
                  Return Email *
                </label>
                <input
                  required
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="you@domain.com"
                  className="w-full bg-[#080B0E] border border-white/10 px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/70 transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">
                  Subject / Category
                </label>
                <select
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  className="w-full bg-[#080B0E] border border-white/10 px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/70 transition-colors font-mono"
                >
                  <option value="Security / Collaboration">Security / Collaboration</option>
                  <option value="Web App Development">Web App Development</option>
                  <option value="CTF Team / Research">CTF Team / Research</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">
                  Payload / Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Describe what you're building or investigating..."
                  className="w-full bg-[#080B0E] border border-white/10 px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/70 transition-colors resize-y"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-amber-500 text-[#080B0E] px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider hover:bg-amber-400 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Default Mail App</span>
                </button>
                <button
                  type="button"
                  onClick={handleGmailCompose}
                  className="flex-1 inline-flex items-center justify-center gap-2 border border-cyan-400/40 bg-cyan-500/10 text-cyan-300 px-4 py-2.5 font-mono text-xs font-medium uppercase tracking-wider hover:bg-cyan-500/20 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Compose in Gmail</span>
                </button>
              </div>

              {commsFeedback && (
                <p className="font-mono text-[11px] text-emerald-400 pt-1">{commsFeedback}</p>
              )}
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative z-20 border-t border-white/[0.08] bg-[#0B0F14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 bg-amber-500 text-[#080B0E] font-bold">KALMUX_</span>
            <span>© 2026 Kalmux · SecOps &amp; Engineering</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setCmdOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 text-slate-400 hover:text-amber-300 transition-colors"
            >
              <span>PRESS ⌘K FOR COMMANDS</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('identity')}
              className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>

      <CommandPalette
        isOpen={cmdOpen}
        onClose={() => setCmdOpen(false)}
        onNavigate={scrollToSection}
        onSelectCategory={setProjectCategory}
        onCopy={(text, msg) => handleCopy(text, msg)}
      />

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 border border-emerald-400/50 bg-[#0F1419]/95 px-4 py-2.5 font-mono text-xs text-emerald-300 shadow-[0_12px_40px_rgba(0,0,0,0.7)] flex items-center gap-2"
        >
          <Check className="w-3.5 h-3.5" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <PortfolioErrorBoundary>
      <PortfolioContent />
    </PortfolioErrorBoundary>
  );
}