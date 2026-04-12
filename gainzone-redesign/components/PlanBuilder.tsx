'use client'
import { useState } from 'react'

type FormData = {
  name: string
  age: string
  weight: string
  height: string
  gender: string
  experience: string
  goal: string
  trainingType: string
  activityLevel: string
}

const GOALS = [
  { id: 'fat_loss', label: 'Fat Loss', emoji: '🔥' },
  { id: 'muscle_gain', label: 'Muscle Gain', emoji: '💪' },
  { id: 'athletic', label: 'Athletic Performance', emoji: '⚡' },
  { id: 'physique', label: 'Competition Physique', emoji: '🏆' },
  { id: 'strength', label: 'Raw Strength', emoji: '🏋️' },
  { id: 'endurance', label: 'Endurance', emoji: '🏃' },
]

const EXPERIENCE = [
  { id: 'beginner', label: 'Beginner', sub: '0–6 months' },
  { id: 'intermediate', label: 'Intermediate', sub: '6 months – 2 years' },
  { id: 'advanced', label: 'Advanced', sub: '2+ years' },
]

const TRAINING_TYPES = [
  { id: 'gym', label: 'Gym / Weights', emoji: '🏋️' },
  { id: 'calisthenics', label: 'Calisthenics', emoji: '🤸' },
  { id: 'hybrid', label: 'Hybrid (Both)', emoji: '⚡' },
]

