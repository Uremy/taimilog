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
  BookOpen,
  Pill,
  Flame
} from 'lucide-react';
import { quotes } from '@/lib/quotes';
import { QuoteClient } from '@/components/quote-client';

// --- UTILIDADES DE ESTILO ---
const cardClass = "relative overflow-hidden rounded-2xl border bg-fd-card transition-all duration-300 hover:shadow-lg hover:border-fd-primary/30";

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8 pb-24">
      
      {/* --- HERO COMPACTO (Estilo Bento.me) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        
        {/* TARJETA DE PERFIL PRINCIPAL */}
        <div className={`${cardClass} col-span-1 md:col-span-2 p-8 bg-gradient-to-br from-fd-primary/10 via-fd-card to-fd-card`}>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            
            {/* Avatar con indicador de estado */}
            <div className="relative group">
              <div className="h-28 w-28 overflow-hidden rounded-lg border-2 border-fd-background shadow-xl transition-transform group-hover:scale-105">
                <Image 
                  src="/avatar.webp" 
                  alt="Uremy Avatar"
                  width={112}
                  height={112}
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
              {/* Indicador de estado */}
              <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-[#8F2439] border-2 border-fd-background flex items-center justify-center">
                <HeartPulse className="h-3 w-3 text-white" />
              </div>
            </div>

            {/* Info Personal */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold">Uremy</h1>
                <div className="px-2 py-0.5 text-xs font-medium bg-fd-primary/20 text-fd-primary rounded-full">
                  taimilog
                </div>
              </div>
              
              <p className="text-fd-muted-foreground mb-2 leading-relaxed">
                Welcome, is always nice to see you here
              </p>
              
              <p className="text-sm text-fd-muted-foreground/80 mb-3 font-light">
                그냥 저예요. 한국어 연습할 때도 있고 그냥 방황할 때도 있고.
              </p>

              {/* Metadata */}
              <div className="flex flex-wrap gap-4 text-sm text-fd-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  <span>우주</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CITA ALEATORIA - Reemplaza QUICK STATS */}
        <div className={`${cardClass} p-6 bg-gradient-to-br from-indigo-500/5 to-transparent`}>
          <QuoteClient 
            initialQuote={quotes[Math.floor(Math.random() * quotes.length)]} 
            allQuotes={quotes} 
          />
        </div>
      </div>

      {/* --- BENTO GRID PRINCIPAL --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[180px]">
        
        {/* MEDICINA - Grande */}
        <Link href="/medicina/introduccion" className={`${cardClass} lg:col-span-2 lg:row-span-2 p-6 group flex flex-col justify-between`}>
          <div>
            <div className="inline-flex items-center justify-center p-3 bg-rose-100 dark:bg-rose-900/20 rounded-xl mb-4">
              <Stethoscope className="h-6 w-6 text-rose-700 dark:text-rose-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Facultad de Medicina</h3>
            <p className="text-fd-muted-foreground text-sm leading-relaxed">
              Apuntes organizados de Fisiología, Patología, Farmacología y más. 
              Mi segundo cerebro para sobrevivir a la carrera.
            </p>
          </div>
          <div className="flex items-center gap-2 text-fd-primary font-medium mt-6">
            <span>Explorar apuntes</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
          
          {/* Decoración */}
          <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-rose-500/10 blur-3xl" />
        </Link>

        {/* TECH STACK - Vertical */}
        <div className={`${cardClass} p-6 lg:row-span-2`}>
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="h-5 w-5 text-fd-primary" />
            <h3 className="font-semibold">Stack</h3>
          </div>
          <div className="space-y-2">
            {[
              { name: 'Next.js 15', color: 'bg-slate-900 dark:bg-slate-100' },
              { name: 'Fumadocs', color: 'bg-rose-600' },
              { name: 'Tailwind', color: 'bg-cyan-500' },
              { name: 'TypeScript', color: 'bg-blue-600' },
              { name: 'MDX', color: 'bg-amber-500' }
            ].map((tech, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-lg border bg-fd-background/50 hover:bg-fd-accent transition-colors">
                <span className="text-xs font-medium">{tech.name}</span>
                <div className={`h-2 w-2 rounded-full ${tech.color}`} />
              </div>
            ))}
          </div>
        </div>

        {/* BUSCADOR */}
        <button className={`${cardClass} p-6 flex flex-col items-center justify-center text-center hover:bg-fd-primary/5 cursor-pointer group`}>
          <Search className="h-8 w-8 text-fd-primary mb-3 transition-transform group-hover:scale-110" />
          <h3 className="font-semibold mb-1">Buscar</h3>
          <p className="text-xs text-fd-muted-foreground">
            Presiona <kbd className="px-2 py-1 text-xs border rounded bg-fd-background">/</kbd>
          </p>
        </button>

        {/* BIBLIOTECA */}
        <Link href="/biblioteca/blog" className={`${cardClass} p-6 bg-gradient-to-br from-amber-500/10 to-transparent group`}>
          <Library className="h-6 w-6 text-amber-700 dark:text-amber-400 mb-3" />
          <h3 className="font-bold mb-1">Biblioteca</h3>
          <p className="text-xs text-fd-muted-foreground">
            Blog personal y reflexiones filosóficas
          </p>
          <ArrowRight className="h-4 w-4 text-fd-primary mt-auto transition-transform group-hover:translate-x-1" />
        </Link>

        {/* FILOSOFÍA - Grande */}
        <Link href="/biblioteca/blog" className={`${cardClass} lg:col-span-2 p-6 flex flex-col group`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Brain className="h-5 w-5 text-purple-700 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold">Últimas Reflexiones</h3>
          </div>
          
          <div className="space-y-2">
            {[
              { title: 'El mito de Sísifo', icon: <BookOpen className="h-4 w-4" /> },
              { title: 'Wetware y Consciencia', icon: <Brain className="h-4 w-4" /> },
              { title: 'Ética en urgencias', icon: <Pill className="h-4 w-4" /> }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-fd-accent transition-colors border border-transparent hover:border-fd-border">
                <div className="text-fd-muted-foreground">{item.icon}</div>
                <span className="text-sm font-medium flex-1">{item.title}</span>
                <span className="text-xs text-fd-muted-foreground font-mono">#{String(i+1).padStart(2, '0')}</span>
              </div>
            ))}
          </div>
        </Link>

        {/* REDES SOCIALES */}
        <div className={`${cardClass} lg:col-span-2 p-6 bg-gradient-to-br from-fd-primary/5 to-transparent`}>
          <h3 className="font-semibold mb-4">Encuéntrame en</h3>
          <div className="flex gap-3">
            <SocialBtn href="https://github.com/uremy" icon={<Github className="h-5 w-5"/>} label="GitHub" />
            <SocialBtn href="https://youtube.com/@uremy" icon={<Youtube className="h-5 w-5"/>} label="YouTube" />
            <SocialBtn href="https://instagram.com/ure.emy" icon={<Instagram className="h-5 w-5"/>} label="Instagram" />
          </div>
        </div>

        {/* NOW PLAYING / STATUS */}
        <div className={`${cardClass} lg:col-span-2 p-6 flex items-center gap-4 bg-gradient-to-r from-rose-500/10 to-transparent`}>
          <div className="h-12 w-12 rounded-lg bg-rose-500/20 flex items-center justify-center">
            <Flame className="h-6 w-6 text-rose-700 dark:text-rose-400" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-fd-muted-foreground mb-1">Estado actual</p>
            <p className="font-medium">Preparando examen de Farmacología</p>
          </div>
        </div>

      </div>
    </main>
  );
}

// --- COMPONENTES AUXILIARES ---

function SocialBtn({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noreferrer"
      className="flex items-center justify-center h-11 w-11 rounded-xl border bg-fd-background hover:bg-fd-accent hover:border-fd-primary transition-all hover:scale-105"
      title={label}
    >
      {icon}
    </a>
  );
}