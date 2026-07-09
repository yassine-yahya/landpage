import { useState, useEffect, useRef } from "react";
import CV_URL from "./assets/Yassine_Yahya_CV.pdf";


const LANDING_URL = "https://yassine-yahya.github.io/landpage2/";
// Place your actual CV PDF at this path in your Vite project's `public/` folder
// (e.g. public/Yassine-Yahya-CV.pdf) — the button below links here directly.
//const CV_URL = "assets/Yassine_Yahya_CV.pdf";

/* ============================================================
   DESIGN — Security Operations Console
   ------------------------------------------------------------
   Grounded in the actual SOC analyst's world: dashboard panels,
   system-status pills, uptime counters, case-file numbering,
   severity color-coding, and targeting-reticle corner marks —
   rather than a generic "hacker terminal" look.

   Palette:
     bg        #0B0F14  graphite-navy console background
     panel     #121821  raised panel surface
     panelAlt  #182130  secondary panel / table row
     line      #26313F  hairline borders
     ink       #E7EDF3  primary text
     mute      #8B97A6  secondary text
     cyan      #4FD1D9  primary accent — monitoring / detection
     amber     #F2A93F  medium-priority accent
     red       #F0555F  critical / alert accent
     green     #52D17C  nominal / success status
   Fonts: Space Grotesk (display), IBM Plex Sans (body), JetBrains Mono (labels)
   ============================================================ */

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const T = {
  bg:       "#0B0F14",
  panel:    "#121821",
  panelAlt: "#182130",
  line:     "#26313F",
  ink:      "#E7EDF3",
  mute:     "#8B97A6",
  cyan:     "#4FD1D9",
  amber:    "#F2A93F",
  red:      "#F0555F",
  green:    "#52D17C",
};

const FD = "'Space Grotesk', sans-serif";
const FB = "'IBM Plex Sans', sans-serif";
const FM = "'JetBrains Mono', monospace";

const B  = `1.5px solid ${T.line}`;
const B3 = `1.5px solid ${T.line}`;
const GLOW = `0 0 0 1px rgba(79,209,217,0.12), 0 10px 28px rgba(0,0,0,0.45)`;
const GLOW_HOVER = `0 0 0 1px rgba(79,209,217,0.4), 0 12px 32px rgba(0,0,0,0.55), 0 0 24px rgba(79,209,217,0.12)`;

// severity/category colors used across skill groups + experience case files
const CAT_AC = [T.cyan, T.amber, T.green, T.mute, T.red, "#B39BE0"];
const EXP_AC = [T.cyan, T.amber, T.green, T.red, T.mute];

// ── Data — Security-first ordering ─────────────────────────────────────────────
const skillGroups = [
  { cat: "Security / SOC",          tags: ["SIEM (Splunk / Chronicle)", "Incident Response", "Threat Detection", "Log & Packet Analysis", "Vulnerability Assessment", "Wireshark", "Nmap", "Metasploit", "NIST / CIS Frameworks", "IAM & Access Control"] },
  { cat: "Networking & Systems",    tags: ["Linux Administration", "TCP/IP", "Firewalls / IDS-IPS", "Bash", "OAuth", "JWT"] },
  { cat: "Data science / analysis", tags: ["Python", "SQL", "PostgreSQL", "MongoDB", "Pandas", "NumPy", "Matplotlib"] },
  { cat: "Web development",         tags: ["JavaScript", "React.js", "Node.js", "Next.js", "Express.js", "HTML/CSS", "REST APIs", "Tailwind"] },
  { cat: "Tooling / workflow",      tags: ["Git", "GitHub", "Docker", "Agile / Scrum", "Airtable"] },
  { cat: "Design / UX",             tags: ["Figma", "Canva", "UX/UI Design"] },
];

const experience = [
  { title: "Project Assistant", company: "Migracode – Open Cultural Center", period: "Feb 2026 – Present", location: "Barcelona", tags: ["React", "JavaScript", "HTML/CSS", "Mentoring", "Code Review"], desc: "Supported MigraCode's Full-Stack Bootcamp with code reviews and debugging support. Coordinated instructors, students, and a community of 30+ volunteers and 50+ students. Assisted with curriculum delivery, online sessions, mentorship programs, and event organization." },
  { title: "Volunteer IT & Technology Teacher", company: "Fundación Prau", period: "2024 – 2025 · 1 year", location: "Barcelona", tags: ["Teaching", "Curriculum Design", "Digital Literacy", "Adaptability"], desc: "Designed and delivered IT literacy and introductory programming for adults in social inclusion programs, supporting 60+ students across 70+ classes. Adapted content for non-technical learners, covering digital tools, productivity software, and coding fundamentals." },
  { title: "Volunteer Web Dev Bootcamp Assistant", company: "MigraCode Barcelona", period: "2024 · 3 months", location: "Barcelona", tags: ["JavaScript", "Node.js", "React", "Full-Stack", "Agile / Scrum"], desc: "Assisted lead instructors across a 3-month full-stack bootcamp. Provided technical support, reviewed student projects, and led hands-on sessions in JavaScript, Node.js, and React." },
  { title: "Branch Manager · Advisor · Cashier", company: "BMCE Bank", period: "2008 – 2022 · 14 years", location: "Tangier, Morocco", tags: ["Data Analysis", "Leadership", "Risk Assessment", "Financial Reporting", "Team Management"], desc: "Led daily operations of a full-service banking branch over 14 years, managing client portfolios and a multidisciplinary team. Drove sustained business growth, contributing to €5M+ in deposits and ~30% portfolio growth." },
  { title: "Email Marketing Manager", company: "Elysium3", period: "2005 – 2007 · 2 years", location: "Tangier, Morocco", tags: ["Digital Marketing", "A/B Testing", "Analytics", "Campaign Optimization"], desc: "Designed and optimized 4+ end-to-end digital marketing campaigns. Managed automation workflows, KPI tracking, A/B testing, and audience segmentation to improve engagement and conversion rates." },
];

