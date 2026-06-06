import { useState, useEffect, useRef } from "react";


const LinkedInIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

// ── Scroll-reveal hook (fires once) ───────────────────────────────────────────
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

// ── Animated number counter ───────────────────────────────────────────────────
function Counter({ to, suffix = "", duration = 1400, inView }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf;
    const t0 = performance.now();
    const run = (t) => {
      const p = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(run);
      else setN(to);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, [inView]);
  return <>{n}{suffix}</>;
}

// ── Reveal helper style ───────────────────────────────────────────────────────
const reveal = (inView, delay = 0, dir = "up") => ({
  opacity: inView ? 1 : 0,
  transform: inView
    ? "none"
    : dir === "up"   ? "translateY(22px)"
    : dir === "left" ? "translateX(-18px)"
    : "scale(0.96)",
  transition: `opacity 0.55s ${delay}s cubic-bezier(.22,.61,.36,1),
               transform 0.55s ${delay}s cubic-bezier(.22,.61,.36,1)`,
});

// ── GitHub dark palette ───────────────────────────────────────────────────────
const GH = {
  bg:        "#0d1117",
  surface:   "#161b22",
  card:      "#21262d",
  border:    "#30363d",
  text:      "#e6edf3",
  textSec:   "#8b949e",
  textMut:   "#484f58",
  blue:      "#388bfd",
  purple:    "#a371f7",
  green:     "#3fb950",
  orange:    "#f0883e",
  btnBg:     "#21262d",
  btnBorder: "#363b42",
};

// ── Skill groups — unique color per category ──────────────────────────────────
const skillGroups = [
  { cat: "Programming",             label: "#a371f7", cardBg: "rgba(163,113,247,0.06)", tags: ["Python", "JavaScript"] },
  { cat: "Web development",         label: "#388bfd", cardBg: "rgba(56,139,253,0.06)",  tags: ["HTML", "CSS", "React.js", "Node.js", "Next.js", "Express.js", "Bootstrap", "Tailwind", "REST APIs"] },
  { cat: "Data science / analysis", label: "#3fb950", cardBg: "rgba(63,185,80,0.06)",   tags: ["SQL", "PostgreSQL", "MongoDB", "NumPy", "Pandas", "Matplotlib", "NoSQL"] },
  { cat: "DevOps / systems",        label: "#f0883e", cardBg: "rgba(240,136,62,0.06)",  tags: ["Git", "GitHub", "Docker", "Linux", "Bash", "Agile / Scrum", "Airtable"] },
  { cat: "Security",                label: "#ff7b72", cardBg: "rgba(255,123,114,0.06)", tags: ["SIEM (SOC)", "Wireshark", "Nmap", "Metasploit", "Incident Response", "OAuth", "JWT"] },
  { cat: "Design / UX",             label: "#79c0ff", cardBg: "rgba(121,192,255,0.06)", tags: ["Figma", "Canva", "UX/UI Design"] },
];

// ── Experience ────────────────────────────────────────────────────────────────
const experience = [
  {
    title: "Coordinator Tech Education", company: "Migracode – Open Cultural Center",
    period: "Feb 2026 – Present", location: "Barcelona", accent: GH.purple,
    tags: ["React", "JavaScript", "HTML/CSS", "Mentoring", "Code Review"],
    desc: "Supported MigraCode's Full-Stack Bootcamp with code reviews and debugging support. Coordinated instructors, students, and a community of 30+ volunteers and 50+ students. Assisted with curriculum delivery, online sessions, mentorship programs, and event organization."
  },
  {
    title: "Volunteer IT & Technology Teacher", company: "Fundación Prau",
    period: "2024 – 2025 · 1 year", location: "Barcelona", accent: GH.blue,
    tags: ["Teaching", "Curriculum Design", "Digital Literacy", "Adaptability"],
    desc: "Designed and delivered IT literacy and introductory programming for adults in social inclusion programs, supporting 60+ students across 70+ classes. Adapted and delivered content for non-technical learners, covering digital tools, productivity software, and coding fundamentals."
  },
  {
    title: "Volunteer Web Dev Bootcamp Assistant", company: "MigraCode Barcelona",
    period: "2024 · 3 months", location: "Barcelona", accent: GH.purple,
    tags: ["JavaScript", "Node.js", "React", "Full-Stack", "Agile / Scrum"],
    desc: "Assisted lead instructors across a 3-month full-stack bootcamp. Provided technical support, reviewed student projects, and led hands-on sessions in JavaScript, Node.js, and React — deepening expertise in modern full-stack web development."
  },
  {
    title: "Branch Manager · Advisor · Cashier", company: "BMCE Bank",
    period: "2008 – 2022 · 14 years", location: "Tangier, Morocco", accent: GH.orange,
    tags: ["Data Analysis", "Leadership", "Risk Assessment", "Financial Reporting", "Team Management"],
    desc: "Led daily operations of a full-service banking branch over 14 years, managing client portfolios and a multidisciplinary team. Drove sustained business growth, contributing to €5M+ in deposits and ~30% portfolio growth. Applied data-driven analysis for financial reporting and risk assessment, ensuring operational efficiency and compliance."
  },
  {
    title: "Email Marketing Manager", company: "Elysium3",
    period: "2005 – 2007 · 2 years", location: "Tangier, Morocco", accent: GH.textSec,
    tags: ["Digital Marketing", "A/B Testing", "Analytics", "Campaign Optimization"],
    desc: "Designed and optimized 4+ end-to-end digital marketing campaigns across email platforms. Managed automation workflows, KPI tracking, A/B testing, and audience segmentation to improve engagement and conversion rates. Coordinated with 5+ sponsors/partners to align messaging and deliver performance reporting."
  },
];

