import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Unbounded, Manrope } from 'next/font/google';
import {
  Stethoscope, BookOpenText, Github, Youtube,
  Instagram, Search, ArrowUpRight,
  Ruler, FlaskConical, Twitter, Radio,
  Sparkles, Dna, MapPin, Orbit, Compass, Radar,
} from 'lucide-react';
import { quotes } from '@/lib/quotes';
import { QuoteClient } from '@/components/quote-client';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';

export const metadata: Metadata = {
  title: 'Taimilog | Consola de un Jardín Digital',
  description: 'Terminal de apuntes médicos, ensayos y bitácora personal.',
  openGraph: {
    title: 'Taimilog',
    description: 'Apuntes de medicina y jardín digital',
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

const AVATAR_SIZE = 160;

/* ══════════════════════════════════════════════════════════════════════
   SISTEMA DE DISEÑO: CONSOLA ORBITAL / STREAMLINE MODERNE FRÍO
   Vacío + titanio + cromo, formas continuas, sin texturas de papel,
   sin sombras duras. Precisión geométrica, un solo gesto de movimiento.
   ══════════════════════════════════════════════════════════════════════ */

const unbounded = Unbounded({
  subsets: ['latin'],
  weight: ['500', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const fontDisplay = 'font-[family-name:var(--font-display)]';

const ink = 'text-[#14171B] dark:text-[#E8EAED]';
const inkDim = 'text-[#14171B]/55 dark:text-[#E8EAED]/45';
const inkFaint = 'text-[#14171B]/35 dark:text-[#E8EAED]/28';

const accentViolet = 'text-[#6D4FC7] dark:text-[#B8A6FF]';
const accentCyan = 'text-[#0E8A96] dark:text-[#5EEAD4]';
const accentAmber = 'text-[#A8710E] dark:text-[#F0B429]';

// Panel "consola": forma continua, borde capilar, sin sombra dura
const consolePanel = [
  'relative rounded-[28px] border border-[#14171B]/10 dark:border-[#E8EAED]/12',
  'bg-white dark:bg-[#101216]',
  'transition-[transform,box-shadow,border-color] duration-500 ease-out',
].join(' ');

const consoleHover = [
  'hover:-translate-y-1 hover:border-[#14171B]/25 dark:hover:border-[#E8EAED]/25',
  'hover:shadow-[0_28px_60px_-32px_rgba(20,23,27,0.35)]',
  'dark:hover:shadow-[0_28px_60px_-24px_rgba(94,234,212,0.16)]',
].join(' ');

// Recuadro embutido de precisión (micro-grilla fría)
const gridPanel = [
  'relative rounded-2xl border border-[#14171B]/10 dark:border-[#E8EAED]/12',
  'bg-[#F2F3F5] dark:bg-[#0B0C0F]',
  'bg-[linear-gradient(#14171B08_1px,transparent_1px),linear-gradient(90deg,#14171B08_1px,transparent_1px)]',
  'dark:bg-[linear-gradient(#E8EAED0D_1px,transparent_1px),linear-gradient(90deg,#E8EAED0D_1px,transparent_1px)]',
  'bg-[size:12px_12px]',
].join(' ');

const pill = 'inline-flex items-center gap-1.5 rounded-full border border-[#14171B]/15 dark:border-[#E8EAED]/16 bg-[#F2F3F5] dark:bg-[#0B0C0F] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em]';

export default function HomePage() {
  return (
    <main
      className={`${unbounded.variable} ${manrope.variable} font-[family-name:var(--font-body)] relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 py-10 pb-32 ${ink} bg-[#F2F3F5] dark:bg-[#08090B] selection:bg-[#5EEAD4]/30 dark:selection:bg-[#5EEAD4]/20`}
    >
      {/* Ambiente: vacío frío + resplandor + grilla mínima — 100% CSS, cero peso */}
      <div aria-hidden className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.4] dark:opacity-[0.28] bg-[radial-gradient(ellipse_70%_45%_at_50%_-8%,rgba(184,166,255,0.14),transparent_62%)]" />
        <div className="absolute inset-0 opacity-40 dark:opacity-25 bg-[linear-gradient(#14171B06_1px,transparent_1px),linear-gradient(90deg,#14171B06_1px,transparent_1px)] dark:bg-[linear-gradient(#E8EAED08_1px,transparent_1px),linear-gradient(90deg,#E8EAED08_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* ══════════════════════════════════════════════════════════════
         BARRA DE ÍNDICE — navegación de sectores, estado del sistema
         ══════════════════════════════════════════════════════════════ */}
      <nav
        aria-label="Índice de sectores"
        className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-full border border-[#14171B]/10 dark:border-[#E8EAED]/12 bg-white/80 dark:bg-[#101216]/80 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em]"
      >
        <div className={`flex flex-wrap items-center gap-3 sm:gap-4 ${inkDim}`}>
          <a href="#identidad" className={`transition-colors hover:${ink}`}>00 · Identidad</a>
          <span className={inkFaint}>/</span>
          <a href="#sistemas" className="transition-colors hover:text-[#14171B] dark:hover:text-[#E8EAED]">01 · Sistemas</a>
          <span className={inkFaint}>/</span>
          <a href="#manifiesto" className="transition-colors hover:text-[#14171B] dark:hover:text-[#E8EAED]">02 · Manifiesto</a>
        </div>
        <div className={`flex items-center gap-2 ${inkDim}`}>
          <Orbit className="h-3 w-3 text-[#0E8A96] dark:text-[#5EEAD4] animate-[spin_9s_linear_infinite] motion-reduce:animate-none" />
          <span>EN LÍNEA</span>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════════════
         SECTOR 00 — IDENTIDAD
         ══════════════════════════════════════════════════════════════ */}
      <section id="identidad" className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5 scroll-mt-24">
        <div className={`${consolePanel} lg:col-span-7 p-8 sm:p-10 md:p-12 flex flex-col justify-between min-h-[460px]`}>
          <ViewportBrackets />
          <div className="flex items-center justify-between mb-8 font-mono text-[10px] uppercase tracking-[0.24em]">
            <span className={inkFaint}>REGISTRO // 8F-2439</span>
            <span className={pill}>
              <span className="h-1.5 w-1.5 rounded-full bg-[#0E8A96] dark:bg-[#5EEAD4] animate-pulse" />
              ARCHIVO ABIERTO
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-14 my-auto">
            {/* Viewport orbital — elemento firma, reemplaza el retrato de obturador */}
            <div className="relative shrink-0 mx-auto md:mx-0 h-[168px] w-[168px]">
              <div
                aria-hidden
                className="absolute inset-0 rounded-full text-[#14171B]/25 dark:text-[#E8EAED]/22 animate-[spin_70s_linear_infinite] motion-reduce:animate-none [mask-image:radial-gradient(circle,transparent_63%,black_65%,black_100%)] bg-[repeating-conic-gradient(from_0deg,currentColor_0deg_1deg,transparent_1deg_9deg)]"
              />
              <div
                aria-hidden
                className="absolute inset-0 rounded-full opacity-70 [mask-image:radial-gradient(circle,transparent_66%,black_68%,black_74%,transparent_76%)] bg-[conic-gradient(from_-30deg,#5EEAD4_0deg_64deg,transparent_64deg_360deg)] dark:opacity-80"
              />
              <div className="absolute inset-[9px] rounded-full border border-[#14171B]/15 dark:border-[#E8EAED]/15" />
              <div className="absolute inset-[22px] rounded-full overflow-hidden border border-[#14171B]/20 dark:border-[#E8EAED]/20 bg-black">
                <Image
                  src="/avatar.webp"
                  alt="Uremy — Señora Herta"
                  width={AVATAR_SIZE}
                  height={AVATAR_SIZE}
                  className="object-cover w-full h-full grayscale-[10%] contrast-[1.05]"
                  priority
                  unoptimized
                />
              </div>
            </div>

            <div className="flex-1 min-w-0 space-y-4 text-center md:text-left">
              <div className="space-y-1.5">
                <div className={`flex items-center justify-center md:justify-start gap-2 font-mono text-[11px] uppercase tracking-[0.24em] ${inkDim}`}>
                  <Dna className={`h-3.5 w-3.5 ${accentViolet}`} />
                  <span>Estudiante de medicina & archivista</span>
                </div>
                <h1 className={`${fontDisplay} text-5xl sm:text-6xl font-extrabold uppercase tracking-tight leading-[0.92] ${ink}`}>
                  Uremy
                </h1>
              </div>
              <p className={`text-sm sm:text-base ${inkDim} leading-relaxed max-w-xl mx-auto md:mx-0`}>
                Bienvenido, siempre es grato verte por aquí. Explora mis apuntes médicos, ensayos y reflexiones dentro de este archivo en construcción permanente.
              </p>
              <div className={`${gridPanel} p-4 text-left`}>
                <div className={`text-[10px] font-mono uppercase tracking-[0.2em] mb-1 ${accentAmber}`}>TRANSMISIÓN REGISTRADA</div>
                <p className="text-[13px] font-serif italic text-[#14171B]/85 dark:text-[#E8EAED]/80">
                  &quot;그냥 저예요. 한국어 연습할 때도 있고 그냥 방황할 때도 있고.&quot;
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-8 mt-8 border-t border-[#14171B]/10 dark:border-[#E8EAED]/10">
            <div className="flex flex-wrap items-center gap-2">
              <StatusChip icon={<MapPin className="h-3 w-3" />} label="Sector: archivo personal" />
              <StatusChip icon={<Stethoscope className="h-3 w-3" />} label="Núcleo: medicina" />
              <StatusChip icon={<BookOpenText className="h-3 w-3" />} label="Bitácora viva" />
            </div>
            <span className={`font-mono text-[10px] uppercase tracking-[0.22em] ${inkFaint}`}>ID: 0x8F2439</span>
          </div>
        </div>

        {/* COLUMNA DE TERMINALES */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
          <Link
            href="#"
            className={`${consolePanel} ${consoleHover} p-7 flex flex-col justify-between min-h-[190px] group`}
          >
            <ViewportBrackets />
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
              <span className={`${inkFaint} font-bold`}>TERMINAL 01</span>
              <span className={`${pill} py-0.5`}>⌘ + K</span>
            </div>
            <div className="my-4 flex items-center gap-4">
              <div className="p-3.5 rounded-2xl border border-[#14171B]/15 dark:border-[#E8EAED]/15 bg-[#F2F3F5] dark:bg-[#0B0C0F]">
                <Search className={`h-6 w-6 ${ink}`} />
              </div>
              <div>
                <h3 className={`${fontDisplay} text-lg font-bold uppercase tracking-tight ${ink}`}>Búsqueda global</h3>
                <p className={`text-xs font-mono ${inkDim}`}>Indexando apuntes…</p>
              </div>
            </div>
            <div className={`border-t border-[#14171B]/10 dark:border-[#E8EAED]/10 pt-2 font-mono text-[9px] uppercase tracking-[0.2em] ${inkFaint}`}>
              válido en todo el archivo
            </div>
          </Link>

          <div className={`${consolePanel} p-7 flex flex-col justify-between min-h-[220px]`}>
            <ViewportBrackets />
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
              <span className={`flex items-center gap-1.5 font-bold ${inkDim}`}>
                <Ruler className={`h-3.5 w-3.5 ${accentCyan}`} /> STACK
              </span>
              <span className={inkFaint}>TERMINAL 02</span>
            </div>
            <div className="flex flex-wrap gap-1.5 my-auto py-2">
              {['Next.js 15', 'MDX', 'Tailwind', 'Fumadocs', 'TypeScript', 'Vercel'].map((tech) => (
                <span key={tech} className={pill}>
                  {tech}
                </span>
              ))}
            </div>
            <div className={`flex items-center justify-between pt-3 border-t border-[#14171B]/10 dark:border-[#E8EAED]/10 text-[10px] font-mono ${inkFaint}`}>
              <span>SISTEMA ESTABLE</span>
              <span className="italic">hecho con ♡</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
         SECTOR 01 — SISTEMAS DE CONTENIDO
         ══════════════════════════════════════════════════════════════ */}
      <section id="sistemas" className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-5 scroll-mt-24">
        <Link
          href="/medicina/introduccion"
          className={`${consolePanel} ${consoleHover} md:col-span-6 lg:col-span-4 p-8 flex flex-col justify-between min-h-[260px] group/med`}
        >
          <ViewportBrackets />
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-2xl border border-[#6D4FC7]/40 dark:border-[#B8A6FF]/40">
              <Stethoscope className={`h-6 w-6 ${accentViolet}`} />
            </div>
            <div className="text-right font-mono">
              <span className={`block text-[10px] font-bold tracking-[0.2em] ${inkFaint}`}>SISTEMA 01</span>
              <span className={`text-xs font-black tracking-[0.18em] uppercase ${accentViolet}`}>MEDICINA</span>
            </div>
          </div>
          <div className="space-y-2 my-6">
            <h2 className={`${fontDisplay} text-2xl sm:text-3xl font-bold uppercase tracking-tight ${ink}`}>Apuntes médicos</h2>
            <div className="h-px w-10 bg-[#6D4FC7] dark:bg-[#B8A6FF]" />
            <p className={`text-sm ${inkDim} leading-relaxed`}>
              Fisiología, patología, farmacología y resúmenes clínicos. Mi segundo cerebro para la vida hospitalaria.
            </p>
          </div>
          <div className={`flex items-center justify-between pt-4 border-t border-[#14171B]/10 dark:border-[#E8EAED]/10 font-mono text-xs font-bold ${accentViolet}`}>
            <span className="tracking-[0.18em] uppercase">Explorar sistema</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover/med:translate-x-1 group-hover/med:-translate-y-1" />
          </div>
        </Link>

        <Link
          href="/biblioteca/blog"
          className={`${consolePanel} ${consoleHover} md:col-span-6 lg:col-span-4 p-8 flex flex-col justify-between min-h-[260px] group/bib`}
        >
          <ViewportBrackets />
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-2xl border border-[#0E8A96]/40 dark:border-[#5EEAD4]/40">
              <BookOpenText className={`h-6 w-6 ${accentCyan}`} />
            </div>
            <div className="text-right font-mono">
              <span className={`block text-[10px] font-bold tracking-[0.2em] ${inkFaint}`}>SISTEMA 02</span>
              <span className={`text-xs font-black tracking-[0.18em] uppercase ${accentCyan}`}>BIBLIOTECA</span>
            </div>
          </div>
          <div className="space-y-2 my-6">
            <h3 className={`${fontDisplay} text-2xl sm:text-3xl font-bold uppercase tracking-tight ${ink}`}>Archivo & blog</h3>
            <div className="h-px w-10 bg-[#0E8A96] dark:bg-[#5EEAD4]" />
            <p className={`text-sm ${inkDim} leading-relaxed`}>
              Reflexiones, ensayos, reseñas literarias y el registro evolutivo de un jardín digital en expansión.
            </p>
          </div>
          <div className={`flex items-center justify-between pt-4 border-t border-[#14171B]/10 dark:border-[#E8EAED]/10 font-mono text-xs font-bold ${accentCyan}`}>
            <span className="tracking-[0.18em] uppercase">Acceder al archivo</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover/bib:translate-x-1 group-hover/bib:-translate-y-1" />
          </div>
        </Link>

        <div className={`${consolePanel} md:col-span-12 lg:col-span-4 p-8 flex flex-col justify-between min-h-[260px]`}>
          <ViewportBrackets />
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] border-b border-[#14171B]/10 dark:border-[#E8EAED]/10 pb-3">
            <span className={`flex items-center gap-1.5 font-bold ${accentAmber}`}>
              <Radio className="h-3.5 w-3.5" /> TRANSMISIÓN
            </span>
            <span className={inkFaint}>SISTEMA 03</span>
          </div>
          <div className="my-auto py-6 font-serif">
            <QuoteClient
              initialQuote={quotes[Math.floor(Math.random() * quotes.length)]}
              allQuotes={quotes}
            />
          </div>
          <div className={`flex items-center justify-between pt-3 border-t border-[#14171B]/10 dark:border-[#E8EAED]/10 font-mono text-[10px] uppercase tracking-[0.2em] ${inkFaint}`}>
            <span>ESTADO: RECEPTIVO</span>
            <span className="flex items-center gap-1"><Sparkles className={`h-3 w-3 ${accentAmber}`} /> INSPIRACIÓN</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
         SECTOR 02 — MANIFIESTO, CONTACTOS Y FAQ
         ══════════════════════════════════════════════════════════════ */}
      <section id="manifiesto" className="grid grid-cols-1 lg:grid-cols-12 gap-5 scroll-mt-24">
        <div className="lg:col-span-4 space-y-5 flex flex-col justify-between">
          <div className={`${consolePanel} p-8 border-l-[3px]! border-l-[#0E8A96] dark:border-l-[#5EEAD4]`}>
            <ViewportBrackets />
            <div className={`flex items-center gap-2 mb-3 font-mono text-[11px] uppercase tracking-[0.2em] font-black ${accentCyan}`}>
              <FlaskConical className="h-4 w-4" /> NOTA DE ARCHIVO
            </div>
            <h4 className={`${fontDisplay} text-lg sm:text-xl font-bold uppercase tracking-tight mb-2 ${ink}`}>
              Este sitio es un jardín digital.
            </h4>
            <p className={`text-xs sm:text-sm ${inkDim} leading-relaxed`}>
              No es un blog estático ni un portafolio rígido. Es un ecosistema vivo donde coexisten apuntes a medio terminar, ideas en germinación y reflexiones profundas.
            </p>
            <div className={`mt-4 pt-3 border-t border-[#14171B]/10 dark:border-[#E8EAED]/10 flex items-center justify-between font-mono text-[11px] italic ${inkDim}`}>
              <span>las plantas no crecen perfectas</span>
              <span className={accentCyan}>🌱</span>
            </div>
          </div>

          <div className={`${consolePanel} p-6`}>
            <ViewportBrackets />
            <div className={`font-mono text-[10px] uppercase tracking-[0.2em] font-bold mb-1 px-1 flex items-center justify-between ${inkDim}`}>
              <span className="flex items-center gap-1.5"><Compass className="h-3.5 w-3.5" /> CONTACTO — TERMINAL</span>
              <span>4 CANALES</span>
            </div>
            <div className="divide-y divide-[#14171B]/10 dark:divide-[#E8EAED]/10">
              <TerminalRow index="01" href="https://github.com/uremy" icon={<Github className="h-4 w-4" />} label="GitHub" sub="CÓDIGO" />
              <TerminalRow index="02" href="https://youtube.com/@uremy" icon={<Youtube className="h-4 w-4" />} label="YouTube" sub="VIDEO" />
              <TerminalRow index="03" href="https://instagram.com/ure.emy" icon={<Instagram className="h-4 w-4" />} label="Instagram" sub="VISUAL" />
              <TerminalRow index="04" href="https://twitter.com/Taimilog" icon={<Twitter className="h-4 w-4" />} label="Twitter / X" sub="RED" />
            </div>
          </div>
        </div>

        <section className={`${consolePanel} lg:col-span-8 p-8 sm:p-10 md:p-12 flex flex-col justify-between`} aria-label="Preguntas frecuentes">
          <ViewportBrackets />
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 pb-5 border-b border-[#14171B]/10 dark:border-[#E8EAED]/10">
              <div>
                <div className={`flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] mb-1 ${inkDim}`}>
                  <Radar className="h-3.5 w-3.5" /> CONSULTA DE ARCHIVO
                </div>
                <h2 className={`${fontDisplay} text-3xl sm:text-4xl font-bold uppercase tracking-tight ${ink}`}>
                  Preguntas frecuentes
                </h2>
              </div>
              <span className={pill}>FAQ · 005</span>
            </div>
            <Accordions type="single" collapsible className="space-y-3">
              <Accordion title="¿Qué es exactamente Taimilog y cuál es su propósito?" className={`${gridPanel} px-5 py-1`}>
                <p className="font-serif text-[#14171B]/80 dark:text-[#E8EAED]/75 leading-relaxed text-sm pt-2 pb-3">
                  Taimilog es un espacio digital personal y evolutivo donde almaceno y sistematizo todo lo que aprendo en mi camino por la medicina, además de ensayos personales. Funciona como un segundo cerebro público donde comparto apuntes estructurados que pueden servir tanto a estudiantes como a mentes curiosas.
                </p>
              </Accordion>
              <Accordion title="¿Cuál es la etimología y significado detrás de 'Taimilog'?" className={`${gridPanel} px-5 py-1`}>
                <p className="font-serif text-[#14171B]/80 dark:text-[#E8EAED]/75 leading-relaxed text-sm pt-2 pb-3">
                  El nombre es un acrónimo conceptual: <strong>Taimi-</strong> proviene de <em>&quot;Taimado&quot;</em> (astuto, sagaz o persistente), mientras que <strong>-log</strong> se deriva de <em>&quot;Logbook&quot;</em> (bitácora o registro de navegación). La filosofía es mantener los <em>&quot;registros continuos de una mente taimada&quot;</em>.
                </p>
              </Accordion>
              <Accordion title="¿Por qué recomiendas crear un Jardín Digital o sitio personal propio?" className={`${gridPanel} px-5 py-1`}>
                <p className="font-serif text-[#14171B]/80 dark:text-[#E8EAED]/75 leading-relaxed text-sm pt-2 pb-3">
                  La web moderna se ha vuelto efímera y algorítmica; las redes sociales no ofrecen propiedad real ni un espacio para estructurar el pensamiento a largo plazo. Tener un rincón propio te aleja del feed y te permite cultivar tus ideas, portafolio y conocimientos a tu propio ritmo.
                </p>
              </Accordion>
              <Accordion title="¿Quién es el personaje que aparece en el avatar principal?" className={`${gridPanel} px-5 py-1`}>
                <p className="font-serif text-[#14171B]/80 dark:text-[#E8EAED]/75 leading-relaxed text-sm pt-2 pb-3">
                  ¡Es la inigualable <strong>Señora Herta</strong> de <em>Honkai: Star Rail</em>! Como dice la célebre cita de la Estación Espacial: <em>&quot;Madam Herta is a peerless gem. Madam Herta is an unrivaled genius. Madam Herta is an inimitable beauty.&quot;</em> Un símbolo de intelecto analítico y elegancia eterna.
                </p>
              </Accordion>
            </Accordions>
          </div>
          <div className={`mt-8 pt-6 border-t border-[#14171B]/10 dark:border-[#E8EAED]/10 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] ${inkFaint}`}>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0E8A96] dark:bg-[#5EEAD4] animate-pulse" />
              <span>BASE DE DATOS EN LÍNEA</span>
            </div>
            <span>© {new Date().getFullYear()} TAIMILOG ARCHIVO</span>
          </div>
        </section>
      </section>
    </main>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SUBCOMPONENTES
   ══════════════════════════════════════════════════════════════════════ */

/** Escuadras de visor tipo HUD en cada esquina — reemplazan las cruces de registro */
function ViewportBrackets() {
  const corners = [
    { pos: 'top-3 left-3', rotate: '' },
    { pos: 'top-3 right-3', rotate: 'rotate-90' },
    { pos: 'bottom-3 right-3', rotate: 'rotate-180' },
    { pos: 'bottom-3 left-3', rotate: '-rotate-90' },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 text-[#14171B]/15 dark:text-[#E8EAED]/15">
      {corners.map(({ pos, rotate }) => (
        <span key={pos} className={`absolute ${pos} h-4 w-4 ${rotate}`}>
          <span className="absolute top-0 left-0 h-full w-px bg-current" />
          <span className="absolute top-0 left-0 w-full h-px bg-current" />
        </span>
      ))}
    </div>
  );
}

/** Cápsula de estado — pastilla redonda tipo indicador de panel */
function StatusChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#14171B]/15 dark:border-[#E8EAED]/16 bg-[#F2F3F5] dark:bg-[#0B0C0F] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#14171B]/75 dark:text-[#E8EAED]/65">
      {icon}
      <span>{label}</span>
    </span>
  );
}

/** Fila de terminal de contacto con índice hexadecimal */
function TerminalRow({
  href, icon, label, sub, index,
}: { href: string; icon: React.ReactNode; label: string; sub: string; index: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center justify-between gap-3 py-3 pl-3 -ml-3 transition-colors hover:bg-[#14171B]/[0.03] dark:hover:bg-[#E8EAED]/[0.04]"
    >
      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-0 w-[2px] bg-[#0E8A96] dark:bg-[#5EEAD4] transition-all duration-300 group-hover:h-4/5" />
      <div className="flex items-center gap-3 min-w-0">
        <span className="font-mono text-[10px] text-[#14171B]/35 dark:text-[#E8EAED]/28">0x{index}</span>
        <span className="shrink-0 text-[#14171B] dark:text-[#E8EAED]">{icon}</span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-[#14171B] dark:text-[#E8EAED]">{label}</span>
          <span className="block truncate font-mono text-[9px] uppercase tracking-[0.16em] text-[#14171B]/40 dark:text-[#E8EAED]/32">{sub}</span>
        </span>
      </div>
      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[#14171B]/35 dark:text-[#E8EAED]/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}