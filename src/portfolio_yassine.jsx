import { useState, useEffect, useRef } from "react";
import qrImage from './assets/Qr.jpeg';

const LANDING_URL = "https://yassine-yahya.github.io/landpage2/";

// ── Icons ─────────────────────────────────────────────────────────────────────
const LinkedInIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const GitHubIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

// ── Design Tokens ─────────────────────────────────────────────────────────────
const T = {
  black:  "#0A0A0A",
  dark:   "#111111",
  panel:  "#161616",
  card:   "#1C1C1C",
  border: "#2A2A2A",
  red:    "#E4000F",
  redDim: "#8B0009",
  silver: "#8E8E8E",
  light:  "#C8C8C4",
  white:  "#F5F5F0",
  gold:   "#C9A84C",
};
const FD = "'Barlow Condensed', sans-serif";
const FM = "'Space Mono', monospace";
const FB = "'Barlow', sans-serif";

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
  { to: 1200, suffix: "+", label: "Hours of learning"   },
  { to: 1500, suffix: "+", label: "Hours of coding"     },
  { to: 14,   suffix: "+", label: "Years of experience" },
  { to: 5,    suffix: "",  label: "Languages spoken"    },
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

const EXT_COLOR = { js: "#e8c73a", py: "#4b8bbe", github: "#f05032" };
const extOf = (fn) => fn.startsWith(".") ? "github" : fn.split(".").pop();
const NAV_LINKS = ["Home", "Skills", "Experience", "Projects", "Certifications", "Contact"];

// ── Hooks (defined OUTSIDE Portfolio so they never get remounted) ──────────────
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Counter({ to, suffix = "", duration = 1400, inView }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf;
    const t0 = performance.now();
    const run = (t) => {
      const p = Math.min((t - t0) / duration, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(run);
      else setN(to);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, [inView]);
  return <>{n}{suffix}</>;
}

// GaugeBar is safe outside — pure component, no shared state
function GaugeBar({ lang, level, pct, visible, delay = 0 }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setW(pct), delay * 1000 + 80);
    return () => clearTimeout(t);
  }, [visible, pct, delay]);
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
        <span style={{ fontFamily: FB, fontSize: 13, color: T.white, fontWeight: 500 }}>{lang}</span>
        <span style={{ fontFamily: FM, fontSize: 10, color: T.silver }}>{level}</span>
      </div>
      <div style={{ height: 3, background: T.border, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: `${w}%`, background: `linear-gradient(90deg, ${T.redDim}, ${T.red})`, transition: "width 0.9s cubic-bezier(.4,0,.2,1)" }}/>
        {[25, 50, 75].map(tick => (
          <div key={tick} style={{ position: "absolute", top: 0, left: `${tick}%`, width: 1, height: "100%", background: T.black, opacity: 0.5 }}/>
        ))}
      </div>
    </div>
  );
}

// ── Reveal helper (pure fn, no hooks) ────────────────────────────────────────
const rv = (inView, delay = 0, dir = "up") => ({
  opacity: inView ? 1 : 0,
  transform: inView ? "none"
    : dir === "up"   ? "translateY(20px)"
    : dir === "left" ? "translateX(-16px)"
    : "scale(0.97)",
  transition: `opacity 0.55s ${delay}s cubic-bezier(.22,.61,.36,1), transform 0.55s ${delay}s cubic-bezier(.22,.61,.36,1)`,
});

// ── Shared tiny helpers (no state, no hooks — safe to define inline) ──────────
const HR = () => <div style={{ height: 1, background: T.border }}/>;

const SecLabel = ({ label, inView }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, ...rv(inView, 0, "left") }}>
    <div style={{ width: 28, height: 1, background: T.red }}/>
    <span style={{ fontFamily: FM, fontSize: 10, color: T.red, letterSpacing: "0.2em" }}>— {label}</span>
  </div>
);

