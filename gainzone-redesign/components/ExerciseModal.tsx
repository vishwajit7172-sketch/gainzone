'use client'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { type Exercise } from '@/lib/exercises'
import { exerciseAnimations } from './ExerciseAnimations'

export function ExerciseModal({
  selected,
  gifMap,
  onClose,
}: {
  selected: Exercise
  gifMap: Record<string, string>
  onClose: () => void
}) {
  const [tab, setTab] = useState<'guide' | 'ai'>('guide')
  const [aiTip, setAiTip] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [question, setQuestion] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  // Back button closes modal
  useEffect(() => {
    window.history.pushState({ modal: true }, '')
    const handlePop = () => onClose()
    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [onClose])

  // Prevent background scroll — iOS Safari safe
  useEffect(() => {
    const y = window.scrollY
    document.body.style.cssText = `position:fixed;top:-${y}px;left:0;right:0;overflow-y:scroll`
    return () => {
      document.body.style.cssText = ''
      window.scrollTo(0, y)
    }
  }, [])

  async function fetchAiTips(ex: Exercise, q?: string) {
    setAiLoading(true)
    setAiTip('')
    try {
      const res = await fetch('/api/ai-tips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exercise: ex.name, question: q || '', userContext: (window as any).__gainzoneProfile || '' })
      })
      const data = await res.json()
      setAiTip(data.tip || 'No tips available.')
    } catch { setAiTip('Could not load AI tips.') }
    setAiLoading(false)
  }

  const AnimComp = exerciseAnimations[selected.id] || null

  if (!mounted) return null

  const modal = (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: 'rgba(0,0,0,0.9)',
        backdropFilter: 'blur(6px)',
        overflowY: 'auto',
        overflowX: 'hidden',
        WebkitOverflowScrolling: 'touch' as any,
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '60px' }}>
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '0 0 12px 12px',
          width: '100%',
          maxWidth: '600px',
        }}>
          {/* Header */}
          <div style={{ background: 'var(--surface2)', padding: '1.25rem 1.5rem 1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <span className="badge" style={{ marginBottom: '6px', display: 'inline-block' }}>{selected.muscle}</span>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 500, lineHeight: 1.1 }}>{selected.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '3px', fontFamily: 'var(--font-display)' }}>{selected.muscles}</div>
              </div>
              <button
                onClick={onClose}
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--muted)', minWidth: '36px', height: '36px', borderRadius: '6px', cursor: 'pointer', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
              >×</button>
            </div>

            {/* GIF / Animation */}
            <div style={{ background: 'var(--bg)', borderRadius: '8px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', marginBottom: '1rem', overflow: 'hidden' }}>
              {gifMap[selected.id] ? (
                <img src={gifMap[selected.id]} alt={selected.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              ) : AnimComp ? <AnimComp /> : (
                <div style={{ color: 'var(--muted)', fontSize: '12px', fontFamily: 'var(--font-display)' }}>No animation</div>
              )}
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '6px' }}>
              {[{ label: 'Sets', val: selected.sets }, { label: 'Reps', val: selected.reps }, { label: 'Rest', val: '90s' }, { label: 'Type', val: selected.type }].map(s => (
                <div key={s.label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', padding: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '9px', color: 'var(--muted)', marginBottom: '3px', fontFamily: 'var(--font-display)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{s.label}</div>
                  <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'capitalize', fontFamily: 'var(--font-display)' }}>{s.val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div style={{ padding: '1rem 1.5rem 0' }}>
            <div className="tab-bar">
              <button className={`tab-item ${tab === 'guide' ? 'active' : ''}`} onClick={() => setTab('guide')}>Form Guide</button>
              <button className={`tab-item ${tab === 'ai' ? 'active' : ''}`} onClick={() => { setTab('ai'); if (!aiTip) fetchAiTips(selected) }}>AI Coach</button>
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: '1.25rem 1.5rem 2.5rem' }}>
            {tab === 'guide' && (
              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '1.25rem' }}>
                  {selected.cues.map((cue, i) => (
                    <span key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '3px', padding: '3px 10px', fontSize: '11px', color: '#aaa', fontFamily: 'var(--font-display)' }}>{cue}</span>
                  ))}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--muted)', fontFamily: 'var(--font-display)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>Steps</div>
                <div style={{ marginBottom: '1.25rem' }}>
                  {selected.steps.map((step, i) => (
                    <div key={i} style={{ display: 'flex', gap: '12px', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                      <div style={{ width: '22px', height: '22px', background: 'var(--text)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, color: 'var(--bg)', flexShrink: 0, fontFamily: 'var(--font-display)' }}>{i + 1}</div>
                      <div style={{ fontSize: '13px', color: '#999', lineHeight: 1.7 }}>{step}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderLeft: '2px solid var(--text)', borderRadius: '0 6px 6px 0', padding: '12px' }}>
                  <div style={{ fontSize: '9px', color: 'var(--muted)', fontFamily: 'var(--font-display)', marginBottom: '5px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Pro Tip</div>
                  <div style={{ fontSize: '12px', color: '#888', lineHeight: 1.7 }}>{selected.tip}</div>
                </div>
              </div>
            )}

            {tab === 'ai' && (
              <div>
                <div className="ai-bubble" style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-display)' }}>AI Coach</div>
                    <button className="btn-ghost" style={{ fontSize: '10px', padding: '4px 10px' }} onClick={() => fetchAiTips(selected)} disabled={aiLoading}>{aiLoading ? '...' : 'Refresh'}</button>
                  </div>
                  {aiLoading ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div className="skeleton" style={{ height: '12px', width: '100%' }} />
                      <div className="skeleton" style={{ height: '12px', width: '80%' }} />
                      <div className="skeleton" style={{ height: '12px', width: '90%' }} />
                    </div>
                  ) : aiTip ? (
                    <div className="ai-response">{aiTip}</div>
                  ) : (
                    <div style={{ fontSize: '12px', color: 'var(--muted)', fontFamily: 'var(--font-display)' }}>Loading...</div>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                  <input
                    placeholder={`Ask about ${selected.name}...`}
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && question.trim() && fetchAiTips(selected, question)}
                    style={{ flex: 1, fontSize: '13px' }}
                  />
                  <button className="btn-primary" style={{ padding: '10px 14px', flexShrink: 0 }} onClick={() => question.trim() && fetchAiTips(selected, question)} disabled={!question.trim() || aiLoading}>Ask</button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {['Common mistakes?', 'Best warm-up?', 'How often?', 'Modifications?'].map((q, i) => (
                    <button key={i} onClick={() => { setQuestion(q); fetchAiTips(selected, q) }}
                      style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '3px', padding: '4px 10px', fontSize: '10px', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'var(--font-display)' }}>{q}</button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}