const certifications = [
  { name: "Cybersecurity Professional",           org: "Google / Coursera",                     detail: "120h · Dec 2024",      inProgress: false, skills: ["SIEM","Incident Response","Network Security","Linux","Threat Analysis","Risk Assessment"] },
  { name: "Data Science Professional",            org: "IBM / Coursera",                        detail: "In progress",          inProgress: true,  skills: ["Python","NumPy","Pandas","Matplotlib","Machine Learning","SQL","Data Analysis","Jupyter"] },
  { name: "IT Automation with Python",            org: "Google / Coursera",                     detail: "60h · Nov 2023",       inProgress: false, skills: ["Python","Bash Scripting","Git","REST APIs","Regular Expressions","Config Management"] },
  { name: "IT Fundamentals",                      org: "IBM",                                   detail: "40h · Feb 2025",       inProgress: false, skills: ["Cloud Basics","Networking","Security Fundamentals","DevOps","Operating Systems"] },
  { name: "Full-Stack Web Developer",             org: "MigraCode Barcelona",                   detail: "700h · 2023–2024",     inProgress: false, skills: ["HTML/CSS","JavaScript","React.js","Node.js","Express.js","MongoDB","PostgreSQL","Git","Agile"] },
  { name: "Education & Innovation",               org: "International Training Center, Prague", detail: "1 Week · May 2026",   inProgress: false, skills: ["AI Tools for Education","Flipped Classroom","Digital Learning","Project-Based Learning","Instructional Design","Collaborative Learning","Educational Technology","Innovation in Education"] },
  { name: "Brevet Bancaire – Chargé de Clientèle", org: "BMCE Bank Academy",                   detail: "200h · 2016–2017",     inProgress: false, skills: ["Financial Analysis","Client Management","Risk Assessment","Banking Operations","Compliance"] },
  { name: "IT Management Technician",             org: "ITG Morocco",                           detail: "2003–2005",            inProgress: false, skills: ["Hardware","Networking","Database Management","System Administration","IT Support"] },
];
const CERT_COLOR = (i) => CAT_AC[i % CAT_AC.length];
const initialsOf = (org) => org.split(/[\s/]+/).filter(Boolean).slice(0,2).map(w => w[0]).join("").toUpperCase();

const workshops = [
  { name: "Masterclass Astro",           org: "Porsche Digital"  },
  { name: "Hackday Netlify / Gatsby",    org: "RedHat"           },
  { name: "UI/UX Design in Figma",       org: "Porsche Digital"  },
  { name: "Testing CI/CD Pipeline",      org: "New Relic"        },
  { name: "TensorFlow.js",               org: "Porsche Digital"  },
  { name: "Object-Oriented Programming", org: "Barcelona Activa" },
];

const languages = [
  { lang: "Arabic",  level: "Native" },
  { lang: "French",  level: "Professional" },
  { lang: "Spanish", level: "Professional" },
  { lang: "English", level: "Professional" },
  { lang: "Catalan", level: "Basic – Level 3" },
];

const projectFiles = [
  { id:1, fileName:"PortHunter.js",           title:"PortHunter",                      tag: "SEC", impact: "DETECTS: open ports, live services & exposed protocols", tech:["Express.js","Python","Nmap","JavaScript","Vercel"],   link:"https://porthunter.vercel.app/",                               desc:"Network port scanner that detects open/closed ports and security protocols. Built with React, Node.js and Python — requires admin privileges to run the scan." },
  { id:2, fileName:"Socket-Server-Client.py", title:"Socket Server-Client Messaging",  tag: "SEC", impact: "DEMONSTRATES: multi-client server architecture over raw sockets", tech:["Socket","Python"],                                    link:"https://github.com/yassine-yahya/socket-server-client-python", desc:"Python messaging app using sockets for communication between a server and multiple clients. Demonstrates core network programming and can be extended for cybersecurity use." },
  { id:3, fileName:"web-scraping.py",         title:"Web Scraping & Security Headers", tag: "SEC", impact: "AUDITS: missing HTTP security headers on any target URL", tech:["BeautifulSoup4","Colorama","Python"],                 link:"https://github.com/yassine-yahya/web-scraping-Bs4-Requests",   desc:"Scrapes a target URL, checks for HTTP security headers presence, and extracts page title and links. Useful for quick security audits of web pages." },
  { id:4, fileName:"ssh-connection.py",       title:"SSH Connection Script",           tag: "SEC", impact: "AUTOMATES: SSH connections with graceful error handling", tech:["Python","Colorama","Paramiko"],                       link:"https://github.com/yassine-yahya/ssh-access-paramiko",         desc:"Automates SSH connections using Paramiko and handles common SSH errors gracefully. Clean CLI output with Colorama highlighting." },
  { id:5, fileName:"nmap-scanner.py",         title:"Nmap Scanner with Python",        tag: "SEC", impact: "AUTOMATES: recurring port scans on a fixed interval", tech:["Nmap","Colorama","Python"],                           link:"https://github.com/yassine-yahya/port-scanner-python-nmap",    desc:"Uses Nmap to scan a target for open ports and services. Highlights results with Colorama for readability. Runs an automated scan every 5 seconds." },
  { id:6, fileName:"card-pairs-game.js",      title:"Card Pairs Game",                 tag: "DEV", impact: "BUILT: full game logic & flip animations in vanilla JS", tech:["JavaScript","HTML","CSS","GitHub Pages"],             link:"https://yassine-yahya.github.io/card-pairs-game/",             desc:"Memory matching game where players flip cards to find matching pairs. Pure vanilla JS with smooth flip animations." },
  { id:7, fileName:"guess-pin.js",            title:"Guess The PIN",                   tag: "DEV", impact: "BUILT: randomized guessing logic with unique-digit validation", tech:["JavaScript","HTML","CSS","GitHub Pages"],             link:"https://yassine-yahya.github.io/guess-pin/",                   desc:"Interactive number guessing game. Players try to guess a randomly generated 4-digit number with unique digits. Built with vanilla JS." },
];
const TAG_COLOR = { SEC: T.cyan, DEV: T.amber };
const extOf = (fn) => fn.split(".").pop();
const NAV_LINKS = ["Home", "Skills", "Experience", "Projects", "Certifications", "Contact"];

