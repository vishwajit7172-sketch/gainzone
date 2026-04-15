import { useState, useEffect } from 'react'

export type UserProfile = {
  device_id: string
  name?: string
  age?: number
  gender?: string
  weight_kg?: number
  height_cm?: number
  goal?: string
  experience?: string
  days_per_week?: number
  equipment?: string
  injuries?: string
  skipped?: boolean   // tracks "skip for now" so onboarding doesn't loop
}

function getOrCreateDeviceId(): string {
  if (typeof window === 'undefined') return ''
  let id = localStorage.getItem('gainzone_device_id')
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem('gainzone_device_id', id)
  }
  return id
}

function loadLocalProfile(deviceId: string): UserProfile | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(`gainzone_profile_${deviceId}`)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveLocalProfile(profile: UserProfile) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(`gainzone_profile_${profile.device_id}`, JSON.stringify(profile))
  } catch {}
}

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const deviceId = getOrCreateDeviceId()

    // Load from localStorage immediately — no network flash
    const local = loadLocalProfile(deviceId)
    if (local) {
      setProfile(local)
      setLoading(false)
      return
    }

    // Otherwise try server (Supabase path)
    fetch(`/api/user-profile?device_id=${deviceId}`)
      .then(r => r.json())
      .then(data => {
        const p = (data && data.device_id) ? data : { device_id: deviceId }
        setProfile(p)
        saveLocalProfile(p)
        setLoading(false)
      })
      .catch(() => {
        const p = { device_id: deviceId }
        setProfile(p)
        saveLocalProfile(p)
        setLoading(false)
      })
  }, [])

  async function saveProfile(updates: Partial<UserProfile>) {
    const deviceId = getOrCreateDeviceId()
    const updated: UserProfile = { ...profile, ...updates, device_id: deviceId }
    setProfile(updated)
    saveLocalProfile(updated)   // always persist locally first

    // Fire-and-forget to server — won't break if it fails
    fetch('/api/user-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    }).catch(() => {})

    return updated
  }

  const isComplete = !!(
    profile?.name &&
    profile?.age &&
    profile?.gender &&
    profile?.weight_kg &&
    profile?.height_cm &&
    profile?.goal &&
    profile?.experience
  )

  // User has completed onboarding OR explicitly clicked "Skip for now"
  const hasSeenOnboarding = isComplete || !!profile?.skipped

  return { profile, loading, saveProfile, isComplete, hasSeenOnboarding }
}

// Build a profile summary string to inject into AI prompts
export function profileContext(profile: UserProfile | null): string {
  if (!profile?.name) return ''
  const parts = [
    profile.name && `Name: ${profile.name}`,
    profile.age && `Age: ${profile.age}`,
    profile.gender && `Gender: ${profile.gender}`,
    profile.weight_kg && `Weight: ${profile.weight_kg}kg`,
    profile.height_cm && `Height: ${profile.height_cm}cm`,
    profile.goal && `Goal: ${profile.goal}`,
    profile.experience && `Experience: ${profile.experience}`,
    profile.days_per_week && `Training days/week: ${profile.days_per_week}`,
    profile.equipment && `Equipment: ${profile.equipment}`,
    profile.injuries && `Injuries/limitations: ${profile.injuries}`,
  ].filter(Boolean)
  return parts.length ? `\n\nUser profile: ${parts.join(' | ')}` : ''
}
