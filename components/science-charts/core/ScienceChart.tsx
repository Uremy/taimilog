// components/science-charts/core/ScienceChart.tsx
'use client';

import type { ReactNode } from 'react';
import { createLinearScale } from './scales';
import { ChartProvider } from './context';
import { ResponsiveSVG, ChartCanvas } from './ResponsiveSVG';
import type { ChartMargins } from '../hooks/useChartDimensions';

const DEFAULT_MARGINS: ChartMargins = {
  top: 28,
  right: 20,
  bottom: 60, 
  left: 60,
};

export interface ScienceChartProps {
  domainX: [number, number];
  domainY?: [number, number];
  margin?: Partial<ChartMargins>;
  height?: number;
  minWidth?: number;
  title?: string;    // Nueva propiedad para el título de la figura
  subtitle?: string; // Nueva propiedad para descripción o leyenda clínica
  children: ReactNode;
}

export function ScienceChart({ 
  domainX, 
  domainY = [0, 100], 
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
      
      {/* CAPA EDITORIAL: Título y subtítulo centrados por defecto */}
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

          const xScale = createLinearScale({ domain: domainX, range: [0, boundedWidth] });
          const yScale = createLinearScale({ domain: domainY, range: [boundedHeight, 0] });

          const contextValue = {
            width,
            height: measuredHeight,
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