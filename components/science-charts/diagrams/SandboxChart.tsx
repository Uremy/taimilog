// components/science-charts/diagrams/SandboxChart.tsx
'use client';

import { useMemo } from 'react';
import { ScienceChart } from '../core/ScienceChart';
import { Axis } from '../core/Axis';
import { Curve } from '../core/Curve';
import { Marker, PhaseBand, EventLine } from '../core/Annotations';

export function SandboxChart() {
  const dummyData = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => {
      const x = (i / 49) * 10;
      const y = Math.sin(x) * 50 + 50;
      return { x, y };
    }, []);
  }, []);

  return (
    <ScienceChart 
      domainX={[0, 10]} 
      domainY={[0, 100]} 
      height={280}
      minWidth={480}
      title="Figura 1. Validación de Primitivos D3 + React"
      subtitle="Onda senoidal con anotaciones espaciales y sombreado de fases"
      badge="Sandbox"
    >
      <PhaseBand start={2} end={5} label="Zona A" />
      <PhaseBand start={7} end={9} label="Zona B" />
      <EventLine x={3.14} label="π (Pi)" />

      <Axis orientation="bottom" numTicks={6} label="Eje X Genérico (Unidades)" />
      <Axis orientation="left" numTicks={3} label="Eje Y (Porcentaje)" />

      <Curve
        data={dummyData}
        x={(d) => d.x}
        y={(d) => d.y}
        y0={0}
        type="area"
        className="fill-fd-primary/10 dark:fill-fd-primary/20 transition-colors"
      />
      <Curve
        data={dummyData}
        x={(d) => d.x}
        y={(d) => d.y}
        type="line"
        curve="monotone"
        className="stroke-fd-primary stroke-2 fill-none"
      />

      <Marker x={1.57} y={100} label="Pico (1.57, 100)" />
      <Marker x={4.71} y={0} label="Valle (4.71, 0)" />
    </ScienceChart>
  );
}