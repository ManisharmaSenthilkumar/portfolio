import { useState, useEffect, useRef, useCallback } from "react";
import resume from "./assets/ManisharmaResume.pdf"

/* ─────────────────────────────────────────────────────────
   RESUME DATA
───────────────────────────────────────────────────────── */
const DATA = {
  name: "MANISHARMA S",
  role: "Software Developer | Network Engineer",
  location: "Namakkal, Tamil Nadu, India",
  phone: "999-462-3799",
  email: "mani111sharama@gmail.com",
  linkedin: "linkedin.com/in/manisharma-s-032738367",
  github: "github.com/ManisharmaSenthilkumar",
  portfolio: "manisharmaportfolio.framer.website",
  summary:
    "Results-driven Software Developer specialising in high-performance web applications. Proficient in JavaScript, React.js, and Redux, transforming ideas into scalable solutions. Focused on creating pixel-perfect interfaces that merge design with engineering excellence, bridging design and development to enhance digital experiences.",
  tagline:
    "Building secure network infrastructure, scalable systems, and intelligent software solutions.",
  skills: [
    { cat: "PROGRAMMING", cmd: "programming --list", items: [["Python 3.13", 90], ["Core Java", 76], ["Node.js", 80], ["Express.js", 75], ["React.js", 85], ["MySQL 5.7+", 70]] },
    { cat: "AI / ML", cmd: "ai_modules --init", items: [["Scikit-learn", 72], ["TensorFlow/PyTorch", 62], ["LangChain", 70], ["Gemini LLMs", 68], ["FAISS / RAG", 65]] },
    { cat: "NETWORKING", cmd: "net_stack --load", items: [["TCP/IP Stack", 88], ["DNS / DHCP", 84], ["Firewalls", 80], ["Wireshark / Nmap", 82], ["Prometheus/Grafana", 78]] },
    { cat: "SOFTWARE DEV", cmd: "dev_stack --check", items: [["REST API Design", 82], ["Frontend Dev", 85], ["Backend Dev", 80], ["Full Stack Apps", 78], ["System Design", 72]] },
    { cat: "DEVOPS / TOOLS", cmd: "tools --active", items: [["Docker", 74], ["NGINX", 72], ["Git / GitHub", 86], ["Linux Scripting", 85], ["Scapy", 78]] },
    { cat: "SOFT SKILLS", cmd: "soft_skills --eval", items: [["Problem Solving", 93], ["Team Collaboration", 89], ["Communication", 86], ["Time Management", 84]] },
  ],
  projects: [
    {
      name: "Money Manager — Full Stack Finance Tracker",
      type: "Web App | MERN",
      tags: ["React", "Node.js", "MongoDB Atlas", "Vercel"],
      desc: "Production-ready personal finance web app with transaction tracking, account transfers, category filtering, and interactive analytics dashboards.",
      feats: ["Transaction tracking & category filtering", "Account transfers & history", "Analytics dashboards", "Deployed on Vercel + Render"],
      demo: "https://money-manager-frontend-ebon.vercel.app/",
    },
    {
      name: "Clueso.io Clone — Full-Stack SaaS",
      type: "SaaS | Full Stack",
      tags: ["React", "Node.js", "Gemini AI", "MongoDB"],
      desc: "Full-stack SaaS replicating feedback collection and AI-driven insight workflows with authentication, dashboard navigation, and AI-generated summaries.",
      feats: ["Authentication & dashboards", "Feedback management system", "AI summaries via Google Gemini", "Demo-ready production build"],
      demo: null,
    },
    {
      name: "Apple TV Inspired Streaming Platform UI",
      type: "Frontend | React",
      tags: ["React", "Tailwind CSS"],
      desc: "Modern streaming platform UI with autoplay carousels, dynamic banners, smooth routing, and fully responsive modular JSON-based architecture.",
      feats: ["Dynamic hero banners", "Autoplay carousels", "Smooth routing", "Responsive layout"],
      demo: "https://manisharmasenthilkumar.github.io/AppleTV-React",
    },
    {
      name: "Intelligent Syllabus RAG Chatbot",
      type: "AI App | LangChain",
      tags: ["LangChain", "FAISS", "MiniLM", "Gemini 2.5 Flash"],
      desc: "RAG assistant understanding complete university syllabi across PDFs, DOCX, spreadsheets, images, and text. FAISS vector search with MiniLM embeddings.",
      feats: ["Multi-format document ingestion", "FAISS vector similarity search", "Gemini 2.5 Flash responses", "Context-grounded answers"],
      demo: null,
    },
    {
      name: "Intelligent Web Attack Detection System",
      type: "ML / Security | Deep Learning",
      tags: ["Deep Learning", "Parrot Optimization", "SHAP", "TensorFlow"],
      desc: "Deep learning system for multi-label HTTP traffic classification using Parrot Optimization Algorithm for feature selection and SHAP for explainability.",
      feats: ["Multi-label HTTP classification", "Parrot Optimization Algorithm", "SHAP explainability layer", "Interpretable threat detection"],
      demo: null,
    },
  ],
  experience: [
    {
      role: "Flutter Developer Intern",
      company: "8 Queens Software Technologies Pvt Ltd",
      period: "June 2024 – July 2024",
      location: "Tamil Nadu, India",
      desc: "Developed a responsive calculator application in Dart with a clean, intuitive UI focused on usability and visual clarity. Implemented accurate arithmetic functionality using efficient and maintainable code architecture. Optimised performance by modularising components for seamless user experience.",
    },
  ],
  education: [
    {
      degree: "Bachelor of Technology — Information Technology",
      school: "University College of Engineering",
      campus: "BIT Campus, Tiruchirappalli",
      period: "Oct 2021 – Jul 2025",
      grade: "CGPA: 7.6",
    },
  ],
  certs: [
    { name: "UI/UX Design Certification", date: "VERIFIED" },
    { name: "React JS Course — Scaler Topics", date: "SEP 2025" },
  ],
};

