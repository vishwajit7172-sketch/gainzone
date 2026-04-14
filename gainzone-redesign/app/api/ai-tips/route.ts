import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const { exercise, question, userContext } = await req.json()

  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json({ error: 'GROQ_API_KEY not set' }, { status: 500 })
  }

  const ctx = userContext ? `\nUser profile: ${userContext}` : ''

  const prompt = question
    ? `You are GainZone AI, an expert gym coach.${ctx}\n\nAnswer this question about the "${exercise}" exercise: ${question}\n\nBe specific, practical and concise. Max 150 words.`
    : `You are GainZone AI, an expert gym coach.${ctx}\n\nGive exactly 3 advanced form tips for the "${exercise}" exercise that most gym-goers miss. Focus on biomechanics, common mistakes, and technique cues.\n\nFormat:\n1. [tip]\n2. [tip]\n3. [tip]\n\nEach tip should be 25-40 words. Be specific and actionable.`

  try {
    const Groq = (await import('groq-sdk')).default
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: 'You are an expert gym coach. Always respond with helpful, specific fitness advice.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 400,
      temperature: 0.7,
    })

    const content = completion.choices[0]?.message?.content
    if (!content || content.trim().length === 0) {
      return NextResponse.json({ tip: 'Could not generate tips. Please try again.' })
    }

    return NextResponse.json({ tip: content.trim() })
  } catch (err: any) {
    console.error('Groq error:', err)
    if (err?.status === 429) return NextResponse.json({ tip: 'Rate limit reached. Please wait a moment and try again.' })
    if (err?.status === 401) return NextResponse.json({ tip: 'API key invalid. Please check your GROQ_API_KEY in Vercel settings.' })
    return NextResponse.json({ tip: 'AI coach is temporarily unavailable. Please try again.' })
  }
}
