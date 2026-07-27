// components/science-charts/core/ScienceChart.tsx
'use client';

import type { ReactNode } from 'react';
import { createLinearScale, createTimeScale, createLogScale } from './scales';
import { ChartProvider } from './context';
import { ResponsiveSVG, ChartCanvas } from './ResponsiveSVG';
import type { ChartMargins } from '../hooks/useChartDimensions';
import type { AnyContinuousScale } from './context';

const DEFAULT_MARGINS: ChartMargins = {
  top: 28,
  right: 20,
  bottom: 60, 
  left: 60,
};

export type ScaleType = 'linear' | 'time' | 'log';

export interface ScienceChartProps {
  domainX: [number, number] | [Date, Date];
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
  children: ReactNode;
}

// Helper interno para instanciar la escala correcta de D3 según el tipo declarado
function buildScale(
  type: ScaleType, 
  domain: [number, number] | [Date, Date], 
  range: [number, number], 
  clamp?: boolean
): AnyContinuousScale {
  switch (type) {
    case 'time':
      return createTimeScale({ domain: domain as [Date, Date], range, clamp });
    case 'log':
      return createLogScale({ domain: domain as [number, number], range, clamp });
    case 'linear':
    default:
      return createLinearScale({ domain: domain as [number, number], range, clamp });
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
  children 
}: ScienceChartProps) {
  const margin: ChartMargins = { ...DEFAULT_MARGINS, ...customMargin };

  return (
    <div className="w-full font-sans my-6 select-none block">
      
      {/* CAPA EDITORIAL: Título y subtítulo centrados */}
      {(title || subtitle) && (
        <div className="text-center mb-4 px-4">
          {title && (
            <h4 className="text-sm font-mono font-semibold text-fd-foreground tracking-wide">
              {title}
            </h4>
          )}
          {subtitle && (
            <p className="text-xs font-mono text-fd-muted-foreground mt-1">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* CAPA VECTORIAL: Lienzo D3 con scroll responsivo */}
      <ResponsiveSVG height={height} minWidth={minWidth}>
        {({ width, height: measuredHeight }) => {
          const boundedWidth = Math.max(0, width - margin.left - margin.right);
          const boundedHeight = Math.max(0, measuredHeight - margin.top - margin.bottom);

          const xScale = buildScale(scaleTypeX, domainX, [0, boundedWidth], clampX);
          const yScale = buildScale(scaleTypeY, domainY, [boundedHeight, 0], clampY);

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
              <ChartCanvas margin={margin}>
                {children}
              </ChartCanvas>
            </ChartProvider>
          );
        }}
      </ResponsiveSVG>
    </div>
  );
}