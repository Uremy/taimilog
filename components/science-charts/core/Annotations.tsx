// components/science-charts/core/Annotations.tsx
'use client';

import { useChartContext } from './context';

export interface PhaseBandProps {
  start: number;
  end: number;
  label?: string;
  className?: string;
  labelY?: number;
}

export interface RangeBandProps {
  min: number;
  max: number;
  label?: string;
  className?: string;
  labelX?: number;
}

export interface EventLineProps {
  x: number;
  label?: string;
  className?: string;
  labelY?: number;
  textAnchor?: 'start' | 'middle' | 'end';
  dx?: number;
}

export interface HorizontalEventLineProps {
  y: number;
  label?: string;
  className?: string;
  labelX?: number;
  textAnchor?: 'start' | 'middle' | 'end';
  dy?: number;
}

export interface MarkerProps {
  x: number;
  y: number;
  label?: string;
  className?: string;
  type?: 'circle' | 'intersection' | 'censor';
}

export interface CurveEndLabelProps {
  x: number;
  y: number;
  label: string;
  angle?: number;
  className?: string;
  textAnchor?: 'start' | 'middle' | 'end';
  dx?: number;
  dy?: number;
}

export interface IntervalBracketProps {
  start: number;
  end: number;
  y: number;
  label?: string;
  tickLength?: number;
  className?: string;
  textOffset?: number;
}

// --- 1. PHASE BAND ---
export function PhaseBand({
  start,
  end,
  label,
  className = 'fill-neutral-500/10 dark:fill-neutral-400/10 transition-opacity hover:opacity-20',
  labelY = 16,
}: PhaseBandProps) {
  const { xScale, boundedHeight } = useChartContext();

  const px1 = (xScale as (val: any) => number | undefined)(start) ?? 0;
  const px2 = (xScale as (val: any) => number | undefined)(end) ?? 0;

  const left = Math.min(px1, px2);
  const width = Math.abs(px2 - px1);

  return (
    <g className="group">
      <rect x={left} y={0} width={width} height={boundedHeight} className={className} />
      {label && (
        <text
          x={left + width / 2}
          y={labelY}
          textAnchor="middle"
          className="text-[10px] font-mono fill-neutral-600 dark:fill-neutral-300 uppercase tracking-wider select-none font-semibold opacity-90 group-hover:opacity-100"
        >
          {label}
        </text>
      )}
    </g>
  );
}

// --- 2. RANGE BAND ---
export function RangeBand({
  min,
  max,
  label,
  className = 'fill-emerald-500/10 dark:fill-emerald-400/10 transition-opacity hover:opacity-20',
  labelX = 8,
}: RangeBandProps) {
  const { yScale, boundedWidth } = useChartContext();

  const py1 = (yScale as (val: any) => number | undefined)(min) ?? 0;
  const py2 = (yScale as (val: any) => number | undefined)(max) ?? 0;

  const top = Math.min(py1, py2);
  const height = Math.abs(py2 - py1);

  return (
    <g className="group">
      <rect x={0} y={top} width={boundedWidth} height={height} className={className} />
      {label && (
        <text
          x={labelX}
          y={top + 14}
          textAnchor="start"
          className="text-[10px] font-mono fill-emerald-700 dark:fill-emerald-300 uppercase tracking-wider select-none font-semibold opacity-90 group-hover:opacity-100"
        >
          {label}
        </text>
      )}
    </g>
  );
}

// --- 3. EVENT LINE ---
export function EventLine({
  x,
  label,
  className = 'stroke-rose-500/60 dark:stroke-rose-400/60 stroke-dasharray-[4,4] stroke-1',
  labelY = 24,
  textAnchor = 'start',
  dx = 4,
}: EventLineProps) {
  const { xScale, boundedHeight } = useChartContext();
  const xPos = (xScale as (val: any) => number | undefined)(x) ?? 0;

  return (
    <g className="group">
      <line x1={xPos} y1={0} x2={xPos} y2={boundedHeight} className={className} />
      {label && (
        <text
          x={xPos + dx}
          y={labelY}
          textAnchor={textAnchor}
          className="text-[11px] font-sans fill-rose-600 dark:fill-rose-400 font-medium select-none"
        >
          {label}
        </text>
      )}
    </g>
  );
}

