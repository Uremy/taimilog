// components/science-charts/core/context.tsx
'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { ScaleLinear, ScaleTime, ScaleLogarithmic, ScaleBand } from 'd3-scale';
import type { ChartMargins } from '../hooks/useChartDimensions';

export type AnyContinuousScale =
  | ScaleLinear<number, number>
  | ScaleTime<number, number>
  | ScaleLogarithmic<number, number>;

// Definimos la escala invocable permitiendo cualquier tipo de entrada de dominio
export type AnyChartScale = (AnyContinuousScale | ScaleBand<string>) & {
  (value: any): number | undefined;
  domain(): any[];
  range(): any[];
};

export interface ChartContextValue {
  xScale: AnyChartScale;
  yScale: AnyContinuousScale;
  svgWidth: number;
  svgHeight: number;
  boundedWidth: number;
  boundedHeight: number;
  margin: ChartMargins;
  panelIndex?: number;
}

const ChartContext = createContext<ChartContextValue | null>(null);

export function ChartProvider({
  value,
  children,
}: {
  value: ChartContextValue;
  children: ReactNode;
}) {
  return <ChartContext.Provider value={value}>{children}</ChartContext.Provider>;
}

export function useChartContext(): ChartContextValue {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error(
      'Los componentes de gráfica deben usarse dentro de un <ScienceChart> o un proveedor de contexto <ChartProvider>.'
    );
  }
  return context;
}