// ── Certifications — ordered newest to oldest ─────────────────────────────────
const certifications = [
  {
    name: "Data Science Professional", org: "IBM / Coursera",
    detail: "In progress", accent: GH.orange, inProgress: true,
    skills: ["Python", "NumPy", "Pandas", "Matplotlib", "Machine Learning", "SQL", "Data Analysis", "Jupyter"]
  },
  {
  name: "Education & Innovation",
  org: "International Training Center, Prague, Czech Republic",
  detail: "1 Week · May 2026",
  accent: GH.blue,
  inProgress: false,
  skills: [
    "Flipped Classroom",
    "AI Tools for Education",
    "Educational Technology",
    "Digital Learning",
    "Project-Based Learning",
    "Instructional Design",
    "Collaborative Learning",
    "Innovation in Education",
    "Student-Centered Learning",
    "Digital Transformation"
  ]
},
  {
    name: "IT Fundamentals", org: "IBM",
    detail: "40h · Feb 2025", accent: GH.blue, inProgress: false,
    skills: ["Cloud Basics", "Networking", "Security Fundamentals", "DevOps", "Operating Systems"]
  },
  {
    name: "Cybersecurity Professional", org: "Google / Coursera",
    detail: "120h · Dec 2024", accent: GH.purple, inProgress: false,
    skills: ["SIEM", "Incident Response", "Network Security", "Linux", "Threat Analysis", "Risk Assessment"]
  },
  {
    name: "Full-Stack Web Developer", org: "MigraCode Barcelona",
    detail: "700h · 2023–2024", accent: GH.blue, inProgress: false,
    skills: ["HTML/CSS", "JavaScript", "React.js", "Node.js", "Express.js", "MongoDB", "PostgreSQL", "Git", "Agile"]
  },
  {
    name: "IT Automation with Python", org: "Google / Coursera",
    detail: "60h · Nov 2023", accent: GH.purple, inProgress: false,
    skills: ["Python", "Bash Scripting", "Git", "REST APIs", "Regular Expressions", "Config Management"]
  },
  {
    name: "Brevet Bancaire – Chargé de Clientèle", org: "BMCE Bank Academy",
    detail: "200h · 2016–2017", accent: GH.textSec, inProgress: false,
    skills: ["Financial Analysis", "Client Management", "Risk Assessment", "Banking Operations", "Compliance"]
  },
  {
    name: "IT Management Technician", org: "ITG Morocco",
    detail: "2003–2005", accent: GH.textSec, inProgress: false,
    skills: ["Hardware", "Networking", "Database Management", "System Administration", "IT Support"]
  },
];

// ── Workshops ─────────────────────────────────────────────────────────────────
const workshops = [
  { name: "Masterclass Astro",           org: "Porsche Digital"  },
  { name: "Hackday Netlify / Gatsby",    org: "RedHat"           },
  { name: "UI/UX Design in Figma",       org: "Porsche Digital"  },
  { name: "Testing CI/CD Pipeline",      org: "New Relic"        },
  { name: "TensorFlow.js",               org: "Porsche Digital"  },
  { name: "Object-Oriented Programming", org: "Barcelona Activa" },
];

// ── Languages ─────────────────────────────────────────────────────────────────
const languages = [
  { lang: "Arabic",  level: "Native",         pct: 100, color: GH.blue   },
  { lang: "French",  level: "Professional",    pct: 90,  color: GH.purple },
  { lang: "Spanish", level: "Professional",    pct: 88,  color: GH.blue   },
  { lang: "English", level: "Professional",    pct: 85,  color: GH.purple },
  { lang: "Catalan", level: "Basic – Level 3", pct: 30,  color: GH.textSec},
];

// ── Stats ─────────────────────────────────────────────────────────────────────
const stats = [
  { to: 1000, suffix: "+", label: "HOURS OF LEARNING"       },
  { to: 1500,  suffix: "+", label: "HOURS OF CODING"         },
  { to: 16,   suffix: "yrs", label: "PROFESSIONAL EXPERIENCE" },
  { to: 5,    suffix: "",  label: "LANGUAGES SPOKEN"        },
];

// ── Projects ──────────────────────────────────────────────────────────────────
const projectFiles = [
  { id:1, fileName:"PortHunter.js",           title:"PortHunter",                      tech:["Express.js","Python","Nmap","JavaScript","Vercel"],       link:"https://porthunter.vercel.app/",                               desc:"Network port scanner that detects open/closed ports and security protocols. Built with React, Node.js and Python — requires admin privileges to run the scan." },
  { id:2, fileName:"Socket-Server-Client.py", title:"Socket Server-Client Messaging",  tech:["Socket","Python"],                                        link:"https://github.com/yassine-yahya/socket-server-client-python", desc:"Python messaging app using sockets for communication between a server and multiple clients. Demonstrates core network programming and can be extended for cybersecurity use." },
  { id:3, fileName:"web-scraping.py",         title:"Web Scraping & Security Headers", tech:["BeautifulSoup4","Colorama","Python"],                     link:"https://github.com/yassine-yahya/web-scraping-Bs4-Requests",   desc:"Scrapes a target URL, checks for HTTP security headers presence, and extracts page title and links. Useful for quick security audits of web pages." },
  { id:4, fileName:"ssh-connection.py",       title:"SSH Connection Script",           tech:["Python","Colorama","Paramiko"],                           link:"https://github.com/yassine-yahya/ssh-access-paramiko",         desc:"Automates SSH connections using Paramiko and handles common SSH errors gracefully. Clean CLI output with Colorama highlighting." },
  { id:5, fileName:"card-pairs-game.js",      title:"Card Pairs Game",                 tech:["JavaScript","HTML","CSS","GitHub Pages"],                 link:"https://yassine-yahya.github.io/card-pairs-game/",             desc:"Memory matching game where players flip cards to find matching pairs. Pure vanilla JS with smooth flip animations." },
  { id:6, fileName:"guess-pin.js",            title:"Guess The PIN",                   tech:["JavaScript","HTML","CSS","GitHub Pages"],                 link:"https://yassine-yahya.github.io/guess-pin/",                   desc:"Interactive number guessing game. Players try to guess a randomly generated 4-digit number with unique digits. Built with vanilla JS." },
  { id:7, fileName:"nmap-scanner.py",         title:"Nmap Scanner with Python",        tech:["Nmap","Colorama","Python"],                               link:"https://github.com/yassine-yahya/port-scanner-python-nmap",    desc:"Uses Nmap to scan a target for open ports and services. Highlights results with Colorama for readability. Runs an automated scan every 5 seconds." },
  { id:8, fileName:".github",                 title:"GitHub Profile",                  tech:["Git","GitHub"],                                           link:"https://github.com/yassine-yahya",                             desc:"For more projects, experiments, and open-source contributions — visit the GitHub profile." },
];

