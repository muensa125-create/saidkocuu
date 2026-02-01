import { NextResponse } from 'next/server'

export const runtime = 'edge'
export const revalidate = 300 // 5 dakika cache

interface StatsResponse {
  discord: number | null
  youtube: number | null
  error?: string
}

export async function GET() {
  const stats: StatsResponse = {
    discord: null,
    youtube: null,
  }

  try {
    // Discord üye sayısını al
    const discordInviteCode = 'gelisim-anahtari-gecmisolsun-1021011873753219122'
    try {
      // Discord API veya invite API kullanarak üye sayısını al
      // Not: Discord'un public invite API'si sınırlıdır, bu yüzden fallback değer kullanıyoruz
      const discordResponse = await fetch(
        `https://discord.com/api/v10/invites/${discordInviteCode}?with_counts=true`,
        {
          headers: {
            'User-Agent': 'Mozilla/5.0',
          },
        }
      )

      if (discordResponse.ok) {
        const discordData = await discordResponse.json()
        stats.discord = discordData.approximate_member_count || 1325
      } else {
        // Fallback değer
        stats.discord = 1325
      }
    } catch (error) {
      console.error('Discord API hatası:', error)
      stats.discord = 1325 // Fallback değer
    }

    // YouTube abone sayısını al
    const youtubeChannelId = '@saidkocu'
    const youtubeApiKey = process.env.YOUTUBE_API_KEY

    if (youtubeApiKey) {
      try {
        // Önce channel ID'yi al
        const channelSearchResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(youtubeChannelId)}&type=channel&key=${youtubeApiKey}`,
          { next: { revalidate: 3600 } }
        )

        if (channelSearchResponse.ok) {
          const channelSearchData = await channelSearchResponse.json()
          const channelId = channelSearchData.items?.[0]?.snippet?.channelId

          if (channelId) {
            // Channel istatistiklerini al
            const statsResponse = await fetch(
              `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${youtubeApiKey}`,
              { next: { revalidate: 3600 } }
            )

            if (statsResponse.ok) {
              const statsData = await statsResponse.json()
              const subscriberCount = parseInt(
                statsData.items?.[0]?.statistics?.subscriberCount || '1786'
              )
              stats.youtube = subscriberCount
            } else {
              stats.youtube = 1786 // Fallback değer
            }
          } else {
            stats.youtube = 1786 // Fallback değer
          }
        } else {
          stats.youtube = 1786 // Fallback değer
        }
      } catch (error) {
        console.error('YouTube API hatası:', error)
        stats.youtube = 1786 // Fallback değer
      }
    } else {
      // API key yoksa fallback değer
      stats.youtube = 1786
    }

    return NextResponse.json(stats, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    })
  } catch (error) {
    console.error('Stats API hatası:', error)
    // Hata durumunda fallback değerler
    return NextResponse.json(
      {
        discord: 1325,
        youtube: 1786,
        error: 'Stats güncellenirken hata oluştu',
      },
      {
        status: 200, // Hata olsa bile fallback değerleri döndür
        headers: {
          'Cache-Control': 'public, s-maxage=60',
        },
      }
    )
  }
}
