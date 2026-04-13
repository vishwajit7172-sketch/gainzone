'use client'
import { useState } from 'react'
import { type UserProfile } from '@/lib/useProfile'

const STEPS = [
  {
    id: 'basics',
    title: "What's your name?",
    sub: 'So we can personalise your experience'
  },
  {
    id: 'body',
    title: 'Your body stats',
    sub: 'Used to calculate your ideal training load'
  },
  {
    id: 'goal',
    title: 'What\'s your main goal?',
    sub: 'We\'ll build everything around this'
  },
  {
    id: 'experience',
    title: 'Training experience',
    sub: 'Helps us set the right intensity'
  },
  {
    id: 'schedule',
    title: 'Your setup',
    sub: 'Days available and equipment access'
  },
]

const GOALS = [
  { id: 'muscle', label: 'Build Muscle', icon: '💪' },
  { id: 'fat_loss', label: 'Lose Fat', icon: '🔥' },
  { id: 'strength', label: 'Get Stronger', icon: '🏋️' },
  { id: 'endurance', label: 'Build Endurance', icon: '🏃' },
  { id: 'recomp', label: 'Body Recomp', icon: '⚖️' },
]

const EXPERIENCE = [
  { id: 'beginner', label: 'Beginner', sub: 'Less than 1 year' },
  { id: 'intermediate', label: 'Intermediate', sub: '1–3 years' },
  { id: 'advanced', label: 'Advanced', sub: '3+ years' },
]

const EQUIPMENT = [
  { id: 'full_gym', label: 'Full Gym', sub: 'Barbells, machines, cables' },
  { id: 'dumbbells', label: 'Dumbbells Only', sub: 'Home or limited gym' },
  { id: 'bodyweight', label: 'Bodyweight', sub: 'No equipment' },
]