// --- 4. HORIZONTAL EVENT LINE ---
export function HorizontalEventLine({
  y,
  label,
  className = 'stroke-rose-500/60 dark:stroke-rose-400/60 stroke-dasharray-[4,4] stroke-1',
  labelX = 8,
  textAnchor = 'start',
  dy = -6,
}: HorizontalEventLineProps) {
  const { yScale, boundedWidth } = useChartContext();
  const yPos = (yScale as (val: any) => number | undefined)(y) ?? 0;

  return (
    <g className="group">
      <line x1={0} y1={yPos} x2={boundedWidth} y2={yPos} className={className} />
      {label && (
        <text
          x={labelX}
          y={yPos + dy}
          textAnchor={textAnchor}
          className="text-[11px] font-sans fill-rose-600 dark:fill-rose-400 font-medium select-none"
        >
          {label}
        </text>
      )}
    </g>
  );
}

// --- 5. MARKER ---
export function Marker({
  x,
  y,
  label,
  className = 'fill-rose-500 dark:fill-rose-400 stroke-neutral-900 dark:stroke-neutral-100',
  type = 'circle',
}: MarkerProps) {
  const { xScale, yScale } = useChartContext();

  const xPos = (xScale as (val: any) => number | undefined)(x) ?? 0;
  const yPos = (yScale as (val: any) => number | undefined)(y) ?? 0;

  return (
    <g className="group" transform={`translate(${xPos}, ${yPos})`}>
      {type === 'intersection' && (
        <g className="transition-transform group-hover:scale-125">
          <polygon points="-5,0 0,-5 5,0 0,5" className={className} />
          <circle r={1.5} className="fill-white dark:fill-neutral-900 pointer-events-none" />
        </g>
      )}

      {type === 'circle' && (
        <>
          <circle r={5} className={`${className} transition-transform group-hover:scale-125`} />
          <circle r={2} className="fill-white dark:fill-neutral-900 pointer-events-none" />
        </>
      )}

      {type === 'censor' && (
        <line
          x1={0}
          y1={-5}
          x2={0}
          y2={5}
          className="stroke-neutral-700 dark:stroke-neutral-300 stroke-[1.5]"
        />
      )}

      {label && (
        <text
          x={0}
          y={-10}
          textAnchor="middle"
          className="text-xs font-mono fill-neutral-800 dark:fill-neutral-200 font-semibold select-none drop-shadow-sm"
        >
          {label}
        </text>
      )}
    </g>
  );
}

// --- 6. CURVE END LABEL ---
export function CurveEndLabel({
  x,
  y,
  label,
  angle = 0,
  className = 'text-[11px] font-sans fill-neutral-600 dark:fill-neutral-400 font-medium select-none',
  textAnchor = 'start',
  dx = 0,
  dy = 0,
}: CurveEndLabelProps) {
  const { xScale, yScale } = useChartContext();

  const xPos = (xScale as (val: any) => number | undefined)(x) ?? 0;
  const yPos = (yScale as (val: any) => number | undefined)(y) ?? 0;

  return (
    <g
      className="group transition-transform"
      transform={`translate(${xPos}, ${yPos}) rotate(${angle})`}
    >
      <text
        x={0}
        y={0}
        dx={dx}
        dy={dy}
        textAnchor={textAnchor}
        dominantBaseline="middle"
        className={className}
      >
        {label}
      </text>
    </g>
  );
}

// --- 7. INTERVAL BRACKET ---
export function IntervalBracket({
  start,
  end,
  y,
  label,
  tickLength = 6,
  className = 'stroke-neutral-700 dark:stroke-neutral-300 stroke-1',
  textOffset = -8,
}: IntervalBracketProps) {
  const { xScale, yScale } = useChartContext();

  const px1 = (xScale as (val: any) => number | undefined)(start) ?? 0;
  const px2 = (xScale as (val: any) => number | undefined)(end) ?? 0;
  const py = (yScale as (val: any) => number | undefined)(y) ?? 0;

  const left = Math.min(px1, px2);
  const right = Math.max(px1, px2);
  const midX = (left + right) / 2;

  const bracketPath = `
    M ${left} ${py + tickLength}
    L ${left} ${py}
    L ${right} ${py}
    L ${right} ${py + tickLength}
  `;

  return (
    <g className="group">
      <path d={bracketPath} fill="none" className={className} />
      {label && (
        <text
          x={midX}
          y={py + textOffset}
          textAnchor="middle"
          className="text-[10px] font-mono fill-neutral-700 dark:fill-neutral-300 font-semibold select-none"
        >
          {label}
        </text>
      )}
    </g>
  );
}