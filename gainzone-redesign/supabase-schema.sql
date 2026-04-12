-- =============================================
-- GainZone — Supabase Schema
-- Run this in your Supabase SQL Editor
-- =============================================

-- Workout logs table
CREATE TABLE IF NOT EXISTS workout_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  date DATE NOT NULL,
  workout_name TEXT NOT NULL,
  exercises JSONB DEFAULT '[]',
  duration_minutes INTEGER DEFAULT 0,
  notes TEXT DEFAULT ''
);

-- Generated AI plans table
CREATE TABLE IF NOT EXISTS ai_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_name TEXT,
  weight NUMERIC,
  height NUMERIC,
  age INTEGER,
  gender TEXT,
  experience TEXT,
  goal TEXT,
  training_type TEXT,
  plan JSONB NOT NULL
);

-- Personal bests table
CREATE TABLE IF NOT EXISTS personal_bests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  exercise_name TEXT NOT NULL,
  weight_kg NUMERIC,
  reps INTEGER,
  set_date DATE DEFAULT CURRENT_DATE
);

-- Body stats log
CREATE TABLE IF NOT EXISTS body_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  date DATE DEFAULT CURRENT_DATE,
  weight_kg NUMERIC,
  body_fat_pct NUMERIC,
  notes TEXT
);

-- RLS policies (disable for dev, enable for production with auth)
ALTER TABLE workout_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE personal_bests ENABLE ROW LEVEL SECURITY;
ALTER TABLE body_stats ENABLE ROW LEVEL SECURITY;

-- For development: allow all (remove in production and add proper auth)
CREATE POLICY "Allow all" ON workout_logs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON ai_plans FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON personal_bests FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON body_stats FOR ALL USING (true) WITH CHECK (true);

-- Sample data (optional)
INSERT INTO personal_bests (exercise_name, weight_kg, reps, set_date) VALUES
  ('Barbell Back Squat', 105, 5, CURRENT_DATE - INTERVAL '6 days'),
  ('Bench Press', 85, 5, CURRENT_DATE - INTERVAL '3 days'),
  ('Deadlift', 130, 3, CURRENT_DATE - INTERVAL '9 days'),
  ('Overhead Press', 60, 6, CURRENT_DATE - INTERVAL '4 days'),
  ('Barbell Curl', 45, 8, CURRENT_DATE - INTERVAL '2 days');

-- Exercise GIFs table (admin-managed, synced across all devices)
CREATE TABLE IF NOT EXISTS exercise_gifs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  exercise_id TEXT NOT NULL UNIQUE,
  gif_url TEXT NOT NULL
);

ALTER TABLE exercise_gifs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON exercise_gifs FOR ALL USING (true) WITH CHECK (true);
