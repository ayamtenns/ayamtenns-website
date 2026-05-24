import { NextRequest } from 'next/server'
import fs from 'fs'
import path from 'path'

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'food')

function ensureDir() {
  if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true })
}

// GET /api/assets — list uploaded food photos
export async function GET() {
  ensureDir()
  const files = fs.readdirSync(UPLOAD_DIR)
    .filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f))
    .map(f => ({
      filename: f,
      url: `/uploads/food/${f}`,
      uploadedAt: fs.statSync(path.join(UPLOAD_DIR, f)).mtime.toISOString(),
    }))
    .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())

  return Response.json(files)
}

// POST /api/assets — upload one or more food photos
export async function POST(req: NextRequest) {
  ensureDir()

  const formData = await req.formData()
  const files = formData.getAll('files') as File[]

  if (!files.length) {
    return Response.json({ error: 'No files provided' }, { status: 400 })
  }

  const uploaded: Array<{ filename: string; url: string }> = []

  for (const file of files) {
    if (!file.type.startsWith('image/')) continue

    const ext = file.name.split('.').pop() ?? 'jpg'
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const filepath = path.join(UPLOAD_DIR, filename)

    const bytes = await file.arrayBuffer()
    fs.writeFileSync(filepath, Buffer.from(bytes))

    uploaded.push({ filename, url: `/uploads/food/${filename}` })
  }

  return Response.json({ uploaded }, { status: 201 })
}

// DELETE /api/assets?filename=xxx
export async function DELETE(req: NextRequest) {
  const filename = req.nextUrl.searchParams.get('filename')
  if (!filename || filename.includes('..')) {
    return Response.json({ error: 'Invalid filename' }, { status: 400 })
  }

  const filepath = path.join(UPLOAD_DIR, filename)
  if (fs.existsSync(filepath)) fs.unlinkSync(filepath)

  return Response.json({ success: true })
}
