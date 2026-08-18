// components/science-charts/core/Panel.tsx
'use client';

import type { ReactNode } from 'react';
import { useChartContext, ChartProvider, type AnyContinuousScale } from './context';
import { createLinearScale, createLogScale } from './scales';

export type PanelScaleType = 'linear' | 'log';

export interface PanelProps {
  domainY: [number, number];
  height: number;
  top?: number; // Inyectado automáticamente por StackedPanels o definido manualmente
  index?: number; // Inyectado automáticamente por StackedPanels
  scaleTypeY?: PanelScaleType;
  className?: string;
  children: ReactNode;
}

export function Panel({
  domainY,
  height,
  top = 0,
  index,
  scaleTypeY = 'linear',
  className,
  children,
}: PanelProps) {
  const parentContext = useChartContext();

  const boundedHeight = Math.max(0, height);

  // GUARDA CIENTÍFICA: Detección de dominios inválidos y alturas impropias
  if (process.env.NODE_ENV !== 'production') {
    if (height <= 0) {
      console.warn(
        `[Panel] height inválido: ${height}px. Se esperaba un valor estrictamente positivo.`
      );
    }
    if (domainY[0] === domainY[1]) {
      console.warn(
        `[Panel] domainY plano [${domainY.join(', ')}]. Esto causará una división por cero en la escala vertical.`
      );
    }
    if (scaleTypeY === 'log' && (domainY[0] <= 0 || domainY[1] <= 0)) {
      console.warn(
        `[Panel] domainY logarítmico con valores <= 0 [${domainY.join(', ')}]. D3 requiere valores estrictamente positivos.`
      );
    }
  }

  // Escala Y local acotada a la altura neta de este panel
  const localYScale: AnyContinuousScale =
    scaleTypeY === 'log'
      ? createLogScale({
          domain: domainY,
          range: [boundedHeight, 0],
        })
      : createLinearScale({
          domain: domainY,
          range: [boundedHeight, 0],
        });

  // Conservamos el contexto horizontal global y acotamos verticalmente
  const panelContext = {
    ...parentContext,
    yScale: localYScale,
    boundedHeight,
    panelIndex: index ?? parentContext.panelIndex,
  };

  return (
    <g transform={`translate(0, ${top})`} className={className}>
      <ChartProvider value={panelContext}>{children}</ChartProvider>
    </g>
  );
}