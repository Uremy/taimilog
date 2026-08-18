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

  const xDomain = xScale.domain().map(Number);
  const yDomain = yScale.domain().map(Number);

  const zeroInXDomain = Math.min(...xDomain) <= 0 && Math.max(...xDomain) >= 0;
  const zeroInYDomain = Math.min(...yDomain) <= 0 && Math.max(...yDomain) >= 0;

  const zeroYPos = zeroInYDomain ? (yScale(0) ?? boundedHeight) : boundedHeight;
  const zeroXPos = zeroInXDomain ? (xScale(0) ?? 0) : 0;

  const defaultTickFormat = (val: number) => {
    if (atZero && Number(val) === 0) {
      return '';
    }
    return String(val);
  };

  const commonProps = {
    stroke: hideLine ? 'transparent' : chartTheme.axis,
    tickStroke: hideTicks ? 'transparent' : chartTheme.axis,
    tickLength: 5,
    tickValues: ticks,
    numTicks,
    label,
    tickFormat: (val: any, idx: number) =>
      tickFormat ? tickFormat(Number(val), idx) : defaultTickFormat(Number(val)),
    tickLabelProps: () => ({
      fill: 'currentColor',
      fontSize: 10,
      fontFamily: 'var(--font-mono, monospace)',
      textAnchor:
        orientation === 'left'
          ? ('end' as const)
          : orientation === 'right'
            ? ('start' as const)
            : ('middle' as const),
      dy: orientation === 'bottom' ? '0.25em' : orientation === 'top' ? '-0.25em' : '0.33em',
      dx: orientation === 'left' ? '-0.3em' : orientation === 'right' ? '0.3em' : '0em',
      className: 'text-neutral-500 dark:text-neutral-400 font-medium select-none',
    }),
    labelProps: {
      fill: 'currentColor',
      fontSize: 11,
      fontFamily: 'var(--font-sans, sans-serif)',
      fontWeight: 600,
      textAnchor: 'middle' as const,
      className: 'text-neutral-800 dark:text-neutral-200 select-none tracking-tight',
    },
  };

  switch (orientation) {
    case 'bottom':
      return (
        <AxisBottom
          scale={xScale as any}
          top={atZero ? zeroYPos : boundedHeight}
          labelOffset={atZero ? 14 : 26}
          {...commonProps}
          labelProps={{
            ...commonProps.labelProps,
            ...(atZero && { textAnchor: 'end' as const, x: boundedWidth, y: -8 }),
          }}
        />
      );
    case 'top':
      return <AxisTop scale={xScale as any} top={0} labelOffset={24} {...commonProps} />;
    case 'left':
      return (
        <AxisLeft
          scale={yScale as any}
          left={atZero ? zeroXPos : 0}
          labelOffset={atZero ? 14 : 38}
          {...commonProps}
          labelProps={{
            ...commonProps.labelProps,
            ...(atZero
              ? { textAnchor: 'start' as const, y: 10, x: 8 }
              : { x: -boundedHeight / 2 }),
          }}
        />
      );
    case 'right':
      return (
        <AxisRight
          scale={yScale as any}
          left={boundedWidth}
          labelOffset={38}
          {...commonProps}
          labelProps={{
            ...commonProps.labelProps,
            x: -boundedHeight / 2,
          }}
        />
      );
  }
}