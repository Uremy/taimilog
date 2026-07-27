import Image from 'next/image';
import Link from 'next/link';
import { 
  AlertTriangle, 
  ArrowLeft, 
  BookOpenText, 
  Fingerprint, 
  Radio, 
  Cpu,
  Activity,
  Terminal,
  Compass
} from 'lucide-react';

/** Cortes de esquina reutilizables — lenguaje "blueprint / avant-garde" */
const NOTCH_LG = '[clip-path:polygon(0_0,100%_0,100%_calc(100%-22px),calc(100%-22px)_100%,0_100%)]';
const NOTCH_SM = '[clip-path:polygon(0_0,100%_0,100%_calc(100%-14px),calc(100%-14px)_100%,0_100%)]';
const GLOW_HOVER = 'hover:shadow-[0_0_44px_-16px_color-mix(in_oklch,var(--color-fd-primary)_50%,transparent)]';

export default function NotFound() {
  return (
    <div className="relative min-h-[88vh] w-full flex flex-col justify-between bg-fd-background text-fd-foreground antialiased selection:bg-fd-primary selection:text-fd-primary-foreground p-4 sm:p-8 lg:px-12 overflow-hidden">
      
      {/* Fondo, grilla arquitectónica y scanline de alta frecuencia (6s) */}
      <div
        aria-hidden="true"
        role="presentation"
        className="fixed inset-0 -z-10 pointer-events-none flex justify-center select-none overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[60vh] bg-gradient-to-tr from-fd-primary/10 via-transparent to-transparent blur-3xl opacity-70" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.06)_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div className="absolute left-0 right-0 h-px bg-fd-primary/30 animate-[scan_6s_linear_infinite]" />
      </div>

      {/* Contenedor Principal (Consola NERV 3 Niveles) */}
      <div className="max-w-[1360px] w-full mx-auto my-auto py-6 space-y-6 sm:space-y-8">
        
        {/* NIVEL 1: CABECERA DE ALERTA (Abarca el 100% del ancho) */}
        <div className="space-y-4 border-b border-fd-border/60 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-fd-muted border border-fd-border font-mono text-[11px] sm:text-xs text-fd-muted-foreground uppercase tracking-[0.2em] select-none">
            <AlertTriangle className="w-3.5 h-3.5 text-fd-primary animate-pulse" />
            <span>SYS_ALERT &#47;&#47; VECTOR_NOT_FOUND</span>
            <span className="text-fd-primary border-l border-fd-border/60 pl-2 font-bold">ERR: 404</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h1 className="font-[family-name:var(--font-display)] text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85] text-fd-foreground select-none">
              Vacío <span className="text-fd-primary font-normal">404</span>
            </h1>
            
            <p className="font-mono text-xs sm:text-sm text-fd-muted-foreground uppercase tracking-widest flex items-center gap-2 pb-1">
              <Radio className="w-3.5 h-3.5 text-fd-primary animate-spin" />
              <span>COORDENADA PERDIDA EN EL MAR DE ESTRELLAS ( ◎ _ ◎ ;)</span>
            </p>
          </div>
        </div>

        {/* NIVEL 2: GRILLA SIMÉTRICA (Ambas tarjetas alineadas con misma altura) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* TARJETA IZQUIERDA (7 bloques): Diagnóstico Ontológico */}
          <div className={`lg:col-span-7 flex flex-col justify-between bg-fd-card border border-fd-border p-6 sm:p-8 space-y-6 ${NOTCH_LG} ${GLOW_HOVER} transition-shadow duration-500`}>
            <CornerMarks />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-fd-muted-foreground uppercase tracking-widest border-b border-fd-border/60 pb-2.5">
                <span className="flex items-center gap-1.5 text-fd-foreground font-semibold">
                  <Fingerprint className="w-3.5 h-3.5 text-fd-primary" /> DIAGNÓSTICO ONTOLÓGICO
                </span>
                <span>REF: SPINOZA_LOG</span>
              </div>

              <div className="space-y-3 font-[family-name:var(--font-body)] text-sm sm:text-base font-light leading-relaxed text-fd-muted-foreground">
                <p>
                  La naturaleza aborrece el vacío, pero el nodo o apunte que estás intentando consultar simplemente <strong className="text-fd-foreground font-semibold">no existe</strong> dentro de la arquitectura actual de Taimilog.
                </p>
                <p className="font-mono text-xs text-fd-foreground/80 bg-fd-muted/50 p-3.5 border-l-2 border-fd-primary italic leading-relaxed">
                  &quot;Incluso un genio inigualable como la Señora Herta no puede indexar un pensamiento que jamás ha germinado en el jardín.&quot;
                </p>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-fd-muted-foreground uppercase tracking-wider border-t border-fd-border/40">
              <span>STATUS: DESVIACIÓN DE RUTA</span>
              <span className="text-fd-primary font-semibold">ENLACE CADUCO</span>
            </div>
          </div>

          {/* TARJETA DERECHA (5 bloques): Lore y Telemetría de Herta */}
          <div className={`lg:col-span-5 flex flex-col justify-between bg-fd-card border border-fd-border p-6 sm:p-8 space-y-6 group transition-all duration-500 hover:border-fd-foreground/40 ${NOTCH_LG} ${GLOW_HOVER}`}>
            <CornerMarks />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-fd-muted-foreground uppercase tracking-widest border-b border-fd-border/60 pb-2.5">
                <span className="flex items-center gap-1.5 text-fd-foreground font-semibold">
                  <Activity className="w-3.5 h-3.5 text-fd-primary animate-pulse" /> NÚCLEO AVATAR
                </span>
                <span className="text-fd-primary font-bold">✦ DISCONNECTED</span>
              </div>
              
              <div className="flex items-center gap-5 pt-1">
                {/* Imagen herta404.webp */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 overflow-hidden bg-fd-muted border border-fd-border">
                  <Image
                    src="/herta404.webp"
                    alt="Madam Herta — Error 404"
                    width={140}
                    height={140}
                    className="object-cover w-full h-full grayscale contrast-125 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    priority
                  />
                  <div className="absolute inset-0 bg-fd-primary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-end p-1 font-mono text-[8px] text-fd-foreground uppercase tracking-tighter bg-[linear-gradient(to_bottom,transparent_70%,rgba(0,0,0,0.8)_100%)]">
                    <span>[LOST_SYS]</span>
                  </div>
                </div>

                {/* Info técnica de Herta */}
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="font-mono text-[9px] text-fd-muted-foreground uppercase tracking-widest">
                    FIG. 404 &#47;&#47; HERTA_SYS
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-bold tracking-tight text-fd-foreground leading-snug truncate">
                    Madam Herta
                  </h3>
                  <p className="font-mono text-[11px] text-fd-muted-foreground italic line-clamp-2">
                    &quot;An unrivaled genius... who cannot find this page.&quot;
                  </p>
                </div>
              </div>

              {/* Lista de telemetría extra para equilibrar la densidad visual con la tarjeta izquierda */}
              <div className="space-y-1.5 pt-2 font-mono text-[10px] text-fd-muted-foreground/80 bg-fd-muted/30 p-3 border border-fd-border/50">
                <div className="flex justify-between">
                  <span>PROTOCOLO:</span>
                  <span className="text-fd-foreground">BÚSQUEDA PROFUNDA</span>
                </div>
                <div className="flex justify-between">
                  <span>SECTOR:</span>
                  <span className="text-fd-foreground">ESTACIÓN ESPACIAL // 00</span>
                </div>
                <div className="flex justify-between">
                  <span>RESPUESTA:</span>
                  <span className="text-fd-primary font-semibold">404 NOT FOUND</span>
                </div>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-fd-muted-foreground uppercase tracking-wider border-t border-fd-border/40">
              <span>ESTADO: RECALCULANDO RUTA</span>
              <span>( ╥﹏╥)</span>
            </div>
          </div>

        </div>

        {/* NIVEL 3: BARRA DE COMANDO DE RECUPERACIÓN (Ancla horizontal inferior) */}
        <div className={`bg-fd-card/60 border border-fd-border p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md ${NOTCH_SM}`}>
          <div className="font-mono text-xs text-fd-muted-foreground uppercase tracking-widest flex items-center gap-2">
            <Terminal className="w-4 h-4 text-fd-primary" />
            <span className="text-fd-foreground font-semibold">VECTORES DE ESCAPE DISPONIBLES:</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-2.5 bg-fd-primary text-fd-primary-foreground font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Volver al Inicio
            </Link>

            <Link
              href="/biblioteca/blog"
              className="w-full sm:w-auto px-6 py-2.5 bg-fd-card border border-fd-border text-fd-foreground font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:bg-fd-muted transition-colors"
            >
              <BookOpenText className="w-3.5 h-3.5 text-fd-primary" /> Explorar la Biblioteca
            </Link>
          </div>
        </div>

      </div>

      {/* Footer Técnico de Terminal */}
      <footer className="w-full border-t border-fd-border/60 pt-4 mt-6 font-mono text-[9px] sm:text-[10px] text-fd-muted-foreground/60 uppercase tracking-widest flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Cpu className="w-3 h-3 text-fd-primary" />
          <span>SYS.TAIMILOG &#47;&#47; v2.6</span>
          <span className="hidden sm:inline border-l border-fd-border/60 pl-2">MODO: RECUPERACIÓN_DE_ANOMALÍA</span>
        </div>
        <span>REINICIANDO VECTOR ( ╥﹏╥)</span>
      </footer>

    </div>
  );
}

function CornerMarks() {
  return (
    <>
      <span aria-hidden="true" className="pointer-events-none absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-fd-foreground/25 transition-colors duration-500" />
      <span aria-hidden="true" className="pointer-events-none absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-fd-foreground/25 transition-colors duration-500" />
    </>
  );
}