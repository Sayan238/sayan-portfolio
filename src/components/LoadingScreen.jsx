import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'

// Web Audio synthesizer with rich harmonics and amplified volume
class SoundEngine {
  constructor() {
    this.ctx = null
    this.muted = false
    this.hasPlayedStartup = false
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    return this.ctx
  }

  async resume() {
    const ctx = this.ensureContext()
    if (ctx && ctx.state === 'suspended') {
      try {
        await ctx.resume()
      } catch (err) {
        // user gesture required
      }
    }
    return ctx
  }

  async playStartupChime() {
    if (this.muted) return
    const ctx = await this.resume()
    if (!ctx || ctx.state !== 'running') return

    this.hasPlayedStartup = true
    const now = ctx.currentTime

    // Master Compressor for loud, punchy, distortion-free sound
    const compressor = ctx.createDynamicsCompressor()
    compressor.threshold.setValueAtTime(-18, now)
    compressor.knee.setValueAtTime(20, now)
    compressor.ratio.setValueAtTime(8, now)
    compressor.attack.setValueAtTime(0.003, now)
    compressor.release.setValueAtTime(0.25, now)
    compressor.connect(ctx.destination)

    // Harmonious multi-octave chime chords (Eb4, G4, Bb4, Eb5, G5)
    const notes = [
      { freq: 311.13, type: 'sine', gain: 0.45, delay: 0.00 },
      { freq: 392.00, type: 'triangle', gain: 0.38, delay: 0.08 },
      { freq: 466.16, type: 'sine', gain: 0.35, delay: 0.16 },
      { freq: 622.25, type: 'triangle', gain: 0.32, delay: 0.24 },
      { freq: 783.99, type: 'sine', gain: 0.28, delay: 0.32 },
    ]

    notes.forEach((n) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = n.type
      osc.frequency.setValueAtTime(n.freq, now + n.delay)

      // Rich volume envelope
      gain.gain.setValueAtTime(0.0001, now + n.delay)
      gain.gain.exponentialRampToValueAtTime(n.gain, now + n.delay + 0.04)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + n.delay + 1.3)

      osc.connect(gain)
      gain.connect(compressor)

      osc.start(now + n.delay)
      osc.stop(now + n.delay + 1.35)
    })
  }

  async playFinishChime() {
    if (this.muted) return
    const ctx = await this.resume()
    if (!ctx || ctx.state !== 'running') return

    const now = ctx.currentTime
    const compressor = ctx.createDynamicsCompressor()
    compressor.connect(ctx.destination)

    // Sparkle finish chord
    const freqs = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(freq, now + idx * 0.06)

      gain.gain.setValueAtTime(0.0001, now + idx * 0.06)
      gain.gain.exponentialRampToValueAtTime(0.35, now + idx * 0.06 + 0.03)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.8)

      osc.connect(gain)
      gain.connect(compressor)

      osc.start(now + idx * 0.06)
      osc.stop(now + idx * 0.06 + 0.85)
    })
  }

  async playClick() {
    if (this.muted) return
    const ctx = await this.resume()
    if (!ctx || ctx.state !== 'running') return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(900, now)
    osc.frequency.exponentialRampToValueAtTime(450, now + 0.05)

    gain.gain.setValueAtTime(0.30, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.06)
  }
}

const sounds = new SoundEngine()

export default function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    sounds.hasPlayedStartup = false

    // Attempt automatic playback on initial load
    sounds.playStartupChime()

    // Unlock and play on any first user interaction
    const unlockAndPlay = () => {
      sounds.playStartupChime()
    }

    window.addEventListener('click', unlockAndPlay, { once: true })
    window.addEventListener('pointerdown', unlockAndPlay, { once: true })
    window.addEventListener('touchstart', unlockAndPlay, { once: true })
    window.addEventListener('keydown', unlockAndPlay, { once: true })

    return () => {
      window.removeEventListener('click', unlockAndPlay)
      window.removeEventListener('pointerdown', unlockAndPlay)
      window.removeEventListener('touchstart', unlockAndPlay)
      window.removeEventListener('keydown', unlockAndPlay)
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ') {
        completeLoading()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    let startTimestamp = null
    const duration = 2400 // 2.4 seconds total animation time

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp
      const elapsed = timestamp - startTimestamp
      const rawProgress = Math.min((elapsed / duration) * 100, 100)
      
      setProgress(Math.floor(rawProgress))

      if (rawProgress < 100) {
        requestAnimationFrame(step)
      } else {
        sounds.playFinishChime()
        setTimeout(() => {
          completeLoading()
        }, 350)
      }
    }

    const animFrame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animFrame)
  }, [])

  const completeLoading = () => {
    sounds.playClick()
    setIsFinished(true)
    setTimeout(() => {
      if (onFinish) onFinish()
    }, 600)
  }

  const handleSoundBtnClick = (e) => {
    e.stopPropagation()
    const nextMuted = !isMuted
    setIsMuted(nextMuted)
    sounds.muted = nextMuted
    if (!nextMuted) {
      sounds.hasPlayedStartup = false
      sounds.playStartupChime()
    }
  }

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          className="sayan-loader-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -25,
            scale: 0.98,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
          }}
          onClick={completeLoading}
          title="Click to enter"
        >
          <div className="sayan-loader-bg-pattern" />

          <motion.div 
            className="sayan-loader-paper"
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            onClick={(e) => {
              // Playing chime on paper click if not yet played
              sounds.playStartupChime()
            }}
          >
            {/* Doodle (Top Right Arrow only) */}
            <div className="sayan-doodle sayan-doodle-two">↗</div>

            {/* Illustration */}
            <img 
              className="sayan-loader-illustration" 
              src="/assets/loading-illustration.png" 
              alt="Creative technology illustration" 
            />

            {/* Progress and status */}
            <div className="sayan-progress-wrap">
              <div className="sayan-progress-track">
                <div 
                  className="sayan-progress-bar"
                  style={{ width: `${Math.max(progress, 8)}%` }}
                />
              </div>

              <div className="sayan-loading-text">
                Loading<span className="sayan-dots" />
              </div>

              <div className="sayan-caption">THINK • BUILD • REPEAT</div>

              <div className="sayan-loader-actions">
                <button 
                  className="sayan-sound-btn"
                  onClick={handleSoundBtnClick}
                  type="button"
                  title={isMuted ? 'Turn Sound ON' : 'Turn Sound OFF'}
                >
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  <span>{isMuted ? 'Muted' : 'Sound ON'}</span>
                </button>

                <button 
                  className="sayan-skip-btn" 
                  onClick={completeLoading}
                  type="button"
                >
                  Skip <span>ESC</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
