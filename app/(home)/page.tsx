import type { Metadata } from 'next';
import { Atkinson_Hyperlegible, Unbounded } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BookOpenText,
  CircuitBoard,
  Cpu,
  Fingerprint,
  Hash,
  Layers3,
  Radio,
  ScanLine,
  ShieldCheck,
  Signal,
  Stethoscope,
  Terminal,
} from 'lucide-react';
import {
  SiGithub as Github,
  SiInstagram as Instagram,
  SiX as Twitter,
  SiYoutube as Youtube,
} from 'react-icons/si';

import { QuoteClient } from '@/components/quote-client';
import { quotes } from '@/lib/quotes';

export const metadata: Metadata = {
  title: 'Uremy',
  description: 'Apuntes, ensayos y registros.',
  openGraph: {
    title: 'Taimilog',
    description: 'Jardín digital',
    images: '/og/home',
    siteName: 'Taimilog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taimilog',
    description: 'Apuntes de medicina y jardín digital',
    images: '/og/home',
  },
};

const AVATAR_SIZE = 140;

const unbounded = Unbounded({
  subsets: ['latin'],
  weight: ['400', '600', '800', '900'],
  variable: '--font-display',
  display: 'swap',
});

// Reemplazado por Atkinson Hyperlegible para mantener el blindaje visual que creamos
const atkinson = Atkinson_Hyperlegible({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-body',
  display: 'swap',
});

const fontDisplay = 'font-[family-name:var(--font-display)]';
const fontBody = 'font-[family-name:var(--font-body)]';

/** Cortes de esquina reutilizables — lenguaje "blueprint / avant-garde" */
const NOTCH_LG =
  '[clip-path:polygon(0_0,100%_0,100%_calc(100%-22px),calc(100%-22px)_100%,0_100%)]';
const NOTCH_SM =
  '[clip-path:polygon(0_0,100%_0,100%_calc(100%-14px),calc(100%-14px)_100%,0_100%)]';

/** Glow derivado estrictamente del rojo/rosa primario de tu tema CSS */
const GLOW_HOVER =
  'hover:shadow-[0_0_44px_-16px_color-mix(in_oklch,var(--color-fd-primary)_50%,transparent)]';

