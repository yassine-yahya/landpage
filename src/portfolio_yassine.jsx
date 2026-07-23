import { useState, useEffect, useRef } from "react";
import CV_URL from "./assets/Yassine_Yahya_CV.pdf";

const LANDING_URL = "https://yassine-yahya.github.io/landpage2/";
// Place your actual CV PDF at this path in your Vite project's `public/` folder
// (e.g. public/Yassine-Yahya-CV.pdf) — the button below links here directly.

/* ============================================================
   DESIGN — Editorial / magazine
   ------------------------------------------------------------
   A deliberate move away from the "AI dev-portfolio" template
   (GitHub dark palette, JetBrains Mono everywhere, bordered
   cards with hover-glow, rainbow tag pills, fake terminal file
   headers). Instead: a masthead, numbered sections, a serif
   display face for headlines, hairline rules instead of boxed
   cards, a single warm spot-color instead of a rainbow of
   category colors, and prose lists instead of pill grids.

     night   #171310  dark bookend (nav / hero / footer)
     paper   #F6F1E7  warm cream — primary content background
     paperAlt#EDE6D6  slightly deeper cream — alternating rhythm
     ink     #1C1812  primary text on paper
     inkSoft #5B5346  secondary text on paper
     rule    #D8CFBC  hairline border on paper
     cream   #F3ECDD  primary text on night
     rust    #B54A2C  single spot accent — clay / wax-stamp red
     rustDeep#8F3A22  pressed / deep variant
     olive   #6B7353  second spot color, used sparingly

   Fraunces (serif, display) for headlines & numerals — a face
   with real character, not a default grotesk. Inter for body
   copy and small caps labels. No monospace.
   ============================================================ */

const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const GitHubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const C = {
  night:     "#171310",
  paper:     "#F6F1E7",
  paperAlt:  "#EDE6D6",
  ink:       "#1C1812",
  inkSoft:   "#5B5346",
  rule:      "#D8CFBC",
  cream:     "#F3ECDD",
  creamSoft: "rgba(243,236,221,0.66)",
  creamFaint:"rgba(243,236,221,0.24)",
  rust:      "#B54A2C",
  rustDeep:  "#8F3A22",
  olive:     "#6B7353",
};

const FD = "'Fraunces', Georgia, 'Times New Roman', serif";
const FB = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";

const B_PAPER = `1px solid ${C.rule}`;
const B_NIGHT = `1px solid ${C.creamFaint}`;

// ── Content (unchanged) ──────────────────────────────────────────────────────
const pillars = [
  { tag: "SEC",  accent: "rust",  title: "Security Analyst", blurb: "SIEM, incident response, threat detection & network monitoring.", skills: ["SIEM", "Incident Response", "Threat Detection", "Nmap"] },
  { tag: "DATA", accent: "olive", title: "Data Scientist",   blurb: "Python, SQL & visualization — turning raw logs into decisions.",     skills: ["Python", "SQL", "Pandas", "Matplotlib"] },
  { tag: "WEB",  accent: "ink",   title: "Web Developer",    blurb: "React, Node.js & REST APIs — building the tools I analyze with.",    skills: ["React.js", "Node.js", "REST APIs", "JavaScript"] },
];

const skillGroups = [
  { cat: "Security / SOC",          tags: ["SIEM (Splunk / Chronicle)", "Incident Response", "Threat Detection", "Log & Packet Analysis", "Vulnerability Assessment", "Wireshark", "Nmap", "Metasploit", "NIST / CIS Frameworks", "IAM & Access Control"] },
  { cat: "Data science / analysis", tags: ["Python", "SQL", "PostgreSQL", "MongoDB", "Pandas", "NumPy", "Matplotlib"] },
  { cat: "Web development",         tags: ["JavaScript", "React.js", "Node.js", "Next.js", "Express.js", "HTML/CSS", "REST APIs", "Tailwind"] },
  { cat: "Networking & Systems",    tags: ["Linux Administration", "TCP/IP", "Firewalls / IDS-IPS", "Bash", "OAuth", "JWT"] },
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
  { id:1, title:"PortHunter",                      tag: "SEC", impact: "Detects open ports, live services & exposed protocols.", tech:["Express.js","Python","Nmap","JavaScript","Vercel"],   link:"https://porthunter.vercel.app/",                               desc:"Network port scanner that detects open/closed ports and security protocols. Built with React, Node.js and Python — requires admin privileges to run the scan." },
  { id:2, title:"Socket Server-Client Messaging",  tag: "SEC", impact: "Demonstrates multi-client server architecture over raw sockets.", tech:["Socket","Python"],                                    link:"https://github.com/yassine-yahya/socket-server-client-python", desc:"Python messaging app using sockets for communication between a server and multiple clients. Demonstrates core network programming and can be extended for cybersecurity use." },
  { id:3, title:"Web Scraping & Security Headers", tag: "SEC", impact: "Audits missing HTTP security headers on any target URL.", tech:["BeautifulSoup4","Colorama","Python"],                 link:"https://github.com/yassine-yahya/web-scraping-Bs4-Requests",   desc:"Scrapes a target URL, checks for HTTP security headers presence, and extracts page title and links. Useful for quick security audits of web pages." },
  { id:4, title:"SSH Connection Script",           tag: "SEC", impact: "Automates SSH connections with graceful error handling.", tech:["Python","Colorama","Paramiko"],                       link:"https://github.com/yassine-yahya/ssh-access-paramiko",         desc:"Automates SSH connections using Paramiko and handles common SSH errors gracefully. Clean CLI output with Colorama highlighting." },
  { id:5, title:"Nmap Scanner with Python",        tag: "SEC", impact: "Automates recurring port scans on a fixed interval.", tech:["Nmap","Colorama","Python"],                           link:"https://github.com/yassine-yahya/port-scanner-python-nmap",    desc:"Uses Nmap to scan a target for open ports and services. Highlights results with Colorama for readability. Runs an automated scan every 5 seconds." },
  { id:6, title:"Card Pairs Game",                 tag: "DEV", impact: "Full game logic & flip animations, built in vanilla JS.", tech:["JavaScript","HTML","CSS","GitHub Pages"],             link:"https://yassine-yahya.github.io/card-pairs-game/",             desc:"Memory matching game where players flip cards to find matching pairs. Pure vanilla JS with smooth flip animations." },
  { id:7, title:"Guess The PIN",                   tag: "DEV", impact: "Randomized guessing logic with unique-digit validation.", tech:["JavaScript","HTML","CSS","GitHub Pages"],             link:"https://yassine-yahya.github.io/guess-pin/",                   desc:"Interactive number guessing game. Players try to guess a randomly generated 4-digit number with unique digits. Built with vanilla JS." },
];
const TAG_COLOR = { SEC: C.rust, DEV: C.olive };
const NAV_LINKS = ["Home", "Skills", "Experience", "Projects", "Certifications", "Contact"];

