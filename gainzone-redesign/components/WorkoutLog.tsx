'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { exercises } from '@/lib/exercises'

type SetLog = { reps: string; weight: string; done: boolean }
type ExLog = { name: string; muscle: string; sets: SetLog[] }

export default function WorkoutLog() {
  const [view, setView] = useState<'start' | 'active' | 'history'>('start')
  const [workoutName, setWorkoutName] = useState('')
  const [exLogs, setExLogs] = useState<ExLog[]>([])
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [elapsed, setElapsed] = useState(0)
  const [logs, setLogs] = useState<any[]>([])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  // Timer
  useEffect(() => {
    if (view !== 'active' || !startTime) return
    const id = setInterval(() => setElapsed(Math.floor((Date.now() - startTime.getTime()) / 1000)), 1000)
    return () => clearInterval(id)
  }, [view, startTime])

  useEffect(() => {
    if (view === 'history') loadHistory()
  }, [view])

  async function loadHistory() {
    try {
      const { data } = await supabase.from('workout_logs').select('*').order('created_at', { ascending: false }).limit(20)
      setLogs(data || [])
    } catch { setLogs([]) }
  }

  function startWorkout() {
    if (!workoutName) return
    setExLogs([])
    setStartTime(new Date())
    setElapsed(0)
    setSaved(false)
    setView('active')
  }

  function addExercise(exId: string) {
    const ex = exercises.find(e => e.id === exId)
    if (!ex) return
    setExLogs(prev => [...prev, {
      name: ex.name, muscle: ex.muscle,
      sets: [{ reps: '', weight: '', done: false }, { reps: '', weight: '', done: false }, { reps: '', weight: '', done: false }]
    }])
  }

  function updateSet(ei: number, si: number, field: 'reps' | 'weight' | 'done', val: any) {
    setExLogs(prev => {
      const next = [...prev]
      next[ei] = { ...next[ei], sets: next[ei].sets.map((s, i) => i === si ? { ...s, [field]: val } : s) }
      return next
    })
  }

  function addSet(ei: number) {
    setExLogs(prev => {
      const next = [...prev]
      next[ei] = { ...next[ei], sets: [...next[ei].sets, { reps: '', weight: '', done: false }] }
      return next
    })
  }

  function removeExercise(ei: number) {
    setExLogs(prev => prev.filter((_, i) => i !== ei))
  }

  async function finishWorkout() {
    setSaving(true)
    try {
      const duration = Math.round(elapsed / 60)
      const payload = {
        date: new Date().toISOString().split('T')[0],
        workout_name: workoutName,
        exercises: exLogs,
        duration_minutes: duration,
        notes: ''
      }
      await supabase.from('workout_logs').insert([payload])
      setSaved(true)
    } catch (e) {
      console.error(e)
    }
    setSaving(false)
  }

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
  const completedSets = exLogs.flatMap(e => e.sets).filter(s => s.done).length
  const totalSets = exLogs.flatMap(e => e.sets).length

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <div className="font-display" style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '1px' }}>WORKOUT LOG</div>
        <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>Log sets, reps and weights. Synced to Supabase.</div>
      </div>

      <div className="tab-bar" style={{ marginBottom: '1.5rem', maxWidth: '300px' }}>
        <button className={`tab-item ${view === 'start' ? 'active' : ''}`} onClick={() => setView('start')}>New</button>
        <button className={`tab-item ${view === 'active' ? 'active' : ''}`} onClick={() => view === 'active' && setView('active')}>Active</button>
        <button className={`tab-item ${view === 'history' ? 'active' : ''}`} onClick={() => setView('history')}>History</button>
      </div>

      {/* Start */}
      {view === 'start' && (
        <div className="slide-up">
          <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '1rem' }}>Start a new session</div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '6px' }}>Workout Name</label>
            <input placeholder="e.g. Push Day — Chest focus" value={workoutName} onChange={e => setWorkoutName(e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {['Push Day', 'Pull Day', 'Leg Day', 'Upper Body', 'Full Body', 'Calisthenics'].map(n => (
              <button key={n} onClick={() => setWorkoutName(n)} style={{
                padding: '5px 12px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer',
                background: workoutName === n ? 'var(--accent)' : '#1a1a1a',
                color: workoutName === n ? '#0a0a0a' : '#888',
                border: 'none', fontFamily: 'var(--font-body)'
              }}>{n}</button>
            ))}
          </div>
          <button className="btn-primary" style={{ width: '100%', padding: '12px' }} disabled={!workoutName} onClick={startWorkout}>Start Workout ⚡</button>
        </div>
      )}

      {/* Active */}
      {view === 'active' && (
        <div className="slide-up">
          {/* Timer bar */}
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '12px 16px', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#555' }}>{workoutName}</div>
              <div className="font-display" style={{ fontSize: '32px', fontWeight: 900, color: 'var(--accent)', letterSpacing: '2px' }}>{fmt(elapsed)}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', color: '#555' }}>Sets done</div>
              <div style={{ fontSize: '22px', fontWeight: 700 }}>{completedSets}<span style={{ color: '#444', fontSize: '14px' }}>/{totalSets}</span></div>
            </div>
          </div>

          {/* Add exercise */}
          <div style={{ marginBottom: '1.25rem' }}>
            <select onChange={e => { if (e.target.value) { addExercise(e.target.value); e.target.value = '' } }} defaultValue="">
              <option value="">+ Add exercise...</option>
              {exercises.map(ex => <option key={ex.id} value={ex.id}>{ex.name} ({ex.muscle})</option>)}
            </select>
          </div>

          {/* Exercise logs */}
          {exLogs.map((ex, ei) => (
            <div key={ei} className="card" style={{ padding: '14px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 500 }}>{ex.name}</div>
                  <span className={`badge badge-${ex.muscle}`} style={{ marginTop: '4px', display: 'inline-block' }}>{ex.muscle}</span>
                </div>
                <button onClick={() => removeExercise(ei)} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: '16px' }}>×</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '30px 1fr 1fr 36px', gap: '6px', marginBottom: '6px' }}>
                <div style={{ fontSize: '10px', color: '#555', textAlign: 'center', paddingTop: '8px' }}>Set</div>
                <div style={{ fontSize: '10px', color: '#555', textAlign: 'center', paddingTop: '8px' }}>kg</div>
                <div style={{ fontSize: '10px', color: '#555', textAlign: 'center', paddingTop: '8px' }}>Reps</div>
                <div />
              </div>
              {ex.sets.map((s, si) => (
                <div key={si} style={{ display: 'grid', gridTemplateColumns: '30px 1fr 1fr 36px', gap: '6px', marginBottom: '6px', alignItems: 'center' }}>
                  <div style={{ fontSize: '12px', color: '#555', textAlign: 'center' }}>{si + 1}</div>
                  <input type="number" placeholder="—" value={s.weight} onChange={e => updateSet(ei, si, 'weight', e.target.value)} style={{ textAlign: 'center', padding: '8px' }} />
                  <input type="number" placeholder="—" value={s.reps} onChange={e => updateSet(ei, si, 'reps', e.target.value)} style={{ textAlign: 'center', padding: '8px' }} />
                  <button onClick={() => updateSet(ei, si, 'done', !s.done)} style={{
                    width: '32px', height: '32px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                    background: s.done ? 'var(--accent)' : '#2a2a2a', fontSize: '14px'
                  }}>{s.done ? '✓' : '○'}</button>
                </div>
              ))}
              <button onClick={() => addSet(ei)} style={{ background: 'none', border: '1px dashed #2a2a2a', color: '#555', padding: '6px', borderRadius: '6px', width: '100%', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '12px', marginTop: '4px' }}>+ Add Set</button>
            </div>
          ))}

          {exLogs.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#444', fontSize: '13px' }}>
              Select an exercise above to start logging
            </div>
          )}

          {saved ? (
            <div style={{ background: '#0f1a0a', border: '1px solid #1e3010', borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
              <div style={{ fontSize: '16px', marginBottom: '4px' }}>✅</div>
              <div style={{ fontSize: '14px', color: 'var(--accent)', fontWeight: 500 }}>Workout saved to Supabase!</div>
              <button className="btn-ghost" style={{ marginTop: '10px', padding: '6px 16px' }} onClick={() => { setView('start'); setSaved(false) }}>New Workout</button>
            </div>
          ) : (
            <button className="btn-primary" style={{ width: '100%', padding: '12px', marginTop: '0.5rem' }} onClick={finishWorkout} disabled={saving || exLogs.length === 0}>
              {saving ? 'Saving...' : 'Finish & Save Workout'}
            </button>
          )}
        </div>
      )}

      {/* History */}
      {view === 'history' && (
        <div className="slide-up">
          {logs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#444', fontSize: '13px' }}>
              No workouts logged yet. Start your first session!
            </div>
          ) : (
            logs.map((log, i) => (
              <div key={i} className="card" style={{ padding: '14px', marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 500 }}>{log.workout_name}</div>
                  <div style={{ fontSize: '11px', color: '#555' }}>{log.date}</div>
                </div>
                <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#666' }}>
                  <span>{log.duration_minutes} min</span>
                  <span>{log.exercises?.length || 0} exercises</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
