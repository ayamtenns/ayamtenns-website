const PINTEREST_BASE = 'https://api.pinterest.com/v5'

export interface PinReference {
  id: string
  title: string
  description?: string
  imageUrl?: string
  link?: string
}

/**
 * Search Pinterest for content references.
 * Requires PINTEREST_ACCESS_TOKEN in .env.local.
 * Get it from developers.pinterest.com
 */
export async function searchPinterest(query: string, limit = 8): Promise<PinReference[]> {
  const token = process.env.PINTEREST_ACCESS_TOKEN

  if (!token) {
    // Return helpful placeholder when not configured yet
    return [
      {
        id: 'placeholder',
        title: 'Pinterest not connected',
        description: 'Add PINTEREST_ACCESS_TOKEN to .env.local to enable Pinterest search.',
      },
    ]
  }

  try {
    const params = new URLSearchParams({
      query,
      page_size: String(limit),
      fields: 'id,title,description,media,link',
    })

    const res = await fetch(`${PINTEREST_BASE}/pins/search?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 }, // cache 1 hour
    })

    if (!res.ok) {
      throw new Error(`Pinterest API error: ${res.status}`)
    }

    const data = await res.json()
    const pins: Array<{
      id: string
      title?: string
      description?: string
      media?: { images?: { '600x'?: { url: string } } }
      link?: string
    }> = data.items ?? []

    return pins.map(pin => ({
      id: pin.id,
      title: pin.title ?? 'Pinterest Pin',
      description: pin.description,
      imageUrl: pin.media?.images?.['600x']?.url,
      link: pin.link,
    }))
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Pinterest search failed:', message)
    return []
  }
}