export default function PlanBuilder() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>({
    name: '', age: '', weight: '', height: '', gender: 'male',
    experience: 'intermediate', goal: '', trainingType: 'gym', activityLevel: 'moderate'
  })
  const [plan, setPlan] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function update(k: keyof FormData, v: string) {
    setForm(prev => ({ ...prev, [k]: v }))
  }

  async function generatePlan() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setPlan(data.plan)
      setStep(4)
    } catch (e: any) {
      setError(e.message || 'Failed to generate plan. Check GROQ_API_KEY.')
    }
    setLoading(false)
  }

  if (step === 4 && plan) return <PlanDisplay plan={plan} form={form} onReset={() => { setStep(1); setPlan(null) }} />

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <div className="font-display" style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '1px' }}>AI PLAN BUILDER</div>
        <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>Powered by Groq · Personalized workout + diet plan</div>
      </div>

      {/* Step indicator */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '2rem', alignItems: 'center' }}>
        {['Body Stats', 'Your Goal', 'Training Type', 'Your Plan'].map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{
              width: '26px', height: '26px', borderRadius: '50%',
              background: step > i + 1 ? 'var(--accent)' : step === i + 1 ? '#1a3010' : '#1a1a1a',
              border: step === i + 1 ? '2px solid var(--accent)' : '1px solid #2a2a2a',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '11px', fontWeight: 600,
              color: step > i + 1 ? '#0a0a0a' : step === i + 1 ? 'var(--accent)' : '#444'
            }}>{step > i + 1 ? '✓' : i + 1}</div>
            {i < 3 && <div style={{ width: '20px', height: '1px', background: step > i + 1 ? 'var(--accent)' : '#2a2a2a' }} />}
          </div>
        ))}
      </div>

      {/* Step 1: Body Stats */}
      {step === 1 && (
        <div className="slide-up">
          <div style={{ fontSize: '18px', fontWeight: 500, marginBottom: '1.5rem' }}>Tell us about yourself</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '1rem' }}>
            <div>
              <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '6px' }}>Your Name</label>
              <input placeholder="e.g. Vishu" value={form.name} onChange={e => update('name', e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '6px' }}>Age</label>
              <input type="number" placeholder="e.g. 24" value={form.age} onChange={e => update('age', e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '6px' }}>Weight (kg)</label>
              <input type="number" placeholder="e.g. 72" value={form.weight} onChange={e => update('weight', e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '6px' }}>Height (cm)</label>
              <input type="number" placeholder="e.g. 175" value={form.height} onChange={e => update('height', e.target.value)} />
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '8px' }}>Gender</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              {['male', 'female'].map(g => (
                <button key={g} onClick={() => update('gender', g)} style={{
                  flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid',
                  borderColor: form.gender === g ? 'var(--accent)' : '#2a2a2a',
                  background: form.gender === g ? '#1a3010' : '#111',
                  color: form.gender === g ? 'var(--accent)' : '#888',
                  cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '13px', textTransform: 'capitalize'
                }}>{g === 'male' ? '♂ Male' : '♀ Female'}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '8px' }}>Gym Experience</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {EXPERIENCE.map(e => (
                <button key={e.id} onClick={() => update('experience', e.id)} style={{
                  padding: '12px 14px', borderRadius: '8px', border: '1px solid',
                  borderColor: form.experience === e.id ? 'var(--accent)' : '#2a2a2a',
                  background: form.experience === e.id ? '#1a3010' : '#111',
                  cursor: 'pointer', fontFamily: 'var(--font-body)', textAlign: 'left'
                }}>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: form.experience === e.id ? 'var(--accent)' : '#f0f0f0' }}>{e.label}</div>
                  <div style={{ fontSize: '11px', color: '#555' }}>{e.sub}</div>
                </button>
              ))}
            </div>
          </div>
          <button className="btn-primary" style={{ width: '100%', padding: '12px' }}
            disabled={!form.weight || !form.height || !form.age}
            onClick={() => setStep(2)}>Continue →</button>
        </div>
      )}

      {/* Step 2: Goal */}
      {step === 2 && (
        <div className="slide-up">
          <div style={{ fontSize: '18px', fontWeight: 500, marginBottom: '1.5rem' }}>What's your goal?</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '1.5rem' }}>
            {GOALS.map(g => (
              <button key={g.id} onClick={() => update('goal', g.id)} style={{
                padding: '16px 12px', borderRadius: '10px', border: '1px solid',
                borderColor: form.goal === g.id ? 'var(--accent)' : '#2a2a2a',
                background: form.goal === g.id ? '#1a3010' : '#111',
                cursor: 'pointer', fontFamily: 'var(--font-body)', textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '6px' }}>{g.emoji}</div>
                <div style={{ fontSize: '12px', fontWeight: 500, color: form.goal === g.id ? 'var(--accent)' : '#ccc' }}>{g.label}</div>
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn-ghost" style={{ flex: 1, padding: '12px' }} onClick={() => setStep(1)}>← Back</button>
            <button className="btn-primary" style={{ flex: 2, padding: '12px' }} disabled={!form.goal} onClick={() => setStep(3)}>Continue →</button>
          </div>
        </div>
      )}

      {/* Step 3: Training type */}
      {step === 3 && (
        <div className="slide-up">
          <div style={{ fontSize: '18px', fontWeight: 500, marginBottom: '1.5rem' }}>How do you want to train?</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1.5rem' }}>
            {TRAINING_TYPES.map(t => (
              <button key={t.id} onClick={() => update('trainingType', t.id)} style={{
                padding: '16px', borderRadius: '10px', border: '1px solid',
                borderColor: form.trainingType === t.id ? 'var(--accent)' : '#2a2a2a',
                background: form.trainingType === t.id ? '#1a3010' : '#111',
                cursor: 'pointer', fontFamily: 'var(--font-body)', textAlign: 'left',
                display: 'flex', alignItems: 'center', gap: '14px'
              }}>
                <span style={{ fontSize: '28px' }}>{t.emoji}</span>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: form.trainingType === t.id ? 'var(--accent)' : '#f0f0f0' }}>{t.label}</div>
                  <div style={{ fontSize: '12px', color: '#555' }}>
                    {t.id === 'gym' ? 'Barbells, dumbbells, machines' :
                     t.id === 'calisthenics' ? 'Pull-ups, dips, push-ups, bodyweight skills' :
                     'Mix of weighted and bodyweight movements'}
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '8px' }}>Daily Activity Level (outside gym)</label>
            <select value={form.activityLevel} onChange={e => update('activityLevel', e.target.value)}>
              <option value="sedentary">Sedentary (desk job, little movement)</option>
              <option value="light">Lightly Active (some walking)</option>
              <option value="moderate">Moderately Active (on feet often)</option>
              <option value="very_active">Very Active (physical job or sports)</option>
            </select>
          </div>
          {error && <div style={{ color: '#f0957b', fontSize: '13px', marginBottom: '12px', background: '#2a1a14', padding: '10px', borderRadius: '8px' }}>{error}</div>}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn-ghost" style={{ flex: 1, padding: '12px' }} onClick={() => setStep(2)}>← Back</button>
            <button className="btn-primary" style={{ flex: 2, padding: '12px' }} onClick={generatePlan} disabled={loading}>
              {loading ? '🤖 Generating your plan...' : '✨ Generate My Plan'}
            </button>
          </div>
          {loading && (
            <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '12px', color: '#666' }}>
              Groq AI is building your personalized plan · Takes ~10 seconds
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function PlanDisplay({ plan, form, onReset }: { plan: any, form: FormData, onReset: () => void }) {
  const [activeSection, setActiveSection] = useState<'workout' | 'diet' | 'intensity'>('workout')
  const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  const macroTotal = (plan.dietPlan?.protein_g || 0) * 4 + (plan.dietPlan?.carbs_g || 0) * 4 + (plan.dietPlan?.fats_g || 0) * 9

  return (
    <div className="slide-up">
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--accent)', marginBottom: '4px', fontWeight: 500 }}>AI GENERATED PLAN</div>
            <div className="font-display" style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '0.5px', lineHeight: 1.1 }}>
              {form.name ? `${form.name}'s Plan` : 'Your Plan'}
            </div>
            <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>{plan.phase} · {plan.duration}</div>
          </div>
          <button className="btn-ghost" onClick={onReset} style={{ fontSize: '11px' }}>Redo →</button>
        </div>
      </div>

      {/* Summary */}
      <div style={{ background: '#0f1a0a', border: '1px solid #1e3010', borderRadius: '10px', padding: '14px', marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '13px', color: '#aac97a', lineHeight: 1.7 }}>{plan.summary}</div>
      </div>

      {/* Stats row */}
      <div className="stat-grid" style={{ marginBottom: '1.25rem' }}>
        <div className="stat-box">
          <div className="stat-val">{plan.dietPlan?.dailyCalories || '—'}</div>
          <div className="stat-lbl">kcal/day</div>
        </div>
        <div className="stat-box">
          <div className="stat-val">{plan.dietPlan?.protein_g || '—'}g</div>
          <div className="stat-lbl">protein/day</div>
        </div>
        <div className="stat-box">
          <div className="stat-val">{plan.weeklyVolume || '—'}</div>
          <div className="stat-lbl">sessions/wk</div>
        </div>
      </div>

      {/* Section tabs */}
      <div className="tab-bar" style={{ marginBottom: '1.25rem' }}>
        <button className={`tab-item ${activeSection === 'workout' ? 'active' : ''}`} onClick={() => setActiveSection('workout')}>Workout Plan</button>
        <button className={`tab-item ${activeSection === 'diet' ? 'active' : ''}`} onClick={() => setActiveSection('diet')}>Diet Plan</button>
        <button className={`tab-item ${activeSection === 'intensity' ? 'active' : ''}`} onClick={() => setActiveSection('intensity')}>Intensity</button>
      </div>

      {/* Workout Plan */}
      {activeSection === 'workout' && (
        <div>
          {DAYS.map(day => {
            const d = plan.workoutPlan?.[day]
            if (!d) return null
            const isRest = !d.exercises || d.exercises.length === 0
            return (
              <div key={day} className="card" style={{ marginBottom: '10px', padding: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: isRest ? 0 : '10px' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: '#555', textTransform: 'uppercase' }}>{day}</div>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: isRest ? '#444' : '#f0f0f0' }}>{d.name}</div>
                  </div>
                  {isRest && <span style={{ fontSize: '11px', color: '#444', fontStyle: 'italic' }}>rest</span>}
                </div>
                {!isRest && d.exercises?.map((ex: any, i: number) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderTop: '1px solid #1a1a1a' }}>
                    <div style={{ fontSize: '13px', color: '#ccc' }}>{ex.name}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>{ex.sets}×{ex.reps} · {ex.rest}</div>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      )}

      {/* Diet Plan */}
      {activeSection === 'diet' && plan.dietPlan && (
        <div>
          {/* Macros */}
          <div className="card" style={{ padding: '14px', marginBottom: '12px' }}>
            <div style={{ fontSize: '11px', color: '#555', marginBottom: '12px' }}>DAILY MACROS</div>
            {[
              { label: 'Protein', val: plan.dietPlan.protein_g, unit: 'g', pct: Math.round((plan.dietPlan.protein_g * 4 / macroTotal) * 100), color: '#6ab4f5' },
              { label: 'Carbs', val: plan.dietPlan.carbs_g, unit: 'g', pct: Math.round((plan.dietPlan.carbs_g * 4 / macroTotal) * 100), color: 'var(--accent)' },
              { label: 'Fats', val: plan.dietPlan.fats_g, unit: 'g', pct: Math.round((plan.dietPlan.fats_g * 9 / macroTotal) * 100), color: '#e8a84c' },
            ].map(m => (
              <div key={m.label} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ color: '#888' }}>{m.label}</span>
                  <span style={{ color: '#f0f0f0', fontWeight: 500 }}>{m.val}{m.unit} ({m.pct}%)</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${m.pct}%`, background: m.color }} />
                </div>
              </div>
            ))}
          </div>

          {/* Meals */}
          {plan.dietPlan.meals?.map((meal: any, i: number) => (
            <div key={i} className="card" style={{ padding: '12px 14px', marginBottom: '8px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: '6px', padding: '6px 10px', minWidth: '70px', textAlign: 'center', flexShrink: 0 }}>
                <div style={{ fontSize: '10px', color: '#555' }}>{meal.time}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: 500, marginBottom: '2px' }}>{meal.name}</div>
                <div style={{ fontSize: '12px', color: '#666', lineHeight: 1.5 }}>{meal.description}</div>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 500, flexShrink: 0 }}>{meal.calories} kcal</div>
            </div>
          ))}

          {/* Hydration & Supplements */}
          <div className="card" style={{ padding: '14px', marginTop: '10px' }}>
            <div style={{ fontSize: '12px', color: '#6ab4f5', marginBottom: '6px' }}>💧 Hydration: <span style={{ color: '#ccc' }}>{plan.dietPlan.hydration}</span></div>
            <div style={{ fontSize: '12px', color: '#888', marginBottom: '6px' }}>Supplements:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {plan.dietPlan.supplements?.map((s: string, i: number) => (
                <span key={i} style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '20px', padding: '3px 10px', fontSize: '12px', color: '#ccc' }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Intensity */}
      {activeSection === 'intensity' && plan.intensityGuidelines && (
        <div>
          {[
            { label: 'Week 1', val: plan.intensityGuidelines.weekOne },
            { label: 'Progression', val: plan.intensityGuidelines.progression },
            { label: 'Deload Protocol', val: plan.intensityGuidelines.deloadWeek },
          ].map((item, i) => (
            <div key={i} className="card" style={{ padding: '14px', marginBottom: '10px' }}>
              <div style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 500, marginBottom: '6px' }}>{item.label.toUpperCase()}</div>
              <div style={{ fontSize: '13px', color: '#ccc', lineHeight: 1.7 }}>{item.val}</div>
            </div>
          ))}
          {/* Key tips */}
          <div style={{ fontSize: '11px', color: '#555', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', marginTop: '1rem' }}>Key Tips</div>
          {plan.keyTips?.map((tip: string, i: number) => (
            <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <div style={{ width: '6px', height: '6px', background: 'var(--accent)', borderRadius: '50%', flexShrink: 0, marginTop: '6px' }} />
              <div style={{ fontSize: '13px', color: '#ccc', lineHeight: 1.6 }}>{tip}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
