'use client';

import { useRef, useCallback } from 'react';
import Image from 'next/image';
import {
  Fingerprint,
  Stethoscope,
  BookOpenText,
  LayoutTemplate,
  GripHorizontal,
} from 'lucide-react';

const AVATAR_SIZE = 140;
const NOTCH_LG =
  '[clip-path:polygon(0_0,100%_0,100%_calc(100%-22px),calc(100%-22px)_100%,0_100%)]';
const GLOW_HOVER =
  'hover:shadow-[0_0_44px_-16px_color-mix(in_oklch,var(--color-fd-primary)_50%,transparent)]';
const MODAL_NOTCH =
  'md:[clip-path:polygon(0_0,100%_0,100%_calc(100%-22px),calc(100%-22px)_100%,0_100%)]';

export function ProfileAvatar() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal = useCallback(() => {
    dialogRef.current?.showModal();
  }, []);

  const closeModal = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) closeModal();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === 'Escape') closeModal();
  };

  const handleCancel = (e: React.SyntheticEvent<HTMLDialogElement>) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <>
      {/* 1. TARJETA DE AVATAR (TRIGGER SEMÁNTICO CON <button>) */}
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

      {/* 2. VENTANA MODAL ("SOBRE MÍ") */}
      <dialog
        ref={dialogRef}
        onClick={handleBackdropClick}
        onKeyDown={handleKeyDown}
        onCancel={handleCancel}
        aria-labelledby="about-header-title"
        className="m-0 mt-auto md:m-auto w-full max-w-none md:max-w-[880px] h-[100dvh] md:h-auto bg-transparent p-0 border-none outline-none focus:outline-none focus-visible:outline-none overflow-visible dialog-retro text-fd-foreground"
      >
        <div className={`relative w-full h-full md:h-auto bg-fd-background md:bg-fd-card border-x-0 border-y-0 md:border md:border-fd-border flex flex-col overflow-hidden ${MODAL_NOTCH} md:shadow-[0_0_50px_-15px_color-mix(in_oklch,var(--color-fd-primary)_45%,transparent)] transition-shadow`}>
          
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
                id="about-header-title"
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

          {/* Contenido */}
          <div className="relative flex-1 overflow-y-auto p-6 sm:p-8 pb-12 md:pb-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
              
              {/* COLUMNA IZQUIERDA: IDENTIDAD & BIO */}
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
                        width={100}
                        height={100}
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

              {/* COLUMNA DERECHA: ACREDITACIONES */}
              <div className="md:col-span-7 space-y-5">
                <div className="font-mono text-[10px] sm:text-[11px] tracking-widest text-fd-muted-foreground uppercase font-bold flex items-center justify-between border-b border-fd-border/60 pb-2">
                  <span>&#47;&#47; ACREDITACIONES &amp; ÁREAS DE DOMINIO</span>
                  <span className="text-fd-primary">(✧ω✧)</span>
                </div>
                <div className="space-y-5">
                  <CvSection
                    icon={<Stethoscope className="w-4 h-4" />}
                    title="Ciencias Médicas y Salud"
                    items={[
                      "// Agrega aquí tu semestre actual o estado clínico real.",
                      "// Agrega aquí tus rotaciones, áreas de interés médico o cursos acreditados.",
                    ]}
                  />
                  <CvSection
                    icon={<LayoutTemplate className="w-4 h-4" />}
                    title="Diseño Editorial y Web"
                    items={[
                      "// Agrega aquí tu experiencia construyendo Taimilog o proyectos editoriales.",
                      "// Maquetación, tipografía hiperlegible o herramientas web que dominas.",
                    ]}
                  />
                  <CvSection
                    icon={<BookOpenText className="w-4 h-4" />}
                    title="Filosofía y Metafísica"
                    items={["// Agrega aquí tus ensayos, lecturas sobre Spinoza o enfoques de investigación."]}
                  />
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

function CvSection({ icon, title, items }: { icon: React.ReactNode; title: string; items: string[] }) {
  return (
    <div className="space-y-2.5">
      <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 text-fd-foreground bg-fd-muted/40 px-2.5 py-1.5 border border-fd-border/50">
        <span className="text-fd-primary">{icon}</span> {title}
      </h3>
      <ul className="space-y-2 pl-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-fd-primary/60 shrink-0" />
            <span className="font-[family-name:var(--font-body)] text-xs sm:text-sm text-fd-muted-foreground leading-relaxed">
              {item}
            </span>
          </li>
        ))}
      </ul>
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