'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, isTextUIPart } from 'ai'
import { useEffect, useState, useCallback, useRef } from 'react'

// ── Types ────────────────────────────────────────────────────────────────────

interface Draft {
  id: string
  caption: string
  hashtags: string[]
  scheduledFor?: string
  type: 'post' | 'story' | 'reel'
  status: 'pending' | 'approved' | 'rejected' | 'published'
  createdAt: string
  notes?: string
  assetUrl?: string
  videoJobId?: string
  videoUrl?: string
  thumbnailUrl?: string
  referenceUrls?: string[]
}

interface Asset {
  filename: string
  url: string
  uploadedAt: string
}

// ── Styles ───────────────────────────────────────────────────────────────────

const TYPE_BADGE = {
  post: 'bg-blue-100 text-blue-700',
  story: 'bg-purple-100 text-purple-700',
  reel: 'bg-orange-100 text-orange-700',
}

const STATUS_BADGE = {
  pending: 'bg-yellow-100 text-yellow-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  published: 'bg-gray-100 text-gray-500',
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function MarketingPage() {
  const [drafts, setDrafts] = useState<Draft[]>([])
  const [assets, setAssets] = useState<Asset[]>([])
  const [loadingDrafts, setLoadingDrafts] = useState(false)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [goal, setGoal] = useState('Search Pinterest for food content trends, analyze my Instagram, then create a 7-day content plan with videos.')
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { messages, sendMessage, status, clearError } = useChat({
    transport: new DefaultChatTransport({ api: '/api/agent/marketing' }),
    onFinish: () => fetchDrafts(),
  })

  const isAgentRunning = status === 'streaming' || status === 'submitted'

  const fetchDrafts = useCallback(async () => {
    setLoadingDrafts(true)
    const res = await fetch('/api/drafts')
    setDrafts(await res.json())
    setLoadingDrafts(false)
  }, [])

  const fetchAssets = useCallback(async () => {
    const res = await fetch('/api/assets')
    setAssets(await res.json())
  }, [])

  useEffect(() => {
    fetchDrafts()
    fetchAssets()
  }, [fetchDrafts, fetchAssets])

  // ── Upload ─────────────────────────────────────────────────────────────────

  const uploadFiles = async (files: FileList | File[]) => {
    setUploading(true)
    const formData = new FormData()
    Array.from(files).forEach(f => formData.append('files', f))
    await fetch('/api/assets', { method: 'POST', body: formData })
    await fetchAssets()
    setUploading(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files.length) await uploadFiles(e.dataTransfer.files)
  }

  const deleteAsset = async (filename: string) => {
    await fetch(`/api/assets?filename=${filename}`, { method: 'DELETE' })
    await fetchAssets()
  }

  // ── Draft actions ──────────────────────────────────────────────────────────

  const updateStatus = async (id: string, newStatus: Draft['status']) => {
    setActionLoading(id + newStatus)
    await fetch(`/api/drafts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    await fetchDrafts()
    setActionLoading(null)
  }

  const publishDraft = async (id: string) => {
    setActionLoading(id + 'publish')
    const res = await fetch('/api/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ draftId: id }),
    })
    const data = await res.json()
    if (data.error) alert(`Publish failed: ${data.error}`)
    await fetchDrafts()
    setActionLoading(null)
  }

  const deleteDraft = async (id: string) => {
    if (!confirm('Delete this draft?')) return
    setActionLoading(id + 'delete')
    await fetch(`/api/drafts/${id}`, { method: 'DELETE' })
    await fetchDrafts()
    setActionLoading(null)
  }

  // ── Derived ────────────────────────────────────────────────────────────────

  const pendingDrafts = drafts.filter(d => d.status === 'pending')
  const approvedDrafts = drafts.filter(d => d.status === 'approved')
  const historyDrafts = drafts.filter(d => d.status === 'rejected' || d.status === 'published')

  const lastAgentMessage = messages.filter(m => m.role === 'assistant').at(-1)
  const lastAgentText = lastAgentMessage?.parts.filter(isTextUIPart).map(p => p.text).join('\n') ?? ''

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Marketing Agent</h1>
            <p className="text-sm text-gray-400 mt-0.5">Pinterest → Higgsfield → Instagram</p>
          </div>
          <button onClick={() => { fetchDrafts(); fetchAssets() }} className="text-sm text-gray-400 hover:text-gray-600">
            ↺ Refresh
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">

        {/* ── Food Photo Assets ── */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-6 pt-5 pb-3 flex items-center justify-between">
            <div>
              <h2 className="font-medium text-gray-900">Food Photo Assets</h2>
              <p className="text-xs text-gray-400 mt-0.5">Upload your food photos — agent will generate videos from these</p>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-sm border border-gray-200 rounded-xl px-4 py-1.5 text-gray-600 hover:bg-gray-50"
            >
              + Upload
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={e => e.target.files && uploadFiles(e.target.files)}
            />
          </div>

          {/* Drop zone */}
          <div
            onDrop={handleDrop}
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            className={`mx-6 mb-4 rounded-xl border-2 border-dashed transition-colors ${dragOver ? 'border-black bg-gray-50' : 'border-gray-200'} ${assets.length === 0 ? 'py-8' : 'py-3'}`}
          >
            {assets.length === 0 ? (
              <div className="text-center">
                <p className="text-2xl mb-1">🍗</p>
                <p className="text-sm text-gray-400">Drop food photos here or click Upload</p>
                {uploading && <p className="text-xs text-gray-400 mt-1 animate-pulse">Uploading...</p>}
              </div>
            ) : (
              <div className="flex gap-2 flex-wrap px-3 py-1">
                {assets.map(a => (
                  <div key={a.filename} className="relative group w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a.url} alt={a.filename} className="w-full h-full object-cover" />
                    <button
                      onClick={() => deleteAsset(a.filename)}
                      className="absolute inset-0 bg-black/50 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                {uploading && (
                  <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center text-xs text-gray-400 animate-pulse flex-shrink-0">
                    ...
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Agent Control ── */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="font-medium text-gray-900 mb-3">Run Agent</h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={goal}
              onChange={e => setGoal(e.target.value)}
              disabled={isAgentRunning}
              className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:opacity-50"
              placeholder="What should the agent do?"
            />
            <button
              onClick={() => sendMessage({ text: goal })}
              disabled={isAgentRunning || !goal.trim()}
              className="bg-black text-white rounded-xl px-5 py-2.5 text-sm font-medium hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
            >
              {isAgentRunning ? (
                <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Running...</>
              ) : '▶ Run Agent'}
            </button>
          </div>

          {/* Pipeline indicator */}
          {isAgentRunning && (
            <div className="mt-4 flex items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse" />Pinterest</span>
              <span>→</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />Instagram</span>
              <span>→</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />Higgsfield</span>
              <span>→</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />Drafts</span>
            </div>
          )}

          {/* Agent output */}
          {lastAgentText && (
            <div className="mt-4 rounded-xl bg-gray-50 border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2 h-2 rounded-full ${isAgentRunning ? 'bg-green-400 animate-pulse' : 'bg-gray-300'}`} />
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                  {isAgentRunning ? 'Agent working…' : 'Last run'}
                </span>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{lastAgentText}</p>
            </div>
          )}

          {status === 'error' && (
            <div className="mt-3 text-sm text-red-600 bg-red-50 rounded-xl p-3 flex items-center justify-between">
              <span>Something went wrong. Check your API keys in .env.local</span>
              <button onClick={clearError} className="text-red-400 hover:text-red-600 ml-3">✕</button>
            </div>
          )}
        </div>

        {/* ── Pending Approval ── */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="font-medium text-gray-900">Pending Approval</h2>
            {pendingDrafts.length > 0 && (
              <span className="bg-yellow-100 text-yellow-700 text-xs font-medium px-2 py-0.5 rounded-full">
                {pendingDrafts.length}
              </span>
            )}
          </div>

          {loadingDrafts ? (
            <div className="text-sm text-gray-400 py-8 text-center">Loading drafts…</div>
          ) : pendingDrafts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-12 text-center">
              <p className="text-gray-400 text-sm">No drafts waiting for approval.</p>
              <p className="text-gray-300 text-xs mt-1">Upload food photos and run the agent to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingDrafts.map(d => (
                <DraftCard
                  key={d.id}
                  draft={d}
                  onApprove={() => updateStatus(d.id, 'approved')}
                  onReject={() => updateStatus(d.id, 'rejected')}
                  onDelete={() => deleteDraft(d.id)}
                  loading={actionLoading}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Approved — Ready to Post ── */}
        {approvedDrafts.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="font-medium text-gray-900">Approved — Ready to Post</h2>
              <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">
                {approvedDrafts.length}
              </span>
            </div>
            <div className="space-y-4">
              {approvedDrafts.map(d => (
                <DraftCard
                  key={d.id}
                  draft={d}
                  onPublish={() => publishDraft(d.id)}
                  onDelete={() => deleteDraft(d.id)}
                  loading={actionLoading}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── History ── */}
        {historyDrafts.length > 0 && (
          <div>
            <h2 className="font-medium text-gray-400 text-xs uppercase tracking-wide mb-3">History</h2>
            <div className="space-y-3">
              {historyDrafts.map(d => (
                <DraftCard
                  key={d.id}
                  draft={d}
                  onDelete={() => deleteDraft(d.id)}
                  loading={actionLoading}
                  compact
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

// ── Draft Card ────────────────────────────────────────────────────────────────

function DraftCard({
  draft, onApprove, onReject, onPublish, onDelete, loading, compact = false,
}: {
  draft: Draft
  onApprove?: () => void
  onReject?: () => void
  onPublish?: () => void
  onDelete?: () => void
  loading: string | null
  compact?: boolean
}) {
  const [expanded, setExpanded] = useState(false)
  const [videoStatus, setVideoStatus] = useState<'queued' | 'in_progress' | 'completed' | 'failed' | null>(
    draft.videoUrl ? 'completed' : draft.videoJobId ? 'queued' : null
  )
  const [videoUrl, setVideoUrl] = useState(draft.videoUrl)
  const [thumbnailUrl, setThumbnailUrl] = useState(draft.thumbnailUrl)

  // Poll for video status while queued / in-progress
  useEffect(() => {
    if (!draft.videoJobId || videoStatus === 'completed' || videoStatus === 'failed') return

    const poll = async () => {
      const res = await fetch(`/api/videos/${draft.videoJobId}?draftId=${draft.id}`)
      const data = await res.json()
      setVideoStatus(data.status)
      if (data.videoUrl) setVideoUrl(data.videoUrl)
      if (data.thumbnailUrl) setThumbnailUrl(data.thumbnailUrl)
    }

    poll()
    const interval = setInterval(poll, 5000) // poll every 5s
    return () => clearInterval(interval)
  }, [draft.videoJobId, draft.id, videoStatus])

  const scheduledDate = draft.scheduledFor
    ? new Date(draft.scheduledFor).toLocaleDateString('id-ID', {
        weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
      })
    : null

  const captionPreview = draft.caption.length > 140 && !expanded
    ? draft.caption.slice(0, 140) + '…'
    : draft.caption

  return (
    <div className={`bg-white rounded-2xl border border-gray-200 overflow-hidden ${compact ? 'opacity-60' : ''}`}>
      <div className="flex">

        {/* Left: video / photo preview */}
        {!compact && (draft.videoUrl || videoUrl || draft.assetUrl || thumbnailUrl) && (
          <div className="w-32 flex-shrink-0 bg-gray-100 relative">
            {(videoUrl || draft.videoUrl) ? (
              <video
                src={videoUrl ?? draft.videoUrl}
                poster={thumbnailUrl ?? draft.thumbnailUrl}
                className="w-full h-full object-cover"
                autoPlay loop muted playsInline
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={draft.assetUrl} alt="" className="w-full h-full object-cover" />
            )}
            {/* Video status badge */}
            {videoStatus && videoStatus !== 'completed' && (
              <div className="absolute bottom-1 left-1 right-1 bg-black/70 text-white text-[10px] text-center py-0.5 rounded-md">
                {videoStatus === 'failed' ? '❌ Failed' : (
                  <span className="flex items-center justify-center gap-1">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    {videoStatus === 'in_progress' ? 'Generating…' : 'Queued…'}
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        <div className="flex-1 p-5">
          {/* Badges row */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${TYPE_BADGE[draft.type]}`}>
                {draft.type}
              </span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_BADGE[draft.status]}`}>
                {draft.status}
              </span>
              {draft.videoJobId && (
                <span className="text-xs text-purple-500 bg-purple-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                  🎬 {videoStatus === 'completed' ? 'Video ready' : videoStatus === 'failed' ? 'Video failed' : 'Video generating…'}
                </span>
              )}
              {scheduledDate && (
                <span className="text-xs text-gray-400">📅 {scheduledDate}</span>
              )}
            </div>
            <button onClick={onDelete} className="text-gray-300 hover:text-red-400 text-sm shrink-0">✕</button>
          </div>

          {/* Caption */}
          <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{captionPreview}</p>
          {!compact && draft.caption.length > 140 && (
            <button onClick={() => setExpanded(!expanded)} className="text-xs text-gray-400 hover:text-gray-600 mt-1">
              {expanded ? 'Show less' : 'Show more'}
            </button>
          )}

          {/* Hashtags */}
          {!compact && draft.hashtags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {draft.hashtags.map(tag => (
                <span key={tag} className="text-xs text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Pinterest references */}
          {!compact && draft.referenceUrls && draft.referenceUrls.length > 0 && (
            <div className="mt-3">
              <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1.5">Pinterest References</p>
              <div className="flex gap-1.5">
                {draft.referenceUrls.filter(Boolean).slice(0, 5).map((url, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src={url} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                ))}
              </div>
            </div>
          )}

          {/* Strategy note */}
          {!compact && draft.notes && (
            <div className="mt-3 text-xs text-gray-400 bg-gray-50 rounded-lg px-3 py-2 italic">
              💡 {draft.notes}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      {(onApprove || onReject || onPublish) && (
        <div className="px-5 pb-4 flex gap-2 border-t border-gray-50 pt-3">
          {onApprove && (
            <button
              onClick={onApprove}
              disabled={!!loading}
              className="flex-1 bg-black text-white rounded-xl py-2 text-sm font-medium hover:bg-gray-800 disabled:opacity-40"
            >
              {loading === draft.id + 'approved' ? 'Saving…' : '✓ Approve'}
            </button>
          )}
          {onReject && (
            <button
              onClick={onReject}
              disabled={!!loading}
              className="flex-1 border border-gray-200 text-gray-600 rounded-xl py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-40"
            >
              Reject
            </button>
          )}
          {onPublish && (
            <button
              onClick={onPublish}
              disabled={!!loading}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl py-2 text-sm font-medium hover:opacity-90 disabled:opacity-40"
            >
              {loading === draft.id + 'publish' ? 'Posting…' : '📤 Post to Instagram'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
