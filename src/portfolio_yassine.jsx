import { useState, useEffect, useRef } from "react";
import qrImage from './assets/Qr.jpeg';

const LANDING_URL = "https://yassine-yahya.github.io/landpage2/";

// ── Icons ─────────────────────────────────────────────────────────────────────
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

// ── Design Tokens ─────────────────────────────────────────────────────────────
const T = {
  cream:  "#EDE8D5",
  paper:  "#F7F3E8",
  ink:    "#1C1916",
  red:    "#B84030",
  teal:   "#3CACA8",
  amber:  "#CC9E28",
  sage:   "#7AB87E",
  stone:  "#C8A882",
  rust:   "#C06840",
};

// FV = hero name font (same as FD — consistent with section titles)
const FV = "'Bebas Neue', cursive";
const FD = "'Bebas Neue', cursive";
const FB = "'Courier Prime', monospace";
const FM = "'Space Mono', monospace";

const B  = `2.5px solid #1C1916`;
const B3 = `3px solid #1C1916`;
const SH = `4px 4px 0 #1C1916`;
const SH2= `2px 2px 0 #1C1916`;

const CAT_BG = ["#D4A428","#3CACA8","#C8A0A0","#7AB87E","#D09870","#B09CC0"];
const EXP_AC = ["#3CACA8","#7AB87E","#D4A428","#C8A0A0","#B09CC0"];

// ── Data ──────────────────────────────────────────────────────────────────────
const skillGroups = [
  { cat: "Programming",             tags: ["Python", "JavaScript"] },
  { cat: "Web development",         tags: ["HTML", "CSS", "React.js", "Node.js", "Next.js", "Express.js", "Bootstrap", "Tailwind", "REST APIs"] },
  { cat: "Data science / analysis", tags: ["SQL", "PostgreSQL", "MongoDB", "NumPy", "Pandas", "Matplotlib", "NoSQL"] },
  { cat: "DevOps / systems",        tags: ["Git", "GitHub", "Docker", "Linux", "Bash", "Agile / Scrum", "Airtable"] },
  { cat: "Security",                tags: ["SIEM (SOC)", "Wireshark", "Nmap", "Metasploit", "Incident Response", "OAuth", "JWT"] },
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
  { name: "Education & Innovation",               org: "International Training Center, Prague", detail: "1 Week · May 2026",   inProgress: false, skills: ["AI Tools for Education","Flipped Classroom","Digital Learning","Project-Based Learning","Instructional Design","Collaborative Learning","Educational Technology","Innovation in Education"] },
  { name: "Data Science Professional",            org: "IBM / Coursera",                        detail: "In progress",          inProgress: true,  skills: ["Python","NumPy","Pandas","Matplotlib","Machine Learning","SQL","Data Analysis","Jupyter"] },
  { name: "IT Fundamentals",                      org: "IBM",                                   detail: "40h · Feb 2025",       inProgress: false, skills: ["Cloud Basics","Networking","Security Fundamentals","DevOps","Operating Systems"] },
  { name: "Cybersecurity Professional",           org: "Google / Coursera",                     detail: "120h · Dec 2024",      inProgress: false, skills: ["SIEM","Incident Response","Network Security","Linux","Threat Analysis","Risk Assessment"] },
  { name: "Full-Stack Web Developer",             org: "MigraCode Barcelona",                   detail: "700h · 2023–2024",     inProgress: false, skills: ["HTML/CSS","JavaScript","React.js","Node.js","Express.js","MongoDB","PostgreSQL","Git","Agile"] },
  { name: "IT Automation with Python",            org: "Google / Coursera",                     detail: "60h · Nov 2023",       inProgress: false, skills: ["Python","Bash Scripting","Git","REST APIs","Regular Expressions","Config Management"] },
  { name: "Brevet Bancaire – Chargé de Clientèle", org: "BMCE Bank Academy",                   detail: "200h · 2016–2017",     inProgress: false, skills: ["Financial Analysis","Client Management","Risk Assessment","Banking Operations","Compliance"] },
  { name: "IT Management Technician",             org: "ITG Morocco",                           detail: "2003–2005",            inProgress: false, skills: ["Hardware","Networking","Database Management","System Administration","IT Support"] },
];
const workshops = [
  { name: "Masterclass Astro",           org: "Porsche Digital"  },
  { name: "Hackday Netlify / Gatsby",    org: "RedHat"           },
  { name: "UI/UX Design in Figma",       org: "Porsche Digital"  },
  { name: "Testing CI/CD Pipeline",      org: "New Relic"        },
  { name: "TensorFlow.js",               org: "Porsche Digital"  },
  { name: "Object-Oriented Programming", org: "Barcelona Activa" },
];
const languages = [
  { lang: "Arabic",  level: "Native",           pct: 100 },
  { lang: "French",  level: "Professional",      pct: 90  },
  { lang: "Spanish", level: "Professional",      pct: 88  },
  { lang: "English", level: "Professional",      pct: 85  },
  { lang: "Catalan", level: "Basic – Level 3",   pct: 30  },
];
const stats = [
  { to: 1200, suffix: "+", label: "Hours of Learning", bg: T.amber },
  { to: 1500, suffix: "+", label: "Hours of Coding",   bg: T.teal  },
  { to: 14,   suffix: "+", label: "Years Experience",  bg: T.stone },
  { to: 5,    suffix: "",  label: "Languages Spoken",  bg: T.sage  },
];
const projectFiles = [
  { id:1, fileName:"PortHunter.js",           title:"PortHunter",                      tech:["Express.js","Python","Nmap","JavaScript","Vercel"],   link:"https://porthunter.vercel.app/",                               desc:"Network port scanner that detects open/closed ports and security protocols. Built with React, Node.js and Python — requires admin privileges to run the scan." },
  { id:2, fileName:"Socket-Server-Client.py", title:"Socket Server-Client Messaging",  tech:["Socket","Python"],                                    link:"https://github.com/yassine-yahya/socket-server-client-python", desc:"Python messaging app using sockets for communication between a server and multiple clients. Demonstrates core network programming and can be extended for cybersecurity use." },
  { id:3, fileName:"web-scraping.py",         title:"Web Scraping & Security Headers", tech:["BeautifulSoup4","Colorama","Python"],                 link:"https://github.com/yassine-yahya/web-scraping-Bs4-Requests",   desc:"Scrapes a target URL, checks for HTTP security headers presence, and extracts page title and links. Useful for quick security audits of web pages." },
  { id:4, fileName:"ssh-connection.py",       title:"SSH Connection Script",           tech:["Python","Colorama","Paramiko"],                       link:"https://github.com/yassine-yahya/ssh-access-paramiko",         desc:"Automates SSH connections using Paramiko and handles common SSH errors gracefully. Clean CLI output with Colorama highlighting." },
  { id:5, fileName:"card-pairs-game.js",      title:"Card Pairs Game",                 tech:["JavaScript","HTML","CSS","GitHub Pages"],             link:"https://yassine-yahya.github.io/card-pairs-game/",             desc:"Memory matching game where players flip cards to find matching pairs. Pure vanilla JS with smooth flip animations." },
  { id:6, fileName:"guess-pin.js",            title:"Guess The PIN",                   tech:["JavaScript","HTML","CSS","GitHub Pages"],             link:"https://yassine-yahya.github.io/guess-pin/",                   desc:"Interactive number guessing game. Players try to guess a randomly generated 4-digit number with unique digits. Built with vanilla JS." },
  { id:7, fileName:"nmap-scanner.py",         title:"Nmap Scanner with Python",        tech:["Nmap","Colorama","Python"],                           link:"https://github.com/yassine-yahya/port-scanner-python-nmap",    desc:"Uses Nmap to scan a target for open ports and services. Highlights results with Colorama for readability. Runs an automated scan every 5 seconds." },
];
const EXT_COLOR = { js: T.amber, py: T.teal, github: T.sage };
const extOf = (fn) => fn.startsWith(".") ? "github" : fn.split(".").pop();
const NAV_LINKS = ["Home", "Skills", "Experience", "Projects", "Certifications", "Contact"];
const EXP_PREVIEW  = 2;
const CERT_PREVIEW = 3;
const PROJ_PREVIEW = 2;