/* ─────────────────────────────────────────────────────────
   TERMINAL POOL for background
───────────────────────────────────────────────────────── */
const POOL = [
  ["$ ping 8.8.8.8", "#00cc7a"],["64 bytes ttl=118 time=11ms", "#344f61"],
  ["$ traceroute github.com", "#00cc7a"],["1  192.168.1.1  0.3ms", "#344f61"],
  ["$ netstat -tulnp", "#00cc7a"],["tcp  0.0.0.0:22  LISTEN sshd", "#344f61"],
  ["tcp  0.0.0.0:80  LISTEN nginx", "#344f61"],["tcp  0.0.0.0:9090 prometheus", "#344f61"],
  ["$ tcpdump -i eth0", "#00cc7a"],["11:44 IP 10.0.0.2 > 8.8.8.8.53", "#1a2d3a"],
  ["$ nmap -sS 192.168.1.0/24", "#00cc7a"],["22/tcp open ssh", "#344f61"],
  ["80/tcp open http", "#344f61"],["$ docker ps", "#00cc7a"],
  ["a3f92  nginx     Up 3d", "#344f61"],["b1e83  grafana   Up 6h", "#344f61"],
  ["$ top", "#00cc7a"],["Tasks: 148 total, 2 running", "#344f61"],
  ["$ journalctl -xe", "#00cc7a"],["systemd: Started cron", "#1a2d3a"],
  ["[INFO] monitoring packets...", "#0088cc"],["[SECURITY] IDS active", "#ff2d55"],
  ["[OK] firewall rules verified", "#00cc7a"],["[INFO] packets analyzed: 10422", "#0088cc"],
  ["[OK] SSL cert valid 180d", "#00cc7a"],["[INFO] load avg: 0.38 0.44", "#0088cc"],
  ["[ALERT] port scan blocked", "#ff2d55"],["$ iptables -L -n", "#00cc7a"],
  ["Chain INPUT (policy DROP)", "#344f61"],["$ free -h", "#00cc7a"],
  ["Mem: 7.8G used:3.1G free:4.7G", "#344f61"],["$ git push origin main", "#00cc7a"],
  ["[OK] prometheus scrape OK", "#0088cc"],["$ systemctl status nginx", "#00cc7a"],
  ["● nginx.service Active: running", "#344f61"],["$ ssh mani@cloud-node", "#00cc7a"],
  ["Last login Mon Mar 16 09:22:14", "#344f61"],
];

const BOOT_LINES = [
  { t: "Initializing Network Operations Console...", c: "#00c8ff" },
  { t: "Loading kernel modules...", c: "#6fa8c0" },
  { t: "Checking system integrity...", c: "#6fa8c0" },
  { t: "Mounting monitoring services...", c: "#6fa8c0" },
  { t: "Starting observability stack...", c: "#6fa8c0" },
  { t: "Connecting infrastructure nodes...", c: "#6fa8c0" },
];

const AUTH_LINES = [
  { t: "Authenticating user...", c: "#6fa8c0" },
  { t: "ACCESS GRANTED", c: "#00ff9d" },
  { t: "Launching interface...", c: "#00cc7a" },
  { t: "Establishing secure session...", c: "#00c8ff" },
];

const TYPED_CMDS = [
  "ssh mani@cloud-node.local",
  "python3 traffic_monitor.py --live",
  "nmap -sS 192.168.1.0/24",
  "docker compose up --build -d",
  "sudo systemctl restart nginx",
  "git push origin main",
  "journalctl -f -u prometheus",
];

const TICKERS = [
  "[OK] firewall rules verified — 48 rules active",
  "[INFO] prometheus — 4/4 targets up",
  "[SECURITY] IDS active — 0 threats",
  "[INFO] nginx avg response: 42ms",
  "[OK] SSL valid — 180 days remaining",
  "[INFO] docker: 3 containers running",
  "[ALERT] port scan from 203.0.113.42 — blocked",
  "[INFO] load average: 0.38 0.44 0.47 — nominal",
];

/* ─────────────────────────────────────────────────────────
   INLINE STYLES (CSS-in-JS, no external CSS needed)
───────────────────────────────────────────────────────── */
const S = {
  // vars
  g: "#00ff9d", g2: "#00cc7a", g3: "#006640",
  b: "#00c8ff", b2: "#0088cc",
  r: "#ff2d55", y: "#ffd60a",
  t: "#6fa8c0", t2: "#344f61", t3: "#1a2d3a",
  bg: "#050c18", navy: "#080f1e",
  border: "rgba(0,200,255,.14)", bgreen: "rgba(0,255,157,.15)",
  font: "'JetBrains Mono', 'IBM Plex Mono', monospace",
};

/* ─────────────────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────────────────── */
function useCountUp(target, active) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let n = 0;
    const step = Math.ceil(target / 20);
    const iv = setInterval(() => {
      n = Math.min(n + step, target);
      setVal(n);
      if (n >= target) clearInterval(iv);
    }, 55);
    return () => clearInterval(iv);
  }, [target, active]);
  return val;
}

function useIntersect(ref, threshold = 0.12) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

/* ─────────────────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────────────────── */

/* Blinking cursor */
const Cursor = () => {
  const [on, setOn] = useState(true);
  useEffect(() => { const iv = setInterval(() => setOn(p => !p), 500); return () => clearInterval(iv); }, []);
  return <span style={{ display: "inline-block", width: 8, height: 13, background: on ? S.g : "transparent", verticalAlign: "middle", marginLeft: 2 }} />;
};

/* Glitch name */
const GlitchName = ({ text }) => (
  <span style={{ position: "relative", display: "inline-block" }}>
    <style>{`
      @keyframes gla{0%,88%,100%{transform:translate(0)}90%{transform:translate(-2px,0)}92%{transform:translate(2px,0)}94%{transform:translate(-1px,0)}}
      .gl-b::before,.gl-b::after{content:attr(data-t);position:absolute;top:0;left:0;animation:gla 6s infinite;}
      .gl-b::before{color:#00c8ff;animation-delay:.08s;opacity:.55;clip-path:inset(0 0 55% 0);}
      .gl-b::after{color:#ff2d55;animation-delay:.18s;opacity:.35;clip-path:inset(55% 0 0 0);}
    `}</style>
    <span className="gl-b" data-t={text} style={{ fontSize: "clamp(18px, 3vw, 22px)", fontWeight: 700, letterSpacing: 3, color: S.g, textShadow: `0 0 28px ${S.g}55` }}>{text}</span>
  </span>
);

/* Reveal wrapper */
const Reveal = ({ children, delay = 0, style = {} }) => {
  const ref = useRef(null);
  const vis = useIntersect(ref);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(26px)", transition: `opacity .7s ease ${delay}s, transform .7s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
};

