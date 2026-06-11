// page.tsx — HomePage rediseñada con bento Bento.me style
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Stethoscope, Brain, Github, Youtube,
  Instagram, Search, ArrowRight, Terminal,
  MapPin, HeartPulse, ExternalLink, Twitter,
  BookOpen, Sparkles, Coffee
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

// --- TOKENS DE DISEÑO ---
const card = "relative overflow-hidden rounded-2xl border border-fd-border bg-fd-card transition-all duration-300";
const brandRose = "text-[#8F2439] dark:text-[#E87D95]";
const brandBg = "bg-[#8F2439]/10 dark:bg-[#E87D95]/10";
const brandHover = "hover:border-[#8F2439]/40 dark:hover:border-[#E87D95]/40";
const sectionWrap = "rounded-2xl border border-fd-border bg-fd-card/40 p-6 md:p-8";

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8 pb-24 max-w-5xl">

      {/* ═══════════════════════════════════════
          BENTO PRINCIPAL
      ═══════════════════════════════════════ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">

        {/* ── PERFIL (hero, col-span 2) ── */}
        <div className={`${card} ${brandHover} col-span-2 p-7
          bg-gradient-to-br from-[#8F2439]/8 via-fd-card to-fd-card`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">

            {/* Avatar */}
            <div className="relative shrink-0 group">
              <div className="h-24 w-24 rounded-xl overflow-hidden border-2 border-fd-background shadow-lg
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
              <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full
                bg-[#8F2439] border-2 border-fd-background grid place-items-center"
                aria-hidden="true">
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
              <p className="text-xs text-fd-muted-foreground/70 mb-3 font-light">
                그냥 저예요. 한국어 연습할 때도 있고 그냥 방황할 때도 있고.
              </p>
              <div className="flex items-center gap-1.5 text-xs text-fd-muted-foreground">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                <span>우주</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── CITA (sin modificar, col-span 1, row-span 2) ── */}
        <div className={`${card} col-span-1 row-span-2 p-5
          bg-gradient-to-br from-indigo-500/8 to-transparent
          hover:border-indigo-500/30 flex flex-col justify-center`}>
          <QuoteClient
            initialQuote={quotes[Math.floor(Math.random() * quotes.length)]}
            allQuotes={quotes}
          />
        </div>

        {/* ── STACK (col-span 1) ── */}
        <div className={`${card} col-span-1 p-4 flex flex-col justify-between
          hover:border-blue-500/30 group`}>
          <div className="flex items-center gap-2 mb-3">
            <Terminal className="h-4 w-4 text-blue-500" aria-hidden="true" />
            <h3 className="font-semibold text-xs uppercase tracking-wide text-fd-muted-foreground">
              Stack
            </h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {['Next.js', 'MDX', 'Tailwind', 'Fumadocs'].map((tech) => (
              <span key={tech}
                className="px-2 py-0.5 rounded-md bg-fd-background border text-[10px] font-medium">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* ── MEDICINA (col-span 1, row-span 2, tall card) ── */}
        <Link
          href="/medicina/introduccion"
          className={`${card} ${brandHover} col-span-1 row-span-2 p-5
            flex flex-col justify-between group min-h-[200px]
            bg-gradient-to-b from-[#8F2439]/5 to-transparent`}
        >
          <div>
            <div className={`inline-flex items-center justify-center p-2.5
              ${brandBg} rounded-xl mb-3
              transition-transform duration-300 group-hover:scale-110`}>
              <Stethoscope className={`h-5 w-5 ${brandRose}`} />
            </div>
            <h2 className="text-lg font-bold mb-1.5">Medicina</h2>
            <p className="text-xs text-fd-muted-foreground leading-relaxed">
              Apuntes de Fisiología, Patología y más. Mi segundo cerebro.
            </p>
          </div>
          <div className={`flex items-center gap-1.5 text-xs font-semibold mt-4 ${brandRose}`}>
            <span>Explorar</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
          {/* decoración blur */}
          <div className={`absolute -right-6 -bottom-6 h-24 w-24 rounded-full
            ${brandBg} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity`}
            aria-hidden="true" />
        </Link>

        {/* ── BIBLIOTECA (col-span 1) ── */}
        <Link
          href="/biblioteca/blog"
          className={`${card} col-span-1 p-4 flex items-center gap-3 group
            bg-gradient-to-br from-purple-500/5 to-transparent hover:border-purple-500/30`}
        >
          <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg
            transition-transform group-hover:scale-110 shrink-0">
            <Brain className="h-4 w-4 text-purple-600" />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-sm leading-tight">Biblioteca</h3>
            <p className="text-[10px] text-fd-muted-foreground truncate">Reflexiones & Blog</p>
          </div>
          <ArrowRight className="h-3.5 w-3.5 ml-auto text-fd-muted-foreground shrink-0
            transition-transform group-hover:translate-x-1" />
        </Link>

        {/* ── SEARCH INFO (col-span 1) ── */}
        <div className={`${card} col-span-1 p-4 flex flex-col items-center justify-center
          text-center select-none aspect-square`}>
          <div className={`p-2 ${brandBg} rounded-full mb-2`}>
            <Search className={`h-4 w-4 ${brandRose}`} aria-hidden="true" />
          </div>
          <p className="text-[10px] font-medium text-fd-muted-foreground leading-tight">
            Usa el buscador<br />siempre disponible
          </p>
        </div>

      </div>{/* fin bento principal */}


      {/* ═══════════════════════════════════════
          SECCIÓN: REDES SOCIALES
      ═══════════════════════════════════════ */}
      <section className={`${sectionWrap} mt-4`} aria-label="Redes sociales">
        <h2 className="text-lg font-bold mb-1">¡Sígueme!</h2>
        <p className="text-xs text-fd-muted-foreground mb-5">
          Por si quieres mantenerte al tanto de lo que hago
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <SocialCard href="https://github.com/uremy"
            icon={<Github className="h-5 w-5" />}
            label="GitHub" subLabel="@uremy"
            color="hover:border-zinc-400/40 hover:bg-zinc-500/5" />
          <SocialCard href="https://youtube.com/@uremy"
            icon={<Youtube className="h-5 w-5" />}
            label="YouTube" subLabel="Suscríbete"
            color="hover:border-red-500/40 hover:bg-red-500/5" />
          <SocialCard href="https://instagram.com/ure.emy"
            icon={<Instagram className="h-5 w-5" />}
            label="Instagram" subLabel="@ure.emy"
            color="hover:border-pink-500/40 hover:bg-pink-500/5" />
          <SocialCard href="https://twitter.com/Taimilog"
            icon={<Twitter className="h-5 w-5" />}
            label="Twitter" subLabel="@Taimilog"
            color="hover:border-sky-500/40 hover:bg-sky-500/5" />
        </div>
      </section>


      {/* ═══════════════════════════════════════
          SECCIÓN: FAQ
      ═══════════════════════════════════════ */}
      <section className={`${sectionWrap} mt-4`} aria-label="Preguntas frecuentes">
        <h2 className="text-lg font-bold mb-1">Preguntas Frecuentes</h2>
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


// ═══════════════════════════════════════
// COMPONENTE: SocialCard (rediseñado)
// ═══════════════════════════════════════
function SocialCard({
  href, icon, label, subLabel, color
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  subLabel: string;
  color: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        ${card} ${color}
        flex items-center gap-3 p-4 group
      `}
    >
      <div className="text-fd-muted-foreground transition-all duration-200
        group-hover:text-fd-foreground group-hover:scale-110 shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="font-semibold text-sm leading-tight">{label}</p>
        <p className="text-[10px] text-fd-muted-foreground truncate">{subLabel}</p>
      </div>
      <ExternalLink className="h-3.5 w-3.5 ml-auto text-fd-muted-foreground shrink-0
        opacity-0 group-hover:opacity-60 transition-opacity" aria-hidden="true" />
    </a>
  );
}