// ── Hooks & module-level components ────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef(null); const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.unobserve(el); } }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, []); return [ref, inView];
}
// Targeting-reticle corner marks — signature motif reused on console panels
function Reticle({ children, style = {}, accent = T.cyan }) {
  const arm = { position: "absolute", width: 10, height: 10, borderColor: accent };
  return (
    <div style={{ position: "relative", ...style }}>
      <span style={{ ...arm, top: -1, left: -1, borderTop: "2px solid", borderLeft: "2px solid" }}/>
      <span style={{ ...arm, top: -1, right: -1, borderTop: "2px solid", borderRight: "2px solid" }}/>
      <span style={{ ...arm, bottom: -1, left: -1, borderBottom: "2px solid", borderLeft: "2px solid" }}/>
      <span style={{ ...arm, bottom: -1, right: -1, borderBottom: "2px solid", borderRight: "2px solid" }}/>
      {children}
    </div>
  );
}
const rv = (inView, delay = 0, dir = "up") => ({
  opacity: inView ? 1 : 0,
  transform: inView ? "none" : dir==="up" ? "translateY(16px)" : dir==="left" ? "translateX(-12px)" : "scale(0.97)",
  transition: `opacity .45s ${delay}s ease, transform .45s ${delay}s ease`,
});

const SecLabel = ({ label, inView }) => (
  <div style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 8, ...rv(inView, 0, "left") }}>
    <span style={{ width: 6, height: 6, background: T.cyan, flexShrink: 0 }}/>
    <span style={{ fontFamily: FM, fontSize: 11, fontWeight: 600, color: T.cyan, letterSpacing: "0.22em" }}>{label}</span>
  </div>
);
const SecTitle = ({ a, b, inView }) => (
  <h2 style={{ fontFamily: FD, fontWeight: 700, fontSize: "clamp(32px,4.5vw,52px)", lineHeight: 1.08, marginBottom: 28, color: T.ink, ...rv(inView, 0.04) }}>
    {a}<br/><span style={{ color: T.cyan }}>{b}</span>
  </h2>
);

const ChevronIcon = ({ open }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .3s ease", flexShrink: 0 }}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

// Accordion header — large title always visible, cards collapse behind it.
// Keeps the page short by default; clicking (or a nav link) reveals content.
function SectionHeader({ label, a, b, count, open, onToggle, inView }) {
  return (
    <button onClick={onToggle} aria-expanded={open} style={{
      width: "100%", display: "flex", justifyContent: "space-between", alignItems: "flex-end",
      gap: 16, background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left",
      marginBottom: open ? 28 : 8,
    }}>
      <div>
        <SecLabel label={label} inView={inView}/>
        <h2 style={{ fontFamily: FD, fontWeight: 700, fontSize: "clamp(32px,4.5vw,52px)", lineHeight: 1.08, margin: 0, color: T.ink, ...rv(inView, 0.04) }}>
          {a}<br/><span style={{ color: T.cyan }}>{b}</span>
        </h2>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0, paddingBottom: 10 }}>
        {count && <span style={{ fontFamily: FM, fontSize: 11, fontWeight: 600, color: T.mute, border: `1.5px solid ${T.line}`, padding: "5px 11px", whiteSpace: "nowrap" }}>{count}</span>}
        <span style={{ color: T.cyan }}><ChevronIcon open={open}/></span>
      </div>
    </button>
  );
}
// Collapsible wrapper using the grid-rows technique — animates to the
// content's actual height instead of a fixed max-height guess.
function Collapse({ open, children }) {
  return (
    <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows .4s ease", overflow: "hidden" }}>
      <div style={{ minHeight: 0 }}>{children}</div>
    </div>
  );
}

