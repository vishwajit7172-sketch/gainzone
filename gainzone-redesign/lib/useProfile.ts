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

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const deviceId = getOrCreateDeviceId()
    fetch(`/api/user-profile?device_id=${deviceId}`)
      .then(r => r.json())
      .then(data => {
        setProfile(data || { device_id: deviceId })
        setLoading(false)
      })
      .catch(() => {
        setProfile({ device_id: deviceId })
        setLoading(false)
      })
  }, [])

  async function saveProfile(updates: Partial<UserProfile>) {
    const deviceId = getOrCreateDeviceId()
    const updated = { ...profile, ...updates, device_id: deviceId }
    setProfile(updated as UserProfile)

    await fetch('/api/user-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    })
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

  return { profile, loading, saveProfile, isComplete }
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