// ── Hooks ─────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef(null); const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.unobserve(el); } }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, []); return [ref, inView];
}
function Counter({ to, suffix = "", duration = 1400, inView }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf; const t0 = performance.now();
    const run = (t) => { const p = Math.min((t-t0)/duration, 1); setN(Math.round((1-Math.pow(1-p,3))*to)); if (p<1) raf=requestAnimationFrame(run); else setN(to); };
    raf = requestAnimationFrame(run); return () => cancelAnimationFrame(raf);
  }, [inView]); return <>{n}{suffix}</>;
}
function GaugeBar({ lang, level, pct, visible, delay = 0 }) {
  const [w, setW] = useState(0);
  useEffect(() => { if (!visible) return; const t = setTimeout(() => setW(pct), delay*1000+80); return () => clearTimeout(t); }, [visible, pct, delay]);
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
        <span style={{ fontFamily: FB, fontSize: 14, fontWeight: "700", color: T.ink }}>{lang}</span>
        <span style={{ fontFamily: FM, fontSize: 10, color: T.ink, opacity: 0.6 }}>{level}</span>
      </div>
      <div style={{ height: 14, background: T.paper, border: B, position: "relative", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${w}%`, background: T.teal, transition: "width 0.9s ease" }}/>
        {[25,50,75].map(t => <div key={t} style={{ position: "absolute", top: 0, left: `${t}%`, width: 1.5, height: "100%", background: T.ink, opacity: 0.18 }}/>)}
      </div>
    </div>
  );
}

const rv = (inView, delay = 0, dir = "up") => ({
  opacity: inView ? 1 : 0,
  transform: inView ? "none" : dir==="up" ? "translateY(16px)" : dir==="left" ? "translateX(-12px)" : "scale(0.97)",
  transition: `opacity .45s ${delay}s ease, transform .45s ${delay}s ease`,
});

const SecLabel = ({ label, inView }) => (
  <div style={{ marginBottom: 12, ...rv(inView, 0, "left") }}>
    <span style={{ fontFamily: FM, fontSize: 10, fontWeight: "700", color: T.ink, letterSpacing: "0.22em", background: T.amber, padding: "4px 14px", border: B, display: "inline-block" }}>{label}</span>
  </div>
);
const SecTitle = ({ a, b, inView }) => (
  <h2 style={{ fontFamily: FD, fontSize: "clamp(38px,5.5vw,62px)", lineHeight: 1.02, marginBottom: 28, color: T.ink, letterSpacing: "0.04em", ...rv(inView, 0.04) }}>
    {a}<br/><span style={{ color: T.red }}>{b}</span>
  </h2>
);

// ── Show-More button ──────────────────────────────────────────────────────────
const ShowMoreBtn = ({ label, onClick }) => (
  <div style={{ display: "flex", justifyContent: "center", marginTop: 18 }}>
    <button onClick={onClick} className="p-btn" style={{ fontFamily: FD, fontSize: 20, letterSpacing: "0.08em", padding: "9px 28px", background: T.paper, border: B, color: T.ink, cursor: "pointer" }}>
      {label}
    </button>
  </div>
);

// ── PORTFOLIO ─────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [scrolled,      setScrolled]      = useState(false);
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [scrollPct,     setScrollPct]     = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [showAllExp,    setShowAllExp]    = useState(false);
  const [showAllCert,   setShowAllCert]   = useState(false);
  const [showAllProj,   setShowAllProj]   = useState(false);
  const mobileRef = useRef(null);

  const [heroStatsRef, heroStatsInView] = useInView(0.3);
  const [aboutRef,     aboutInView]     = useInView(0.1);
  const [skillsRef,    skillsInView]    = useInView(0.08);
  const [expRef,       expInView]       = useInView(0.06);
  const [projRef,      projInView]      = useInView(0.08);
  const [certRef,      certInView]      = useInView(0.08);
  const [eduRef,       eduInView]       = useInView(0.08);
  const [ctaRef,       ctaInView]       = useInView(0.15);
  const [footerRef,    footerInView]    = useInView(0.08);

  const visibleExp  = showAllExp  ? experience     : experience.slice(0, EXP_PREVIEW);
  const visibleCert = showAllCert ? certifications : certifications.slice(0, CERT_PREVIEW);
  const visibleProj = showAllProj ? projectFiles   : projectFiles.slice(0, PROJ_PREVIEW);

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=Space+Mono:wght@400;700&display=swap');
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      html{scroll-behavior:smooth}
      body{background:#EDE8D5}
      ::-webkit-scrollbar{width:7px}
      ::-webkit-scrollbar-track{background:#EDE8D5;border-left:2px solid #1C1916}
      ::-webkit-scrollbar-thumb{background:#1C1916}
      @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
      @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(5px)}}
      .fu0{animation:fadeUp .5s .00s both}.fu1{animation:fadeUp .5s .10s both}
      .fu2{animation:fadeUp .5s .20s both}.fu3{animation:fadeUp .5s .30s both}
      .fu4{animation:fadeUp .5s .42s both}.fi{animation:fadeIn .7s both}
      .p-bounce{animation:bounce 2s ease-in-out infinite}
      .p-btn{box-shadow:${SH};transition:transform .08s,box-shadow .08s !important}
      .p-btn:hover{transform:translate(2px,2px) !important;box-shadow:${SH2} !important}
      .p-btn:active{transform:translate(4px,4px) !important;box-shadow:none !important}
      .p-card{box-shadow:${SH};transition:transform .15s,box-shadow .15s !important}
      .p-card:hover{transform:translate(2px,2px) !important;box-shadow:${SH2} !important}
      .p-tag{transition:background .08s,color .08s !important;cursor:default}
      .p-tag:hover{background:#1C1916 !important;color:#EDE8D5 !important}
      .p-nl:hover{color:#1C1916 !important}
      .p-icon:hover{background:#1C1916 !important;color:#EDE8D5 !important}
      .p-chip:hover{background:#1C1916 !important;color:#F7F3E8 !important}
      .p-proj-link:hover{color:${T.red} !important}
      .p-dnav{display:flex}.p-burger{display:none;flex-direction:column}
      @media(max-width:900px){
        .p-dnav{display:none !important}.p-burger{display:flex !important}
        .p-hero-grid{grid-template-columns:1fr !important}
        .p-ag{grid-template-columns:1fr !important}.p-eg{grid-template-columns:1fr !important}
        .p-cg{grid-template-columns:1fr !important}.p-edu{grid-template-columns:1fr !important}
        .p-pg{grid-template-columns:1fr !important}.p-fg{grid-template-columns:1fr !important}
        .p-sg{grid-template-columns:repeat(2,1fr) !important}
        .p-cta-r{flex-direction:column !important;align-items:flex-start !important}
        .p-bizt{font-size:38px !important}
        .p-ghcard{grid-column:span 1 !important;flex-direction:column !important}
        .p-htitle{font-size:56px !important}
        .p-skill-row{flex-direction:column !important}
        .p-skill-cat{min-width:unset !important;border-right:none !important;border-bottom:2.5px solid #1C1916 !important}
      }
      @media(max-width:480px){.p-htitle{font-size:44px !important}.p-bizt{font-size:30px !important}}
    `;
    document.head.appendChild(s);
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
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

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); setMenuOpen(false); };
  const PAD = "3.5rem clamp(14px,3.5vw,44px)";
  const MAX = { maxWidth: 1040, margin: "0 auto" };

  return (
    <div style={{ background: T.cream, color: T.ink, minHeight: "100vh", fontFamily: FB }}>

      {/* ── PROGRESS BAR ─────────────────────────────────────────────────────── */}
      <div style={{ position: "fixed", top: 0, left: 0, height: 2.5, width: `${scrollPct}%`, background: T.ink, zIndex: 9999, transition: "width .1s" }}/>

      {/* ── NAV ──────────────────────────────────────────────────────────────── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: T.cream, borderBottom: B3, padding: "0 clamp(14px,3.5vw,44px)", height: 58, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, background: T.red, border: B, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontFamily: FD, fontSize: 22, color: T.cream, lineHeight: 1 }}>Y</span>
          </div>
          <div style={{ fontFamily: FD, fontSize: 24, color: T.ink, letterSpacing: "0.1em", lineHeight: 1 }}>YASSINE</div>
          <div style={{ fontFamily: FM, fontSize: 8, fontWeight: "700", color: T.red, letterSpacing: "0.1em", borderLeft: `2px solid ${T.ink}`, paddingLeft: 8, lineHeight: 1.4, opacity: 0.8 }}>WEB DEV<br/>DATA SCI</div>
        </div>

        <div className="p-dnav" style={{ alignItems: "center", gap: 2 }}>
          {NAV_LINKS.map(l => {
            const isActive = activeSection === l.toLowerCase();
            return <button key={l} className="p-nl" onClick={() => scrollTo(l.toLowerCase())} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: FM, fontSize: 11, fontWeight: "700", letterSpacing: "0.1em", color: isActive ? T.ink : "#7A7060", padding: "6px 12px", borderBottom: `2.5px solid ${isActive ? T.ink : "transparent"}`, transition: "border-color .12s, color .12s" }}>{l.toUpperCase()}</button>;
          })}
          <a href={LANDING_URL} target="_blank" rel="noopener noreferrer" className="p-btn" style={{ fontFamily: FD, fontSize: 18, letterSpacing: "0.08em", padding: "7px 18px", background: T.amber, color: T.ink, textDecoration: "none", marginLeft: 14, border: B }}>
            PARA TU NEGOCIO
          </a>
        </div>

        <button ref={mobileRef} className="p-burger" onClick={e => { e.stopPropagation(); setMenuOpen(o => !o); }} style={{ background: "none", border: B, cursor: "pointer", padding: 8, gap: 5 }}>
          <div style={{ width: 20, height: 2, background: T.ink, transition: "all .3s", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }}/>
          <div style={{ width: 20, height: 2, background: T.ink, opacity: menuOpen ? 0 : 1, transition: "opacity .3s" }}/>
          <div style={{ width: 20, height: 2, background: T.ink, transition: "all .3s", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }}/>
        </button>

        {menuOpen && (
          <div style={{ position: "absolute", top: 58, left: 0, right: 0, background: T.cream, borderBottom: B3, padding: "8px 24px 24px", zIndex: 99 }}>
            {NAV_LINKS.map(l => <button key={l} onClick={() => scrollTo(l.toLowerCase())} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", borderBottom: `2px solid ${T.ink}`, cursor: "pointer", fontFamily: FM, fontSize: 12, fontWeight: "700", letterSpacing: "0.1em", color: T.ink, padding: "12px 0" }}>{l.toUpperCase()}</button>)}
            <a href={LANDING_URL} target="_blank" rel="noopener noreferrer" className="p-btn" style={{ display: "inline-block", marginTop: 16, fontFamily: FD, fontSize: 20, padding: "8px 20px", background: T.amber, color: T.ink, textDecoration: "none", border: B }}>PARA TU NEGOCIO</a>
          </div>
        )}
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section id="home" style={{ borderBottom: B3, padding: `4rem clamp(14px,3.5vw,44px)` }}>
        <div style={{ ...MAX }}>
          <div className="p-hero-grid" style={{ display: "grid", gridTemplateColumns: "1.45fr 1fr", gap: 32, alignItems: "start" }}>
            <div>
              <div className="fi" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.sage, border: B, padding: "4px 16px", marginBottom: 24 }}>
                <div style={{ width: 7, height: 7, background: T.ink, borderRadius: "50%", flexShrink: 0 }}/>
                <span style={{ fontFamily: FM, fontSize: 10, fontWeight: "700", letterSpacing: "0.16em", color: T.ink }}>AVAILABLE · BARCELONA, SPAIN</span>
              </div>

              {/* ── Hero name: Bebas Neue — consistent with section titles ─────── */}
              <div className="fu0 p-htitle" style={{ fontFamily: FV, fontSize: "clamp(64px,9.5vw,70px)", color: T.ink, lineHeight: .9, letterSpacing: "0.04em" }}>YASSINE</div>
              <div className="fu0 p-htitle" style={{ fontFamily: FV, fontSize: "clamp(64px,9.5vw,70px)", color: T.red, lineHeight: .9, letterSpacing: "0.04em", marginBottom: 24 }}>YAHYA</div>

              <div className="fu1" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 32, height: 3, background: T.ink }}/>
                <span style={{ fontFamily: FD, fontSize: 20, letterSpacing: "0.16em", color: T.ink }}>WEB DEVELOPMENT · DATA SCIENCE</span>
              </div>

              <p className="fu2" style={{ fontFamily: FB, fontSize: 15, lineHeight: 1.85, color: T.ink, maxWidth: 520, marginBottom: 28, opacity: 0.75 }}>
                Data Science Specialist with experience in Digital Training and Web Programming Management — helping organizations make data-driven decisions, develop technical talent, and deliver reliable web solutions.
              </p>

              <div className="fu3 p-cta-r" style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginBottom: 26 }}>
                <button onClick={() => scrollTo("projects")} className="p-btn" style={{ fontFamily: FD, fontSize: 22, letterSpacing: "0.08em", padding: "9px 26px", background: T.teal, border: B, color: T.ink, cursor: "pointer" }}>VIEW PROJECTS</button>
                <a href="mailto:yassineyahya50@gmail.com" className="p-btn" style={{ fontFamily: FD, fontSize: 22, letterSpacing: "0.08em", padding: "9px 26px", background: T.paper, border: B, color: T.ink, textDecoration: "none" }}>GET IN TOUCH</a>
                <div style={{ display: "flex", gap: 8 }}>
                  <a href="https://linkedin.com/in/yassineyahya" target="_blank" rel="noopener noreferrer" className="p-icon p-btn" style={{ width: 42, height: 42, background: T.paper, border: B, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: T.ink, transition: "all .08s" }}><LinkedInIcon/></a>
                  <a href="https://github.com/yassine-yahya" target="_blank" rel="noopener noreferrer" className="p-icon p-btn" style={{ width: 42, height: 42, background: T.paper, border: B, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: T.ink, transition: "all .08s" }}><GitHubIcon/></a>
                </div>
              </div>

              <div className="fu4" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Español","English","Français","العربية","Català"].map(l => (
                  <span key={l} className="p-chip" style={{ fontFamily: FB, fontSize: 13, fontWeight: "700", color: T.ink, padding: "5px 14px", border: B, background: T.paper, transition: "all .1s", cursor: "default" }}>{l}</span>
                ))}
              </div>
            </div>

            <div>
              <div ref={heroStatsRef} style={{ border: B3, display: "grid", gridTemplateColumns: "1fr 1fr", marginBottom: 14 }}>
                {stats.map((s, i) => (
                  <div key={s.label} style={{ padding: "20px 14px", textAlign: "center", background: s.bg, borderRight: i%2===0 ? B3 : "none", borderBottom: i<2 ? B3 : "none", ...rv(heroStatsInView, i*0.09) }}>
                    <div style={{ fontFamily: FD, fontSize: "clamp(2.4rem,4.8vw,3.6rem)", color: T.ink, lineHeight: 1 }}>
                      <Counter to={s.to} suffix={s.suffix} inView={heroStatsInView} duration={1200+i*100}/>
                    </div>
                    <div style={{ fontFamily: FM, fontSize: 9, fontWeight: "700", color: T.ink, letterSpacing: "0.12em", marginTop: 5, opacity: 0.75 }}>{s.label.toUpperCase()}</div>
                  </div>
                ))}
              </div>
              <div style={{ border: B, background: T.paper, padding: "11px 16px", display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                <span style={{ color: T.teal, fontSize: 16, animation: "spin 5s linear infinite", display: "inline-block", flexShrink: 0, marginTop: 1 }}>↻</span>
                <span style={{ fontFamily: FB, fontSize: 12, color: T.ink, lineHeight: 1.6, opacity: 0.8 }}>This portfolio is <strong>always evolving</strong> — new projects, skills and experiences.</span>
              </div>
              <div className="p-bounce" onClick={() => scrollTo("about")} style={{ border: B, background: T.paper, padding: "10px 16px", display: "flex", justifyContent: "center", alignItems: "center", gap: 8, cursor: "pointer", opacity: 0.5 }}>
                <span style={{ fontFamily: FM, fontSize: 9, fontWeight: "700", letterSpacing: "0.16em", color: T.ink }}>SCROLL DOWN</span>
                <span style={{ color: T.ink, fontSize: 14 }}>↓</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────────── */}
      <section id="about" style={{ padding: PAD, borderBottom: B3, background: T.paper }}>
        <div style={MAX}>
          <div ref={aboutRef}>
            <SecLabel label="ABOUT" inView={aboutInView}/>
            <SecTitle a="Finance veteran" b="turned Digital Specialist & Trainer." inView={aboutInView}/>
            <div className="p-ag" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "2.5rem", alignItems: "start" }}>
              <p style={{ fontFamily: FB, fontSize: 15, color: T.ink, lineHeight: 1.9, opacity: 0.78, ...rv(aboutInView, 0.1) }}>