const EXT_COLOR = { js:"#e8c73a", py:"#4b8bbe", github:"#f05032" };
const extOf = (fn) => fn.startsWith(".") ? "github" : fn.split(".").pop();
const iconOf = (fn) => ({ js:"JS", py:"PY", github:"⬡" })[extOf(fn)] || "  ";

const wrapText = (text, max = 52) => {
  const words = text.split(" ");
  const lines = [];
  let curr = "";
  words.forEach(w => {
    if ((curr ? curr + " " + w : w).length > max) { if (curr) lines.push(curr); curr = w; }
    else curr = curr ? curr + " " + w : w;
  });
  if (curr) lines.push(curr);
  return lines;
};

const getEditorLines = (p) => {
  const S = (text, color) => ({ text, color });
  const P = (...parts) => ({ parts });
  const descLines = wrapText(p.desc);
  return [
    S("/**", "#6e7681"),
    P({ text:" * @project  ", color:"#6e7681" }, { text:p.title, color:"#a371f7" }),
    S(" */", "#6e7681"),
    S("", ""),
    ...descLines.map(l => S(`// ${l}`, "#6e7681")),
    S("", ""),
    P({ text:"const ", color:"#ff7b72" }, { text:"stack", color:"#e6edf3" }, { text:" = [", color:"#e6edf3" }),
    ...p.tech.map(t => S(`  "${t}",`, "#a5d6ff")),
    S("];", "#e6edf3"),
    S("", ""),
    P({ text:"// → ", color:"#6e7681" }, { text:p.link, color:"#388bfd" }),
  ];
};

