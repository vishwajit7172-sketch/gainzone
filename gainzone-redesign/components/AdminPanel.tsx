'use client'
import { useState, useEffect, useCallback } from 'react'
import { exercises } from '@/lib/exercises'

const ADMIN_PASSWORD = 'Mahi@2905'
type GifMap = Record<string, string>

export default function AdminPanel({ onBack }: { onBack: () => void }) {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [pwError, setPwError] = useState(false)

  const [gifs, setGifs] = useState<GifMap>({})
  const [loading, setLoading] = useState(false)
  const [selectedExId, setSelectedExId] = useState('')
  const [gifUrl, setGifUrl] = useState('')
  const [filter, setFilter] = useState('')
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [activeTab, setActiveTab] = useState<'gifs' | 'overview'>('gifs')

  const fetchGifs = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/exercise-gifs')
      const data = await res.json()
      setGifs(data)
    } catch {
      console.error('Failed to load GIFs')
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (authed) fetchGifs()
  }, [authed, fetchGifs])

  function handleLogin() {
    if (pw === ADMIN_PASSWORD) { setAuthed(true); setPwError(false) }
    else { setPwError(true); setPw('') }
  }

  async function handleAssignGif() {
    if (!selectedExId || !gifUrl.trim()) return
    setSaveStatus('saving')
    try {
      const res = await fetch('/api/exercise-gifs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exercise_id: selectedExId, gif_url: gifUrl.trim() })
      })
      if (!res.ok) throw new Error()
      setGifs(prev => ({ ...prev, [selectedExId]: gifUrl.trim() }))
      setGifUrl('')
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2000)
    } catch {
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 2000)
    }
  }

  async function handleRemoveGif(id: string) {
    try {
      await fetch('/api/exercise-gifs', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exercise_id: id })
      })
      setGifs(prev => { const n = { ...prev }; delete n[id]; return n })
    } catch {
      console.error('Failed to remove GIF')
    }
  }

  const filteredExercises = exercises.filter(e =>
    e.name.toLowerCase().includes(filter.toLowerCase()) ||
    e.muscle.toLowerCase().includes(filter.toLowerCase())
  )
  const exercisesWithGifs = exercises.filter(e => gifs[e.id])

  // ── Login screen ──────────────────────────────────────────
  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ width: '100%', maxWidth: '360px' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'var(--font-display)', fontSize: '11px', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            ← Back
          </button>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '11px', letterSpacing: '2px', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>Admin Access</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 500, color: 'var(--text)', marginBottom: '2rem' }}>GAINZONE</div>
          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '10px', fontFamily: 'var(--font-display)', color: 'var(--muted)', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '6px' }}>Password</div>
            <input
              type="password" placeholder="Enter admin password" value={pw}
              onChange={e => { setPw(e.target.value); setPwError(false) }}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              style={{ borderColor: pwError ? 'rgba(255,80,80,0.5)' : undefined }}
              autoFocus
            />
            {pwError && <div style={{ fontSize: '11px', color: '#ff6060', marginTop: '6px', fontFamily: 'var(--font-display)' }}>Incorrect password</div>}
          </div>
          <button className="btn-primary" onClick={handleLogin} style={{ width: '100%', padding: '12px' }}>Unlock</button>
        </div>
      </div>
    )
  }

  // ── Admin panel ───────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: '1.25rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface)', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'var(--font-display)', fontSize: '11px', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>← Back</button>
          <div style={{ width: '1px', height: '16px', background: 'var(--border)' }} />
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 500, color: 'var(--text)', letterSpacing: '1px' }}>ADMIN PANEL</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {loading && <div style={{ fontSize: '10px', fontFamily: 'var(--font-display)', color: 'var(--muted)' }}>Syncing...</div>}
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.5px', border: '1px solid var(--border)', padding: '3px 8px', borderRadius: '3px' }}>
            ☁ Supabase
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: '2rem' }}>
          {(['gifs', 'overview'] as const).map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-display)', fontSize: '11px', letterSpacing: '0.8px',
              textTransform: 'uppercase', padding: '10px 16px',
              color: activeTab === t ? 'var(--text)' : 'var(--muted)',
              borderBottom: activeTab === t ? '1px solid var(--text)' : '1px solid transparent',
              marginBottom: '-1px', transition: 'color 0.15s'
            }}>
              {t === 'gifs' ? 'Exercise GIFs' : 'Overview'}
            </button>
          ))}
        </div>

        {activeTab === 'gifs' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>

            {/* Left — Assign */}
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '10px', letterSpacing: '1px', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                Assign GIF
              </div>

              <input
                placeholder="Filter exercises..."
                value={filter}
                onChange={e => setFilter(e.target.value)}
                style={{ marginBottom: '10px' }}
              />

              <div style={{ border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden', marginBottom: '16px', maxHeight: '300px', overflowY: 'auto' }}>
                {filteredExercises.map((ex, i) => (
                  <div key={ex.id} onClick={() => { setSelectedExId(ex.id); setGifUrl(gifs[ex.id] || '') }}
                    style={{
                      padding: '10px 14px', cursor: 'pointer',
                      background: selectedExId === ex.id ? 'rgba(255,255,255,0.06)' : 'transparent',
                      borderBottom: i < filteredExercises.length - 1 ? '1px solid var(--border)' : 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'background 0.1s'
                    }}>
                    <div>
                      <div style={{ fontSize: '13px', color: 'var(--text)', fontWeight: 500 }}>{ex.name}</div>
                      <div style={{ fontSize: '10px', color: 'var(--muted)', fontFamily: 'var(--font-display)', marginTop: '1px' }}>{ex.muscle}</div>
                    </div>
                    {gifs[ex.id] && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text)', flexShrink: 0 }} />}
                  </div>
                ))}
                {filteredExercises.length === 0 && (
                  <div style={{ padding: '1.5rem', textAlign: 'center', fontSize: '12px', color: 'var(--muted)', fontFamily: 'var(--font-display)' }}>No matches</div>
                )}
              </div>

              {selectedExId ? (
                <div className="fade-in">
                  <div style={{ fontSize: '10px', fontFamily: 'var(--font-display)', color: 'var(--muted)', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '6px' }}>
                    GIF URL — {exercises.find(e => e.id === selectedExId)?.name}
                  </div>
                  <input
                    placeholder="https://example.com/exercise.gif"
                    value={gifUrl}
                    onChange={e => setGifUrl(e.target.value)}
                    style={{ marginBottom: '10px' }}
                    onKeyDown={e => e.key === 'Enter' && handleAssignGif()}
                  />
                  <button
                    className="btn-primary"
                    onClick={handleAssignGif}
                    disabled={!gifUrl.trim() || saveStatus === 'saving'}
                    style={{ width: '100%' }}
                  >
                    {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? '✓ Saved' : saveStatus === 'error' ? 'Error — retry' : 'Save GIF'}
                  </button>
                </div>
              ) : (
                <div style={{ fontSize: '12px', color: 'var(--muted)', fontFamily: 'var(--font-display)', textAlign: 'center', padding: '1rem', border: '1px dashed var(--border)', borderRadius: '6px' }}>
                  Select an exercise above
                </div>
              )}
            </div>

            {/* Right — Current GIFs */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '10px', letterSpacing: '1px', color: 'var(--muted)', textTransform: 'uppercase' }}>
                  Assigned GIFs
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '10px', color: 'var(--muted)' }}>
                  {exercisesWithGifs.length} / {exercises.length}
                </div>
              </div>

              {exercisesWithGifs.length === 0 ? (
                <div style={{ border: '1px dashed var(--border)', borderRadius: '6px', padding: '2rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', fontFamily: 'var(--font-display)' }}>
                    {loading ? 'Loading from Supabase...' : 'No GIFs assigned yet'}
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '420px', overflowY: 'auto' }}>
                  {exercisesWithGifs.map(ex => (
                    <div key={ex.id} style={{ border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px' }}>
                        <img
                          src={gifs[ex.id]} alt={ex.name}
                          style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--border)', flexShrink: 0 }}
                          onError={e => { (e.target as HTMLImageElement).style.opacity = '0.15' }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '13px', color: 'var(--text)', fontWeight: 500, marginBottom: '2px' }}>{ex.name}</div>
                          <div style={{ fontSize: '10px', color: 'var(--muted)', fontFamily: 'var(--font-display)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {gifs[ex.id]}
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveGif(ex.id)}
                          style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '16px', padding: '4px', flexShrink: 0 }}
                        >×</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'overview' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '2rem' }}>
              {[
                { label: 'Total Exercises', val: exercises.length },
                { label: 'GIFs Assigned', val: exercisesWithGifs.length },
                { label: 'Missing GIFs', val: exercises.length - exercisesWithGifs.length },
              ].map(s => (
                <div key={s.label} className="stat-box">
                  <div className="stat-val">{s.val}</div>
                  <div className="stat-lbl">{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ fontFamily: 'var(--font-display)', fontSize: '10px', letterSpacing: '1px', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '10px' }}>
              All Exercises
            </div>
            <div style={{ border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
              {exercises.map((ex, i) => (
                <div key={ex.id} style={{
                  padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  borderBottom: i < exercises.length - 1 ? '1px solid var(--border)' : 'none',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: gifs[ex.id] ? 'var(--text)' : 'var(--muted2)', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: '13px', color: 'var(--text)' }}>{ex.name}</div>
                      <div style={{ fontSize: '10px', color: 'var(--muted)', fontFamily: 'var(--font-display)', marginTop: '1px' }}>{ex.muscle} · {ex.type}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '10px', fontFamily: 'var(--font-display)', color: gifs[ex.id] ? 'var(--text)' : 'var(--muted2)' }}>
                    {gifs[ex.id] ? 'has gif' : 'no gif'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
