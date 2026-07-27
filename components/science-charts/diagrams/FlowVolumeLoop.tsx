// components/science-charts/diagrams/FlowVolumeLoop.tsx
'use client';

import { ScienceChart } from '../core/ScienceChart';
import { Axis } from '../core/Axis';
import { Curve } from '../core/Curve';
import { Marker } from '../core/Annotations';
import { normalSpirometry, type SpirometryCurveData } from './data/spirometry';

export interface FlowVolumeLoopProps {
  data?: SpirometryCurveData;
  comparisonData?: SpirometryCurveData;
  height?: number;
}

export function FlowVolumeLoop({ 
  data = normalSpirometry, 
  comparisonData, 
  height = 320 
}: FlowVolumeLoopProps) {
  return (
    <ScienceChart
      domainX={[0, 6]}     
      domainY={[-10, 10]}
      height={height}
      minWidth={420}
      title={`Espirometría: ${data.label}`}
      subtitle="Curva Flujo-Volumen (Espiración positiva / Inspiración negativa)"
    >
      <Axis orientation="bottom" atZero ticks={[0, 1, 2, 3, 4, 5, 6]} label="Volumen (L)" />
      <Axis orientation="left" ticks={[-8, -6, -4, -2, 0, 2, 4, 6, 8]} label="Flujo (L/s)" />

      {comparisonData && (
        <Curve
          data={comparisonData.points}
          x={(d) => d.volume}
          y={(d) => d.flow}
          type="line"
          curve="closed"
          className="stroke-neutral-400 dark:stroke-neutral-600 stroke-1 stroke-dashed fill-none opacity-70"
        />
      )}

      {/* Relleno corregido: line cerrada, sin area/y0 */}
      <Curve
        data={data.points}
        x={(d) => d.volume}
        y={(d) => d.flow}
        type="line"
        curve="closed"
        className="fill-fd-primary/5 dark:fill-fd-primary/10 stroke-none transition-colors"
      />

      {/* Contorno */}
      <Curve
        data={data.points}
        x={(d) => d.volume}
        y={(d) => d.flow}
        type="line"
        curve="closed"
        className="stroke-fd-primary stroke-2 fill-none"
      />

      <Marker
        x={data.pef.volume}
        y={data.pef.flow}
        label={data.pef.label}
        className="fill-rose-500 dark:fill-rose-400"
      />
    </ScienceChart>
  );
}