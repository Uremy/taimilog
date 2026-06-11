// page.tsx — Taimilog HomePage v2 — bento cozy waifu digital garden
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Stethoscope, Brain, Github, Youtube,
  Instagram, Search, ArrowRight, Terminal,
  MapPin, HeartPulse, ExternalLink, Twitter,
  BookOpen, Sparkles, Coffee, Flower2
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

// ── DESIGN TOKENS ──────────────────────────────────────────────
const card = [
  "relative overflow-hidden rounded-2xl",
  "border border-fd-border bg-fd-card",
  "transition-all duration-300 ease-out",
].join(' ');

const brandRose  = "text-[#8F2439] dark:text-[#E87D95]";
const brandBg    = "bg-[#8F2439]/10 dark:bg-[#E87D95]/10";
const brandHover = "hover:border-[#8F2439]/40 dark:hover:border-[#E87D95]/40 hover:shadow-[0_4px_20px_oklch(0.4_0.12_10/0.08)]";
const sectionWrap = "rounded-2xl border border-fd-border bg-fd-card/40 p-6 md:p-8";

// ── PAGE ────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8 pb-24 max-w-5xl space-y-3">

      {/* ╔══════════════════════════════════════════════════════╗
          ║  BENTO LAYER 1 — grid 12 cols                       ║
          ╚══════════════════════════════════════════════════════╝ */}
      <div className="grid grid-cols-2 md:grid-cols-12 gap-3 auto-rows-auto">

        {/* ── PERFIL — md:col-span-7 ── */}
        <div className={`
          ${card} ${brandHover}
          col-span-2 md:col-span-7
          p-7
          bg-gradient-to-br from-[#8F2439]/8 via-fd-card to-fd-card
        `}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">

            {/* Avatar */}
            <div className="relative shrink-0 group/avatar">
              <div className="h-[88px] w-[88px] rounded-xl overflow-hidden
                border border-fd-border shadow-md
                transition-transform duration-500 group-hover/avatar:scale-[1.04]">
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
                className="absolute -bottom-1 -right-1 h-[18px] w-[18px] rounded-full
                  bg-[#8F2439] border-2 border-fd-card grid place-items-center"
                aria-hidden="true"
              >
                <HeartPulse className="h-2.5 w-2.5 text-white" />
              </span>
            </div>

            {/* Texto */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl font-bold tracking-tight leading-none">Uremy</h1>
                <span className={`
                  px-2 py-0.5 rounded-full
                  text-[10px] font-semibold tracking-widest uppercase
                  ${brandBg} ${brandRose}
                `}>
                  taimilog
                </span>
              </div>

              <p className="text-sm text-fd-muted-foreground mb-1 leading-relaxed">
                Welcome, is always nice to see you here
              </p>

              <p className="text-[11px] text-fd-muted-foreground/60 mb-4 font-light italic">
                그냥 저예요. 한국어 연습할 때도 있고 그냥 방황할 때도 있고.
              </p>

              <div className="flex flex-wrap items-center gap-3 text-[11px] text-fd-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
                  우주
                </span>
                <span className="flex items-center gap-1">
                  <Flower2 className="h-3 w-3 shrink-0" aria-hidden="true" />
                  jardín digital
                </span>
                <span className="flex items-center gap-1">
                  <Stethoscope className="h-3 w-3 shrink-0" aria-hidden="true" />
                  estudiante de medicina
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── CITA — md:col-span-5 row-span-2 — INTOCABLE ── */}
        <div className={`
          ${card}
          col-span-2 md:col-span-5 md:row-span-2
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

        {/* ── SEGUNDA FILA izquierda — 7 cols, 3 celdas ── */}
        <div className="col-span-2 md:col-span-7 grid grid-cols-2 md:grid-cols-7 gap-3">

          {/* MEDICINA — col-span-3, tall */}
          <Link
            href="/medicina/introduccion"
            className={`
              ${card} ${brandHover}
              col-span-1 md:col-span-3
              p-5 flex flex-col justify-between group
              min-h-[160px]
              bg-gradient-to-b from-[#8F2439]/6 to-transparent
            `}
          >
            <div>
              <Stethoscope className={`h-5 w-5 mb-3 ${brandRose}`} aria-hidden="true" />
              <h2 className="text-base font-bold leading-tight mb-1.5">Medicina</h2>
              <p className="text-[11px] text-fd-muted-foreground leading-relaxed">
                Fisiología, Patología y más.<br />Mi segundo cerebro.
              </p>
            </div>
            <div className={`flex items-center gap-1 text-[11px] font-semibold mt-4 ${brandRose}`}>
              Explorar
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </div>
            {/* glow hover */}
            <div
              className={`absolute -right-8 -bottom-8 h-28 w-28 rounded-full ${brandBg} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              aria-hidden="true"
            />
          </Link>

          {/* BIBLIOTECA — col-span-2 */}
          <Link
            href="/biblioteca/blog"
            className={`
              ${card}
              col-span-1 md:col-span-2
              p-5 flex flex-col justify-between group
              bg-gradient-to-br from-purple-500/5 to-transparent
              hover:border-purple-500/30
            `}
          >
            <Brain className="h-4 w-4 text-purple-500 mb-3" aria-hidden="true" />
            <div>
              <h3 className="text-sm font-bold leading-tight mb-1">Biblioteca</h3>
              <p className="text-[11px] text-fd-muted-foreground">Reflexiones & Blog</p>
            </div>
            <ArrowRight className="h-3 w-3 text-purple-500 mt-4 transition-transform group-hover:translate-x-0.5" />
          </Link>

          {/* STACK — col-span-2 */}
          <div className={`
            ${card}
            col-span-2 md:col-span-2
            p-4 flex flex-col justify-between
            hover:border-blue-500/20
          `}>
            <div className="flex items-center gap-1.5 mb-3">
              <Terminal className="h-3.5 w-3.5 text-blue-500" aria-hidden="true" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-fd-muted-foreground">
                stack
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['Next.js', 'MDX', 'Tailwind', 'Fumadocs'].map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-md bg-fd-background border border-fd-border text-[10px] font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

        </div>{/* fin segunda fila */}

      </div>{/* fin bento layer 1 */}


      {/* ╔══════════════════════════════════════════════════════╗
          ║  BENTO LAYER 2 — redes + buscar                     ║
          ╚══════════════════════════════════════════════════════╝ */}
      <div className="grid grid-cols-2 md:grid-cols-12 gap-3">

        {/* REDES — 2×2, md:col-span-4 */}
        <div className="col-span-2 md:col-span-4">
          <div className="grid grid-cols-2 gap-3 h-full">
            <SocialCard
              href="https://github.com/uremy"
              icon={<Github className="h-5 w-5" />}
              label="GitHub"
              sub="@uremy"
              hover="hover:border-zinc-400/40"
            />
            <SocialCard
              href="https://youtube.com/@uremy"
              icon={<Youtube className="h-5 w-5" />}
              label="YouTube"
              sub="@uremy"
              hover="hover:border-red-500/40"
            />
            <SocialCard
              href="https://instagram.com/ure.emy"
              icon={<Instagram className="h-5 w-5" />}
              label="Instagram"
              sub="@ure.emy"
              hover="hover:border-pink-500/40"
            />
            <SocialCard
              href="https://twitter.com/Taimilog"
              icon={<Twitter className="h-5 w-5" />}
              label="Twitter"
              sub="@Taimilog"
              hover="hover:border-sky-500/40"
            />
          </div>
        </div>

        {/* JARDÍN DIGITAL — md:col-span-5 */}
        <div className={`
          ${card}
          col-span-2 md:col-span-5
          p-6 flex flex-col justify-between
          bg-gradient-to-br from-emerald-500/5 to-transparent
          hover:border-emerald-500/25
        `}>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Flower2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-fd-muted-foreground">
                jardín digital
              </span>
            </div>
            <p className="text-sm text-fd-foreground font-medium leading-relaxed mb-1">
              Este sitio es un jardín digital.
            </p>
            <p className="text-[11px] text-fd-muted-foreground leading-relaxed">
              No un blog, no un portafolio. Un espacio en constante crecimiento donde coexisten apuntes
              a medio terminar, ideas en proceso y reflexiones personales.
            </p>
          </div>
          <p className="text-[10px] text-fd-muted-foreground/60 mt-4 italic">
            las plantas no crecen perfectas 🌱
          </p>
        </div>

        {/* BUSCADOR — md:col-span-3 */}
        <div className={`
          ${card} ${brandHover}
          col-span-2 md:col-span-3
          p-5 flex flex-col items-center justify-center text-center
          select-none
        `}>
          <div className={`p-3 ${brandBg} rounded-full mb-3`}>
            <Search className={`h-5 w-5 ${brandRose}`} aria-hidden="true" />
          </div>
          <p className="text-sm font-semibold mb-1">Buscador</p>
          <p className="text-[11px] text-fd-muted-foreground leading-relaxed">
            Disponible en todo momento con{' '}
            <kbd className="px-1 py-0.5 rounded bg-fd-background border border-fd-border text-[10px] font-mono">
              ⌘K
            </kbd>
          </p>
        </div>

      </div>{/* fin bento layer 2 */}


      {/* ╔══════════════════════════════════════════════════════╗
          ║  SECCIÓN: FAQ                                        ║
          ╚══════════════════════════════════════════════════════╝ */}
      <section className={sectionWrap} aria-label="Preguntas frecuentes">
        <h2 className="text-base font-bold mb-0.5">Preguntas frecuentes</h2>
        <p className="text-[11px] text-fd-muted-foreground mb-5">
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


// ── SocialCard — compacta, sin texto redundante ─────────────────
function SocialCard({
  href, icon, label, sub, hover,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  sub: string;
  hover: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        ${card} ${hover}
        flex flex-col justify-between
        p-4 min-h-[88px] group
      `}
    >
      <div className="text-fd-muted-foreground transition-colors duration-200 group-hover:text-fd-foreground">
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold leading-tight">{label}</p>
        <p className="text-[10px] text-fd-muted-foreground">{sub}</p>
      </div>
    </a>
  );
}
