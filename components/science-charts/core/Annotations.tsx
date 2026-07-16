import { useChartContext } from './context';

export interface MarkerProps {
  x: number;
  y: number;
  label?: string;
  className?: string;
}

/**
 * Marca un punto clínico específico (ej. Pico de flujo espiratorio o umbral de despolarización)
 */
export function Marker({ x, y, label, className = 'fill-red-500' }: MarkerProps) {
  const { xScale, yScale } = useChartContext();
  const cx = xScale(x);
  const cy = yScale(y);

  return (
    <g transform={`translate(${cx}, ${cy})`} className="group cursor-pointer">
      <circle r={4} className={`transition-transform group-hover:scale-125 ${className}`} />
      <circle r={8} className="fill-current opacity-20 animate-pulse" />
      {label && (
        <text
          y={-12}
          className="text-[11px] font-mono fill-neutral-700 dark:fill-neutral-300 text-anchor-middle opacity-90 group-hover:opacity-100 group-hover:font-bold transition-opacity"
          textAnchor="middle"
        >
          {label}
        </text>
      )}
    </g>
  );
}

export interface EventLineProps {
  x: number;
  label?: string;
  className?: string;
}

/**
 * Línea vertical que atraviesa todo el gráfico. Ideal para S1, S2 en Wiggers.
 */
export function EventLine({ x, label, className = 'stroke-neutral-400 dark:stroke-neutral-500 stroke-dashed stroke-1' }: EventLineProps) {
  const { xScale, boundedHeight } = useChartContext();
  const cx = xScale(x);

  return (
    <g transform={`translate(${cx}, 0)`}>
      <line x1={0} y1={0} x2={0} y2={boundedHeight} strokeDasharray="4 4" className={className} />
      {label && (
        <text
          y={-6}
          x={2}
          className="text-[10px] font-mono fill-neutral-500 dark:fill-neutral-400 select-none"
        >
          {label}
        </text>
      )}
    </g>
  );
}

export interface PhaseBandProps {
  start: number;
  end: number;
  label?: string;
  className?: string;
}

/**
 * Sombreado de fondo para delimitar fases temporales (Sístole, Diástole, Fases del Potencial de Acción).
 */
// En components/science-charts/core/Annotations.tsx

export function PhaseBand({ 
  start, 
  end, 
  label, 
  // Usamos fill-neutral-500 (un gris neutro universal) y le aplicamos opacity-10 por separado.
  // Esto es 100% a prueba de fallos en cualquier tema o versión de Tailwind.
  className = 'fill-neutral-500 dark:fill-neutral-400 opacity-10 transition-opacity hover:opacity-20' 
}: PhaseBandProps) {
  const { xScale, boundedHeight } = useChartContext();
  const x1 = xScale(start);
  const width = Math.max(0, xScale(end) - x1);

  return (
    <g className="group">
      <rect x={x1} y={0} width={width} height={boundedHeight} className={className} />
      {label && (
        <text
          x={x1 + width / 2}
          y={16}
          textAnchor="middle"
          className="text-[10px] font-mono fill-neutral-600 dark:fill-neutral-300 uppercase tracking-wider select-none font-semibold opacity-90 group-hover:opacity-100"
        >
          {label}
        </text>
      )}
    </g>
  );
}