'use client';

import type { ReactNode } from 'react';
import { useChartContext, ChartProvider } from './context';
import { createLinearScale } from './scales';

export interface PanelProps {
  domainY: [number, number];
  height: number;
  top?: number; // Inyectado automáticamente por StackedPanels
  children: ReactNode;
}

export function Panel({ domainY, height, top = 0, children }: PanelProps) {
  const parentContext = useChartContext();
  
  // Creamos una escala Y local para este panel, usando SOLO la altura de este panel
  const localYScale = createLinearScale({
    domain: domainY,
    range: [height, 0], // El piso del panel es height, el techo es 0
  });

  // El nuevo contexto hereda todo del padre (xScale, ancho, etc.), pero sobrescribe yScale y altura
  const panelContext = {
    ...parentContext,
    yScale: localYScale,
    boundedHeight: height,
    height: height,
  };

  return (
    <g transform={`translate(0, ${top})`}>
      <ChartProvider value={panelContext}>
        {children}
      </ChartProvider>
    </g>
  );
}