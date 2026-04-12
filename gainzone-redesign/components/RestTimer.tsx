'use client'
import { useState, useEffect, useRef } from 'react'

const PRESETS = [
  { label: '30s', seconds: 30 },
  { label: '60s', seconds: 60 },
  { label: '90s', seconds: 90 },
  { label: '2 min', seconds: 120 },
  { label: '3 min', seconds: 180 },
  { label: '5 min', seconds: 300 },
]

export default function RestTimer() {
  const [duration, setDuration] = useState(90)
  const [remaining, setRemaining] = useState(90)
  const [running, setRunning] = useState(false)
  const [completed, setCompleted] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<AudioContext | null>(null)

  const pct = remaining / duration
  const radius = 80
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference * pct

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setRemaining(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!)
            setRunning(false)
            setCompleted(true)
            playBeep()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running])

  function playBeep() {
    try {
      const ctx = new AudioContext()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.frequency.value = 880
      gain.gain.setValueAtTime(0.3, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.5)
    } catch {}
  }

  function setPreset(s: number) {
    setDuration(s)
    setRemaining(s)
    setRunning(false)
    setCompleted(false)
  }

  function toggle() {
    if (completed) {
      setRemaining(duration)
      setCompleted(false)
      setRunning(true)
    } else {
      setRunning(!running)
    }
  }

  function reset() {
    setRunning(false)
    setRemaining(duration)
    setCompleted(false)
  }

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  const ringColor = completed ? '#f0957b' : remaining <= 10 ? '#e8a84c' : 'var(--accent)'

  return (
    <div>
      <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '1.5rem' }}>Rest Timer</div>

      {/* Ring */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <div style={{ position: 'relative', width: '220px', height: '220px' }}>
          <svg width="220" height="220" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="110" cy="110" r={radius} fill="none" stroke="#1e1e1e" strokeWidth="8" />
            <circle
              cx="110" cy="110" r={radius}
              fill="none" stroke={ringColor} strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - dashOffset}
              style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }}
            />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {completed ? (
              <>
                <div style={{ fontSize: '32px', marginBottom: '4px' }}>✅</div>
                <div style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 500 }}>Rest done!</div>
              </>
            ) : (
              <>
                <div className="font-display" style={{ fontSize: '48px', fontWeight: 900, letterSpacing: '2px', color: ringColor, lineHeight: 1 }}>{fmt(remaining)}</div>
                <div style={{ fontSize: '11px', color: '#555', marginTop: '4px' }}>of {fmt(duration)}</div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem' }}>
        <button className="btn-primary" style={{ flex: 2, padding: '14px', fontSize: '15px' }} onClick={toggle}>
          {completed ? '🔄 Restart' : running ? '⏸ Pause' : '▶ Start'}
        </button>
        <button className="btn-ghost" style={{ flex: 1, padding: '14px' }} onClick={reset}>Reset</button>
      </div>

      {/* Presets */}
      <div style={{ fontSize: '11px', color: '#555', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Presets</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '1.5rem' }}>
        {PRESETS.map(p => (
          <button key={p.seconds} onClick={() => setPreset(p.seconds)} style={{
            padding: '10px', borderRadius: '8px', cursor: 'pointer', border: '1px solid',
            borderColor: duration === p.seconds ? 'var(--accent)' : '#2a2a2a',
            background: duration === p.seconds ? '#1a3010' : '#111',
            color: duration === p.seconds ? 'var(--accent)' : '#888',
            fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500
          }}>{p.label}</button>
        ))}
      </div>

      {/* Custom */}
      <div>
        <div style={{ fontSize: '11px', color: '#555', marginBottom: '8px' }}>CUSTOM ({fmt(duration)})</div>
        <input type="range" min="15" max="600" step="15" value={duration}
          onChange={e => setPreset(Number(e.target.value))}
          style={{ width: '100%' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#444', marginTop: '4px' }}>
          <span>15s</span><span>10 min</span>
        </div>
      </div>
    </div>
  )
}
