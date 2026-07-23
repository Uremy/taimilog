import { OG_SOURCES, type OgSourceKey } from './sources';
import { OgGlyph } from './glyph';

const BG = '#09090b';
const FG = '#f5f0f2';
const BORDER = '#27272a';

// Etiquetas 100% funcionales, en español y sin kanjis ni rellenos innecesarios
const SYS_TAGS: Record<OgSourceKey, { code: string; dewey: string; sublabel: string; footerLeft: string }> = {
  homepage: { 
    code: 'SYS.ROOT', 
    dewey: 'COORD: 42', 
    sublabel: 'JARDÍN DIGITAL',
    footerLeft: '¡Bienvenido!'
  },
  medicina: { 
    code: 'SYS.MED', 
    dewey: 'DEWEY 610', 
    sublabel: 'APUNTES',
    footerLeft: 'APUNTES DE MEDICINA'
  },
  biblioteca: { 
    code: 'SYS.LIT', 
    dewey: 'DEWEY 100', 
    sublabel: 'BIBLIOTECA',
    footerLeft: 'BIBLIOTECA PERSONAL'
  },
};

export function generate({
  source,
  title,
  description,
}: {
  source: OgSourceKey;
  title: string;
  description?: string;
}) {
  const { label, primary, primaryLight } = OG_SOURCES[source];
  const sys = SYS_TAGS[source];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: BG,
        position: 'relative',
        border: `12px solid ${BG}`,
      }}
    >
      {/* Fondo de puntos SVG */}
      <svg
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        width="100%"
        height="100%"
      >
        <defs>
          <pattern id="dot-grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill={BORDER} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" />
      </svg>

      {/* Marco perimetral tipo Blueprint */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          left: 12,
          right: 12,
          bottom: 12,
          border: `1px solid ${BORDER}`,
          display: 'flex',
        }}
      />

      {/* Corner Marks (Escuadras técnicas) */}
      <div style={{ position: 'absolute', top: 8, left: 8, width: 16, height: 16, borderTop: `2px solid ${primaryLight}`, borderLeft: `2px solid ${primaryLight}` }} />
      <div style={{ position: 'absolute', top: 8, right: 8, width: 16, height: 16, borderTop: `2px solid ${primaryLight}`, borderRight: `2px solid ${primaryLight}` }} />
      <div style={{ position: 'absolute', bottom: 8, left: 8, width: 16, height: 16, borderBottom: `2px solid ${primaryLight}`, borderLeft: `2px solid ${primaryLight}` }} />
      <div style={{ position: 'absolute', bottom: 8, right: 8, width: 16, height: 16, borderBottom: `2px solid ${primaryLight}`, borderRight: `2px solid ${primaryLight}` }} />

      {/* HEADER */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '36px 56px',
          borderBottom: `1px solid ${BORDER}`,
          zIndex: 1,
          backgroundColor: `${BG}ee`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <OgGlyph color={primaryLight} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span
              style={{
                fontFamily: 'Atkinson Hyperlegible',
                fontSize: 22,
                letterSpacing: 4,
                color: FG,
                fontWeight: 700,
              }}
            >
              TAIMILOG
            </span>
            <span
              style={{
                fontFamily: 'Atkinson Hyperlegible',
                fontSize: 11,
                letterSpacing: 2,
                color: `${FG}77`,
              }}
            >
              {`// ${sys.code} · ${sys.dewey}`}
            </span>
          </div>
        </div>

        {/* Badge Técnico funcional (Sin Kanjis) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            backgroundColor: `${primary}33`,
            border: `1px solid ${primaryLight}`,
          }}
        >
          <div style={{ width: 6, height: 6, backgroundColor: primaryLight }} />
          <span
            style={{
              fontFamily: 'Atkinson Hyperlegible',
              fontSize: 14,
              letterSpacing: 3,
              color: primaryLight,
              fontWeight: 700,
            }}
          >
            {`[ ${label} // ${sys.sublabel} ]`}
          </span>
        </div>
      </div>

      {/* CUERPO CENTRAL */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 56px',
          gap: 20,
          zIndex: 1,
        }}
      >
        <h1
          style={{
            fontFamily: 'Unbounded',
            fontSize: title.length > 50 ? 46 : title.length > 35 ? 54 : 62,
            fontWeight: 700,
            color: FG,
            lineHeight: 1.15,
            margin: 0,
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            lineClamp: 3,
            overflow: 'hidden',
          }}
        >
          {title}
        </h1>
        {description && (
          <p
            style={{
              fontFamily: 'Atkinson Hyperlegible',
              fontSize: 24,
              color: `${FG}aa`,
              margin: 0,
              maxWidth: '90%',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              lineClamp: 2,
              overflow: 'hidden',
            }}
          >
            {description}
          </p>
        )}
      </div>

      {/* FOOTER FUNCIONAL Y SOBRIO */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 56px',
          borderTop: `1px solid ${BORDER}`,
          backgroundColor: `${BG}ee`,
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontFamily: 'Atkinson Hyperlegible',
            fontSize: 13,
            letterSpacing: 2,
            color: `${FG}88`,
          }}
        >
          {sys.footerLeft}
        </span>
        <span
          style={{
            fontFamily: 'Atkinson Hyperlegible',
            fontSize: 13,
            letterSpacing: 2,
            color: primaryLight,
            fontWeight: 700,
          }}
        >
          TAIMILOG · UREMY
        </span>
      </div>

      {/* Barra de acento inferior */}
      <div style={{ display: 'flex', height: 6, backgroundColor: primaryLight, zIndex: 1 }} />
    </div>
  );
}