'use client'
import { useState } from 'react'
import Dashboard from '@/components/Dashboard'
import ExerciseLibrary from '@/components/ExerciseLibrary'
import WorkoutLog from '@/components/WorkoutLog'
import RestTimer from '@/components/RestTimer'
import PlanBuilder from '@/components/PlanBuilder'
import Calculator from '@/components/Calculator'
import AdminPanel from '@/components/AdminPanel'
import Onboarding from '@/components/Onboarding'
import Profile from '@/components/Profile'
import { useProfile } from '@/lib/useProfile'

const TABS = [
  { id: 'dashboard', label: 'Today',     icon: HomeIcon },
  { id: 'exercises', label: 'Exercises', icon: DumbIcon },
  { id: 'planner',   label: 'Plan',      icon: PlanIcon },
  { id: 'log',       label: 'Log',       icon: LogIcon  },
  { id: 'tools',     label: 'Tools',     icon: ToolIcon },
  { id: 'profile',   label: 'Profile',   icon: UserIcon },
]

export default function Home() {
  const [tab, setTab] = useState('dashboard')
  const [showAdmin, setShowAdmin] = useState(false)
  const { profile, loading, saveProfile, isComplete } = useProfile()

  if (showAdmin) return <AdminPanel onBack={() => setShowAdmin(false)} />

  // Show onboarding on first visit (profile exists but has no name)
  if (!loading && !isComplete && profile && !profile.name) {
    return (
      <Onboarding
        onComplete={async (data) => {
          await saveProfile(data)
        }}
      />
    )
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div style={{ marginBottom: '2rem', paddingLeft: '2px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 500, letterSpacing: '2px', color: 'var(--text)' }}>GAINZONE</div>
          {profile?.name && (
            <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '5px', fontFamily: 'var(--font-display)' }}>
              Hey, {profile.name} 👋
            </div>
          )}
        </div>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`nav-item ${tab === t.id ? 'active' : ''}`}>
            <t.icon size={14} />
            {t.label}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <button
          onClick={() => setShowAdmin(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'var(--font-display)', fontSize: '10px', letterSpacing: '0.5px', textTransform: 'uppercase', width: '100%', transition: 'all 0.15s' }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'var(--border-hover)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}
        >
          <LockIcon size={12} />
          Admin
        </button>
      </aside>

      <main className="main-content">
        {tab === 'dashboard' && <Dashboard onNavigate={setTab} profile={profile} />}
        {tab === 'exercises' && <ExerciseLibrary profile={profile} />}
        {tab === 'planner'   && <PlanBuilder />}
        {tab === 'log'       && <WorkoutLog />}
        {tab === 'tools'     && <ToolsHub />}
        {tab === 'profile'   && <Profile />}
      </main>

      <nav className="bottom-nav">
        {TABS.map(t => (
          <button key={t.id} className={`bottom-nav-btn ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
            <t.icon size={18} />
            {t.label}
          </button>
        ))}
        <button className="bottom-nav-btn" onClick={() => setShowAdmin(true)}>
          <LockIcon size={18} />
          Admin
        </button>
      </nav>
    </div>
  )
}

function ToolsHub() {
  const [tool, setTool] = useState<'timer' | 'calculator'>('timer')
  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <div className="page-title">TOOLS</div>
        <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '8px', fontFamily: 'var(--font-display)' }}>timer · calculators</div>
      </div>
      <div className="tab-bar" style={{ marginBottom: '1.5rem', maxWidth: '280px' }}>
        <button className={`tab-item ${tool === 'timer' ? 'active' : ''}`} onClick={() => setTool('timer')}>Rest Timer</button>
        <button className={`tab-item ${tool === 'calculator' ? 'active' : ''}`} onClick={() => setTool('calculator')}>Calculator</button>
      </div>
      {tool === 'timer' ? <RestTimer /> : <Calculator />}
    </div>
  )
}

function HomeIcon({ size = 20 }: { size?: number }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> }
function DumbIcon({ size = 20 }: { size?: number }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 6.5h11"/><rect x="2" y="5" width="3" height="14" rx="1.5"/><rect x="19" y="5" width="3" height="14" rx="1.5"/><rect x="5" y="9" width="3" height="6" rx="1"/><rect x="16" y="9" width="3" height="6" rx="1"/></svg> }
function PlanIcon({ size = 20 }: { size?: number }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> }
function LogIcon({ size = 20 }: { size?: number }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg> }
function ToolIcon({ size = 20 }: { size?: number }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93A10 10 0 0 0 6.99 3.34L9 9l-5.5 3.18A10 10 0 1 0 19.07 4.93z"/></svg> }
function UserIcon({ size = 20 }: { size?: number }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> }
function LockIcon({ size = 20 }: { size?: number }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> }
