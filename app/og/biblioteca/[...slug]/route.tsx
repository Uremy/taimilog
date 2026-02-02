import { getBibliotecaPageImage, sourceBiblioteca } from '@/lib/source';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';

// 👇 CAMBIO: Remover edge runtime
// export const runtime = 'edge'; ❌ QUITAR ESTA LÍNEA

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const page = sourceBiblioteca.getPage(slug.slice(0, -1));

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
            background: 'linear-gradient(to top, #7c3aed 0%, transparent 100%)',
            opacity: 0.3,
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
                  backgroundColor: '#a78bfa',
                  borderRadius: '4px',
                }}
              />
            </div>

            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#a78bfa"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
              <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
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
              {page.data.description || 'Reflexiones y notas personales'}
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
              <div style={{ fontSize: 24, color: '#71717a' }}>Biblioteca</div>
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
  return sourceBiblioteca.getPages().map((page) => ({
    slug: getBibliotecaPageImage(page).segments,
  }));
}