// components/science-charts/core/Axis.tsx
'use client';

import { AxisBottom, AxisLeft, AxisRight, AxisTop } from '@visx/axis';
import { useChartContext } from './context';
import { chartTheme } from '../theme';

export interface AxisProps {
  orientation?: 'bottom' | 'top' | 'left' | 'right';
  ticks?: number[];
  numTicks?: number;
  label?: string;
  tickFormat?: (value: number, index: number) => string;
  hideLine?: boolean;
  hideTicks?: boolean;
  atZero?: boolean;
}

export function Axis({
  orientation = 'bottom',
  ticks,
  numTicks = 5,
  label,
  tickFormat,
  hideLine = false,
  hideTicks = false,
  atZero = false,
}: AxisProps) {
  const { xScale, yScale, boundedWidth, boundedHeight } = useChartContext();

  const domain = yScale.domain().map(Number);
  const zeroInDomain = Math.min(...domain) <= 0 && Math.max(...domain) >= 0;
  
  if (atZero && !zeroInDomain && process.env.NODE_ENV !== 'production') {
    console.warn(
      `[Axis] atZero=true pero 0 no está en el dominio Y [${domain.join(', ')}]. El eje se anclará al borde inferior para evitar una falsa lectura geométrica.`
    );
  }

  const zeroYPosition = zeroInDomain ? yScale(0) : boundedHeight;

  const defaultTickFormat = (val: number) => {
    if (orientation === 'bottom' && atZero && Number(val) === 0) {
      return '';
    }
    return String(val);
  };

  const commonProps = {
    stroke: hideLine ? 'transparent' : chartTheme.axis,
    tickStroke: hideTicks ? 'transparent' : chartTheme.axis,
    tickLength: 6,
    tickValues: ticks,
    numTicks,
    label,
    tickFormat: (val: any, idx: number) => (tickFormat ? tickFormat(Number(val), idx) : defaultTickFormat(Number(val))),
    tickLabelProps: () => ({
      fill: 'currentColor',
      fontSize: 11,
      fontFamily: 'var(--font-mono, monospace)',
      textAnchor: orientation === 'left' ? ('end' as const) : orientation === 'right' ? ('start' as const) : ('middle' as const),
      // Inyectamos el valor negativo para tirar del texto hacia arriba en el eje superior
      dy: orientation === 'bottom' ? '0.25em' : orientation === 'top' ? '-0.25em' : '0.33em',
      dx: orientation === 'left' ? '-0.25em' : orientation === 'right' ? '0.25em' : '0em',
      className: 'text-neutral-600 dark:text-neutral-400',
    }),
    labelProps: {
      fill: 'currentColor',
      fontSize: 12,
      fontFamily: 'var(--font-sans, sans-serif)',
      fontWeight: 500,
      textAnchor: 'middle' as const,
      className: 'text-neutral-800 dark:text-neutral-200',
    },
  };

  switch (orientation) {
    case 'bottom':
      return (
        <AxisBottom
          scale={xScale as any}
          top={atZero ? zeroYPosition : boundedHeight}
          labelOffset={atZero ? 12 : 28}
          {...commonProps}
          labelProps={{
            ...commonProps.labelProps,
            ...(atZero && { textAnchor: 'end' as const, x: boundedWidth, y: -10 }),
          }}
        />
      );
    case 'top':
      // Elevamos el labelOffset a 28 para simetría con el eje inferior
      return <AxisTop scale={xScale as any} top={0} labelOffset={28} {...commonProps} />;
    case 'left':
      return (
        <AxisLeft
          scale={yScale as any}
          left={0}
          labelOffset={42}
          {...commonProps}
          labelProps={{
            ...commonProps.labelProps,
            x: -boundedHeight / 2,
          }}
        />
      );
    case 'right':
      return (
        <AxisRight
          scale={yScale as any}
          left={boundedWidth}
          labelOffset={42}
          {...commonProps}
          labelProps={{
            ...commonProps.labelProps,
            x: -boundedHeight / 2,
          }}
        />
      );
  }
}