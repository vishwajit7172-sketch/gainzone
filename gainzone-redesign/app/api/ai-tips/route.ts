import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const { exercise, question } = await req.json()

  const prompt = question
    ? `You are GainZone AI, a knowledgeable gym coach. Answer this question about "${exercise}": ${question}. Be concise, practical, and use plain language. Max 120 words.`
    : `You are GainZone AI, a knowledgeable gym coach. Give 3 advanced form tips for the "${exercise}" that most gym-goers miss. Format as numbered points. Each tip max 30 words. Focus on biomechanics and common mistakes.`

  try {
    const Groq = (await import('groq-sdk')).default
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 300,
    })

    return NextResponse.json({
      tip: completion.choices[0].message.content
    })
  } catch (err) {
    console.error('Groq error:', err)
    return NextResponse.json({ error: 'AI unavailable' }, { status: 500 })
  }
}
