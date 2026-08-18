// components/science-charts/diagrams/AcidBaseMapChart.tsx
'use client';

import { ScienceChart } from '../core/ScienceChart';
import { Axis } from '../core/Axis';
import { Curve } from '../core/Curve';
import { Marker, EventLine, HorizontalEventLine, CurveEndLabel } from '../core/Annotations';
import {
  standardIsobars,
  clinicalZones,
  calculateHco3,
  type Point2D,
} from './data/acidBaseMap';

export interface AcidBaseSample {
  ph: number;
  hco3: number;
  label?: string;
}

export interface AcidBaseMapChartProps {
  sample?: AcidBaseSample;
  height?: number;
}

export function AcidBaseMapChart({
  sample,
  height = 420,
}: AcidBaseMapChartProps) {
  const clinicalLegend = (
    <div className="text-xs text-fd-muted-foreground space-y-3">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        <span className="font-semibold text-fd-foreground">Ejes y Parámetros:</span>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block shrink-0" />
          <span>Punto Normal (pH 7.40, HCO₃⁻ 24 mEq/L, PCO₂ 40 mmHg)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-400 dark:bg-neutral-600 inline-block shrink-0" />
          <span>Isobaras de PCO₂ (Henderson-Hasselbalch)</span>
        </div>
      </div>
      <p className="text-[11px] leading-relaxed text-fd-muted-foreground">
        Las bandas sombreadas delimitan los rangos de compensación renal y respiratoria esperados para los trastornos ácido-base simples. Puntos que caen fuera de las bandas sugieren trastornos mixtos.
      </p>
    </div>
  );

  return (
    <ScienceChart
      domainX={[7.0, 7.8]}
      domainY={[0, 60]}
      height={height}
      minWidth={540}
      margin={{ top: 32, right: 36, bottom: 48, left: 56 }}
      title="Mapa de Equilibrio Ácido-Base"
      subtitle="Nomograma de Henderson-Hasselbalch con bandas de compensación fisiológica"
      badge="Gasometría"
      legend={clinicalLegend}
    >
      {/* Líneas de referencia normal */}
      <EventLine
        x={7.4}
        className="stroke-neutral-300 dark:stroke-neutral-800 stroke-1 stroke-dasharray-[2,2]"
      />
      <HorizontalEventLine
        y={24}
        className="stroke-neutral-300 dark:stroke-neutral-800 stroke-1 stroke-dasharray-[2,2]"
      />

      {/* Bandas de compensación diagnóstica */}
      {clinicalZones.map((zone, idx) => (
        <Curve
          key={`zone-${idx}`}
          data={zone.points}
          x={(d: Point2D) => d.ph}
          y={(d: Point2D) => d.hco3}
          curve="closed"
          className="fill-neutral-500/10 dark:fill-neutral-400/10 stroke-neutral-400/40 dark:stroke-neutral-600/40 stroke-1"
        />
      ))}

      {/* Haz de Isobaras de PCO2 */}
      {standardIsobars.map((isobar, idx) => (
        <g key={`isobar-${idx}`}>
          <Curve
            data={isobar.points}
            x={(d: Point2D) => d.ph}
            y={(d: Point2D) => d.hco3}
            curve="monotone"
            className={
              isobar.pco2 === 40
                ? 'stroke-neutral-800 dark:stroke-neutral-200 stroke-[1.5] fill-none'
                : 'stroke-neutral-400/60 dark:stroke-neutral-600/60 stroke-1 stroke-dasharray-[3,3] fill-none'
            }
          />
          <CurveEndLabel
            x={isobar.labelPh}
            y={calculateHco3(isobar.labelPh, isobar.pco2)}
            label={isobar.label}
            className="text-[9px] font-mono fill-neutral-500 dark:fill-neutral-400 select-none font-medium"
            dy={-6}
            dx={4}
          />
        </g>
      ))}

      {/* Punto Normal Fisiológico */}
      <Marker
        x={7.4}
        y={24}
        label="Normal"
        type="circle"
        className="fill-rose-500 dark:fill-rose-400 stroke-neutral-900 dark:stroke-neutral-100"
      />

      {/* Muestra de paciente opcional */}
      {sample && (
        <Marker
          x={sample.ph}
          y={sample.hco3}
          label={sample.label || 'Paciente'}
          type="intersection"
          className="fill-amber-500 dark:fill-amber-400 stroke-neutral-900 dark:stroke-neutral-100"
        />
      )}

      {/* Ejes */}
      <Axis
        orientation="bottom"
        ticks={[7.0, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8]}
        tickFormat={(val) => val.toFixed(2)}
        label="pH Arterial"
      />
      <Axis
        orientation="left"
        ticks={[0, 10, 20, 30, 40, 50, 60]}
        label="[HCO₃⁻] sérico (mEq/L)"
      />
    </ScienceChart>
  );
}