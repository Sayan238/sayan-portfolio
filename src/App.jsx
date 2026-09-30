import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AIChatBot from './components/AIChatBot'
import {
  ArrowDownRight, ArrowRight, BrainCircuit, CalendarDays, CheckCircle2,
  ChevronLeft, ChevronRight, CircleUserRound, Code2, Cpu, Download,
  ExternalLink, Github, Globe2, Instagram, Linkedin, Mail, MapPin,
  Menu, Network, Play, Rocket, Send, Sparkles, X, Youtube, Sun, Moon,
  FileText, Bot, Database, Wrench, Phone, Copy, Check, MessageSquare
} from 'lucide-react'

const certificates = [
  { title: 'Data Analytics Essentials', issuer: 'Cisco Networking Academy', date: '20 Jun 2026', image: '/certificates/cisco-data-analytics-essentials.png' },
  { title: 'Introduction to Modern AI', issuer: 'Cisco Networking Academy', date: '29 Aug 2026', image: '/certificates/cisco-introduction-modern-ai.png' },
  { title: 'Getting Started with Cisco Packet Tracer', issuer: 'Cisco Networking Academy', date: '12 Aug 2026', image: '/certificates/cisco-packet-tracer.png' },
  { title: 'Find Insights with AI', issuer: 'Cisco Networking Academy', date: '29 Aug 2026', image: '/certificates/cisco-find-insights-ai.png' },
  { title: 'Introduction to Generative AI Studio', issuer: 'Simplilearn SkillUp / Google Cloud', date: '6 May 2026', image: '/certificates/simplilearn-generative-ai-studio.png' },
  { title: 'Programming with Python 3.X', issuer: 'Simplilearn SkillUp', date: '4 May 2026', image: '/certificates/simplilearn-python.png' },
  { title: 'Line Follower — Participation', issuer: 'KSHITIJ 2026, IIT Kharagpur', date: '2026', image: '/certificates/kshitij-line-follower.png' },
  { title: 'Generative AI Mastermind', issuer: 'Outskill', date: '2026', image: '/certificates/outskill-generative-ai.png' },
]

const projects = [
  {
    number: '01',
    featured: true,
    title: 'NetSage AI',
    category: 'AI-Assisted Network Troubleshooting',
    description: 'NetSage combines Cisco Packet Tracer, networking rules, and Google Gemini AI to provide evidence-based network troubleshooting while keeping a human engineer in control of the final decision.',
    tags: ['Cisco Packet Tracer', 'Gemini AI', 'Networking', 'Human-in-the-Loop'],
    icon: Network,
  },
  {
    number: '02',
    title: 'Smart Traffic Management System',
    category: 'AI • Simulation • FastAPI',
    description: 'A smart traffic-management project focused on urban congestion using simulation and real-time application concepts.',
    tags: ['SUMO', 'FastAPI', 'AI/ML'],
    icon: Globe2,
  },
  {
    number: '03',
    title: 'Smart Library Scanner Robot',
    category: 'Robotics • Embedded',
    description: 'A library-scanning robot concept built around ESP32-CAM, sensors and motor control for autonomous movement.',
    tags: ['ESP32-CAM', 'Sensors', 'Robotics'],
    icon: Bot,
  },
  {
    number: '04',
    title: 'Line Following Robot',
    category: 'Robotics • PID',
    description: 'An ESP32 line-following platform using a 12-channel IR array, TB6612FNG motor driver and PID control.',
    tags: ['ESP32', 'PID', 'IR Sensors'],
    icon: Cpu,
  },
  {
    number: '05',
    title: 'Video Processing & Computer Vision',
    category: 'Computer Vision',
    description: 'Video analysis pipeline for important-frame extraction, scene boundaries, motion mapping, object tracking and short summaries.',
    tags: ['OpenCV', 'Tracking', 'Analysis'],
    icon: BrainCircuit,
  },
  {
    number: '06',
    title: 'Cisco Packet Tracer Networking & Troubleshooting',
    category: 'Networking',
    description: 'Hands-on networking work using Cisco Packet Tracer with network configuration and troubleshooting concepts.',
    tags: ['Networking', 'Packet Tracer'],
    icon: Network,
  },
]

