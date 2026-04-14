'use client'
import { useState, useRef, useCallback } from 'react'

type ScanResult = {
  identified: string
  category: string
  confidence: string
  description: string
  primaryMuscles: string[]
  howToUse: string[]
  formTips: string[]
  commonMistakes: string[]
  difficulty: string
  formFeedback: string
  personalizedTip: string
}

const CATEGORY_ICONS: Record<string, string> = {
  machine: '🏋️',
  exercise: '💪',
  form_check: '✅',
  equipment: '⚙️',
  unknown: '🔍',
}

export default function GymScanner({ profile }: { profile?: any }) {
  const [image, setImage] = useState<string | null>(null)
  const [result, setResult] = useState<ScanResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mode, setMode] = useState<'idle' | 'preview' | 'result'>('idle')
  const fileRef = useRef<HTMLInputElement>(null)
  const cameraRef = useRef<HTMLInputElement>(null)

  const buildUserContext = () => {
    if (!profile?.name) return ''
    return [
      profile.name && `Name: ${profile.name}`,
      profile.experience && `Experience: ${profile.experience}`,
      profile.goal && `Goal: ${profile.goal}`,
      profile.equipment && `Equipment: ${profile.equipment}`,
      profile.injuries && `Injuries: ${profile.injuries}`,
    ].filter(Boolean).join(' | ')
  }

  const handleImage = useCallback((file: File) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string
      setImage(dataUrl)
      setResult(null)
      setError('')
      setMode('preview')
    }
    reader.readAsDataURL(file)
  }, [])

  async function analyze() {
    if (!image) return
    setLoading(true)
    setError('')

    try {
      // Strip data URL prefix to get raw base64
      const base64 = image.split(',')[1]
      const res = await fetch('/api/scan-exercise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64,
          userContext: buildUserContext()
        })
      })

      const data = await res.json()
      if (data.error) {
        setError(data.error)
      } else {
        setResult(data)
        setMode('result')
      }
    } catch {
      setError('Failed to analyze. Check your connection and try again.')
    }
    setLoading(false)
  }

  function reset() {
    setImage(null)
    setResult(null)
    setError('')
    setMode('idle')
  }

  const confidenceColor = (c: string) => c === 'high' ? '#aaa' : c === 'medium' ? '#777' : '#555'

  return (
    <div className="slide-up">
      {/* Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div className="page-title">GYM SCANNER</div>
        <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '8px', fontFamily: 'var(--font-display)', letterSpacing: '0.3px' }}>
          Point camera at any machine or exercise
        </div>
      </div>

      {/* ── IDLE STATE ── */}
      {mode === 'idle' && (
        <div>
          {/* Big scan button */}
          <div
            onClick={() => cameraRef.current?.click()}
            style={{
              border: '1px dashed rgba(255,255,255,0.15)',
              borderRadius: '12px',
              padding: '3rem 2rem',
              textAlign: 'center',
              cursor: 'pointer',
              marginBottom: '16px',
              transition: 'all 0.15s',
              background: 'var(--surface)',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
          >
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📸</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 500, marginBottom: '6px' }}>Take a Photo</div>
            <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Use your camera to scan any gym machine or exercise</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            <div style={{ fontSize: '10px', color: 'var(--muted)', fontFamily: 'var(--font-display)' }}>OR</div>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          </div>

          <button className="btn-ghost" style={{ width: '100%', padding: '12px' }} onClick={() => fileRef.current?.click()}>
            Upload from gallery
          </button>

          {/* What it can do */}
          <div style={{ marginTop: '2rem' }}>
            <div style={{ fontSize: '10px', fontFamily: 'var(--font-display)', color: 'var(--muted)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>What it identifies</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {[
                { icon: '🏋️', label: 'Gym Machines', sub: 'Name, muscles, how to use' },
                { icon: '💪', label: 'Exercises', sub: 'Form tips & technique' },
                { icon: '✅', label: 'Form Check', sub: 'Real-time feedback' },
                { icon: '⚙️', label: 'Equipment', sub: 'Cables, barbells, DBs' },
              ].map(item => (
                <div key={item.label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px' }}>
                  <div style={{ fontSize: '20px', marginBottom: '6px' }}>{item.icon}</div>
                  <div style={{ fontSize: '12px', fontWeight: 500, marginBottom: '2px' }}>{item.label}</div>
                  <div style={{ fontSize: '10px', color: 'var(--muted)' }}>{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── PREVIEW STATE ── */}
      {mode === 'preview' && image && (
        <div>
          <img
            src={image}
            alt="Preview"
            style={{ width: '100%', borderRadius: '10px', border: '1px solid var(--border)', marginBottom: '16px', maxHeight: '350px', objectFit: 'cover' }}
          />
          {error && (
            <div style={{ background: 'rgba(255,80,80,0.08)', border: '1px solid rgba(255,80,80,0.2)', borderRadius: '6px', padding: '12px', marginBottom: '12px', fontSize: '13px', color: '#ff8080' }}>
              {error}
            </div>
          )}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn-ghost" onClick={reset} style={{ flex: '0 0 auto' }}>← Retake</button>
            <button className="btn-primary" onClick={analyze} disabled={loading} style={{ flex: 1, padding: '14px' }}>
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <span className="pulse">●</span> Analysing...
                </span>
              ) : 'Identify →'}
            </button>
          </div>
        </div>
      )}

      {/* ── RESULT STATE ── */}
      {mode === 'result' && result && (
        <div>
          {/* Image thumbnail + title */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
            {image && (
              <img src={image} alt="Scanned" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border)', flexShrink: 0 }} />
            )}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '18px' }}>{CATEGORY_ICONS[result.category] || '🔍'}</span>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 500 }}>{result.identified}</div>
              </div>
              <div style={{ fontSize: '12px', color: '#888', lineHeight: 1.5, marginBottom: '6px' }}>{result.description}</div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <span className="badge">{result.difficulty}</span>
                <span style={{ fontSize: '10px', fontFamily: 'var(--font-display)', color: confidenceColor(result.confidence), border: '1px solid var(--border)', padding: '2px 8px', borderRadius: '3px' }}>
                  {result.confidence} confidence
                </span>
              </div>
            </div>
          </div>

          {/* Primary muscles */}
          {result.primaryMuscles?.length > 0 && (
            <ResultSection title="Primary Muscles">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {result.primaryMuscles.map((m, i) => (
                  <span key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '3px', padding: '3px 10px', fontSize: '11px', color: '#aaa', fontFamily: 'var(--font-display)' }}>{m}</span>
                ))}
              </div>
            </ResultSection>
          )}

          {/* Form feedback (if someone is exercising) */}
          {result.formFeedback && (
            <ResultSection title="Form Feedback">
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderLeft: '2px solid var(--text)', borderRadius: '0 6px 6px 0', padding: '12px' }}>
                <div style={{ fontSize: '13px', color: '#999', lineHeight: 1.7 }}>{result.formFeedback}</div>
              </div>
            </ResultSection>
          )}

          {/* How to use */}
          {result.howToUse?.length > 0 && (
            <ResultSection title="How to Use">
              {result.howToUse.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ width: '20px', height: '20px', background: 'var(--text)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 700, color: 'var(--bg)', flexShrink: 0, fontFamily: 'var(--font-display)' }}>{i + 1}</div>
                  <div style={{ fontSize: '12px', color: '#999', lineHeight: 1.6 }}>{step}</div>
                </div>
              ))}
            </ResultSection>
          )}

          {/* Form tips */}
          {result.formTips?.length > 0 && (
            <ResultSection title="Form Tips">
              {result.formTips.map((tip, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', padding: '6px 0', fontSize: '12px', color: '#999', lineHeight: 1.6 }}>
                  <span style={{ color: 'var(--muted)', flexShrink: 0 }}>→</span>
                  {tip}
                </div>
              ))}
            </ResultSection>
          )}

          {/* Common mistakes */}
          {result.commonMistakes?.length > 0 && (
            <ResultSection title="Common Mistakes">
              {result.commonMistakes.map((m, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', padding: '6px 0', fontSize: '12px', color: '#999', lineHeight: 1.6 }}>
                  <span style={{ color: 'var(--muted)', flexShrink: 0 }}>✕</span>
                  {m}
                </div>
              ))}
            </ResultSection>
          )}

          {/* Personalised tip */}
          {result.personalizedTip && (
            <div style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '8px', padding: '14px', marginTop: '1rem' }}>
              <div style={{ fontSize: '9px', fontFamily: 'var(--font-display)', color: 'var(--muted)', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '6px' }}>
                {profile?.name ? `Tip for ${profile.name}` : 'Pro Tip'}
              </div>
              <div style={{ fontSize: '13px', color: '#aaa', lineHeight: 1.7 }}>{result.personalizedTip}</div>
            </div>
          )}

          {/* Scan again */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '1.5rem', marginBottom: '2rem' }}>
            <button className="btn-ghost" onClick={reset} style={{ flex: 1 }}>Scan Again</button>
            <button className="btn-ghost" onClick={() => { setMode('preview'); setResult(null) }} style={{ flex: 1 }}>Retake Photo</button>
          </div>
        </div>
      )}

      {/* Hidden file inputs */}
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: 'none' }}
        onChange={e => e.target.files?.[0] && handleImage(e.target.files[0])}
      />
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={e => e.target.files?.[0] && handleImage(e.target.files[0])}
      />
    </div>
  )
}

function ResultSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <div style={{ fontSize: '10px', fontFamily: 'var(--font-display)', color: 'var(--muted)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>{title}</div>
      {children}
    </div>
  )
}
