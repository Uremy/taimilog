// components/science-charts/diagrams/WiggersDiagram.tsx
'use client';

import { ScienceChart } from '../core/ScienceChart';
import { Axis } from '../core/Axis';
import { PhaseBand, EventLine } from '../core/Annotations';
import { textbookWiggersData } from './data/wiggers';

export interface WiggersDiagramProps {
  data?: typeof textbookWiggersData;
  height?: number;
}

export function WiggersDiagram({ data = textbookWiggersData, height = 560 }: WiggersDiagramProps) {
  return (
    <ScienceChart
      domainX={[0, 0.8]} // EL RELOJ MAESTRO: Todo el gráfico obedece de 0.0s a 0.8s
      height={height}
      minWidth={680}     // Ancho de seguridad para que quepan las 5 etiquetas de fase
      title="Diagrama de Wiggers: Ciclo Cardíaco Izquierdo"
      subtitle="Etapa 1: Sincronización del reloj maestro, fases y eventos valvulares"
    >
      {/* 1. CAPA DE FONDO: Fases del Ciclo Cardíaco (Sombra alternada) */}
      {data.phases.map((phase, idx) => (
        <PhaseBand
          key={idx}
          start={phase.start}
          end={phase.end}
          label={phase.label}
          // Alternamos una opacidad sutil (4% vs 8%) usando clases seguras de Tailwind
          className={idx % 2 === 0 
            ? 'fill-neutral-500 dark:fill-neutral-400 opacity-[0.04]' 
            : 'fill-neutral-500 dark:fill-neutral-400 opacity-[0.09]'}
        />
      ))}

      {/* 2. CAPA DE EVENTOS: Cierres y aperturas valvulares (S1, S2...) */}
      {data.events.map((ev, idx) => (
        <EventLine
          key={idx}
          x={ev.time}
          label={ev.label}
          className="stroke-rose-500/70 dark:stroke-rose-400/70 stroke-dashed stroke-1"
        />
      ))}

      {/* 3. EJE TEMPORAL: La regla de medición en la base del lienzo */}
      <Axis 
        orientation="bottom" 
        ticks={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]} 
        label="Tiempo (s)" 
      />
    </ScienceChart>
  );
}