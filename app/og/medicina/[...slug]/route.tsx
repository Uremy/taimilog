import { getPageImage, source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';

// 👇 CAMBIO: Remover edge runtime
// export const runtime = 'edge'; ❌ QUITAR ESTA LÍNEA

const primaryColor = '#8F2439';
const primaryColorLight = '#E87D95';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));

  if (!page) notFound();

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#09090b',
          color: 'white',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: '-20%',
            left: 0,
            right: 0,
            height: '60%',
            background: `linear-gradient(to top, ${primaryColor} 0%, transparent 100%)`,
            opacity: 0.4,
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '64px',
            height: '100%',
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  fontSize: 72,
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  marginBottom: '16px',
                  maxWidth: '900px',
                }}
              >
                {page.data.title}
              </div>
              <div
                style={{
                  width: '120px',
                  height: '6px',
                  backgroundColor: primaryColorLight,
                  borderRadius: '4px',
                }}
              />
            </div>

            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke={primaryColorLight}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>

          <div style={{ flexGrow: 1 }} />

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                fontSize: 36,
                color: '#a1a1aa',
                fontWeight: 500,
                maxWidth: '80%',
                lineHeight: 1.4,
              }}
            >
              {page.data.description || 'Apuntes de medicina'}
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '32px',
                gap: '12px',
              }}
            >
              <div style={{ fontSize: 24, fontWeight: 600, color: 'white' }}>
                Taimilog
              </div>
              <div
                style={{
                  width: '4px',
                  height: '4px',
                  backgroundColor: '#52525b',
                  borderRadius: '50%',
                }}
              />
              <div style={{ fontSize: 24, color: '#71717a' }}>Medicina</div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    slug: getPageImage(page).segments,
  }));
}