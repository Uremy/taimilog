// page.tsx — Taimilog HomePage v2 — Bento cozy waifu garden
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Stethoscope, Brain, Github, Youtube,
  Instagram, Search, ArrowRight, Terminal,
  MapPin, HeartPulse, ExternalLink, Twitter,
  BookOpen, Sparkles, Coffee, Pencil, FlaskConical,
  Music2, Clock, Star
} from 'lucide-react';
import { quotes } from '@/lib/quotes';
import { QuoteClient } from '@/components/quote-client';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';

export const metadata: Metadata = {
  title: 'Taimilog',
  description: 'Apuntes de medicina y jardín digital',
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

const AVATAR_SIZE = 112;

// ─── TOKENS ───────────────────────────────────────────────────
const card =
  "relative overflow-hidden rounded-2xl border border-fd-border bg-fd-card transition-all duration-300";
const brandRose    = "text-[#8F2439] dark:text-[#E87D95]";
const brandBg      = "bg-[#8F2439]/10 dark:bg-[#E87D95]/10";
const brandHover   = "hover:border-[#8F2439]/40 dark:hover:border-[#E87D95]/40";
const sectionWrap  = "rounded-2xl border border-fd-border bg-fd-card/40 p-6 md:p-8";

// ─── DATOS HARDCODEADOS ───────────────────────────────────────
const recentNotes = [
  { title: "Sistema Nervioso Autónomo", category: "Fisiología", href: "/medicina/fisiologia/sna", icon: "🧠" },
  { title: "Farmacología Básica", category: "Farmaco", href: "/medicina/farmacologia/intro", icon: "💊" },
  { title: "Ciclo Cardíaco", category: "Fisiología", href: "/medicina/fisiologia/ciclo-cardiaco", icon: "🫀" },
  { title: "Patología Celular", category: "Patología", href: "/medicina/patologia/celular", icon: "🔬" },
  { title: "Homeostasis", category: "Fisiología", href: "/medicina/fisiologia/homeostasis", icon: "⚖️" },
];

const nowStudying = {
  subject: "Neurofisiología",
  chapter: "Cap. 7 — Potencial de Acción",
  progress: 68,
};

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────
export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8 pb-24 max-w-5xl space-y-3">

      {/* ══════════════════════════════════════════════════════
          FILA 1 — Hero + Cita + Now
      ══════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 md:grid-cols-12 gap-3">

        {/* ── PERFIL — col 6 ── */}
        <div className={`
          ${card} ${brandHover}
          col-span-2 md:col-span-6
          p-6 md:p-7
          bg-gradient-to-br from-[#8F2439]/8 via-fd-card to-fd-card
        `}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-5">

            {/* Avatar */}
            <div className="relative shrink-0 group">
              <div className="h-24 w-24 rounded-2xl overflow-hidden border-2 border-fd-background shadow-lg
                transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/avatar.webp"
                  alt="Uremy"
                  width={AVATAR_SIZE}
                  height={AVATAR_SIZE}
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
              <span
                className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full
                  bg-[#8F2439] border-2 border-fd-background grid place-items-center"
                aria-hidden="true"
              >
                <HeartPulse className="h-2.5 w-2.5 text-white" />
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <h1 className="text-2xl font-bold tracking-tight">Uremy</h1>
                <span className={`px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase
                  rounded-full ${brandBg} ${brandRose}`}>
                  taimilog
                </span>
              </div>
              <p className="text-sm text-fd-muted-foreground mb-1.5 leading-relaxed">
                Welcome, is always nice to see you here
              </p>
              <p className="text-xs text-fd-muted-foreground/70 mb-3 font-light italic">
                그냥 저예요. 한국어 연습할 때도 있고 그냥 방황할 때도 있고.
              </p>
              <div className="flex items-center gap-1.5 text-xs text-fd-muted-foreground">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                <span>우주</span>
              </div>
            </div>
          </div>

          {/* Redes sociales integradas en el perfil */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-fd-border/50">
            {[
              { href: "https://github.com/uremy",       icon: <Github className="h-4 w-4" />,    label: "GitHub"    },
              { href: "https://youtube.com/@uremy",     icon: <Youtube className="h-4 w-4" />,   label: "YouTube"   },
              { href: "https://instagram.com/ure.emy",  icon: <Instagram className="h-4 w-4" />, label: "Instagram" },
              { href: "https://twitter.com/Taimilog",   icon: <Twitter className="h-4 w-4" />,   label: "Twitter"   },
            ].map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                  bg-fd-background border border-fd-border text-xs text-fd-muted-foreground
                  hover:text-fd-foreground hover:border-fd-foreground/20
                  transition-all duration-200 group"
              >
                <span className="transition-transform group-hover:scale-110">{icon}</span>
                <span className="font-medium">{label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* ── CITA — col 3, row-span 2 — SIN MODIFICAR ── */}
        <div className={`
          ${card}
          col-span-1 md:col-span-3 md:row-span-2
          p-5
          bg-gradient-to-br from-indigo-500/8 to-transparent
          hover:border-indigo-500/30
          flex flex-col justify-center
        `}>
          <QuoteClient
            initialQuote={quotes[Math.floor(Math.random() * quotes.length)]}
            allQuotes={quotes}
          />
        </div>

        {/* ── AHORA ESTUDIANDO — col 3 ── */}
        <div className={`
          ${card} ${brandHover}
          col-span-1 md:col-span-3
          p-5 flex flex-col justify-between
          bg-gradient-to-br from-[#8F2439]/5 to-transparent
        `}>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FlaskConical className={`h-4 w-4 ${brandRose}`} aria-hidden="true" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-fd-muted-foreground">
                Ahora estudiando
              </span>
            </div>
            <p className="font-bold text-sm mb-0.5">{nowStudying.subject}</p>
            <p className="text-[11px] text-fd-muted-foreground leading-snug mb-4">
              {nowStudying.chapter}
            </p>
          </div>
          {/* Barra de progreso */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[10px] text-fd-muted-foreground">Progreso</span>
              <span className={`text-[10px] font-bold ${brandRose}`}>{nowStudying.progress}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-fd-border overflow-hidden">
              <div
                className="h-full rounded-full bg-[#8F2439] dark:bg-[#E87D95] transition-all duration-700"
                style={{ width: `${nowStudying.progress}%` }}
                role="progressbar"
                aria-valuenow={nowStudying.progress}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        </div>

      </div>

      {/* ══════════════════════════════════════════════════════
          FILA 2 — Medicina + Biblioteca + Stack + búsqueda
          (la columna 3 ya está ocupada por la Cita row-span 2)
      ══════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 md:grid-cols-9 gap-3">

        {/* ── MEDICINA — col 3, tall ── */}
        <Link
          href="/medicina/introduccion"
          className={`
            ${card} ${brandHover}
            col-span-1 md:col-span-3
            p-5 flex flex-col justify-between group min-h-[180px]
            bg-gradient-to-b from-[#8F2439]/5 to-transparent
          `}
        >
          <div>
            <div className={`
              inline-flex items-center justify-center p-2.5
              ${brandBg} rounded-xl mb-3
              transition-transform duration-300 group-hover:scale-110
            `}>
              <Stethoscope className={`h-5 w-5 ${brandRose}`} />
            </div>
            <h2 className="text-base font-bold mb-1.5">Medicina</h2>
            <p className="text-xs text-fd-muted-foreground leading-relaxed">
              Fisiología, Patología, Farmaco y más. Mi segundo cerebro.
            </p>
          </div>
          <div className={`flex items-center gap-1.5 text-xs font-semibold mt-4 ${brandRose}`}>
            <span>Explorar apuntes</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
          <div className={`absolute -right-6 -bottom-6 h-24 w-24 rounded-full
            ${brandBg} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity`}
            aria-hidden="true" />
        </Link>

        {/* ── BIBLIOTECA — col 3, tall ── */}
        <Link
          href="/biblioteca/blog"
          className={`
            ${card}
            col-span-1 md:col-span-3
            p-5 flex flex-col justify-between group min-h-[180px]
            bg-gradient-to-b from-purple-500/5 to-transparent
            hover:border-purple-500/30
          `}
        >
          <div>
            <div className="inline-flex items-center justify-center p-2.5
              bg-purple-100 dark:bg-purple-900/20 rounded-xl mb-3
              transition-transform duration-300 group-hover:scale-110">
              <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-base font-bold mb-1.5">Biblioteca</h2>
            <p className="text-xs text-fd-muted-foreground leading-relaxed">
              Reflexiones, ensayos y entradas del blog personal.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold mt-4
            text-purple-600 dark:text-purple-400">
            <span>Leer reflexiones</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
          <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full
            bg-purple-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"
            aria-hidden="true" />
        </Link>

        {/* ── STACK + BÚSQUEDA — col 3, apilados ── */}
        <div className="col-span-2 md:col-span-3 flex flex-col gap-3">

          {/* Stack */}
          <div className={`${card} p-4 flex flex-col gap-3 hover:border-blue-500/30 flex-1`}>
            <div className="flex items-center gap-2">
              <Terminal className="h-3.5 w-3.5 text-blue-500" aria-hidden="true" />
              <h3 className="font-semibold text-[10px] uppercase tracking-widest text-fd-muted-foreground">
                Stack
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['Next.js', 'MDX', 'Tailwind', 'Fumadocs', 'TypeScript'].map((tech) => (
                <span key={tech}
                  className="px-2 py-0.5 rounded-md bg-fd-background border text-[10px] font-medium
                    text-fd-muted-foreground">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Búsqueda */}
          <div className={`${card} p-4 flex items-center gap-3 select-none`}>
            <div className={`p-2 ${brandBg} rounded-lg shrink-0`}>
              <Search className={`h-4 w-4 ${brandRose}`} aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold text-fd-foreground">Buscador</p>
              <p className="text-[10px] text-fd-muted-foreground leading-tight">
                ⌘K — siempre disponible
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          FILA 3 — Últimas notas (horizontal scroll strip)
      ══════════════════════════════════════════════════════ */}
      <div className={`${sectionWrap} !p-5`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Pencil className={`h-4 w-4 ${brandRose}`} aria-hidden="true" />
            <h2 className="text-sm font-bold">Últimas notas</h2>
          </div>
          <Link
            href="/medicina"
            className={`text-[10px] font-semibold ${brandRose} flex items-center gap-1
              opacity-70 hover:opacity-100 transition-opacity`}
          >
            Ver todo <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1
          scrollbar-thin scrollbar-thumb-fd-border scrollbar-track-transparent">
          {recentNotes.map((note) => (
            <Link
              key={note.href}
              href={note.href}
              className={`
                ${card}
                flex-shrink-0 w-44 p-4
                flex flex-col justify-between gap-2
                hover:border-fd-foreground/20
                bg-fd-card/60
              `}
            >
              <span className="text-2xl leading-none" aria-hidden="true">{note.icon}</span>
              <div>
                <p className="text-xs font-semibold leading-snug mb-1 line-clamp-2">{note.title}</p>
                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full
                  ${brandBg} ${brandRose}`}>
                  {note.category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          FILA 4 — FAQ
      ══════════════════════════════════════════════════════ */}
      <section className={sectionWrap} aria-label="Preguntas frecuentes">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className={`h-4 w-4 ${brandRose}`} aria-hidden="true" />
          <h2 className="text-lg font-bold">Preguntas Frecuentes</h2>
        </div>
        <p className="text-xs text-fd-muted-foreground mb-5">
          Cosas que la gente suele preguntarme
        </p>

        <Accordions type="single" collapsible>
          <Accordion title="¿Qué es Taimilog?">
            Taimilog es una idea que llevo mucho tiempo gestando, es un sitio personal donde pretendo
            almacenar todo lo que sé. Además de compartir información que puede ser útil para todos.
          </Accordion>
          <Accordion title="¿Qué significa Taimilog?">
            Taimi- lo saqué de Taimado, mientras que -log lo saqué de logbook.
            Mi idea es básicamente "registros de un Taimado".
          </Accordion>
          <Accordion title="¿Por qué TÚ deberías hacer un sitio personal?">
            La web es un sitio efímero, las RRSS no nos ofrecen espacio alguno para personalizar
            un rincón en internet. ¿No te gustaría tener algo propio, lejos de las megacorporaciones
            que lucran con tu contenido? Quizá deberías considerar hacer tu propio jardín digital.
          </Accordion>
          <Accordion title="¿Quién es el personaje de la foto de perfil?">
            ¡Es la Señora Herta! Madam Herta is a peerless gem.
            Madam Herta is an unrivaled genius. Madam Herta is an inimitable beauty.
          </Accordion>
        </Accordions>
      </section>

    </main>
  );
}
