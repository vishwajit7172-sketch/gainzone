import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json(
      { error: 'GROQ_API_KEY is not set in Vercel env vars.' },
      { status: 500 }
    )
  }

  let body: any
  try { body = await req.json() }
  catch { return NextResponse.json({ error: 'Invalid request body' }, { status: 400 }) }

  const { name, age, weight, height, gender, experience, goal, trainingType, activityLevel } = body

  if (!weight || !height || !age) {
    return NextResponse.json({ error: 'Missing required stats (age, weight, height)' }, { status: 400 })
  }
  if (!goal) {
    return NextResponse.json({ error: 'Missing goal' }, { status: 400 })
  }

  const prompt = `You are an elite personal trainer and sports nutritionist. Create a comprehensive, personalized fitness plan.

User Profile:
- Name: ${name || 'User'}
- Age: ${age}, Gender: ${gender || 'not specified'}
- Weight: ${weight}kg, Height: ${height}cm
- Experience: ${experience || 'intermediate'}
- Goal: ${goal}
- Training style: ${trainingType || 'gym'}
- Daily activity level: ${activityLevel || 'moderate'}

Return ONLY valid JSON in this exact structure (no markdown, no backticks):
{
  "phase": "Phase name",
  "duration": "Duration (e.g. 12 weeks)",
  "summary": "2-3 sentence personalized overview mentioning their name and goal",
  "weeklyVolume": 4,
  "keyTips": ["tip1", "tip2", "tip3"],
  "workoutPlan": {
    "monday": { "name": "Push Day", "exercises": [{ "name": "Bench Press", "sets": 4, "reps": "8-10", "rest": "90s" }] },
    "tuesday": { "name": "Pull Day", "exercises": [{ "name": "Barbell Row", "sets": 4, "reps": "8-10", "rest": "90s" }] },
    "wednesday": { "name": "Rest", "exercises": [] },
    "thursday": { "name": "Legs", "exercises": [{ "name": "Squat", "sets": 4, "reps": "8-10", "rest": "2min" }] },
    "friday": { "name": "Upper Body", "exercises": [{ "name": "Overhead Press", "sets": 3, "reps": "10-12", "rest": "60s" }] },
    "saturday": { "name": "Active Recovery", "exercises": [] },
    "sunday": { "name": "Rest", "exercises": [] }
  },
  "dietPlan": {
    "dailyCalories": 2400,
    "protein_g": 180,
    "carbs_g": 240,
    "fats_g": 70,
    "hydration": "3-4 litres of water daily",
    "supplements": ["Creatine 5g/day", "Whey Protein"],
    "meals": [
      { "time": "7:00 AM", "name": "Breakfast", "description": "Brief description", "calories": 500 },
      { "time": "1:00 PM", "name": "Lunch", "description": "Brief description", "calories": 700 },
      { "time": "4:00 PM", "name": "Pre-Workout", "description": "Brief description", "calories": 300 },
      { "time": "8:00 PM", "name": "Dinner", "description": "Brief description", "calories": 600 }
    ]
  },
  "intensityGuidelines": {
    "weekOne": "How to approach the first week",
    "progression": "How to progressively overload week by week",
    "deloadWeek": "Deload protocol every 4th week"
  }
}`

  try {
    const Groq = (await import('groq-sdk')).default
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are an expert personal trainer. Always respond with valid JSON only. No markdown, no backticks, no explanation text. Just the raw JSON object.',
        },
        { role: 'user', content: prompt },
      ],
      max_tokens: 2500,
      temperature: 0.5,
    })

    const raw = completion.choices[0]?.message?.content?.trim()
    if (!raw) return NextResponse.json({ error: 'Empty response from AI' }, { status: 500 })

    const clean = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim()

    let plan: any
    try {
      plan = JSON.parse(clean)
    } catch {
      console.error('Failed to parse plan JSON:', clean)
      return NextResponse.json({ error: 'AI returned invalid JSON. Try again.' }, { status: 500 })
    }

    return NextResponse.json({ plan })

  } catch (err: any) {
    console.error('Groq generate-plan error:', JSON.stringify(err))
    if (err?.status === 401) return NextResponse.json({ error: 'Invalid GROQ_API_KEY — check Vercel env vars.' }, { status: 500 })
    if (err?.status === 429) return NextResponse.json({ error: 'Rate limit hit. Wait a moment and retry.' }, { status: 500 })
    return NextResponse.json({ error: `AI error: ${err?.message || 'Unknown error'}` }, { status: 500 })
  }
}