With 14 years of leadership experience in the banking sector, I transitioned into technology to specialize in Data Science, Digital Training, and Web Programming Management. I combine analytical thinking, technical expertise, and leadership to develop data-driven solutions, lead digital projects, and empower learners through technology.              </p>
              <div style={{ border: B, background: T.amber, padding: 24, boxShadow: SH, ...rv(aboutInView, 0.18) }}>
                <div style={{ fontFamily: FD, fontSize: 28, color: T.ink, letterSpacing: "0.06em", marginBottom: 18 }}>FICHA TECNICA</div>
                {[["LOCATION","Barcelona, Spain"],["EMAIL","yassineyahya50@gmail.com"],["PHONE","+34 602 317 364"],["LANGUAGES","AR · FR · ES · EN · CA"],["STATUS","Open to opportunities"]].map(([k,v]) => (
                  <div key={k} style={{ display: "flex", padding: "9px 0", borderBottom: `1.5px solid rgba(28,25,22,0.2)`, gap: 10, alignItems: "flex-start" }}>
                    <span style={{ fontFamily: FM, fontSize: 9, fontWeight: "700", color: T.ink, letterSpacing: "0.1em", width: 86, flexShrink: 0, paddingTop: 2, opacity: 0.7 }}>{k}</span>
                    <span style={{ fontFamily: FB, fontSize: 13, fontWeight: "700", color: T.ink, wordBreak: "break-word" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ─── data chart + tags ─────────────────────────────────────── */}
      <section id="skills" style={{ padding: PAD, borderBottom: B3 }}>
        <div style={MAX}>
          <div ref={skillsRef}>
            <SecLabel label="SKILLS" inView={skillsInView}/>
            <SecTitle a="Technical" b="toolkit." inView={skillsInView}/>

            {/* ── Tags table ────────────────────────────────────────────────── */}
            <div style={{ border: B3 }}>
              {skillGroups.map((g, gi) => (
                <div key={g.cat} className="p-skill-row" style={{ display: "flex", alignItems: "stretch", borderBottom: gi < skillGroups.length-1 ? B3 : "none", ...rv(skillsInView, 0.1+gi*0.05) }}>
                  <div className="p-skill-cat" style={{ minWidth: 155, background: CAT_BG[gi], borderRight: B3, padding: "11px 14px", display: "flex", alignItems: "center" }}>
                    <span style={{ fontFamily: FM, fontSize: 10, fontWeight: "700", color: T.ink, textTransform: "uppercase", letterSpacing: "0.05em", lineHeight: 1.4, opacity: 0.85 }}>{g.cat}</span>
                  </div>
                  <div style={{ padding: "11px 14px", display: "flex", flexWrap: "wrap", gap: 7, flex: 1, background: T.paper }}>
                    {g.tags.map((tag, ti) => (
                      <span key={tag} className="p-tag" style={{ fontFamily: FM, fontSize: 11, fontWeight: "700", padding: "4px 10px", background: T.cream, border: `2px solid ${T.ink}`, color: T.ink, opacity: skillsInView ? 1 : 0, transform: skillsInView ? "none" : "translateY(6px)", transition: `opacity .35s ${0.12+gi*.05+ti*.022}s ease, transform .35s ${0.12+gi*.05+ti*.022}s ease, background .08s, color .08s` }}>{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ───────────────────────────────────────────────────────── */}
      <section id="experience" style={{ padding: PAD, borderBottom: B3, background: T.paper }}>
        <div style={MAX}>
          <div ref={expRef}>
            <SecLabel label="EXPERIENCE" inView={expInView}/>
            <SecTitle a="Professional" b="journey." inView={expInView}/>
            <div className="p-eg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {visibleExp.map((exp, i) => (
                <div key={i} className="p-card" style={{ border: B, background: T.cream, padding: "1.2rem 1.4rem", borderTop: `6px solid ${EXP_AC[i]}`, ...rv(expInView, 0.07+i*0.08) }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                    <div>
                      <p style={{ fontFamily: FD, fontSize: 20, color: T.ink, margin: "0 0 3px", letterSpacing: "0.04em" }}>{exp.title.toUpperCase()}</p>
                      <p style={{ fontFamily: FM, fontSize: 10, fontWeight: "700", color: T.red, margin: 0, opacity: 0.9 }}>{exp.company}</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
                      <span style={{ fontFamily: FM, fontSize: 9, fontWeight: "700", color: T.ink, padding: "2px 8px", background: T.paper, border: `2px solid ${T.ink}` }}>{exp.period}</span>
                      <span style={{ fontFamily: FM, fontSize: 9, color: T.ink, opacity: 0.5 }}>{exp.location}</span>
                    </div>
                  </div>
                  <p style={{ fontFamily: FB, fontSize: 13, color: T.ink, lineHeight: 1.82, marginBottom: 10, opacity: 0.72 }}>{exp.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {exp.tags.map(tag => <span key={tag} style={{ fontFamily: FM, fontSize: 10, fontWeight: "700", padding: "2px 8px", border: `2px solid ${T.ink}`, color: T.ink, background: `${EXP_AC[i]}60` }}>{tag}</span>)}
                  </div>
                </div>
              ))}
            </div>
            {!showAllExp && (
              <ShowMoreBtn label={`SHOW ${experience.length - EXP_PREVIEW} MORE POSITIONS`} onClick={() => setShowAllExp(true)}/>
            )}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ───────────────────────────────────────────────────── */}
      <section id="certifications" style={{ padding: PAD, borderBottom: B3 }}>
        <div style={MAX}>
          <div ref={certRef}>
            <SecLabel label="CERTIFICATIONS & EDUCATION" inView={certInView}/>
            <SecTitle a="Credentials" b="& training." inView={certInView}/>
            <div className="p-cg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {visibleCert.map((c, i) => (
                <div key={i} className="p-card" style={{ border: B, background: c.inProgress ? `${T.amber}40` : T.paper, padding: "1.2rem 1.4rem", borderTop: `5px solid ${c.inProgress ? T.amber : T.teal}`, display: "flex", flexDirection: "column", gap: 10, ...rv(certInView, 0.06+i*0.05, "scale") }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: FD, fontSize: 18, color: T.ink, marginBottom: 3, lineHeight: 1.2, letterSpacing: "0.03em" }}>{c.name.toUpperCase()}</p>
                      <p style={{ fontFamily: FM, fontSize: 10, fontWeight: "700", color: T.red, marginBottom: 10, opacity: 0.85 }}>{c.org}</p>
                      <span style={{ fontFamily: FM, fontSize: 11, fontWeight: "700", color: T.ink, background: T.cream, padding: "2px 8px", border: `2px solid ${T.ink}` }}>{c.detail}</span>
                    </div>
                    {c.inProgress && <span style={{ fontFamily: FM, fontSize: 9, fontWeight: "700", padding: "3px 8px", background: T.amber, border: `2px solid ${T.ink}`, color: T.ink, whiteSpace: "nowrap", flexShrink: 0 }}>IN PROGRESS</span>}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {c.skills.map(sk => <span key={sk} className="p-tag" style={{ fontFamily: FM, fontSize: 10, fontWeight: "700", padding: "2px 8px", border: `2px solid ${T.ink}`, color: T.ink, background: T.cream }}>{sk}</span>)}
                  </div>
                </div>
              ))}
            </div>
            {!showAllCert && (
              <ShowMoreBtn label={`SHOW ${certifications.length - CERT_PREVIEW} MORE CERTIFICATIONS`} onClick={() => setShowAllCert(true)}/>
            )}
          </div>
        </div>
      </section>

      {/* ── EDUCATION / WORKSHOPS + LANGUAGES ────────────────────────────────── */}
      <section id="education" style={{ padding: PAD, borderBottom: B3, background: T.paper }}>
        <div style={MAX}>
          <div ref={eduRef}>
            <SecLabel label="EDUCATION" inView={eduInView}/>
            <SecTitle a="Workshops &" b="languages." inView={eduInView}/>
            <div className="p-edu" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}>
              <div style={{ ...rv(eduInView, 0.08) }}>
                <div style={{ fontFamily: FM, fontSize: 9, fontWeight: "700", color: T.ink, letterSpacing: "0.18em", marginBottom: 14, opacity: 0.6 }}>WORKSHOPS & MASTERCLASSES</div>
                <div style={{ border: B3 }}>
                  {workshops.map((w, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 14px", background: i%2===0 ? T.cream : T.paper, borderBottom: i < workshops.length-1 ? B : "none", opacity: eduInView ? 1 : 0, transform: eduInView ? "none" : "translateX(-10px)", transition: `opacity .4s ${0.1+i*.07}s ease, transform .4s ${0.1+i*.07}s ease` }}>
                      <span style={{ fontFamily: FB, fontSize: 13, fontWeight: "700", color: T.ink }}>{w.name}</span>
                      <span style={{ fontFamily: FM, fontSize: 10, fontWeight: "700", color: T.red, flexShrink: 0, marginLeft: 10, opacity: 0.85 }}>{w.org}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ ...rv(eduInView, 0.14) }}>
                <div style={{ fontFamily: FM, fontSize: 9, fontWeight: "700", color: T.ink, letterSpacing: "0.18em", marginBottom: 18, opacity: 0.6 }}>LANGUAGES</div>
                {languages.map((l, i) => <GaugeBar key={l.lang} lang={l.lang} level={l.level} pct={l.pct} visible={eduInView} delay={0.08+i*0.1}/>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────────── */}
      <section id="projects" style={{ padding: PAD, borderBottom: B3 }}>
        <div style={MAX}>
          <div ref={projRef}>
            <SecLabel label="PROJECTS" inView={projInView}/>
            <SecTitle a="Things" b="I've built." inView={projInView}/>
            <p style={{ fontFamily: FB, fontSize: 14, color: T.ink, marginBottom: 24, opacity: 0.65, marginTop: -20, ...rv(projInView, 0.06) }}>Projects to practice, explore new technologies, and sharpen my skills.</p>
            <div className="p-pg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {visibleProj.map((p, i) => {
                const ext = extOf(p.fileName);
                const extColor = EXT_COLOR[ext] || T.amber;
                return (
                  <div key={p.id} className="p-card" style={{ border: B, background: T.paper, display: "flex", flexDirection: "column", overflow: "hidden", ...rv(projInView, 0.07+i*0.07) }}>
                    <div style={{ background: extColor, borderBottom: B, padding: "7px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 7, height: 7, background: T.ink, borderRadius: "50%", flexShrink: 0, opacity: 0.7 }}/>
                        <span style={{ fontFamily: FM, fontSize: 10, fontWeight: "700", color: T.ink, maxWidth: "70%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", opacity: 0.85 }}>{p.fileName}</span>
                      </div>
                      <span style={{ fontFamily: FM, fontSize: 9, fontWeight: "700", color: T.ink, background: T.cream, border: `2px solid ${T.ink}`, padding: "1px 6px" }}>{ext==="github"?"GIT":ext.toUpperCase()}</span>
                    </div>
                    <div style={{ padding: "1rem 1.3rem", display: "flex", flexDirection: "column", flex: 1 }}>
                      <p style={{ fontFamily: FD, fontSize: 20, color: T.ink, margin: "0 0 8px", lineHeight: 1.15, letterSpacing: "0.04em" }}>{p.title.toUpperCase()}</p>
                      <p style={{ fontFamily: FB, fontSize: 13, color: T.ink, lineHeight: 1.8, margin: "0 0 12px", opacity: 0.72, flex: 1 }}>{p.desc}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>
                        {p.tech.map(t => <span key={t} style={{ fontFamily: FM, fontSize: 10, fontWeight: "700", padding: "2px 8px", border: `2px solid ${T.ink}`, color: T.ink, background: T.cream }}>{t}</span>)}
                      </div>
                      <div style={{ borderTop: `2px solid ${T.ink}`, paddingTop: 10 }}>
                        <a href={p.link} target="_blank" rel="noopener noreferrer" className="p-proj-link" style={{ fontFamily: FD, fontSize: 19, color: T.ink, textDecoration: "none", letterSpacing: "0.05em", borderBottom: `2px solid ${T.ink}`, paddingBottom: 1, transition: "color .12s" }}>
                          VIEW PROJECT →
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* GitHub card — always visible */}
              <a href="https://github.com/yassine-yahya" target="_blank" rel="noopener noreferrer"
                className="p-card p-ghcard" style={{ gridColumn: "span 2", border: B, borderTop: `6px solid ${T.ink}`, background: T.paper, padding: "1.2rem 1.6rem", display: "flex", alignItems: "center", justifyContent: "space-between", textDecoration: "none", gap: 16 }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 46, height: 46, background: T.ink, border: B, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: T.cream, flexShrink: 0 }}>⬡</div>
                  <div>
                    <p style={{ fontFamily: FD, fontSize: 22, color: T.ink, margin: "0 0 4px", letterSpacing: "0.04em" }}>MORE ON GITHUB</p>
                    <p style={{ fontFamily: FB, fontSize: 13, color: T.ink, margin: 0, opacity: 0.65 }}>Explore more projects, experiments, and open-source contributions</p>
                  </div>
                </div>
                <span style={{ fontFamily: FD, fontSize: 18, color: T.ink, whiteSpace: "nowrap", letterSpacing: "0.05em", borderBottom: `2px solid ${T.ink}`, paddingBottom: 1 }}>github.com/yassine-yahya →</span>
              </a>
            </div>

            {!showAllProj && (
              <ShowMoreBtn label={`SHOW ${projectFiles.length - PROJ_PREVIEW} MORE PROJECTS`} onClick={() => setShowAllProj(true)}/>
            )}
          </div>
        </div>
      </section>

      {/* ── BUSINESS CTA ─────────────────────────────────────────────────────── */}
      <section style={{ background: T.ink, padding: "5.5rem clamp(14px,3.5vw,44px)", borderBottom: B3, textAlign: "center" }}>
        <div ref={ctaRef} style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24, background: T.teal, border: `2.5px solid ${T.cream}`, padding: "4px 16px", ...rv(ctaInView, 0) }}>
            <div style={{ width: 5, height: 5, background: T.cream }}/>
            <span style={{ fontFamily: FM, fontSize: 9, fontWeight: "700", letterSpacing: "0.2em", color: T.cream }}>FOR BUSINESSES</span>
          </div>
          <h2 className="p-bizt" style={{ fontFamily: FD, fontSize: "clamp(36px,6.5vw,72px)", lineHeight: 1.05, color: T.cream, marginBottom: 20, letterSpacing: "0.03em", ...rv(ctaInView, 0.08) }}>
            YOU NEED A WEBSITE<br/>OR DIGITAL SOLUTIONS?<br/>
            <span style={{ color: T.teal }}>LET'S BUILD SOMETHING</span><br/>
            <span style={{ color: T.amber }}>FOR YOUR BUSINESS.</span>
          </h2>
          <p style={{ fontFamily: FB, fontSize: 15, color: T.cream, maxWidth: 460, margin: "0 auto 2.5rem", lineHeight: 1.85, opacity: 0.6, ...rv(ctaInView, 0.16) }}>
            From a landing page to a full web application — design to deployment. Professional, fast, and in 4 languages.
          </p>
          <div style={{ ...rv(ctaInView, 0.24) }}>
            <a href={LANDING_URL} target="_blank" rel="noopener noreferrer" className="p-btn" style={{ fontFamily: FD, fontSize: 24, letterSpacing: "0.08em", display: "inline-flex", alignItems: "center", gap: 10, background: T.amber, color: T.ink, padding: "12px 36px", textDecoration: "none", border: `2.5px solid ${T.cream}` }}>
              SEE MY SERVICES →
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER / CONTACT ─────────────────────────────────────────────────── */}
      <section id="contact" style={{ padding: `3.5rem clamp(14px,3.5vw,44px) 2rem`, background: T.ink }}>
        <div style={MAX}>
          <div ref={footerRef}>
            <div className="p-fg" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr", gap: "2.5rem", marginBottom: "2.5rem" }}>
              <div style={{ ...rv(footerInView, 0) }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 30, height: 30, background: T.red, border: `2.5px solid ${T.cream}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: FD, fontSize: 22, color: T.cream, lineHeight: 1 }}>Y</span>
                  </div>
                  <div style={{ fontFamily: FD, fontSize: 22, color: T.cream, letterSpacing: "0.08em" }}>YASSINE</div>
                </div>
                <p style={{ fontFamily: FB, fontSize: 13, color: T.cream, lineHeight: 1.75, maxWidth: 230, marginBottom: 18, opacity: 0.5 }}>Data Science & Full-Stack specialist — building data-driven web applications that solve real-world problems.</p>
                <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                  {[{ icon: <LinkedInIcon/>, href: "https://linkedin.com/in/yassineyahya" },{ icon: <GitHubIcon/>, href: "https://github.com/yassine-yahya" }].map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="p-icon" style={{ width: 36, height: 36, background: "rgba(255,255,255,0.07)", border: `2px solid ${T.cream}`, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: T.cream, opacity: 0.7, transition: "all .1s" }}>{s.icon}</a>
                  ))}
                </div>
                <div style={{ fontFamily: FM, fontSize: 8, fontWeight: "700", color: T.cream, letterSpacing: "0.16em", marginBottom: 8, opacity: 0.4 }}>SCAN TO CONNECT</div>
                <div style={{ border: `2.5px solid ${T.cream}`, background: T.cream, padding: 8, display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                  <img src={qrImage} alt="QR Code" style={{ width: 84, height: 84, display: "block", objectFit: "cover" }}/>
                  <span style={{ fontFamily: FM, fontSize: 8, fontWeight: "700", color: T.ink }}>CURRICULUM VITAE</span>
                </div>
              </div>

              <div style={{ ...rv(footerInView, 0.1) }}>
                <div style={{ fontFamily: FM, fontSize: 8, fontWeight: "700", color: T.cream, letterSpacing: "0.18em", marginBottom: 16, opacity: 0.4 }}>NAVIGATE</div>
                {NAV_LINKS.map(l => <button key={l} className="p-nl" onClick={() => scrollTo(l.toLowerCase())} style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontFamily: FM, fontSize: 12, fontWeight: "700", letterSpacing: "0.08em", color: T.cream, opacity: 0.5, padding: "5px 0", marginBottom: 3, textAlign: "left", transition: "opacity .1s" }}>{l.toUpperCase()}</button>)}
                <a href={LANDING_URL} target="_blank" rel="noopener noreferrer" style={{ display: "block", marginTop: 10, fontFamily: FD, fontSize: 18, color: T.amber, textDecoration: "none", letterSpacing: "0.06em" }}>PARA TU NEGOCIO →</a>
              </div>

              <div style={{ ...rv(footerInView, 0.2) }}>
                <div style={{ fontFamily: FM, fontSize: 8, fontWeight: "700", color: T.cream, letterSpacing: "0.18em", marginBottom: 16, opacity: 0.4 }}>CONTACT</div>
                {[{ icon: "✉", val: "yassineyahya50@gmail.com" },{ icon: "☎", val: "+34 602 317 364" },{ icon: "⌖", val: "Barcelona, Spain" },{ icon: "in", val: "linkedin/yassineyahya" }].map((c, i) => (
                  <p key={i} style={{ fontFamily: FB, fontSize: 13, color: T.cream, marginBottom: 10, display: "flex", gap: 10, alignItems: "flex-start", opacity: 0.55 }}>
                    <span style={{ color: T.teal, flexShrink: 0, fontWeight: "700" }}>{c.icon}</span>
                    <span style={{ wordBreak: "break-all" }}>{c.val}</span>
                  </p>
                ))}
              </div>
            </div>

            <div style={{ height: 2, background: "rgba(255,255,255,0.12)", marginBottom: 16 }}/>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, ...rv(footerInView, 0.25) }}>
              <p style={{ fontFamily: FM, fontSize: 9, fontWeight: "700", color: T.cream, opacity: 0.35, letterSpacing: "0.08em" }}>{"\u00A9"} 2026 YASSINE YAHYA · ALL RIGHTS RESERVED</p>
              <button onClick={() => scrollTo("home")} className="p-btn" style={{ background: T.cream, border: `2.5px solid ${T.cream}`, cursor: "pointer", fontFamily: FD, fontSize: 16, letterSpacing: "0.08em", color: T.ink, padding: "5px 16px" }}>BACK TO TOP →</button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
