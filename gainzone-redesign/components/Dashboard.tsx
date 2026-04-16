'use client'
import { useEffect, useState, useCallback, useRef } from 'react'
import { exercises, pplProgram, type Exercise } from '@/lib/exercises'
import { ExerciseModal } from './ExerciseModal'

const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const todayName = DAYS[new Date().getDay()]

// Confetti burst
function triggerConfetti() {
  const colors = ['#00ff94','#ff6b35','#fff','#00d4ff','#ffcc00']
  for (let i = 0; i < 40; i++) {
    const el = document.createElement('div')
    el.className = 'confetti-piece'
    el.style.cssText = `
      left:${Math.random()*100}vw;
      top:0;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      border-radius:${Math.random()>0.5?'50%':'2px'};
      animation-duration:${0.8+Math.random()*1.2}s;
      animation-delay:${Math.random()*0.4}s;
      width:${6+Math.random()*8}px;
      height:${6+Math.random()*8}px;
    `
    document.body.appendChild(el)
    setTimeout(() => el.remove(), 2000)
  }
}

// Animated SVG Progress Ring
function ProgressRing({ percent, size = 140, stroke = 10 }: { percent: number; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const [dashOffset, setDashOffset] = useState(circ)

  useEffect(() => {
    const t = setTimeout(() => {
      setDashOffset(circ - (percent / 100) * circ)
    }, 200)
    return () => clearTimeout(t)
  }, [percent, circ])

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
        <circle cx={size/2} cy={size/2} r={r} stroke="var(--surface3)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size/2} cy={size/2} r={r}
          stroke="var(--accent)" strokeWidth={stroke} fill="none"
          strokeDasharray={circ}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
            filter: 'drop-shadow(0 0 6px rgba(0,255,148,0.6))'
          }}
        />
      </svg>
      <div style={{ textAlign: 'center', zIndex: 1 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', letterSpacing: '2px', color: 'var(--text)', lineHeight: 1 }}>
          {percent}%
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--muted)', letterSpacing: '1px', marginTop: '3px' }}>WEEKLY</div>
      </div>
    </div>
  )
}

