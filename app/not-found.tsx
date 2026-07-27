import Image from 'next/image';
import Link from 'next/link';
import { 
  AlertTriangle, 
  ArrowLeft, 
  BookOpenText, 
  Fingerprint, 
  Radio, 
  Cpu,
  Activity
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

      {/* Contenedor Principal en Grilla (Layout basado en tu boceto) */}
      <div className="max-w-[1360px] w-full mx-auto my-auto py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        
        {/* =========================================================
            COLUMNA IZQUIERDA (5 bloques): Imagen 1:1 + Metadata
            ========================================================= */}
        <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6 order-2 lg:order-1">
          
          {/* Bloque Superior: Imagen en Ratio 1:1 estricto */}
          <div className={`relative w-full aspect-square bg-fd-muted border border-fd-border overflow-hidden group transition-all duration-500 hover:border-fd-foreground/40 ${NOTCH_LG} ${GLOW_HOVER}`}>
            <CornerMarks />
            
            <Image
              src="/herta404.webp"
              alt="Madam Herta — Error 404"
              fill
              className="object-cover grayscale contrast-125 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
              priority
            />
            
            <div className="absolute inset-0 bg-fd-primary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-end p-3 font-mono text-xs text-fd-foreground uppercase tracking-tighter bg-[linear-gradient(to_bottom,transparent_70%,rgba(0,0,0,0.8)_100%)]">
              <span>[LOST_SYS]</span>
            </div>
          </div>

          {/* Bloque Inferior: Telemetría y Lore */}
          <div className={`bg-fd-card border border-fd-border p-5 flex flex-col justify-between flex-1 space-y-4 ${NOTCH_SM}`}>
            <div>
              <div className="flex items-center justify-between font-mono text-[10px] text-fd-muted-foreground uppercase tracking-widest border-b border-fd-border/60 pb-2 mb-3">
                <span className="flex items-center gap-1.5 text-fd-foreground font-semibold">
                  <Activity className="w-3.5 h-3.5 text-fd-primary animate-pulse" /> NÚCLEO AVATAR
                </span>
                <span className="text-fd-primary font-bold">✦ DISCONNECTED</span>
              </div>

              <div className="space-y-1">
                <div className="font-mono text-[9px] text-fd-muted-foreground uppercase tracking-widest">
                  FIG. 404 &#47;&#47; HERTA_SYS
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold tracking-tight text-fd-foreground leading-snug">
                  Madam Herta
                </h3>
                <p className="font-mono text-[11px] text-fd-muted-foreground italic leading-relaxed pt-1 border-l-2 border-fd-primary pl-3 bg-fd-muted/30 py-1.5 mt-2">
                  &quot;An unrivaled genius... who cannot find the page you are looking for.&quot;
                </p>
              </div>
            </div>
            
            <div className="pt-2 flex items-center justify-between font-mono text-[9px] text-fd-muted-foreground uppercase tracking-wider border-t border-fd-border/40">
              <span>ESTADO: RECALCULANDO</span>
              <span>( ╥﹏╥)</span>
            </div>
          </div>

        </div>

        {/* =========================================================
            COLUMNA DERECHA (7 bloques): Títulos, Diagnóstico y Botones
            ========================================================= */}
        <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-8 justify-between order-1 lg:order-2">
          
          {/* Cabecera del Error */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-fd-muted border border-fd-border font-mono text-[11px] sm:text-xs text-fd-muted-foreground uppercase tracking-[0.2em] select-none">
              <AlertTriangle className="w-3.5 h-3.5 text-fd-primary animate-pulse" />
              <span>SYS_ALERT &#47;&#47; VECTOR_NOT_FOUND</span>
              <span className="text-fd-primary border-l border-fd-border/60 pl-2 font-bold">ERR: 404</span>
            </div>

            <h1 className="font-[family-name:var(--font-display)] text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-black uppercase tracking-tighter leading-[0.85] text-fd-foreground select-none">
              Vacío <span className="text-fd-primary font-normal">404</span>
            </h1>
            
            <p className="font-mono text-xs sm:text-sm text-fd-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-fd-primary animate-spin" />
              <span>COORDENADA PERDIDA EN EL MAR DE ESTRELLAS ( ◎ _ ◎ ;)</span>
            </p>
          </div>

          {/* Tarjeta de Diagnóstico Ontológico (SIN VACÍOS) */}
          <div className={`relative flex-1 bg-fd-card border border-fd-border p-6 sm:p-8 flex flex-col justify-between space-y-6 ${NOTCH_LG} ${GLOW_HOVER} transition-shadow duration-500`}>
            <CornerMarks />
            
            <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-fd-muted-foreground uppercase tracking-widest border-b border-fd-border/60 pb-2.5">
              <span className="flex items-center gap-1.5 text-fd-foreground font-semibold">
                <Fingerprint className="w-3.5 h-3.5 text-fd-primary" /> DIAGNÓSTICO ONTOLÓGICO
              </span>
              <span>REF: SPINOZA_LOG</span>
            </div>

            {/* Bloque de texto repartido uniformemente para llenar el espacio */}
            <div className="space-y-4 font-[family-name:var(--font-body)] text-sm sm:text-base md:text-lg font-light leading-relaxed text-fd-muted-foreground flex-1 flex flex-col justify-around my-2">
              <p>
                La naturaleza aborrece el vacío, pero el nodo o apunte que estás intentando consultar simplemente <strong className="text-fd-foreground font-semibold">no existe</strong> dentro de la arquitectura actual de Taimilog.
              </p>
              
              {/* Nueva cita para ocupar el espacio central con elegancia técnica */}
              <div className="font-mono text-xs text-fd-foreground/90 bg-fd-muted/40 p-3.5 border-l-2 border-fd-primary italic">
                &quot;Incluso un genio inigualable como la Señora Herta no puede indexar un pensamiento que jamás ha germinado en el jardín.&quot;
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-[10px] text-fd-muted-foreground/80 uppercase tracking-widest pt-2">
                <div className="bg-fd-muted/30 p-3 border border-fd-border/50 flex justify-between items-center">
                  <span>PROTOCOLO:</span>
                  <span className="text-fd-foreground font-medium">BÚSQUEDA PROFUNDA</span>
                </div>
                <div className="bg-fd-muted/30 p-3 border border-fd-border/50 flex justify-between items-center">
                  <span>RESPUESTA:</span>
                  <span className="text-fd-primary font-semibold">404 NOT FOUND</span>
                </div>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between font-mono text-[10px] text-fd-muted-foreground uppercase tracking-wider border-t border-fd-border/40">
              <span>STATUS: DESVIACIÓN DE RUTA</span>
              <span className="text-fd-primary font-semibold">ENLACE CADUCO</span>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
            <Link
              href="/"
              className="w-full sm:flex-1 px-6 py-4 bg-fd-primary text-fd-primary-foreground font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <ArrowLeft className="w-4 h-4" /> Volver al Inicio
            </Link>

            <Link
              href="/biblioteca/blog"
              className="w-full sm:flex-1 px-6 py-4 bg-fd-card border border-fd-border text-fd-foreground font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:bg-fd-muted transition-colors"
            >
              <BookOpenText className="w-4 h-4 text-fd-primary" /> Explorar la Biblioteca
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