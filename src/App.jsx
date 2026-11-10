import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const GH = "https://github.com/ChelseayReblora";
const roles = ["Computer Engineer", "Cybersecurity Specialist", "AI & Computer Vision Builder", "Software Developer"];

const projects = [
  { t: "Back Exercise Form Detection (Undergraduate Thesis)", m: "FIRST AUTHOR · MAPÚA UNIVERSITY",
    d: "Common Back Muscle Exercises in Gyms: Form Detection Using Optical Flow and Gated Recurrent Unit Networks. Motion features from exercise video feed a GRU model that judges form, developed with academic researchers and physical-training consultants. The computer vision code, including ROI point isolation for feature extraction, is in the backex-feature-roi-point-isolation repository.",
    tags: ["Computer Vision", "Optical Flow", "GRU", "Deep Learning", "Python"],
    href: `${GH}/backex-feature-roi-point-isolation` },
  { t: "Firebase Inventory Application", m: "SOFTWARE DEVELOPMENT · REPOSITORY",
    d: "An inventory app integrated with Firebase for cloud-backed data storage and management.",
    tags: ["Firebase", "App Dev", "Cloud DB"], href: `${GH}?tab=repositories` },
  { t: "Software QA Testing · MFI Ventures", m: "FREELANCE · ON-SITE",
    d: "Hands-on software quality assurance testing on-site: exercising features, catching defects and reporting them clearly to the team.",
    tags: ["QA", "Testing", "Communication"] },
];
const skills = [
  ["Security", "Network defense · Endpoint security · Ethical hacking · Cyber operations"],
  ["Systems", "Linux terminal · Bash scripting · Cisco network configuration"],
  ["AI / ML", "Deep learning · Computer vision · Optical flow · GRU networks"],
  ["Development", "Software testing & QA · Firebase apps · GitHub workflow"],
];
const certs = ["CCNA", "CyberOps Associate", "Ethical Hacker", "Endpoint Security", "IT Essentials", "+ 3 more Cisco NetAcad certificates", "NVIDIA Deep Learning"];

function Typing() {
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);
  const [del, setDel] = useState(false);
  const still = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (still) { setN(roles[0].length); return; }
    const w = roles[i];
    const t = setTimeout(() => {
      if (!del && n < w.length) setN(n + 1);
      else if (!del) setDel(true);
      else if (n > 0) setN(n - 1);
      else { setDel(false); setI((i + 1) % roles.length); }
    }, !del && n === w.length ? 1400 : del ? 35 : 70);
    return () => clearTimeout(t);
  }, [n, del, i, still]);

  return (
    <div className="type" aria-label={roles.join(", ")}>
      <span aria-hidden="true">{"> "}{roles[i].slice(0, n)}<span className="caret" /></span>
    </div>
  );
}

const Reveal = ({ children, delay = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay, ease: "easeOut" }}>
    {children}
  </motion.div>
);

const Section = ({ id, n, title, children }) => (
  <section id={id}>
    <Reveal><h2 data-n={n}>{title}</h2></Reveal>
    {children}
  </section>
);

export default function App() {
  return (
    <>
      <header>
        <nav>
          <a className="logo" href="#top">~/chelseay</a>
          <div className="links">
            {["about", "projects", "skills", "certs", "contact"].map((s) => <a key={s} href={`#${s}`}>{s}</a>)}
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="tag">// COMPUTER ENGINEERING · CYBERSECURITY · MAPÚA UNIVERSITY</div>
            <h1>Chelseay Anne<br />D. <span>Reblora</span></h1>
            <Typing />
            <p className="lead">Fresh Computer Engineering graduate majoring in Cybersecurity, open to roles in cybersecurity, AI and software development. I build things that detect, defend and understand.</p>
            <div className="btns">
              <a className="btn p" href="#projects">View projects</a>
              <a className="btn" href={GH} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              <a className="btn" href="#contact">Contact</a>
            </div>
          </motion.div>
        </section>

        <Section id="about" n="01" title="About">
          <div className="about">
            <Reveal>
              <p className="lead">I’m a Computer Engineering graduate from Mapúa University with a cybersecurity major. My thesis sits where security-minded engineering meets AI: detecting exercise form with optical flow and GRU networks. I work comfortably in the Linux terminal, script in Bash and configure Cisco networks, and I enjoy translating technical work for non-technical collaborators.</p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card"><div className="stat">
                <b>Education</b> BS Computer Engineering<br />
                <b>School</b> Mapúa University<br />
                <b>Focus</b> Cybersecurity<br />
                <b>Award</b> Best Presenter, 8th Int’l Conf. on Video, Signal and Image Processing
              </div></div>
            </Reveal>
          </div>
        </Section>

        <Section id="projects" n="02" title="Projects">
          <div className="grid">
            {projects.map((p, k) => (
              <Reveal key={p.t} delay={k * 0.08}>
                <article className="card">
                  <div className="meta">{p.m}</div>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                  <div className="chips">{p.tags.map((t) => <span className="chip" key={t}>{t}</span>)}</div>
                  {p.href && <p><a className="lnk" href={p.href} target="_blank" rel="noopener noreferrer">view on github ↗</a></p>}
                </article>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section id="skills" n="03" title="Skills & tools">
          <div className="grid">
            {skills.map(([h, d], k) => (
              <Reveal key={h} delay={k * 0.08}><div className="card"><h3>{h}</h3><p>{d}</p></div></Reveal>
            ))}
          </div>
        </Section>

        <Section id="certs" n="04" title="Certifications & recognition">
          <div className="grid">
            <Reveal><div className="card"><h3>Certifications</h3>
              <ul className="clean">{certs.map((c) => <li key={c}>{c}</li>)}</ul></div></Reveal>
            <Reveal delay={0.1}><div className="card"><h3>Recognition</h3>
              <ul className="clean">
                <li>Best Presenter Award, 8th International Conference on Video, Signal and Image Processing</li>
                <li>First author, undergraduate thesis</li>
              </ul></div></Reveal>
          </div>
        </Section>

        <Section id="contact" n="05" title="Contact">
          <Reveal>
            <div className="card">
              <p className="lead">Open to cybersecurity, AI and software roles. The quickest way to see my work or reach me is GitHub.</p>
              <div className="btns"><a className="btn p" href={GH} target="_blank" rel="noopener noreferrer">github.com/ChelseayReblora ↗</a></div>
            </div>
          </Reveal>
        </Section>
      </main>

      <footer>© 2026 Chelseay Anne D. Reblora · built with React & Framer Motion</footer>
    </>
  );
}
