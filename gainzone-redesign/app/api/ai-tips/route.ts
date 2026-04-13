import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const deviceId = req.nextUrl.searchParams.get('device_id')
  if (!deviceId) return NextResponse.json(null)

  const { data } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('device_id', deviceId)
    .single()

  return NextResponse.json(data || null)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { device_id, ...profile } = body

  if (!device_id) return NextResponse.json({ error: 'Missing device_id' }, { status: 400 })

  const { data, error } = await supabase
    .from('user_profiles')
    .upsert(
      { device_id, ...profile, updated_at: new Date().toISOString() },
      { onConflict: 'device_id' }
    )
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