// "By the numbers" strip + ticker content
const stats = [
  { value: 14,   suffix: "+", label: "Years experience" },
  { value: 1500, suffix: "+", label: "Hours coding" },
  { value: 5,    suffix: "",  label: "Languages spoken" },
];

// ── Hooks ─────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef(null); const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.unobserve(el); } }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, []); return [ref, inView];
}
const rv = (inView, delay = 0, dir = "up") => ({
  opacity: inView ? 1 : 0,
  transform: inView ? "none" : dir==="up" ? "translateY(14px)" : dir==="left" ? "translateX(-10px)" : "scale(0.98)",
  transition: `opacity .5s ${delay}s ease, transform .5s ${delay}s ease`,
});

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);
  return reduced;
}
// Animates 0 → target once the element scrolls into view; jumps straight to
// the final value if the user has reduced motion set.
function useCountUp(target, inView, duration = 1400) {
  const [val, setVal] = useState(0);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    if (!inView) return;
    if (reduced) { setVal(target); return; }
    let raf; const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, reduced]);
  return val;
}

// Kicker: "N0X — LABEL" small caps. The rust tick draws in from 0 → full
// width as the section scrolls into view, instead of just fading.
const Kicker = ({ num, label, inView, on = "paper" }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
    <span style={{ width: inView ? 22 : 0, height: 2, background: C.rust, flexShrink: 0, transition: "width .6s ease" }}/>
    <span style={{ fontFamily: FB, fontSize: 11.5, fontWeight: 600, letterSpacing: "0.16em", color: on === "paper" ? C.inkSoft : C.creamSoft, opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(-8px)", transition: "opacity .5s .15s ease, transform .5s .15s ease" }}>
      {num ? `№ ${num} — ` : ""}{label.toUpperCase()}
    </span>
  </div>
);
const SecTitle = ({ a, b, inView, on = "paper" }) => (
  <h2 style={{ fontFamily: FD, fontWeight: 500, fontStyle: "normal", fontSize: "clamp(30px,4.2vw,50px)", lineHeight: 1.08, marginBottom: 26, color: on === "paper" ? C.ink : C.cream, ...rv(inView, 0.04) }}>
    {a} <em style={{ fontStyle: "italic", color: C.rust }}>{b}</em>
  </h2>
);

// "+" that rotates into "×" — an index/footnote-style toggle instead of a
// chevron-in-a-box.
const PlusToggle = ({ open, on = "paper" }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    width: 30, height: 30, borderRadius: "50%",
    border: `1px solid ${on === "paper" ? C.ink : C.cream}`,
    color: on === "paper" ? C.ink : C.cream,
    fontFamily: FD, fontSize: 18, fontWeight: 400, lineHeight: 1,
    transform: open ? "rotate(45deg)" : "none", transition: "transform .35s ease, background .2s ease, color .2s ease",
    flexShrink: 0,
  }}>+</span>
);

