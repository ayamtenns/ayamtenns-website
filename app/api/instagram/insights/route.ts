import { getIGInsights } from '@/lib/instagram'

export async function GET() {
  try {
    const data = await getIGInsights()
    return Response.json(data)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return Response.json({ error: message }, { status: 500 })
  }
}
