import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET — fetch all exercise GIFs
export async function GET() {
  const { data, error } = await supabase
    .from('exercise_gifs')
    .select('exercise_id, gif_url')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Return as { exercise_id: gif_url } map for easy lookup
  const map: Record<string, string> = {}
  for (const row of data ?? []) map[row.exercise_id] = row.gif_url
  return NextResponse.json(map)
}

// POST — upsert a gif for an exercise
export async function POST(req: NextRequest) {
  const { exercise_id, gif_url } = await req.json()
  if (!exercise_id || !gif_url)
    return NextResponse.json({ error: 'Missing exercise_id or gif_url' }, { status: 400 })

  const { error } = await supabase
    .from('exercise_gifs')
    .upsert({ exercise_id, gif_url, updated_at: new Date().toISOString() }, { onConflict: 'exercise_id' })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

// DELETE — remove a gif
export async function DELETE(req: NextRequest) {
  const { exercise_id } = await req.json()
  if (!exercise_id)
    return NextResponse.json({ error: 'Missing exercise_id' }, { status: 400 })

  const { error } = await supabase
    .from('exercise_gifs')
    .delete()
    .eq('exercise_id', exercise_id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
