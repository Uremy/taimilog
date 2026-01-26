import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      <div className="container relative z-10 flex flex-col items-center gap-8 py-24 lg:py-40">
        
        {/* TÍTULO PRINCIPAL */}
        <h1 className="text-5xl font-bold md:text-7xl">
          Hola, soy <span className="text-fd-primary">Uremy</span>
        </h1>

        {/* DESCRIPCIÓN */}
        <p className="max-w-2xl text-lg text-fd-muted-foreground md:text-xl">
          Estudiante de medicina. 
          Aquí comparto mis apuntes de estudio y reflexiones sobre lo que voy aprendiendo.
        </p>
      </div>
    </main>
  );
}