function SectionHeader({ num, label, a, b, count, open, onToggle, inView, on = "paper" }) {
  return (
    <button onClick={onToggle} aria-expanded={open} style={{
      width: "100%", display: "flex", justifyContent: "space-between", alignItems: "flex-end",
      gap: 16, background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left",
      marginBottom: open ? 30 : 6,
    }}>
      <div>
        <Kicker num={num} label={label} inView={inView} on={on}/>
        <SecTitle a={a} b={b} inView={inView} on={on}/>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0, paddingBottom: 12 }}>
        {count && <span style={{ fontFamily: FB, fontSize: 11.5, fontStyle: "italic", color: on === "paper" ? C.inkSoft : C.creamSoft, whiteSpace: "nowrap" }}>{count}</span>}
        <PlusToggle open={open} on={on}/>
      </div>
    </button>
  );
}
function Collapse({ open, children }) {
  return (
    <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows .45s ease", overflow: "hidden" }}>
      <div style={{ minHeight: 0 }}>{children}</div>
    </div>
  );
}

// A prose-run of terms separated by a middot, used everywhere pill tags used
// to be — reads like caption text, not UI chrome.
const TermRun = ({ items, color = C.inkSoft }) => (
  <p style={{ fontFamily: FB, fontSize: 12.5, color, lineHeight: 1.9 }}>
    {items.map((t, i) => <span key={t}>{i > 0 && <span style={{ color: C.rule, margin: "0 8px" }}>·</span>}{t}</span>)}
  </p>
);

