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
  tickFormat?: (value: any, index: number) => string;
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

  const zeroYPosition = yScale(0);

  const defaultTickFormat = (val: any) => {
    if (orientation === 'bottom' && atZero && Number(val) === 0) {
      return '';
    }
    return val;
  };

  // 1. BASE TIPOGRÁFICA PURA: Cero lógica condicional aquí, solo diseño coherente.
  const commonProps = {
    stroke: hideLine ? 'transparent' : chartTheme.axis,
    tickStroke: hideTicks ? 'transparent' : chartTheme.axis,
    tickLength: 6,
    tickValues: ticks,
    numTicks,
    label,
    tickFormat: tickFormat || defaultTickFormat,
    tickLabelProps: () => ({
      fill: 'currentColor',
      fontSize: 11,
      fontFamily: 'var(--font-mono, monospace)',
      textAnchor: orientation === 'left' ? ('end' as const) : orientation === 'right' ? ('start' as const) : ('middle' as const),
      dy: orientation === 'bottom' ? '0.25em' : '0.33em',
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

  // 2. ESPECIALIZACIÓN POR CASO: Extendemos labelProps solo donde se necesita.
  switch (orientation) {
    case 'bottom':
      return (
        <AxisBottom
          scale={xScale}
          top={atZero ? zeroYPosition : boundedHeight}
          labelOffset={atZero ? 12 : 28}
          {...commonProps}
          labelProps={{
            ...commonProps.labelProps,
            // Si está en cero, alineamos al extremo derecho y flotamos 10px arriba de la línea
            ...(atZero && { textAnchor: 'end' as const, x: boundedWidth, y: -10 }),
          }}
        />
      );
    case 'top':
      return <AxisTop scale={xScale} top={0} labelOffset={20} {...commonProps} />;
    case 'left':
      return (
        <AxisLeft
          scale={yScale}
          left={0}
          labelOffset={42}
          {...commonProps}
          labelProps={{
            ...commonProps.labelProps,
            // Tu ajuste de centro vertical para texto rotado -90°
            x: -boundedHeight / 2,
          }}
        />
      );
    case 'right':
      return (
        <AxisRight
          scale={yScale}
          left={boundedWidth}
          labelOffset={42}
          {...commonProps}
          labelProps={{
            ...commonProps.labelProps,
            // Tu ajuste de centro vertical para texto rotado -90°
            x: -boundedHeight / 2,
          }}
        />
      );
  }
}