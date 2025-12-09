import OpenAI from "openai"

export const runtime = "nodejs"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

function calculateOverallBand(criteria: any) {
  const scores = [
    criteria.task.score,
    criteria.coherence.score,
    criteria.lexical.score,
    criteria.grammar.score,
  ]

  const avg = scores.reduce((a, b) => a + b, 0) / scores.length
  return Math.round(avg * 2) / 2
}

export async function POST(req: Request) {
  try {
    const { essay, taskType, question } = await req.json()

    if (!essay || !taskType || !question) {
      return Response.json(
        { error: "essay, taskType and question are required" },
        { status: 400 }
      )
    }

    const prompt = `
You are an IELTS Writing examiner.

Task type: ${taskType}
Question:
${question}

Essay:
${essay}

Score strictly using IELTS criteria.

Return STRICT JSON ONLY:
{
  "criteria": {
    "task": { "score": 0-9, "comment": "..." },
    "coherence": { "score": 0-9, "comment": "..." },
    "lexical": { "score": 0-9, "comment": "..." },
    "grammar": { "score": 0-9, "comment": "..." }
  },
  "strengths": ["...", "..."],
  "improvements": ["...", "..."],
  "summary": "..."
}
`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.2,
      messages: [{ role: "user", content: prompt }],
    })

    const text = completion.choices[0].message.content

    let feedback
    try {
      feedback = JSON.parse(text!)
    } catch {
      console.error("AI JSON ERROR:", text)
      return Response.json(
        { error: "AI returned invalid JSON" },
        { status: 500 }
      )
    }

    const bandScore = calculateOverallBand(feedback.criteria)

    return Response.json({
      bandScore,
      ...feedback,
    })
  } catch (err) {
    console.error("ANALYZE ERROR:", err)
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
