import { HiggsfieldClient, DoPModel, InputImageType } from '@higgsfield/client'

const HF_BASE = 'https://platform.higgsfield.ai'

function getClient() {
  const apiKey = process.env.HIGGSFIELD_API_KEY
  const apiSecret = process.env.HIGGSFIELD_API_SECRET
  if (!apiKey || !apiSecret) {
    throw new Error('HIGGSFIELD_API_KEY and HIGGSFIELD_API_SECRET must be set in .env.local')
  }
  return new HiggsfieldClient({ apiKey, apiSecret })
}

export interface VideoJob {
  jobSetId: string
  status: 'queued' | 'in_progress' | 'completed' | 'failed'
  videoUrl?: string
  thumbnailUrl?: string
}

/**
 * Start a video generation from a food photo.
 * Returns immediately with the jobSetId — don't wait for completion.
 */
export async function generateVideoFromPhoto(
  imageUrl: string,
  prompt: string,
): Promise<VideoJob> {
  const client = getClient()

  const jobSet = await client.generate(
    '/v1/image2video/dop',
    {
      model: DoPModel.TURBO,
      prompt,
      input_images: [{ type: InputImageType.IMAGE_URL, image_url: imageUrl }],
    },
    { withPolling: false }, // return immediately — user will poll
  )

  return {
    jobSetId: jobSet.id,
    status: 'queued',
  }
}

/**
 * Poll the status of a video generation job.
 * Call from /api/videos/[id] on an interval from the dashboard.
 */
export async function getVideoStatus(jobSetId: string): Promise<VideoJob> {
  const apiKey = process.env.HIGGSFIELD_API_KEY!
  const apiSecret = process.env.HIGGSFIELD_API_SECRET!

  const res = await fetch(`${HF_BASE}/v1/job-sets/${jobSetId}`, {
    headers: {
      'hf-api-key': apiKey,
      'hf-secret': apiSecret,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 0 }, // never cache status checks
  })

  if (!res.ok) {
    throw new Error(`Higgsfield status check failed: ${res.status}`)
  }

  const data = await res.json()
  const jobs: Array<{ status: string; results?: { raw?: { url: string }; min?: { url: string } } }> = data.jobs ?? []

  const completed = jobs.find(j => j.status === 'completed')
  const failed = jobs.find(j => j.status === 'failed' || j.status === 'nsfw')
  const inProgress = jobs.find(j => j.status === 'in_progress')

  if (completed) {
    return {
      jobSetId,
      status: 'completed',
      videoUrl: completed.results?.raw?.url,
      thumbnailUrl: completed.results?.min?.url,
    }
  }

  if (failed) return { jobSetId, status: 'failed' }
  if (inProgress) return { jobSetId, status: 'in_progress' }

  return { jobSetId, status: 'queued' }
}