export default function HomePage() {
  return (
    <div
      className={`${unbounded.variable} ${atkinson.variable} ${fontBody} relative w-full bg-fd-background text-fd-foreground antialiased selection:bg-fd-primary selection:text-fd-primary-foreground overflow-x-hidden`}
    >
      {/* Fondo, grilla arquitectónica y scanline */}
      <div
        aria-hidden="true"
        role="presentation"
        className="fixed inset-0 -z-10 pointer-events-none flex justify-center select-none overflow-hidden"
      >
        <div className="absolute top-0 w-[80vw] h-[50vh] bg-gradient-to-b from-black/5 dark:from-white/5 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.06)_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
        <div className="absolute left-0 right-0 h-px bg-fd-foreground/10 animate-[scan_9s_linear_infinite]" />
      </div>

      {/* Contenedor Principal */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-6 sm:pt-12 pb-12 space-y-6 sm:space-y-8 w-full">
        {/* Cabecera & Identidad */}
        <section className="enter relative grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-end">
          <div className="lg:col-span-8 space-y-4 sm:space-y-6">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-fd-accent text-fd-accent-foreground font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em]">
                <Terminal className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-fd-primary" />
                Uremy
              </div>
              <span
                title="42 — la Respuesta Última al Sentido de la Vida, el Universo y Todo lo Demás (Douglas Adams). Coordenada elegida a propósito, no una plantilla."
                className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[10px] text-fd-muted-foreground uppercase tracking-widest cursor-help border-b border-dotted border-fd-muted-foreground/40 hover:text-fd-foreground transition-colors"
              >
                <Fingerprint className="h-3 w-3 text-fd-primary" /> COORD: 42
              </span>
              <span className="hidden md:inline-flex items-center gap-1 font-mono text-[10px] text-fd-muted-foreground/60 select-none">
                {"// KURU KURU~ ( ◡‿◡ *)"}
              </span>
            </div>
            <h1
              className={`${fontDisplay} text-balance text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.8] text-fd-foreground -mt-1 sm:-mt-2`}
            >
              Taimi<span className="text-fd-muted-foreground font-normal">log</span>
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 pt-3 sm:pt-4 border-t border-fd-border/60">
              <p className="sm:col-span-8 text-sm sm:text-lg text-fd-muted-foreground font-light leading-relaxed text-balance">
                Hola personita al otro lado de la pantalla. Aquí guardo mis ensayos, apuntes y
                contemplaciones.{' '}
                <strong className="font-semibold text-fd-foreground">
                  ¡Espero que lo disfrutes!
                </strong>
              </p>
              <div className="sm:col-span-4 flex flex-row sm:flex-col justify-between sm:justify-end sm:items-end font-mono text-[11px] sm:text-xs text-fd-muted-foreground uppercase tracking-wider pt-2 sm:pt-0 gap-1">
                <span>{"INDEX // REG: 42"}</span>
                <span className="text-fd-foreground font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-fd-primary animate-pulse" /> ESTADO:
                  CONTINUO
                </span>
                <span className="flex items-center gap-1">
                  <Hash className="h-3 w-3 text-fd-primary" /> REV. 04{' '}
                  <span className="text-[10px] opacity-60">(★ω★)/</span>
                </span>
              </div>
            </div>
          </div>

          {/* Avatar con borde fantasma desplazado */}
          <div className="lg:col-span-4 flex flex-col justify-end pt-4 sm:pt-0">
            <div className="relative">
              <div
                aria-hidden="true"
                className={`absolute -bottom-2 -right-2 w-full h-full border border-fd-foreground/15 ${NOTCH_LG} hidden sm:block`}
              />
              <div
                className={`relative bg-fd-card border border-fd-border p-3.5 sm:p-5 group transition-all duration-500 hover:border-fd-foreground/40 ${NOTCH_LG} ${GLOW_HOVER}`}
              >
                <CornerMarks />
                <div className="flex items-center gap-3.5 sm:gap-5">
                  <div className="relative w-16 h-16 sm:w-24 sm:h-24 shrink-0 overflow-hidden bg-fd-muted border border-fd-border">
                    <Image
                      src="/avatar.webp"
                      alt="Uremy — Señora Herta"
                      width={AVATAR_SIZE}
                      height={AVATAR_SIZE}
                      className="object-cover w-full h-full grayscale contrast-125 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                      priority
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-fd-primary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-end p-1 font-mono text-[8px] text-fd-foreground uppercase tracking-tighter bg-[linear-gradient(to_bottom,transparent_80%,rgba(0,0,0,0.6)_100%)]">
                      <span>[HERTA_SYS]</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="font-mono text-[9px] sm:text-[10px] tracking-widest text-fd-muted-foreground uppercase flex items-center justify-between">
                      <span>FIG. 01 — AVATAR</span>
                      <span className="text-[9px] text-fd-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        ✦ INT_MAX
                      </span>
                    </div>
                    <h3
                      className={`${fontDisplay} text-base sm:text-lg font-bold tracking-tight text-fd-foreground leading-snug flex items-center gap-1.5`}
                    >
                      Madam Herta
                      <span className="text-[10px] font-mono text-fd-primary font-normal hidden group-hover:inline-block transition-all">
                        {"// マダム"}
                      </span>
                    </h3>
                    <p className="font-mono text-[11px] sm:text-xs text-fd-muted-foreground line-clamp-2 italic">
                      &quot;An unrivaled genius. An inimitable beauty.&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ticker de estado — telemetría en vivo, CSS puro */}
        <section className="enter [animation-delay:80ms]">
          <StatusTicker />
        </section>

        {/* Núcleos de Conocimiento */}
        <section className="enter [animation-delay:120ms] space-y-3 sm:space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 sm:gap-3 border-b border-fd-border/80 pb-2.5 sm:pb-3">
            <div>
              <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.3em] text-fd-muted-foreground uppercase block mb-0.5 sm:mb-1">
                {"// ¿Qué te gustaria leer?"}
              </span>
              <h2
                className={`${fontDisplay} text-balance text-xl sm:text-3xl font-extrabold uppercase tracking-tight text-fd-foreground`}
              >
                Archivos
              </h2>
            </div>
            <span className="font-mono text-[10px] sm:text-xs text-fd-muted-foreground uppercase">
              SELECCIONA UN VECTOR DE LECTURA [▼∀▼]†
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
            <Link
              href="/medicina/introduccion"
              className={`md:col-span-7 group relative bg-fd-card border border-fd-border p-5 sm:p-8 flex flex-col justify-between min-h-[auto] sm:min-h-[300px] transition-all duration-500 hover:border-fd-primary/50 ${NOTCH_LG} ${GLOW_HOVER}`}
            >
              <CornerMarks />
              <span
                aria-hidden="true"
                title="Clasificación Decimal Dewey — Enfermería, cuidado clínico y medicina interna"
                className="absolute top-2 left-2 font-mono text-[9px] text-fd-muted-foreground/50 group-hover:text-fd-primary transition-colors tracking-widest flex items-center gap-1.5"
              >
                <span>DEWEY 610.73</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                  {"[SYS_MED // 臨床]"}
                </span>
              </span>
              <div className="flex justify-between items-start">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 bg-fd-muted border border-fd-border text-fd-foreground font-mono text-[10px] sm:text-[11px] uppercase tracking-widest">
                  <Stethoscope className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-fd-primary group-hover:scale-110 transition-transform" />{' '}
                  SISTEMA 01
                </div>
                <span
                  aria-hidden="true"
                  className={`${fontDisplay} text-3xl sm:text-4xl font-black text-fd-muted-foreground/60 group-hover:text-fd-foreground transition-colors select-none`}
                >
                  M-01
                </span>
              </div>
              <div className="space-y-2 sm:space-y-3 my-4 sm:my-4">
                <h3
                  className={`${fontDisplay} text-2xl sm:text-4xl font-black uppercase tracking-tight text-fd-foreground group-hover:translate-x-1.5 transition-transform duration-300 flex items-baseline gap-2`}
                >
                  Medicina
                  <span className="text-xs font-mono font-normal text-fd-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    {"// CLINICAL_LOGS"}
                  </span>
                </h3>
                <p className="text-xs sm:text-base text-fd-muted-foreground font-light leading-relaxed max-w-xl">
                  Aquí guardo los apuntes de mi carrera. Están divididos por semestre. Intento
                  apuntar lo que sea de mayor utilidad tanto para la teoría como la práctica. La
                  carrera se agrupa en dos grandes ciclos: ciencias básicas y ciencias clínicas
                </p>
              </div>
              <div className="pt-3 border-t border-fd-border/60 flex items-center justify-between font-mono text-[11px] sm:text-xs uppercase tracking-widest text-fd-foreground">
                <span className="flex items-center gap-1.5 group-hover:underline font-semibold">
                  Estudiar{' '}
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-fd-primary transition-transform group-hover:translate-x-1" />
                </span>
                <span className="text-fd-muted-foreground group-hover:text-fd-primary transition-colors">
                  CRÍTICO ( ˘▽˘)っ♨
                </span>
              </div>
            </Link>

            <Link
              href="/biblioteca/blog"
              className={`md:col-span-5 group relative bg-fd-card border border-fd-border p-5 sm:p-8 flex flex-col justify-between min-h-[auto] sm:min-h-[300px] transition-all duration-500 hover:border-fd-primary/50 ${NOTCH_LG} ${GLOW_HOVER}`}
            >
              <CornerMarks />
              <span
                aria-hidden="true"
                title="Clasificación Decimal Dewey — Historia, descripción y crítica literaria"
                className="absolute top-2 left-2 font-mono text-[9px] text-fd-muted-foreground/50 group-hover:text-fd-primary transition-colors tracking-widest flex items-center gap-1.5"
              >
                <span>DEWEY 809</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                  {"[SYS_LIT // 思想]"}
                </span>
              </span>
              <div className="flex justify-between items-start">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 bg-fd-muted border border-fd-border text-fd-foreground font-mono text-[10px] sm:text-[11px] uppercase tracking-widest">
                  <BookOpenText className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-fd-primary group-hover:scale-110 transition-transform" />{' '}
                  SISTEMA 02
                </div>
                <span
                  aria-hidden="true"
                  className={`${fontDisplay} text-3xl sm:text-4xl font-black text-fd-muted-foreground/60 group-hover:text-fd-foreground transition-colors select-none`}
                >
                  H-02
                </span>
              </div>
              <div className="space-y-2 sm:space-y-3 my-4 sm:my-4">
                <h3
                  className={`${fontDisplay} text-2xl sm:text-4xl font-black uppercase tracking-tight text-fd-foreground group-hover:translate-x-1.5 transition-transform duration-300 flex items-baseline gap-2`}
                >
                  Biblioteca
                  <span className="text-xs font-mono font-normal text-fd-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    {"// ESSAYS"}
                  </span>
                </h3>
                <p className="text-xs sm:text-base text-fd-muted-foreground font-light leading-relaxed">
                  Mi jardín digital. Aquí es donde guardo los escritos que no guardan relación con
                  la carrera. Puedes encontrar de todo. Se divide en el blog, los escritos y los
                  bookmarks.
                </p>
              </div>
              <div className="pt-3 border-t border-fd-border/60 flex items-center justify-between font-mono text-[11px] sm:text-xs uppercase tracking-widest text-fd-foreground">
                <span className="flex items-center gap-1.5 group-hover:underline font-semibold">
                  Leer ensayos{' '}
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-fd-primary transition-transform group-hover:translate-x-1" />
                </span>
                <span className="text-fd-muted-foreground group-hover:text-fd-primary transition-colors">
                  EN EXPANSIÓN (✧ω✧)
                </span>
              </div>
            </Link>
          </div>
        </section>

        {/* Telemetría, Citas & Stack */}
        <section className="enter [animation-delay:160ms] grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
          <div
            className={`lg:col-span-7 bg-fd-card border border-fd-border p-5 sm:p-8 flex flex-col justify-between relative overflow-hidden ${NOTCH_LG} ${GLOW_HOVER} transition-shadow duration-500`}
          >
            <CornerMarks />
            <div className="flex items-center justify-between font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-fd-muted-foreground">
              <span className="flex items-center gap-2 text-fd-foreground font-bold">
                <Radio className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-fd-primary animate-pulse" />
                PENSAMIENTO INTERCEPTADO
              </span>
              <span className="flex items-center gap-2">
                <span aria-hidden="true" className="hidden sm:flex items-end gap-[2px] h-3.5">
                  {[
                    { id: 'b1', h: 3, delay: 0 },
                    { id: 'b2', h: 6, delay: 0.08 },
                    { id: 'b3', h: 4, delay: 0.16 },
                    { id: 'b4', h: 8, delay: 0.24 },
                    { id: 'b5', h: 5, delay: 0.32 },
                    { id: 'b6', h: 7, delay: 0.4 },
                    { id: 'b7', h: 3, delay: 0.48 },
                  ].map((bar) => (
                    <span
                      key={bar.id}
                      className="w-[2px] bg-fd-primary/60"
                      style={{
                        height: `${bar.h}px`,
                        animation: `wave 1.2s ease-in-out ${bar.delay}s infinite alternate`,
                      }}
                    />
                  ))}
                </span>
                FRECUENCIA_01
              </span>
            </div>

            {/* Bloque de cita 100% neutro (escala de grises limpia sin tinte de color) */}
            <div className="my-4 font-serif text-base sm:text-xl md:text-2xl italic text-fd-foreground leading-relaxed pl-4 sm:pl-5 border-l-2 border-fd-border/80 grayscale">
              <QuoteClient
                initialQuote={quotes[Math.floor(Math.random() * quotes.length)]}
                allQuotes={quotes}
              />
            </div>

            <div className="pt-3 border-t border-fd-border/60 flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-fd-muted-foreground uppercase tracking-widest">
              <span>CITAS</span>
              <span className="text-fd-foreground font-semibold flex items-center gap-1">
                TRANSMISIÓN CONTINUA{' '}
                <span className="text-fd-primary">{"// [ ◉ _ ◉ ]"}</span>
              </span>
            </div>
          </div>

          <div
            className={`lg:col-span-5 bg-fd-card border border-fd-border p-5 sm:p-8 flex flex-col justify-between space-y-4 relative ${NOTCH_LG} ${GLOW_HOVER} transition-shadow duration-500`}
          >
            <CornerMarks />
            <div>
              <div className="font-mono text-[11px] sm:text-xs tracking-[0.25em] text-fd-muted-foreground uppercase font-bold mb-1.5 sm:mb-2 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-fd-primary" /> ARQUITECTURA
                </span>
                <span className="text-[9px] opacity-70">NERV_STYLE</span>
              </div>
              <h3
                className={`${fontDisplay} text-base sm:text-lg font-bold tracking-tight text-fd-foreground mb-1 sm:mb-1.5`}
              >
                Rendimiento sin compromisos.
              </h3>
              <p className="text-xs sm:text-sm text-fd-muted-foreground font-light leading-relaxed">
                Construido como un monolito estático ultrarrápido sin dependencias superfluas. Cada
                byte es renderizado con el único propósito de transferir ideas sin latencia.
              </p>
            </div>
            <div className="space-y-1.5 sm:space-y-2 pt-3 border-t border-fd-border/60 [container-type:inline-size]">
              <div className="font-mono text-[9px] sm:text-[10px] text-fd-muted-foreground uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <CircuitBoard className="h-3 w-3 text-fd-primary" /> TECNOLOGÍA EN EJECUCIÓN:
                </span>
                <span className="text-fd-foreground font-semibold">{"// 100% SYNC"}</span>
              </div>
              <div className="flex flex-wrap gap-1 sm:gap-1.5 font-mono text-[10px] sm:text-[11px]">
                {['Next.js 15', 'Tailwind v4', 'Fumadocs', 'MDX', 'TypeScript'].map((tech) => (
                  <span
                    key={tech}
                    className={`px-1.5 py-0.5 sm:px-2 sm:py-1 bg-fd-muted border border-fd-border text-fd-foreground font-medium uppercase tracking-wider transition-colors hover:border-fd-primary/50 hover:bg-fd-foreground hover:text-fd-background ${NOTCH_SM}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Manifiesto, Redes & FAQ */}
        <section className="enter [animation-delay:200ms] grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 pt-4 border-t border-fd-border">
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <div className="space-y-2 sm:space-y-2.5">
              <span className="font-mono text-[11px] sm:text-xs tracking-[0.3em] text-fd-muted-foreground uppercase flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Layers3 className="h-3.5 w-3.5 text-fd-primary" /> {"// MANIFIESTO"}
                </span>
                <span className="text-[10px] opacity-60">( ╥﹏╥)</span>
              </span>
              <h2
                className={`${fontDisplay} text-balance text-lg sm:text-2xl font-extrabold uppercase tracking-tight text-fd-foreground`}
              >
                Esto no es un blog, es un jardín.
              </h2>
              <p className="text-xs sm:text-base text-fd-muted-foreground font-light leading-relaxed">
                Un espacio no lineal donde las ideas germinan en público y crecen orgánicamente. Sin
                algoritmos, sin la urgencia de las redes sociales. Las plantas no crecen en líneas
                rectas, el pensamiento tampoco.
              </p>
            </div>
            <div className="space-y-2 sm:space-y-2.5">
              <span className="font-mono text-[11px] sm:text-xs tracking-[0.3em] text-fd-muted-foreground uppercase block">
                {"// ENLACES EXTERNOS"}
              </span>
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                <SocialNode
                  href="https://github.com/uremy"
                  icon={<Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                  label="GitHub"
                  sublabel="[CODE]"
                />
                <SocialNode
                  href="https://youtube.com/@uremy"
                  icon={<Youtube className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                  label="YouTube"
                  sublabel="[VIDEO]"
                />
                <SocialNode
                  href="https://instagram.com/ure.emy"
                  icon={<Instagram className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                  label="Instagram"
                  sublabel="[LOGS]"
                />
                <SocialNode
                  href="https://twitter.com/Taimilog"
                  icon={<Twitter className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                  label="Twitter / X"
                  sublabel="[FEED]"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between border-b border-fd-border pb-2 sm:pb-2.5">
              <h3
                className={`${fontDisplay} text-base sm:text-lg font-bold uppercase tracking-tight text-fd-foreground flex items-center gap-2`}
              >
                Preguntas Frecuentes
                <span className="text-[10px] font-mono text-fd-primary font-normal">
                  {"// 質問"}
                </span>
              </h3>
              <span className="font-mono text-[11px] sm:text-xs text-fd-muted-foreground">
                REF: 004
              </span>
            </div>
            <Accordions type="single" collapsible className="space-y-1.5 sm:space-y-2">
              <Accordion
                title="¿Qué es exactamente Taimilog y cuál es su propósito?"
                className="border border-fd-border px-4 py-2 sm:px-5 sm:py-2.5 bg-fd-card hover:border-fd-foreground/40 transition-colors rounded-none text-xs sm:text-sm font-semibold text-fd-foreground"
              >
                <p className="font-sans text-fd-muted-foreground leading-relaxed text-xs sm:text-sm pt-1 pb-2 sm:pb-3 font-light">
                  Taimilog es un espacio digital personal y evolutivo donde almaceno y sistematizo
                  todo lo que aprendo en mi camino por la medicina, además de ensayos personales.
                  Funciona como un segundo cerebro público donde comparto apuntes estructurados que
                  pueden servir tanto a estudiantes como a mentes curiosas.
                </p>
              </Accordion>
              <Accordion
                title="¿Cuál es la etimología y significado detrás de 'Taimilog'?"
                className="border border-fd-border px-4 py-2 sm:px-5 sm:py-2.5 bg-fd-card hover:border-fd-foreground/40 transition-colors rounded-none text-xs sm:text-sm font-semibold text-fd-foreground"
              >
                <p className="font-sans text-fd-muted-foreground leading-relaxed text-xs sm:text-sm pt-1 pb-2 sm:pb-3 font-light">
                  El nombre es un acrónimo conceptual:{' '}
                  <strong className="text-fd-foreground font-semibold">Taimi-</strong> proviene de{' '}
                  <em>&quot;Taimado&quot;</em> (astuto, sagaz o persistente), mientras que{' '}
                  <strong className="text-fd-foreground font-semibold">-log</strong> se deriva de{' '}
                  <em>&quot;Logbook&quot;</em> (bitácora o registro de navegación). La filosofía es
                  mantener los <em>&quot;registros continuos de una mente taimada&quot;</em>.
                </p>
              </Accordion>
              <Accordion
                title="¿Por qué recomiendas crear un Jardín Digital propio?"
                className="border border-fd-border px-4 py-2 sm:px-5 sm:py-2.5 bg-fd-card hover:border-fd-foreground/40 transition-colors rounded-none text-xs sm:text-sm font-semibold text-fd-foreground"
              >
                <p className="font-sans text-fd-muted-foreground leading-relaxed text-xs sm:text-sm pt-1 pb-2 sm:pb-3 font-light">
                  La web moderna se ha vuelto efímera y algorítmica; las redes sociales no ofrecen
                  propiedad real ni un espacio para estructurar el pensamiento a largo plazo. Tener
                  un rincón propio te aleja del feed y te permite cultivar tus ideas, portafolio y
                  conocimientos a tu propio ritmo.
                </p>
              </Accordion>
              <Accordion
                title="¿Quién es el personaje del avatar, y por qué aparece el número 42?"
                className="border border-fd-border px-4 py-2 sm:px-5 sm:py-2.5 bg-fd-card hover:border-fd-foreground/40 transition-colors rounded-none text-xs sm:text-sm font-semibold text-fd-foreground"
              >
                <p className="font-sans text-fd-muted-foreground leading-relaxed text-xs sm:text-sm pt-1 pb-2 sm:pb-3 font-light">
                  Es la inigualable <strong className="text-fd-foreground font-semibold">Señora Herta</strong>{' '}
                  de <em>Honkai: Star Rail</em>:{' '}
                  <em>
                    &quot;Madam Herta is a peerless gem. Madam Herta is an unrivaled genius. Madam
                    Herta is an inimitable beauty.&quot;
                  </em>{' '}
                  El <strong className="text-fd-foreground font-semibold">42</strong> que acompaña
                  su retrato es un guiño propio, no un dato del juego: es la Respuesta Última al
                  Sentido de la Vida, el Universo y Todo lo Demás, según{' '}
                  <em>La Guía del Autoestopista Galáctico</em> de Douglas Adams. Dos referencias
                  distintas, una misma obsesión por las respuestas correctas.
                </p>
              </Accordion>
            </Accordions>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-fd-border/80 bg-fd-card/50 backdrop-blur-md w-full">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-6 pb-24 sm:pb-8 flex flex-col md:flex-row items-center justify-between gap-3 font-mono text-[9px] sm:text-[11px] tracking-widest text-fd-muted-foreground uppercase">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-6">
            <div className="flex items-center gap-1.5 sm:gap-2 text-fd-foreground font-semibold">
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fd-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-fd-primary" />
              </span>
              <span className="flex items-center gap-1 sm:gap-1.5">
                <Cpu className="h-3 w-3 text-fd-primary" /> {"SYS.TAIMILOG // v2.6"}
              </span>
            </div>
            <span className="flex items-center gap-1 border-l border-fd-border/60 pl-3 sm:pl-6">
              <Activity className="h-3 w-3 text-fd-primary" /> NÚCLEO: ACTIVO
            </span>
            <span className="hidden sm:inline border-l border-fd-border/60 pl-6">
              MODO: LECTURA_PROFUNDA (￣▽￣)ノ
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-center">
            <span className="text-fd-foreground font-bold hidden sm:inline">
              RENDER: SSG · EDGE
            </span>
            <span className="sm:border-l sm:border-fd-border/60 sm:pl-6 hover:text-fd-foreground transition-colors">
              © 20XX TAIMILOG — SEE YOU SPACE COWBOY...
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/**
 * Marcas de esquina — refuerza el lenguaje de "plano técnico" sobre las tarjetas
 * que usan NOTCH_LG. Puramente decorativo, sin coste de JS.
 */
function CornerMarks() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-fd-foreground/25 group-hover:border-fd-primary/70 transition-colors duration-500"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-fd-foreground/25 group-hover:border-fd-primary/70 transition-colors duration-500"
      />
    </>
  );
}

/**
 * Ticker de estado — marquesina CSS pura (sin JS de cliente) que simula
 * telemetría en vivo del sitio. Se pausa con prefers-reduced-motion.
 */
function StatusTicker() {
  const items = [
    'SYNC: GOOGLE SEARCH CONSOLE',
    'NODE: VERCEL EDGE',
    'INDEXNOW · SYNC ACTIVO',
    'BUILD: NEXT.JS 15 · SSG',
    'ESTADO: LECTURA_PROFUNDA',
    'REG: 42 · REV.04 (★ω★)/',
    'STATUS: CHILLING~',
    'SYS_VER // 2.0.4',
  ];
  return (
    <div className="relative border-y border-fd-border/70 bg-fd-card/40 overflow-hidden select-none">
      <div className="flex items-center gap-3 px-3 py-1.5 sm:py-2 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-fd-muted-foreground">
        <span className="flex items-center gap-1.5 shrink-0 text-fd-foreground font-semibold pr-3 border-r border-fd-border/60">
          <Signal className="h-3 w-3 text-fd-primary animate-pulse" /> STATUS
        </span>
        <div className="overflow-hidden flex-1 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max gap-8 marquee-track">
            {[...items, ...items].map((text) => (
              <span
                key={text}
                className="flex items-center gap-2 whitespace-nowrap hover:text-fd-foreground transition-colors"
              >
                <ScanLine className="h-3 w-3 opacity-50 text-fd-primary" /> {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialNode({
  href,
  icon,
  label,
  sublabel,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  sublabel?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative bg-fd-card border border-fd-border p-2.5 sm:p-3 flex items-center justify-between transition-all hover:bg-fd-foreground hover:text-fd-background hover:border-fd-foreground ${NOTCH_SM}`}
    >
      <div className="flex items-center gap-2 sm:gap-2.5">
        <span className="text-fd-muted-foreground group-hover:text-inherit transition-colors">
          {icon}
        </span>
        <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1.5">
          <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
            {label}
          </span>
          {sublabel && (
            <span className="font-mono text-[9px] text-fd-muted-foreground/60 group-hover:text-inherit/70 transition-colors">
              {sublabel}
            </span>
          )}
        </div>
      </div>
      <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
    </a>
  );
}