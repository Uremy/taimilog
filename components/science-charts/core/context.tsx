// components/science-charts/core/context.tsx
import { createContext, useContext, type ReactNode } from 'react';
import type { AxisScale } from '@visx/axis'; // 1. IMPORTAMOS EL TIPO OFICIAL DE VISX
import type { ChartMargins } from '../hooks/useChartDimensions';

export interface ChartContextValue {
  // 2. REEMPLAZAMOS EL (value: any) => number POR AxisScale<number>
  // Esto le dice a TypeScript que la escala incluye .domain(), .range(), .ticks(), etc.
  xScale: AxisScale<number>;
  yScale: AxisScale<number>;
  width: number;
  height: number;
  boundedWidth: number;
  boundedHeight: number;
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