import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

// We use localStorage on the client side as the primary store.
// This server route acts as a pass-through so the client fetch doesn't 404.
// If you have Supabase set up, you can wire it in here later.

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const deviceId = searchParams.get('device_id')

  if (!deviceId) {
    return NextResponse.json({ error: 'Missing device_id' }, { status: 400 })
  }

  // If Supabase is configured, fetch from DB
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      )
      const { data } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('device_id', deviceId)
        .single()

      return NextResponse.json(data || { device_id: deviceId })
    } catch {
      // Supabase not set up yet — return empty profile, client uses localStorage
      return NextResponse.json({ device_id: deviceId })
    }
  }

  // No Supabase — return empty profile shell, client manages state via localStorage
  return NextResponse.json({ device_id: deviceId })
}

export async function POST(req: NextRequest) {
  let body: any
  try { body = await req.json() }
  catch { return NextResponse.json({ error: 'Invalid body' }, { status: 400 }) }

  const { device_id, ...profile } = body

  if (!device_id) {
    return NextResponse.json({ error: 'Missing device_id' }, { status: 400 })
  }

  // If Supabase is configured, persist to DB
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      )
      await supabase
        .from('user_profiles')
        .upsert({ device_id, ...profile }, { onConflict: 'device_id' })
    } catch {
      // Supabase not set up — silently continue, client stores in localStorage
    }
  }

  return NextResponse.json({ ok: true })
}
