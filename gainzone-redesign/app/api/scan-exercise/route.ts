import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json({ error: 'GROQ_API_KEY not set' }, { status: 500 })
  }

  const { imageBase64, userContext } = await req.json()
  if (!imageBase64) {
    return NextResponse.json({ error: 'No image provided' }, { status: 400 })
  }

  const ctx = userContext ? `\nUser profile: ${userContext}` : ''

  const prompt = `You are GainZone AI, an expert gym coach and personal trainer.${ctx}

Analyze this image and identify what you see. It could be:
- A gym machine or equipment
- Someone performing an exercise
- A person's workout form/posture
- A gym environment

Respond in this exact JSON format with no markdown, no extra text:
{
  "identified": "Name of the machine/exercise/what you see",
  "category": "machine" or "exercise" or "form_check" or "equipment" or "unknown",
  "confidence": "high" or "medium" or "low",
  "description": "1-2 sentence description of what it is",
  "primaryMuscles": ["muscle1", "muscle2"],
  "howToUse": ["step 1", "step 2", "step 3"],
  "formTips": ["tip 1", "tip 2", "tip 3"],
  "commonMistakes": ["mistake 1", "mistake 2"],
  "difficulty": "Beginner" or "Intermediate" or "Advanced",
  "formFeedback": "If this shows someone exercising, give specific form feedback. Otherwise leave empty string.",
  "personalizedTip": "A tip tailored to the user profile if available, otherwise general tip"
}`

  try {
    const Groq = (await import('groq-sdk')).default
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

    const completion = await groq.chat.completions.create({
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`,
              },
            },
            {
              type: 'text',
              text: prompt,
            },
          ],
        },
      ],
      max_tokens: 800,
      temperature: 0.3,
    })

    const raw = completion.choices[0]?.message?.content
    if (!raw) return NextResponse.json({ error: 'Empty response' }, { status: 500 })

    // Extract JSON
    const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/)
    const jsonStr = fenced ? fenced[1].trim() : raw.trim()
    const start = jsonStr.indexOf('{')
    const end = jsonStr.lastIndexOf('}')
    const clean = start !== -1 ? jsonStr.slice(start, end + 1) : jsonStr

    try {
      const result = JSON.parse(clean)
      return NextResponse.json(result)
    } catch {
      // If JSON parse fails, return structured error
      return NextResponse.json({
        identified: 'Unable to identify',
        category: 'unknown',
        confidence: 'low',
        description: raw.slice(0, 200),
        primaryMuscles: [],
        howToUse: [],
        formTips: [],
        commonMistakes: [],
        difficulty: 'Unknown',
        formFeedback: '',
        personalizedTip: 'Try taking a clearer photo with good lighting.'
      })
    }

  } catch (err: any) {
    console.error('Vision error:', err)
    if (err?.status === 429) return NextResponse.json({ error: 'Rate limit. Please wait and try again.' }, { status: 429 })
    return NextResponse.json({ error: err?.message || 'Vision AI unavailable' }, { status: 500 })
  }
}
