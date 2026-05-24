import { getAllDrafts, createDraft } from '@/lib/drafts'

export async function GET() {
  return Response.json(getAllDrafts())
}

export async function POST(req: Request) {
  const body = await req.json()
  const draft = createDraft(body)
  return Response.json(draft, { status: 201 })
}
