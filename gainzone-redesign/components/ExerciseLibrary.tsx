'use client'
import { useState, useMemo, useEffect, useCallback } from 'react'
import { exercises, type Exercise, type MuscleGroup } from '@/lib/exercises'
import { exerciseAnimations } from './ExerciseAnimations'
import { ExerciseModal } from './ExerciseModal'

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

      <div className="search-wrap" style={{ marginBottom: '12px' }}>
        <svg className="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input placeholder="Search exercises, muscles..." value={search} onChange={e => setSearch(e.target.value)} />
        {search && <button onClick={() => setSearch('')} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '18px' }}>×</button>}
      </div>

      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px', marginBottom: '1.5rem', scrollbarWidth: 'none' }}>
        {FILTERS.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} className={`chip ${filter === f.id ? 'active' : ''}`}>{f.label}</button>
        ))}
      </div>

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

      {selected && (
        <ExerciseModal selected={selected} gifMap={gifMap} onClose={closeModal} />
      )}
    </div>
  )
}