const NAV_LINKS = ["Home", "About", "Experience", "Projects", "Certifications", "Contact"];

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);

  const [heroStatsRef, heroStatsInView] = useInView(0.4);
  const [aboutRef,     aboutInView]     = useInView();
  const [skillsRef,    skillsInView]    = useInView();
  const [expRef,       expInView]       = useInView();
  const [projRef,      projInView]      = useInView();
  const [certRef,      certInView]      = useInView();
  const [eduRef,       eduInView]       = useInView();
  const [footerRef,    footerInView]    = useInView();

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.textContent = `
      *{box-sizing:border-box;margin:0;padding:0;}
      html{scroll-behavior:smooth;}
      @media (max-width: 700px) {
  .proj-grid {
    grid-template-columns: 1fr !important;
  }
}
      ::-webkit-scrollbar{width:5px;}
      ::-webkit-scrollbar-track{background:#0d1117;}
      ::-webkit-scrollbar-thumb{background:#30363d;border-radius:3px;}
      @keyframes fadeUp{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:none}}
      @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}
      @keyframes sectionGlow{0%{box-shadow:0 0 40px rgba(163,113,247,0.06);background:rgba(163,113,247,0.02);}100%{box-shadow:none;background:transparent;}}
      .section-glow{animation:sectionGlow 2s ease-out forwards;border-radius:12px;}
      .social-sq{transition:background .2s,border-color .2s,transform .2s;}
      .social-sq:hover{background:#21262d!important;border-color:#484f58!important;transform:translateY(-2px);}
      .scroll-down{animation:bounce 2s ease-in-out infinite;}
      .fu0{animation:fadeUp .65s .00s both}
      .fu1{animation:fadeUp .65s .12s both}
      .fu2{animation:fadeUp .65s .24s both}
      .fu3{animation:fadeUp .65s .38s both}
      .fu4{animation:fadeUp .65s .52s both}
      .fi{animation:fadeIn .9s both}
      .exp-card{transition:transform .25s;}
      .exp-card:hover{transform:translateX(4px);}
      .cert-card{transition:transform .2s;}
      .cert-card:hover{transform:translateY(-3px);}
      .proj-card{transition:transform .2s, box-shadow .2s;}
      .proj-card:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,0.3);}
      .nl:hover{color:#e6edf3!important;}
      .sb:hover{background:#21262d!important;}
      .stat-block{transition:transform .2s;}
      .stat-block:hover{transform:translateY(-3px);}
      .gh-tag:hover{color:#e6edf3!important;}
      .dnav{display:flex;}
      .hmb{display:none;}
      @media(max-width:660px){
        .dnav{display:none!important;} .hmb{display:flex!important;}
        .htitle{font-size:40px!important;line-height:1.1!important;}
        .sg{grid-template-columns:1fr!important;}
        .ag{grid-template-columns:1fr!important;}
        .cg{grid-template-columns:1fr!important;}
        .eg{grid-template-columns:1fr!important;}
        .fg{grid-template-columns:1fr!important;}
        .exp-grid{grid-template-columns:1fr!important;}
        .proj-grid{grid-template-columns:1fr!important;}
        .proj-banner{grid-column:span 1!important;}
        .cta-r{flex-direction:column;align-items:center;width:100%;}
        .sec{padding:3rem 1rem!important;}
        .vsc-layout{flex-direction:column!important;height:auto!important;}
        .vsc-sidebar{width:100%!important;height:130px!important;overflow-x:auto!important;overflow-y:hidden!important;display:flex!important;}
        .vsc-sidebar p{display:none!important;}
        .stat-row{flex-direction:column!important;align-items:center!important;}
      }
      @media(max-width:420px){
        .sg{grid-template-columns:1fr!important;}
        .htitle{font-size:30px!important;}
      }
        .proj-grid,
.proj-card {
  width: 100%;
  min-width: 0;
}

.proj-card * {
  min-width: 0;
  overflow-wrap: break-word;
  word-wrap: break-word;
}

@media (max-width: 660px) {
  .proj-grid {
    grid-template-columns: 1fr !important;
  }

  .proj-card {
    width: 100% !important;
    overflow: hidden;
  }
}
    `;
    document.head.appendChild(style);

    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const Divider = () => (
    <div style={{
      height: "1px", maxWidth: "960px", margin: "0 auto",
      background: "linear-gradient(90deg, transparent 0%, #30363d 20%, #30363d 80%, transparent 100%)",
    }} />
  );

  const SEC_NUM = { About:"01", Skills:"02", Experience:"03", Projects:"05", Certifications:"04", Contact:"07" };

  const SectionLabel = ({ text, inView, delay = 0 }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", ...reveal(inView, delay, "left") }}>
      {SEC_NUM[text] && (
        <span style={{ fontSize: "11px", color: GH.textMut, fontFamily: "'Space Mono', monospace" }}>{SEC_NUM[text]} /</span>
      )}
      <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: GH.orange }}>{text}</span>
    </div>
  );

  return (
    <div style={{ background: GH.bg, color: GH.text, fontFamily: "'Outfit', system-ui, sans-serif", minHeight: "100vh" }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: scrolled ? "rgba(13,17,23,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: `1px solid ${scrolled ? GH.border : "transparent"}`,
        transition: "all .3s ease",
        padding: "0 1.5rem", height: "58px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          <span style={{ fontSize: "14px", fontWeight: 700, color: GH.text }}>Yassine-Yahya</span>
          <span style={{ fontSize: "17px", fontWeight: 800, color: GH.purple }}>.</span>
          <span style={{ fontSize: "17px", fontWeight: 700, color: GH.blue }}>Dev</span>
        </div>

        <div className="dnav" style={{ alignItems: "center", gap: "4px" }}>
          {NAV_LINKS.map(l => (
            <button key={l} className="nl" onClick={() => scrollTo(l.toLowerCase())} style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: "15px", color: GH.textSec, padding: "6px 14px",
              borderRadius: "6px", transition: "color .2s", fontFamily: "inherit",
              fontWeight: 500, letterSpacing: "0.01em",
            }}>{l}</button>
          ))}

          {/* Download CV */}
          <a href="https://drive.google.com/file/d/1LOZgHP2OoyqFiWjyZ4PmmCcG36vH7TIR/view?usp=sharing"  target="_blank"
  rel="noopener noreferrer" download style={{
            background: GH.btnBg, border: `1px solid ${GH.btnBorder}`,
            fontSize: "14px", color: GH.text, padding: "7px 16px", borderRadius: "6px",
            marginLeft: "8px", fontFamily: "inherit", fontWeight: 500,
            textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px",
            transition: "background .2s",
            
          }}
            onMouseEnter={e => e.currentTarget.style.background = "#30363d"}
            onMouseLeave={e => e.currentTarget.style.background = GH.btnBg}
          >
            <span style={{ fontSize: "11px" }}>↓</span> Download CV
          </a>
        </div>

        <button className="hmb" onClick={() => setMenuOpen(!menuOpen)} style={{
          background: GH.btnBg, border: `1px solid ${GH.border}`, cursor: "pointer",
          color: GH.text, padding: "5px 10px", borderRadius: "6px", fontSize: "14px",
        }}>{menuOpen ? "✕" : "☰"}</button>
      </nav>

      {menuOpen && (
        <div style={{
          position: "fixed", top: "58px", left: 0, right: 0, zIndex: 99,
          background: GH.surface, borderBottom: `1px solid ${GH.border}`, padding: "0.5rem 1rem",
        }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase())} style={{
              display: "block", width: "100%", textAlign: "left",
              background: "none", border: "none", borderBottom: `1px solid ${GH.card}`,
              cursor: "pointer", fontSize: "15px", color: GH.text,
              padding: "13px 8px", fontFamily: "inherit",
            }}>{l}</button>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section id="home" className="sec" style={{
        padding: "4rem 1.5rem", maxWidth: "960px", margin: "0 auto",
        minHeight: "80vh", display: "flex", flexDirection: "column",
        alignItems: "flex-start", justifyContent: "center",
        position: "relative",
        
      }}>

        <p className="fi" style={{
          fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em",
          textTransform: "uppercase", color: GH.green, marginBottom: "1.5rem",
          display: "flex", alignItems: "center", gap: "8px",
        }}>
          <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: GH.green, display: "inline-block", boxShadow: "0 0 8px #3fb95080" }} />
          Available for work · Barcelona, Spain - Hybrid
        </p>

        <h1 className="fu0 htitle" style={{
          fontSize: "72px", fontWeight: 800, lineHeight: 1.05,
          letterSpacing: "-0.04em", marginBottom: "1.5rem", color: GH.text,
          maxWidth: "720px",
        }}>
          Turning <span style={{ color: GH.blue }}>data</span>{" "}
          into decisions.<br />
          <span style={{ color: GH.purple }}>Code</span> into
          solutions.
        </h1>

        <p className="fu1" style={{
          fontSize: "18px", color: GH.textSec, lineHeight: 1.75,
          maxWidth: "560px", marginBottom: "2rem", fontWeight: 300,
        }}>
