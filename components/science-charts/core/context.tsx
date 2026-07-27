// components/science-charts/core/context.tsx
import { createContext, useContext, type ReactNode } from 'react';
import type { ScaleLinear, ScaleTime, ScaleLogarithmic } from 'd3-scale';
import type { ChartMargins } from '../hooks/useChartDimensions';

export type AnyContinuousScale =
  | ScaleLinear<number, number>
  | ScaleTime<number, number>
  | ScaleLogarithmic<number, number>;

export interface ChartContextValue {
  xScale: AnyContinuousScale;
  yScale: AnyContinuousScale;
  svgWidth: number;      // Ancho total medido del contenedor/SVG
  svgHeight: number;     // Alto total medido del contenedor/SVG
  boundedWidth: number;  // Ancho útil de dibujo (restando márgenes)
  boundedHeight: number; // Alto útil de dibujo (restando márgenes o altura de panel)
  margin: ChartMargins;
}

const ChartContext = createContext<ChartContextValue | null>(null);

export function ChartProvider({ value, children }: { value: ChartContextValue; children: ReactNode }) {
  return <ChartContext.Provider value={value}>{children}</ChartContext.Provider>;
}

export function useChartContext(): ChartContextValue {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error('Los componentes de gráfica deben usarse dentro de un <ScienceChart> o proveedor de contexto.');
  }
  return context;
}