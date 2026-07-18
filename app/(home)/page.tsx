import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Stethoscope, Brain, Github, Youtube,
  Instagram, Search, ArrowRight, Terminal,
  MapPin, HeartPulse, Twitter, Flower2,
  Sparkles, Cpu, Command, Disc, Activity,
  ShieldCheck, Zap, Radio, CornerDownRight
} from 'lucide-react';
import { quotes } from '@/lib/quotes';
import { QuoteClient } from '@/components/quote-client';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';

export const metadata: Metadata = {
  title: 'Taimilog | Jardín Digital & Apuntes Médicos',
  description: 'Arquitectura de conocimiento médico, cibernética y jardín digital.',
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

const AVATAR_SIZE = 140;

/* ══════════════════════════════════════════════════════════════════════════════
    SISTEMA DE DISEÑO: SORAYAMA CHROME / TITANIUM & VACUUM GLASS
   ══════════════════════════════════════════════════════════════════════════════ */

// Panel Principal de Cromo Pulido con Reflejos Especulares (Specular Highlights)
const chromePanel = [
  "relative overflow-hidden rounded-[2rem] transition-all duration-700 ease-out",
  "border border-zinc-300/80 dark:border-zinc-700/60",
  "bg-gradient-to-br from-white/95 via-zinc-100/80 to-zinc-200/60 dark:from-[#18181f]/95 dark:via-[#101015]/90 dark:to-[#09090c]/95",
  "shadow-[inset_0_1px_2px_rgba(255,255,255,1),0_15px_35px_-10px_rgba(0,0,0,0.08)]",
  "dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.2),0_20px_40px_-15px_rgba(0,0,0,0.8)]",
  "backdrop-blur-3xl group/panel hover:border-zinc-400 dark:hover:border-zinc-500",
  "hover:shadow-[inset_0_1px_3px_rgba(255,255,255,1),0_25px_50px_-12px_rgba(0,0,0,0.15)] dark:hover:shadow-[inset_0_1px_3px_rgba(255,255,255,0.25),0_25px_50px_-12px_rgba(0,0,0,0.9)]"
].join(' ');

// Caja Embutida al Vacío (Vacuum-Formed Recessed Panel)
const vacuumBox = [
  "rounded-2xl border border-zinc-300/70 dark:border-zinc-800/80",
  "bg-gradient-to-b from-zinc-200/50 via-zinc-100/30 to-zinc-200/40 dark:from-[#0a0a0d] dark:via-[#0f0f13] dark:to-[#0a0a0d]",
  "shadow-[inset_0_3px_6px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_3px_8px_rgba(0,0,0,0.7)]"
].join(' ');

// Efectos de Metal Líquido (Liquid Chrome & Rubellite)
const textChrome = "text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-500 to-zinc-900 dark:from-white dark:via-zinc-300 dark:to-zinc-500";
const textRubellite = "text-transparent bg-clip-text bg-gradient-to-r from-[#8F2439] via-rose-500 to-[#8F2439] dark:from-[#FF8AAA] dark:via-rose-300 dark:to-[#FF8AAA]";
const textCyanMetal = "text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-400 to-cyan-600 dark:from-cyan-400 dark:via-teal-200 dark:to-cyan-400";

export default function HomePage() {
  return (
    <main className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 py-10 pb-32 font-sans text-fd-foreground selection:bg-zinc-300 dark:selection:bg-zinc-800">
      
      {/* Luz de Fondo Orbital Especular (Ambience Grid) */}
      <div className="fixed inset-0 -z-10 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-gradient-to-br from-rose-500/5 via-purple-500/5 to-transparent blur-[120px] rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/5 via-emerald-500/5 to-transparent blur-[140px] rounded-full" />
      </div>

      {/* ── BARRA DE TELEMETRÍA DE CABECERA (STREAMLINE MODERNE HUD) ── */}
      <header className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-zinc-200/80 dark:border-zinc-800/80 font-mono text-[11px] tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-200/60 dark:bg-zinc-800/60 border border-zinc-300 dark:border-zinc-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="h-2 w-2 rounded-full bg-emerald-500 -ml-4" />
            <span className="font-bold text-zinc-700 dark:text-zinc-200 uppercase">BIOMECH_OS // v3.0</span>
          </div>
          <span className="hidden sm:inline text-zinc-400 dark:text-zinc-600">|</span>
          <span className="hidden sm:inline uppercase tracking-widest text-[10px]">CYBER_GARDEN_PROTOCOL</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-300">
            <Activity className="h-3.5 w-3.5 text-[#8F2439] dark:text-[#FF8AAA] animate-pulse" />
            <span className="font-bold">100%</span>
            <span className="text-[10px] text-zinc-400">SYNC</span>
          </div>
          <div className="h-3 w-[1px] bg-zinc-300 dark:bg-zinc-700" />
          <span className="font-mono text-[10px] uppercase text-zinc-400">LOC: MEX / LATAM</span>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════════════
          CAPA 1 — COMANDO ORBITAL ASIMÉTRICO (SECTOR 00)
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">
        
        {/* NÚCLEO BIOMECÁNICO DEL PERFIL (Col-span-8 en LG) */}
        <div className={`${chromePanel} lg:col-span-8 p-8 sm:p-10 md:p-12 flex flex-col justify-between min-h-[440px]`}>
          <MechanicalRivets />
          
          {/* Top Ident Badge */}
          <div className="flex items-center justify-between z-10 mb-8">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-black tracking-[0.3em] uppercase text-zinc-400 dark:text-zinc-500">
                [ COMMAND_MODULE_01 ]
              </span>
            </div>
            <span className={`font-mono text-xs font-black tracking-[0.25em] uppercase px-3.5 py-1.5 rounded-full border border-zinc-300/80 dark:border-zinc-700/80 bg-white/80 dark:bg-black/60 shadow-sm ${textRubellite}`}>
              TAIMILOG // ARCHIVE
            </span>
          </div>

          {/* Core Content: Avatar + Bio de Alta Precisión */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 my-auto z-10">
            
            {/* Sorayama Specular Avatar Bezel */}
            <div className="relative shrink-0 group/avatar">
              <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-tr from-zinc-400 via-white to-zinc-500 dark:from-zinc-600 dark:via-zinc-300 dark:to-zinc-800 opacity-60 blur-md transition-all duration-700 group-hover/avatar:opacity-100 group-hover/avatar:scale-105" />
              
              <div className="relative p-1.5 rounded-[1.8rem] bg-gradient-to-b from-zinc-100 via-zinc-300 to-zinc-400 dark:from-zinc-700 dark:via-[#1a1a22] dark:to-black shadow-2xl border border-white/80 dark:border-zinc-600/50">
                <div className="h-[130px] w-[130px] sm:h-[150px] sm:w-[150px] rounded-[1.4rem] overflow-hidden bg-black relative">
                  <Image
                    src="/avatar.webp"
                    alt="Uremy — Señora Herta"
                    width={AVATAR_SIZE}
                    height={AVATAR_SIZE}
                    className="object-cover w-full h-full opacity-90 transition-all duration-700 ease-out group-hover/avatar:opacity-100 group-hover/avatar:scale-110 filter contrast-[1.05]"
                    priority
                    unoptimized
                  />
                  {/* Escáner Visual Cyberpunk overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>
              </div>

              {/* Status Pill Flotante */}
              <div className="absolute -bottom-3 -right-3 px-3 py-1.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black font-mono text-[10px] font-bold tracking-widest uppercase shadow-xl border border-white/20 dark:border-black/20 flex items-center gap-1.5">
                <HeartPulse className="h-3.5 w-3.5 text-[#8F2439] dark:text-[#FF8AAA] animate-pulse" />
                <span>ONLINE</span>
              </div>
            </div>

            {/* Typography & Vacuum Quote Box */}
            <div className="flex-1 min-w-0 space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                  <Terminal className="h-3.5 w-3.5 text-cyan-500" />
                  <span>MED_STUDENT & ARCHIVIST</span>
                </div>
                <h1 className={`text-5xl sm:text-6xl font-black tracking-tighter leading-none ${textChrome}`}>
                  Uremy
                </h1>
              </div>

              <p className="text-sm sm:text-base font-normal text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-xl">
                Welcome, it is always nice to see you here. Explora mis apuntes médicos, ensayos y reflexiones dentro de este ecosistema digital.
              </p>
              
              {/* Vacuum Formed Inset Quote */}
              <div className={`${vacuumBox} p-4 relative overflow-hidden group/quote`}>
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#8F2439] to-rose-400 dark:from-[#FF8AAA] dark:to-rose-600" />
                <p className="text-[13px] text-zinc-600 dark:text-zinc-300 font-mono italic pl-2">
                  &quot;그냥 저예요. 한국어 연습할 때도 있고 그냥 방황할 때도 있고.&quot;
                </p>
              </div>
            </div>
          </div>

          {/* Telemetry Footer Badges */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-8 mt-8 border-t border-zinc-200/80 dark:border-zinc-800/80 z-10">
            <div className="flex flex-wrap items-center gap-2">
              <TelemetryBadge icon={<MapPin className="h-3 w-3 text-rose-500" />} label="SECTOR: ESPECULAR / ESPACIO" />
              <TelemetryBadge icon={<Flower2 className="h-3 w-3 text-emerald-500" />} label="MODELO: JARDÍN DIGITAL" />
              <TelemetryBadge icon={<Stethoscope className="h-3 w-3 text-cyan-500" />} label="NÚCLEO: MEDICINA" />
            </div>
            <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
              ID: 0x8F2439
            </span>
          </div>
        </div>

        {/* COLUMNA VERTICAL DE CONTROL (Col-span-4 en LG) */}
        <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
          
          {/* PEDAL DE BÚSQUEDA RAPIDA (Streamline Moderne Command) */}
          <div className={`${chromePanel} p-7 flex flex-col justify-between group cursor-pointer hover:border-rose-500/60 dark:hover:border-rose-400/60 transition-all duration-500 min-h-[190px]`}>
            <MechanicalRivets />
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                // CONTROL_PEDAL
              </span>
              <div className="flex items-center gap-1 font-mono text-[10px] font-bold text-zinc-500 bg-zinc-200/80 dark:bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-300 dark:border-zinc-700">
                <Command className="h-3 w-3" /> <span>+ K</span>
              </div>
            </div>

            <div className="my-4 flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-zinc-200 via-white to-zinc-300 dark:from-zinc-800 dark:via-[#1c1c24] dark:to-zinc-900 border border-zinc-300 dark:border-zinc-700 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                <Search className="h-6 w-6 text-zinc-700 dark:text-zinc-200 group-hover:text-[#8F2439] dark:group-hover:text-[#FF8AAA] transition-colors" />
              </div>
              <div>
                <h3 className="text-lg font-black tracking-tight text-zinc-900 dark:text-white">
                  Búsqueda Global
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                  Indexando apuntes y logs...
                </p>
              </div>
            </div>

            <div className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-gradient-to-r from-[#8F2439] to-rose-500 group-hover:w-full transition-all duration-700" />
            </div>
          </div>

          {/* CHIP DE ARCHIVO & TECH STACK (Modular Tech Matrix) */}
          <div className={`${chromePanel} p-7 flex flex-col justify-between min-h-[220px]`}>
            <MechanicalRivets />
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-zinc-400">
              <span className="flex items-center gap-1.5 font-bold text-zinc-600 dark:text-zinc-300">
                <Cpu className="h-3.5 w-3.5 text-cyan-500 animate-pulse" /> STACK_MATRIX
              </span>
              <span>// SYS_003</span>
            </div>

            <div className="flex flex-wrap gap-1.5 my-auto py-2">
              {['Next.js 15', 'MDX Arch', 'Tailwind', 'Fumadocs', 'TypeScript', 'Vercel'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-xl bg-white/80 dark:bg-zinc-900/90 border border-zinc-300/80 dark:border-zinc-700/80 text-[11px] font-mono font-semibold text-zinc-700 dark:text-zinc-300 shadow-2xs hover:border-cyan-500/50 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60 text-[10px] font-mono text-zinc-400">
              <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3 text-emerald-500" /> SYSTEM STABLE</span>
              <span className="italic">hecho con ♡</span>
            </div>
          </div>

        </div>

      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CAPA 2 — ALAS STREAMLINE DE CONOCIMIENTO & TRANSMISIÓN (SECTOR 01)
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-5">
        
        {/* SECTOR 01: MEDICINA (Ala Izquierda - Col-span-4) */}
        <Link
          href="/medicina/introduccion"
          className={`${chromePanel} md:col-span-6 lg:col-span-4 p-8 flex flex-col justify-between min-h-[260px] group/med hover:border-[#8F2439]/60 dark:hover:border-[#FF8AAA]/60`}
        >
          <MechanicalRivets />
          <div className="flex items-center justify-between z-10">
            <div className="p-3.5 rounded-2xl bg-[#8F2439]/10 dark:bg-[#FF8AAA]/10 border border-[#8F2439]/20 dark:border-[#FF8AAA]/20 text-[#8F2439] dark:text-[#FF8AAA] group-hover/med:scale-110 transition-transform duration-500">
              <Stethoscope className="h-7 w-7" />
            </div>
            <div className="text-right font-mono">
              <span className="block text-[10px] font-bold tracking-[0.2em] text-zinc-400">SECTOR 01</span>
              <span className={`text-xs font-black tracking-widest uppercase ${textRubellite}`}>MEDICINA</span>
            </div>
          </div>

          <div className="space-y-2 my-6 z-10">
            <h2 className={`text-3xl font-black tracking-tight ${textChrome}`}>
              Apuntes Médicos
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              Fisiología, patología, farmacología y resúmenes clínicos. Mi segundo cerebro diseñado para la supervivencia hospitalaria.
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80 font-mono text-xs font-bold text-[#8F2439] dark:text-[#FF8AAA] z-10">
            <span className="tracking-widest uppercase flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5" /> Explorar Sistema
            </span>
            <div className="p-1.5 rounded-full bg-zinc-200/50 dark:bg-zinc-800/50 group-hover/med:translate-x-1.5 transition-transform duration-300">
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>

          {/* Resplandor de Neón Trasero al Hover */}
          <div className="absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-[#8F2439]/15 dark:bg-[#FF8AAA]/10 blur-3xl pointer-events-none transition-opacity duration-500 opacity-0 group-hover/med:opacity-100" />
        </Link>

        {/* SECTOR 02: BIBLIOTECA (Ala Central - Col-span-4) */}
        <Link
          href="/biblioteca/blog"
          className={`${chromePanel} md:col-span-6 lg:col-span-4 p-8 flex flex-col justify-between min-h-[260px] group/bib hover:border-cyan-500/60 dark:hover:border-cyan-400/60`}
        >
          <MechanicalRivets />
          <div className="flex items-center justify-between z-10">
            <div className="p-3.5 rounded-2xl bg-cyan-500/10 dark:bg-cyan-400/10 border border-cyan-500/20 dark:border-cyan-400/20 text-cyan-600 dark:text-cyan-400 group-hover/bib:scale-110 transition-transform duration-500">
              <Brain className="h-7 w-7" />
            </div>
            <div className="text-right font-mono">
              <span className="block text-[10px] font-bold tracking-[0.2em] text-zinc-400">SECTOR 02</span>
              <span className={`text-xs font-black tracking-widest uppercase ${textCyanMetal}`}>BIBLIOTECA</span>
            </div>
          </div>

          <div className="space-y-2 my-6 z-10">
            <h3 className={`text-3xl font-black tracking-tight ${textChrome}`}>
              Archivo & Blog
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              Reflexiones, ensayos de filosofía, reseñas literarias y el registro evolutivo de un jardín digital en expansión.
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80 font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400 z-10">
            <span className="tracking-widest uppercase flex items-center gap-1.5">
              <Disc className="h-3.5 w-3.5 animate-spin" /> Acceder al Archivo
            </span>
            <div className="p-1.5 rounded-full bg-zinc-200/50 dark:bg-zinc-800/50 group-hover/bib:translate-x-1.5 transition-transform duration-300">
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>

          <div className="absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-cyan-500/15 dark:bg-cyan-400/10 blur-3xl pointer-events-none transition-opacity duration-500 opacity-0 group-hover/bib:opacity-100" />
        </Link>

        {/* LOG DE TRANSMISIÓN EN VIVO (Quote Module - Col-span-4) */}
        <div className={`${chromePanel} md:col-span-12 lg:col-span-4 p-8 flex flex-col justify-between min-h-[260px] bg-gradient-to-br from-zinc-100/90 via-white to-zinc-200/40 dark:from-[#14141c] dark:via-[#0e0e14] dark:to-[#09090d]`}>
          <MechanicalRivets />
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 border-b border-zinc-200/60 dark:border-zinc-800/60 pb-3">
            <span className="flex items-center gap-1.5 text-rose-500 font-bold">
              <Radio className="h-3.5 w-3.5 animate-pulse" /> BROADCAST_LOG
            </span>
            <span>// FREQ_89.4</span>
          </div>

          <div className="my-auto py-6 relative z-10 font-serif">
            <QuoteClient
              initialQuote={quotes[Math.floor(Math.random() * quotes.length)]}
              allQuotes={quotes}
            />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60 font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
            <span>STATUS: RECEPTIVO</span>
            <span className="flex items-center gap-1"><Sparkles className="h-3 w-3 text-amber-400" /> INSPIRATION</span>
          </div>
        </div>

      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CAPA 3 — MATRIZ NEURAL SOCIAL & BASE DE CONOCIMIENTO (SECTOR 02)
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* COLUMNA IZQUIERDA: MANIFIESTO + REDES SOCIALES (Col-span-4) */}
        <div className="lg:col-span-4 space-y-5 flex flex-col justify-between">
          
          {/* Manifiesto Biomecánico del Jardín */}
          <div className={`${chromePanel} p-8 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent border-l-4 border-l-emerald-500`}>
            <MechanicalRivets />
            <div className="flex items-center gap-2 mb-3 font-mono text-[11px] uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-black">
              <Flower2 className="h-4 w-4" /> [ BIO_GARDEN // PROTOCOL ]
            </div>
            <h4 className="text-xl font-black text-zinc-900 dark:text-white mb-2 tracking-tight">
              Este sitio es un jardín digital.
            </h4>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
              No es un blog estático ni un portafolio rígido. Es un ecosistema vivo donde coexisten apuntes a medio terminar, ideas en germinación y reflexiones profundas.
            </p>
            <div className="mt-4 pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between font-mono text-[11px] text-zinc-500 dark:text-zinc-400 italic">
              <span>las plantas no crecen perfectas</span>
              <span className="text-emerald-500">🌱</span>
            </div>
          </div>

          {/* Matriz Neural Social (Streamline Pill Buttons) */}
          <div className={`${chromePanel} p-6 space-y-2.5`}>
            <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-3 px-1 flex items-center justify-between">
              <span>// NEURAL_FEED_LINKS</span>
              <span>[ 4 NODES ]</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              <SocialAerodynamicPill
                href="https://github.com/uremy"
                icon={<Github className="h-4 w-4" />}
                label="GitHub"
                sub="CODE & REPOSITORY"
                accent="hover:border-zinc-500 dark:hover:border-zinc-400"
              />
              <SocialAerodynamicPill
                href="https://youtube.com/@uremy"
                icon={<Youtube className="h-4 w-4 text-red-500" />}
                label="YouTube"
                sub="VIDEO BROADCASTS"
                accent="hover:border-red-500/50"
              />
              <SocialAerodynamicPill
                href="https://instagram.com/ure.emy"
                icon={<Instagram className="h-4 w-4 text-pink-500" />}
                label="Instagram"
                sub="VISUAL LOGS"
                accent="hover:border-pink-500/50"
              />
              <SocialAerodynamicPill
                href="https://twitter.com/Taimilog"
                icon={<Twitter className="h-4 w-4 text-sky-400" />}
                label="Twitter / X"
                sub="NETWORK STREAM"
                accent="hover:border-sky-400/50"
              />
            </div>
          </div>

        </div>

        {/* COLUMNA DERECHA: PREGUNTAS FRECUENTES (COL-SPAN-8) */}
        <section className={`${chromePanel} lg:col-span-8 p-8 sm:p-10 md:p-12 flex flex-col justify-between`} aria-label="Preguntas frecuentes">
          <MechanicalRivets />
          
          <div>
            {/* Header Telemetry */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 pb-5 border-b border-zinc-200/80 dark:border-zinc-800/80">
              <div>
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-1">
                  <CornerDownRight className="h-3.5 w-3.5 text-[#8F2439] dark:text-[#FF8AAA]" />
                  <span>KNOWLEDGE_BASE // ARCHIVE_QUERY</span>
                </div>
                <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${textChrome}`}>
                  Preguntas Frecuentes
                </h2>
              </div>
              <span className="font-mono text-xs font-bold text-zinc-500 dark:text-zinc-400 tracking-widest uppercase px-3 py-1 rounded-lg bg-zinc-200/50 dark:bg-zinc-800/50 border border-zinc-300 dark:border-zinc-700 self-start sm:self-center">
                SYS_FAQ // 005
              </span>
            </div>

            {/* Accordion List con Estética de Lujo Frío */}
            <Accordions type="single" collapsible className="space-y-3.5 font-sans">
              <Accordion
                title="¿Qué es exactamente Taimilog y cuál es su propósito?"
                className={`${vacuumBox} px-5 py-1 transition-all duration-300 hover:border-zinc-400 dark:hover:border-zinc-600`}
              >
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm pt-2 pb-3 font-normal">
                  Taimilog es un espacio digital personal y evolutivo donde almaceno y sistematizo todo lo que aprendo en mi camino por la medicina, además de ensayos personales. Funciona como un segundo cerebro público donde comparto apuntes estructurados que pueden servir tanto a estudiantes como a mentes curiosas.
                </p>
              </Accordion>

              <Accordion
                title="¿Cuál es la etimología y significado detrás de 'Taimilog'?"
                className={`${vacuumBox} px-5 py-1 transition-all duration-300 hover:border-zinc-400 dark:hover:border-zinc-600`}
              >
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm pt-2 pb-3 font-normal">
                  El nombre es un acrónimo conceptual: <strong>Taimi-</strong> proviene de <em className="text-zinc-900 dark:text-white font-medium">&quot;Taimado&quot;</em> (astuto, sagaz o persistente), mientras que <strong>-log</strong> se deriva de <em className="text-zinc-900 dark:text-white font-medium">&quot;Logbook&quot;</em> (bitácora o registro de navegación). La filosofía general es mantener los <em>&quot;registros continuos de una mente taimada&quot;</em>.
                </p>
              </Accordion>

              <Accordion
                title="¿Por qué recomiendas crear un Jardín Digital o sitio personal propio?"
                className={`${vacuumBox} px-5 py-1 transition-all duration-300 hover:border-zinc-400 dark:hover:border-zinc-600`}
              >
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm pt-2 pb-3 font-normal">
                  La web moderna se ha vuelto efímera y algorítmica; las redes sociales tradicionales no ofrecen propiedad real ni un espacio para estructurar el pensamiento a largo plazo. Tener un rincón propio te aleja de la obsolescencia programada del feed, permitiéndote cultivar tus ideas, portafolio y conocimientos a tu propio ritmo, sin depender de megacorporaciones.
                </p>
              </Accordion>

              <Accordion
                title="¿Quién es el personaje que aparece en el avatar principal del sistema?"
                className={`${vacuumBox} px-5 py-1 transition-all duration-300 hover:border-zinc-400 dark:hover:border-zinc-600`}
              >
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm pt-2 pb-3 font-normal">
                  ¡Es la inigualable <strong>Señora Herta</strong> de <em>Honkai: Star Rail</em>! Como dice la célebre cita de la Estación Espacial: <em className="font-serif italic text-zinc-800 dark:text-zinc-200">&quot;Madam Herta is a peerless gem. Madam Herta is an unrivaled genius. Madam Herta is an inimitable beauty.&quot;</em> Un símbolo de intelecto analítico y elegancia eterna.
                </p>
              </Accordion>
            </Accordions>
          </div>

          {/* Footer del Panel FAQ */}
          <div className="mt-8 pt-6 border-t border-zinc-200/80 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-ping" />
              <span>BASE DE DATOS EN LÍNEA // LATENCY: 12ms</span>
            </div>
            <span>© {new Date().getFullYear()} TAIMILOG SYSTEM</span>
          </div>

        </section>

      </section>

    </main>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
    SUBCOMPONENTES DE ALTA PRECISIÓN & ESTÉTICA STREAMLINE
   ══════════════════════════════════════════════════════════════════════════════ */

/** Etiqueta de telemetría médica/espacial con bisel metálico */
function TelemetryBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-zinc-200/60 dark:bg-zinc-800/70 border border-zinc-300 dark:border-zinc-700 font-mono text-[10px] font-bold tracking-wider uppercase text-zinc-700 dark:text-zinc-300 shadow-2xs">
      {icon}
      <span>{label}</span>
    </div>
  );
}

/** Píldora aerodinámica con reflejo de cromo para enlaces sociales */
function SocialAerodynamicPill({
  href,
  icon,
  label,
  sub,
  accent
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  sub: string;
  accent: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-between p-3.5 rounded-2xl border border-zinc-300/80 dark:border-zinc-800/80 bg-gradient-to-r from-white/90 via-zinc-100/60 to-white/40 dark:from-[#16161c]/90 dark:via-[#111116]/80 dark:to-transparent shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-300 group ${accent}`}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-black shadow-inner border border-zinc-300/70 dark:border-zinc-800 transition-transform duration-300 group-hover:scale-110 shrink-0">
          {icon}
        </div>
        <div className="truncate">
          <p className="text-xs sm:text-sm font-bold leading-none text-zinc-900 dark:text-white group-hover:translate-x-0.5 transition-transform">
            {label}
          </p>
          <p className="text-[9px] font-mono tracking-widest text-zinc-400 dark:text-zinc-500 mt-1 truncate font-semibold">
            {sub}
          </p>
        </div>
      </div>
      <div className="p-1 rounded-full bg-transparent group-hover:bg-zinc-200 dark:group-hover:bg-zinc-800 transition-colors shrink-0">
        <ArrowRight className="h-3.5 w-3.5 text-zinc-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
      </div>
    </a>
  );
}

/** Remaches y tornillos mecánicos Sorayama con retícula de precisión */
function MechanicalRivets() {
  return (
    <>
      {/* Superior Izquierda */}
      <div className="absolute top-3.5 left-3.5 flex items-center justify-center w-2.5 h-2.5 rounded-full border border-zinc-400/60 dark:border-zinc-600/60 pointer-events-none opacity-70">
        <div className="w-1 h-[0.5px] bg-zinc-500 dark:bg-zinc-400" />
      </div>
      {/* Superior Derecha */}
      <div className="absolute top-3.5 right-3.5 flex items-center justify-center w-2.5 h-2.5 rounded-full border border-zinc-400/60 dark:border-zinc-600/60 pointer-events-none opacity-70">
        <div className="w-1 h-[0.5px] bg-zinc-500 dark:bg-zinc-400" />
      </div>
      {/* Inferior Izquierda */}
      <div className="absolute bottom-3.5 left-3.5 flex items-center justify-center w-2.5 h-2.5 rounded-full border border-zinc-400/60 dark:border-zinc-600/60 pointer-events-none opacity-70">
        <div className="w-1 h-[0.5px] bg-zinc-500 dark:bg-zinc-400" />
      </div>
      {/* Inferior Derecha */}
      <div className="absolute bottom-3.5 right-3.5 flex items-center justify-center w-2.5 h-2.5 rounded-full border border-zinc-400/60 dark:border-zinc-600/60 pointer-events-none opacity-70">
        <div className="w-1 h-[0.5px] bg-zinc-500 dark:bg-zinc-400" />
      </div>
    </>
  );
}