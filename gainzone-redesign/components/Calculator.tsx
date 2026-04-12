'use client'
import { useState } from 'react'

const FAT_RANGES = {
  male: [
    { label: 'Essential Fat', min: 2, max: 5, color: '#6ab4f5' },
    { label: 'Athletic', min: 6, max: 13, color: 'var(--accent)' },
    { label: 'Fitness', min: 14, max: 17, color: '#7ec44e' },
    { label: 'Average', min: 18, max: 24, color: '#e8a84c' },
    { label: 'Obese', min: 25, max: 100, color: '#f0957b' },
  ],
  female: [
    { label: 'Essential Fat', min: 10, max: 13, color: '#6ab4f5' },
    { label: 'Athletic', min: 14, max: 20, color: 'var(--accent)' },
    { label: 'Fitness', min: 21, max: 24, color: '#7ec44e' },
    { label: 'Average', min: 25, max: 31, color: '#e8a84c' },
    { label: 'Obese', min: 32, max: 100, color: '#f0957b' },
  ]
}

export default function Calculator() {
  const [method, setMethod] = useState<'navy' | 'bmi'>('navy')
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [neck, setNeck] = useState('')
  const [waist, setWaist] = useState('')
  const [hip, setHip] = useState('')
  const [age, setAge] = useState('')
  const [result, setResult] = useState<{ bf: number; category: string; color: string; leanMass: number; fatMass: number; bmr: number } | null>(null)

  function calculate() {
    const h = parseFloat(height), w = parseFloat(weight), n = parseFloat(neck)
    const wa = parseFloat(waist), hi = parseFloat(hip), a = parseFloat(age)

    let bf = 0

    if (method === 'navy') {
      if (!h || !n || !wa || (gender === 'female' && !hi)) return
      if (gender === 'male') {
        bf = 495 / (1.0324 - 0.19077 * Math.log10(wa - n) + 0.15456 * Math.log10(h)) - 450
      } else {
        bf = 495 / (1.29579 - 0.35004 * Math.log10(wa + hi - n) + 0.22100 * Math.log10(h)) - 450
      }
    } else {
      if (!h || !w) return
      const bmi = w / ((h / 100) ** 2)
      bf = gender === 'male'
        ? (1.20 * bmi) + (0.23 * (a || 25)) - 16.2
        : (1.20 * bmi) + (0.23 * (a || 25)) - 5.4
    }

    bf = Math.max(2, Math.min(60, parseFloat(bf.toFixed(1))))

    const ranges = FAT_RANGES[gender]
    const cat = ranges.find(r => bf >= r.min && bf <= r.max) || ranges[ranges.length - 1]

    const wt = parseFloat(weight) || 70
    const fatMass = parseFloat((wt * bf / 100).toFixed(1))
    const leanMass = parseFloat((wt - fatMass).toFixed(1))

    // Mifflin-St Jeor BMR
    const ht = h || 170, ag = a || 25
    const bmr = gender === 'male'
      ? Math.round(10 * wt + 6.25 * ht - 5 * ag + 5)
      : Math.round(10 * wt + 6.25 * ht - 5 * ag - 161)

    setResult({ bf, category: cat.label, color: cat.color, leanMass, fatMass, bmr })
  }

  return (
    <div>
      <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '1.5rem' }}>Body Fat Calculator</div>

      {/* Method toggle */}
      <div className="tab-bar" style={{ marginBottom: '1.25rem', maxWidth: '300px' }}>
        <button className={`tab-item ${method === 'navy' ? 'active' : ''}`} onClick={() => { setMethod('navy'); setResult(null) }}>Navy Method</button>
        <button className={`tab-item ${method === 'bmi' ? 'active' : ''}`} onClick={() => { setMethod('bmi'); setResult(null) }}>BMI Method</button>
      </div>

      {/* Gender */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
        {(['male', 'female'] as const).map(g => (
          <button key={g} onClick={() => { setGender(g); setResult(null) }} style={{
            flex: 1, padding: '10px', borderRadius: '8px',
            border: `1px solid ${gender === g ? 'var(--accent)' : '#2a2a2a'}`,
            background: gender === g ? '#1a3010' : '#111',
            color: gender === g ? 'var(--accent)' : '#888',
            cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '13px'
          }}>{g === 'male' ? '♂ Male' : '♀ Female'}</button>
        ))}
      </div>

      {/* Inputs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '1rem' }}>
        <div>
          <label style={{ fontSize: '11px', color: '#555', display: 'block', marginBottom: '5px' }}>Height (cm)</label>
          <input type="number" placeholder="175" value={height} onChange={e => setHeight(e.target.value)} />
        </div>
        <div>
          <label style={{ fontSize: '11px', color: '#555', display: 'block', marginBottom: '5px' }}>Weight (kg)</label>
          <input type="number" placeholder="72" value={weight} onChange={e => setWeight(e.target.value)} />
        </div>
        {method === 'navy' && (
          <>
            <div>
              <label style={{ fontSize: '11px', color: '#555', display: 'block', marginBottom: '5px' }}>Neck circumference (cm)</label>
              <input type="number" placeholder="38" value={neck} onChange={e => setNeck(e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#555', display: 'block', marginBottom: '5px' }}>Waist circumference (cm)</label>
              <input type="number" placeholder="82" value={waist} onChange={e => setWaist(e.target.value)} />
            </div>
            {gender === 'female' && (
              <div>
                <label style={{ fontSize: '11px', color: '#555', display: 'block', marginBottom: '5px' }}>Hip circumference (cm)</label>
                <input type="number" placeholder="95" value={hip} onChange={e => setHip(e.target.value)} />
              </div>
            )}
          </>
        )}
        {method === 'bmi' && (
          <div>
            <label style={{ fontSize: '11px', color: '#555', display: 'block', marginBottom: '5px' }}>Age</label>
            <input type="number" placeholder="25" value={age} onChange={e => setAge(e.target.value)} />
          </div>
        )}
      </div>

      <button className="btn-primary" style={{ width: '100%', padding: '12px', marginBottom: '1.5rem' }} onClick={calculate}>
        Calculate Body Fat %
      </button>

      {/* Result */}
      {result && (
        <div className="slide-up">
          <div className="card" style={{ padding: '20px', marginBottom: '1rem', textAlign: 'center', borderColor: result.color }}>
            <div style={{ fontSize: '11px', color: '#555', marginBottom: '8px' }}>ESTIMATED BODY FAT</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '64px', fontWeight: 900, color: result.color, lineHeight: 1 }}>
              {result.bf}%
            </div>
            <div style={{ fontSize: '14px', fontWeight: 500, marginTop: '8px', color: result.color }}>{result.category}</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '1rem' }}>
            <div className="stat-box" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: 700, color: '#f0f0f0', fontFamily: 'var(--font-display)' }}>{result.fatMass}kg</div>
              <div className="stat-lbl">Fat mass</div>
            </div>
            <div className="stat-box" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>{result.leanMass}kg</div>
              <div className="stat-lbl">Lean mass</div>
            </div>
            <div className="stat-box" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: 700, color: '#6ab4f5', fontFamily: 'var(--font-display)' }}>{result.bmr}</div>
              <div className="stat-lbl">BMR (kcal)</div>
            </div>
          </div>

          {/* Category chart */}
          <div className="card" style={{ padding: '14px' }}>
            <div style={{ fontSize: '11px', color: '#555', marginBottom: '12px' }}>CATEGORY RANGES</div>
            {FAT_RANGES[gender].map((r, i) => (
              <div key={i} style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '3px' }}>
                  <span style={{ color: r.label === result.category ? r.color : '#666', fontWeight: r.label === result.category ? 600 : 400 }}>
                    {r.label === result.category ? '▸ ' : ''}{r.label}
                  </span>
                  <span style={{ color: '#555' }}>{r.min}–{r.max === 100 ? '35+' : r.max}%</span>
                </div>
                <div className="progress-track">
                  <div style={{
                    height: '100%', background: r.color, borderRadius: '4px',
                    width: `${Math.min(100, Math.max(0, ((Math.min(result.bf, r.max) - r.min) / (r.max - r.min)) * 100))}%`,
                    opacity: r.label === result.category ? 1 : 0.3,
                    transition: 'width 0.5s ease'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
