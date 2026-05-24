import { getDraft, updateDraft, deleteDraft } from '@/lib/drafts'

interface Params {
  params: Promise<{ id: string }>
}

export async function GET(_req: Request, { params }: Params) {
  const { id } = await params
  const draft = getDraft(id)
  if (!draft) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(draft)
}

export async function PATCH(req: Request, { params }: Params) {
  const { id } = await params
  const body = await req.json()
  try {
    const draft = updateDraft(id, body)
    return Response.json(draft)
  } catch {
    return Response.json({ error: 'Not found' }, { status: 404 })
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  const { id } = await params
  try {
    deleteDraft(id)
    return Response.json({ success: true })
  } catch {
    return Response.json({ error: 'Not found' }, { status: 404 })
  }
}
