// components/science-charts/core/Panel.tsx
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
  
  // GUARDA DE GEOMETRÍA: Prevención de dominios invertidos por error de tipeo o alturas nulas/negativas
  if (process.env.NODE_ENV !== 'production') {
    if (height <= 0) {
      console.warn(`[Panel] height inválido: ${height}px. Se esperaba un valor estrictamente positivo.`);
    }
    if (domainY[0] === domainY[1]) {
      console.warn(`[Panel] domainY plano [${domainY.join(', ')}]. Esto causará una división por cero en la escala.`);
    }
  }

  // Escala Y local, acotada exclusivamente a la altura de este panel
  const localYScale = createLinearScale({
    domain: domainY,
    range: [Math.max(0, height), 0],
  });

  // Heredamos las dimensiones globales del lienzo (svgWidth/svgHeight) y solo redefinimos el área útil local
  const panelContext = {
    ...parentContext,
    yScale: localYScale,
    boundedHeight: Math.max(0, height),
  };

  return (
    <g transform={`translate(0, ${top})`}>
      <ChartProvider value={panelContext}>
        {children}
      </ChartProvider>
    </g>
  );
}