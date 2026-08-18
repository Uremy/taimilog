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

  const validChildren = React.Children.toArray(children).filter(React.isValidElement);

  return (
    <g className="science-chart-stacked-panels">
      {validChildren.map((child, index) => {
        const childElement = child as ReactElement<PanelProps & { label?: string; id?: string }>;

        const height = childElement.props.height ?? 100;
        const topOffset = currentTop;

        currentTop += height + gap;

        const stableKey =
          childElement.key ??
          childElement.props.id ??
          childElement.props.label ??
          `panel-${index}`;

        return React.cloneElement(childElement, {
          key: stableKey,
          top: topOffset,
          index,
        });
      })}
    </g>
  );
}