'use client'
import { exercises, pplProgram } from '@/lib/exercises'

const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const todayName = DAYS[new Date().getDay()]

export default function Dashboard({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const todayPlan = pplProgram.days.find(d => d.day === todayName)
  const todayExes = todayPlan?.exercises.map(id => exercises.find(e => e.id === id)).filter(Boolean) || []
  const isRest = todayPlan?.type === 'Rest'
  const weekDone = [true, true, true, false, false, false, false]

  return (
    <div className="slide-up">
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--font-display)', letterSpacing: '1px', marginBottom: '8px' }}>
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' }).toUpperCase()}
        </div>
        <div className="page-title">{isRest ? 'REST DAY' : (todayPlan?.type || 'TODAY').toUpperCase()}</div>
        {!isRest && <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '6px', fontFamily: 'var(--font-display)' }}>{todayPlan?.focus}</div>}
      </div>

      {isRest ? (
        <div style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '8px', padding: '1.75rem', textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 500, color: 'var(--muted)', marginBottom: '6px' }}>Recovery Day</div>
          <div style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.6 }}>Sleep · Hydrate · Recover</div>
        </div>
      ) : (
        <div className="today-banner" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '10px', color: 'var(--muted)', fontFamily: 'var(--font-display)', letterSpacing: '1px', marginBottom: '6px', textTransform: 'uppercase' }}>Today</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 500, color: 'var(--text)', lineHeight: 1 }}>{todayPlan?.type} DAY</div>
              <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '6px' }}>{todayExes.length} exercises · ~60 min</div>
            </div>
            <button onClick={() => onNavigate('exercises')} className="btn-primary">
              View ↗
            </button>
          </div>
        </div>
      )}

      <div className="stat-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="stat-box"><div className="stat-val">7</div><div className="stat-lbl">day streak</div></div>
        <div className="stat-box"><div className="stat-val">14</div><div className="stat-lbl">this month</div></div>
        <div className="stat-box"><div className="stat-val">5.8k</div><div className="stat-lbl">kcal burned</div></div>
      </div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '14px', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '10px', color: 'var(--muted)', fontFamily: 'var(--font-display)', fontWeight: 500, letterSpacing: '1px', marginBottom: '12px', textTransform: 'uppercase' }}>This Week</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '4px' }}>
          {['M','T','W','T','F','S','S'].map((d, i) => {
            const done = weekDone[i]
            const isToday = i === ((new Date().getDay() + 6) % 7)
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontSize: '11px', fontWeight: 500,
                  background: done ? 'var(--text)' : isToday ? 'var(--surface2)' : 'transparent',
                  border: isToday ? '1px solid rgba(255,255,255,0.2)' : done ? 'none' : '1px solid var(--border)',
                  color: done ? 'var(--bg)' : isToday ? 'var(--text)' : 'var(--muted)'
                }}>{d}</div>
              </div>
            )
          })}
        </div>
      </div>

      {!isRest && todayExes.length > 0 && (
        <>
          <div style={{ fontSize: '10px', color: 'var(--muted)', fontFamily: 'var(--font-display)', letterSpacing: '1px', marginBottom: '10px', textTransform: 'uppercase' }}>Today's Exercises</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '1.5rem' }}>
            {todayExes.slice(0, 4).map(ex => ex && (
              <div key={ex.id} className="card-glow" style={{ padding: '12px', cursor: 'pointer' }} onClick={() => onNavigate('exercises')}>
                <div style={{ marginBottom: '5px' }}><span className="badge">{ex.muscle}</span></div>
                <div style={{ fontSize: '12px', fontWeight: 500, marginBottom: '3px', lineHeight: 1.3 }}>{ex.name}</div>
                <div style={{ fontSize: '10px', color: 'var(--muted)', fontFamily: 'var(--font-display)' }}>{ex.sets}×{ex.reps}</div>
              </div>
            ))}
          </div>
        </>
      )}

      <div style={{ fontSize: '10px', color: 'var(--muted)', fontFamily: 'var(--font-display)', letterSpacing: '1px', marginBottom: '10px', textTransform: 'uppercase' }}>Quick Actions</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        {[
          { tab: 'planner', label: 'Build Plan', sub: 'AI-powered', icon: '↗' },
          { tab: 'log', label: 'Log Workout', sub: 'Track sets & reps', icon: '+' },
          { tab: 'exercises', label: 'Exercises', sub: 'Animated guides', icon: '▶' },
          { tab: 'tools', label: 'Tools', sub: 'Timer · Calculator', icon: '⏱' },
        ].map(a => (
          <button key={a.tab} onClick={() => onNavigate(a.tab)}
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '14px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', color: 'var(--muted)', marginBottom: '6px' }}>{a.icon}</div>
            <div style={{ fontSize: '13px', fontWeight: 500, marginBottom: '2px' }}>{a.label}</div>
            <div style={{ fontSize: '11px', color: 'var(--muted)' }}>{a.sub}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
