import { useEffect, useMemo, useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Award,
  ChevronRight,
  Code2,
  ExternalLink,
  Github,
  Mail,
  MessageCircle,
  Menu,
  Network,
  Play,
  ShieldCheck,
  Star,
  Terminal,
  X,
  Zap,
} from 'lucide-react';

const roles = ['Cybersecurity enthusiast', 'Python developer', 'CTF competitor', 'Web developer'];

const projects = [
  { name: 'PhoneOsint', repo: 'PhoneOsint', description: 'A focused Bash toolkit for fast, ethical phone number OSINT reconnaissance.', type: 'Cybersecurity', stack: ['Shell', 'OSINT'], stars: 8, forks: 2, accent: 'cyan' },
  { name: 'CORS-POC', repo: 'CORS-POC', description: 'Proof-of-concept tooling for identifying and validating unsafe CORS configurations.', type: 'Cybersecurity', stack: ['Python', 'Security'], stars: 6, forks: 1, accent: 'green' },
  { name: 'BurpSuite-Pro', repo: 'BurpSuite-Pro', description: 'A practical reference pack for Burp Suite Professional 2024 workflows.', type: 'Tools', stack: ['Burp Suite', 'Docs'], stars: 5, forks: 1, accent: 'red' },
  { name: 'Anon-Mac', repo: 'Anon-Mac', description: 'A MAC address changer wrapped with a three-layer encryption workflow.', type: 'Tools', stack: ['Shell', 'Linux'], stars: 3, forks: 0, accent: 'cyan' },
  { name: 'Huntmate', repo: 'Huntmate', description: 'A security testing companion for organizing findings and vulnerability tracking.', type: 'Python', stack: ['Python', 'CLI'], stars: 3, forks: 1, accent: 'green' },
  { name: 'dev-details', repo: 'dev-details', description: 'A lightweight system information script for clean, useful environment snapshots.', type: 'Tools', stack: ['Shell', 'Linux'], stars: 2, forks: 0, accent: 'cyan' },
];

const skills = [
  { name: 'Offensive security', value: 92, label: '92%' },
  { name: 'Python & automation', value: 88, label: '88%' },
  { name: 'Web development', value: 84, label: '84%' },
  { name: 'Linux & tooling', value: 90, label: '90%' },
];

const certifications = [
  { code: 'CNSP', title: 'Certified Network Security Practitioner', issuer: 'The SecOps Group', year: '2024' },
  { code: 'CEH', title: 'Certified Ethical Hacker', issuer: 'EC-Council', year: '2024' },
  { code: 'EHE', title: 'Ethical Hacking Essentials', issuer: 'EC-Council', year: '2023' },
  { code: 'DFE', title: 'Digital Forensics Essentials', issuer: 'EC-Council', year: '2023' },
];

