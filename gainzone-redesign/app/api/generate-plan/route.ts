import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

function extractJSON(text: string): string {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (fenced) return fenced[1].trim()
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  if (start !== -1 && end !== -1 && end > start) return text.slice(start, end + 1)
  return text.trim()
}

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

  const { weight, height, age, experience, goal, trainingType, gender, activityLevel } = body
  const bmi = (weight / ((height / 100) ** 2)).toFixed(1)

  const prompt = `You are a fitness coach AI. Generate a personalized fitness plan as valid JSON only.
User: ${gender}, age ${age}, ${weight}kg, ${height}cm, BMI ${bmi}
Experience: ${experience} | Goal: ${goal} | Training: ${trainingType} | Activity: ${activityLevel}
Return ONLY this JSON, no markdown, no extra text:
{"summary":"2-3 sentence plan overview","phase":"Phase name","duration":"X weeks","weeklyVolume":"X sessions/week","workoutPlan":{"monday":{"name":"Session name","exercises":[{"name":"Exercise name","sets":3,"reps":"8-10","rest":"90s"}]},"tuesday":{"name":"Rest","exercises":[]},"wednesday":{"name":"Session name","exercises":[{"name":"Exercise name","sets":3,"reps":"10-12","rest":"60s"}]},"thursday":{"name":"Session name","exercises":[{"name":"Exercise name","sets":3,"reps":"8-10","rest":"90s"}]},"friday":{"name":"Rest","exercises":[]},"saturday":{"name":"Session name","exercises":[{"name":"Exercise name","sets":3,"reps":"12-15","rest":"60s"}]},"sunday":{"name":"Rest","exercises":[]}},"dietPlan":{"dailyCalories":2500,"protein_g":180,"carbs_g":280,"fats_g":70,"meals":[{"time":"7:00 AM","name":"Breakfast","description":"Oats with banana and whey protein","calories":500},{"time":"10:00 AM","name":"Snack","description":"Greek yogurt with nuts","calories":250},{"time":"1:00 PM","name":"Lunch","description":"Rice, chicken, vegetables","calories":650},{"time":"4:00 PM","name":"Pre-Workout","description":"Banana and peanut butter toast","calories":400},{"time":"7:30 PM","name":"Dinner","description":"Grilled fish, sweet potato, salad","calories":600},{"time":"9:30 PM","name":"Night Snack","description":"Cottage cheese or casein shake","calories":200}],"hydration":"3L water daily","supplements":["Whey Protein 25g post-workout","Creatine 5g daily"]},"intensityGuidelines":{"weekOne":"Start at 60% effort, focus on form","progression":"Add 2.5-5kg per week on main lifts","deloadWeek":"Every 4th week reduce volume by 40%"},"keyTips":["Sleep 7-8 hours for recovery","Track your lifts every session","Eat protein within 30 min post-workout","Progressive overload is the key to growth"]}`

  try {
    const Groq = (await import('groq-sdk')).default
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: 'You are a fitness coach. Respond with valid JSON only. No markdown. No explanation. Just the JSON object.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 2500,
      temperature: 0.3,
    })

    const raw = completion.choices[0]?.message?.content
    if (!raw) return NextResponse.json({ error: 'Empty response from Groq' }, { status: 500 })

    let plan: any
    try {
      plan = JSON.parse(extractJSON(raw))
    } catch {
      console.error('Raw Groq response:', raw.slice(0, 500))
      return NextResponse.json({ error: 'AI returned malformed JSON. Try again.' }, { status: 500 })
    }

    return NextResponse.json({ plan })

  } catch (err: any) {
    console.error('Groq error:', JSON.stringify(err))
    if (err?.status === 401) return NextResponse.json({ error: 'Invalid GROQ_API_KEY — regenerate it at console.groq.com' }, { status: 500 })
    if (err?.status === 429) return NextResponse.json({ error: 'Rate limit hit. Wait 30 seconds and retry.' }, { status: 500 })
    if (err?.status === 503) return NextResponse.json({ error: 'Groq model overloaded. Try again in a moment.' }, { status: 500 })
    return NextResponse.json({ error: `Groq error: ${err?.message || JSON.stringify(err)}` }, { status: 500 })
  }
}
