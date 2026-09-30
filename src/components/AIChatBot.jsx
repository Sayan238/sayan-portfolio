import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bot, X, Send, Sparkles, User, RefreshCw, ExternalLink,
  ChevronDown, MessageSquare, Terminal, Lightbulb
} from 'lucide-react'

const SAYAN_SYSTEM_PROMPT = `
You are "Sayan's AI Assistant", a smart, friendly, and enthusiastic AI personal assistant living inside Sayan Barman's portfolio website.
Your job is to answer any visitor or recruiter questions about Sayan Barman accurately, concisely, and professionally with warmth and charisma.

### About Sayan Barman:
- **Full Name**: Sayan Barman
- **Current Education**: 3rd Year B.Tech in Computer Science Engineering (Specialization: Artificial Intelligence & Machine Learning) at KIIT University (Kalinga Institute of Industrial Technology), Bhubaneswar, Odisha, India (Batch 2024–2028).
- **Societies/Clubs**: Member of KRS (KIIT Robotics Society) since Nov 2024.
- **Passions & Focus**: Artificial Intelligence, Machine Learning, Robotics & Embedded Systems, Computer Vision, Networking, Full-Stack Web Development, and Technical Content Creation on YouTube.
- **Contact Details**:
  - Email: sayanbarman30062005@gmail.com
  - Phone / WhatsApp: +91 9395639289
  - GitHub: https://github.com/Sayan238
  - LinkedIn: https://www.linkedin.com/in/sayan-barman-983491327/
  - Instagram: https://www.instagram.com/mr_sayan_barman_
  - YouTube Channel: @entroSa_tech (entroSa) - https://www.youtube.com/@entroSa_tech

### Skills & Tech Stack:
- **Programming Languages**: C, Python, Java, JavaScript, HTML, CSS
- **AI & ML**: Machine Learning, Computer Vision (OpenCV), Generative AI (Google Gemini, Prompt Engineering, Generative AI Studio)
- **Web Development**: React, Vite, Tailwind CSS, JavaScript (ES6+), FastAPI
- **Networking**: Cisco Packet Tracer, Subnetting, Network Simulation & Troubleshooting
- **Robotics & Embedded**: ESP32, ESP32-CAM, Arduino, 12-channel IR array sensors, TB6612FNG motor driver, PID control, ROS2
- **Creative & Multimedia**: Figma, Blender, Spline 3D, CapCut, DaVinci Resolve, Filmora

### Featured Projects:
1. **NetSage AI (Flagship Build)**:
   - AI-assisted network troubleshooting system combining Cisco Packet Tracer, networking rules, and Google Gemini AI.
   - Provides evidence-based diagnostics while keeping a human network engineer in the loop for the final decision.
2. **Smart Traffic Management System**:
   - Urban congestion project using SUMO simulation and FastAPI backend.
3. **Smart Library Scanner Robot**:
   - Autonomous library scanning vehicle using ESP32-CAM and motor sensors.
4. **Line Following Robot**:
   - High-precision platform built for KSHITIJ 2026 (IIT Kharagpur) using ESP32, TB6612FNG driver, 12-ch IR sensor array, and fine-tuned PID control.
5. **Video Processing & Computer Vision Pipeline**:
   - OpenCV pipeline for keyframe extraction, scene boundary detection, motion mapping, and object tracking.
6. **Cisco Packet Tracer Network Configs**:
   - Enterprise topology simulation, subnetting, VLANs, and diagnostics.

### YouTube Channel (@entroSa_tech / entroSa):
- Featured videos:
  1. "Build a Real Radar System with ESP32 | DIY Project" (https://youtu.be/lGQ48HOs0QQ)
  2. "DIY ESP32 Robot Car | Mobile Dashboard Control" (https://youtu.be/tTMUJ2WkfZo)
  3. "ESP32 WiFi LED Dashboard Project 🔥 | Web Control" (https://youtu.be/h9oOby0gYXQ)
  4. "A Day in the Life of an Engineering Student | First Vlog 🎥" (https://youtu.be/4szoyq4QZ84)

### Certifications:
- Data Analytics Essentials (Cisco Networking Academy)
- Introduction to Modern AI (Cisco Networking Academy)
- Getting Started with Cisco Packet Tracer (Cisco Networking Academy)
- Find Insights with AI (Cisco Networking Academy)
- Intro to Generative AI Studio (Simplilearn / Google Cloud)
- Programming with Python 3.X (Simplilearn)
- Line Follower Robot (KSHITIJ 2026, IIT Kharagpur)
- Generative AI Mastermind (Outskill)

### Personality & Tone:
- Helpful, conversational, tech-savvy, and positive.
- Keep answers concise (2-4 paragraphs max or clean bullet points).
- If asked about hiring or contacting Sayan, provide his email (sayanbarman30062005@gmail.com) and phone (+91 9395639289) and LinkedIn.
- You can format responses using markdown (*bold*, lists, backticks).
`

