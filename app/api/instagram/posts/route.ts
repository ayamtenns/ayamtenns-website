import { getRecentPosts } from '@/lib/instagram'
import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const limit = Number(req.nextUrl.searchParams.get('limit') ?? '10')
    const data = await getRecentPosts(limit)
    return Response.json(data)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return Response.json({ error: message }, { status: 500 })
  }
}
