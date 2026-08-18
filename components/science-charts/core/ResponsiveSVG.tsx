// components/science-charts/core/ResponsiveSVG.tsx
'use client';

import type { ReactNode } from 'react';
import { ParentSize } from '@visx/responsive';
import type { ChartMargins } from '../hooks/useChartDimensions';

export interface ResponsiveSVGProps {
  height: number;
  minWidth?: number;
  debounceTime?: number;
  children: (dimensions: { width: number; height: number }) => ReactNode;
  className?: string;
}

export function ResponsiveSVG({
  height,
  minWidth = 480,
  debounceTime = 50,
  children,
  className = '',
}: ResponsiveSVGProps) {
  return (
    <div className={`w-full overflow-x-auto pb-2 ${className}`}>
      <div
        style={{ width: '100%', minWidth, height }}
        className="relative select-none"
      >
        <ParentSize debounceTime={debounceTime}>
          {({ width }) => {
            if (width === 0) {
              return (
                <div
                  style={{ width: '100%', height }}
                  className="animate-pulse bg-fd-muted/20 rounded"
                  aria-hidden
                />
              );
            }

            return (
              <svg
                width={width}
                height={height}
                role="img"
                className="overflow-visible block"
              >
                {children({ width, height })}
              </svg>
            );
          }}
        </ParentSize>
      </div>
    </div>
  );
}

export function ChartCanvas({
  margin,
  children,
}: {
  margin: ChartMargins;
  children: ReactNode;
}) {
  return <g transform={`translate(${margin.left}, ${margin.top})`}>{children}</g>;
}