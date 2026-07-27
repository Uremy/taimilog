'use client';

import { useRef, useCallback, useState, useId, useEffect } from 'react';
import Image from 'next/image';
import {
  Fingerprint,
  Stethoscope,
  LayoutTemplate,
  GripHorizontal,
  FunctionSquare,
  Briefcase,
  Terminal,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';

const AVATAR_SIZE = 140;
const MODAL_AVATAR_SIZE = 100;

const NOTCH_LG =
  '[clip-path:polygon(0_0,100%_0,100%_calc(100%-22px),calc(100%-22px)_100%,0_100%)]';
const GLOW_HOVER =
  'hover:shadow-[0_0_44px_-16px_color-mix(in_oklch,var(--color-fd-primary)_50%,transparent)]';
const MODAL_NOTCH =
  'md:[clip-path:polygon(0_0,100%_0,100%_calc(100%-22px),calc(100%-22px)_100%,0_100%)]';

/* ==========================================================================
   ESTRUCTURA DE DATOS DE TRAYECTORIA // CON OPCIÓN DE INICIO EXPANDIDO
   ========================================================================== */
interface PositionItem {
  id: string;
  title: string;
  period: string;
  type: string;
  icon: React.ReactNode;
  description: string;
  skills: string[];
  initiallyExpanded?: boolean;
}

interface ExperienceCategory {
  id: string;
  categoryName: string;
  categoryTag: string;
  positions: PositionItem[];
}

const trajectoryData: ExperienceCategory[] = [
  {
    id: 'med',
    categoryName: 'Ciencias Médicas & Clínica',
    categoryTag: 'UNIVERSIDAD',
    positions: [
      {
        id: 'med-1',
        title: 'Estudiante de Medicina General',
        period: '2024 — Presente',
        type: 'Fase Clínica // 5to Semestre',
        icon: <Stethoscope className="w-4 h-4 text-fd-primary shrink-0" />,
        description:
          'Formación médica en transición de ciencias básicas a rotaciones clínicas. Investigación autodidacta orientada a la fisiología y la clínica fundamentada.',
        skills: ['Medicina Interna', 'Fisiología', 'Zotero', 'Sumatra PDF', 'Rotaciones'],
        initiallyExpanded: true,
      },
    ],
  },
  {
    id: 'dev',
    categoryName: 'Desarrollo & Diseño Web',
    categoryTag: 'PROYECTOS',
    positions: [
      {
        id: 'dev-1',
        title: 'Creadora & Arquitecta Web (Taimilog)',
        period: '2026 — ∞',
        type: 'Jardín Digital',
        icon: <LayoutTemplate className="w-4 h-4 text-fd-primary shrink-0" />,
        description:
          'Desarrollo de arquitectura web monolítica estática ultrarrápida. Diseño editorial clásico, tipografía hiperlegible y maquetación de revistas aplicadas a medios digitales.',
        skills: ['Next.js 15', 'Tailwind v4', 'TypeScript', 'Fumadocs', 'Diseño Editorial'],
        initiallyExpanded: true,
      },
    ],
  },
  {
    id: 'science-phil',
    categoryName: 'Ciencias Exactas & Filosofía',
    categoryTag: 'AUTODIDACTA',
    positions: [
      {
        id: 'sp-1',
        title: 'Investigación Independiente & Estudios Formales',
        period: '2023 — Presente',
        type: 'Multidisciplinario',
        icon: <FunctionSquare className="w-4 h-4 text-fd-primary shrink-0" />,
        description:
          'Desarrollando estudios formales en Licenciatura en Matemáticas (UnADM). Investigación analítica sobre ontología, metafísica, nihilismo y la filosofía de Baruch Spinoza.',
        skills: ['Matemáticas Aplicadas', 'Spinoza', 'Ontología', 'Modelos Biológicos'],
        initiallyExpanded: false,
      },
    ],
  },
];

export function ProfileAvatar() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  const openModal = useCallback(() => {
    dialogRef.current?.showModal();
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  // El evento 'close' del <dialog> cubre TODAS las vías de cierre
  // (botón [X], backdrop, Escape), así que basta un solo listener
  // para liberar el scroll del body de forma consistente.
  useEffect(() => {
    const dialogEl = dialogRef.current;
    if (!dialogEl) return;
    const unlockScroll = () => {
      document.body.style.overflow = '';
    };
    dialogEl.addEventListener('close', unlockScroll);
    return () => {
      dialogEl.removeEventListener('close', unlockScroll);
      unlockScroll();
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) closeModal();
  };

  const handleCancel = (e: React.SyntheticEvent<HTMLDialogElement>) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <>
      {/* 1. TARJETA DE AVATAR (TRIGGER SEMÁNTICO) */}
      <button
        type="button"
        onClick={openModal}
        className="text-left relative cursor-pointer group/avatar w-full block bg-transparent p-0 border-none appearance-none focus:outline-none"
      >
        <div
          aria-hidden="true"
          className={`absolute -bottom-2 -right-2 w-full h-full border border-fd-foreground/15 ${NOTCH_LG} hidden sm:block`}
        />
        <div
          className={`relative bg-fd-card border border-fd-border p-3.5 sm:p-5 transition-all duration-500 hover:border-fd-foreground/40 ${NOTCH_LG} ${GLOW_HOVER}`}
        >
          <CornerMarks />
          <div className="flex items-center gap-3.5 sm:gap-5">
            <div className="relative w-16 h-16 sm:w-24 sm:h-24 shrink-0 overflow-hidden bg-fd-muted border border-fd-border">
              <Image
                src="/avatar.webp"
                alt="Uremy — Señora Herta"
                width={AVATAR_SIZE}
                height={AVATAR_SIZE}
                className="object-cover w-full h-full grayscale contrast-125 transition-all duration-700 group-hover/avatar:scale-105 group-hover/avatar:grayscale-0"
                priority
              />
              <div className="absolute inset-0 bg-fd-primary/10 opacity-0 group-hover/avatar:opacity-100 transition-opacity pointer-events-none flex items-end p-1 font-mono text-[8px] text-fd-foreground uppercase tracking-tighter bg-[linear-gradient(to_bottom,transparent_80%,rgba(0,0,0,0.6)_100%)]">
                <span>[VER_PERFIL]</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-mono text-[9px] sm:text-[10px] tracking-widest text-fd-muted-foreground uppercase flex items-center justify-between">
                <span>FIG. 01 — AVATAR</span>
                <span className="text-[9px] text-fd-primary font-bold opacity-0 group-hover/avatar:opacity-100 transition-opacity animate-pulse">
                  ✦ CLICK
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-base sm:text-lg font-bold tracking-tight text-fd-foreground leading-snug flex items-center gap-1.5">
                Madam Herta
                <span className="text-[10px] font-mono text-fd-primary font-normal hidden group-hover/avatar:inline-block transition-all">
                  &#47;&#47; 마담 ( *´艸__)
                </span>
              </h3>
              <p className="font-mono text-[11px] sm:text-xs text-fd-muted-foreground line-clamp-2 italic">
                &quot;An unrivaled genius. An inimitable beauty.&quot;
              </p>
            </div>
          </div>
        </div>
      </button>

      {/* 2. VENTANA MODAL ("SOBRE MÍ") — CON TOPE MAX-H-[86dvh] PARA EVITAR SCROLL DE FONDO */}
      <dialog
        ref={dialogRef}
        onClick={handleBackdropClick}
        onCancel={handleCancel}
        aria-labelledby={titleId}
        className="m-0 mt-auto md:m-auto w-full max-w-none md:max-w-[920px] h-[100dvh] md:h-auto max-h-[100dvh] md:max-h-[86dvh] bg-transparent p-0 border-none outline-none focus:outline-none focus-visible:outline-none overflow-visible dialog-retro text-fd-foreground"
      >
        <div className={`relative w-full h-full md:h-auto max-h-[100dvh] md:max-h-[86dvh] bg-fd-background md:bg-fd-card border-x-0 border-y-0 md:border md:border-fd-border flex flex-col overflow-hidden ${MODAL_NOTCH} md:shadow-[0_0_50px_-15px_color-mix(in_oklch,var(--color-fd-primary)_45%,transparent)] transition-shadow`}>
          
          {/* Textura scanline sutil */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.03] hidden md:block"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to bottom, var(--color-fd-foreground) 0px, var(--color-fd-foreground) 1px, transparent 1px, transparent 3px)',
            }}
          />
          <div className="hidden md:block">
            <CornerMarks />
          </div>

          {/* Header estático */}
          <div className="relative flex-none bg-fd-muted border-b border-fd-border px-4 py-3 flex items-center justify-between sticky top-0 z-10 select-none">
            <div className="flex items-center gap-3">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fd-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-fd-primary" />
              </span>
              <span
                id={titleId}
                className="font-mono text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5"
              >
                <Fingerprint className="w-3.5 h-3.5 text-fd-primary" />
                SOBRE MÍ &#47;&#47; 우레미 <span className="text-[10px] opacity-75 font-normal">(★ω★)/</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden md:flex items-center gap-1 font-mono text-[9px] text-fd-muted-foreground/60 tracking-tighter">
                <GripHorizontal className="w-3.5 h-3.5" /> SYS_PANEL
              </span>
              <button
                type="button"
                onClick={closeModal}
                className="font-mono text-[11px] text-fd-muted-foreground hover:text-fd-primary transition-colors flex items-center gap-1 uppercase tracking-widest px-2.5 py-1 bg-fd-background/50 border border-fd-border hover:border-fd-primary/50 cursor-pointer"
                aria-label="Cerrar ventana"
              >
                [X]
              </button>
            </div>
          </div>

          {/* Contenido — CON OVERSCROLL-CONTAIN PARA ATRAPAR EL SCROLL */}
          <div className="relative flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8 pb-12 md:pb-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
              
              {/* COLUMNA IZQUIERDA (5 columnas): IDENTIDAD & BIO */}
              <div className="md:col-span-5 space-y-5 md:border-r md:border-fd-border/60 md:pr-8 pb-6 border-b border-fd-border/60 md:border-b-0 md:pb-0">
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="relative shrink-0 group/modal-avatar">
                    <div
                      aria-hidden="true"
                      className="absolute -bottom-1 -right-1 w-full h-full border border-fd-foreground/15 hidden sm:block pointer-events-none"
                    />
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 overflow-hidden bg-fd-muted border border-fd-border transition-colors duration-500 group-hover/modal-avatar:border-fd-primary/60">
                      <Image
                        src="/avatar.webp"
                        alt="Uremy — Avatar"
                        width={MODAL_AVATAR_SIZE}
                        height={MODAL_AVATAR_SIZE}
                        className="object-cover w-full h-full grayscale contrast-125 transition-all duration-700 group-hover/modal-avatar:scale-105 group-hover/modal-avatar:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-fd-primary/10 opacity-0 group-hover/modal-avatar:opacity-100 transition-opacity pointer-events-none flex items-end p-1 font-mono text-[8px] text-fd-foreground uppercase tracking-tighter bg-[linear-gradient(to_bottom,transparent_70%,rgba(0,0,0,0.7)_100%)]">
                        <span>[ID &#47;&#47; UREMY]</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-fd-muted border border-fd-border text-fd-foreground font-mono text-[9px] uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-fd-primary animate-pulse" />
                      NÚCLEO ACTIVO
                    </div>
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-black uppercase tracking-tight leading-none text-fd-foreground">
                        Uremy
                      </h2>
                      <span className="text-xs font-mono font-medium text-fd-primary whitespace-nowrap">
                        &#47;&#47; 우레미
                      </span>
                    </div>
                    <p className="font-mono text-[10px] text-fd-muted-foreground uppercase tracking-widest truncate">
                      {"COORD: 42 ( ◡‿◡ *)"}
                    </p>
                  </div>
                </div>
                <div className="space-y-3 pt-1">
                  <p className="font-mono text-[10px] text-fd-muted-foreground uppercase tracking-widest border-b border-fd-border/40 pb-2">
                    Medicina <span className="text-fd-primary">&#47;&#47;</span> Filosofía <span className="text-fd-primary">&#47;&#47;</span> Diseño
                  </p>
                  <p className="font-[family-name:var(--font-body)] text-sm font-light leading-relaxed text-fd-muted-foreground">
                    Estudiante de medicina en México. Taimilog es mi bitácora personal, un espacio no lineal donde convergen mis apuntes clínicos, mi pasión por el diseño editorial y mis contemplaciones filosóficas.
                  </p>
                </div>
              </div>

              {/* COLUMNA DERECHA (7 columnas): TIMELINE CON ACORDEONES EXPANDIBLES */}
              <div className="md:col-span-7 space-y-6">
                <div className="font-mono text-[10px] sm:text-[11px] tracking-widest text-fd-muted-foreground uppercase font-bold flex items-center justify-between border-b border-fd-border/60 pb-2.5">
                  <span className="flex items-center gap-1.5 text-fd-foreground">
                    <Terminal className="w-3.5 h-3.5 text-fd-primary" />
                    &#47;&#47; REGISTRO DE TRAYECTORIA
                  </span>
                  <span className="text-fd-primary">(✧ω✧)</span>
                </div>
                <div className="space-y-8">
                  {trajectoryData.map((category) => (
                    <div key={category.id} className="space-y-3">
                      
                      {/* Cabecera de Categoría */}
                      <div className="flex items-center gap-2 bg-fd-muted/40 px-3 py-1.5 border border-fd-border/60">
                        <ChevronRight className="w-3.5 h-3.5 text-fd-primary shrink-0" />
                        <span className="font-mono text-[10px] text-fd-primary font-bold tracking-wider uppercase">
                          [{category.categoryTag}]
                        </span>
                        <span className="font-mono text-xs font-bold text-fd-foreground uppercase tracking-wide truncate">
                          {category.categoryName}
                        </span>
                      </div>
                      {/* Contenedor de Línea Conectora */}
                      <div className="border-l-2 border-fd-border/60 ml-2.5 pl-3 sm:pl-4 space-y-3 pt-1">
                        {category.positions.map((pos) => (
                          <PositionCard key={pos.id} pos={pos} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Status bar inferior */}
          <div className="hidden md:flex flex-none border-t border-fd-border/60 bg-fd-muted/40 px-4 py-1.5 items-center justify-between font-mono text-[9px] text-fd-muted-foreground/70 uppercase tracking-widest">
            <span>PROC: taimilog.about</span>
            <span>EN REPOSO</span>
          </div>
        </div>
      </dialog>
    </>
  );
}

/* ==========================================================================
   COMPONENTE ACORDEÓN PARA PUESTOS // INTERACTIVO Y BLINDADO
   ========================================================================== */
function PositionCard({ pos }: { pos: PositionItem }) {
  const [isExpanded, setIsExpanded] = useState(pos.initiallyExpanded ?? true);
  const panelId = useId();

  return (
    <div className="relative group/pos border border-fd-border/60 bg-fd-card/40 hover:border-fd-border/90 transition-all rounded-sm p-3 sm:p-4 space-y-3">
      
      {/* Punto conector en la línea vertical de tiempo */}
      <span
        aria-hidden="true"
        className="absolute -left-[17px] sm:-left-[21px] top-4 w-2 h-2 rounded-full bg-fd-border group-hover/pos:bg-fd-primary transition-colors pointer-events-none"
      />
      {/* BOTÓN CABECERA (TRIGGER DE EXPANSIÓN) */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls={panelId}
        className="w-full flex items-start sm:items-center justify-between gap-3 text-left bg-transparent p-0 border-none appearance-none focus:outline-none cursor-pointer group/btn"
      >
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <span className="p-1 bg-fd-muted border border-fd-border rounded-sm shrink-0">
            {pos.icon}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <h4 className="font-[family-name:var(--font-display)] text-sm sm:text-base font-bold text-fd-foreground tracking-tight group-hover/btn:text-fd-primary transition-colors">
                {pos.title}
              </h4>
              <span className="font-mono text-[10px] text-fd-muted-foreground shrink-0">
                ({pos.period})
              </span>
            </div>
            <div className="font-mono text-[9px] sm:text-[10px] text-fd-primary/90 uppercase tracking-widest flex items-center gap-1 mt-0.5">
              <Briefcase className="w-2.5 h-2.5 opacity-70 shrink-0" />
              <span className="truncate">{pos.type}</span>
            </div>
          </div>
        </div>
        {/* Flecha indicadora del acordeón */}
        <div className="p-1 text-fd-muted-foreground group-hover/btn:text-fd-foreground shrink-0 transition-transform duration-200">
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isExpanded ? 'rotate-180 text-fd-primary' : ''
            }`}
          />
        </div>
      </button>

      {/* CONTENIDO DESPLEGABLE (DESCRIPCIÓN Y HABILIDADES) */}
      {isExpanded && (
        <div id={panelId} className="pt-3 border-t border-fd-border/40 space-y-3 animate-in fade-in duration-200">
          <p className="font-[family-name:var(--font-body)] text-xs sm:text-sm text-fd-muted-foreground font-light leading-relaxed">
            {pos.description}
          </p>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {pos.skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 bg-fd-muted/60 border border-fd-border/70 text-fd-foreground font-mono text-[9px] sm:text-[10px] rounded-sm transition-colors hover:border-fd-primary/50 hover:bg-fd-foreground hover:text-fd-background"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
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