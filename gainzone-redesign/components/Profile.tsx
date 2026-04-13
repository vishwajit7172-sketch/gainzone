'use client'
import { useState } from 'react'
import { useProfile, type UserProfile } from '@/lib/useProfile'

const GOALS = ['muscle', 'fat_loss', 'strength', 'endurance', 'recomp']
const GOAL_LABELS: Record<string, string> = { muscle: 'Build Muscle', fat_loss: 'Lose Fat', strength: 'Get Stronger', endurance: 'Build Endurance', recomp: 'Body Recomp' }
const EXP = ['beginner', 'intermediate', 'advanced']
const EQUIP = ['full_gym', 'dumbbells', 'bodyweight']
const EQUIP_LABELS: Record<string, string> = { full_gym: 'Full Gym', dumbbells: 'Dumbbells Only', bodyweight: 'Bodyweight' }

export default function Profile() {
  const { profile, saveProfile } = useProfile()
  const [form, setForm] = useState<Partial<UserProfile>>(profile || {})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  function set(key: keyof UserProfile, val: any) {
    setForm(prev => ({ ...prev, [key]: val }))
  }

  async function handleSave() {
    setSaving(true)
    await saveProfile(form)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="slide-up">
      <div style={{ marginBottom: '1.75rem' }}>
        <div className="page-title">PROFILE</div>
        <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '8px', fontFamily: 'var(--font-display)' }}>
          Your info personalises all AI responses
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

        {/* Basic info */}
        <Section title="Basic Info">
          <Field label="Name">
            <input value={form.name || ''} onChange={e => set('name', e.target.value)} placeholder="Your name" />
          </Field>
          <TwoCol>
            <Field label="Age">
              <input type="number" value={form.age || ''} onChange={e => set('age', parseInt(e.target.value))} placeholder="25" style={{ textAlign: 'center' }} />
            </Field>
            <Field label="Gender">
              <select value={form.gender || ''} onChange={e => set('gender', e.target.value)}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </Field>
          </TwoCol>
          <TwoCol>
            <Field label="Weight (kg)">
              <input type="number" value={form.weight_kg || ''} onChange={e => set('weight_kg', parseFloat(e.target.value))} placeholder="70" style={{ textAlign: 'center' }} />
            </Field>
            <Field label="Height (cm)">
              <input type="number" value={form.height_cm || ''} onChange={e => set('height_cm', parseFloat(e.target.value))} placeholder="175" style={{ textAlign: 'center' }} />
            </Field>
          </TwoCol>
        </Section>

        {/* Goal */}
        <Section title="Goal">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {GOALS.map(g => (
              <button key={g} onClick={() => set('goal', g)}
                style={{ padding: '11px 14px', borderRadius: '6px', border: `1px solid ${form.goal === g ? 'var(--text)' : 'var(--border)'}`, background: form.goal === g ? 'rgba(255,255,255,0.07)' : 'transparent', cursor: 'pointer', textAlign: 'left', color: form.goal === g ? 'var(--text)' : 'var(--muted)', fontSize: '13px', fontWeight: 500, transition: 'all 0.15s' }}>
                {GOAL_LABELS[g]}
              </button>
            ))}
          </div>
        </Section>

        {/* Experience */}
        <Section title="Experience Level">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '6px' }}>
            {EXP.map(e => (
              <button key={e} onClick={() => set('experience', e)}
                style={{ padding: '10px 6px', borderRadius: '6px', border: `1px solid ${form.experience === e ? 'var(--text)' : 'var(--border)'}`, background: form.experience === e ? 'rgba(255,255,255,0.07)' : 'transparent', cursor: 'pointer', color: form.experience === e ? 'var(--text)' : 'var(--muted)', fontFamily: 'var(--font-display)', fontSize: '10px', letterSpacing: '0.3px', textTransform: 'capitalize', transition: 'all 0.15s' }}>
                {e}
              </button>
            ))}
          </div>
        </Section>

        {/* Schedule */}
        <Section title="Training Schedule">
          <Field label="Days per week">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '6px' }}>
              {[3,4,5,6,7].map(d => (
                <button key={d} onClick={() => set('days_per_week', d)}
                  style={{ padding: '10px 0', borderRadius: '6px', border: `1px solid ${form.days_per_week === d ? 'var(--text)' : 'var(--border)'}`, background: form.days_per_week === d ? 'rgba(255,255,255,0.08)' : 'transparent', color: form.days_per_week === d ? 'var(--text)' : 'var(--muted)', cursor: 'pointer', fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 500, transition: 'all 0.15s' }}>
                  {d}
                </button>
              ))}
            </div>
          </Field>
        </Section>

        {/* Equipment */}
        <Section title="Equipment Access">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {EQUIP.map(eq => (
              <button key={eq} onClick={() => set('equipment', eq)}
                style={{ padding: '11px 14px', borderRadius: '6px', border: `1px solid ${form.equipment === eq ? 'var(--text)' : 'var(--border)'}`, background: form.equipment === eq ? 'rgba(255,255,255,0.07)' : 'transparent', cursor: 'pointer', textAlign: 'left', color: form.equipment === eq ? 'var(--text)' : 'var(--muted)', fontSize: '13px', fontWeight: 500, transition: 'all 0.15s' }}>
                {EQUIP_LABELS[eq]}
              </button>
            ))}
          </div>
        </Section>

        {/* Injuries */}
        <Section title="Injuries / Limitations">
          <input value={form.injuries || ''} onChange={e => set('injuries', e.target.value)} placeholder="e.g. lower back pain, bad knees... (optional)" />
        </Section>

        <button className="btn-primary" onClick={handleSave} disabled={saving} style={{ padding: '14px', marginBottom: '2rem' }}>
          {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save Profile'}
        </button>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontSize: '10px', fontFamily: 'var(--font-display)', color: 'var(--muted)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>{children}</div>
    </div>
  )
}

function Field({ label, children }: { label: string, children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontSize: '10px', fontFamily: 'var(--font-display)', color: 'var(--muted)', letterSpacing: '0.5px', marginBottom: '5px' }}>{label}</div>
      {children}
    </div>
  )
}

function TwoCol({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>{children}</div>
}
