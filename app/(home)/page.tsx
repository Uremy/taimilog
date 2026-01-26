import Link from 'next/link';
import { 
  Stethoscope, 
  Library, 
  Brain, 
  Microscope, 
  Github, 
  Youtube, 
  Instagram, 
  Search, 
  ArrowRight,
  Terminal
} from 'lucide-react';

// --- UTILIDADES DE ESTILO ---
const cardClass = "relative overflow-hidden rounded-2xl border bg-fd-card p-6 shadow-sm transition-shadow hover:shadow-md";

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-12 pb-24 space-y-8">
      
      {/* --- HERO SECTION --- */}
      <div className="relative flex flex-col items-center justify-center min-h-[500px] rounded-3xl border bg-fd-card overflow-hidden text-center p-8 md:p-16">
        <div className="absolute inset-0 bg-gradient-to-b from-fd-primary/5 to-transparent pointer-events-none" />
        
        <div className="z-10 flex flex-col items-center max-w-3xl">
          <div className="inline-flex items-center rounded-full border border-fd-primary/20 bg-fd-primary/10 px-3 py-1 text-sm font-medium text-fd-primary mb-6">
            <span className="flex h-2 w-2 rounded-full bg-fd-primary mr-2 animate-pulse"></span>
            v2.0 en desarrollo
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Construyendo mi <br/>
            <span className="text-fd-primary">Segundo Cerebro.</span>
          </h1>
          
          <p className="text-xl text-fd-muted-foreground mb-10 max-w-xl">
            Un espacio digital donde documento mi viaje por la medicina, 
            organizo mis apuntes y reflexiono sobre la filosofía del cuidado.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/medicina/introduccion"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white transition-colors bg-fd-primary rounded-full hover:bg-fd-primary/80"
            >
              <Stethoscope className="mr-2 h-4 w-4" />
              Explorar Medicina
            </Link>
            <Link 
              href="/biblioteca/blog"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-colors border rounded-full hover:bg-fd-accent hover:text-fd-accent-foreground"
            >
              <Library className="mr-2 h-4 w-4" />
              Ir a la Biblioteca
            </Link>
          </div>
        </div>
      </div>

      {/* --- BENTO GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
        
        {/* CAJA 1: MEDICINA */}
        <Link href="/medicina/introduccion" className={`${cardClass} col-span-1 md:col-span-2 group`}>
          <div className="flex flex-col h-full justify-between relative z-10">
            <div>
              <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 w-fit rounded-xl text-fd-primary">
                <Microscope className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Facultad de Medicina</h3>
              <p className="text-fd-muted-foreground max-w-md">
                Apuntes estructurados de Fisiología, Patología, Farmacología y casos clínicos. 
                Todo lo que necesito para sobrevivir a los exámenes.
              </p>
            </div>
            <div className="mt-8 flex items-center text-fd-primary font-medium">
              Ver apuntes <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-fd-primary/5 to-transparent pointer-events-none" />
        </Link>

        {/* CAJA 2: TECH STACK */}
        <div className={cardClass}>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Terminal className="h-4 w-4 text-fd-primary" />
            Tech Stack
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm p-2 rounded-lg border bg-fd-background/50">
              <span>Next.js 15</span>
              <div className="h-2 w-2 rounded-full bg-green-500" />
            </div>
            <div className="flex items-center justify-between text-sm p-2 rounded-lg border bg-fd-background/50">
              <span>Fumadocs</span>
              <div className="h-2 w-2 rounded-full bg-blue-500" />
            </div>
            <div className="flex items-center justify-between text-sm p-2 rounded-lg border bg-fd-background/50">
              <span>Tailwind CSS</span>
              <div className="h-2 w-2 rounded-full bg-cyan-500" />
            </div>
          </div>
        </div>

        {/* CAJA 3: FILOSOFÍA */}
        <Link href="/biblioteca/blog" className={`${cardClass} row-span-2 flex flex-col`}>
          <div className="mb-4 p-3 bg-orange-100 dark:bg-orange-900/20 w-fit rounded-xl text-orange-600 dark:text-orange-400">
            <Brain className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Reflexiones</h3>
          <p className="text-fd-muted-foreground mb-6">
            No todo es ciencia dura. Aquí exploro el estoicismo, la ética médica y mis pensamientos personales.
          </p>
          
          <div className="mt-auto space-y-2">
            {['El mito de Sísifo', 'Wetware y Consciencia', 'Ética en urgencias'].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-fd-accent transition-colors cursor-pointer border border-transparent hover:border-fd-border">
                <span className="text-xs font-mono text-fd-muted-foreground">0{i+1}</span>
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </Link>

        {/* CAJA 4: REDES SOCIALES */}
        <div className={`${cardClass} col-span-1 md:col-span-2`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-bold mb-1">Conecta conmigo</h3>
              <p className="text-sm text-fd-muted-foreground">
                Encuéntrame en otras plataformas digitales.
              </p>
            </div>
            <div className="flex gap-4">
              <SocialBtn href="https://github.com/uremy" icon={<Github className="h-5 w-5"/>} label="GitHub" />
              <SocialBtn href="https://youtube.com/@uremy" icon={<Youtube className="h-5 w-5"/>} label="YouTube" />
              <SocialBtn href="https://instagram.com" icon={<Instagram className="h-5 w-5"/>} label="Instagram" />
            </div>
          </div>
        </div>

        {/* CAJA 5: BUSCADOR VISUAL */}
        <div className={`${cardClass} flex flex-col justify-center items-center text-center bg-fd-primary/5 border-fd-primary/20`}>
          <Search className="h-8 w-8 text-fd-primary mb-3 opacity-50" />
          <h3 className="font-semibold">¿Buscas algo específico?</h3>
          {/* 👇 AQUÍ ESTABA EL ERROR: Faltaba cerrar esta línea 👇 */}
          <p className="text-xs text-fd-muted-foreground mt-1 mb-3">
            Presiona <kbd className="border rounded px-1 text-[10px] bg-fd-background">/</kbd> para buscar
          </p>
        </div>

      </div>
    </main>
  );
}

// Componente auxiliar para los botones sociales
function SocialBtn({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noreferrer"
      className="flex items-center justify-center h-10 w-10 rounded-full border bg-fd-background text-fd-muted-foreground hover:text-fd-primary hover:border-fd-primary transition-colors"
      title={label}
    >
      {icon}
    </a>
  );
}