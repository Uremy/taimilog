import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Unbounded, Manrope } from 'next/font/google';
import {
  Stethoscope, BookOpenText, Github, Youtube,
  Instagram, ArrowUpRight,
  Twitter, Radio, Terminal,
  ShieldCheck, ArrowRight, Activity, Cpu
} from 'lucide-react';
import { quotes } from '@/lib/quotes';
import { QuoteClient } from '@/components/quote-client';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';

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

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const fontDisplay = 'font-[family-name:var(--font-display)]';
const fontBody = 'font-[family-name:var(--font-body)]';

export default function HomePage() {
  return (
    /* CORRECCIÓN 1: Cambiado de <main> a <div> para evitar landmarks duplicados con Fumadocs (#nd-home-layout) */
    <div
      className={`${unbounded.variable} ${manrope.variable} ${fontBody} relative w-full bg-fd-background text-fd-foreground antialiased selection:bg-fd-primary selection:text-fd-primary-foreground overflow-x-hidden`}
    >
      {/* Fondo y grilla arquitectónica (Oculto estrictamente para lectores de pantalla) */}
      <div aria-hidden="true" role="presentation" className="fixed inset-0 -z-10 pointer-events-none flex justify-center select-none">
        <div className="absolute top-0 w-[80vw] h-[50vh] bg-gradient-to-b from-black/5 dark:from-white/5 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.06)_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      {/* Contenedor Principal */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-6 sm:pt-12 pb-12 space-y-6 sm:space-y-8 w-full">
        
        {/* Cabecera & Identidad */}
        <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-end">
          <div className="lg:col-span-8 space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-fd-accent text-fd-accent-foreground font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em]">
              <Terminal className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              Jardín Digital & Archivo Clínico
            </div>

            {/* CORRECCIÓN 3a: Cambiado /30 por text-fd-muted-foreground para cumplir contraste WCAG AA (>4.5:1) */}
            <h1 className={`${fontDisplay} text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.8] text-fd-foreground -mt-1 sm:-mt-2`}>
              Taimi<span className="text-fd-muted-foreground font-normal">log</span>
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 pt-3 sm:pt-4 border-t border-fd-border/60">
              <p className="sm:col-span-8 text-sm sm:text-lg text-fd-muted-foreground font-light leading-relaxed">
                Bitácora evolutiva de una mente taimada. Convergencia de <strong className="font-semibold text-fd-foreground">rigurosidad clínica hospitalaria</strong>, ensayos literarios y contemplación analítica del pensamiento vivo.
              </p>
              
              <div className="sm:col-span-4 flex flex-row sm:flex-col justify-between sm:justify-end sm:items-end font-mono text-[11px] sm:text-xs text-fd-muted-foreground uppercase tracking-wider pt-2 sm:pt-0">
                <span>INDEX // REG: 8F-2439</span>
                <span className="text-fd-foreground font-semibold">ESTADO: CONTINUO</span>
              </div>
            </div>
          </div>

          {/* Avatar Madam Herta */}
          <div className="lg:col-span-4 flex flex-col justify-end pt-2 sm:pt-0">
            <div className="bg-fd-card border border-fd-border p-3.5 sm:p-5 relative group transition-all duration-500 hover:border-fd-foreground/40">
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
                </div>
                <div className="space-y-1">
                  <div className="font-mono text-[9px] sm:text-[10px] tracking-widest text-fd-muted-foreground uppercase">
                    FIG. 01 — AVATAR
                  </div>
                  <h3 className={`${fontDisplay} text-base sm:text-lg font-bold tracking-tight text-fd-foreground leading-snug`}>
                    Madam Herta
                  </h3>
                  <p className="font-mono text-[11px] sm:text-xs text-fd-muted-foreground line-clamp-2 italic">
                    &quot;An unrivaled genius. An inimitable beauty.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Núcleos de Conocimiento */}
        <section className="space-y-3 sm:space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 sm:gap-3 border-b border-fd-border/80 pb-2.5 sm:pb-3">
            <div>
              <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.3em] text-fd-muted-foreground uppercase block mb-0.5 sm:mb-1">
                // COMPENDIOS Y ARCHIVOS
              </span>
              <h2 className={`${fontDisplay} text-xl sm:text-3xl font-extrabold uppercase tracking-tight text-fd-foreground`}>
                Sistemas de Conocimiento
              </h2>
            </div>
            <span className="font-mono text-[10px] sm:text-xs text-fd-muted-foreground uppercase">
              SELECCIONA UN VECTOR DE LECTURA
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
            <Link
              href="/medicina/introduccion"
              className="md:col-span-7 group relative bg-fd-card border border-fd-border p-5 sm:p-8 flex flex-col justify-between min-h-[auto] sm:min-h-[300px] transition-all duration-500 hover:border-fd-foreground"
            >
              <div className="flex justify-between items-start">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 bg-fd-muted border border-fd-border text-fd-foreground font-mono text-[10px] sm:text-[11px] uppercase tracking-widest">
                  <Stethoscope className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> SISTEMA 01
                </div>
                {/* CORRECCIÓN 3b: aria-hidden agregado y opacidad subida a /60 para superar el ratio WCAG AA 3:1 */}
                <span aria-hidden="true" className={`${fontDisplay} text-3xl sm:text-4xl font-black text-fd-muted-foreground/60 group-hover:text-fd-foreground transition-colors select-none`}>
                  M-01
                </span>
              </div>

              <div className="space-y-2 sm:space-y-3 my-4 sm:my-4">
                <h3 className={`${fontDisplay} text-2xl sm:text-4xl font-black uppercase tracking-tight text-fd-foreground group-hover:translate-x-1.5 transition-transform duration-300`}>
                  Medicina
                </h3>
                <p className="text-xs sm:text-base text-fd-muted-foreground font-light leading-relaxed max-w-xl">
                  Estructuración sistemática del conocimiento médico. Apuntes de fisiología, farmacología clínica y guías de supervivencia hospitalaria organizadas con rigor científico.
                </p>
              </div>

              <div className="pt-3 border-t border-fd-border/60 flex items-center justify-between font-mono text-[11px] sm:text-xs uppercase tracking-widest text-fd-foreground">
                <span className="flex items-center gap-1.5 group-hover:underline font-semibold">
                  Ingresar al compendio <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="text-fd-muted-foreground">CRÍTICO</span>
              </div>
            </Link>

            <Link
              href="/biblioteca/blog"
              className="md:col-span-5 group relative bg-fd-card border border-fd-border p-5 sm:p-8 flex flex-col justify-between min-h-[auto] sm:min-h-[300px] transition-all duration-500 hover:border-fd-foreground"
            >
              <div className="flex justify-between items-start">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 bg-fd-muted border border-fd-border text-fd-foreground font-mono text-[10px] sm:text-[11px] uppercase tracking-widest">
                  <BookOpenText className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> SISTEMA 02
                </div>
                {/* CORRECCIÓN 3c: aria-hidden agregado y opacidad subida a /60 para superar el ratio WCAG AA 3:1 */}
                <span aria-hidden="true" className={`${fontDisplay} text-3xl sm:text-4xl font-black text-fd-muted-foreground/60 group-hover:text-fd-foreground transition-colors select-none`}>
                  H-02
                </span>
              </div>

              <div className="space-y-2 sm:space-y-3 my-4 sm:my-4">
                <h3 className={`${fontDisplay} text-2xl sm:text-4xl font-black uppercase tracking-tight text-fd-foreground group-hover:translate-x-1.5 transition-transform duration-300`}>
                  Biblioteca
                </h3>
                <p className="text-xs sm:text-base text-fd-muted-foreground font-light leading-relaxed">
                  El jardín en estado puro. Crítica literaria, filosofía, ensayos y reflexiones sobre el mundo, el código y la vida que transcurre en los márgenes.
                </p>
              </div>

              <div className="pt-3 border-t border-fd-border/60 flex items-center justify-between font-mono text-[11px] sm:text-xs uppercase tracking-widest text-fd-foreground">
                <span className="flex items-center gap-1.5 group-hover:underline font-semibold">
                  Leer ensayos <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="text-fd-muted-foreground">EN EXPANSIÓN</span>
              </div>
            </Link>
          </div>
        </section>

        {/* Telemetría, Citas & Stack */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
          <div className="lg:col-span-7 bg-fd-card border border-fd-border p-5 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-fd-muted-foreground">
              <span className="flex items-center gap-2 text-fd-foreground font-bold">
                <Radio className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-fd-foreground animate-pulse" />
                PENSAMIENTO INTERCEPTADO
              </span>
              <span>FRECUENCIA_01</span>
            </div>

            <div className="my-4 font-serif text-base sm:text-xl md:text-2xl italic text-fd-foreground leading-relaxed pl-4 sm:pl-5 border-l-2 border-fd-foreground/40">
              <QuoteClient
                initialQuote={quotes[Math.floor(Math.random() * quotes.length)]}
                allQuotes={quotes}
              />
            </div>

            <div className="pt-3 border-t border-fd-border/60 flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-fd-muted-foreground uppercase tracking-widest">
              <span>ARCHIVO GENERAL DE CITAS</span>
              <span className="font-semibold text-fd-foreground">TRANSMISIÓN CONTINUA</span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-fd-card border border-fd-border p-5 sm:p-8 flex flex-col justify-between space-y-4">
            <div>
              <div className="font-mono text-[11px] sm:text-xs tracking-[0.25em] text-fd-muted-foreground uppercase font-bold mb-1.5 sm:mb-2 flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-fd-foreground" /> ARQUITECTURA DIGITAL
              </div>
              <h3 className={`${fontDisplay} text-base sm:text-lg font-bold tracking-tight text-fd-foreground mb-1 sm:mb-1.5`}>
                Rendimiento sin compromisos.
              </h3>
              <p className="text-xs sm:text-sm text-fd-muted-foreground font-light leading-relaxed">
                Construido como un monolito estático ultrarrápido sin dependencias superfluas. Cada byte es renderizado con el único propósito de transferir ideas sin latencia.
              </p>
            </div>

            <div className="space-y-1.5 sm:space-y-2 pt-3 border-t border-fd-border/60">
              <div className="font-mono text-[9px] sm:text-[10px] text-fd-muted-foreground uppercase tracking-wider">
                TECNOLOGÍA EN EJECUCIÓN:
              </div>
              <div className="flex flex-wrap gap-1 sm:gap-1.5 font-mono text-[10px] sm:text-[11px]">
                {['Next.js 15', 'Tailwind v4', 'Fumadocs', 'MDX', 'TypeScript'].map((tech) => (
                  <span
                    key={tech}
                    className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-fd-muted border border-fd-border text-fd-foreground font-medium uppercase tracking-wider"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Manifiesto, Redes & FAQ */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 pt-4 border-t border-fd-border">
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <div className="space-y-2 sm:space-y-2.5">
              <span className="font-mono text-[11px] sm:text-xs tracking-[0.3em] text-fd-muted-foreground uppercase block">
                // MANIFIESTO
              </span>
              <h2 className={`${fontDisplay} text-lg sm:text-2xl font-extrabold uppercase tracking-tight text-fd-foreground`}>
                Esto no es un blog, es un jardín.
              </h2>
              <p className="text-xs sm:text-base text-fd-muted-foreground font-light leading-relaxed">
                Un espacio no lineal donde las ideas germinan en público y crecen orgánicamente. Sin algoritmos, sin la urgencia de las redes sociales. Las plantas no crecen en líneas rectas, el pensamiento tampoco.
              </p>
            </div>

            <div className="space-y-2 sm:space-y-2.5">
              <span className="font-mono text-[11px] sm:text-xs tracking-[0.3em] text-fd-muted-foreground uppercase block">
                // NODOS DE ENLACE EXTERNO
              </span>
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                <SocialNode href="https://github.com/uremy" icon={<Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" />} label="GitHub" />
                <SocialNode href="https://youtube.com/@uremy" icon={<Youtube className="h-3.5 w-3.5 sm:h-4 sm:w-4" />} label="YouTube" />
                <SocialNode href="https://instagram.com/ure.emy" icon={<Instagram className="h-3.5 w-3.5 sm:h-4 sm:w-4" />} label="Instagram" />
                <SocialNode href="https://twitter.com/Taimilog" icon={<Twitter className="h-3.5 w-3.5 sm:h-4 sm:w-4" />} label="Twitter / X" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between border-b border-fd-border pb-2 sm:pb-2.5">
              <h3 className={`${fontDisplay} text-base sm:text-lg font-bold uppercase tracking-tight text-fd-foreground`}>
                Interrogatorio del Sistema (FAQ)
              </h3>
              <span className="font-mono text-[11px] sm:text-xs text-fd-muted-foreground">REF: 004</span>
            </div>

            <Accordions type="single" collapsible className="space-y-1.5 sm:space-y-2">
              <Accordion 
                title="¿Qué es exactamente Taimilog y cuál es su propósito?" 
                className="border border-fd-border px-4 py-2 sm:px-5 sm:py-2.5 bg-fd-card hover:border-fd-foreground/40 transition-colors rounded-none text-xs sm:text-sm font-semibold text-fd-foreground"
              >
                <p className="font-sans text-fd-muted-foreground leading-relaxed text-xs sm:text-sm pt-1 pb-2 sm:pb-3 font-light">
                  Taimilog es un espacio digital personal y evolutivo donde almaceno y sistematizo todo lo que aprendo en mi camino por la medicina, además de ensayos personales. Funciona como un segundo cerebro público donde comparto apuntes structuredos que pueden servir tanto a estudiantes como a mentes curiosas.
                </p>
              </Accordion>

              <Accordion 
                title="¿Cuál es la etimología y significado detrás de 'Taimilog'?" 
                className="border border-fd-border px-4 py-2 sm:px-5 sm:py-2.5 bg-fd-card hover:border-fd-foreground/40 transition-colors rounded-none text-xs sm:text-sm font-semibold text-fd-foreground"
              >
                <p className="font-sans text-fd-muted-foreground leading-relaxed text-xs sm:text-sm pt-1 pb-2 sm:pb-3 font-light">
                  El nombre es un acrónimo conceptual: <strong className="text-fd-foreground font-semibold">Taimi-</strong> proviene de <em>&quot;Taimado&quot;</em> (astuto, sagaz o persistente), mientras que <strong className="text-fd-foreground font-semibold">-log</strong> se deriva de <em>&quot;Logbook&quot;</em> (bitácora o registro de navegación). La filosofía es mantener los <em>&quot;registros continuos de una mente taimada&quot;</em>.
                </p>
              </Accordion>

              <Accordion 
                title="¿Por qué recomiendas crear un Jardín Digital propio?" 
                className="border border-fd-border px-4 py-2 sm:px-5 sm:py-2.5 bg-fd-card hover:border-fd-foreground/40 transition-colors rounded-none text-xs sm:text-sm font-semibold text-fd-foreground"
              >
                <p className="font-sans text-fd-muted-foreground leading-relaxed text-xs sm:text-sm pt-1 pb-2 sm:pb-3 font-light">
                  La web moderna se ha vuelto efímera y algorítmica; las redes sociales no ofrecen propiedad real ni un espacio para estructurar el pensamiento a largo plazo. Tener un rincón propio te aleja del feed y te permite cultivar tus ideas, portafolio y conocimientos a tu propio ritmo.
                </p>
              </Accordion>

              <Accordion 
                title="¿Quién es el personaje que aparece en el avatar principal?" 
                className="border border-fd-border px-4 py-2 sm:px-5 sm:py-2.5 bg-fd-card hover:border-fd-foreground/40 transition-colors rounded-none text-xs sm:text-sm font-semibold text-fd-foreground"
              >
                <p className="font-sans text-fd-muted-foreground leading-relaxed text-xs sm:text-sm pt-1 pb-2 sm:pb-3 font-light">
                  ¡Es la inigualable <strong className="text-fd-foreground font-semibold">Señora Herta</strong> de <em>Honkai: Star Rail</em>! Como dice la célebre cita de la Estación Espacial: <em>&quot;Madam Herta is a peerless gem. Madam Herta is an unrivaled genius. Madam Herta is an inimitable beauty.&quot;</em> Un símbolo de intelecto analítico y elegancia eterna.
                </p>
              </Accordion>
            </Accordions>
          </div>
        </section>
      </div>

      {/* Footer (Con padding pb-24 en móvil para evitar corte con la barra inferior del navegador) */}
      <footer className="border-t border-fd-border/80 bg-fd-card/50 backdrop-blur-md w-full">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-6 pb-24 sm:pb-8 flex flex-col md:flex-row items-center justify-between gap-3 font-mono text-[9px] sm:text-[11px] tracking-widest text-fd-muted-foreground uppercase">
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-6">
            <div className="flex items-center gap-1.5 sm:gap-2 text-fd-foreground font-semibold">
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fd-foreground opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-fd-foreground" />
              </span>
              <span className="flex items-center gap-1 sm:gap-1.5">
                <Cpu className="h-3 w-3 text-fd-muted-foreground" /> SYS.TAIMILOG // v2.4
              </span>
            </div>
            <span className="flex items-center gap-1 border-l border-fd-border/60 pl-3 sm:pl-6">
              <Activity className="h-3 w-3 text-fd-muted-foreground" /> NÚCLEO: ACTIVO
            </span>
            <span className="hidden sm:inline border-l border-fd-border/60 pl-6">
              MODO: LECTURA_PROFUNDA
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-center">
            <span className="text-fd-foreground font-bold hidden sm:inline">
              LATENCIA: 0.0ms
            </span>
            <span className="sm:border-l sm:border-fd-border/60 sm:pl-6">
              © 20XX TAIMILOG — CÓDIGO ABIERTO (OPEN SOURCE)
            </span>
          </div>

        </div>
      </footer>
    </div>
  );
}

function SocialNode({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-fd-card border border-fd-border p-2.5 sm:p-3 flex items-center justify-between transition-all hover:bg-fd-foreground hover:text-fd-background hover:border-fd-foreground"
    >
      <div className="flex items-center gap-2 sm:gap-2.5">
        <span className="text-fd-muted-foreground group-hover:text-inherit transition-colors">
          {icon}
        </span>
        <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-wider">{label}</span>
      </div>
      <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
    </a>
  );
}