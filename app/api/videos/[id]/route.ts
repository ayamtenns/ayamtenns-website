import { getVideoStatus } from '@/lib/higgsfield'
import { updateDraft } from '@/lib/drafts'

interface Params {
  params: Promise<{ id: string }>
}

// GET /api/videos/[jobSetId] — poll video generation status
// Also auto-updates the matching draft when video is complete
export async function GET(req: Request, { params }: Params) {
  const { id: jobSetId } = await params

  try {
    const job = await getVideoStatus(jobSetId)

    // Auto-update any draft that references this job
    if (job.status === 'completed' && job.videoUrl) {
      const url = new URL(req.url)
      const draftId = url.searchParams.get('draftId')
      if (draftId) {
        try {
          updateDraft(draftId, {
            videoUrl: job.videoUrl,
            thumbnailUrl: job.thumbnailUrl,
          })
        } catch {
          // Draft may already be updated or deleted — ignore
        }
      }
    }

    return Response.json(job)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return Response.json({ error: message }, { status: 500 })
  }
}
