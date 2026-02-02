import { ImageResponse } from 'next/og';

const primaryColor = '#8F2439';
const primaryColorLight = '#E87D95';

export async function GET() {
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
        {/* Gradiente de fondo */}
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
            alignItems: 'center',
            justifyContent: 'center',
            padding: '64px',
            height: '100%',
            zIndex: 10,
            textAlign: 'center',
          }}
        >
          {/* Logo/Icono principal */}
          <svg
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            stroke={primaryColorLight}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginBottom: '32px' }}
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>

          {/* Título principal */}
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              marginBottom: '24px',
            }}
          >
            Taimilog
          </div>

          {/* Subtítulo */}
          <div
            style={{
              fontSize: 42,
              color: '#a1a1aa',
              fontWeight: 500,
              maxWidth: '800px',
              lineHeight: 1.3,
              marginBottom: '48px',
            }}
          >
            Apuntes de medicina y jardín digital
          </div>

          {/* Badges de secciones */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <div
              style={{
                padding: '12px 24px',
                backgroundColor: 'rgba(143, 36, 57, 0.2)',
                border: `2px solid ${primaryColorLight}`,
                borderRadius: '12px',
                fontSize: 20,
                color: primaryColorLight,
              }}
            >
              Medicina
            </div>
            <div
              style={{
                padding: '12px 24px',
                backgroundColor: 'rgba(124, 58, 237, 0.2)',
                border: '2px solid #a78bfa',
                borderRadius: '12px',
                fontSize: 20,
                color: '#a78bfa',
              }}
            >
              Biblioteca
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              position: 'absolute',
              bottom: '48px',
              fontSize: 20,
              color: '#71717a',
            }}
          >
            우주
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