function App() {
  const [activeRole, setActiveRole] = useState(0);
  const [typedRole, setTypedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [messageSent, setMessageSent] = useState(false);

  useEffect(() => {
    const role = roles[activeRole];
    const delay = isDeleting ? 45 : 100;
    const timer = window.setTimeout(() => {
      const next = isDeleting ? role.slice(0, typedRole.length - 1) : role.slice(0, typedRole.length + 1);
      setTypedRole(next);
      if (!isDeleting && next === role) window.setTimeout(() => setIsDeleting(true), 1200);
      if (isDeleting && next === '') {
        setIsDeleting(false);
        setActiveRole((current) => (current + 1) % roles.length);
      }
    }, delay);
    return () => window.clearTimeout(timer);
  }, [activeRole, isDeleting, typedRole]);

  const visibleProjects = useMemo(() => filter === 'All' ? projects : projects.filter((project) => project.type === filter), [filter]);

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') ?? '');
    const email = String(formData.get('email') ?? '');
    const message = String(formData.get('message') ?? '');
    const subject = `Portfolio message from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=kal.mux.cyber@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    setMessageSent(true);
  };

  return (
    <div className="site-shell">
      <div className="noise" aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Kalmux home"><span className="brand-mark">K</span><span>KALMUX<span className="brand-cursor">_</span></span></a>
        <nav className={`nav-links ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
          {['About', 'Skills', 'Projects', 'Contact'].map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}<span>↗</span></a>)}
        </nav>
        <a className="header-cta" href="#contact">Let&apos;s connect <ArrowUpRight size={15} /></a>
        <button className="menu-button" onClick={() => setMenuOpen((current) => !current)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main id="top">
        <section className="hero section-wrap">
          <div className="hero-copy reveal">
            <div className="eyebrow"><span className="status-dot" /> available for interesting problems</div>
            <p className="hero-kicker">/ identity.boot</p>
            <h1>Breaking things<br /><span className="outline-text">ethically.</span><br />Building things<br /><span className="neon-text">securely.</span></h1>
            <p className="hero-description">I&apos;m Kalmux — a cybersecurity enthusiast and developer turning curiosity into tools, systems, and safer digital spaces.</p>
            <div className="hero-actions"><a className="button button-primary" href="#projects">Explore my work <ArrowDownRight size={17} /></a><a className="button button-quiet" href="#contact">Start a conversation <span>↗</span></a></div>
            <div className="hero-meta"><span><strong>01</strong> / 04</span><span className="meta-line" /><span>scroll to inspect</span></div>
          </div>
          <div className="hero-art reveal reveal-delay">
            <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
            <div className="terminal-label label-top"><span>SYS_INIT</span><small>0x7F / ONLINE</small></div>
            <div className="terminal-label label-side"><span>IDENTITY</span><small>VERIFIED</small></div>
            <div className="character-frame"><img src={`${import.meta.env.BASE_URL}assets/images/Kalmux-pf.png`} alt="Kalmux character portrait" /><div className="image-shade" /></div>
            <div className="art-caption"><span className="caption-marker">///</span><div><strong>KALMUX / 01</strong><small>SECURITY RESEARCHER · BUILDER</small></div></div>
            <div className="scroll-cue"><span>SCROLL</span><ChevronRight size={15} /></div>
          </div>
        </section>

        <div className="ticker" aria-label="Skills ticker"><div className="ticker-track">SECURITY RESEARCH <span>✦</span> PYTHON AUTOMATION <span>✦</span> WEB DEVELOPMENT <span>✦</span> CTF COMPETITOR <span>✦</span> SECURITY RESEARCH <span>✦</span> PYTHON AUTOMATION <span>✦</span> WEB DEVELOPMENT <span>✦</span> CTF COMPETITOR <span>✦</span></div></div>

        <section className="section-wrap about-section" id="about">
          <div className="section-intro"><p className="section-index">01 / ABOUT</p><h2>Curiosity is<br /><span>my attack surface.</span></h2></div>
          <div className="about-content"><p className="lead-copy">I like understanding how systems think — then finding the edge cases nobody else noticed.</p><p>My work sits at the intersection of offensive security, automation, and thoughtful product building. From CTF labs to small command-line tools, I&apos;m always looking for a cleaner way to solve a hard problem.</p><div className="about-signature"><span className="signature-line" /><span>— Kalmux</span></div></div>
          <div className="stat-card"><div className="stat-ring"><span>5<span>%</span></span></div><p>TryHackMe<br /><strong>Top 5%</strong> global ranking</p><span className="stat-arrow">↗</span></div>
        </section>

        <section className="section-wrap skills-section" id="skills"><div className="section-intro"><p className="section-index">02 / CAPABILITIES</p><h2>Tools for<br /><span>the curious.</span></h2></div><div className="skills-grid"><div className="skill-list">{skills.map((skill, index) => <div className="skill-row" key={skill.name}><div className="skill-head"><span><b>0{index + 1}</b>{skill.name}</span><strong>{skill.label}</strong></div><div className="skill-track"><span style={{ width: `${skill.value}%` }} /></div></div>)}</div><div className="skill-cloud"><p className="mini-label">// toolbelt.json</p><div className="tag-cloud">{['Burp Suite', 'CORS', 'OSINT', 'Python', 'Bash', 'React', 'Linux', 'Git', 'Vite', 'Tailwind', 'Pentesting', 'HTML/CSS'].map((tag, index) => <span className={index % 4 === 0 ? 'tag highlight' : 'tag'} key={tag}>{tag}</span>)}</div><div className="skill-note"><Zap size={17} /><span>Always learning.<br /><strong>Never assuming.</strong></span></div></div></div></section>

        <section className="section-wrap project-section" id="projects"><div className="project-heading"><div className="section-intro"><p className="section-index">03 / SELECTED WORK</p><h2>Built to be<br /><span>useful.</span></h2></div><div className="project-heading-copy"><p>Small tools. Sharp edges. A growing collection of things that make security work a little more human.</p><a href="https://github.com/kalmux1" target="_blank" rel="noreferrer">View GitHub profile <ArrowUpRight size={16} /></a></div></div><div className="filter-row">{['All', 'Cybersecurity', 'Python', 'Web', 'Tools'].map((item) => <button className={filter === item ? 'active' : ''} key={item} onClick={() => setFilter(item)}>{item}</button>)}</div><div className="projects-grid">{visibleProjects.map((project, index) => <a className="project-link" href={`https://github.com/kalmux1/${project.repo}`} target="_blank" rel="noreferrer" key={project.name}><article className={`project-card accent-${project.accent}`}><div className="project-top"><span className="project-number">0{index + 1}</span><span className="project-type">{project.type}</span><ExternalLink size={17} /></div><div><h3>{project.name}</h3><p>{project.description}</p></div><div className="project-bottom"><div className="project-tags">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-stats"><span><Star size={13} /> {project.stars}</span><span><Network size={13} /> {project.forks}</span></div></div></article></a>)}</div></section>

        <section className="section-wrap timeline-section"><div className="section-intro"><p className="section-index">04 / CREDENTIALS</p><h2>Proof of<br /><span>practice.</span></h2></div><div className="timeline-wrap"><div className="timeline-line" />{certifications.map((cert, index) => <div className="timeline-item" key={cert.code}><div className="timeline-dot" /><div className="timeline-year">{cert.year}</div><div className="cert-card"><div className="cert-icon"><Award size={18} /></div><div><span>{cert.code}</span><h3>{cert.title}</h3><p>{cert.issuer}</p></div><ChevronRight size={18} /></div></div>)}<div className="timeline-item achievement"><div className="timeline-dot" /><div className="timeline-year">NOW</div><div className="achievement-card"><div className="achievement-icon"><ShieldCheck size={24} /></div><div><span>ACHIEVEMENT UNLOCKED</span><h3>TryHackMe Top 5%</h3><p>Consistent practice in real-world security labs.</p></div></div></div></div></section>

        <section className="contact-section section-wrap" id="contact"><div className="contact-copy"><p className="section-index">05 / CONTACT</p><h2>Have a problem<br />worth <span>solving?</span></h2><p>Whether you want to talk security, collaborate on a project, or just say hello — my inbox is open.</p><div className="social-links"><a href="https://github.com/kalmux1" target="_blank" rel="noreferrer"><Github size={17} /> GitHub <ArrowUpRight size={14} /></a><a href="https://discord.com/users/1170942026922082390" target="_blank" rel="noreferrer"><MessageCircle size={17} /> Discord <ArrowUpRight size={14} /></a><a href="https://tryhackme.com" target="_blank" rel="noreferrer"><Terminal size={17} /> TryHackMe <ArrowUpRight size={14} /></a></div></div><form className="contact-form" onSubmit={sendMessage}><div className="form-top"><span>new_message.sh</span><span><span className="status-dot" /> encrypted</span></div><label>your name<input required name="name" placeholder="Enter your name" /></label><label>your email<input required type="email" name="email" placeholder="you@example.com" /></label><label>your message<textarea required name="message" placeholder="Tell me what you're working on..." rows={4} /></label><button className="button button-primary" type="submit">{messageSent ? 'Message queued ✓' : 'Send message'} <Mail size={16} /></button>{messageSent && <p className="form-success">Thanks — your message is ready to be connected.</p>}</form></section>
      </main>
      <footer className="footer section-wrap"><a className="brand" href="#top"><span className="brand-mark">K</span><span>KALMUX<span className="brand-cursor">_</span></span></a><p>© 2024 Kalmux. Built with intent.</p><a href="#top" className="back-top">back to top <ArrowUpRight size={14} /></a></footer>
    </div>
  );
}

export default App;
