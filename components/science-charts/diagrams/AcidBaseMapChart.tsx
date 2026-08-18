// components/science-charts/diagrams/AcidBaseMapChart.tsx
'use client';

import { ScienceChart } from '../core/ScienceChart';
import { Axis } from '../core/Axis';
import { Curve } from '../core/Curve';
import { Marker } from '../core/Annotations';
import { useChartContext } from '../core/context';
import {
  standardIsobars,
  clinicalBands,
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

// Subcomponente interno para trazar la cuadrícula matemática clásica
function AcidBaseGrid() {
  const { xScale, yScale, boundedWidth, boundedHeight } = useChartContext();

  const phTicks = [7.0, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8];
  const hco3Ticks = [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60];

  return (
    <g className="science-chart-grid opacity-30 dark:opacity-20 pointer-events-none">
      {phTicks.map((ph) => {
        const x = (xScale as any)(ph) ?? 0;
        return (
          <line
            key={`grid-x-${ph}`}
            x1={x}
            y1={0}
            x2={x}
            y2={boundedHeight}
            className="stroke-neutral-400 dark:stroke-neutral-500 stroke-[0.75]"
          />
        );
      })}
      {hco3Ticks.map((hco3) => {
        const y = yScale(hco3) ?? 0;
        return (
          <line
            key={`grid-y-${hco3}`}
            x1={0}
            y1={y}
            x2={boundedWidth}
            y2={y}
            className="stroke-neutral-400 dark:stroke-neutral-500 stroke-[0.75]"
          />
        );
      })}
    </g>
  );
}

// Subcomponente para renderizar los textos inclinados dentro de las bandas
function BandLabels() {
  const { xScale, yScale } = useChartContext();

  return (
    <g className="band-labels select-none pointer-events-none">
      {clinicalBands.map((band) => {
        const x = (xScale as any)(band.labelPos.ph) ?? 0;
        const y = yScale(band.labelPos.hco3) ?? 0;

        return (
          <g
            key={`label-${band.id}`}
            transform={`translate(${x}, ${y}) rotate(${band.labelPos.angle})`}
          >
            <text
              x={0}
              y={band.labelPos.line2 ? -5 : 0}
              textAnchor="middle"
              dominantBaseline="central"
              className={`text-[9px] font-mono font-bold tracking-tight ${band.textClass}`}
            >
              {band.labelPos.line1}
            </text>
            {band.labelPos.line2 && (
              <text
                x={0}
                y={6}
                textAnchor="middle"
                dominantBaseline="central"
                className={`text-[9px] font-mono font-bold tracking-tight ${band.textClass}`}
              >
                {band.labelPos.line2}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}

// Subcomponente para las etiquetas de las isobaras
function IsobarLabels() {
  const { xScale, yScale } = useChartContext();

  return (
    <g className="isobar-labels select-none pointer-events-none">
      {standardIsobars.map((isobar) => {
        const lastPoint = isobar.points[isobar.points.length - 1];
        if (!lastPoint) return null;

        const x = (xScale as any)(lastPoint.ph) ?? 0;
        const y = yScale(lastPoint.hco3) ?? 0;

        return (
          <text
            key={`isobar-lbl-${isobar.pco2}`}
            x={x + 4}
            y={y + 3}
            className="text-[9px] font-mono fill-neutral-500 dark:fill-neutral-400 font-semibold"
          >
            {isobar.label}
          </text>
        );
      })}
    </g>
  );
}

// Centro de normalidad clínico
function NormalRangeCircle() {
  const { xScale, yScale } = useChartContext();
  const cx = (xScale as any)(7.4) ?? 0;
  const cy = yScale(24) ?? 0;
  
  // Radio horizontal y vertical en pixeles para el rango de normalidad (pH 7.35-7.45, HCO3 22-26)
  const rx = Math.abs(((xScale as any)(7.45) ?? 0) - cx);
  const ry = Math.abs((yScale(26) ?? 0) - cy);

  return (
    <g className="normal-range-group pointer-events-none">
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        className="fill-fd-card stroke-neutral-700 dark:stroke-neutral-300 stroke-[1.5]"
      />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="central"
        className="text-[10px] font-mono font-bold fill-neutral-900 dark:fill-neutral-100"
      >
        Normal
      </text>
    </g>
  );
}

export function AcidBaseMapChart({
  sample,
  height = 480,
}: AcidBaseMapChartProps) {
  const clinicalLegend = (
    <div className="text-xs text-fd-muted-foreground space-y-3">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        <span className="font-semibold text-fd-foreground">Parámetros Clínicos:</span>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full border border-neutral-700 bg-fd-card inline-block shrink-0" />
          <span>Rango Normal (pH 7.35–7.45, HCO₃⁻ 22–26 mEq/L, PCO₂ 35–45 mmHg)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-400 dark:bg-neutral-600 inline-block shrink-0" />
          <span>Isobaras de PCO₂ (Henderson-Hasselbalch)</span>
        </div>
      </div>
      <p className="text-[11px] leading-relaxed text-fd-muted-foreground">
        Las bandas coloreadas delimitan los límites de compensación fisiológica esperados para los trastornos ácido-base simples. Cualquier gasometría cuyos valores caigan fuera de estos corredores corresponde a un trastorno mixto o una compensación incompleta.
      </p>
    </div>
  );

  return (
    <ScienceChart
      domainX={[7.0, 7.8]}
      domainY={[0, 60]}
      height={height}
      minWidth={560}
      margin={{ top: 28, right: 48, bottom: 48, left: 56 }}
      title="Mapa de Equilibrio Ácido-Base"
      subtitle="Nomograma de Henderson-Hasselbalch y corredores de compensación"
      badge="Gasometría"
      legend={clinicalLegend}
    >
      {/* Cuadrícula cartesiana médica */}
      <AcidBaseGrid />

      {/* Corredores de compensación diagnóstica */}
      {clinicalBands.map((band) => (
        <Curve
          key={band.id}
          data={band.polygon}
          x={(d: Point2D) => d.ph}
          y={(d: Point2D) => d.hco3}
          curve="linearClosed"
          className={`${band.colorClass} stroke-1 transition-opacity`}
        />
      ))}

      {/* Haz continuo de isobaras de PCO2 */}
      {standardIsobars.map((isobar) => (
        <Curve
          key={`isobar-${isobar.pco2}`}
          data={isobar.points}
          x={(d: Point2D) => d.ph}
          y={(d: Point2D) => d.hco3}
          curve="monotone"
          className={
            isobar.pco2 === 40
              ? 'stroke-neutral-900/80 dark:stroke-neutral-100/80 stroke-[1.75] fill-none'
              : 'stroke-neutral-500/50 dark:stroke-neutral-400/50 stroke-1 fill-none'
          }
        />
      ))}

      {/* Etiquetas sobre las bandas */}
      <BandLabels />

      {/* Etiquetas numéricas de las isobaras */}
      <IsobarLabels />

      {/* Elipse central de Normalidad */}
      <NormalRangeCircle />

      {/* Muestra de paciente */}
      {sample && (
        <Marker
          x={sample.ph}
          y={sample.hco3}
          label={sample.label || 'Paciente'}
          type="intersection"
          className="fill-rose-500 dark:fill-rose-400 stroke-neutral-900 dark:stroke-neutral-100"
        />
      )}

      {/* Ejes cartesianos */}
      <Axis
        orientation="bottom"
        ticks={[7.0, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8]}
        tickFormat={(val) => val.toFixed(2)}
        label="pH Arterial"
      />
      <Axis
        orientation="left"
        ticks={[0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60]}
        label="[HCO₃⁻] sérico (mEq/L)"
      />
    </ScienceChart>
  );
}