// ── PORTFOLIO ───────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [scrollPct,     setScrollPct]     = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [sectionsOpen,  setSectionsOpen]  = useState({ skills: false, experience: false, certifications: false, education: false, projects: false });
  const mobileRef = useRef(null);
  const toggleSection = (id) => setSectionsOpen(o => ({ ...o, [id]: !o[id] }));

  const [aboutRef,     aboutInView]     = useInView(0.1);
  const [skillsRef,    skillsInView]    = useInView(0.08);
  const [expRef,       expInView]       = useInView(0.06);
  const [projRef,      projInView]      = useInView(0.08);
  const [certRef,      certInView]      = useInView(0.08);
  const [eduRef,       eduInView]       = useInView(0.08);
  const [footerRef,    footerInView]    = useInView(0.08);

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      html{scroll-behavior:smooth}
      body{background:${T.bg};overflow-x:hidden}
      #root,body,html{max-width:100vw}
      ::selection{background:${T.cyan};color:${T.bg}}
      a:focus-visible,button:focus-visible{outline:2px solid ${T.cyan};outline-offset:2px;border-radius:1px}
      ::-webkit-scrollbar{width:7px}
      ::-webkit-scrollbar-track{background:${T.bg}}
      ::-webkit-scrollbar-thumb{background:${T.line}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
      @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.35}}
      @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(5px)}}
      .fu0{animation:fadeUp .5s .00s both}.fu1{animation:fadeUp .5s .10s both}
      .fu2{animation:fadeUp .5s .20s both}.fu3{animation:fadeUp .5s .30s both}
      .fu4{animation:fadeUp .5s .42s both}.fi{animation:fadeIn .7s both}
      .p-dot{animation:pulse 1.8s ease-in-out infinite}
      .p-btn{transition:box-shadow .15s,border-color .15s,transform .15s !important}
      .p-btn:hover{transform:translateY(-2px) !important;box-shadow:0 0 18px rgba(79,209,217,.3) !important;border-color:${T.cyan} !important}
      .p-btn:active{transform:translateY(0) !important}
      .p-card{transition:box-shadow .18s,border-color .18s,transform .18s !important}
      .p-card:hover{transform:translateY(-3px) !important;border-color:rgba(79,209,217,.45) !important;box-shadow:${GLOW_HOVER} !important}
      .p-tag{transition:background .1s,color .1s,border-color .1s !important;cursor:default}
      .p-tag:hover{background:${T.cyan} !important;color:${T.bg} !important;border-color:${T.cyan} !important}
      .p-nl:hover{color:${T.ink} !important}
      .p-icon:hover{background:${T.cyan} !important;color:${T.bg} !important;border-color:${T.cyan} !important}
      .p-proj-link:hover{color:${T.cyan} !important}
      .p-dnav{display:flex}.p-burger{display:none;flex-direction:column}
      @media(max-width:900px){
        .p-dnav{display:none !important}.p-burger{display:flex !important}
        .p-ag{grid-template-columns:1fr !important}.p-eg{grid-template-columns:1fr !important}
        .p-cg{grid-template-columns:1fr !important}.p-edu{grid-template-columns:1fr !important}
        .p-fg{grid-template-columns:1fr !important}
        .p-ghcard{flex-direction:column !important;align-items:flex-start !important;text-align:left !important}
        .p-cta-r{flex-direction:column !important;align-items:flex-start !important}
        .p-bizt{font-size:34px !important}
        .p-htitle{font-size:38px !important}
        .p-skill-row{flex-direction:column !important}
        .p-skill-cat{min-width:unset !important;border-right:none !important;border-bottom:1.5px solid ${T.line} !important}
      }
      @media(max-width:480px){.p-htitle{font-size:32px !important}.p-bizt{font-size:26px !important}}
      @keyframes cardIn{from{opacity:0}to{opacity:1}}
      .p-hero-flex{display:flex;align-items:center;gap:2.5rem}
      .p-hero-left{flex:1;min-width:280px}
    `;
    document.head.appendChild(s);
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(total > 0 ? (window.scrollY / total) * 100 : 0);
      const ids = ["home","about","skills","experience","projects","certifications","contact"];
      for (const id of [...ids].reverse()) { const el = document.getElementById(id); if (el && window.scrollY >= el.offsetTop - 130) { setActiveSection(id); break; } }
    };
    window.addEventListener("scroll", onScroll);
    return () => { document.head.removeChild(s); window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e) => { if (mobileRef.current?.contains(e.target)) return; setMenuOpen(false); };
    document.addEventListener("click", close); return () => document.removeEventListener("click", close);
  }, [menuOpen]);

  const scrollTo = (id) => {
    if (id in sectionsOpen) setSectionsOpen(o => ({ ...o, [id]: true }));
    setMenuOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };
  const PAD = "3.5rem clamp(14px,3.5vw,44px)";
  const MAX = { maxWidth: 1040, margin: "0 auto" };
  const panelStyle = { border: B, background: T.panel, boxShadow: GLOW };

  return (
    <div style={{ background: T.bg, color: T.ink, minHeight: "100vh", fontFamily: FB }}>

      <div style={{ position: "fixed", top: 0, left: 0, height: 2.5, width: `${scrollPct}%`, background: T.cyan, zIndex: 9999, transition: "width .1s", boxShadow: `0 0 8px ${T.cyan}` }}/>

      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(11,15,20,0.92)", backdropFilter: "blur(8px)", borderBottom: B3, padding: "0 clamp(14px,3.5vw,44px)", height: 58, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, background: T.panelAlt, border: `1.5px solid ${T.cyan}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 16, color: T.cyan, lineHeight: 1 }}>Y</span>
          </div>
          <div style={{ fontFamily: FD, fontWeight: 700, fontSize: 18, color: T.ink, letterSpacing: "0.04em", lineHeight: 1 }}>YASSINE</div>
          <div style={{ fontFamily: FM, fontSize: 8, fontWeight: 600, color: T.cyan, letterSpacing: "0.1em", borderLeft: `1.5px solid ${T.line}`, paddingLeft: 8, lineHeight: 1.4, opacity: 0.9 }}>SOC ANALYST<br/>JUNIOR</div>
        </div>

        <div className="p-dnav" style={{ alignItems: "center", gap: 2 }}>
          {NAV_LINKS.map(l => {
            const isActive = activeSection === l.toLowerCase();
            return <button key={l} className="p-nl" onClick={() => scrollTo(l.toLowerCase())} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: FM, fontSize: 12.5, fontWeight: 600, letterSpacing: "0.09em", color: isActive ? T.ink : T.mute, padding: "6px 13px", borderBottom: `2px solid ${isActive ? T.cyan : "transparent"}`, transition: "border-color .12s, color .12s" }}>{l.toUpperCase()}</button>;
          })}
        </div>

        <button ref={mobileRef} className="p-burger" onClick={e => { e.stopPropagation(); setMenuOpen(o => !o); }} style={{ background: "none", border: B, cursor: "pointer", padding: 8, gap: 5 }}>
          <div style={{ width: 20, height: 2, background: T.ink, transition: "all .3s", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }}/>
          <div style={{ width: 20, height: 2, background: T.ink, opacity: menuOpen ? 0 : 1, transition: "opacity .3s" }}/>
          <div style={{ width: 20, height: 2, background: T.ink, transition: "all .3s", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }}/>
        </button>

        {menuOpen && (
          <div style={{ position: "absolute", top: 58, left: 0, right: 0, background: T.bg, borderBottom: B3, padding: "8px 24px 24px", zIndex: 99 }}>
            {NAV_LINKS.map(l => <button key={l} onClick={() => scrollTo(l.toLowerCase())} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", borderBottom: `1px solid ${T.line}`, cursor: "pointer", fontFamily: FM, fontSize: 14, fontWeight: 600, letterSpacing: "0.09em", color: T.ink, padding: "13px 0" }}>{l.toUpperCase()}</button>)}
          </div>
        )}
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section id="home" style={{ borderBottom: B3, padding: `6.5rem clamp(14px,3.5vw,44px) 5rem`, backgroundImage: `radial-gradient(${T.line} 1px, transparent 1px)`, backgroundSize: "26px 26px" }}>
        <div style={MAX}>
          <div className="p-hero-flex">
            <div className="p-hero-left">
              <div className="fu0 fi" style={{ display: "inline-flex", alignItems: "center", gap: 8, border: B, padding: "6px 14px", marginBottom: 26 }}>
                <span className="p-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: T.green, flexShrink: 0 }}/>
                <span style={{ fontFamily: FM, fontSize: 11, fontWeight: 600, color: T.ink, letterSpacing: "0.1em" }}>OPEN TO SOC / JUNIOR ANALYST ROLES</span>
              </div>

              <div className="fu0 p-htitle" style={{ fontFamily: FD, fontWeight: 700, fontSize: "clamp(32px,4.5vw,52px)", color: T.ink, lineHeight: 1.08, marginBottom: 24 }}>
                Yassine<br/><span style={{ color: T.cyan }}>Yahya</span>
              </div>

              <p className="fu2" style={{ fontFamily: FB, fontSize: 19, lineHeight: 1.75, color: T.mute, maxWidth: 640, marginBottom: 36 }}>
                SOC analyst in training — 14 years in banking operations &amp; risk, now backed by a{" "}
                <span style={{ color: T.ink, fontWeight: 500 }}>Google Cybersecurity Certificate</span> and a full-stack/data toolkit.
              </p>

              <div className="fu3 p-cta-r" style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center", marginBottom: 40 }}>
                <a href={CV_URL} download className="p-btn" style={{ fontFamily: FM, fontSize: 13, fontWeight: 600, letterSpacing: "0.05em", padding: "13px 28px", background: T.cyan, border: `1.5px solid ${T.cyan}`, color: T.bg, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>⬇ DOWNLOAD CV</a>
                <a href="mailto:yassineyahya50@gmail.com" className="p-btn" style={{ fontFamily: FM, fontSize: 13, fontWeight: 600, letterSpacing: "0.05em", padding: "13px 28px", background: "transparent", border: B, color: T.ink, textDecoration: "none" }}>GET IN TOUCH</a>
                <div style={{ display: "flex", gap: 8, marginLeft: 4 }}>
                  <a href="https://linkedin.com/in/yassineyahya" target="_blank" rel="noopener noreferrer" className="p-icon p-btn" style={{ width: 42, height: 42, background: "transparent", border: B, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: T.ink }}><LinkedInIcon/></a>
                  <a href="https://github.com/yassine-yahya" target="_blank" rel="noopener noreferrer" className="p-icon p-btn" style={{ width: 42, height: 42, background: "transparent", border: B, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: T.ink }}><GitHubIcon/></a>
                </div>
              </div>

              <div className="fu4" style={{ fontFamily: FM, fontSize: 12, color: T.mute, letterSpacing: "0.03em" }}>
                14+ yrs experience &nbsp;·&nbsp; 1,500+ hrs coding &nbsp;·&nbsp; 5 languages
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────────────────────────── */}
      <section id="about" style={{ padding: PAD, borderBottom: B3, background: T.panel }}>
        <div style={MAX}>
          <div ref={aboutRef}>
            <SecLabel label="ABOUT" inView={aboutInView}/>
            <SecTitle a="Finance veteran" b="turned security analyst." inView={aboutInView}/>
            <div className="p-ag" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "2.5rem", alignItems: "start" }}>
              <p style={{ fontFamily: FB, fontSize: 15, color: T.mute, lineHeight: 1.9, ...rv(aboutInView, 0.1) }}>
                With 14 years of leadership experience in the banking sector — much of it risk- and compliance-adjacent —
                I transitioned into technology to specialize in cybersecurity. I hold a Google Cybersecurity Certificate
                and am building hands-on SOC skills: log analysis, incident response, and network monitoring. My
                full-stack development and data science background supports this work directly, from automating security
                scripts in Python to visualizing detection data.
              </p>
              <Reticle accent={T.cyan} style={{ border: B, background: T.panelAlt, padding: 24, ...rv(aboutInView, 0.18) }}>
                <div style={{ fontFamily: FM, fontSize: 11, fontWeight: 600, color: T.cyan, letterSpacing: "0.15em", marginBottom: 18 }}>ANALYST PROFILE</div>
                {[["LOCATION","Barcelona, Spain"],["EMAIL","yassineyahya50@gmail.com"],["PHONE","+34 602 317 364"],["LANGUAGES","AR · FR · ES · EN · CA"],["STATUS","Open to SOC / junior analyst roles"]].map(([k,v]) => (
                  <div key={k} style={{ display: "flex", padding: "9px 0", borderBottom: `1px solid ${T.line}`, gap: 10, alignItems: "flex-start" }}>
                    <span style={{ fontFamily: FM, fontSize: 9, fontWeight: 600, color: T.mute, letterSpacing: "0.1em", width: 86, flexShrink: 0, paddingTop: 2 }}>{k}</span>
                    <span style={{ fontFamily: FB, fontSize: 13, fontWeight: 500, color: T.ink, wordBreak: "break-word" }}>{v}</span>
                  </div>
                ))}
              </Reticle>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS — accordion, collapsed by default ─────────────────────────── */}
      <section id="skills" style={{ padding: PAD, borderBottom: B3 }}>
        <div style={MAX}>
          <div ref={skillsRef}>
            <SectionHeader label="SKILLS" a="Security-first" b="technical toolkit." count={`${skillGroups.length} categories`} open={sectionsOpen.skills} onToggle={() => toggleSection("skills")} inView={skillsInView}/>
            <Collapse open={sectionsOpen.skills}>
              <div style={{ ...panelStyle }}>
                {skillGroups.map((g, gi) => (
                  <div key={g.cat} className="p-skill-row" style={{ display: "flex", alignItems: "stretch", borderBottom: gi < skillGroups.length-1 ? B : "none" }}>
                    <div className="p-skill-cat" style={{ minWidth: 175, background: T.panelAlt, borderRight: B, padding: "12px 14px", display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 6, height: 6, background: CAT_AC[gi % CAT_AC.length], flexShrink: 0 }}/>
                      <span style={{ fontFamily: FM, fontSize: 10, fontWeight: 600, color: T.ink, textTransform: "uppercase", letterSpacing: "0.05em", lineHeight: 1.4 }}>{g.cat}</span>
                    </div>
                    <div style={{ padding: "12px 14px", display: "flex", flexWrap: "wrap", gap: 7, flex: 1 }}>
                      {g.tags.map(tag => (
                        <span key={tag} className="p-tag" style={{ fontFamily: FM, fontSize: 11, fontWeight: 500, padding: "5px 11px", background: "transparent", border: `1.5px solid ${T.line}`, color: T.ink }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Collapse>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE — accordion, collapsed by default ─────────────────────── */}
      <section id="experience" style={{ padding: PAD, borderBottom: B3, background: T.panel }}>
        <div style={MAX}>
          <div ref={expRef}>
            <SectionHeader label="EXPERIENCE" a="Professional" b="journey." count={`${experience.length} roles`} open={sectionsOpen.experience} onToggle={() => toggleSection("experience")} inView={expInView}/>
            <Collapse open={sectionsOpen.experience}>
              <div className="p-eg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {experience.map((exp, i) => (
                  <div key={i} className="p-card" style={{ border: B, borderLeft: `3px solid ${EXP_AC[i % EXP_AC.length]}`, background: T.panelAlt, boxShadow: GLOW, padding: "1.2rem 1.4rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                      <div>
                        <p style={{ fontFamily: FD, fontWeight: 600, fontSize: 19, color: T.ink, margin: "0 0 3px" }}>{exp.title}</p>
                        <p style={{ fontFamily: FM, fontSize: 10, fontWeight: 500, color: T.mute, margin: 0 }}>{exp.company}</p>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
                        <span style={{ fontFamily: FM, fontSize: 9, fontWeight: 600, color: T.ink, padding: "3px 9px", border: B }}>{exp.period}</span>
                        <span style={{ fontFamily: FM, fontSize: 9, color: T.mute }}>{exp.location}</span>
                      </div>
                    </div>
                    <p style={{ fontFamily: FB, fontSize: 13, color: T.mute, lineHeight: 1.82, marginBottom: 10 }}>{exp.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                      {exp.tags.map(tag => <span key={tag} style={{ fontFamily: FM, fontSize: 10, fontWeight: 500, padding: "2px 8px", border: `1.5px solid ${T.line}`, color: T.ink }}>{tag}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </Collapse>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS — accordion, collapsed by default ──────────────────── */}
      <section id="certifications" style={{ padding: PAD, borderBottom: B3 }}>
        <div style={MAX}>
          <div ref={certRef}>
            <SectionHeader label="CERTIFICATIONS & EDUCATION" a="Credentials" b="& training." count={`${certifications.length} credentials`} open={sectionsOpen.certifications} onToggle={() => toggleSection("certifications")} inView={certInView}/>
            <Collapse open={sectionsOpen.certifications}>
              <div className="p-cg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {certifications.map((c, i) => (
                  <div key={i} className="p-card" style={{ border: B, background: c.inProgress ? "rgba(242,169,63,0.08)" : T.panel, boxShadow: GLOW, padding: "1.2rem 1.4rem", display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontFamily: FD, fontWeight: 600, fontSize: 17, color: T.ink, marginBottom: 3, lineHeight: 1.2 }}>{c.name}</p>
                        <p style={{ fontFamily: FM, fontSize: 10, fontWeight: 500, color: T.cyan, marginBottom: 10 }}>{c.org}</p>
                        <span style={{ fontFamily: FM, fontSize: 11, fontWeight: 500, color: T.ink, padding: "2px 9px", border: B }}>{c.detail}</span>
                      </div>
                      {c.inProgress && <span style={{ fontFamily: FM, fontSize: 9, fontWeight: 600, padding: "3px 8px", background: T.amber, color: T.bg, whiteSpace: "nowrap", flexShrink: 0 }}>IN PROGRESS</span>}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                      {c.skills.map(sk => <span key={sk} className="p-tag" style={{ fontFamily: FM, fontSize: 10, fontWeight: 500, padding: "2px 8px", border: `1.5px solid ${T.line}`, color: T.ink }}>{sk}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </Collapse>
          </div>
        </div>
      </section>

      {/* ── EDUCATION / WORKSHOPS + LANGUAGES — accordion ─────────────────────── */}
      <section id="education" style={{ padding: PAD, borderBottom: B3, background: T.panel }}>
        <div style={MAX}>
          <div ref={eduRef}>
            <SectionHeader label="EDUCATION" a="Workshops &" b="languages." count={`${workshops.length} workshops · ${languages.length} languages`} open={sectionsOpen.education} onToggle={() => toggleSection("education")} inView={eduInView}/>
            <Collapse open={sectionsOpen.education}>
              <div className="p-edu" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}>
                <div>
                  <div style={{ fontFamily: FM, fontSize: 10, fontWeight: 600, color: T.mute, letterSpacing: "0.15em", marginBottom: 14 }}>WORKSHOPS & MASTERCLASSES</div>
                  <div style={{ border: B }}>
                    {workshops.map((w, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 14px", background: i%2===0 ? T.panelAlt : "transparent", borderBottom: i < workshops.length-1 ? `1px solid ${T.line}` : "none" }}>
                        <span style={{ fontFamily: FB, fontSize: 13, fontWeight: 500, color: T.ink }}>{w.name}</span>
                        <span style={{ fontFamily: FM, fontSize: 10, fontWeight: 500, color: T.cyan, flexShrink: 0, marginLeft: 10 }}>{w.org}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: FM, fontSize: 10, fontWeight: 600, color: T.mute, letterSpacing: "0.15em", marginBottom: 14 }}>LANGUAGES</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {languages.map(l => (
                      <div key={l.lang} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", border: B }}>
                        <span style={{ fontFamily: FB, fontSize: 14, fontWeight: 500, color: T.ink }}>{l.lang}</span>
                        <span style={{ fontFamily: FM, fontSize: 10, fontWeight: 600, color: T.cyan, padding: "3px 10px", border: `1.5px solid ${T.line}` }}>{l.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Collapse>
          </div>
        </div>
      </section>

      {/* ── PROJECTS — accordion, collapsed by default ────────────────────────── */}
      <section id="projects" style={{ padding: PAD, borderBottom: B3 }}>
        <div style={MAX}>
          <div ref={projRef}>
            <SectionHeader label="PROJECTS" a="Things" b="I've built." count={`${projectFiles.length} projects`} open={sectionsOpen.projects} onToggle={() => toggleSection("projects")} inView={projInView}/>
            <Collapse open={sectionsOpen.projects}>
            <p style={{ fontFamily: FB, fontSize: 14, color: T.mute, marginBottom: 24 }}>Security tooling first, plus dev projects that sharpen the same skills.</p>
            <div className="p-pg" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
              {projectFiles.map((p, i) => {
                const ext = extOf(p.fileName);
                const tagColor = TAG_COLOR[p.tag];
                return (
                  <div key={p.id} className="p-card" style={{ border: B, background: T.panel, boxShadow: GLOW, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                    <div style={{ background: T.panelAlt, borderBottom: B, padding: "8px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontFamily: FM, fontSize: 10, fontWeight: 500, color: T.mute, maxWidth: "60%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.fileName}</span>
                      <span style={{ fontFamily: FM, fontSize: 9, fontWeight: 700, color: tagColor, border: `1.5px solid ${tagColor}`, padding: "1px 7px" }}>{p.tag}</span>
                    </div>
                    <div style={{ padding: "1rem 1.3rem", display: "flex", flexDirection: "column", flex: 1 }}>
                      <p style={{ fontFamily: FD, fontWeight: 600, fontSize: 18, color: T.ink, margin: "0 0 8px", lineHeight: 1.2 }}>{p.title}</p>
                      <div style={{ fontFamily: FM, fontSize: 10.5, fontWeight: 600, color: tagColor, marginBottom: 10, letterSpacing: "0.02em" }}>{p.impact}</div>
                      <p style={{ fontFamily: FB, fontSize: 13, color: T.mute, lineHeight: 1.8, margin: "0 0 12px", flex: 1 }}>{p.desc}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>
                        {p.tech.map(t => <span key={t} style={{ fontFamily: FM, fontSize: 10, fontWeight: 500, padding: "2px 8px", border: `1.5px solid ${T.line}`, color: T.ink }}>{t}</span>)}
                      </div>
                      <div style={{ borderTop: `1px solid ${T.line}`, paddingTop: 10 }}>
                        <a href={p.link} target="_blank" rel="noopener noreferrer" className="p-proj-link" style={{ fontFamily: FM, fontSize: 12, fontWeight: 600, color: T.ink, textDecoration: "none", letterSpacing: "0.03em" }}>
                          VIEW PROJECT →
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}

              <a href="https://github.com/yassine-yahya" target="_blank" rel="noopener noreferrer"
                className="p-card p-ghcard" style={{ gridColumn: "1 / -1", border: B, background: T.panel, boxShadow: GLOW, padding: "1.2rem 1.6rem", display: "flex", alignItems: "center", justifyContent: "space-between", textDecoration: "none", gap: 16, flexWrap: "wrap" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 44, height: 44, background: T.panelAlt, border: B, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: T.cyan, flexShrink: 0 }}>⬡</div>
                  <div>
                    <p style={{ fontFamily: FD, fontWeight: 600, fontSize: 19, color: T.ink, margin: "0 0 4px" }}>More on GitHub</p>
                    <p style={{ fontFamily: FB, fontSize: 13, color: T.mute, margin: 0 }}>Explore more projects, experiments, and open-source contributions</p>
                  </div>
                </div>
                <span style={{ fontFamily: FM, fontSize: 12, fontWeight: 600, color: T.cyan, whiteSpace: "nowrap" }}>github.com/yassine-yahya →</span>
              </a>
            </div>
            </Collapse>
          </div>
        </div>
      </section>

      {/* ── FOOTER / CONTACT ─────────────────────────────────────────────────── */}
      <section id="contact" style={{ padding: `3.5rem clamp(14px,3.5vw,44px) 2rem`, background: T.bg }}>
        <div style={MAX}>
          <div ref={footerRef}>
            <div className="p-fg" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr", gap: "2.5rem", marginBottom: "2.5rem" }}>
              <div style={{ ...rv(footerInView, 0) }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 30, height: 30, background: T.panelAlt, border: `1.5px solid ${T.cyan}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 16, color: T.cyan, lineHeight: 1 }}>Y</span>
                  </div>
                  <div style={{ fontFamily: FD, fontWeight: 700, fontSize: 18, color: T.ink }}>YASSINE</div>
                </div>
                <p style={{ fontFamily: FB, fontSize: 13, color: T.mute, lineHeight: 1.75, maxWidth: 230, marginBottom: 18 }}>SOC analyst in training, backed by full-stack and data science skills — building toward a security-first career.</p>
                <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                  {[{ icon: <LinkedInIcon/>, href: "https://linkedin.com/in/yassineyahya" },{ icon: <GitHubIcon/>, href: "https://github.com/yassine-yahya" }].map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="p-icon" style={{ width: 36, height: 36, background: "transparent", border: B, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: T.ink }}>{s.icon}</a>
                  ))}
                </div>
              </div>

              <div style={{ ...rv(footerInView, 0.1) }}>
                <div style={{ fontFamily: FM, fontSize: 9, fontWeight: 600, color: T.mute, letterSpacing: "0.15em", marginBottom: 16 }}>NAVIGATE</div>
                {NAV_LINKS.map(l => <button key={l} className="p-nl" onClick={() => scrollTo(l.toLowerCase())} style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontFamily: FM, fontSize: 12, fontWeight: 500, letterSpacing: "0.06em", color: T.mute, padding: "5px 0", marginBottom: 3, textAlign: "left" }}>{l.toUpperCase()}</button>)}
                <a href={LANDING_URL} target="_blank" rel="noopener noreferrer" style={{ display: "block", marginTop: 10, fontFamily: FM, fontSize: 12, fontWeight: 600, color: T.amber, textDecoration: "none" }}>FOR BUSINESSES →</a>
              </div>

              <div style={{ ...rv(footerInView, 0.2) }}>
                <div style={{ fontFamily: FM, fontSize: 9, fontWeight: 600, color: T.mute, letterSpacing: "0.15em", marginBottom: 16 }}>CONTACT</div>
                {[{ icon: "✉", val: "yassineyahya50@gmail.com" },{ icon: "☎", val: "+34 602 317 364" },{ icon: "⌖", val: "Barcelona, Spain" },{ icon: "in", val: "linkedin/yassineyahya" }].map((c, i) => (
                  <p key={i} style={{ fontFamily: FB, fontSize: 13, color: T.mute, marginBottom: 10, display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: T.cyan, flexShrink: 0, fontWeight: 600 }}>{c.icon}</span>
                    <span style={{ wordBreak: "break-all" }}>{c.val}</span>
                  </p>
                ))}
              </div>
            </div>

            <div style={{ height: 1, background: T.line, marginBottom: 16 }}/>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, ...rv(footerInView, 0.25) }}>
              <p style={{ fontFamily: FM, fontSize: 9, fontWeight: 500, color: T.mute, letterSpacing: "0.06em" }}>{"©"} 2026 YASSINE YAHYA · ALL RIGHTS RESERVED</p>
              <button onClick={() => scrollTo("home")} className="p-btn" style={{ background: "transparent", border: B, cursor: "pointer", fontFamily: FM, fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", color: T.ink, padding: "6px 16px" }}>BACK TO TOP →</button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
