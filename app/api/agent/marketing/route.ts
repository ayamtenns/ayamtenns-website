import { streamText, stepCountIs, tool, convertToModelMessages } from 'ai'
import { createAnthropic } from '@ai-sdk/anthropic'
import { z } from 'zod'
import { getIGInsights, getRecentPosts } from '@/lib/instagram'
import { createDraft } from '@/lib/drafts'
import { searchPinterest } from '@/lib/pinterest'
import { generateVideoFromPhoto } from '@/lib/higgsfield'
import fs from 'fs'
import path from 'path'

const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

const SYSTEM = `You are a professional Instagram marketing strategist and content director for a food brand.

Your full workflow:
1. Call search_pinterest with relevant food queries to gather visual reference trends
2. Call get_insights to understand the account's current performance
3. Call get_recent_posts to see what content has worked before
4. Call list_assets to see what food photos the user has uploaded
5. Create a 7-day content plan:
   - For each day: call generate_video if a food photo asset is available (pick the most relevant one)
   - Always call create_draft for each day with caption, hashtags, and all context

Content strategy rules:
- Captions: human, authentic, conversational Indonesian or English matching brand tone
- Hashtags: 5 big (1M+ posts), 10 medium (100K–1M), 10 niche (<100K) — no # symbol
- Video prompts: cinematic, appetizing — e.g. "Slow push-in on the dish, steam rising, warm golden light, bokeh background"
- Use Pinterest references to inform the visual style and content angle
- Base strategy on real IG performance data, not generic advice
- Notes field: explain WHY this content will perform well based on the data`

export async function POST(req: Request) {
  const body = await req.json()

  const messages = body.messages?.length
    ? await convertToModelMessages(body.messages)
    : [{ role: 'user' as const, content: body.goal ?? 'Search Pinterest for food content trends, analyze my Instagram, and create a 7-day content plan with videos and captions.' }]

  const result = streamText({
    model: anthropic('claude-sonnet-4-6'),
    system: SYSTEM,
    messages,
    stopWhen: stepCountIs(25),
    tools: {

      // ── 1. Pinterest reference search ──────────────────────────────────
      search_pinterest: tool({
        description: 'Search Pinterest for visual reference content to inspire the content plan. Search for food photography styles, trending presentation ideas, and successful food content formats.',
        inputSchema: z.object({
          query: z.string().describe('Search query, e.g. "aesthetic food photography", "ayam goreng reels", "restaurant food styling"'),
          limit: z.number().min(1).max(10).default(6),
        }),
        execute: async ({ query, limit }) => searchPinterest(query, limit),
      }),

      // ── 2. Instagram insights ──────────────────────────────────────────
      get_insights: tool({
        description: 'Fetch Instagram account metrics: followers, reach, impressions, profile views for last 7 days',
        inputSchema: z.object({}),
        execute: async () => getIGInsights(),
      }),

      // ── 3. Recent posts performance ────────────────────────────────────
      get_recent_posts: tool({
        description: 'Get recent posts with engagement metrics to see what content formats perform best',
        inputSchema: z.object({
          limit: z.number().min(1).max(20).default(10),
        }),
        execute: async ({ limit }) => getRecentPosts(limit),
      }),

      // ── 4. List uploaded food photo assets ─────────────────────────────
      list_assets: tool({
        description: 'List food photo assets the user has uploaded. Use these as source images for video generation.',
        inputSchema: z.object({}),
        execute: async () => {
          const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'food')
          if (!fs.existsSync(uploadDir)) return { assets: [], count: 0 }

          const files = fs.readdirSync(uploadDir)
            .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
            .map(f => ({
              filename: f,
              // Use NEXT_PUBLIC_APP_URL or construct a public URL
              url: `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/uploads/food/${f}`,
              uploadedAt: fs.statSync(path.join(uploadDir, f)).mtime.toISOString(),
            }))
            .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())

          return { assets: files, count: files.length }
        },
      }),

      // ── 5. Generate video from food photo (Higgsfield) ─────────────────
      generate_video: tool({
        description: 'Generate a cinematic product video from a food photo using Higgsfield AI. Use for reels or video posts.',
        inputSchema: z.object({
          imageUrl: z.string().url().describe('Public URL of the food photo asset to animate'),
          prompt: z.string().describe('Cinematic camera movement description. E.g. "Slow push-in on the crispy chicken, steam rising, warm amber restaurant lighting, shallow depth of field"'),
          forDraftId: z.string().optional().describe('Draft ID this video is for, so the result can be linked automatically'),
        }),
        execute: async ({ imageUrl, prompt }) => {
          const higgsfieldEnabled = !!(process.env.HIGGSFIELD_API_KEY && process.env.HIGGSFIELD_API_SECRET)
          if (!higgsfieldEnabled) {
            return {
              success: false,
              error: 'HIGGSFIELD_API_KEY / HIGGSFIELD_API_SECRET not set — add to .env.local',
            }
          }
          const job = await generateVideoFromPhoto(imageUrl, prompt)
          return {
            success: true,
            jobSetId: job.jobSetId,
            status: job.status,
            message: 'Video queued. Will be ready in ~30–90 seconds. Pass jobSetId to create_draft.',
          }
        },
      }),

      // ── 6. Save draft for approval ─────────────────────────────────────
      create_draft: tool({
        description: 'Save a content draft to the approval queue. User will review, approve, then post to Instagram.',
        inputSchema: z.object({
          caption: z.string().describe('Full caption text (no hashtags)'),
          hashtags: z.array(z.string()).describe('Hashtags WITHOUT #, e.g. ["ayam", "kuliner"]'),
          type: z.enum(['post', 'story', 'reel']),
          scheduledFor: z.string().optional().describe('Suggested posting time — ISO 8601'),
          notes: z.string().optional().describe('Strategy rationale: why this content, why this time'),
          assetUrl: z.string().optional().describe('Food photo URL used for this post'),
          videoJobId: z.string().optional().describe('Higgsfield jobSetId if a video was generated'),
          referenceUrls: z.array(z.string()).optional().describe('Pinterest reference image URLs that inspired this content'),
        }),
        execute: async (data) => {
          const draft = createDraft(data)
          return { success: true, draftId: draft.id }
        },
      }),

    },
  })

  return result.toUIMessageStreamResponse()
}
