import { createContext, useContext, type ReactNode } from 'react';
import type { ChartMargins } from '../hooks/useChartDimensions';

export interface ChartContextValue {
  xScale: (value: any) => number;
  yScale: (value: any) => number;
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