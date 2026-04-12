import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type WorkoutLog = {
  id?: string
  created_at?: string
  date: string
  workout_name: string
  exercises: ExerciseLog[]
  duration_minutes: number
  notes?: string
}

export type ExerciseLog = {
  name: string
  sets: SetLog[]
  muscle_group: string
}

export type SetLog = {
  reps: number
  weight_kg: number
  completed: boolean
}