const SUGGESTED_PROMPTS = [
  "What is Sayan's flagship project?",
  "What tech stack does Sayan use?",
  "Tell me about his YouTube channel",
  "How can I contact or hire Sayan?",
]

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hi there! 👋 I'm **Sayan's AI Assistant**. Ask me anything about Sayan's projects, skills, robotics builds, or how to collaborate!"
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  // Show auto-popup tooltip after 3.5 seconds, then auto-hide after 6 seconds
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowTooltip(true)
    }, 3500)

    const hideTimer = setTimeout(() => {
      setShowTooltip(false)
    }, 9500)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      setShowTooltip(false)
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  // Fallback intelligent local responder if no Gemini API key is provided or offline
  const getLocalResponse = (query) => {
    const q = query.toLowerCase().trim()

    // 1. Specific projects
    if (q.includes('netsage') || (q.includes('flagship') && q.includes('project'))) {
      return "🚀 **NetSage AI** is Sayan's flagship project! It's an **AI-Assisted Network Troubleshooting** platform that merges **Cisco Packet Tracer**, rule-based networking heuristics, and **Google Gemini AI** to produce evidence-backed diagnostics while ensuring a human engineer stays in control of the final decision."
    }
    if (q.includes('traffic') || q.includes('sumo')) {
      return "🚦 **Smart Traffic Management System**: An intelligent urban mobility solution built with **SUMO (Simulation of Urban MObility)** and a **FastAPI** backend to simulate and optimize real-time city traffic flows."
    }
    if (q.includes('radar')) {
      return "📡 **Build a Real Radar System with ESP32**: Sayan built an interactive radar system with ultrasonic sensors and ESP32 with real-time visual mapping! Watch the tutorial on his YouTube: [Watch on YouTube](https://youtu.be/lGQ48HOs0QQ)."
    }
    if (q.includes('robot car') || q.includes('car') || q.includes('mobile dashboard')) {
      return "🏎️ **DIY ESP32 Robot Car**: A custom motorized robotic car controlled wirelessly via a custom mobile web dashboard. Check out his build video: [Watch on YouTube](https://youtu.be/tTMUJ2WkfZo)!"
    }
    if (q.includes('scanner') || q.includes('library')) {
      return "🤖 **Smart Library Scanner Robot**: An autonomous robotic rover using **ESP32-CAM** and distance/line sensors designed to navigate library aisles and scan books."
    }
    if (q.includes('line follower') || q.includes('kshitij') || q.includes('iit') || q.includes('kharagpur')) {
      return "🏎️ **Line Following Robot (IIT Kharagpur — KSHITIJ 2026)**: A high-precision racing robot powered by ESP32, a 12-channel IR sensor array, TB6612FNG dual motor driver, and fine-tuned PID control algorithm."
    }
    if (q.includes('project') || q.includes('build') || q.includes('work')) {
      return "Sayan has engineered multiple impressive builds across AI/ML & Robotics:\n\n1. 🌐 **NetSage AI** — Flagship AI network troubleshooter with Cisco Packet Tracer & Gemini AI.\n2. 🚦 **Smart Traffic Management** — SUMO simulation with FastAPI.\n3. 🤖 **Smart Library Scanner Robot** — ESP32-CAM autonomous tracking rover.\n4. 🏎️ **Line Following Robot** — High-speed PID robot built for IIT Kharagpur (KSHITIJ 2026).\n5. 👁️ **Computer Vision Pipeline** — OpenCV video analysis & object tracking.\n\nExplore the **Projects** section on this page to view details!"
    }

    // 2. Tech Stack & Skills
    if (q.includes('skill') || q.includes('stack') || q.includes('language') || q.includes('tool') || q.includes('tech') || q.includes('python') || q.includes('c++') || q.includes('java')) {
      return "💻 **Sayan's Technical Toolbox** includes:\n\n- **Languages**: Python, C, Java, JavaScript, HTML, CSS\n- **AI & ML**: Machine Learning, Computer Vision, OpenCV, Google Gemini, Generative AI Studio\n- **Web**: React, Vite, Tailwind CSS, FastAPI\n- **Robotics & IoT**: ESP32, ESP32-CAM, Arduino, 12-channel IR Sensors, PID Control, TB6612FNG, ROS2\n- **Networking**: Cisco Packet Tracer, Subnetting, Topology Design & Diagnostics\n- **Design & Video**: Figma, Blender, DaVinci Resolve, CapCut"
    }

    // 3. YouTube & Videos
    if (q.includes('youtube') || q.includes('video') || q.includes('entrosa') || q.includes('channel') || q.includes('vlog')) {
      return "🎥 Sayan runs the tech YouTube channel **@entroSa_tech** (entroSa) creating robotics guides, IoT tutorials, and campus life vlogs!\n\nTop Videos:\n- **Build a Real Radar System with ESP32** ([Watch](https://youtu.be/lGQ48HOs0QQ))\n- **DIY ESP32 Robot Car with Mobile Dashboard** ([Watch](https://youtu.be/tTMUJ2WkfZo))\n- **ESP32 WiFi LED Web Server Project** ([Watch](https://youtu.be/h9oOby0gYXQ))\n- **A Day in the Life of a KIIT Engineering Student** ([Watch](https://youtu.be/4szoyq4QZ84))\n\nSubscribe here: [youtube.com/@entroSa_tech](https://www.youtube.com/@entroSa_tech)!"
    }

    // 4. Contact & Hiring
    if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('phone') || q.includes('whatsapp') || q.includes('reach') || q.includes('message') || q.includes('call') || q.includes('job') || q.includes('internship')) {
      return "📬 You can reach out to Sayan directly:\n\n- 📧 **Email**: sayanbarman30062005@gmail.com\n- 📞 **Phone / WhatsApp**: +91 9395639289\n- 💼 **LinkedIn**: [linkedin.com/in/sayan-barman](https://www.linkedin.com/in/sayan-barman-983491327/)\n- 🐙 **GitHub**: [github.com/Sayan238](https://github.com/Sayan238)\n- 📸 **Instagram**: [instagram.com/mr_sayan_barman_](https://www.instagram.com/mr_sayan_barman_)\n\nHe is open to software & AI internships, robotics projects, and technical collaborations!"
    }

    // 5. Education & College (KIIT)
    if (q.includes('kiit') || q.includes('education') || q.includes('college') || q.includes('university') || q.includes('student') || q.includes('degree') || q.includes('b.tech') || q.includes('krs') || q.includes('robotics society')) {
      return "🎓 Sayan is currently a **3rd Year B.Tech Computer Science Engineering student (specializing in AI & ML)** at **KIIT University** in Bhubaneswar, Odisha (Batch 2024–2028). He is also an active member of **KRS (KIIT Robotics Society)** since November 2024!"
    }

    // 6. Resume
    if (q.includes('resume') || q.includes('cv')) {
      return "📄 You can view or download Sayan's resume right on this page! Check out the **Resume** section or download the latest copy directly from the hero buttons."
    }

    // 7. Certifications
    if (q.includes('certificate') || q.includes('cisco') || q.includes('cert') || q.includes('course')) {
      return "📜 Sayan holds multiple industry certifications:\n- **Cisco Networking Academy**: Data Analytics Essentials, Modern AI, Packet Tracer, Find Insights with AI\n- **Simplilearn / Google Cloud**: Intro to Generative AI Studio & Python 3.X\n- **IIT Kharagpur (KSHITIJ 2026)**: Line Follower Robot\n- **Outskill**: Generative AI Mastermind"
    }

    // 8. Personal / Bio / Family / Background
    if (q.includes('who is') || q.includes('about') || q.includes('intro') || q.includes('bio') || q.includes('background')) {
      return "👋 **Sayan Barman** is a Computer Science Engineer, AI/ML developer, robotics builder, and tech creator studying at KIIT University, Bhubaneswar. He loves building intelligent systems that blend software, hardware (ESP32/sensors), and modern AI models."
    }
    if (q.includes('family') || q.includes('parents') || q.includes('home') || q.includes('hometown')) {
      return "🏡 Sayan is currently based in **Bhubaneswar, Odisha, India** pursuing his B.Tech at KIIT University. He comes from a supportive family that encourages his passion for engineering, robotics, and creative coding."
    }
    if (q.includes('age') || q.includes('birthday') || q.includes('born') || q.includes('dob')) {
      return "🎂 Sayan Barman was born on **June 30, 2005** and is currently an enthusiastic 3rd-year engineering student!"
    }
    if (q.includes('hobby') || q.includes('hobbies') || q.includes('free time') || q.includes('interest')) {
      return "⚡ In his free time, Sayan enjoys tinkering with robotics and ESP32 hardware, creating tech videos for his YouTube channel **@entroSa_tech**, exploring generative AI frameworks, 3D design in Blender, and video editing."
    }
    if (q.includes('crush') || q.includes('girlfriend') || q.includes('gf') || q.includes('dating') || q.includes('love') || q.includes('relationship') || q.includes('single') || q.includes('married')) {
      return "😄 Haha, Sayan is currently in a committed relationship with his **Code, AI models, and Robotics experiments**! When he's not in the lab or editing videos for @entroSa_tech, you'll find him tuning PID algorithms or building systems like NetSage AI."
    }
    if (q.includes('friend') || q.includes('friends') || q.includes('circle') || q.includes('batch')) {
      return "👥 Sayan has a great network of friends and fellow innovators at **KIIT University** and the **KRS (KIIT Robotics Society)** with whom he collaborates on hackathons, robotics competitions (like IIT Kharagpur KSHITIJ), and coding projects!"
    }
    if (q.includes('goal') || q.includes('dream') || q.includes('future') || q.includes('aspire') || q.includes('vision')) {
      return "🎯 Sayan's goal is to innovate at the intersection of **Artificial Intelligence, Embedded Robotics, and Autonomous Systems** — creating real-world AI applications that empower engineers and solve tangible problems."
    }
    if (q.includes('school') || q.includes('high school') || q.includes('12th') || q.includes('10th')) {
      return "🏫 Sayan completed his schooling with a strong focus on Science & Mathematics before joining KIIT University for his B.Tech in Computer Science Engineering (AI & ML)."
    }

    // 9. Greetings
    if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q === 'sup' || q === 'yo') {
      return "Hello! Great to meet you! 😊 I can answer anything about Sayan Barman's background, AI/ML skills, robotics builds, YouTube channel, or help you get in touch with him. What would you like to know?"
    }

    return `Sayan Barman is a 3rd-year CSE (AI & ML) student at KIIT University building intelligent AI systems, robotics platforms (like NetSage AI & ESP32 robots), and technical YouTube content (@entroSa_tech). \n\nFeel free to ask about his specific projects, skills, certifications, or reach him at **sayanbarman30062005@gmail.com** (+91 9395639289)!`
  }

  const handleSend = async (textToSend = input) => {
    const userQuery = textToSend.trim()
    if (!userQuery || loading) return

    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userQuery }])
    setLoading(true)

    // Check if user has Gemini API Key set in environment
    const activeKey = import.meta.env.VITE_GEMINI_API_KEY

    if (activeKey && activeKey.trim() !== '') {
      try {
        const models = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-1.5-pro']
        let success = false

        for (const model of models) {
          try {
            const response = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${activeKey.trim()}`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  contents: [
                    {
                      role: 'user',
                      parts: [
                        {
                          text: `${SAYAN_SYSTEM_PROMPT}\n\nVisitor Question: "${userQuery}"\n\nPlease answer accurately as Sayan's AI assistant in a friendly, engaging tone with concise markdown formatting.`
                        }
                      ]
                    }
                  ],
                  generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 600,
                  }
                })
              }
            )

            const data = await response.json()
            if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
              const aiResponse = data.candidates[0].content.parts[0].text
              setMessages(prev => [...prev, { role: 'assistant', text: aiResponse }])
              setLoading(false)
              success = true
              break
            }
          } catch (modelErr) {
            console.warn(`Model ${model} failed, trying next...`, modelErr)
          }
        }

        if (success) return
      } catch (err) {
        console.warn('Gemini fetch failed, using fallback engine:', err)
      }
    }

    // Fallback: Use built-in knowledge engine with slight realistic typing delay
    setTimeout(() => {
      const fallbackReply = getLocalResponse(userQuery)
      setMessages(prev => [...prev, { role: 'assistant', text: fallbackReply }])
      setLoading(false)
    }, 400)
  }

  // Format simple markdown into clean elements (bold, links, lists)
  const renderFormattedText = (text) => {
    return text.split('\n').map((line, lineIdx) => {
      // Parse markdown bold **text** and links [text](url)
      const parts = line.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g)
      return (
        <p key={lineIdx} className="chat-msg-line">
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pIdx}>{part.slice(2, -2)}</strong>
            }
            if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
              const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/)
              if (linkMatch) {
                return (
                  <a key={pIdx} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="chat-inline-link">
                    {linkMatch[1]} <ExternalLink size={11} style={{ display: 'inline' }}/>
                  </a>
                )
              }
            }
            return part
          })}
        </p>
      )
    })
  }

  return (
    <>
      {/* Floating Trigger Container */}
      <div className="ai-chat-trigger-wrap">
        {/* Disappearing Speech Bubble Pop-up */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              className="ai-speech-bubble"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.9 }}
              onClick={() => setIsOpen(true)}
            >
              <div className="ai-speech-content">
                <Sparkles size={14} className="sparkle-icon"/>
                <span>Ask about Sayan!</span>
              </div>
              <div className="ai-speech-tail"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Circular Floating AI Logo Button */}
        <motion.button
          className="ai-chat-circle-btn"
          onClick={() => {
            setIsOpen(prev => !prev)
            setShowTooltip(false)
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Open AI Assistant"
          title="Ask Sayan's AI Assistant"
        >
          <Bot size={26}/>
          <span className="ai-pulse-dot"></span>
        </motion.button>
      </div>

      {/* Floating Chat Modal / Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="ai-chat-window"
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="ai-chat-header">
              <div className="ai-chat-header-info">
                <div className="ai-header-avatar">
                  <Bot size={22}/>
                </div>
                <div>
                  <div className="ai-header-title">
                    <h4>Sayan's AI Assistant</h4>
                  </div>
                  <small>Ask anything about Sayan's skills & projects</small>
                </div>
              </div>
              <div className="ai-header-actions">
                <button
                  className="ai-icon-btn"
                  onClick={() => setIsOpen(false)}
                  title="Close Chat"
                >
                  <X size={17}/>
                </button>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="ai-chat-body">
              {messages.map((m, i) => (
                <div key={i} className={`ai-message-row ${m.role}`}>
                  <div className="ai-msg-avatar">
                    {m.role === 'assistant' ? <Bot size={16}/> : <User size={16}/>}
                  </div>
                  <div className="ai-msg-bubble">
                    {renderFormattedText(m.text)}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="ai-message-row assistant">
                  <div className="ai-msg-avatar"><Bot size={16}/></div>
                  <div className="ai-msg-bubble typing">
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggested Prompt Chips */}
            <div className="ai-chat-prompts">
              {SUGGESTED_PROMPTS.map(p => (
                <button
                  key={p}
                  className="ai-prompt-chip"
                  onClick={() => handleSend(p)}
                >
                  <Sparkles size={12}/> {p}
                </button>
              ))}
            </div>

            {/* Chat Input Form */}
            <form
              className="ai-chat-input-form"
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
            >
              <input
                type="text"
                placeholder="Ask about NetSage AI, skills, KIIT, contact..."
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={loading}
              />
              <button
                type="submit"
                className="ai-send-btn"
                disabled={!input.trim() || loading}
                aria-label="Send Message"
              >
                <Send size={16}/>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
