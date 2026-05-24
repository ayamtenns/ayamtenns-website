const IG_BASE = 'https://graph.facebook.com/v19.0'

function getCredentials() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  const accountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID
  if (!token || !accountId) {
    throw new Error('Instagram credentials not configured. Set INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_BUSINESS_ACCOUNT_ID in .env.local')
  }
  return { token, accountId }
}

export async function getIGInsights() {
  const { token, accountId } = getCredentials()

  // Basic account info
  const accountRes = await fetch(
    `${IG_BASE}/${accountId}?fields=followers_count,media_count,website,biography,name,username&access_token=${token}`
  )
  const account = await accountRes.json()

  // Last 7 days insights
  const until = Math.floor(Date.now() / 1000)
  const since = until - 7 * 24 * 60 * 60

  const insightsRes = await fetch(
    `${IG_BASE}/${accountId}/insights?metric=impressions,reach,profile_views&period=day&since=${since}&until=${until}&access_token=${token}`
  )
  const insights = await insightsRes.json()

  return {
    account,
    insights_last_7_days: insights.data ?? [],
  }
}

export async function getRecentPosts(limit = 10) {
  const { token, accountId } = getCredentials()

  const fields = 'id,caption,media_type,timestamp,like_count,comments_count,permalink'
  const res = await fetch(
    `${IG_BASE}/${accountId}/media?fields=${fields}&limit=${limit}&access_token=${token}`
  )
  const data = await res.json()
  return data.data ?? []
}

export async function publishToInstagram(caption: string, imageUrl?: string) {
  const { token, accountId } = getCredentials()

  if (!imageUrl) {
    // Text/caption-only posts aren't supported directly — would need an image
    return { error: 'Instagram requires an image or video. Please provide imageUrl.' }
  }

  // Step 1: Create media container
  const containerRes = await fetch(`${IG_BASE}/${accountId}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      image_url: imageUrl,
      caption,
      access_token: token,
    }),
  })
  const container = await containerRes.json()

  if (container.error) return { error: container.error.message }

  // Step 2: Publish the container
  const publishRes = await fetch(`${IG_BASE}/${accountId}/media_publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      creation_id: container.id,
      access_token: token,
    }),
  })
  return publishRes.json()
}
