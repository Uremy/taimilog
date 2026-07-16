// components/science-charts/core/StackedPanels.tsx
'use client';

import React, { type ReactElement } from 'react';
import type { PanelProps } from './Panel';

export interface StackedPanelsProps {
  gap?: number; // Espacio en px entre cada panel apilado
  children: ReactElement<PanelProps>[] | ReactElement<PanelProps>;
}

/**
 * Automagically gestiona el offset Y (prop `top`) de múltiples componentes <Panel>.
 * Evita tener que calcular coordenadas matemáticas en la Capa 4 clínica.
 */
export function StackedPanels({ gap = 16, children }: StackedPanelsProps) {
  const panels = React.Children.toArray(children) as ReactElement<PanelProps>[];
  
  let currentTop = 0;

  return (
    <>
      {panels.map((child, index) => {
        const height = child.props.height || 100;
        const topOffset = currentTop;
        
        // Sumamos la altura del panel actual más el gap para el siguiente hermano
        currentTop += height + gap;

        // Clamos el elemento hijo inyectándole la coordenada top calculada
        return React.cloneElement(child, {
          key: index,
          top: topOffset,
        });
      })}
    </>
  );
}