export default function Dashboard({ onNavigate, profile }: { onNavigate: (tab: string) => void; profile?: any }) {
  const todayPlan = pplProgram.days.find(d => d.day === todayName)
  const todayExes = todayPlan?.exercises.map(id => exercises.find(e => e.id === id)).filter(Boolean) || []
  const isRest = todayPlan?.type === 'Rest'
  const weekDone = [true, true, true, false, false, false, false]
  const doneCount = weekDone.filter(Boolean).length
  const weekPercent = Math.round((doneCount / 7) * 100)

  const [gifMap, setGifMap] = useState<Record<string, string>>({})
  const [selected, setSelected] = useState<Exercise | null>(null)
  const [workoutStarted, setWorkoutStarted] = useState(false)
  const [completedExes, setCompletedExes] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (profile?.name) {
      const ctx = [
        `Name: ${profile.name}`,
        profile.age && `Age: ${profile.age}`,
        profile.gender && `Gender: ${profile.gender}`,
        profile.weight_kg && `Weight: ${profile.weight_kg}kg`,
        profile.goal && `Goal: ${profile.goal}`,
        profile.experience && `Experience: ${profile.experience}`,
        profile.equipment && `Equipment: ${profile.equipment}`,
        profile.injuries && `Injuries: ${profile.injuries}`,
      ].filter(Boolean).join(' | ')
      ;(window as any).__gainzoneProfile = ctx
    }
  }, [profile])

  useEffect(() => {
    fetch('/api/exercise-gifs')
      .then(r => r.json())
      .then(data => setGifMap(data))
      .catch(() => {})
  }, [])

  const closeModal = useCallback(() => {
    if (window.history.state?.modal) window.history.back()
    setSelected(null)
  }, [])

  const toggleExercise = (id: string) => {
    const next = new Set(completedExes)
    if (next.has(id)) { next.delete(id) }
    else {
      next.add(id)
      if (next.size === todayExes.length) triggerConfetti()
    }
    setCompletedExes(next)
  }

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'GOOD MORNING'
    if (h < 17) return 'GOOD AFTERNOON'
    return 'GOOD EVENING'
  }

  return (
    <div className="slide-up stagger">
      {/* ── HEADER ── */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div className="section-label" style={{ marginBottom: '8px' }}>
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' }).toUpperCase()}
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
          <div>
            <div className="page-title">{greeting()}</div>
            {profile?.name && (
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', letterSpacing: '2px', color: 'var(--accent)', marginTop: '2px' }}>
                {profile.name.toUpperCase()} 💪
              </div>
            )}
          </div>
          {/* Streak badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '50px', background: 'linear-gradient(135deg, rgba(255,107,53,0.15), rgba(255,180,0,0.1))', border: '1px solid rgba(255,107,53,0.25)', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--orange)' }}>
            <span className="fire-pulse">🔥</span> 7 DAY STREAK
          </div>
        </div>
      </div>

      {/* ── HERO CARD ── */}
      <div style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', marginBottom: '1.25rem', position: 'relative', overflow: 'hidden' }}>
        {/* Top accent line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, var(--accent), transparent)' }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <div className="section-label" style={{ marginBottom: '8px' }}>TODAY</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '38px', letterSpacing: '2px', lineHeight: 1, color: isRest ? 'var(--muted)' : 'var(--text)' }}>
              {isRest ? 'REST DAY' : `${todayPlan?.type?.toUpperCase()} DAY`}
            </div>
            {!isRest && (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginTop: '8px' }}>
                {todayPlan?.focus} · {todayExes.length} exercises · ~60 min
              </div>
            )}
            {isRest && (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginTop: '8px' }}>
                SLEEP · HYDRATE · RECOVER
              </div>
            )}
            {!isRest && (
              <div style={{ marginTop: '16px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {!workoutStarted ? (
                  <button
                    className="btn-primary pulse-glow"
                    onClick={() => setWorkoutStarted(true)}
                  >
                    START WORKOUT ↗
                  </button>
                ) : (
                  <button className="btn-primary" style={{ background: 'var(--orange)', boxShadow: '0 4px 20px rgba(255,107,53,0.3)' }}>
                    IN PROGRESS ●
                  </button>
                )}
                <button className="btn-ghost" onClick={() => onNavigate('exercises')}>
                  View All
                </button>
              </div>
            )}
          </div>
          <ProgressRing percent={weekPercent} />
        </div>
      </div>

      {/* ── STATS ROW ── */}
      <div className="stat-grid" style={{ marginBottom: '1.25rem' }}>
        <div className="stat-box">
          <div className="stat-val" style={{ color: 'var(--accent)' }}>7</div>
          <div className="stat-lbl">DAY STREAK</div>
        </div>
        <div className="stat-box">
          <div className="stat-val">14</div>
          <div className="stat-lbl">THIS MONTH</div>
        </div>
        <div className="stat-box">
          <div className="stat-val" style={{ color: 'var(--orange)' }}>5.8k</div>
          <div className="stat-lbl">KCAL BURNED</div>
        </div>
      </div>

      {/* ── WEEK GRID ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '16px', marginBottom: '1.25rem' }}>
        <div className="section-label" style={{ marginBottom: '12px' }}>THIS WEEK</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '6px' }}>
          {['M','T','W','T','F','S','S'].map((d, i) => {
            const done = weekDone[i]
            const isToday = i === ((new Date().getDay() + 6) % 7)
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontSize: '14px', letterSpacing: '1px',
                  background: done ? 'var(--accent)' : isToday ? 'var(--accent-dim)' : 'transparent',
                  border: isToday && !done ? '1px solid rgba(0,255,148,0.3)' : done ? 'none' : '1px solid var(--border)',
                  color: done ? '#000' : isToday ? 'var(--accent)' : 'var(--muted)',
                  transition: 'all 0.2s',
                  boxShadow: done ? '0 0 10px rgba(0,255,148,0.3)' : 'none'
                }}>{d}</div>
              </div>
            )
          })}
        </div>
        <div style={{ marginTop: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--muted)' }}>{doneCount}/7 DAYS</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--accent)' }}>{weekPercent}%</span>
          </div>
          <div className="progress-track"><div className="progress-fill" style={{ width: `${weekPercent}%` }} /></div>
        </div>
      </div>

      {/* ── TODAY'S EXERCISES ── */}
      {!isRest && todayExes.length > 0 && (
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div className="section-label">TODAY'S EXERCISES — TAP TO VIEW</div>
            {workoutStarted && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--accent)' }}>
                {completedExes.size}/{todayExes.length} DONE
              </span>
            )}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {todayExes.slice(0, 4).map(ex => ex && (
              <div
                key={ex.id}
                style={{
                  background: completedExes.has(ex.id) ? 'var(--accent-dim)' : 'var(--surface)',
                  border: `1px solid ${completedExes.has(ex.id) ? 'rgba(0,255,148,0.25)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  transition: 'all 0.2s',
                }}
                onClick={() => {
                  if (workoutStarted) { toggleExercise(ex.id) }
                  else { setSelected(ex) }
                }}
              >
                {gifMap[ex.id] && !workoutStarted && (
                  <div style={{ height: '80px', overflow: 'hidden', borderBottom: '1px solid var(--border)' }}>
                    <img src={gifMap[ex.id]} alt={ex.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                <div style={{ padding: '12px' }}>
                  {workoutStarted && (
                    <div style={{ marginBottom: '6px' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        width: '20px', height: '20px', borderRadius: '50%',
                        background: completedExes.has(ex.id) ? 'var(--accent)' : 'transparent',
                        border: `2px solid ${completedExes.has(ex.id) ? 'var(--accent)' : 'var(--border)'}`,
                        fontSize: '11px', color: '#000'
                      }}>
                        {completedExes.has(ex.id) ? '✓' : ''}
                      </span>
                    </div>
                  )}
                  <div style={{ marginBottom: '4px' }}><span className="badge">{ex.muscle}</span></div>
                  <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '3px', lineHeight: 1.3, color: completedExes.has(ex.id) ? 'var(--accent)' : 'var(--text)' }}>{ex.name}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)' }}>{ex.sets}×{ex.reps}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── QUICK ACTIONS ── */}
      <div className="section-label" style={{ marginBottom: '10px' }}>QUICK ACTIONS</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {[
          { tab: 'planner',   label: 'Build Plan',  sub: 'AI-powered',       icon: '↗', accent: true  },
          { tab: 'log',       label: 'Log Workout', sub: 'Track sets & reps', icon: '+', accent: false },
          { tab: 'exercises', label: 'Exercises',   sub: 'Animated guides',  icon: '▶', accent: false },
          { tab: 'tools',     label: 'Tools',       sub: 'Timer · Calculator',icon: '⏱',accent: false },
        ].map(a => (
          <button
            key={a.tab}
            onClick={() => onNavigate(a.tab)}
            style={{
              background: a.accent ? 'var(--accent-dim)' : 'var(--surface)',
              border: `1px solid ${a.accent ? 'rgba(0,255,148,0.2)' : 'var(--border)'}`,
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,255,148,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = a.accent ? 'rgba(0,255,148,0.2)' : 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: a.accent ? 'var(--accent)' : 'var(--muted)', marginBottom: '8px' }}>{a.icon}</div>
            <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '3px', color: 'var(--text)' }}>{a.label}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)' }}>{a.sub}</div>
          </button>
        ))}
      </div>

      {/* Motivational line */}
      <div style={{ marginTop: '1.5rem', padding: '16px', background: 'rgba(0,255,148,0.03)', border: '1px solid rgba(0,255,148,0.08)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '1px' }}>
          YOU'RE CLOSER THAN 95% OF PEOPLE WHO QUIT.
        </div>
      </div>

      {selected && (
        <ExerciseModal selected={selected} gifMap={gifMap} onClose={closeModal} />
      )}
    </div>
  )
}
