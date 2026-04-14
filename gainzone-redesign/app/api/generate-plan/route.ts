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

  const { exercise, question, userContext } = body

  if (!exercise) {
    return NextResponse.json({ error: 'Missing exercise name' }, { status: 400 })
  }

  const userQ = question?.trim()
  const contextNote = userContext ? `User context: ${JSON.stringify(userContext)}` : ''

  const prompt = userQ
    ? `The user is asking about the exercise "${exercise}": "${userQ}". ${contextNote}
Give a concise, practical answer in 3-5 sentences. Be direct, actionable, and coach-like. No fluff.`
    : `Give expert coaching tips for the exercise "${exercise}". ${contextNote}
Cover: proper form cues, common mistakes to avoid, and one advanced tip. Keep it to 4-6 sentences max. Be direct and coach-like.`

  try {
    const Groq = (await import('groq-sdk')).default
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are an expert personal trainer and fitness coach. Give concise, practical advice. No markdown. Plain text only.',
        },
        { role: 'user', content: prompt },
      ],
      max_tokens: 400,
      temperature: 0.6,
    })

    const tip = completion.choices[0]?.message?.content?.trim()
    if (!tip) return NextResponse.json({ error: 'Empty response from AI' }, { status: 500 })

    return NextResponse.json({ tip })

  } catch (err: any) {
    console.error('Groq ai-tips error:', JSON.stringify(err))
    if (err?.status === 401) return NextResponse.json({ error: 'Invalid GROQ_API_KEY — check Vercel env vars.' }, { status: 500 })
    if (err?.status === 429) return NextResponse.json({ error: 'Rate limit hit. Wait a moment and retry.' }, { status: 500 })
    return NextResponse.json({ error: `AI error: ${err?.message || 'Unknown error'}` }, { status: 500 })
  }
}
