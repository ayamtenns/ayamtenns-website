import { getDraft, updateDraft } from '@/lib/drafts'
import { publishToInstagram } from '@/lib/instagram'

export async function POST(req: Request) {
  const { draftId } = await req.json()

  const draft = getDraft(draftId)
  if (!draft) {
    return Response.json({ error: 'Draft not found' }, { status: 404 })
  }
  if (draft.status !== 'approved') {
    return Response.json({ error: 'Draft must be approved before publishing' }, { status: 400 })
  }

  // Build full caption with hashtags
  const hashtags = draft.hashtags.map(h => `#${h}`).join(' ')
  const fullCaption = `${draft.caption}\n\n${hashtags}`

  const result = await publishToInstagram(fullCaption, draft.imageUrl)

  if ('error' in result && result.error) {
    return Response.json({ error: result.error }, { status: 500 })
  }

  // Mark as published
  const updated = updateDraft(draftId, { status: 'published' })
  return Response.json({ success: true, igPost: result, draft: updated })
}
