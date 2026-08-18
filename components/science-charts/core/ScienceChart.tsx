// components/science-charts/core/ScienceChart.tsx
'use client';

import type { ReactNode } from 'react';
import { createLinearScale, createTimeScale, createLogScale, createBandScale } from './scales';
import { ChartProvider } from './context';
import { ResponsiveSVG, ChartCanvas } from './ResponsiveSVG';
import type { ChartMargins } from '../hooks/useChartDimensions';
import type { AnyChartScale, AnyContinuousScale } from './context';

const DEFAULT_MARGINS: ChartMargins = {
  top: 28,
  right: 20,
  bottom: 60,
  left: 60,
};

export type ScaleType = 'linear' | 'time' | 'log' | 'band';

export interface ScienceChartProps {
  domainX: [number, number] | [Date, Date] | string[];
  domainY?: [number, number];
  scaleTypeX?: ScaleType;
  scaleTypeY?: ScaleType;
  clampX?: boolean;
  clampY?: boolean;
  margin?: Partial<ChartMargins>;
  height?: number;
  minWidth?: number;
  title?: string;
  subtitle?: string;
  badge?: string;
  legend?: ReactNode;
  children: ReactNode;
}

function buildScale(
  type: ScaleType,
  domain: [number, number] | [Date, Date] | string[],
  range: [number, number],
  clamp?: boolean
): AnyChartScale {
  switch (type) {
    case 'band':
      return createBandScale({
        domain: domain as string[],
        range,
        padding: 0.2,
      });
    case 'time':
      return createTimeScale({
        domain: domain as [Date, Date],
        range,
        clamp,
      });
    case 'log':
      if (process.env.NODE_ENV !== 'production') {
        const numDomain = domain as [number, number];
        if (numDomain[0] <= 0 || numDomain[1] <= 0) {
          console.warn(
            `[ScienceChart] Escala logarítmica con límites no positivos [${numDomain.join(', ')}]. D3 requiere valores estrictamente > 0.`
          );
        }
      }
      return createLogScale({
        domain: domain as [number, number],
        range,
        clamp,
      });
    case 'linear':
    default:
      return createLinearScale({
        domain: domain as [number, number],
        range,
        clamp,
      });
  }
}

export function ScienceChart({
  domainX,
  domainY = [0, 100],
  scaleTypeX = 'linear',
  scaleTypeY = 'linear',
  clampX = true,
  clampY = true,
  margin: customMargin = {},
  height = 280,
  minWidth = 480,
  title,
  subtitle,
  badge = 'D3.js',
  legend,
  children,
}: ScienceChartProps) {
  const margin: ChartMargins = { ...DEFAULT_MARGINS, ...customMargin };

  return (
    <figure className="not-prose my-8 overflow-hidden rounded-[var(--radius)] border border-fd-border bg-fd-card">
      {(title || subtitle) && (
        <figcaption className="flex items-center justify-between border-b border-fd-border/60 bg-fd-accent/40 px-4 py-2">
          <div className="flex flex-col">
            {title && (
              <span className="font-mono text-[11px] uppercase tracking-widest text-fd-accent-foreground">
                {title}
              </span>
            )}
            {subtitle && (
              <span className="text-xs font-sans text-fd-muted-foreground mt-0.5">
                {subtitle}
              </span>
            )}
          </div>
          <span
            className="rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-fd-primary-foreground"
            style={{
              backgroundColor: `color-mix(in oklch, var(--color-fd-primary) 30%, transparent)`,
            }}
            aria-hidden
          >
            {badge}
          </span>
        </figcaption>
      )}

      <div className="w-full font-sans select-none block p-4">
        <ResponsiveSVG height={height} minWidth={minWidth}>
          {({ width, height: measuredHeight }) => {
            const boundedWidth = Math.max(0, width - margin.left - margin.right);
            const boundedHeight = Math.max(0, measuredHeight - margin.top - margin.bottom);

            const xScale = buildScale(scaleTypeX, domainX, [0, boundedWidth], clampX);
            const yScale = buildScale(scaleTypeY, domainY, [boundedHeight, 0], clampY) as AnyContinuousScale;

            const contextValue = {
              svgWidth: width,
              svgHeight: measuredHeight,
              boundedWidth,
              boundedHeight,
              margin,
              xScale,
              yScale,
            };

            return (
              <ChartProvider value={contextValue}>
                <ChartCanvas margin={margin}>{children}</ChartCanvas>
              </ChartProvider>
            );
          }}
        </ResponsiveSVG>
      </div>

      {legend && (
        <div className="border-t border-fd-border/60 bg-fd-card p-4 md:px-6">
          {legend}
        </div>
      )}
    </figure>
  );
}