Data Science & Web Development specialist building data-driven web applications that combine analytics, performance, and usability.        </p>

        {/* CTA buttons + LinkedIn/GitHub squares */}
        <div className="fu2 cta-r" style={{ display: "flex", gap: "10px", marginBottom: "3rem", flexWrap: "wrap", alignItems: "center" }}>
          <button onClick={() => scrollTo("projects")} style={{
            background: GH.blue, border: "none", cursor: "pointer", color: "#fff",
            fontSize: "14px", padding: "9px 24px", borderRadius: "6px",
            fontFamily: "inherit", fontWeight: 500, transition: "opacity .2s",
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = ".82"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >View projects</button>
          <a href="mailto:yassineyahya50@gmail.com" style={{
            background: GH.btnBg, border: `1px solid ${GH.btnBorder}`, textDecoration: "none",
            color: GH.text, fontSize: "14px", padding: "9px 24px", borderRadius: "6px",
          }}>Get in touch</a>

          {/* Separator */}
          <div style={{ width: "1px", height: "30px", background: GH.border, margin: "0 4px" }} />

          {/* LinkedIn square */}
          <a href="https://linkedin.com/in/yassineyahya" target="_blank" rel="noopener noreferrer"
            className="social-sq" title="LinkedIn" style={{
              width: "40px", height: "40px", borderRadius: "8px",
              background: GH.surface, border: `1px solid ${GH.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              textDecoration: "none", color: GH.textSec,
            }}><LinkedInIcon /></a>

          {/* GitHub square */}
          <a href="https://github.com/yassine-yahya" target="_blank" rel="noopener noreferrer"
            className="social-sq" title="GitHub" style={{
              width: "40px", height: "40px", borderRadius: "8px",
              background: GH.surface, border: `1px solid ${GH.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              textDecoration: "none", color: GH.textSec,
            }}><GitHubIcon /></a>
        </div>

        {/* ── STATS — centered, square, no border ── */}
        <div ref={heroStatsRef} className="fu3 stat-row" style={{
          display: "flex", gap: "12px", flexWrap: "wrap",
          width: "100%", justifyContent: "center", marginBottom: "1.5rem",
        }}>
          {stats.map((s, i) => (
            <div key={s.label} className="stat-block" style={{
              width: "148px", height: "148px",
              display: "flex", flexDirection: "column",
              justifyContent: "center", alignItems: "center",
              borderRadius: "10px", background: GH.surface,
              ...reveal(heroStatsInView, i * 0.1),
            }}>
              <p style={{ fontSize: "28px", fontWeight: 400, color: GH.text, margin: "0 0 6px", fontFamily: "'Space Mono', monospace" }}>
                <Counter to={s.to} suffix={s.suffix} inView={heroStatsInView} duration={1200 + i * 100} />
              </p>
              <p style={{ fontSize: "11px", color: GH.textMut, margin: 0, textAlign: "center", padding: "0 10px", lineHeight: 1.4 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Portfolio always updating — centered banner */}
        <div className="fu4" style={{
          width: "100%", display: "flex", justifyContent: "center",
          marginBottom: "2rem",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            padding: "10px 20px", borderRadius: "8px",
            background: "rgba(63,185,80,0.08)", border: "1px solid rgba(63,185,80,0.2)",
          }}>
            <span style={{ color: GH.green, fontSize: "16px", display: "inline-block", animation: "spin 4s linear infinite" }}>↻</span>
            <span style={{ fontSize: "13px", color: GH.textSec, lineHeight: 1.5 }}>
              This portfolio is <span style={{ color: GH.green, fontWeight: 600 }}>always updating</span> — come back anytime to discover new projects, skills & experiences
            </span>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <div className="scroll-down" onClick={() => scrollTo("about")} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
            cursor: "pointer", opacity: 0.9, transition: "opacity .2s",
          }}>
            <span style={{ fontSize: "11px", color: GH.textMut, letterSpacing: "0.1em", textTransform: "uppercase" }}>scroll</span>
            <span style={{ color: GH.textMut, fontSize: "18px" }}>↓</span>
          </div>
        </div>

      </section>

      <Divider />

      {/* ── ABOUT ── */}
      <section id="about" className="sec" style={{ padding: "4rem 1.5rem", maxWidth: "960px", margin: "0 auto" }}>
        <div ref={aboutRef} className={aboutInView ? "section-glow" : ""}>
          <SectionLabel text="About" inView={aboutInView} />

          <h2 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "1.75rem", letterSpacing: "-0.02em", lineHeight: 1.2, ...reveal(aboutInView, 0.05) }}>
            Finance veteran turned<br /> Tech Professional.
          </h2>
          <div className="ag" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "2.5rem", alignItems: "start" }}>
            <p style={{ fontSize: "16px", color: GH.textSec, lineHeight: 1.85, fontWeight: 300, ...reveal(aboutInView, 0.12) }}>
              Yassine Yahya, With 14 years in banking leadership and a bold transition into technology, I combine strategic thinking with hands-on technical skills. My training includes certifications in Cybersecurity, IT Automation with Python, IT Support, Full-Stack Web Development, and Data Science — providing expertise across software development, automation, data analytics, and security. I am passionate about building reliable, efficient, and data-driven applications that solve real-world problems.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", ...reveal(aboutInView, 0.2) }}>
              {[
                { label: "Location",  val: "Barcelona, Spain",         col: GH.blue   },
                { label: "Email",     val: "yassineyahya50@gmail.com", col: GH.purple },
                { label: "Phone",     val: "+34 602 317 364",          col: GH.blue   },
                { label: "Languages", val: "AR · FR · ES · EN · CA",  col: GH.purple },
                { label: "Status",    val: "Open to opportunities",    col: GH.green  },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", gap: "12px" }}>
                  <div style={{ width: "2px", borderRadius: "2px", background: item.col, flexShrink: 0, alignSelf: "stretch" }} />
                  <div>
                    <p style={{ fontSize: "10px", color: GH.textMut, textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 2px" }}>{item.label}</p>
                    <p style={{ fontSize: "14px", color: GH.textSec, margin: 0 }}>{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── SKILLS ── */}
      <section id="skills" className="sec" style={{ padding: "4rem 1.5rem", maxWidth: "960px", margin: "0 auto" }}>
        <div ref={skillsRef} className={skillsInView ? "section-glow" : ""}>
          <SectionLabel text="Skills" inView={skillsInView} />
          <h2 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "0.5rem", letterSpacing: "-0.02em", ...reveal(skillsInView, 0.05) }}>Technical toolkit</h2>
          <p style={{ fontSize: "15px", color: GH.textSec, marginBottom: "2.5rem", fontWeight: 300, ...reveal(skillsInView, 0.08) }}>
            Technologies and tools I work with across development, data, and security.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {skillGroups.map((g, gi) => (
              <div key={g.cat} style={{
                display: "flex", alignItems: "flex-start", gap: "20px",
                ...reveal(skillsInView, 0.1 + gi * 0.07),
              }}>
                {/* Category label */}
                <span style={{
                  fontSize: "10px", fontFamily: "'Space Mono', monospace",
                  color: GH.textMut, textTransform: "uppercase",
                  letterSpacing: "0.07em", minWidth: "110px",
                  marginTop: "9px", lineHeight: 1.4, flexShrink: 0,
                }}>{g.cat}</span>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {g.tags.map((tag, ti) => (
                    <span key={tag}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = GH.textSec; e.currentTarget.style.color = GH.text; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = GH.border; e.currentTarget.style.color = GH.textSec; }}
                      style={{
                        fontSize: "14px", padding: "7px 18px", borderRadius: "24px",
                        background: "transparent", color: GH.textSec,
                        border: `1px solid ${GH.border}`,
                        cursor: "default",
                        opacity: skillsInView ? 1 : 0,
                        transform: skillsInView ? "none" : "translateY(10px)",
                        transition: `opacity 0.4s ${0.15 + gi * 0.07 + ti * 0.03}s ease,
                                     transform 0.4s ${0.15 + gi * 0.07 + ti * 0.03}s ease,
                                     color .15s, border-color .15s`,
                      }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="sec" style={{ padding: "4rem 1.5rem", maxWidth: "960px", margin: "0 auto" }}>
        <div ref={expRef} className={expInView ? "section-glow" : ""}>
          <SectionLabel text="Experience" inView={expInView} />
          <h2 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "2rem", letterSpacing: "-0.02em", ...reveal(expInView, 0.05) }}>Professional journey</h2>
          <div className="proj-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>            {experience.map((exp, i) => (
              <div key={i} className="exp-card" style={{
                background: GH.surface, borderRadius: "8px",
                padding: "1.25rem 1.5rem",
                border: `1px solid ${GH.border}`,
                ...reveal(expInView, 0.08 + i * 0.1),
                
                
              }}>
                
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px", flexWrap: "wrap", gap: "8px" }}>
                  <div>
                    <p style={{ fontSize: "16px", fontWeight: 600, color: GH.text, margin: "0 0 4px" }}>{exp.title}</p>
                    <p style={{ fontSize: "13px", color: GH.purple, margin: 0, fontWeight: 500 }}>{exp.company}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "5px" }}>
                    <span style={{
                      fontSize: "12px", padding: "3px 10px", borderRadius: "20px",
                      background: "rgba(255,255,255,0.06)", color: GH.textSec,
                      fontFamily: "'Space Mono', monospace", fontWeight: 400,
                      display: "flex", alignItems: "center", gap: "5px",
                    }}>
                      <span style={{ fontSize: "10px" }}>📅</span> {exp.period}
                    </span>
                    <span style={{
                      fontSize: "11px", padding: "2px 10px", borderRadius: "20px",
                      background: "rgba(255,255,255,0.04)", color: GH.textSec,
                      display: "flex", alignItems: "center", gap: "5px",
                    }}>
                      <span style={{ fontSize: "10px" }}>📍</span> {exp.location}
                    </span>
                  </div>
                </div>
                <p style={{ fontSize: "15px", color: GH.textSec, lineHeight: 1.75, marginBottom: "10px", fontWeight: 300 }}>{exp.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                  {exp.tags.map(tag => (
                    <span key={tag} className="gh-tag" style={{
                      fontSize: "11px", padding: "3px 10px", borderRadius: "20px",
                      background: "rgba(255,255,255,0.05)", color: GH.textSec, cursor: "default",
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Divider />

      {/* ── CERTIFICATIONS ── */}
      <section id="certifications" className="sec" style={{ padding: "4rem 1.5rem", maxWidth: "960px", margin: "0 auto" }}>
        <div ref={certRef} className={certInView ? "section-glow" : ""}>
          <SectionLabel text="Certifications" inView={certInView} />
          <h2 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "2rem", letterSpacing: "-0.02em", ...reveal(certInView, 0.05) }}>Credentials</h2>
          <div className="cg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {certifications.map((c, i) => (
              <div key={i} className="cert-card" style={{
                background: GH.surface, borderRadius: "10px",
                padding: "1.4rem", display: "flex", flexDirection: "column", gap: "10px",
                ...reveal(certInView, 0.08 + i * 0.07, "scale"),
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "15px", fontWeight: 700, color: GH.text, marginBottom: "4px", lineHeight: 1.3 }}>{c.name}</p>
                    <p style={{ fontSize: "13px", color: c.accent, marginBottom: "6px" }}>{c.org}</p>
                    <span style={{
                      fontSize: "12px", fontFamily: "'Space Mono', monospace",
                      color: GH.text, fontWeight: 700,
                      background: "rgba(255,255,255,0.07)",
                      padding: "3px 10px", borderRadius: "4px",
                    }}>{c.detail}</span>
                  </div>
                  {c.inProgress && (
                    <span style={{
                      fontSize: "10px", fontWeight: 700, padding: "3px 8px", borderRadius: "20px",
                      background: "rgba(240,136,62,0.15)", color: GH.orange,
                      whiteSpace: "nowrap", flexShrink: 0,
                      letterSpacing: "0.06em", textTransform: "uppercase",
                    }}>In Progress</span>
                  )}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                  {c.skills.map(skill => (
                    <span key={skill} style={{
                      fontSize: "11px", padding: "3px 9px", borderRadius: "20px",
                      background: "rgba(255,255,255,0.05)", color: GH.textSec,
                      fontWeight: 400,
                    }}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── EDUCATION / WORKSHOPS / LANGUAGES ── */}
      <section id="education" className="sec" style={{ padding: "4rem 1.5rem", maxWidth: "960px", margin: "0 auto" }}>
        <div ref={eduRef} className={eduInView ? "section-glow" : ""}>
         
          
          <div className="eg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}>

            <div style={{ ...reveal(eduInView, 0.1) }}>
              <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: GH.textMut, marginBottom: "1rem" }}>Workshops & Masterclasses</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {workshops.map((w, i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "10px 14px", background: GH.surface, borderRadius: "8px",
                    opacity: eduInView ? 1 : 0,
                    transform: eduInView ? "none" : "translateX(-10px)",
                    transition: `opacity 0.4s ${0.15 + i * 0.07}s ease, transform 0.4s ${0.15 + i * 0.07}s ease`,
                  }}>
                    <p style={{ fontSize: "14px", color: GH.textSec, margin: 0 }}>{w.name}</p>
                    <p style={{ fontSize: "11px", color: GH.blue, margin: 0, flexShrink: 0, marginLeft: "8px" }}>{w.org}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ ...reveal(eduInView, 0.15) }}>
              <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: GH.textMut, marginBottom: "1rem" }}>Languages</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {languages.map((l, i) => (
                  <div key={i}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontSize: "13px", color: GH.text, fontWeight: 500 }}>{l.lang}</span>
                      <span style={{ fontSize: "12px", color: GH.textMut }}>{l.level}</span>
                    </div>
                    <div style={{ height: "4px", background: GH.card, borderRadius: "2px", overflow: "hidden" }}>
                      <div style={{
                        height: "100%", borderRadius: "2px",
                        background: `linear-gradient(90deg, #a371f7, #388bfd)`,
                        width: eduInView ? `${l.pct}%` : "0%",
                        transition: `width 0.9s ${0.25 + i * 0.12}s cubic-bezier(.22,.61,.36,1)`,
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>


      <Divider />

      <section id="projects" className="sec" style={{ padding: "4rem 1.5rem", maxWidth: "960px", margin: "0 auto" }}>
        <div ref={projRef} className={projInView ? "section-glow" : ""}>
          <SectionLabel text="Projects" inView={projInView} />
          <h2 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "0.5rem", letterSpacing: "-0.02em", ...reveal(projInView, 0.05) }}>Things I've built</h2>
          <p style={{ fontSize: "15px", color: GH.textSec, marginBottom: "2rem", fontWeight: 300, ...reveal(projInView, 0.1) }}>
            Projects to practice, explore new technologies, and sharpen my skills.
          </p>

          {/* ── 2-col repo card grid ── */}
<div
  className="proj-grid"
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    width: "100%",
  }}
>
            {projectFiles.slice(0, 7).map((p, i) => {
              const ext      = extOf(p.fileName);
              const extColor = EXT_COLOR[ext] || GH.textSec;
              const extLabel = ext === "github" ? "Git" : ext.toUpperCase();
              return (
                <div key={p.id} className="proj-card" style={{
                  background: GH.surface, borderRadius: "10px",
                  padding: "1.25rem 1.5rem",
                  display: "flex", flexDirection: "column",
                  ...reveal(projInView, 0.1 + i * 0.06),
                }}>

                  {/* Top: filename + language dot */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                    <span style={{
                      fontSize: "11px", fontFamily: "'Space Mono', monospace",
                      color: extColor, background: `${extColor}15`,
                      padding: "3px 8px", borderRadius: "4px",
                      maxWidth: "65%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    }}>{p.fileName}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: extColor, flexShrink: 0 }} />
                      <span style={{ fontSize: "11px", color: GH.textMut }}>{extLabel}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <p style={{ fontSize: "16px", fontWeight: 700, color: GH.text, margin: "0 0 8px", lineHeight: 1.3 }}>{p.title}</p>

                  {/* Description */}
                  <p style={{ fontSize: "13px", color: GH.textSec, lineHeight: 1.65, margin: "0 0 14px", fontWeight: 300, flex: 1 }}>{p.desc}</p>

                  {/* Tech tags — GitHub topic style */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                    {p.tech.map(t => (
                      <span key={t} style={{
                        fontSize: "11px", padding: "3px 10px", borderRadius: "20px",
                        background: "rgba(56,139,253,0.10)", color: GH.blue, fontWeight: 500,
                      }}>{t}</span>
                    ))}
                  </div>

                  {/* Footer: view link */}
                  <div style={{ borderTop: `1px solid ${GH.border}`, paddingTop: "12px" }}>
                    <a href={p.link} target="_blank" rel="noopener noreferrer"
                      style={{ fontSize: "13px", color: GH.textSec, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", transition: "color .15s" }}
                      onMouseEnter={e => e.currentTarget.style.color = GH.blue}
                      onMouseLeave={e => e.currentTarget.style.color = GH.textSec}
                    >
                      <span style={{ fontSize: "15px" }}>→</span> View project
                    </a>
                  </div>
                </div>
              );
            })}

            {/* GitHub Profile — full-width banner card */}
            <a href="https://github.com/yassine-yahya" target="_blank" rel="noopener noreferrer"
              className="proj-card"
              style={{
                gridColumn: window.innerWidth <= 660 ? "span 1" : "span 2",
                background: "rgba(56,139,253,0.06)",
                borderRadius: "10px", padding: "1.25rem 1.75rem",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                textDecoration: "none", gap: "16px",
                ...reveal(projInView, 0.1 + 7 * 0.06),
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <span style={{ fontSize: "24px", color: "#f05032" }}>⬡</span>
                <div>
                  <p style={{ fontSize: "15px", fontWeight: 700, color: GH.text, margin: "0 0 3px" }}>More on GitHub</p>
                  <p style={{ fontSize: "13px", color: GH.textSec, margin: 0, fontWeight: 300 }}>
                    Explore more projects, experiments, and open-source contributions
                  </p>
                </div>
              </div>
              <span style={{ fontSize: "13px", color: GH.blue, whiteSpace: "nowrap", fontFamily: "'Space Mono', monospace" }}>
                github.com/yassine-yahya →
              </span>
            </a>

          </div>
        </div>
      </section>

      <Divider />

      {/* ── FOOTER / CONTACT ── */}
      <section id="contact" className="sec" style={{ padding: "4rem 1.5rem 2.5rem", maxWidth: "960px", margin: "0 auto" }}>
        <div ref={footerRef}>
          <div className="fg" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr", gap: "2rem", marginBottom: "2.5rem" }}>

            <div style={{ ...reveal(footerInView, 0.0) }}>
              <div style={{ display: "flex", alignItems: "center", gap: "2px", marginBottom: "10px" }}>
                <span style={{ fontSize: "17px", fontWeight: 700, color: GH.text }}>yassine</span>
                <span style={{ fontSize: "17px", fontWeight: 800, color: GH.purple }}>.</span>
                <span style={{ fontSize: "17px", fontWeight: 700, color: GH.blue }}>dev</span>
              </div>
              <p style={{ fontSize: "13px", color: GH.textSec, lineHeight: 1.75, marginBottom: "1.25rem", maxWidth: "230px", fontWeight: 300 }}>
                Full-Stack Developer building reliable, secure, and data-driven web applications.
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                {[
                  { icon: "in", href: "https://linkedin.com/in/yassineyahya", label: "LinkedIn" },
                  { icon: "✉",  href: "mailto:yassineyahya50@gmail.com",       label: "Email"    },
                ].map(s => (
                  <a key={s.label} href={s.href} className="sb" title={s.label} style={{
                    width: "34px", height: "34px", borderRadius: "6px",
                    background: GH.surface, border: `1px solid ${GH.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    textDecoration: "none", fontSize: s.icon === "in" ? "11px" : "14px",
                    color: GH.textSec, fontWeight: 700, transition: "all .2s",
                  }}>{s.icon}</a>
                ))}
              </div>
            </div>

            <div style={{ ...reveal(footerInView, 0.1) }}>
              <p style={{ fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: GH.textMut, marginBottom: "14px" }}>Navigate</p>
              {NAV_LINKS.map(l => (
                <button key={l} className="nl" onClick={() => scrollTo(l.toLowerCase())} style={{
                  display: "block", background: "none", border: "none", cursor: "pointer",
                  fontSize: "13px", color: GH.textSec, padding: "4px 0",
                  fontFamily: "inherit", marginBottom: "5px", textAlign: "left", transition: "color .2s",
                }}>{l}</button>
              ))}
            </div>

            <div style={{ ...reveal(footerInView, 0.2) }}>
              <p style={{ fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: GH.textMut, marginBottom: "14px" }}>Contact</p>
              {[
                { icon: "✉",  val: "yassineyahya50@gmail.com" },
                { icon: "☎",  val: "+34 602 317 364"           },
                { icon: "⌖",  val: "Barcelona, Spain"           },
                { icon: "in", val: "linkedin/yassineyahya"      },
              ].map((c, i) => (
                <p key={i} style={{ fontSize: "12px", color: GH.textSec, marginBottom: "8px", display: "flex", gap: "8px", alignItems: "flex-start" }}>
                  <span style={{ color: GH.blue, flexShrink: 0 }}>{c.icon}</span>
                  <span style={{ wordBreak: "break-all" }}>{c.val}</span>
                </p>
              ))}
            </div>

          </div>

          <div style={{ height: "1px", background: GH.border, marginBottom: "1.25rem" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px", ...reveal(footerInView, 0.25) }}>
            <p style={{ fontSize: "12px", color: GH.textMut }}>© 2026 Yassine Yahya · All rights reserved</p>
            <button onClick={() => scrollTo("home")} style={{
              background: GH.surface, border: `1px solid ${GH.border}`, cursor: "pointer",
              fontSize: "12px", color: GH.blue, padding: "5px 14px",
              borderRadius: "6px", fontFamily: "inherit",
            }}
              onMouseEnter={e => e.currentTarget.style.background = GH.card}
              onMouseLeave={e => e.currentTarget.style.background = GH.surface}
            >↑ Back to top</button>
          </div>
        </div>
      </section>

    </div>
  );
}