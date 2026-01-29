import Link from 'next/link';
import Image from 'next/image';
import { 
  Stethoscope, 
  Library, 
  Brain, 
  Github, 
  Youtube, 
  Instagram, 
  Search, 
  ArrowRight, 
  Terminal, 
  MapPin, 
  HeartPulse, 
  ExternalLink, 
  Twitter 
} from 'lucide-react';
import { quotes } from '@/lib/quotes';
import { QuoteClient } from '@/components/quote-client';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';

// --- CONSTANTES DE DISEÑO ---
const AVATAR_SIZE = 112; 

// Clases base
const cardClass = "relative overflow-hidden rounded-2xl border bg-fd-card transition-all duration-300 hover:shadow-lg";
const brandHoverClass = "hover:border-[#8F2439]/30 dark:hover:border-[#E87D95]/30";
const outlineCardClass = "rounded-2xl border border-fd-border p-6 md:p-8 bg-fd-card/30"; 

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-6 pb-24">
      
      {/* --- HERO SECTION --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* PERFIL */}
        <div className={`${cardClass} ${brandHoverClass} col-span-1 md:col-span-2 p-8 bg-gradient-to-br from-fd-primary/10 via-fd-card to-fd-card`}>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative group">
              <div className="h-28 w-28 overflow-hidden rounded-lg border-2 border-fd-background shadow-xl transition-transform group-hover:scale-105">
                <Image 
                  src="/avatar.webp" 
                  alt="Uremy - Estudiante de medicina"
                  width={AVATAR_SIZE}
                  height={AVATAR_SIZE}
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
              <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-[#8F2439] border-2 border-fd-background flex items-center justify-center" aria-hidden="true">
                <HeartPulse className="h-3 w-3 text-white" />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold">Uremy</h1>
                <span className="px-2 py-0.5 text-xs font-medium bg-[#8F2439]/10 text-[#8F2439] dark:bg-[#E87D95]/10 dark:text-[#E87D95] rounded-full">
                  taimilog
                </span>
              </div>
              <p className="text-fd-muted-foreground mb-2 leading-relaxed">
                Welcome, is always nice to see you here
              </p>
              <p className="text-sm text-fd-muted-foreground/80 mb-3 font-light">
                그냥 저예요. 한국어 연습할 때도 있고 그냥 방황할 때도 있고.
              </p>
              <div className="flex items-center gap-1.5 text-sm text-fd-muted-foreground">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <span>우주</span>
              </div>
            </div>
          </div>
        </div>

        {/* CITA */}
        <div className={`${cardClass} p-6 bg-gradient-to-br from-indigo-500/5 to-transparent flex flex-col justify-center hover:border-indigo-500/30`}>
          <QuoteClient 
            initialQuote={quotes[Math.floor(Math.random() * quotes.length)]} 
            allQuotes={quotes} 
          />
        </div>
      </div>

      {/* --- GRID DE CONTENIDO PRINCIPAL --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* MEDICINA */}
        <Link 
          href="/medicina/introduccion" 
          className={`${cardClass} ${brandHoverClass} col-span-2 row-span-2 p-6 group flex flex-col justify-between min-h-[200px] md:min-h-[300px]`}
        >
          <div>
            <div className="inline-flex items-center justify-center p-3 bg-rose-100 dark:bg-rose-900/20 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
              <Stethoscope className="h-6 w-6 text-[#8F2439] dark:text-[#E87D95]" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Medicina</h2>
            <p className="text-fd-muted-foreground text-sm leading-relaxed max-w-md">
              Apuntes organizados de Fisiología, Patología y más. 
              Mi segundo cerebro para sobrevivir a la carrera.
            </p>
          </div>
          <div className="flex items-center gap-2 text-[#8F2439] dark:text-[#E87D95] font-medium mt-6">
            <span>Explorar apuntes</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
          <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-[#8F2439]/10 dark:bg-[#E87D95]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
        </Link>

        {/* BUSCADOR (INFO) - Modificado */}
        <div className={`${cardClass} col-span-1 p-4 flex flex-col items-center justify-center text-center aspect-square select-none`}>
          <p className="text-[11px] font-semibold text-fd-muted-foreground mb-2 leading-tight">
            ¿Quieres buscar algo específico?
          </p>
          <div className="p-2 bg-fd-primary/10 rounded-full mb-2">
            <Search className="h-5 w-5 text-[#8F2439] dark:text-[#E87D95]" aria-hidden="true" />
          </div>
          <p className="text-[10px] text-fd-muted-foreground/80 leading-tight">
            El botón siempre está a tu disposición
          </p>
        </div>

        {/* TECH STACK */}
        <div className={`${cardClass} col-span-1 p-4 flex flex-col justify-center aspect-square hover:border-blue-500/30`}>
          <div className="flex items-center gap-2 mb-3">
            <Terminal className="h-5 w-5 text-fd-primary" aria-hidden="true" />
            <h3 className="font-semibold text-sm">Stack</h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {['Next.js', 'React', 'MDX'].map((tech) => (
              <span key={tech} className="px-2 py-1 rounded-md bg-fd-background text-[10px] font-medium border">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* BIBLIOTECA */}
        <Link 
          href="/biblioteca/blog" 
          className={`${cardClass} col-span-2 p-6 flex items-center justify-between group bg-gradient-to-r from-purple-500/5 to-transparent hover:border-purple-500/30`}
        >
          <div className="flex items-center gap-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg group-hover:scale-110 transition-transform">
              <Brain className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-bold">Biblioteca & Blog</h3>
              <p className="text-xs text-fd-muted-foreground">Reflexiones filosóficas y notas</p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-fd-muted-foreground transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* --- SECCIÓN REDES SOCIALES (ENCAPSULADA) --- */}
      <div className="mt-8">
        <div className={outlineCardClass}>
          <h3 className="text-2xl font-bold mb-6 text-center">¡Sígueme!</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SocialCard 
              href="https://github.com/uremy"
              icon={<Github className="h-6 w-6 md:h-5 md:w-5" />}
              label="GitHub"
              subLabel="@uremy"
            />
            <SocialCard 
              href="https://youtube.com/@uremy"
              icon={<Youtube className="h-6 w-6 md:h-5 md:w-5" />}
              label="YouTube"
              subLabel="Suscríbete"
            />
            <SocialCard 
              href="https://instagram.com/ure.emy"
              icon={<Instagram className="h-6 w-6 md:h-5 md:w-5" />}
              label="Instagram"
              subLabel="Sígueme"
            />
            <SocialCard 
              href="https://twitter.com/Taimilog"
              icon={<Twitter className="h-6 w-6 md:h-5 md:w-5" />}
              label="Twitter"
              subLabel="@Taimilog"
            />
          </div>
        </div>
      </div>

      {/* --- SECCIÓN FAQ (ENCAPSULADA) --- */}
      <div className="mt-8">
        <div className={outlineCardClass}>
          <h3 className="text-2xl font-bold mb-6 text-center">Preguntas Frecuentes</h3>
          
          <Accordions>
            <Accordion title="¿Qué es Taimilog?">
              PLACEHOLDER
            </Accordion>
            
            <Accordion title="¿Qué significa Taimilog?">
              PLACEHOLDER
            </Accordion>
            
            <Accordion title="¿Por qué TU deberías hacer un sitio personal?">
              PLACEHOLDER
            </Accordion>
            
            <Accordion title="¿Quién es el personaje de la foto de perfil?">
              PLACEHOLDER
            </Accordion>
          </Accordions>
        </div>
      </div>

    </main>
  );
}

// --- COMPONENTE SOCIAL CARD ---
function SocialCard({ href, icon, label, subLabel }: { href: string; icon: React.ReactNode; label: string; subLabel: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`
        ${cardClass}
        ${brandHoverClass}
        col-span-1 md:col-span-2 
        aspect-square md:aspect-auto md:h-20
        flex flex-col md:flex-row 
        items-center justify-center md:justify-start 
        p-4 md:px-6 gap-2 md:gap-4
        group
        hover:bg-[#8F2439]/5 dark:hover:bg-[#E87D95]/5
      `}
    >
      <div className="mb-1 md:mb-0 transition-transform group-hover:scale-110 text-fd-foreground group-hover:text-[#8F2439] dark:group-hover:text-[#E87D95]">
        {icon}
      </div>
      
      <div className="text-center md:text-left">
        <h3 className="font-bold text-sm md:text-base leading-none mb-1 group-hover:text-[#8F2439] dark:group-hover:text-[#E87D95] transition-colors">
          {label}
        </h3>
        <p className="text-[10px] md:text-xs text-fd-muted-foreground">
          {subLabel}
        </p>
      </div>

      <ExternalLink className="hidden md:block h-4 w-4 ml-auto text-fd-muted-foreground opacity-0 group-hover:opacity-100 transition-all group-hover:text-[#8F2439] dark:group-hover:text-[#E87D95]" aria-hidden="true" />
    </a>
  );
}