const skills = {
  'Programming': ['C', 'Python', 'Java', 'JavaScript', 'HTML', 'CSS'],
  'AI / ML': ['Machine Learning', 'Computer Vision', 'OpenCV', 'Generative AI'],
  'Web Development': ['React', 'Vite', 'Tailwind CSS', 'FastAPI'],
  'Networking': ['Cisco Packet Tracer', 'Networking', 'Subnetting', 'Troubleshooting'],
  'Robotics / Embedded': ['Arduino', 'ESP32', 'ESP32-CAM', 'Sensors', 'PID', 'ROS2'],
  'Creative Tools': ['Figma', 'Blender', 'Spline', 'CapCut', 'DaVinci Resolve', 'Filmora'],
}

const videos = [
  {
    id: 'lGQ48HOs0QQ',
    title: 'Build a Real Radar System with ESP32 | DIY Project',
    tag: 'ESP32 • Radar System',
    url: 'https://youtu.be/lGQ48HOs0QQ',
  },
  {
    id: 'tTMUJ2WkfZo',
    title: 'DIY ESP32 Robot Car | Mobile Dashboard Control',
    tag: 'Robotics • Dashboard Control',
    url: 'https://youtu.be/tTMUJ2WkfZo',
  },
  {
    id: 'h9oOby0gYXQ',
    title: 'ESP32 WiFi LED Dashboard Project 🔥 | Control LEDs Using Web Browser',
    tag: 'IoT • Web Server • ESP32',
    url: 'https://youtu.be/h9oOby0gYXQ',
  },
  {
    id: '4szoyq4QZ84',
    title: 'A Day in the Life of an Engineering Student | First Vlog 🎥',
    tag: 'KIIT University • Student Vlog',
    url: 'https://youtu.be/4szoyq4QZ84',
  },
]

function SectionTitle({ eyebrow, title, children }) {
  return (
    <div className="section-title">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  )
}

