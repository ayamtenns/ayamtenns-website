import fs from 'fs'
import path from 'path'

const DRAFTS_FILE = path.join(process.cwd(), 'drafts.json')

export type DraftStatus = 'pending' | 'approved' | 'rejected' | 'published'
export type DraftType = 'post' | 'story' | 'reel'

export interface Draft {
  id: string
  caption: string
  hashtags: string[]
  scheduledFor?: string
  type: DraftType
  status: DraftStatus
  createdAt: string
  notes?: string
  // Source asset (food photo uploaded by user)
  imageUrl?: string
  assetUrl?: string
  // Higgsfield video generation
  videoJobId?: string
  videoUrl?: string
  thumbnailUrl?: string
  // Pinterest references used for this content
  referenceUrls?: string[]
}

function read(): Draft[] {
  try {
    if (!fs.existsSync(DRAFTS_FILE)) return []
    return JSON.parse(fs.readFileSync(DRAFTS_FILE, 'utf-8'))
  } catch {
    return []
  }
}

function write(drafts: Draft[]) {
  fs.writeFileSync(DRAFTS_FILE, JSON.stringify(drafts, null, 2))
}

export function getAllDrafts(): Draft[] {
  return read().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function getDraft(id: string): Draft | undefined {
  return read().find(d => d.id === id)
}

export function createDraft(data: Omit<Draft, 'id' | 'createdAt' | 'status'>): Draft {
  const drafts = read()
  const draft: Draft = {
    ...data,
    id: crypto.randomUUID(),
    status: 'pending',
    createdAt: new Date().toISOString(),
  }
  drafts.push(draft)
  write(drafts)
  return draft
}

export function updateDraft(id: string, update: Partial<Draft>): Draft {
  const drafts = read()
  const idx = drafts.findIndex(d => d.id === id)
  if (idx === -1) throw new Error('Draft not found')
  drafts[idx] = { ...drafts[idx], ...update }
  write(drafts)
  return drafts[idx]
}

export function deleteDraft(id: string): void {
  write(read().filter(d => d.id !== id))
}
