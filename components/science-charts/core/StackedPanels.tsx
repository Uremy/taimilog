// components/science-charts/core/StackedPanels.tsx
'use client';

import React, { type ReactElement, type ReactNode } from 'react';
import type { PanelProps } from './Panel';

export interface StackedPanelsProps {
  gap?: number;
  children: ReactNode;
}

export function StackedPanels({ gap = 24, children }: StackedPanelsProps) {
  let currentTop = 0;

  // Filtramos solo los elementos válidos para evitar errores tipográficos en React
  const validChildren = React.Children.toArray(children).filter(React.isValidElement);

  return (
    <>
      {validChildren.map((child, index) => {
        const childElement = child as ReactElement<PanelProps>;
        const height = childElement.props.height || 100;
        const topOffset = currentTop;
        
        // Sumamos la altura de este panel más el espacio (gap) para el siguiente
        currentTop += height + gap;

        return React.cloneElement(childElement, {
          key: index,
          top: topOffset,
        });
      })}
    </>
  );
}