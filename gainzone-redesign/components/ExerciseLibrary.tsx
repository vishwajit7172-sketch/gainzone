'use client'
import { useState, useMemo, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { exercises, type Exercise, type MuscleGroup } from '@/lib/exercises'
import { exerciseAnimations } from './ExerciseAnimations'

const FILTERS: { id: 'all' | MuscleGroup; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'chest', label: 'Chest' },
  { id: 'back', label: 'Back' },
  { id: 'legs', label: 'Legs' },
  { id: 'shoulder', label: 'Shoulders' },
  { id: 'arms', label: 'Arms' },
  { id: 'core', label: 'Core' },
  { id: 'calisthenics', label: 'Calisthenics' },
]

// ── Portal Modal — renders directly into document.body ──────────────────────
function ExerciseModal({
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

  // Back button intercept
  useEffect(() => {
    window.history.pushState({ modal: true }, '')
    const handlePop = () => onClose()
    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [onClose])

  // Prevent background scroll — iOS Safari safe method
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
        body: JSON.stringify({ exercise: ex.name, question: q || '' })
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
        // The OVERLAY scrolls — no height constraint anywhere
        overflowY: 'auto',
        overflowX: 'hidden',
        WebkitOverflowScrolling: 'touch' as any,
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Inner wrapper — tap above card to close */}
      <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 0 60px 0' }}>

        {/* Card — no maxHeight, no overflow:hidden, grows freely */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '0 0 12px 12px',
          width: '100%',
          maxWidth: '600px',
        }}>

          {/* ── Top section ── */}
          <div style={{ background: 'var(--surface2)', padding: '1.25rem 1.5rem 1rem' }}>

            {/* Title row */}
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
              ) : AnimComp ? (
                <AnimComp />
              ) : (
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

          {/* ── Tabs ── */}
          <div style={{ padding: '1rem 1.5rem 0' }}>
            <div className="tab-bar">
              <button className={`tab-item ${tab === 'guide' ? 'active' : ''}`} onClick={() => setTab('guide')}>Form Guide</button>
              <button className={`tab-item ${tab === 'ai' ? 'active' : ''}`} onClick={() => { setTab('ai'); if (!aiTip) fetchAiTips(selected) }}>AI Coach</button>
            </div>
          </div>

          {/* ── Tab content ── */}
          <div style={{ padding: '1.25rem 1.5rem 2.5rem' }}>

            {tab === 'guide' && (
              <div>
                {/* Cues */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '1.25rem' }}>
                  {selected.cues.map((cue, i) => (
                    <span key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '3px', padding: '3px 10px', fontSize: '11px', color: '#aaa', fontFamily: 'var(--font-display)' }}>{cue}</span>
                  ))}
                </div>

                {/* Steps */}
                <div style={{ fontSize: '10px', color: 'var(--muted)', fontFamily: 'var(--font-display)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>Steps</div>
                <div style={{ marginBottom: '1.25rem' }}>
                  {selected.steps.map((step, i) => (
                    <div key={i} style={{ display: 'flex', gap: '12px', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                      <div style={{ width: '22px', height: '22px', background: 'var(--text)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, color: 'var(--bg)', flexShrink: 0, fontFamily: 'var(--font-display)' }}>{i + 1}</div>
                      <div style={{ fontSize: '13px', color: '#999', lineHeight: 1.7 }}>{step}</div>
                    </div>
                  ))}
                </div>

                {/* Pro tip */}
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

  // 👇 Portal: renders into document.body, completely outside the page layout
  return createPortal(modal, document.body)
}

// ── Main ExerciseLibrary component ──────────────────────────────────────────
export default function ExerciseLibrary() {
  const [filter, setFilter] = useState<'all' | MuscleGroup>('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Exercise | null>(null)
  const [gifMap, setGifMap] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch('/api/exercise-gifs')
      .then(r => r.json())
      .then(data => setGifMap(data))
      .catch(() => {})
  }, [])

  const filtered = useMemo(() => {
    let list = filter === 'all' ? exercises : exercises.filter(e => e.muscle === filter)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(e =>
        e.name.toLowerCase().includes(q) ||
        e.muscles.toLowerCase().includes(q) ||
        e.muscle.toLowerCase().includes(q)
      )
    }
    return list
  }, [filter, search])

  const closeModal = useCallback(() => {
    if (window.history.state?.modal) window.history.back()
    setSelected(null)
  }, [])

  return (
    <div className="slide-up">
      <div style={{ marginBottom: '1.75rem' }}>
        <div className="page-title">EXERCISES</div>
        <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '8px', fontFamily: 'var(--font-display)' }}>
          {exercises.length} movements
        </div>
      </div>

      {/* Search */}
      <div className="search-wrap" style={{ marginBottom: '12px' }}>
        <svg className="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input placeholder="Search exercises, muscles..." value={search} onChange={e => setSearch(e.target.value)} />
        {search && <button onClick={() => setSearch('')} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '18px' }}>×</button>}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px', marginBottom: '1.5rem', scrollbarWidth: 'none' }}>
        {FILTERS.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} className={`chip ${filter === f.id ? 'active' : ''}`}>{f.label}</button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <div style={{ fontSize: '13px', color: 'var(--muted)', fontFamily: 'var(--font-display)', marginBottom: '12px' }}>No exercises found</div>
          <button className="btn-ghost" onClick={() => { setSearch(''); setFilter('all') }}>Clear filters</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(168px, 1fr))', gap: '10px' }}>
          {filtered.map(ex => {
            const AnimC = exerciseAnimations[ex.id]
            const hasGif = !!gifMap[ex.id]
            return (
              <div key={ex.id} className="card-glow" onClick={() => setSelected(ex)} style={{ cursor: 'pointer', overflow: 'hidden', padding: 0 }}>
                <div style={{ background: 'var(--surface2)', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
                  {hasGif ? (
                    <img src={gifMap[ex.id]} alt={ex.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : AnimC ? <AnimC /> : (
                    <div style={{ fontSize: '32px', opacity: 0.15 }}>◻</div>
                  )}
                  {hasGif && (
                    <div style={{ position: 'absolute', top: '6px', right: '6px', background: 'rgba(0,0,0,0.7)', borderRadius: '3px', padding: '2px 5px', fontSize: '8px', fontFamily: 'var(--font-display)', color: '#888' }}>GIF</div>
                  )}
                </div>
                <div style={{ padding: '10px 12px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text)', marginBottom: '4px', lineHeight: 1.3 }}>{ex.name}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="badge">{ex.muscle}</span>
                    <span style={{ fontSize: '9px', color: 'var(--muted)', fontFamily: 'var(--font-display)' }}>{ex.sets}×{ex.reps}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Portal modal — lives in document.body, not here */}
      {selected && (
        <ExerciseModal
          selected={selected}
          gifMap={gifMap}
          onClose={closeModal}
        />
      )}
    </div>
  )
}
