import type { ReactNode } from 'react';
import { useChartContext, ChartProvider } from './context';
import { createLinearScale } from './scales';

export interface PanelProps {
  domainY: [number, number];
  height: number;
  top: number;
  children: ReactNode;
}

export function Panel({ domainY, height, top, children }: PanelProps) {
  const parentContext = useChartContext();

  // Creamos una escala Y local que mapea el dominio del panel a su propia altura en px
  const localYScale = createLinearScale({
    domain: domainY,
    range: [height, 0], // Invertido para coordenadas SVG
  });

  // Sobrescribimos el contexto para que los componentes hijos usen la escala Y y altura de este panel
  const panelContextValue = {
    ...parentContext,
    yScale: localYScale,
    boundedHeight: height,
  };

  return (
    <g transform={`translate(0, ${top})`}>
      <ChartProvider value={panelContextValue}>
        {children}
      </ChartProvider>
    </g>
  );
}