const SecTitle = ({ a, b, inView }) => (
  <h2 style={{ fontFamily: FD, fontWeight: 700, textTransform: "uppercase", letterSpacing: "-0.01em", fontSize: "clamp(28px,4vw,52px)", lineHeight: .93, marginBottom: 36, color: T.white, ...rv(inView, 0.05) }}>
    {a}<br/><span style={{ color: T.silver }}>{b}</span>
  </h2>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT — all sections rendered inline, no inner function components
// ─────────────────────────────────────────────────────────────────────────────
export default function Portfolio() {

  // nav scroll state
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const mobileRef = useRef(null);

  // inView hooks — all defined at top level, never remounted
  const [heroStatsRef, heroStatsInView] = useInView(0.3);
  const [aboutRef,     aboutInView]     = useInView(0.1);
  const [skillsRef,    skillsInView]    = useInView(0.1);
  const [expRef,       expInView]       = useInView(0.08);
  const [projRef,      projInView]      = useInView(0.08);
  const [certRef,      certInView]      = useInView(0.08);
  const [eduRef,       eduInView]       = useInView(0.08);
  const [ctaRef,       ctaInView]       = useInView(0.15);
  const [footerRef,    footerInView]    = useInView(0.08);

  // CSS + scroll listener — mounted once
  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500&family=Barlow+Condensed:wght@300;400;700;800&family=Space+Mono:wght@400;700&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { background: #0A0A0A; }
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: #0A0A0A; }
      ::-webkit-scrollbar-thumb { background: #2A2A2A; }
      @keyframes fadeUp  { from { opacity:0; transform:translateY(26px); } to { opacity:1; transform:none; } }
      @keyframes fadeIn  { from { opacity:0; } to { opacity:1; } }
      @keyframes spin    { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
      @keyframes bounce  { 0%,100% { transform:translateY(0); } 50% { transform:translateY(6px); } }
      .fu0 { animation: fadeUp .65s 0.00s both; }
      .fu1 { animation: fadeUp .65s 0.12s both; }
      .fu2 { animation: fadeUp .65s 0.24s both; }
      .fu3 { animation: fadeUp .65s 0.38s both; }
      .fu4 { animation: fadeUp .65s 0.52s both; }
      .fi  { animation: fadeIn  .9s both; }
      .p-scroll { animation: bounce 2s ease-in-out infinite; }
      .p-tag:hover { border-color: rgba(228,0,15,.55) !important; color: #E4000F !important; background: rgba(228,0,15,.07) !important; }
      .p-nl:hover  { color: #F5F5F0 !important; }
      .p-icon:hover { color: #F5F5F0 !important; }
      .p-exp:hover  { border-top-color: #E4000F !important; }
      .p-cert:hover { background: #1F1F1F !important; }
      .p-proj:hover { background: #1F1F1F !important; }
      .p-stat:hover { border-color: rgba(228,0,15,.45) !important; }
      .p-dnav { display: flex; }
      .p-burger { display: none; flex-direction: column; }
      @media (max-width: 768px) {
        .p-dnav  { display: none !important; }
        .p-burger { display: flex !important; }
        .p-htitle { font-size: 44px !important; line-height: .9 !important; }
        .p-sec   { padding: 3rem 1rem !important; }
        .p-ag    { grid-template-columns: 1fr !important; }
        .p-eg    { grid-template-columns: 1fr !important; }
        .p-cg    { grid-template-columns: 1fr !important; }
        .p-edu   { grid-template-columns: 1fr !important; }
        .p-pg    { grid-template-columns: 1fr !important; }
        .p-fg    { grid-template-columns: 1fr !important; }
        .p-sg    { grid-template-columns: repeat(2,1fr) !important; }
        .p-cta-r { flex-direction: column !important; align-items: flex-start !important; }
        .p-bizt  { font-size: 34px !important; }
        .p-ghcard { grid-column: span 1 !important; flex-direction: column !important; }
      }
      @media (max-width: 420px) {
        .p-htitle { font-size: 40px !important; }
        .p-bizt   { font-size: 26px !important; }
      }
    `;
    document.head.appendChild(s);
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => { document.head.removeChild(s); window.removeEventListener("scroll", onScroll); };
  }, []);

  // close mobile menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const close = (e) => { if (mobileRef.current?.contains(e.target)) return; setMenuOpen(false); };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [menuOpen]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const PAD = "4rem clamp(14px,3vw,40px)";
  const MAX = { maxWidth: 1000, margin: "0 auto" };

  return (
    <div style={{ background: T.black, color: T.white, minHeight: "100vh", fontFamily: FB }}>

      {/* ── NAV ────────────────────────────────────────────────────────────── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: scrolled ? `${T.black}F2` : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: `1px solid ${scrolled ? T.border : "transparent"}`,
        transition: "all .3s ease",
        padding: "0 clamp(14px,3vw,40px)", height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 3, height: 26, background: `linear-gradient(180deg, ${T.red}, ${T.redDim})` }}/>
          <div>
            <div style={{ fontFamily: FD, fontSize: 18, fontWeight: 700, letterSpacing: "0.14em", color: T.white, lineHeight: 1 }}>YASSINE</div>
            <div style={{ fontFamily: FM, fontSize: 8, color: T.silver, letterSpacing: "0.18em" }}>WEB DEV · DATA SCIENCE</div>
          </div>
        </div>

        <div className="p-dnav" style={{ alignItems: "center", gap: 4 }}>
          {NAV_LINKS.map(l => (
            <button key={l} className="p-nl" onClick={() => scrollTo(l.toLowerCase())} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: FM, fontSize: 10, letterSpacing: "0.1em", color: T.silver, padding: "6px 12px", transition: "color .2s" }}>{l.toUpperCase()}</button>
          ))}
          <a href={LANDING_URL} target="_blank" rel="noopener noreferrer" style={{ fontFamily: FM, fontSize: 10, letterSpacing: "0.1em", padding: "6px 14px", border: `1px solid ${T.red}`, color: T.red, textDecoration: "none", marginLeft: 6, transition: "all .2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = T.red; e.currentTarget.style.color = T.white; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = T.red; }}
          >PARA TU NEGOCIO</a>
        </div>

        <button ref={mobileRef} className="p-burger"
          onClick={e => { e.stopPropagation(); setMenuOpen(o => !o); }}
          style={{ background: "none", border: `1px solid ${T.border}`, cursor: "pointer", padding: 8, gap: 5 }}
        >
          <div style={{ width: 22, height: 2, background: T.white, transition: "all .3s", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }}/>
          <div style={{ width: 22, height: 2, background: T.white, opacity: menuOpen ? 0 : 1, transition: "opacity .3s" }}/>
          <div style={{ width: 22, height: 2, background: T.white, transition: "all .3s", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }}/>
        </button>

        {menuOpen && (
          <div style={{ position: "absolute", top: 60, left: 0, right: 0, background: T.dark, borderBottom: `1px solid ${T.border}`, padding: "8px clamp(14px,3vw,40px) 20px", zIndex: 99 }}>
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => scrollTo(l.toLowerCase())} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", borderBottom: `1px solid ${T.border}`, cursor: "pointer", fontFamily: FM, fontSize: 11, letterSpacing: "0.08em", color: T.silver, padding: "12px 0" }}>{l.toUpperCase()}</button>
            ))}
            <a href={LANDING_URL} target="_blank" rel="noopener noreferrer" style={{ display: "block", marginTop: 14, fontFamily: FM, fontSize: 11, letterSpacing: "0.08em", padding: "8px 14px", border: `1px solid ${T.red}`, color: T.red, textDecoration: "none", width: "fit-content" }}>PARA TU NEGOCIO</a>
          </div>
        )}
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section id="home" className="p-sec" style={{ padding: PAD, ...MAX, minHeight: "82vh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>
        <div style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", fontFamily: FD, fontSize: "clamp(90px,15vw,220px)", fontWeight: 800, color: `${T.border}45`, lineHeight: 1, userSelect: "none", letterSpacing: "-0.05em", pointerEvents: "none" }}>992</div>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: `linear-gradient(180deg, transparent, ${T.red} 35%, ${T.redDim} 65%, transparent)` }}/>

        {/* Single-column hero — full width */}
        <div style={{ position: "relative", marginBottom: "2.5rem" }}>

          {/* Eyebrow */}
          <p className="fi" style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: FM, fontSize: 10, letterSpacing: "0.18em", color: "#3fb950", marginBottom: "1.5rem" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#3fb950", display: "inline-block", boxShadow: "0 0 8px #3fb95080" }}/>
            AVAILABLE · BARCELONA, SPAIN
          </p>

          {/* Big name — full width, no constraint */}
          <div className="fu0 p-htitle" style={{ fontFamily: FD, fontWeight: 800, fontSize: "clamp(56px,9vw,120px)", lineHeight: .88, color: T.white, letterSpacing: "-0.02em", textTransform: "uppercase" }}>Yassine</div>
          <div className="fu0" style={{ fontFamily: FD, fontWeight: 300, fontSize: "clamp(56px,9vw,120px)", lineHeight: .88, color: T.silver, letterSpacing: "-0.02em", textTransform: "uppercase", marginBottom: 28 }}>Yahya</div>

          {/* Designation strip — stretches full width */}
          <div className="fu1" style={{ display: "flex", alignItems: "center", width: "100%", marginBottom: 24 }}>
            <div style={{ width: 60, height: 1, background: T.red }}/>
            <div style={{ fontFamily: FM, fontSize: 10, letterSpacing: "0.22em", color: T.white, padding: "0 16px", whiteSpace: "nowrap" }}>WEB DEVELOPMENT · DATA SCIENCE</div>
            <div style={{ flex: 1, height: 1, background: T.border }}/>
          </div>

          {/* Bio — wider now */}
          <p className="fu2" style={{ fontFamily: FB, fontSize: 17, lineHeight: 1.8, color: T.silver, maxWidth: 640, fontWeight: 300, marginBottom: 28 }}>
            Full-Stack Developer with a background in finance — building reliable, secure, and data-driven web applications that actually work.
          </p>

          {/* CTAs + socials */}
          <div className="fu3 p-cta-r" style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 32 }}>
            <button onClick={() => scrollTo("projects")} style={{ fontFamily: FM, fontSize: 10, letterSpacing: "0.12em", padding: "11px 24px", background: T.red, border: "none", color: T.white, cursor: "pointer", transition: "background .2s" }}
              onMouseEnter={e => e.currentTarget.style.background = T.redDim}
              onMouseLeave={e => e.currentTarget.style.background = T.red}
            >VIEW PROJECTS</button>
            <a href="mailto:yassineyahya50@gmail.com" style={{ fontFamily: FM, fontSize: 10, letterSpacing: "0.12em", padding: "11px 24px", border: `1px solid ${T.border}`, color: T.light, textDecoration: "none", transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.silver; e.currentTarget.style.color = T.white; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.light; }}
            >GET IN TOUCH</a>
            <div style={{ width: 1, height: 28, background: T.border, margin: "0 4px" }}/>
            <a href="https://linkedin.com/in/yassineyahya" target="_blank" rel="noopener noreferrer" className="p-icon" style={{ width: 38, height: 38, background: T.card, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: T.silver, transition: "color .2s" }}><LinkedInIcon/></a>
            <a href="https://github.com/yassine-yahya" target="_blank" rel="noopener noreferrer" className="p-icon" style={{ width: 38, height: 38, background: T.card, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: T.silver, transition: "color .2s" }}><GitHubIcon/></a>
          </div>

          {/* Language chips */}
          <div className="fu4" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["Español", "English", "Français", "العربية", "Català"].map(l => (
              <span key={l} style={{ fontFamily: FM, fontSize: 10, letterSpacing: "0.08em", color: T.silver, padding: "5px 14px", border: `1px solid ${T.border}`, transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = T.red; e.currentTarget.style.color = T.white; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.silver; }}
              >{l}</span>
            ))}
          </div>
        </div>

        {/* Instrument cluster stats */}
        <div ref={heroStatsRef} className="fu3">
          <HR/>
          <div className="p-sg" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
            {stats.map((s, i) => (
              <div key={s.label} className="p-stat" style={{ padding: "22px 0", textAlign: "center", borderRight: i < stats.length - 1 ? `1px solid ${T.border}` : "none", ...rv(heroStatsInView, i * 0.1) }}>
                <div style={{ fontFamily: FD, fontSize: "clamp(1.6rem,3vw,2.6rem)", fontWeight: 700, color: T.white, lineHeight: 1 }}>
                  <Counter to={s.to} suffix={s.suffix} inView={heroStatsInView} duration={1200 + i * 100}/>
                </div>
                <div style={{ fontFamily: FM, fontSize: 9, color: T.silver, letterSpacing: "0.14em", marginTop: 6 }}>{s.label.toUpperCase()}</div>
              </div>
            ))}
          </div>
          <HR/>
        </div>

        {/* Always evolving */}
        <div className="fu4" style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "9px 18px", border: `1px solid ${T.border}` }}>
            <span style={{ color: "#3fb950", fontSize: 15, display: "inline-block", animation: "spin 4s linear infinite" }}>↻</span>
            <span style={{ fontFamily: FM, fontSize: 11, color: T.silver, letterSpacing: "0.03em" }}>
              This portfolio is <span style={{ color: "#3fb950" }}>always evolving</span> — new projects, skills & experiences
            </span>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="p-scroll" onClick={() => scrollTo("about")} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer", opacity: 0.35 }}>
            <span style={{ fontFamily: FM, fontSize: 9, color: T.silver, letterSpacing: "0.12em" }}>SCROLL</span>
            <span style={{ color: T.silver }}>↓</span>
          </div>
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────────────────────── */}
      <section id="about" className="p-sec" style={{ padding: PAD, ...MAX, borderTop: `1px solid ${T.border}` }}>
        <div ref={aboutRef}>
          <SecLabel label="ABOUT" inView={aboutInView}/>
          <SecTitle a="Finance veteran" b="turned full-stack developer." inView={aboutInView}/>
          <div className="p-ag" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "2.5rem", alignItems: "start" }}>
            <p style={{ fontFamily: FB, fontSize: 15, color: T.silver, lineHeight: 1.9, fontWeight: 300, ...rv(aboutInView, 0.12) }}>
              With 14 years in banking leadership and a bold transition into technology, I combine strategic thinking with hands-on technical skills. My training includes certifications in Cybersecurity, IT Automation with Python, IT Support, Full-Stack Web Development, and Data Science — providing expertise across software development, automation, data analytics, and security.
            </p>
            <div style={{ border: `1px solid ${T.border}`, background: T.card, padding: 28, position: "relative", ...rv(aboutInView, 0.2) }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: 36, height: 36, background: T.red }}/>
              <div style={{ fontFamily: FM, fontSize: 9, color: T.silver, letterSpacing: "0.2em", marginBottom: 20 }}>FICHA TECNICA</div>
              {[
                ["LOCATION",  "Barcelona, Spain"],
                ["EMAIL",     "yassineyahya50@gmail.com"],
                ["PHONE",     "+34 602 317 364"],
                ["LANGUAGES", "AR · FR · ES · EN · CA"],
                ["STATUS",    "Open to opportunities"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
                  <span style={{ fontFamily: FM, fontSize: 9, color: T.silver, letterSpacing: "0.1em", width: 90, flexShrink: 0 }}>{k}</span>
                  <span style={{ fontFamily: FB, fontSize: 13, color: T.white }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ─────────────────────────────────────────────────────────── */}
      <section id="skills" className="p-sec" style={{ padding: PAD, ...MAX, borderTop: `1px solid ${T.border}` }}>
        <div ref={skillsRef}>
          <SecLabel label="SKILLS" inView={skillsInView}/>
          <SecTitle a="Technical" b="toolkit." inView={skillsInView}/>
          <p style={{ fontFamily: FB, fontSize: 14, color: T.silver, marginBottom: 28, fontWeight: 300, marginTop: -24, ...rv(skillsInView, 0.08) }}>Technologies and tools across development, data, and security.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {skillGroups.map((g, gi) => (
              <div key={g.cat} style={{ display: "flex", alignItems: "flex-start", gap: 20, borderBottom: `1px solid ${T.border}`, padding: "16px 0", ...rv(skillsInView, 0.1 + gi * 0.06) }}>
                <span style={{ fontFamily: FM, fontSize: 9, color: T.silver, textTransform: "uppercase", letterSpacing: "0.08em", minWidth: 120, marginTop: 7, flexShrink: 0, lineHeight: 1.4 }}>{g.cat}</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {g.tags.map((tag, ti) => (
                    <span key={tag} className="p-tag" style={{ fontFamily: FM, fontSize: 11, padding: "5px 12px", background: "transparent", color: T.silver, border: `1px solid ${T.border}`, cursor: "default", opacity: skillsInView ? 1 : 0, transform: skillsInView ? "none" : "translateY(8px)", transition: `opacity 0.4s ${0.15 + gi * 0.06 + ti * 0.025}s ease, transform 0.4s ${0.15 + gi * 0.06 + ti * 0.025}s ease, color .15s, border-color .15s, background .15s` }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ─────────────────────────────────────────────────────── */}
      <section id="experience" className="p-sec" style={{ padding: PAD, ...MAX, borderTop: `1px solid ${T.border}` }}>
        <div ref={expRef}>
          <SecLabel label="EXPERIENCE" inView={expInView}/>
          <SecTitle a="Professional" b="journey." inView={expInView}/>
          <div className="p-eg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {experience.map((exp, i) => (
              <div key={i} className="p-exp" style={{ background: T.card, padding: "1.25rem 1.5rem", border: `1px solid ${T.border}`, borderTop: `2px solid ${T.border}`, transition: "border-top-color .2s", ...rv(expInView, 0.08 + i * 0.09) }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                  <div>
                    <p style={{ fontFamily: FD, fontWeight: 700, fontSize: 17, letterSpacing: "0.04em", color: T.white, margin: "0 0 4px", textTransform: "uppercase" }}>{exp.title}</p>
                    <p style={{ fontFamily: FM, fontSize: 11, color: T.red, margin: 0 }}>{exp.company}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                    <span style={{ fontFamily: FM, fontSize: 10, color: T.silver, padding: "2px 8px", border: `1px solid ${T.border}` }}>{exp.period}</span>
                    <span style={{ fontFamily: FM, fontSize: 10, color: T.silver }}>{exp.location}</span>
                  </div>
                </div>
                <p style={{ fontFamily: FB, fontSize: 13, color: T.silver, lineHeight: 1.75, marginBottom: 10, fontWeight: 300 }}>{exp.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {exp.tags.map(tag => (<span key={tag} style={{ fontFamily: FM, fontSize: 10, padding: "2px 8px", border: `1px solid ${T.border}`, color: T.silver }}>{tag}</span>))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ─────────────────────────────────────────────────── */}
      <section id="certifications" className="p-sec" style={{ padding: PAD, ...MAX, borderTop: `1px solid ${T.border}` }}>
        <div ref={certRef}>
          <SecLabel label="CERTIFICATIONS & EDUCATION" inView={certInView}/>
          <SecTitle a="Credentials" b="& training." inView={certInView}/>
          <div className="p-cg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {certifications.map((c, i) => (
              <div key={i} className="p-cert" style={{ background: T.card, padding: "1.25rem", border: `1px solid ${T.border}`, borderTop: `2px solid ${c.inProgress ? T.gold : T.border}`, display: "flex", flexDirection: "column", gap: 10, transition: "background .2s", ...rv(certInView, 0.08 + i * 0.06, "scale") }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: FD, fontWeight: 700, fontSize: 16, letterSpacing: "0.03em", color: T.white, marginBottom: 4, lineHeight: 1.2, textTransform: "uppercase" }}>{c.name}</p>
                    <p style={{ fontFamily: FM, fontSize: 10, color: T.silver, marginBottom: 8 }}>{c.org}</p>
                    <span style={{ fontFamily: FM, fontSize: 11, color: T.white, background: T.panel, padding: "3px 8px", border: `1px solid ${T.border}` }}>{c.detail}</span>
                  </div>
                  {c.inProgress && (<span style={{ fontFamily: FM, fontSize: 9, padding: "3px 8px", border: `1px solid ${T.gold}`, color: T.gold, whiteSpace: "nowrap", flexShrink: 0, letterSpacing: "0.06em" }}>IN PROGRESS</span>)}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {c.skills.map(sk => (<span key={sk} style={{ fontFamily: FM, fontSize: 10, padding: "2px 8px", border: `1px solid ${T.border}`, color: T.silver }}>{sk}</span>))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDUCATION / WORKSHOPS + LANGUAGES ──────────────────────────────── */}
      <section id="education" className="p-sec" style={{ padding: PAD, ...MAX, borderTop: `1px solid ${T.border}` }}>
        <div ref={eduRef}>
          <SecLabel label="EDUCATION" inView={eduInView}/>
          <SecTitle a="Workshops &" b="languages." inView={eduInView}/>
          <div className="p-edu" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}>
            <div style={{ ...rv(eduInView, 0.1) }}>
              <div style={{ fontFamily: FM, fontSize: 9, color: T.silver, letterSpacing: "0.14em", marginBottom: 14 }}>WORKSHOPS & MASTERCLASSES</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 1, background: T.border }}>
                {workshops.map((w, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: T.card, opacity: eduInView ? 1 : 0, transform: eduInView ? "none" : "translateX(-10px)", transition: `opacity 0.4s ${0.15 + i * 0.07}s ease, transform 0.4s ${0.15 + i * 0.07}s ease` }}>
                    <span style={{ fontFamily: FB, fontSize: 13, color: T.silver }}>{w.name}</span>
                    <span style={{ fontFamily: FM, fontSize: 10, color: T.red, flexShrink: 0, marginLeft: 8 }}>{w.org}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ ...rv(eduInView, 0.15) }}>
              <div style={{ fontFamily: FM, fontSize: 9, color: T.silver, letterSpacing: "0.14em", marginBottom: 14 }}>LANGUAGES</div>
              {languages.map((l, i) => (
                <GaugeBar key={l.lang} lang={l.lang} level={l.level} pct={l.pct} visible={eduInView} delay={0.1 + i * 0.1}/>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ───────────────────────────────────────────────────────── */}
      <section id="projects" className="p-sec" style={{ padding: PAD, ...MAX, borderTop: `1px solid ${T.border}` }}>
        <div ref={projRef}>
          <SecLabel label="PROJECTS" inView={projInView}/>
          <SecTitle a="Things" b="I've built." inView={projInView}/>
          <p style={{ fontFamily: FB, fontSize: 14, color: T.silver, marginBottom: 28, fontWeight: 300, marginTop: -24, ...rv(projInView, 0.1) }}>Projects to practice, explore new technologies, and sharpen my skills.</p>
          <div className="p-pg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {projectFiles.map((p, i) => {
              const ext = extOf(p.fileName);
              const extColor = EXT_COLOR[ext] || T.silver;
              return (
                <div key={p.id} className="p-proj" style={{ background: T.card, padding: "1.25rem 1.5rem", border: `1px solid ${T.border}`, borderTop: `2px solid ${T.border}`, display: "flex", flexDirection: "column", transition: "background .2s", ...rv(projInView, 0.1 + i * 0.06) }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <span style={{ fontFamily: FM, fontSize: 10, color: extColor, background: `${extColor}18`, padding: "2px 8px", maxWidth: "65%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.fileName}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: extColor }}/>
                      <span style={{ fontFamily: FM, fontSize: 10, color: T.silver }}>{ext === "github" ? "GIT" : ext.toUpperCase()}</span>
                    </div>
                  </div>
                  <p style={{ fontFamily: FD, fontWeight: 700, fontSize: 18, letterSpacing: "0.04em", color: T.white, margin: "0 0 8px", textTransform: "uppercase", lineHeight: 1.2 }}>{p.title}</p>
                  <p style={{ fontFamily: FB, fontSize: 13, color: T.silver, lineHeight: 1.65, margin: "0 0 12px", fontWeight: 300, flex: 1 }}>{p.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 14 }}>
                    {p.tech.map(t => (<span key={t} style={{ fontFamily: FM, fontSize: 10, padding: "2px 8px", border: `1px solid ${T.border}`, color: T.silver }}>{t}</span>))}
                  </div>
                  <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 12 }}>
                    <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ fontFamily: FM, fontSize: 11, color: T.silver, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, letterSpacing: "0.08em", transition: "color .15s" }}
                      onMouseEnter={e => e.currentTarget.style.color = T.red}
                      onMouseLeave={e => e.currentTarget.style.color = T.silver}
                    >→ VIEW PROJECT</a>
                  </div>
                </div>
              );
            })}
            {/* GitHub card */}
            <a href="https://github.com/yassine-yahya" target="_blank" rel="noopener noreferrer"
              className="p-proj p-ghcard" style={{ gridColumn: "span 2", background: `${T.red}08`, border: `1px solid ${T.border}`, borderTop: `2px solid ${T.red}`, padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", textDecoration: "none", gap: 16, transition: "background .2s", ...rv(projInView, 0.1 + projectFiles.length * 0.06) }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontSize: 22, color: "#f05032" }}>⬡</span>
                <div>
                  <p style={{ fontFamily: FD, fontWeight: 700, fontSize: 18, color: T.white, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.04em" }}>More on GitHub</p>
                  <p style={{ fontFamily: FB, fontSize: 13, color: T.silver, margin: 0, fontWeight: 300 }}>Explore more projects, experiments, and open-source contributions</p>
                </div>
              </div>
              <span style={{ fontFamily: FM, fontSize: 11, color: T.red, whiteSpace: "nowrap", letterSpacing: "0.06em" }}>github.com/yassine-yahya →</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── BUSINESS CTA ───────────────────────────────────────────────────── */}
      <section style={{ padding: "6rem clamp(14px,3vw,40px)", background: T.panel, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 350, borderRadius: "50%", background: "radial-gradient(circle,rgba(228,0,15,.07) 0%,transparent 65%)", pointerEvents: "none", filter: "blur(60px)" }}/>
        <div ref={ctaRef} style={{ maxWidth: 800, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 28, border: `1px solid ${T.border}`, padding: "5px 14px", ...rv(ctaInView, 0) }}>
            <div style={{ width: 6, height: 6, background: T.red }}/>
            <span style={{ fontFamily: FM, fontSize: 10, letterSpacing: "0.15em", color: T.red }}>FOR BUSINESSES</span>
          </div>
          <h2 className="p-bizt" style={{ fontFamily: FD, fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.02em", fontSize: "clamp(32px,6vw,68px)", lineHeight: .92, color: T.white, marginBottom: 24, ...rv(ctaInView, 0.08) }}>
            You need a website<br/>or digital solutions?<br/>
            <span style={{ color: T.red }}>Let's build something</span><br/>
            <span style={{ color: T.red }}>for your business.</span>
          </h2>
          <p style={{ fontFamily: FB, fontSize: 16, color: T.silver, maxWidth: 480, margin: "0 auto 2.5rem", lineHeight: 1.8, fontWeight: 300, ...rv(ctaInView, 0.16) }}>
            From a landing page to a full web application — design to deployment. Professional, fast, and in 4 languages.
          </p>
          <div style={{ ...rv(ctaInView, 0.24) }}>
            <a href={LANDING_URL} target="_blank" rel="noopener noreferrer" style={{ fontFamily: FM, fontSize: 11, letterSpacing: "0.12em", display: "inline-flex", alignItems: "center", gap: 10, background: T.red, color: T.white, padding: "14px 36px", textDecoration: "none", transition: "background .2s" }}
              onMouseEnter={e => e.currentTarget.style.background = T.redDim}
              onMouseLeave={e => e.currentTarget.style.background = T.red}
            >SEE MY SERVICES FOR BUSINESSES →</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER / CONTACT ───────────────────────────────────────────────── */}
      <section id="contact" className="p-sec" style={{ padding: `4rem clamp(14px,3vw,40px) 2.5rem`, ...MAX }}>
        <div ref={footerRef}>
          <div className="p-fg" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr", gap: "2rem", marginBottom: "2.5rem" }}>
            {/* Brand + QR */}
            <div style={{ ...rv(footerInView, 0) }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 3, height: 22, background: T.red }}/>
                <div>
                  <div style={{ fontFamily: FD, fontSize: 16, fontWeight: 700, letterSpacing: "0.14em", color: T.white, lineHeight: 1 }}>YASSINE</div>
                  <div style={{ fontFamily: FM, fontSize: 8, color: T.silver, letterSpacing: "0.16em" }}>WEB DEV · DATA SCIENCE</div>
                </div>
              </div>
              <p style={{ fontFamily: FB, fontSize: 13, color: T.silver, lineHeight: 1.75, maxWidth: 230, fontWeight: 300, marginBottom: 16 }}>Data Science & Full-Stack specialist — building data-driven web applications that solve real-world problems.</p>
              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                {[
                  { icon: <LinkedInIcon/>, href: "https://linkedin.com/in/yassineyahya" },
                  { icon: <GitHubIcon/>,  href: "https://github.com/yassine-yahya"     },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="p-icon" style={{ width: 34, height: 34, background: T.card, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: T.silver, transition: "color .2s" }}>{s.icon}</a>
                ))}
              </div>
              <div style={{ fontFamily: FM, fontSize: 9, color: T.silver, letterSpacing: "0.12em", marginBottom: 10 }}>SCAN TO CONNECT</div>
              <div style={{ border: `1px solid ${T.border}`, background: T.card, padding: 10, display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <img src={qrImage} alt="QR Code" style={{ width: 90, height: 90, display: "block", objectFit: "cover" }}/>
                <span style={{ fontFamily: FM, fontSize: 9, color: T.silver }}>Curriculum Vitae</span>
              </div>
            </div>

            {/* Navigate */}
            <div style={{ ...rv(footerInView, 0.1) }}>
              <div style={{ fontFamily: FM, fontSize: 9, color: T.silver, letterSpacing: "0.15em", marginBottom: 16 }}>NAVIGATE</div>
              {NAV_LINKS.map(l => (
                <button key={l} className="p-nl" onClick={() => scrollTo(l.toLowerCase())} style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontFamily: FM, fontSize: 11, letterSpacing: "0.08em", color: T.silver, padding: "4px 0", marginBottom: 6, textAlign: "left", transition: "color .2s" }}>{l.toUpperCase()}</button>
              ))}
              <a href={LANDING_URL} target="_blank" rel="noopener noreferrer" style={{ display: "block", marginTop: 8, fontFamily: FM, fontSize: 11, letterSpacing: "0.08em", color: T.red, textDecoration: "none" }}>PARA TU NEGOCIO →</a>
            </div>

            {/* Contact */}
            <div style={{ ...rv(footerInView, 0.2) }}>
              <div style={{ fontFamily: FM, fontSize: 9, color: T.silver, letterSpacing: "0.15em", marginBottom: 16 }}>CONTACT</div>
              {[
                { icon: "✉", val: "yassineyahya50@gmail.com" },
                { icon: "☎", val: "+34 602 317 364"           },
                { icon: "⌖", val: "Barcelona, Spain"           },
                { icon: "in",val: "linkedin/yassineyahya"       },
              ].map((c, i) => (
                <p key={i} style={{ fontFamily: FM, fontSize: 11, color: T.silver, marginBottom: 10, display: "flex", gap: 8, alignItems: "flex-start", letterSpacing: "0.04em" }}>
                  <span style={{ color: T.red, flexShrink: 0 }}>{c.icon}</span>
                  <span style={{ wordBreak: "break-all" }}>{c.val}</span>
                </p>
              ))}
            </div>
          </div>

          <HR/>
          <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, ...rv(footerInView, 0.25) }}>
            <p style={{ fontFamily: FM, fontSize: 10, color: T.silver, letterSpacing: "0.06em" }}>{"\u00A9"} 2026 Yassine Yahya · All rights reserved</p>
            <button onClick={() => scrollTo("home")} style={{ background: T.card, border: `1px solid ${T.border}`, cursor: "pointer", fontFamily: FM, fontSize: 10, letterSpacing: "0.08em", color: T.red, padding: "5px 14px", transition: "background .2s" }}
              onMouseEnter={e => e.currentTarget.style.background = T.panel}
              onMouseLeave={e => e.currentTarget.style.background = T.card}
            >↑ BACK TO TOP</button>
          </div>
        </div>
      </section>

    </div>
  );
}