// One number in the "by the numbers" strip — counts up when scrolled into view.
function StatBlock({ value, suffix, label, inView, delay = 0 }) {
  const n = useCountUp(value, inView);
  return (
    <div style={{ textAlign: "center", padding: "0 30px", ...rv(inView, delay) }}>
      <div style={{ fontFamily: FD, fontWeight: 500, fontSize: "clamp(38px,5vw,60px)", color: C.ink, lineHeight: 1 }}>{n.toLocaleString()}{suffix}</div>
      <div style={{ fontFamily: FB, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.12em", color: C.inkSoft, marginTop: 10 }}>{label.toUpperCase()}</div>
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

  // Registered giant serif numerals (Practice/Experience/Certifications/Projects
  // row numbers) — nudged via direct style writes on scroll for the parallax
  // drift, bypassing React state so it stays cheap.
  const numRefs = useRef([]);
  const registerNum = (el) => { if (el && !numRefs.current.includes(el)) numRefs.current.push(el); };

  const [statsRef,   statsInView]   = useInView(0.4);
  const [pillarsRef, pillarsInView] = useInView(0.1);
  const [aboutRef,   aboutInView]   = useInView(0.1);
  const [skillsRef,  skillsInView]  = useInView(0.08);
  const [expRef,     expInView]     = useInView(0.06);
  const [projRef,    projInView]    = useInView(0.08);
  const [certRef,    certInView]    = useInView(0.08);
  const [eduRef,     eduInView]     = useInView(0.08);
  const [footerRef,  footerInView]  = useInView(0.08);

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Inter:wght@400;500;600;700;800&display=swap');
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      html{scroll-behavior:smooth}
      body{background:${C.paper};overflow-x:hidden}
      #root,body,html{max-width:100vw}
      ::selection{background:${C.rust};color:${C.cream}}
      a:focus-visible,button:focus-visible{outline:2px solid ${C.rust};outline-offset:2px}
      ::-webkit-scrollbar{width:7px}
      ::-webkit-scrollbar-track{background:${C.paper}}
      ::-webkit-scrollbar-thumb{background:${C.rule}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
      @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      @keyframes blink{0%,100%{opacity:1}50%{opacity:0.25}}
      .fu0{animation:fadeUp .55s .00s both}.fu1{animation:fadeUp .55s .12s both}
      .fu2{animation:fadeUp .55s .24s both}.fu3{animation:fadeUp .55s .38s both}
      .fu4{animation:fadeUp .55s .5s both}.fi{animation:fadeIn .8s both}
      .p-dot{animation:blink 2s ease-in-out infinite}
      .p-link{position:relative;text-decoration:none;transition:color .15s ease}
      .p-link::after{content:"";position:absolute;left:0;right:100%;bottom:-3px;height:1px;background:currentColor;transition:right .25s ease}
      .p-link:hover::after{right:0}
      .p-row:hover{background:${C.paperAlt} !important}
      .p-rownight:hover{background:rgba(243,236,221,0.04) !important}
      .p-btn-solid{transition:background .18s ease, transform .12s ease}
      .p-btn-solid:hover{background:${C.rustDeep} !important}
      .p-btn-solid:active{transform:scale(0.98)}
      .p-btn-line{transition:background .18s ease, color .18s ease, border-color .18s ease}
      .p-btn-line:hover{background:${C.cream} !important;color:${C.night} !important}
      .p-icon{transition:border-color .18s ease, color .18s ease}
      .p-icon:hover{border-color:${C.rust} !important;color:${C.rust} !important}
      .p-toggle-btn:hover span{background:${C.rust} !important;border-color:${C.rust} !important;color:${C.cream} !important}
      .p-proj:hover .p-proj-link{color:${C.rust} !important}
      .p-num{font-family:'Fraunces',serif;font-weight:300;font-style:italic;color:${C.rust};opacity:0.35;will-change:transform}
      @media (prefers-reduced-motion: reduce){
        .fu0,.fu1,.fu2,.fu3,.fu4,.fi,.p-dot{animation:none !important}
      }
      .p-dnav{display:flex}.p-burger{display:none;flex-direction:column}
      @media(max-width:900px){
        .p-dnav{display:none !important}.p-burger{display:flex !important}
        .p-eg{grid-template-columns:1fr !important}
        .p-cg{grid-template-columns:1fr !important}.p-edu{grid-template-columns:1fr !important}
        .p-fg{grid-template-columns:1fr !important}
        .p-pillars{grid-template-columns:1fr !important}
        .p-about{grid-template-columns:1fr !important}
        .p-hero-bottom{flex-direction:column !important;align-items:flex-start !important}
        .p-skill-row{flex-direction:column !important}
        .p-skill-cat{min-width:unset !important;border-right:none !important;padding-bottom:6px !important}
      }
    `;
    document.head.appendChild(s);
    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(total > 0 ? (window.scrollY / total) * 100 : 0);
      const ids = ["home","about","skills","experience","projects","certifications","contact"];
      for (const id of [...ids].reverse()) { const el = document.getElementById(id); if (el && window.scrollY >= el.offsetTop - 130) { setActiveSection(id); break; } }
      // Parallax: the big ghost numerals drift a little slower than the page.
      if (!reduceMotion) {
        const vh = window.innerHeight;
        numRefs.current.forEach(el => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const delta = (vh / 2 - (rect.top + rect.height / 2)) * 0.05;
          el.style.transform = `translateY(${delta.toFixed(1)}px)`;
        });
      }
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
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
  const PAD = "4.5rem clamp(14px,3.5vw,44px)";
  const MAX = { maxWidth: 1120, margin: "0 auto" };
  const COL = { maxWidth: 660 };

  return (
    <div style={{ background: C.paper, color: C.ink, minHeight: "100vh", fontFamily: FB }}>

      <div style={{ position: "fixed", top: 0, left: 0, height: 2, width: `${scrollPct}%`, background: C.rust, zIndex: 9999, transition: "width .1s" }}/>

      {/* ── NAV — a fixed dark masthead bar, ties together with hero + footer ── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: C.night, borderBottom: `2px solid ${C.rust}`, padding: "0 clamp(14px,3.5vw,44px)", height: 58, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 28, height: 28, border: `1px solid ${C.cream}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontFamily: FD, fontStyle: "italic", fontWeight: 500, fontSize: 15, color: C.cream, lineHeight: 1 }}>Y</span>
          </div>
          <div style={{ fontFamily: FD, fontWeight: 500, fontSize: 17, color: C.cream, letterSpacing: "0.01em", lineHeight: 1 }}>Yassine Yahya</div>
          <div style={{ fontFamily: FD, fontStyle: "italic", fontSize: 12, color: C.creamSoft, borderLeft: B_NIGHT, paddingLeft: 10, lineHeight: 1.3 }}>Security · Data · Web</div>
        </div>

        <div className="p-dnav" style={{ alignItems: "center", gap: 4 }}>
          {NAV_LINKS.map(l => {
            const isActive = activeSection === l.toLowerCase();
            return <button key={l} className="p-link" onClick={() => scrollTo(l.toLowerCase())} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: FB, fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", color: isActive ? C.rust : C.creamSoft, padding: "6px 12px" }}>{l.toUpperCase()}</button>;
          })}
        </div>

        <button ref={mobileRef} className="p-burger" onClick={e => { e.stopPropagation(); setMenuOpen(o => !o); }} style={{ background: "none", border: B_NIGHT, cursor: "pointer", padding: 8, gap: 5 }}>
          <div style={{ width: 20, height: 1.5, background: C.cream, transition: "all .3s", transform: menuOpen ? "rotate(45deg) translateY(6.5px)" : "none" }}/>
          <div style={{ width: 20, height: 1.5, background: C.cream, opacity: menuOpen ? 0 : 1, transition: "opacity .3s" }}/>
          <div style={{ width: 20, height: 1.5, background: C.cream, transition: "all .3s", transform: menuOpen ? "rotate(-45deg) translateY(-6.5px)" : "none" }}/>
        </button>

        {menuOpen && (
          <div style={{ position: "absolute", top: 58, left: 0, right: 0, background: C.night, borderBottom: `2px solid ${C.rust}`, padding: "8px 24px 24px", zIndex: 99 }}>
            {NAV_LINKS.map(l => <button key={l} onClick={() => scrollTo(l.toLowerCase())} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", fontFamily: FB, fontSize: 14, fontWeight: 600, letterSpacing: "0.08em", color: C.cream, padding: "13px 0" }}>{l.toUpperCase()}</button>)}
          </div>
        )}
      </nav>

      {/* ── HERO — masthead, night background ──────────────────────────────── */}
      <section id="home" style={{ minHeight: "86vh", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 30, padding: `4.5rem clamp(14px,3.5vw,44px) 3rem`, background: C.night }}>

        <div style={MAX}>
          <div className="fu0 fi" style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
            <span className="p-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: C.rust, flexShrink: 0 }}/>
            <span style={{ fontFamily: FB, fontSize: 11.5, fontWeight: 600, color: C.creamSoft, letterSpacing: "0.16em" }}>OPEN TO SECURITY · DATA · WEB ROLES</span>
          </div>
        </div>

        <div style={{ ...MAX, width: "100%" }}>
          <h1 className="fu2" style={{ fontFamily: FD, fontWeight: 500, fontStyle: "italic", fontSize: "clamp(30px,6.4vw,84px)", lineHeight: 1.06, letterSpacing: "-0.01em", color: C.cream, margin: 0 }}>
            <span style={{ display: "block" }}>I secure <span style={{ color: C.creamSoft }}>systems.</span></span>
            <span style={{ display: "block" }}>I analyze <span style={{ color: C.creamSoft }}>data.</span></span>
            <span style={{ display: "block" }}>I build <span style={{ color: C.creamSoft }}>interfaces.</span></span>
          </h1>
        </div>

        <div style={MAX}>
          <div className="fu3 p-hero-bottom" style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 26, paddingTop: 26, borderTop: B_NIGHT }}>
            <div style={{ maxWidth: 380 }}>
              <div style={{ fontFamily: FD, fontWeight: 500, fontSize: 20, color: C.cream, marginBottom: 6 }}>Yassine Yahya</div>
              <p style={{ fontFamily: FB, fontSize: 13, color: C.creamSoft, lineHeight: 1.75 }}>14 years in banking operations &amp; risk, now rebuilt into three connected technical disciplines.</p>
            </div>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
              <a href={CV_URL} download className="p-btn-solid" style={{ fontFamily: FB, fontSize: 12.5, fontWeight: 600, letterSpacing: "0.04em", padding: "13px 26px", background: C.rust, border: `1px solid ${C.rust}`, color: C.cream, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>Download CV</a>
              <a href="mailto:yassineyahya50@gmail.com" className="p-btn-line" style={{ fontFamily: FB, fontSize: 12.5, fontWeight: 600, letterSpacing: "0.04em", padding: "13px 26px", background: "transparent", border: B_NIGHT, color: C.cream, textDecoration: "none" }}>Get in touch</a>
              <div style={{ display: "flex", gap: 8 }}>
                <a href="https://linkedin.com/in/yassineyahya" target="_blank" rel="noopener noreferrer" className="p-icon" style={{ width: 40, height: 40, border: B_NIGHT, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: C.cream }}><LinkedInIcon/></a>
                <a href="https://github.com/yassine-yahya" target="_blank" rel="noopener noreferrer" className="p-icon" style={{ width: 40, height: 40, border: B_NIGHT, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: C.cream }}><GitHubIcon/></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BY THE NUMBERS — count-up stat strip ───────────────────────────────── */}
      <section id="stats" style={{ padding: "3.2rem clamp(14px,3.5vw,44px)", background: C.paper, borderBottom: B_PAPER }}>
        <div style={MAX} ref={statsRef}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
            {stats.map((s, i) => (
              <div key={s.label} style={{ display: "flex", alignItems: "center" }}>
                <StatBlock {...s} inView={statsInView} delay={i * 0.12}/>
                {i < stats.length - 1 && <div style={{ width: 1, height: 54, background: C.rule }}/>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRACTICE — three disciplines as numbered rows, not a card grid ────── */}
      <section id="pillars" style={{ padding: PAD, background: C.paper }}>
        <div style={MAX}>
          <div ref={pillarsRef}>
            <Kicker num="01" label="Practice" inView={pillarsInView}/>
            <SecTitle a="Three disciplines," b="one connected toolkit." inView={pillarsInView}/>
            <div style={{ borderTop: B_PAPER }}>
              {pillars.map((p, i) => (
                <div key={p.tag} style={{ display: "grid", gridTemplateColumns: "70px 1fr", gap: 24, padding: "1.8rem 0", borderBottom: B_PAPER, ...rv(pillarsInView, 0.08 * i) }}>
                  <div ref={registerNum} className="p-num" style={{ fontSize: "clamp(34px,4vw,46px)", lineHeight: 1 }}>0{i+1}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, alignItems: "start" }}>
                    <div>
                      <div style={{ fontFamily: FB, fontSize: 10.5, fontWeight: 700, color: C.rust, letterSpacing: "0.14em", marginBottom: 8 }}>{p.tag}</div>
                      <div style={{ fontFamily: FD, fontWeight: 500, fontSize: 24, color: C.ink, marginBottom: 8 }}>{p.title}</div>
                      <p style={{ fontFamily: FB, fontSize: 13.5, color: C.inkSoft, lineHeight: 1.75 }}>{p.blurb}</p>
                    </div>
                    <TermRun items={p.skills}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT — drop cap + pull quote, editorial two-column ──────────────── */}
      <section id="about" style={{ padding: PAD, background: C.paperAlt }}>
        <div style={MAX}>
          <div ref={aboutRef}>
            <Kicker num="02" label="About" inView={aboutInView}/>
            <SecTitle a="Finance veteran," b="turned tri-profile technologist." inView={aboutInView}/>
            <div className="p-about" style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "3rem", alignItems: "start" }}>
              <p style={{ fontFamily: FB, fontSize: 15.5, color: C.ink, lineHeight: 1.9, ...COL, ...rv(aboutInView, 0.1) }}>
                <span style={{ fontFamily: FD, fontStyle: "italic", fontWeight: 600, fontSize: 58, lineHeight: 0.7, float: "left", marginRight: 10, marginTop: 8, color: C.rust }}>W</span>
                ith 14 years of leadership experience in the banking sector — much of it risk- and compliance-adjacent — I transitioned into technology to build across three connected disciplines: security analysis (SIEM, incident response, network monitoring — backed by a Google Cybersecurity Certificate), data science (Python, SQL, and visualization for decision-making), and full-stack web development (React, Node.js, REST APIs).
              </p>
              <div style={{ ...rv(aboutInView, 0.2) }}>
                <p style={{ fontFamily: FD, fontStyle: "italic", fontWeight: 500, fontSize: 21, color: C.ink, lineHeight: 1.45, borderLeft: `2px solid ${C.rust}`, paddingLeft: 18, marginBottom: 26 }}>
                  "Each discipline sharpens the others — I write the tools I analyze with, and visualize the data I detect."
                </p>
                {[["Location","Barcelona, Spain"],["Email","yassineyahya50@gmail.com"],["Phone","+34 602 317 364"],["Languages","AR · FR · ES · EN · CA"],["Status","Open to Security / Data / Web roles"]].map(([k,v]) => (
                  <div key={k} style={{ display: "flex", padding: "9px 0", gap: 14, alignItems: "flex-start", borderBottom: B_PAPER }}>
                    <span style={{ fontFamily: FB, fontSize: 10.5, fontWeight: 600, color: C.inkSoft, letterSpacing: "0.08em", width: 82, flexShrink: 0, paddingTop: 1 }}>{k.toUpperCase()}</span>
                    <span style={{ fontFamily: FB, fontSize: 13.5, fontWeight: 500, color: C.ink, wordBreak: "break-word" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS — index/table, prose terms instead of pill tags ───────────── */}
      <section id="skills" style={{ padding: PAD, background: C.paper }}>
        <div style={MAX}>
          <div ref={skillsRef}>
            <SectionHeader num="03" label="Skills" a="Three-discipline" b="technical toolkit." count={`${skillGroups.length} categories`} open={sectionsOpen.skills} onToggle={() => toggleSection("skills")} inView={skillsInView}/>
            <Collapse open={sectionsOpen.skills}>
              <div style={{ borderTop: B_PAPER }}>
                {skillGroups.map((g, gi) => (
                  <div key={g.cat} className="p-skill-row p-row" style={{ display: "flex", alignItems: "flex-start", borderBottom: B_PAPER, padding: "16px 4px", gap: 20 }}>
                    <div className="p-skill-cat" style={{ minWidth: 210, borderRight: B_PAPER, paddingRight: 20, flexShrink: 0 }}>
                      <span style={{ fontFamily: FD, fontStyle: "italic", fontWeight: 500, fontSize: 16, color: C.ink }}>{g.cat}</span>
                    </div>
                    <div style={{ flex: 1, paddingTop: 2 }}>
                      <TermRun items={g.tags}/>
                    </div>
                  </div>
                ))}
              </div>
            </Collapse>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE — chronological "chapters", not a card grid ───────────── */}
      <section id="experience" style={{ padding: PAD, background: C.paperAlt }}>
        <div style={MAX}>
          <div ref={expRef}>
            <SectionHeader num="04" label="Experience" a="Professional" b="journey." count={`${experience.length} roles`} open={sectionsOpen.experience} onToggle={() => toggleSection("experience")} inView={expInView}/>
            <Collapse open={sectionsOpen.experience}>
              <div style={{ borderTop: B_PAPER }}>
                {experience.map((exp, i) => (
                  <div key={i} className="p-row" style={{ display: "grid", gridTemplateColumns: "70px 1fr", gap: 24, padding: "1.8rem 4px", borderBottom: B_PAPER }}>
                    <div ref={registerNum} className="p-num" style={{ fontSize: 30 }}>0{i+1}</div>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                        <div>
                          <p style={{ fontFamily: FD, fontWeight: 500, fontSize: 22, color: C.ink, margin: "0 0 4px" }}>{exp.title}</p>
                          <p style={{ fontFamily: FD, fontStyle: "italic", fontSize: 13.5, color: C.rust, margin: 0 }}>{exp.company}</p>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontFamily: FB, fontSize: 11.5, fontWeight: 600, color: C.ink }}>{exp.period}</div>
                          <div style={{ fontFamily: FB, fontSize: 11.5, color: C.inkSoft }}>{exp.location}</div>
                        </div>
                      </div>
                      <p style={{ fontFamily: FB, fontSize: 14, color: C.inkSoft, lineHeight: 1.85, marginBottom: 12, ...COL }}>{exp.desc}</p>
                      <TermRun items={exp.tags}/>
                    </div>
                  </div>
                ))}
              </div>
            </Collapse>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS — bibliography-style index ─────────────────────────── */}
      <section id="certifications" style={{ padding: PAD, background: C.paper }}>
        <div style={MAX}>
          <div ref={certRef}>
            <SectionHeader num="05" label="Certifications & education" a="Credentials" b="& training." count={`${certifications.length} credentials`} open={sectionsOpen.certifications} onToggle={() => toggleSection("certifications")} inView={certInView}/>
            <Collapse open={sectionsOpen.certifications}>
              <div style={{ borderTop: B_PAPER }}>
                {certifications.map((c, i) => (
                  <div key={i} className="p-row" style={{ display: "grid", gridTemplateColumns: "40px 1fr", gap: 18, padding: "1.2rem 4px", borderBottom: B_PAPER }}>
                    <div ref={registerNum} className="p-num" style={{ fontSize: 22 }}>{String(i+1).padStart(2,"0")}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 10 }}>
                      <div style={{ flex: "1 1 320px" }}>
                        <p style={{ fontFamily: FD, fontWeight: 500, fontSize: 17, color: C.ink, marginBottom: 3, lineHeight: 1.25 }}>
                          {c.name}{c.inProgress && <em style={{ fontFamily: FD, fontStyle: "italic", fontSize: 12, color: C.rust, marginLeft: 8 }}>— in progress</em>}
                        </p>
                        <p style={{ fontFamily: FB, fontSize: 12, fontStyle: "italic", color: C.inkSoft, marginBottom: 8 }}>{c.org} &nbsp;·&nbsp; {c.detail}</p>
                        <TermRun items={c.skills}/>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Collapse>
          </div>
        </div>
      </section>

      {/* ── EDUCATION / WORKSHOPS + LANGUAGES ─────────────────────────────────── */}
      <section id="education" style={{ padding: PAD, background: C.paperAlt }}>
        <div style={MAX}>
          <div ref={eduRef}>
            <SectionHeader num="06" label="Education" a="Workshops &" b="languages." count={`${workshops.length} workshops · ${languages.length} languages`} open={sectionsOpen.education} onToggle={() => toggleSection("education")} inView={eduInView}/>
            <Collapse open={sectionsOpen.education}>
              <div className="p-edu" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
                <div>
                  <div style={{ fontFamily: FB, fontSize: 10.5, fontWeight: 600, color: C.inkSoft, letterSpacing: "0.14em", marginBottom: 14, borderBottom: B_PAPER, paddingBottom: 10 }}>WORKSHOPS &amp; MASTERCLASSES</div>
                  {workshops.map((w, i) => (
                    <div key={i} className="p-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 4px", borderBottom: B_PAPER }}>
                      <span style={{ fontFamily: FD, fontSize: 14.5, color: C.ink }}>{w.name}</span>
                      <span style={{ fontFamily: FB, fontSize: 11, fontStyle: "italic", color: C.rust, flexShrink: 0, marginLeft: 10 }}>{w.org}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontFamily: FB, fontSize: 10.5, fontWeight: 600, color: C.inkSoft, letterSpacing: "0.14em", marginBottom: 14, borderBottom: B_PAPER, paddingBottom: 10 }}>LANGUAGES</div>
                  {languages.map(l => (
                    <div key={l.lang} className="p-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 4px", borderBottom: B_PAPER }}>
                      <span style={{ fontFamily: FD, fontSize: 15, color: C.ink }}>{l.lang}</span>
                      <span style={{ fontFamily: FB, fontSize: 11, fontWeight: 600, color: C.inkSoft }}>{l.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Collapse>
          </div>
        </div>
      </section>

      {/* ── PROJECTS — a catalog, not fake terminal file cards ────────────────── */}
      <section id="projects" style={{ padding: PAD, background: C.paper }}>
        <div style={MAX}>
          <div ref={projRef}>
            <SectionHeader num="07" label="Projects" a="Things" b="I've built." count={`${projectFiles.length} projects`} open={sectionsOpen.projects} onToggle={() => toggleSection("projects")} inView={projInView}/>
            <Collapse open={sectionsOpen.projects}>
            <p style={{ fontFamily: FB, fontSize: 13.5, fontStyle: "italic", color: C.inkSoft, marginBottom: 22 }}>A mix of security tooling and web builds — same cross-discipline skill set, different angles.</p>
            <div style={{ borderTop: B_PAPER }}>
              {projectFiles.map((p, i) => {
                const tagColor = TAG_COLOR[p.tag];
                return (
                  <a key={p.id} href={p.link} target="_blank" rel="noopener noreferrer" className="p-proj p-row"
                    style={{ display: "grid", gridTemplateColumns: "40px 1fr", gap: 18, padding: "1.5rem 4px", borderBottom: B_PAPER, textDecoration: "none", color: "inherit" }}>
                    <div ref={registerNum} className="p-num" style={{ fontSize: 24 }}>{String(i+1).padStart(2,"0")}</div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                        <p style={{ fontFamily: FD, fontWeight: 500, fontSize: 20, color: C.ink, lineHeight: 1.2 }}>{p.title}</p>
                        <span style={{ fontFamily: FB, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.08em", color: tagColor, border: `1px solid ${tagColor}`, borderRadius: 20, padding: "2px 9px" }}>{p.tag}</span>
                      </div>
                      <div style={{ fontFamily: FD, fontStyle: "italic", fontSize: 13.5, color: tagColor, marginBottom: 10 }}>{p.impact}</div>
                      <p style={{ fontFamily: FB, fontSize: 13.5, color: C.inkSoft, lineHeight: 1.8, marginBottom: 10, ...COL }}>{p.desc}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
                        <TermRun items={p.tech}/>
                        <span className="p-proj-link" style={{ fontFamily: FB, fontSize: 12, fontWeight: 600, color: C.ink, whiteSpace: "nowrap" }}>View project →</span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            <a href="https://github.com/yassine-yahya" target="_blank" rel="noopener noreferrer"
              className="p-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.4rem 4px", borderBottom: B_PAPER, textDecoration: "none", gap: 16, flexWrap: "wrap" }}
            >
              <div>
                <p style={{ fontFamily: FD, fontWeight: 500, fontSize: 18, color: C.ink, margin: "0 0 4px" }}>More on GitHub</p>
                <p style={{ fontFamily: FB, fontSize: 13, color: C.inkSoft, margin: 0 }}>Explore more projects, experiments, and open-source contributions</p>
              </div>
              <span style={{ fontFamily: FB, fontSize: 12, fontWeight: 600, color: C.rust, whiteSpace: "nowrap" }}>github.com/yassine-yahya →</span>
            </a>
            </Collapse>
          </div>
        </div>
      </section>

      {/* ── FOOTER / CONTACT — colophon, night bookend ─────────────────────────── */}
      <section id="contact" style={{ padding: `4rem clamp(14px,3.5vw,44px) 2rem`, background: C.night }}>
        <div style={MAX}>
          <div ref={footerRef}>
            <div className="p-fg" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr", gap: "3rem", marginBottom: "2.5rem" }}>
              <div style={{ ...rv(footerInView, 0) }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 28, height: 28, border: `1px solid ${C.cream}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: FD, fontStyle: "italic", fontWeight: 500, fontSize: 15, color: C.cream, lineHeight: 1 }}>Y</span>
                  </div>
                  <div style={{ fontFamily: FD, fontWeight: 500, fontSize: 18, color: C.cream }}>Yassine Yahya</div>
                </div>
                <p style={{ fontFamily: FB, fontSize: 13, color: C.creamSoft, lineHeight: 1.75, maxWidth: 230, marginBottom: 18 }}>Security analyst, data scientist, and web developer — three disciplines, one connected toolkit.</p>
                <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                  {[{ icon: <LinkedInIcon/>, href: "https://linkedin.com/in/yassineyahya" },{ icon: <GitHubIcon/>, href: "https://github.com/yassine-yahya" }].map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="p-icon" style={{ width: 36, height: 36, border: B_NIGHT, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: C.cream }}>{s.icon}</a>
                  ))}
                </div>
              </div>

              <div style={{ ...rv(footerInView, 0.1) }}>
                <div style={{ fontFamily: FB, fontSize: 10, fontWeight: 600, color: C.creamSoft, letterSpacing: "0.14em", marginBottom: 16 }}>NAVIGATE</div>
                {NAV_LINKS.map(l => <button key={l} className="p-link" onClick={() => scrollTo(l.toLowerCase())} style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontFamily: FB, fontSize: 12.5, fontWeight: 500, letterSpacing: "0.03em", color: C.creamSoft, padding: "5px 0", marginBottom: 3, textAlign: "left" }}>{l.toUpperCase()}</button>)}
                <a href={LANDING_URL} target="_blank" rel="noopener noreferrer" style={{ display: "block", marginTop: 10, fontFamily: FD, fontStyle: "italic", fontSize: 13, color: C.rust, textDecoration: "none" }}>For businesses →</a>
              </div>

              <div style={{ ...rv(footerInView, 0.2) }}>
                <div style={{ fontFamily: FB, fontSize: 10, fontWeight: 600, color: C.creamSoft, letterSpacing: "0.14em", marginBottom: 16 }}>CONTACT</div>
                {[{ val: "yassineyahya50@gmail.com" },{ val: "+34 602 317 364" },{ val: "Barcelona, Spain" },{ val: "linkedin/yassineyahya" }].map((c, i) => (
                  <p key={i} style={{ fontFamily: FB, fontSize: 13, color: C.creamSoft, marginBottom: 9 }}>{c.val}</p>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, paddingTop: 22, borderTop: B_NIGHT, ...rv(footerInView, 0.25) }}>
              <p style={{ fontFamily: FB, fontSize: 11, fontWeight: 500, color: C.creamSoft, letterSpacing: "0.03em" }}>{"©"} 2026 Yassine Yahya · All rights reserved</p>
              <button onClick={() => scrollTo("home")} className="p-link" style={{ background: "none", border: "none", cursor: "pointer", fontFamily: FB, fontSize: 12, fontWeight: 600, color: C.cream, padding: "6px 0" }}>Back to top ↑</button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