export default function Onboarding({ onComplete }: { onComplete: (profile: Partial<UserProfile>) => void }) {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<Partial<UserProfile>>({})
  const [saving, setSaving] = useState(false)

  function set(key: keyof UserProfile, val: any) {
    setData(prev => ({ ...prev, [key]: val }))
  }

  function next() {
    if (step < STEPS.length - 1) setStep(s => s + 1)
    else finish()
  }

  function back() {
    if (step > 0) setStep(s => s - 1)
  }

  async function finish() {
    setSaving(true)
    await onComplete(data)
  }

  const canNext = () => {
    if (step === 0) return !!data.name?.trim()
    if (step === 1) return !!(data.age && data.gender && data.weight_kg && data.height_cm)
    if (step === 2) return !!data.goal
    if (step === 3) return !!data.experience
    if (step === 4) return !!(data.days_per_week && data.equipment)
    return true
  }

  const progress = ((step + 1) / STEPS.length) * 100

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.25rem' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>

        {/* Logo */}
        <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', letterSpacing: '3px', color: 'var(--text)' }}>GAINZONE</div>
          <div style={{ fontSize: '10px', color: 'var(--muted)', fontFamily: 'var(--font-display)', letterSpacing: '1px', marginTop: '4px' }}>PERSONALISED GYM COACH</div>
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ fontSize: '10px', fontFamily: 'var(--font-display)', color: 'var(--muted)', letterSpacing: '0.5px' }}>STEP {step + 1} OF {STEPS.length}</div>
            <div style={{ fontSize: '10px', fontFamily: 'var(--font-display)', color: 'var(--muted)' }}>{Math.round(progress)}%</div>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Step title */}
        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 500, marginBottom: '6px' }}>{STEPS[step].title}</div>
          <div style={{ fontSize: '13px', color: 'var(--muted)' }}>{STEPS[step].sub}</div>
        </div>

        {/* ── Step 0: Name ── */}
        {step === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              placeholder="Your name"
              value={data.name || ''}
              onChange={e => set('name', e.target.value)}
              onKeyDown={e => e.key === 'Enter' && canNext() && next()}
              autoFocus
              style={{ fontSize: '16px', padding: '14px' }}
            />
          </div>
        )}

        {/* ── Step 1: Body stats ── */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Gender */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {['Male', 'Female'].map(g => (
                <button key={g} onClick={() => set('gender', g.toLowerCase())}
                  style={{ padding: '12px', borderRadius: '6px', border: `1px solid ${data.gender === g.toLowerCase() ? 'var(--text)' : 'var(--border)'}`, background: data.gender === g.toLowerCase() ? 'rgba(255,255,255,0.08)' : 'transparent', color: data.gender === g.toLowerCase() ? 'var(--text)' : 'var(--muted)', cursor: 'pointer', fontFamily: 'var(--font-display)', fontSize: '12px', letterSpacing: '0.5px', transition: 'all 0.15s' }}>
                  {g}
                </button>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div>
                <div style={{ fontSize: '10px', fontFamily: 'var(--font-display)', color: 'var(--muted)', letterSpacing: '0.5px', marginBottom: '5px' }}>AGE</div>
                <input type="number" placeholder="25" value={data.age || ''} onChange={e => set('age', parseInt(e.target.value))} style={{ textAlign: 'center' }} />
              </div>
              <div>
                <div style={{ fontSize: '10px', fontFamily: 'var(--font-display)', color: 'var(--muted)', letterSpacing: '0.5px', marginBottom: '5px' }}>WEIGHT (kg)</div>
                <input type="number" placeholder="70" value={data.weight_kg || ''} onChange={e => set('weight_kg', parseFloat(e.target.value))} style={{ textAlign: 'center' }} />
              </div>
            </div>
            <div>
              <div style={{ fontSize: '10px', fontFamily: 'var(--font-display)', color: 'var(--muted)', letterSpacing: '0.5px', marginBottom: '5px' }}>HEIGHT (cm)</div>
              <input type="number" placeholder="175" value={data.height_cm || ''} onChange={e => set('height_cm', parseFloat(e.target.value))} style={{ textAlign: 'center' }} />
            </div>
          </div>
        )}

        {/* ── Step 2: Goal ── */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {GOALS.map(g => (
              <button key={g.id} onClick={() => set('goal', g.id)}
                style={{ padding: '14px 16px', borderRadius: '6px', border: `1px solid ${data.goal === g.id ? 'var(--text)' : 'var(--border)'}`, background: data.goal === g.id ? 'rgba(255,255,255,0.07)' : 'transparent', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.15s' }}>
                <span style={{ fontSize: '20px' }}>{g.icon}</span>
                <span style={{ fontSize: '14px', fontWeight: 500, color: data.goal === g.id ? 'var(--text)' : 'var(--muted)' }}>{g.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* ── Step 3: Experience ── */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {EXPERIENCE.map(e => (
              <button key={e.id} onClick={() => set('experience', e.id)}
                style={{ padding: '14px 16px', borderRadius: '6px', border: `1px solid ${data.experience === e.id ? 'var(--text)' : 'var(--border)'}`, background: data.experience === e.id ? 'rgba(255,255,255,0.07)' : 'transparent', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}>
                <div style={{ fontSize: '14px', fontWeight: 500, color: data.experience === e.id ? 'var(--text)' : 'var(--muted)', marginBottom: '2px' }}>{e.label}</div>
                <div style={{ fontSize: '11px', color: 'var(--muted)' }}>{e.sub}</div>
              </button>
            ))}
          </div>
        )}

        {/* ── Step 4: Schedule + Equipment ── */}
        {step === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '10px', fontFamily: 'var(--font-display)', color: 'var(--muted)', letterSpacing: '0.5px', marginBottom: '8px' }}>DAYS PER WEEK</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px' }}>
                {[3, 4, 5, 6, 7].map(d => (
                  <button key={d} onClick={() => set('days_per_week', d)}
                    style={{ padding: '10px 0', borderRadius: '6px', border: `1px solid ${data.days_per_week === d ? 'var(--text)' : 'var(--border)'}`, background: data.days_per_week === d ? 'rgba(255,255,255,0.08)' : 'transparent', color: data.days_per_week === d ? 'var(--text)' : 'var(--muted)', cursor: 'pointer', fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 500, transition: 'all 0.15s' }}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '10px', fontFamily: 'var(--font-display)', color: 'var(--muted)', letterSpacing: '0.5px', marginBottom: '8px' }}>EQUIPMENT ACCESS</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {EQUIPMENT.map(eq => (
                  <button key={eq.id} onClick={() => set('equipment', eq.id)}
                    style={{ padding: '12px 14px', borderRadius: '6px', border: `1px solid ${data.equipment === eq.id ? 'var(--text)' : 'var(--border)'}`, background: data.equipment === eq.id ? 'rgba(255,255,255,0.07)' : 'transparent', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}>
                    <div style={{ fontSize: '13px', fontWeight: 500, color: data.equipment === eq.id ? 'var(--text)' : 'var(--muted)', marginBottom: '2px' }}>{eq.label}</div>
                    <div style={{ fontSize: '11px', color: 'var(--muted)' }}>{eq.sub}</div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '10px', fontFamily: 'var(--font-display)', color: 'var(--muted)', letterSpacing: '0.5px', marginBottom: '5px' }}>ANY INJURIES? <span style={{ color: 'var(--muted2)' }}>(optional)</span></div>
              <input placeholder="e.g. lower back pain, bad knees..." value={data.injuries || ''} onChange={e => set('injuries', e.target.value)} />
            </div>
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '2rem' }}>
          {step > 0 && (
            <button className="btn-ghost" onClick={back} style={{ flex: '0 0 auto' }}>← Back</button>
          )}
          <button
            className="btn-primary"
            onClick={next}
            disabled={!canNext() || saving}
            style={{ flex: 1, padding: '14px' }}
          >
            {saving ? 'Saving...' : step === STEPS.length - 1 ? "Let's go →" : 'Next →'}
          </button>
        </div>

        {step === 0 && (
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button onClick={() => onComplete({})} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '12px', fontFamily: 'var(--font-display)' }}>
              Skip for now
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
