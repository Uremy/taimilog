// page.tsx — Taimilog HomePage v5 — espacios laterales y superior corregidos
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Stethoscope, Brain, Github, Youtube,
  Instagram, Search, ArrowRight, Terminal,
  MapPin, HeartPulse, Twitter, Flower2,
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

const AVATAR_SIZE = 120;

const card = [
  "relative overflow-hidden rounded-2xl",
  "border border-fd-border bg-fd-card",
  "transition-all duration-300 ease-out",
].join(' ');

const brandRose  = "text-[#8F2439] dark:text-[#E87D95]";
const brandBg    = "bg-[#8F2439]/10 dark:bg-[#E87D95]/10";
const brandHover = "hover:border-[#8F2439]/40 dark:hover:border-[#E87D95]/40 hover:shadow-[0_4px_20px_oklch(0.4_0.12_10/0.08)]";

export default function HomePage() {
  return (
    <main className="w-full px-3 sm:px-4 md:px-6 py-4 pb-24 max-w-[1280px] mx-auto space-y-3">

      {/* ══════════════════════════════════════════════
          LAYER 1 — Perfil + Cita + Navegación
      ══════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">

        {/* PERFIL — col-span-7 */}
        <div className={`
          ${card} ${brandHover}
          md:col-span-7
          p-8
          bg-gradient-to-br from-[#8F2439]/8 via-fd-card to-fd-card
        `}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-7">

            <div className="relative shrink-0 group/avatar">
              <div className="h-[100px] w-[100px] rounded-xl overflow-hidden
                border border-fd-border shadow-md
                transition-transform duration-500 group-hover/avatar:scale-[1.04]">
                <Image
                  src="/avatar.webp"
                  alt="Uremy — Señora Herta"
                  width={AVATAR_SIZE}
                  height={AVATAR_SIZE}
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
              <span className="absolute -bottom-1 -right-1 h-[20px] w-[20px] rounded-full
                bg-[#8F2439] border-2 border-fd-card grid place-items-center"
                aria-hidden="true">
                <HeartPulse className="h-3 w-3 text-white" />
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold tracking-tight leading-none">Uremy</h1>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold
                  tracking-widest uppercase ${brandBg} ${brandRose}`}>
                  taimilog
                </span>
              </div>
              <p className="text-sm text-fd-muted-foreground mb-2 leading-relaxed">
                Welcome, is always nice to see you here
              </p>
              <p className="text-[12px] text-fd-muted-foreground/60 mb-5 font-light italic">
                그냥 저예요. 한국어 연습할 때도 있고 그냥 방황할 때도 있고.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-[12px] text-fd-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />우주
                </span>
                <span className="flex items-center gap-1.5">
                  <Flower2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />jardín digital
                </span>
                <span className="flex items-center gap-1.5">
                  <Stethoscope className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />estudiante de medicina
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CITA — INTOCABLE — col-span-5, row-span-2 */}
        <div className={`
          ${card}
          md:col-span-5 md:row-span-2
          p-7
          bg-gradient-to-br from-indigo-500/8 to-transparent
          hover:border-indigo-500/30
          flex flex-col justify-center
          min-h-[260px] md:min-h-0
        `}>
          <QuoteClient
            initialQuote={quotes[Math.floor(Math.random() * quotes.length)]}
            allQuotes={quotes}
          />
        </div>

        {/* SEGUNDA FILA — las 3 nav cards */}
        <div className="md:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-3">

          {/* MEDICINA */}
          <Link
            href="/medicina/introduccion"
            className={`
              ${card} ${brandHover} group
              p-5 md:p-6
              flex flex-row items-center gap-5
              md:flex-col md:items-start md:justify-between
              md:min-h-[240px]
              bg-gradient-to-br from-[#8F2439]/6 to-transparent
              md:bg-gradient-to-b
            `}
          >
            <Stethoscope className={`h-7 w-7 shrink-0 ${brandRose}
              md:mb-4 md:h-6 md:w-6`} aria-hidden="true" />

            <div className="flex-1 min-w-0 flex flex-col justify-center md:flex-1 md:w-full">
              <h2 className="text-sm font-bold leading-tight mb-0.5 md:mb-2">Medicina</h2>
              <p className="text-[12px] text-fd-muted-foreground leading-relaxed hidden md:block">
                Fisiología, Patología y más.<br />Mi segundo cerebro.
              </p>
              <p className="text-[12px] text-fd-muted-foreground leading-relaxed md:hidden">
                Fisiología, Patología y más.
              </p>
            </div>

            <div className={`shrink-0 flex items-center gap-1 text-[12px] font-semibold ${brandRose} md:mt-4`}>
              <span className="hidden md:inline">Explorar</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </div>

            <div className={`absolute -right-8 -bottom-8 h-32 w-32 rounded-full
              ${brandBg} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
              hidden md:block`}
              aria-hidden="true" />
          </Link>

          {/* BIBLIOTECA */}
          <Link
            href="/biblioteca/blog"
            className={`
              ${card} group
              p-5 md:p-6
              flex flex-row items-center gap-5
              md:flex-col md:items-start md:justify-between
              md:min-h-[240px]
              bg-gradient-to-br from-purple-500/5 to-transparent
              hover:border-purple-500/30
            `}
          >
            <Brain className="h-7 w-7 shrink-0 text-purple-500 md:mb-4 md:h-6 md:w-6" aria-hidden="true" />

            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <h3 className="text-sm font-bold leading-tight mb-0.5 md:mb-2">Biblioteca</h3>
              <p className="text-[12px] text-fd-muted-foreground leading-relaxed hidden md:block">
                Reflexiones,<br />ensayos & blog
              </p>
              <p className="text-[12px] text-fd-muted-foreground leading-relaxed md:hidden">
                Reflexiones, ensayos & blog
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-1 text-[12px] font-semibold text-purple-500 md:mt-4">
              <span className="hidden md:inline">Leer</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>

          {/* STACK */}
          <div className={`
            ${card}
            p-5 md:p-6
            flex flex-row items-center gap-5
            md:flex-col md:items-start md:justify-between
            md:min-h-[240px]
            hover:border-blue-500/20
          `}>
            <Terminal className="h-7 w-7 shrink-0 text-blue-500 md:hidden" aria-hidden="true" />

            <div className="hidden md:flex items-center gap-2 md:mb-4">
              <Terminal className="h-4 w-4 text-blue-500" aria-hidden="true" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-fd-muted-foreground">
                stack
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-1.5">
                {['Next.js', 'MDX', 'Tailwind', 'Fumadocs', 'TypeScript'].map((t) => (
                  <span key={t}
                    className="px-2 py-1 rounded-md bg-fd-background border border-fd-border
                      text-[11px] font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <p className="hidden md:block text-[11px] text-fd-muted-foreground/50 italic mt-2">
              este sitio fue hecho con ♡
            </p>
          </div>

        </div>
      </div>


      {/* ══════════════════════════════════════════════
          LAYER 2 — Jardín + Buscador + Redes
      ══════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">

        {/* JARDÍN DIGITAL */}
        <div className={`
          ${card}
          md:col-span-5
          p-7 flex flex-col justify-between
          bg-gradient-to-br from-emerald-500/6 to-transparent
          hover:border-emerald-500/25
          min-h-[200px]
        `}>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Flower2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-fd-muted-foreground">
                jardín digital
              </span>
            </div>
            <p className="text-base font-semibold text-fd-foreground leading-relaxed mb-2.5">
              Este sitio es un jardín digital.
            </p>
            <p className="text-[12px] text-fd-muted-foreground leading-relaxed">
              No un blog, no un portafolio. Un espacio en constante crecimiento donde coexisten
              apuntes a medio terminar, ideas en proceso y reflexiones personales.
              Las plantas no crecen perfectas, y eso está bien.
            </p>
          </div>
          <p className="text-[11px] text-fd-muted-foreground/50 mt-5 italic">
            las plantas no crecen perfectas 🌱
          </p>
        </div>

        {/* BUSCADOR */}
        <div className={`
          ${card} ${brandHover}
          md:col-span-3
          p-7 flex flex-col items-center justify-center text-center
          select-none min-h-[200px]
        `}>
          <div className={`p-3.5 ${brandBg} rounded-full mb-4`}>
            <Search className={`h-6 w-6 ${brandRose}`} aria-hidden="true" />
          </div>
          <p className="text-sm font-bold mb-2">Buscador</p>
          <p className="text-[12px] text-fd-muted-foreground leading-relaxed">
            Disponible en todo momento con{' '}
            <kbd className="px-1.5 py-0.5 rounded bg-fd-background border border-fd-border
              text-[11px] font-mono">⌘K</kbd>
          </p>
        </div>

        {/* REDES 2×2 */}
        <div className="md:col-span-4 grid grid-cols-2 gap-3">
          <SocialCard href="https://github.com/uremy"
            icon={<Github className="h-5 w-5" />}
            label="GitHub" sub="@uremy" hover="hover:border-zinc-400/40" />
          <SocialCard href="https://youtube.com/@uremy"
            icon={<Youtube className="h-5 w-5" />}
            label="YouTube" sub="@uremy" hover="hover:border-red-500/40" />
          <SocialCard href="https://instagram.com/ure.emy"
            icon={<Instagram className="h-5 w-5" />}
            label="Instagram" sub="@ure.emy" hover="hover:border-pink-500/40" />
          <SocialCard href="https://twitter.com/Taimilog"
            icon={<Twitter className="h-5 w-5" />}
            label="Twitter" sub="@Taimilog" hover="hover:border-sky-500/40" />
        </div>

      </div>


      {/* ══════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════ */}
      <section
        className="rounded-2xl border border-fd-border bg-fd-card/40 p-7 md:p-10"
        aria-label="Preguntas frecuentes"
      >
        <h2 className="text-base font-bold mb-1">Preguntas frecuentes</h2>
        <p className="text-[12px] text-fd-muted-foreground mb-6">
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

// ── SocialCard ───────────────────────────────────────────────────
function SocialCard({ href, icon, label, sub, hover }: {
  href: string; icon: React.ReactNode;
  label: string; sub: string; hover: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className={`${card} ${hover} flex flex-col justify-between p-5 min-h-[96px] group`}>
      <div className="text-fd-muted-foreground transition-colors group-hover:text-fd-foreground">
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold leading-tight">{label}</p>
        <p className="text-[11px] text-fd-muted-foreground">{sub}</p>
      </div>
    </a>
  );
}