/* Skill bar */
const SkillBar = ({ label, pct, active }) => {
  const [w, setW] = useState(0);
  useEffect(() => { if (active) setTimeout(() => setW(pct), 300); }, [active, pct]);
  return (
    <div style={{ padding: "3px 0 3px 14px", position: "relative", fontSize: 11, color: S.t, lineHeight: 1.9 }}>
      <span style={{ position: "absolute", left: 2, color: S.g3 }}>-</span>
      {label}
      <div style={{ height: 1.5, background: S.t3, marginTop: 1, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${w}%`, background: `linear-gradient(90deg,${S.g},${S.b})`, transition: "width 1.5s cubic-bezier(.4,0,.2,1)" }} />
      </div>
    </div>
  );
};

/* Skill module card */
const SkillCard = ({ cat, cmd, items, delay }) => {
  const ref = useRef(null);
  const active = useIntersect(ref);
  return (
    <div ref={ref} style={{ opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(26px)", transition: `opacity .7s ease ${delay}s, transform .7s ease ${delay}s`, background: "rgba(8,15,30,.78)", border: `1px solid ${S.border}`, backdropFilter: "blur(4px)", flex: "1 1 240px", minWidth: 0 }}>
      <div style={{ background: "rgba(0,200,255,.06)", borderBottom: `1px solid ${S.border}`, padding: "8px 14px", fontSize: 9, color: S.b, letterSpacing: 3, textTransform: "uppercase", display: "flex", gap: 7 }}>
        <span style={{ color: S.g }}>◈</span> {cat}
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ fontSize: 9.5, color: S.g2, marginBottom: 12, fontFamily: S.font }}>
          <span style={{ color: S.g }}>&gt; </span>{cmd}
        </div>
        {items.map(([label, pct]) => <SkillBar key={label} label={label} pct={pct} active={active} />)}
      </div>
    </div>
  );
};

/* Project card */
const ProjectCard = ({ proj, delay, onDemo }) => {
  const ref = useRef(null);
  const vis = useIntersect(ref);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(26px)", transition: `opacity .7s ease ${delay}s, transform .7s ease ${delay}s`, background: "rgba(8,15,30,.8)", border: `1px solid ${S.border}`, backdropFilter: "blur(4px)", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "rgba(0,255,157,.05)", borderBottom: "1px solid rgba(0,255,157,.12)", padding: "7px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 9 }}>
        <span style={{ color: S.g, letterSpacing: 2 }}>MODULE ACTIVE</span>
        <PulsingDot />
      </div>
      <div style={{ padding: 18, display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ fontSize: "clamp(12px,1.5vw,13.5px)", fontWeight: 600, color: S.g, marginBottom: 8, lineHeight: 1.4 }}>{proj.name}</div>
        <div style={{ fontSize: 9, color: S.t2, letterSpacing: 2, textTransform: "uppercase", marginBottom: 9 }}>TYPE: {proj.type}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>
          {proj.tags.map(t => (
            <span key={t} style={{ fontSize: 9, padding: "3px 8px", border: "1px solid rgba(0,200,255,.22)", color: S.b, background: "rgba(0,200,255,.05)", letterSpacing: 1 }}>{t}</span>
          ))}
        </div>
        <div style={{ fontSize: 11, color: S.t, lineHeight: 2, marginBottom: 10 }}>{proj.desc}</div>
        <ul style={{ listStyle: "none", marginBottom: 12, flex: 1 }}>
          {proj.feats.map(f => (
            <li key={f} style={{ fontSize: 10, color: S.t2, padding: "2px 0 2px 15px", position: "relative" }}>
              <span style={{ position: "absolute", left: 0, color: S.g3 }}>→</span>{f}
            </li>
          ))}
        </ul>
        {proj.demo && (
          <div style={{ borderTop: "1px solid rgba(0,255,157,.1)", paddingTop: 14, marginTop: "auto" }}>
            <DemoButton onClick={() => onDemo(proj.demo, proj.name)} />
          </div>
        )}
      </div>
    </div>
  );
};

const PulsingDot = () => {
  const [on, setOn] = useState(true);
  useEffect(() => { const iv = setInterval(() => setOn(p => !p), 1100); return () => clearInterval(iv); }, []);
  return <span style={{ color: on ? S.g : "transparent", fontSize: 8, transition: "color .3s" }}>● RUNNING</span>;
};

const DemoButton = ({ onClick }) => {
  const [hover, setHover] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 18px", background: hover ? "rgba(0,255,157,.08)" : "transparent", border: `1px solid ${S.g}`, color: S.g, fontFamily: S.font, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", cursor: "pointer", boxShadow: hover ? `0 0 20px rgba(0,255,157,.3)` : "none", transition: "all .2s" }}>
      <span style={{ color: S.g2 }}>▶</span> LIVE DEMO
    </button>
  );
};

/* Network topology canvas */
const NetCanvas = () => {
  const ref = useRef(null);
  const vis = useIntersect(ref);
  const started = useRef(false);

  useEffect(() => {
    if (!vis || started.current) return;
    started.current = true;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const W = () => canvas.offsetWidth, H = () => canvas.offsetHeight;
    const nodes = [
      { id: "mani@local", xr: .50, yr: .50, r: 8, c: "#00ff9d" },
      { id: "8.8.8.8", xr: .12, yr: .18, r: 5, c: "#00c8ff" },
      { id: "github.com", xr: .82, yr: .16, r: 5, c: "#00c8ff" },
      { id: "nginx:80", xr: .28, yr: .78, r: 5, c: "#00d47a" },
      { id: "prometheus", xr: .70, yr: .80, r: 5, c: "#ffd60a" },
      { id: "grafana", xr: .14, yr: .60, r: 5, c: "#ff2d55" },
      { id: "docker", xr: .86, yr: .52, r: 5, c: "#00c8ff" },
      { id: "192.168.1.1", xr: .48, yr: .14, r: 4, c: "#344f61" },
    ];
    const edges = [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[3,4],[4,5]];
    let pkts = [], t = 0, raf;

    const frame = () => {
      ctx.clearRect(0, 0, W(), H());
      ctx.fillStyle = "rgba(0,200,255,.025)";
      for (let x = 0; x < W(); x += 26) for (let y = 0; y < H(); y += 26) { ctx.beginPath(); ctx.arc(x, y, .8, 0, Math.PI * 2); ctx.fill(); }
      edges.forEach(([a, b]) => {
        const na = nodes[a], nb = nodes[b];
        const g = ctx.createLinearGradient(na.xr*W(), na.yr*H(), nb.xr*W(), nb.yr*H());
        g.addColorStop(0, "rgba(0,200,255,.1)"); g.addColorStop(1, "rgba(0,255,157,.1)");
        ctx.beginPath(); ctx.moveTo(na.xr*W(), na.yr*H()); ctx.lineTo(nb.xr*W(), nb.yr*H());
        ctx.strokeStyle = g; ctx.lineWidth = .7; ctx.stroke();
      });
      pkts = pkts.filter(p => p.p <= 1);
      pkts.forEach(p => {
        p.p += p.spd;
        const na = nodes[p.from], nb = nodes[p.to];
        const x = na.xr*W()+(nb.xr*W()-na.xr*W())*p.p, y = na.yr*H()+(nb.yr*H()-na.yr*H())*p.p;
        ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI*2);
        ctx.fillStyle = "#00ff9d"; ctx.shadowColor = "#00ff9d"; ctx.shadowBlur = 7; ctx.fill(); ctx.shadowBlur = 0;
      });
      nodes.forEach((n, i) => {
        const x = n.xr*W(), y = n.yr*H(), pulse = (Math.sin(t*.025+i*.9)+1)/2;
        ctx.beginPath(); ctx.arc(x, y, n.r+3+pulse*4, 0, Math.PI*2);
        ctx.strokeStyle = n.c+"28"; ctx.lineWidth = 1; ctx.stroke();
        ctx.beginPath(); ctx.arc(x, y, n.r, 0, Math.PI*2);
        ctx.fillStyle = n.c; ctx.shadowColor = n.c; ctx.shadowBlur = 10; ctx.fill(); ctx.shadowBlur = 0;
        ctx.font = "8.5px 'JetBrains Mono',monospace";
        ctx.fillStyle = n.c+"cc"; ctx.textAlign = "center";
        ctx.fillText(n.id, x, y - n.r - 5);
      });
      t++;
      if (Math.random() < .06) { const e = edges[Math.floor(Math.random()*edges.length)]; const rev = Math.random()>.5; pkts.push({ from: rev?e[1]:e[0], to: rev?e[0]:e[1], p: 0, spd: .006+Math.random()*.014 }); }
      raf = requestAnimationFrame(frame);
    };
    frame();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [vis]);

  return (
    <canvas ref={ref} style={{ width: "100%", height: "clamp(180px, 25vw, 260px)", display: "block", border: `1px solid ${S.border}`, background: "rgba(8,15,30,.6)" }} />
  );
};

/* Background terminal columns */
const TermBg = () => {
  const ref = useRef(null);
  const scrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => { scrollY.current = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cols = useRef([]);
  if (!cols.current.length) {
    const n = typeof window !== "undefined" ? Math.ceil(window.innerWidth / 190) + 3 : 8;
    for (let c = 0; c < n; c++) {
      const lines = [];
      for (let r = 0; r < 2; r++)
        for (let i = 0; i < 55; i++) {
          const [txt, col] = POOL[Math.floor(Math.random() * POOL.length)];
          const extra = txt.includes("packets analyzed") ? Math.floor(Math.random() * 99999) : "";
          lines.push({ txt: txt + extra, col });
        }
      cols.current.push({
        left: c * (typeof window !== "undefined" ? window.innerWidth / n : 200) + (Math.random() * 26 - 13),
        op: (0.1 + Math.random() * 0.16).toFixed(2),
        dur: (65 + Math.random() * 95).toFixed(1),
        delay: -(Math.random() * 95).toFixed(1),
        lines,
        depth: 0.012 + (c % 4) * 0.011,
      });
    }
  }

  return (
    <div ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden",
      background: "radial-gradient(ellipse 120% 70% at 50% 0%,#0a1a38,transparent 65%),radial-gradient(ellipse 80% 60% at 100% 100%,#061220,transparent 60%),linear-gradient(160deg,#07111f,#050c18 50%,#06101c)" }}>
      {/* Grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,200,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(0,200,255,.035) 1px,transparent 1px)", backgroundSize: "48px 48px", maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%,black 40%,transparent 100%)" }} />
      {/* Scanlines */}
      <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,.07) 3px,rgba(0,0,0,.07) 4px)", pointerEvents: "none" }} />
      {/* Columns */}
      <style>{cols.current.map((c, i) => `@keyframes tup${i}{from{transform:translateY(0)}to{transform:translateY(-50%)}}`).join("")}</style>
      {cols.current.map((c, i) => (
        <div key={i} style={{ position: "absolute", top: 0, left: c.left, opacity: c.op, animation: `tup${i} ${c.dur}s ${c.delay}s linear infinite`, pointerEvents: "none" }}>
          {c.lines.map((l, j) => (
            <div key={j} style={{ fontSize: 9, lineHeight: 1.8, whiteSpace: "nowrap", fontFamily: S.font, padding: "0 3px", color: l.col }}>{l.txt}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

/* Launch overlay */
const LaunchOverlay = ({ url, name, onClose }) => {
  const [lines, setLines] = useState([]);
  const [fading, setFading] = useState(false);
  const launched = useRef(false);

  const LAUNCH_LINES = [
    { t: `> ./launch_module.sh --target "${name}"`, c: S.t },
    { t: "> opening module...", c: S.t },
    { t: "[INFO] resolving deployment endpoint...", c: S.b },
    { t: "> connecting to deployment server...", c: S.t },
    { t: "[OK] server reachable — handshake complete", c: S.g },
    { t: "> launching demo...", c: S.t },
    { t: "[OK] redirecting to live environment ↗", c: S.g },
  ];

  const closeOverlay = useCallback(() => {
    setFading(true);
    setTimeout(onClose, 400);
  }, [onClose]);

  useEffect(() => {
    let i = 0;
    let cancelled = false;
    const step = () => {
      if (cancelled) return;
      if (i >= LAUNCH_LINES.length) {
        // Open tab FIRST, then start fade — page stays fully mounted
        if (!launched.current) {
          launched.current = true;
          window.open(url, "_blank", "noopener,noreferrer");
        }
        setTimeout(closeOverlay, 600);
        return;
      }
      setLines(prev => [...prev, LAUNCH_LINES[i++]]);
      setTimeout(step, 320);
    };
    step();
    return () => { cancelled = true; };
  }, []);

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) closeOverlay(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 3000,
        background: "rgba(5,12,24,.96)",
        display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(8px)",
        opacity: fading ? 0 : 1,
        transition: "opacity .4s ease",
        pointerEvents: fading ? "none" : "auto",
      }}>
      <div style={{
        width: "min(480px,90vw)",
        background: "rgba(8,15,30,.98)",
        border: `1px solid ${S.g}`,
        padding: "28px 32px",
        boxShadow: `0 0 60px rgba(0,255,157,.15)`,
        transform: fading ? "scale(0.98)" : "scale(1)",
        transition: "transform .4s ease",
      }}>
        {lines.map((l, i) => (
          <div key={i} style={{ fontSize: 11.5, lineHeight: 2.2, color: l.c, fontFamily: S.font, animation: "launchFadeIn .3s ease forwards" }}>{l.t}</div>
        ))}
      </div>
      <style>{`@keyframes launchFadeIn{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}}`}</style>
    </div>
  );
};

/* Section header */
const SecCmd = ({ children, prefix = "$" }) => (
  <div style={{ fontSize: "clamp(11px,1.5vw,13px)", color: S.g2, marginBottom: 30, fontFamily: S.font }}>
    <span style={{ color: S.t2 }}>{prefix} </span>{children}
  </div>
);

/* ─────────────────────────────────────────────────────────
   BOOT SCREEN
───────────────────────────────────────────────────────── */
const BootScreen = ({ onDone }) => {
  const [logs, setLogs] = useState([]);
  const [authReady, setAuthReady] = useState(false);
  const [authing, setAuthing] = useState(false);
  const [authLines, setAuthLines] = useState([]);
  const done = useRef(false);

  useEffect(() => {
    let i = 0;
    const step = () => {
      if (i >= BOOT_LINES.length) { setTimeout(() => setAuthReady(true), 300); return; }
      setLogs(prev => [...prev, BOOT_LINES[i++]]);
      setTimeout(step, 220 + Math.random() * 130);
    };
    step();
  }, []);

  const doAuth = () => {
    if (done.current) return;
    done.current = true;
    setAuthing(true);
    let i = 0;
    const step = () => {
      if (i >= AUTH_LINES.length) { setTimeout(onDone, 500); return; }
      setAuthLines(prev => [...prev, AUTH_LINES[i++]]);
      setTimeout(step, 360);
    };
    step();
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center", background: "#030810" }}>
      <div style={{ width: "min(560px,92vw)", background: "rgba(5,12,24,.97)", border: `1px solid ${S.border}`, boxShadow: "0 0 80px rgba(0,200,255,.09)" }}>
        {/* Titlebar */}
        <div style={{ background: "rgba(0,200,255,.07)", borderBottom: `1px solid ${S.border}`, padding: "8px 16px", display: "flex", alignItems: "center", gap: 8 }}>
          {["#ff2d55","#ffd60a","#00ff9d"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
          <span style={{ marginLeft: 8, fontSize: 9.5, color: S.b, letterSpacing: 3, fontFamily: S.font }}>NOC_CONSOLE — v4.2.0 — SECURE_BOOT</span>
        </div>
        <div style={{ padding: "24px 28px 28px", fontFamily: S.font }}>
          {/* Init logs */}
          <div style={{ minHeight: 96, marginBottom: 18 }}>
            {logs.map((l, i) => <div key={i} style={{ fontSize: 10.5, lineHeight: 2, color: l.c }}>{l.t}</div>)}
          </div>
          <hr style={{ border: "none", borderTop: `1px solid ${S.border}`, margin: "14px 0" }} />
          {/* Auth fields */}
          <div style={{ fontSize: 10, color: S.g, letterSpacing: 4, textTransform: "uppercase", marginBottom: 12 }}>Authentication Required</div>
          {[["Username", "visitor"], ["Password", "••••••••"]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, marginBottom: 8 }}>
              <span style={{ color: S.t, width: 88, flexShrink: 0 }}>{k}</span>
              <span style={{ color: S.g }}>{v}{k === "Password" && <Cursor />}</span>
            </div>
          ))}
          {/* Auth button */}
          <AuthBtn ready={authReady} onClick={doAuth} />
          {/* Auth result */}
          <div style={{ marginTop: 14, minHeight: 56 }}>
            {authLines.map((l, i) => <div key={i} style={{ fontSize: 10.5, lineHeight: 2, color: l.c }}>{l.t}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
};

const AuthBtn = ({ ready, onClick }) => {
  const [hover, setHover] = useState(false);
  return (
    <button onClick={onClick} disabled={!ready}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ marginTop: 18, width: "100%", padding: "11px 0", background: hover && ready ? "rgba(0,255,157,.08)" : "transparent", border: `1px solid ${S.g}`, color: S.g, fontFamily: S.font, fontSize: 11.5, letterSpacing: 5, textTransform: "uppercase", cursor: ready ? "pointer" : "default", opacity: ready ? 1 : .38, boxShadow: hover && ready ? `0 0 28px rgba(0,255,157,.2)` : "none", transition: "all .2s" }}>
      [ AUTHENTICATE ]
    </button>
  );
};

/* ─────────────────────────────────────────────────────────
   NAV
───────────────────────────────────────────────────────── */
const Nav = () => {
  const [clock, setClock] = useState("");
  useEffect(() => {
    const iv = setInterval(() => setClock(new Date().toTimeString().slice(0, 8)), 1000);
    return () => clearInterval(iv);
  }, []);
  const links = [["#hero","PROFILE"],["#skills","SKILLS"],["#projects","MODULES"],["#experience","LOGS"],["#contact","CONNECT"]];
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 800, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 clamp(14px,3vw,32px)", height: 46, background: "rgba(5,12,24,.92)", borderBottom: "1px solid rgba(0,200,255,.22)", backdropFilter: "blur(14px)", fontFamily: S.font }}>
      <div style={{ fontSize: "clamp(9px,1.5vw,11px)", color: S.g, letterSpacing: 3 }}>
        MANI<span style={{ color: S.b }}>SHARMA</span>
        <span style={{ color: S.t2, marginLeft: 8 }}>// NET_OPS</span>
      </div>
      <div style={{ display: "flex", gap: "clamp(12px,2vw,22px)" }}>
        {links.map(([href, label]) => (
          <a key={href} href={href} style={{ fontSize: "clamp(8px,1vw,9.5px)", color: "rgba(111,168,192,.85)", textDecoration: "none", letterSpacing: 3, textTransform: "uppercase" }}
            onMouseEnter={e => e.target.style.color = S.g} onMouseLeave={e => e.target.style.color = "rgba(111,168,192,.85)"}>
            {label}
          </a>
        ))}
      </div>
      <div style={{ fontSize: 9, color: S.t2, display: "flex", gap: 14 }}>
        <span style={{ color: S.g }}>● ONLINE</span>
        <span>{clock}</span>
      </div>
    </nav>
  );
};

/* ─────────────────────────────────────────────────────────
   STATUS BAR
───────────────────────────────────────────────────────── */
const StatusBar = () => {
  const [rx, setRx] = useState(10422);
  const [tx, setTx] = useState(8914);
  const [cpu, setCpu] = useState("--");
  const [mem, setMem] = useState("--");
  const [up, setUp] = useState("00:00:00");
  const [ticker, setTicker] = useState("[OK] systems nominal");
  const start = useRef(Date.now());
  const ti = useRef(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setRx(p => p + Math.floor(Math.random() * 14 + 3));
      setTx(p => p + Math.floor(Math.random() * 10 + 2));
      setCpu((2 + Math.random() * 9).toFixed(1) + "%");
      setMem((2.8 + Math.random() * 0.7).toFixed(1) + "G");
      const e = Math.floor((Date.now() - start.current) / 1000);
      setUp(`${String(Math.floor(e/3600)).padStart(2,"0")}:${String(Math.floor((e%3600)/60)).padStart(2,"0")}:${String(e%60).padStart(2,"0")}`);
    }, 1000);
    const it = setInterval(() => { setTicker(TICKERS[ti.current++ % TICKERS.length]); }, 3800);
    return () => { clearInterval(iv); clearInterval(it); };
  }, []);

  const items = [["PKT_RX", rx.toLocaleString()], ["PKT_TX", tx.toLocaleString()], ["CPU", cpu], ["MEM", mem], ["UPTIME", up]];
  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 800, height: 30, display: "flex", alignItems: "center", gap: "clamp(10px,2vw,18px)", padding: "0 18px", background: "rgba(5,12,24,.9)", borderTop: `1px solid ${S.border}`, backdropFilter: "blur(8px)", fontFamily: S.font, fontSize: 9, overflow: "hidden" }}>
      {items.map(([k, v]) => (
        <div key={k} style={{ display: "flex", gap: 5, color: S.t2, whiteSpace: "nowrap" }}>
          <span style={{ color: S.b2 }}>{k}</span>
          <span style={{ color: S.g2 }}>{v}</span>
        </div>
      ))}
      <span style={{ color: S.r }}>▲ IDS:ACTIVE</span>
      <span style={{ marginLeft: "auto", color: S.t3, overflow: "hidden", whiteSpace: "nowrap", maxWidth: "clamp(120px,30vw,400px)" }}>{ticker}</span>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────────────────── */
const HeroSection = () => {
  const [typed, setTyped] = useState("");
  const [cpu, setCpu] = useState("23.4%");
  const [mem, setMem] = useState("55.2%");
  const [net, setNet] = useState("234 Mbps");
  const [uptime, setUptime] = useState("47d 12:34:56");
  const startEpoch = useRef(Date.now());

  useEffect(() => {
    let ci = 0, pos = 0, del = false;
    const tick = () => {
      const cmd = TYPED_CMDS[ci % TYPED_CMDS.length];
      if (!del) { setTyped(cmd.slice(0, ++pos)); if (pos >= cmd.length) { del = true; setTimeout(tick, 2000); return; } }
      else { setTyped(cmd.slice(0, --pos)); if (pos <= 0) { del = false; ci++; setTimeout(tick, 450); return; } }
      setTimeout(tick, del ? 38 : 60 + Math.random() * 44);
    };
    setTimeout(tick, 400);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => {
      setCpu((20 + Math.random() * 8).toFixed(1) + "%");
      setMem((52 + Math.random() * 6).toFixed(1) + "%");
      setNet(Math.floor(220 + Math.random() * 40) + " Mbps");
      const base = 47 * 86400 + 12 * 3600 + 34 * 60 + 56 + Math.floor((Date.now() - startEpoch.current) / 1000);
      const d = Math.floor(base / 86400);
      const h = String(Math.floor((base % 86400) / 3600)).padStart(2, "0");
      const m = String(Math.floor((base % 3600) / 60)).padStart(2, "0");
      const s = String(base % 60).padStart(2, "0");
      setUptime(`${d}d ${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  const stats = [[5,"Projects"],[4,"Yrs Learning"],[15,"Technologies"],[1,"Industry Exp"]];

  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "130px clamp(16px,4vw,36px) 60px", maxWidth: 1060, margin: "0 auto" }}>
      {/* Command line */}
      <Reveal style={{ width: "100%" }}>
        <div style={{ fontSize: "clamp(11px,1.5vw,13px)", color: S.g2, marginBottom: 18, fontFamily: S.font }}>
          <span style={{ color: S.t2 }}>$ </span>./system-profile.sh
        </div>
      </Reveal>

      {/* Profile window */}
      <Reveal delay={0.06} style={{ width: "100%" }}>
        <div style={{ width: "100%", background: "rgba(8,15,30,.82)", border: `1px solid ${S.border}`, boxShadow: `0 0 60px rgba(0,255,157,.06),0 24px 64px rgba(0,0,0,.55)`, backdropFilter: "blur(6px)" }}>
          {/* Window bar */}
          <div style={{ background: "rgba(0,200,255,.07)", borderBottom: `1px solid ${S.border}`, padding: "7px 14px", display: "flex", alignItems: "center", gap: 8, fontFamily: S.font }}>
            {["#ff2d55","#ffd60a","#00ff9d"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
            <span style={{ marginLeft: 8, fontSize: 9.5, color: S.b, letterSpacing: 2 }}>system-profile.sh</span>
            <span style={{ marginLeft: "auto", fontSize: 8.5, color: S.g, letterSpacing: 2, display: "flex", alignItems: "center", gap: 5 }}>
              <PulsingDot />
            </span>
          </div>

          <div style={{ padding: "20px clamp(16px,3vw,24px) 0", fontFamily: S.font }}>
            {/* Box art */}
            <pre style={{ fontSize: "clamp(8px,1.2vw,10.5px)", lineHeight: 1.5, color: S.g, marginBottom: 18, fontFamily: S.font, whiteSpace: "pre", overflowX: "auto" }}>
{`╔══════════════════════════════════════╗
║        SYSTEM PROFILE                ║
╚══════════════════════════════════════╝`}
            </pre>

            {/* Profile rows */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "0 32px" }}>
              <ProfileRow label="Name"><GlitchName text={DATA.name} /></ProfileRow>
              <ProfileRow label="Role"><span style={{ fontSize: "clamp(11px,1.5vw,12.5px)", fontWeight: 500, color: S.g }}>{DATA.role}</span></ProfileRow>
              <ProfileRow label="Location"><span style={{ fontSize: "clamp(11px,1.5vw,13px)", color: S.t }}>{DATA.location}</span></ProfileRow>
              <ProfileRow label="Status"><span style={{ fontSize: 12, color: S.g }}><PulsingDot /> &nbsp;Active</span></ProfileRow>
            </div>

            <div style={{ border: "none", borderTop: `1px solid ${S.border}`, margin: "14px 0" }} />

            <div style={{ fontSize: 9, color: S.t2, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>Tagline</div>
            <div style={{ fontSize: "clamp(10px,1.3vw,11px)", color: S.t, lineHeight: 2, fontStyle: "italic" }}>{DATA.tagline}</div>

            <div style={{ border: "none", borderTop: `1px solid ${S.border}`, margin: "14px 0" }} />

            <div style={{ fontSize: 9, color: S.t2, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>Professional Summary</div>
            <div style={{ fontSize: "clamp(10px,1.2vw,11px)", color: S.t, lineHeight: 2.3, borderLeft: `2px solid rgba(0,200,255,.18)`, paddingLeft: 16, marginBottom: 18 }}>{DATA.summary}</div>
          </div>

          {/* Footer metrics */}
          <div style={{ background: "rgba(0,200,255,.04)", borderTop: `1px solid ${S.border}`, padding: "10px clamp(16px,3vw,24px)", display: "flex", flexWrap: "wrap", gap: "6px 28px", fontFamily: S.font, fontSize: 9 }}>
            <div style={{ display: "flex", gap: 6 }}><span style={{ color: S.b2 }}>SYS UPTIME:</span><span style={{ color: S.g2 }}>{uptime}</span></div>
            <div style={{ display: "flex", gap: 6 }}><span style={{ color: S.b2 }}>CPU:</span><span style={{ color: S.y }}>{cpu}</span><span style={{ color: S.b2, marginLeft: 8 }}>MEM:</span><span style={{ color: S.g2 }}>{mem}</span><span style={{ color: S.b2, marginLeft: 8 }}>NET:</span><span style={{ color: S.g2 }}>{net}</span></div>
            <div style={{ display: "flex", gap: 6 }}><span style={{ color: S.b2 }}>NODES:</span><span style={{ color: S.g }}>4/4 ONLINE</span></div>
          </div>
        </div>
      </Reveal>

      {/* Stat counters */}
      <Reveal delay={0.18} style={{ width: "100%", marginTop: 28 }}>
       <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, width: "100%" }}>
          {stats.map(([n, l]) => <StatCard key={l} target={n} label={l} />)}
        </div>
      </Reveal>

      {/* Typed prompt */}
      <Reveal delay={0.3} style={{ width: "100%", marginTop: 28 }}>
        <div style={{ fontSize: "clamp(10px,1.5vw,12px)", color: S.g2, fontFamily: S.font }}>
          <span style={{ color: S.g }}>$ </span>{typed}<Cursor />
        </div>
      </Reveal>
    </section>
  );
};

const ProfileRow = ({ label, children }) => (
  <div style={{ marginBottom: 14 }}>
    <div style={{ fontSize: 9, color: S.t2, letterSpacing: 3, textTransform: "uppercase", marginBottom: 3, fontFamily: S.font }}>{label}</div>
    {children}
  </div>
);

const StatCard = ({ target, label }) => {
  const ref = useRef(null);
  const active = useIntersect(ref);
  const val = useCountUp(target, active);
  const [hover, setHover] = useState(false);
  return (
    <div ref={ref} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ padding: "12px 20px", border: `1px solid ${hover ? S.g : S.border}`, background: "rgba(0,200,255,.03)", minWidth: 100, textAlign: "center", transition: "border-color .3s", fontFamily: S.font }}>
      <span style={{ fontSize: "clamp(20px,3vw,26px)", fontWeight: 700, color: S.g, display: "block", textShadow: `0 0 28px ${S.g}55` }}>{val}</span>
      <span style={{ fontSize: 8, color: S.t2, letterSpacing: 3, textTransform: "uppercase", marginTop: 4, display: "block" }}>{label}</span>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────────────────── */
export default function App() {
  const [booted, setBooted] = useState(false);
  const [launch, setLaunch] = useState(null); // {url, name}

  return (
    <>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box;}
        html{scroll-behavior:smooth;font-size:16px;}
        body{background:#050c18;color:#00ff9d;font-family:'JetBrains Mono','IBM Plex Mono',monospace;overflow-x:hidden;cursor:crosshair;}
        ::selection{background:rgba(0,255,157,.18);color:#00ff9d;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-track{background:#050c18;}
        ::-webkit-scrollbar-thumb{background:#006640;}
        a{color:inherit;}
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&display=swap');
      `}</style>

      <TermBg />

      {!booted && <BootScreen onDone={() => setBooted(true)} />}

      {booted && (
        <>
          <Nav />
          <StatusBar />

          <div style={{ position: "relative", zIndex: 10, fontFamily: S.font }}>

            {/* HERO */}
            <HeroSection />

            {/* SKILLS */}
            <section id="skills" style={{ minHeight: "100vh", padding: "96px clamp(16px,4vw,36px) 80px", maxWidth: 1060, margin: "0 auto" }}>
              <Reveal><SecCmd prefix=">">&nbsp;loading_skill_modules...</SecCmd></Reveal>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                {DATA.skills.map((sk, i) => <SkillCard key={sk.cat} {...sk} delay={i * 0.07} />)}
              </div>
            </section>

            {/* PROJECTS */}
            <section id="projects" style={{ padding: "96px clamp(16px,4vw,36px) 80px", maxWidth: 1060, margin: "0 auto" }}>
              <Reveal><SecCmd prefix=">">&nbsp;ls /deployments/active-modules/</SecCmd></Reveal>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(clamp(260px,30vw,320px),1fr))", gap: 20 }}>
                {DATA.projects.map((p, i) => <ProjectCard key={p.name} proj={p} delay={i * 0.07} onDemo={(url, name) => setLaunch({ url, name })} />)}
              </div>
            </section>

            {/* EXPERIENCE */}
            <section id="experience" style={{ padding: "96px clamp(16px,4vw,36px) 80px", maxWidth: 1060, margin: "0 auto" }}>
              <Reveal><SecCmd prefix=">">&nbsp;cat /var/log/career.log</SecCmd></Reveal>

              {DATA.experience.map((exp, i) => (
                <Reveal key={i} delay={0.08}>
                  <LogEntry color={S.b} header={`[LOG ENTRY] ref:EXP-00${i+1} · type:INTERNSHIP`}>
                    <div style={{ fontSize: "clamp(13px,2vw,15px)", fontWeight: 600, color: S.g, marginBottom: 4 }}>{exp.role}</div>
                    <div style={{ fontSize: 12, color: S.b, marginBottom: 3 }}>{exp.company}</div>
                    <div style={{ fontSize: 9.5, color: S.t2, letterSpacing: 2, marginBottom: 14 }}>{exp.period} · {exp.location}</div>
                    <div style={{ fontSize: 11, color: S.t, lineHeight: 2.2, borderLeft: `1px solid ${S.border}`, paddingLeft: 14 }}>{exp.desc}</div>
                  </LogEntry>
                </Reveal>
              ))}

              {/* Education */}
              <Reveal delay={0.12} style={{ marginTop: 52 }}>
                <SecCmd prefix=">">&nbsp;cat /etc/academic-record</SecCmd>
              </Reveal>
              {DATA.education.map((e, i) => (
                <Reveal key={i} delay={0.18}>
                  <div style={{ background: "rgba(8,15,30,.78)", border: `1px solid ${S.border}`, padding: "16px 20px", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
                    <div>
                      <div style={{ fontSize: 13, color: S.g, marginBottom: 3 }}>{e.degree}</div>
                      <div style={{ fontSize: 11, color: S.b }}>{e.school}</div>
                      <div style={{ fontSize: 10, color: S.t2, marginTop: 2 }}>{e.campus}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 9.5, color: S.t2, letterSpacing: 2 }}>{e.period}</div>
                      <div style={{ fontSize: 11, color: S.y }}>{e.grade}</div>
                    </div>
                  </div>
                </Reveal>
              ))}

              {/* Certifications */}
              <Reveal delay={0.24} style={{ marginTop: 52 }}>
                <SecCmd prefix=">">&nbsp;gpg --verify certifications.asc</SecCmd>
              </Reveal>
              <Reveal delay={0.3}>
                <LogEntry color={S.g} header="[VERIFIED CERTIFICATIONS] signatures valid">
                  {DATA.certs.map((c, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 11, color: S.t, padding: "10px 0", borderBottom: i < DATA.certs.length - 1 ? `1px solid ${S.border}` : "none" }}>
                      <span style={{ color: S.g }}>✓</span>
                      <span style={{ flex: 1 }}>{c.name}</span>
                      <span style={{ fontSize: 9, color: S.t2, letterSpacing: 2 }}>{c.date}</span>
                    </div>
                  ))}
                </LogEntry>
              </Reveal>

              {/* Network canvas */}
              <Reveal delay={0.36} style={{ marginTop: 52 }}>
                <SecCmd prefix=">">&nbsp;netstat --topology-live</SecCmd>
                <NetCanvas />
              </Reveal>
            </section>

            {/* CONTACT */}
            <section id="contact" style={{ padding: "96px clamp(16px,4vw,36px) 120px", maxWidth: 1060, margin: "0 auto" }}>
              <Reveal><SecCmd prefix=">">&nbsp;connect --manisharma</SecCmd></Reveal>
              <Reveal delay={0.08}>
                <div
  style={{
    maxWidth: 660,
    margin: "0 auto",
    background: "rgba(8,15,30,.82)",
    border: `1px solid ${S.border}`,
    backdropFilter: "blur(6px)"
  }}
>
                  <div style={{ background: "rgba(0,255,157,.05)", borderBottom: "1px solid rgba(0,255,157,.12)", padding: "9px 16px", display: "flex", alignItems: "center", gap: 9, fontSize: 9.5, color: S.g, letterSpacing: 3 }}>
                    <span>●</span> CONTACT_TERMINAL — SESSION ENCRYPTED — OPEN
                  </div>
                  <div style={{ padding: "clamp(18px,3vw,28px) clamp(18px,4vw,32px)" }}>
                    <div style={{ fontSize: 13, color: S.g, marginBottom: 20 }}>
                      <span style={{ color: S.t2 }}>&gt; </span>connect --manisharma --protocol=ssh-rsa
                    </div>
                    {[
                      ["phone", DATA.phone, `tel:${DATA.phone.replace(/-/g,"")}`],
                      ["email", DATA.email, `mailto:${DATA.email}`],
                      ["location", DATA.location, null],
                    ].map(([k, v, href]) => (
                      <CtRow key={k} k={k}>{href ? <a href={href} style={{ color: S.g, textDecoration: "none" }}>{v}</a> : v}</CtRow>
                    ))}
                    <hr style={{ border: "none", borderTop: `1px solid ${S.border}`, margin: "18px 0" }} />
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
                      {[
                        ["open github", `https://${DATA.github}`],
                        ["open linkedin", `https://${DATA.linkedin}`],
                        ["send email", `mailto:${DATA.email}`],
                        ["download resume", resume],
                      ].map(([label, href]) => <CtBtn key={label}
    href={href}
    label={label}
    download={label === "download resume"} />)}
                    </div>
                    <div style={{ marginTop: 22, fontSize: 10, color: S.t2, lineHeight: 2.2 }}>
                      <span style={{ color: S.g2 }}>[OK]</span> Handshake complete — end-to-end encrypted<br />
                      <span style={{ color: S.g2 }}>[OK]</span> Identity verified — welcome<br />
                      <span style={{ color: S.b2 }}>[INFO]</span> Open to Software Dev &amp; Network Engineering roles<br />
                      <Cursor />
                    </div>
                  </div>
                </div>
              </Reveal>
            </section>

          </div>

          {launch && (
            <LaunchOverlay
              key={launch.url + launch.name}
              url={launch.url}
              name={launch.name}
              onClose={() => setLaunch(null)}
            />
          )}
        </>
      )}
    </>
  );
}

/* ─── Small shared pieces ─── */
const LogEntry = ({ color, header, children }) => (
  <div style={{ background: "rgba(8,15,30,.78)", border: `1px solid ${S.border}`, borderLeft: `3px solid ${color}`, marginBottom: 16, backdropFilter: "blur(4px)" }}>
    <div style={{ background: color === S.g ? "rgba(0,255,157,.04)" : "rgba(0,200,255,.05)", borderBottom: `1px solid ${S.border}`, padding: "8px 14px", fontSize: 9, color, letterSpacing: 3, fontFamily: S.font }}>{header}</div>
    <div style={{ padding: 20 }}>{children}</div>
  </div>
);

const CtRow = ({ k, children }) => (
  <div style={{ display: "flex", gap: 10, fontSize: 12, marginBottom: 9, alignItems: "flex-start", fontFamily: S.font }}>
    <span style={{ color: S.b, width: 88, flexShrink: 0 }}>{k}</span>
    <span style={{ color: S.t }}>{children}</span>
  </div>
);

const CtBtn = ({ href, label, download }) => {
  const [hover, setHover] = useState(false);

  return (
    <a
      href={href}
      download={download ? "Manisharma_S_Resume.pdf" : undefined}
      target={!download && href.startsWith("http") ? "_blank" : "_self"}
      rel="noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: "9px 16px",
        background: hover ? "rgba(0,255,157,.05)" : "transparent",
        border: `1px solid ${hover ? S.g : S.border}`,
        color: hover ? S.g : S.t,
        fontFamily: S.font,
        fontSize: 9.5,
        letterSpacing: 2,
        cursor: "pointer",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        boxShadow: hover ? `0 0 16px rgba(0,255,157,.2)` : "none",
        transition: "all .2s"
      }}
    >
      <span style={{ color: S.t2 }}>&gt; </span>{label}
    </a>
  );
};
