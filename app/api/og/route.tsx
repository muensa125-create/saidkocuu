import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'Said Koçu | Gelişim ve Teknoloji'

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          fontSize: 64,
          color: 'white',
          background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
          width: '100%',
          height: '100%',
          padding: '80px',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 20%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <p
            style={{
              margin: 0,
              marginBottom: 30,
              fontSize: 72,
              fontWeight: 400,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </p>
          <div
            style={{
              fontSize: 28,
              marginTop: 40,
              opacity: 0.7,
              fontWeight: 300,
              letterSpacing: '0.05em',
            }}
          >
            saidkocu.com
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