function Paper({ children, className = '' }) {
  return <div className={`paper ${className}`}>{children}</div>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const [certIndex, setCertIndex] = useState(null)
  const [projectIndex, setProjectIndex] = useState(null)
  const [showResumeModal, setShowResumeModal] = useState(false)
  const [copied, setCopied] = useState(false)

  const toggleMenu = () => setMenuOpen(v => !v)

  return (
    <div className={dark ? 'app dark' : 'app'}>
      <header className="nav">
        <a href="#home" className="brand">Sayan<span>.</span></a>
        <nav className={menuOpen ? 'navlinks open' : 'navlinks'}>
          {['Home','About','Projects','Certificates','YouTube','Resume','Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>
          ))}
        </nav>
        <div className="nav-actions">
          <a className="pill dark-pill" href="#contact">Let's Connect <ArrowRight size={15}/></a>
          <button className="icon-btn" onClick={() => setDark(v => !v)} aria-label="Toggle theme">
            {dark ? <Sun size={17}/> : <Moon size={17}/>}
          </button>
          <button className="menu-btn" onClick={toggleMenu}><Menu size={21}/></button>
        </div>
      </header>

      <main>
        <section id="home" className="hero section-pad">
          <div className="hero-copy">
            <div className="scribble">Hi, I'm ✦</div>
            <h1>SAYAN<br/><span>BARMAN</span></h1>
            <p className="role">Computer Science Engineer • AI/ML • Robotics • Creative Technologist</p>
            <p className="lead">Building intelligent systems, robots, digital experiences, and creative technology.</p>
            <div className="facts">
              <span>3rd Year</span><span>•</span><span>B.Tech CSE (AI & ML)</span><span>•</span><span>KIIT University</span>
            </div>
            <div className="facts location"><MapPin size={15}/> Bhubaneswar, Odisha, India</div>
            <div className="hero-buttons">
              <a href="#projects" className="btn primary">View My Work <ArrowRight size={17}/></a>
              <a href="/assets/resume.jpg" download="Sayan-Barman-Resume.jpg" className="btn">Download Resume <Download size={16}/></a>
            </div>
            <div className="socials">
              <a href="https://github.com/Sayan238" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github/></a>
              <a href="https://www.linkedin.com/in/sayan-barman-983491327/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin/></a>
              <a href="https://www.instagram.com/mr_sayan_barman_" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram/></a>
              <a href="https://www.youtube.com/@entroSa_tech" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube/></a>
              <a href="mailto:sayanbarman30062005@gmail.com" aria-label="Email"><Mail/></a>
            </div>
          </div>

          <div className="hero-art">
            <div className="campus-card">
              <div className="campus-img-frame">
                <img src="/assets/kiit-campus.jpg" alt="KIIT University Campus" className="campus-photo" />
              </div>
              <strong>KIIT UNIVERSITY</strong>
              <small>learning • building • experimenting</small>
            </div>
            <div className="tape tape-a">AI/ML</div>
            <div className="tape tape-b">ROBOTICS</div>
            <div className="tape tape-c">BUILD</div>
            <div className="portrait-wrap">
              <img src="/assets/sayan-barman.png" alt="Sayan Barman" />
            </div>
            <div className="location-note">
              <MapPin size={15}/>
              <span>Bhubaneswar, Odisha, India</span>
            </div>
            <div className="robot-note">
              <Bot size={28}/>
              <span>Turning ideas<br/>into reality.</span>
            </div>
          </div>
        </section>

        <section id="projects" className="featured section-pad">
          <div className="featured-label">#1 FEATURED PROJECT</div>
          <div className="featured-grid">
            <div className="featured-copy">
              <div className="scribble small">Flagship build</div>
              <h2>NetSage <span>AI</span></h2>
              <h3>AI-Assisted Network Troubleshooting</h3>
              <p>{projects[0].description}</p>
              <div className="tag-row">{projects[0].tags.map(t => <span key={t}>{t}</span>)}</div>
              <button className="btn primary" onClick={() => setProjectIndex(0)}>View Project <ArrowRight size={16}/></button>
            </div>
            <div className="netsage-board">
              <div className="formula">
                <div><Network/><b>Cisco Packet Tracer</b><small>Network Simulation</small></div>
                <span>+</span>
                <div><FileText/><b>Networking Rules</b><small>Troubleshooting Knowledge</small></div>
                <span>+</span>
                <div><Sparkles/><b>Google Gemini AI</b><small>AI Analysis & Explanation</small></div>
              </div>
              <div className="flow">
                {[
                  ['Network Input','Topology & issues','🌐'],
                  ['Evidence','Config & analysis','▤'],
                  ['AI Analysis','Possible causes','✦'],
                  ['Human Engineer','Final decision','◉']
                ].map(([a,b,c], i) => (
                  <div className="flow-node" key={a}>
                    <div className="node-icon">{c}</div><strong>{a}</strong><small>{b}</small>
                    {i < 3 && <ArrowRight className="flow-arrow" size={19}/>}
                  </div>
                ))}
              </div>
              <div className="ai-sticker">AI assists.<br/><b>Engineer decides.</b></div>
            </div>
          </div>
        </section>

        <section id="about" className="two-col section-pad">
          <Paper className="about-paper">
            <SectionTitle eyebrow="01 — About" title="About Me"/>
            <p>I'm <b>Sayan Barman</b>, a third-year Computer Science Engineering student specializing in Artificial Intelligence & Machine Learning at KIIT University.</p>
            <p>I enjoy building things that combine software, artificial intelligence, robotics, networking, and creative technology.</p>
            <p>From programming and web development to embedded systems, computer vision, and technical content creation, I like turning ideas into working projects.</p>
            <div className="sticky">Currently<br/><b>3rd Year CSE (AI & ML)</b><br/>KIIT University</div>
          </Paper>
          <Paper id="journey" className="journey-paper">
            <SectionTitle eyebrow="02 — Journey" title="My Journey"/>
            <div className="timeline">
              <div className="timeline-item"><span className="dot"></span><div><b>KIIT University</b><small>B.Tech Computer Science Engineering (AI & ML)</small><small>2024 — 2028 • Bhubaneswar, Odisha</small></div></div>
              <div className="timeline-item"><span className="dot"></span><div><b>KRS — KIIT Robotics Society</b><small>Member</small><small>Joined November 2024</small></div></div>
            </div>
            <div className="mini-note">Learning.<br/>Building.<br/>Exploring.<br/><b>Growing.</b></div>
          </Paper>
        </section>

        <section className="skills section-pad">
          <SectionTitle eyebrow="03 — Toolbox" title="Skills & Toolbox">
            <span className="hand-note">Tools that turn ideas into reality.</span>
          </SectionTitle>
          <div className="skill-grid">
            {Object.entries(skills).map(([group, items]) => (
              <Paper key={group} className="skill-card">
                <h3>{group}</h3>
                <div className="skill-items">{items.map(x => <span key={x}>{x}</span>)}</div>
              </Paper>
            ))}
          </div>
        </section>

        <section className="projects section-pad">
          <SectionTitle eyebrow="04 — Projects" title="Things I've Built">
            <span className="pill outline">6 Projects <ArrowRight size={15}/></span>
          </SectionTitle>
          <div className="project-grid">
            {projects.map((p, i) => {
              const Icon = p.icon
              return (
                <motion.article key={p.title} className={`project-card ${p.featured ? 'featured-mini' : ''}`} whileHover={{ y: -5, rotate: i % 2 ? 0.25 : -0.25 }}>
                  <div className="project-number">{p.number}</div>
                  <div className="project-visual"><Icon size={48}/><div className="visual-lines"></div></div>
                  <div className="project-body">
                    <span className="project-category">{p.category}</span>
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>
                    <div className="tag-row">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
                    <button className="text-btn" onClick={() => setProjectIndex(i)}>View Project <ArrowRight size={15}/></button>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </section>

        <section id="certificates" className="certificates section-pad">
          <SectionTitle eyebrow="05 — Learning" title="Certificates">
            <span className="hand-note">Proof of learning, one paper at a time.</span>
          </SectionTitle>
          <div className="cert-grid">
            {certificates.map((c, i) => (
              <button className="cert-card" key={c.title} onClick={() => setCertIndex(i)}>
                <img src={c.image} alt={c.title}/>
                <div><b>{c.title}</b><small>{c.issuer}</small><small>{c.date}</small></div>
              </button>
            ))}
          </div>
        </section>

        <section id="youtube" className="youtube section-pad">
          <SectionTitle eyebrow="06 — Content" title="From Code to Content">
            <a className="pill red-pill" href="https://www.youtube.com/@entroSa_tech" target="_blank" rel="noopener noreferrer">
              <Youtube size={15}/> @entroSa_tech <ExternalLink size={13}/>
            </a>
          </SectionTitle>
          <div className="youtube-layout">
            <Paper className="channel-card">
              <div className="channel-icon"><Youtube size={38}/></div>
              <h3>entroSa</h3>
              <span className="channel-handle">@entroSa_tech</span>
              <p>Technical builds, ESP32 IoT projects, robotics experiments, and engineering life vlogs.</p>
              <a className="btn primary" href="https://www.youtube.com/@entroSa_tech" target="_blank" rel="noopener noreferrer">
                Visit Channel <ExternalLink size={15}/>
              </a>
            </Paper>
            <div className="youtube-video-grid">
              {videos.map(v => (
                <a
                  className="video-card-link"
                  key={v.id}
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Watch "${v.title}" on YouTube`}
                >
                  <Paper className="video-card">
                    <div className="video-thumb">
                      <img
                        src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                        alt={v.title}
                        className="video-thumb-img"
                        loading="lazy"
                      />
                      <div className="play-overlay">
                        <div className="play-btn-circle">
                          <Play fill="currentColor" size={18}/>
                        </div>
                      </div>
                      <span className="video-tag-badge">{v.tag}</span>
                    </div>
                    <b>{v.title}</b>
                    <span className="watch-link">Watch on YouTube <ExternalLink size={13}/></span>
                  </Paper>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="resume" className="resume section-pad">
          <Paper className="resume-paper">
            <div className="resume-copy">
              <SectionTitle eyebrow="07 — Resume" title="My Resume"/>
              <p>A concise snapshot of my education, technical skills, projects and certifications.</p>
              <div className="hero-buttons">
                <a className="btn primary" href="/assets/resume.jpg" download="Sayan-Barman-Resume.jpg">Download Resume <Download size={16}/></a>
                <button className="btn" onClick={() => setShowResumeModal(true)}>View Resume <ExternalLink size={15}/></button>
              </div>
            </div>
            <div className="resume-sheet" onClick={() => setShowResumeModal(true)} role="button" tabIndex={0} title="Click to view full resume">
              <img src="/assets/resume.jpg" alt="Sayan Barman Resume Preview" className="resume-thumb-img" />
              <div className="resume-overlay-badge">
                <FileText size={15}/> Click to View
              </div>
            </div>
          </Paper>
        </section>

        <section id="contact" className="contact section-pad">
          <SectionTitle eyebrow="08 — Get in Touch" title="Let's Connect & Build">
            <span className="hand-note">Always open to new ideas & collaborations.</span>
          </SectionTitle>

          <div className="contact-grid-wrapper">
            <Paper className="contact-box main-info-box">
              <div className="contact-box-header">
                <div className="scribble small">Direct Contact</div>
                <h3>Let's Build Something Great.</h3>
                <p>Have an idea, project, collaboration, internship, or just want to chat about AI/ML & Robotics? Reach out anytime!</p>
              </div>

              <div className="contact-cards-list">
                <div className="contact-info-card">
                  <div className="contact-card-icon mail-icon-box">
                    <Mail size={22}/>
                  </div>
                  <div className="contact-card-details">
                    <small>EMAIL ADDRESS</small>
                    <a href="mailto:sayanbarman30062005@gmail.com" className="contact-val">sayanbarman30062005@gmail.com</a>
                  </div>
                  <div className="contact-actions">
                    <a href="mailto:sayanbarman30062005@gmail.com" className="pill-btn primary-pill">
                      <Send size={13}/> Send Mail
                    </a>
                    <button
                      className="pill-btn"
                      onClick={() => {
                        navigator.clipboard.writeText('sayanbarman30062005@gmail.com')
                        setCopied(true)
                        setTimeout(() => setCopied(false), 2000)
                      }}
                      title="Copy Email"
                    >
                      {copied ? <Check size={13} color="#16a34a"/> : <Copy size={13}/>}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div className="contact-info-card">
                  <div className="contact-card-icon phone-icon-box">
                    <Phone size={22}/>
                  </div>
                  <div className="contact-card-details">
                    <small>PHONE / WHATSAPP</small>
                    <a href="tel:+919395639289" className="contact-val">+91 9395639289</a>
                  </div>
                  <div className="contact-actions">
                    <a href="tel:+919395639289" className="pill-btn primary-pill">
                      <Phone size={13}/> Call
                    </a>
                    <a href="https://wa.me/919395639289" target="_blank" rel="noopener noreferrer" className="pill-btn wa-pill">
                      <MessageSquare size={13}/> WhatsApp
                    </a>
                  </div>
                </div>

                <div className="contact-info-card">
                  <div className="contact-card-icon map-icon-box">
                    <MapPin size={22}/>
                  </div>
                  <div className="contact-card-details">
                    <small>LOCATION</small>
                    <span className="contact-val">Bhubaneswar, Odisha, India</span>
                    <span className="contact-sub">KIIT University • Open to remote & onsite</span>
                  </div>
                </div>
              </div>
            </Paper>

            <Paper className="contact-box social-channels-box">
              <div className="scribble small">Social Profiles</div>
              <h3>Find Me Online</h3>
              <p>Connect, collaborate, and follow along with my technical builds and journey.</p>
              
              <div className="social-links-grid">
                <a href="https://www.linkedin.com/in/sayan-barman-983491327/" target="_blank" rel="noopener noreferrer" className="social-box-card">
                  <div className="social-box-icon in-color"><Linkedin size={22}/></div>
                  <div className="social-box-text">
                    <b>LinkedIn</b>
                    <small>Connect with me</small>
                  </div>
                  <ExternalLink size={14} className="social-arrow"/>
                </a>

                <a href="https://github.com/Sayan238" target="_blank" rel="noopener noreferrer" className="social-box-card">
                  <div className="social-box-icon gh-color"><Github size={22}/></div>
                  <div className="social-box-text">
                    <b>GitHub</b>
                    <small>@Sayan238 • Repos</small>
                  </div>
                  <ExternalLink size={14} className="social-arrow"/>
                </a>

                <a href="https://www.youtube.com/@entroSa_tech" target="_blank" rel="noopener noreferrer" className="social-box-card">
                  <div className="social-box-icon yt-color"><Youtube size={22}/></div>
                  <div className="social-box-text">
                    <b>YouTube</b>
                    <small>@entroSa_tech • Videos</small>
                  </div>
                  <ExternalLink size={14} className="social-arrow"/>
                </a>

                <a href="https://www.instagram.com/mr_sayan_barman_" target="_blank" rel="noopener noreferrer" className="social-box-card">
                  <div className="social-box-icon ig-color"><Instagram size={22}/></div>
                  <div className="social-box-text">
                    <b>Instagram</b>
                    <small>@mr_sayan_barman_</small>
                  </div>
                  <ExternalLink size={14} className="social-arrow"/>
                </a>
              </div>

              <div className="quick-note-badge">
                <Bot size={20}/>
                <span>Fast response time via Email & WhatsApp!</span>
              </div>
            </Paper>
          </div>

          <footer>
            <div>Designed & Built with <span>♥</span> by <b>Sayan Barman</b></div>
            <em>Keep building, keep exploring...</em>
          </footer>
        </section>
      </main>

      <AnimatePresence>
        {certIndex !== null && (
          <motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setCertIndex(null)}>
            <motion.div className="modal cert-modal" initial={{scale:.94,y:15}} animate={{scale:1,y:0}} exit={{scale:.94,y:15}} onClick={e => e.stopPropagation()}>
              <button className="close" onClick={() => setCertIndex(null)}><X/></button>
              <img src={certificates[certIndex].image} alt={certificates[certIndex].title}/>
              <div className="modal-caption"><b>{certificates[certIndex].title}</b><span>{certificates[certIndex].issuer} • {certificates[certIndex].date}</span></div>
            </motion.div>
          </motion.div>
        )}
        {projectIndex !== null && (
          <motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setProjectIndex(null)}>
            <motion.div className="modal project-modal" initial={{scale:.94,y:15}} animate={{scale:1,y:0}} exit={{scale:.94,y:15}} onClick={e => e.stopPropagation()}>
              <button className="close" onClick={() => setProjectIndex(null)}><X/></button>
              <span className="project-category">{projects[projectIndex].category}</span>
              <h2>{projects[projectIndex].title}</h2>
              <p>{projects[projectIndex].description}</p>
              <h4>Project flow</h4>
              <div className="modal-flow">
                {projectIndex === 0 ? 'Cisco Packet Tracer → Network Evidence → Networking Rules + Gemini AI → Engineer Review → Final Decision' : 'Idea → Build → Test → Iterate'}
              </div>
              <div className="tag-row">{projects[projectIndex].tags.map(t => <span key={t}>{t}</span>)}</div>
            </motion.div>
          </motion.div>
        )}
        {showResumeModal && (
          <motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setShowResumeModal(false)}>
            <motion.div className="modal resume-modal" initial={{scale:.94,y:15}} animate={{scale:1,y:0}} exit={{scale:.94,y:15}} onClick={e => e.stopPropagation()}>
              <button className="close" onClick={() => setShowResumeModal(false)}><X/></button>
              <div className="resume-modal-header">
                <div>
                  <h3>Sayan Barman — Resume</h3>
                  <span>Computer Science Engineer (AI & ML)</span>
                </div>
                <a className="btn primary" href="/assets/resume.jpg" download="Sayan-Barman-Resume.jpg">
                  Download Resume <Download size={15}/>
                </a>
              </div>
              <div className="resume-modal-body">
                <img src="/assets/resume.jpg" alt="Sayan Barman Resume" className="full-resume-img"/>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AIChatBot />
    </div>
  )
}

export default App
