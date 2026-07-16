// components/science-charts/core/ResponsiveSVG.tsx
'use client';

import type { ReactNode } from 'react';
import { ParentSize } from '@visx/responsive';
import type { ChartMargins } from '../hooks/useChartDimensions';

export interface ResponsiveSVGProps {
  height: number;
  minWidth?: number; // Nuevo prop para fijar el límite de compresión
  children: (dimensions: { width: number; height: number }) => ReactNode;
  className?: string;
}

export function ResponsiveSVG({ height, minWidth = 480, children, className = '' }: ResponsiveSVGProps) {
  return (
    /* 1. Contenedor exterior: Permite el scroll horizontal con overflow-x-auto nativo de Tailwind */
    <div className={`w-full overflow-x-auto pb-2 ${className}`}>
      
      <div style={{ width: '100%', minWidth, height }} className="relative select-none">
        <ParentSize>
          {({ width }) => {
            if (width === 0) return null;
            
            return (
              <svg width={width} height={height} className="overflow-visible block">
                {children({ width, height })}
              </svg>
            );
          }}
        </ParentSize>
      </div>
    </div>
  );
}

export function ChartCanvas({ margin, children }: { margin: ChartMargins; children: ReactNode }) {
  return <g transform={`translate(${margin.left}, ${margin.top})`}>{children}</g>;
}