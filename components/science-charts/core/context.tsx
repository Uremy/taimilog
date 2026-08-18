// components/science-charts/core/context.tsx
'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { ScaleLinear, ScaleTime, ScaleLogarithmic, ScaleBand } from 'd3-scale';
import type { ChartMargins } from '../hooks/useChartDimensions';

// Escalas continuas matemáticas estándar
export type AnyContinuousScale =
  | ScaleLinear<number, number>
  | ScaleTime<number, number>
  | ScaleLogarithmic<number, number>;

// Unión completa soportada en el eje horizontal
export type AnyXScale = AnyContinuousScale | ScaleBand<string>;

export interface ChartContextValue {
  xScale: AnyXScale;
  yScale: AnyContinuousScale;
  svgWidth: number;      // Ancho total medido del contenedor/SVG
  svgHeight: number;     // Alto total medido del contenedor/SVG
  boundedWidth: number;  // Ancho útil de dibujo (restando márgenes)
  boundedHeight: number; // Alto útil de dibujo (restando márgenes o altura del panel actual)
  margin: ChartMargins;
  panelIndex?: number;   // Índice contextual en layouts apilados (Wiggers, EEG, multicanal)
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