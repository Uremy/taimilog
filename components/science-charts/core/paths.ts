import { line, area, curveBasis, curveBasisClosed, curveMonotoneX, curveLinear, curveCatmullRomClosed, type CurveFactory } from 'd3-shape';

export type CurveType = 'linear' | 'smooth' | 'monotone' | 'closed';

const CURVE_MAP: Record<CurveType, CurveFactory> = {
  linear: curveLinear,
  smooth: curveBasis,
  monotone: curveMonotoneX,
  closed: curveCatmullRomClosed,
};

export interface LinePathConfig<T> {
  data: T[];
  x: (d: T) => number;
  y: (d: T) => number;
  curve?: CurveType;
}

/**
 * Genera el string 'd' para dibujar una línea de datos continuos.
 */
export function createLinePath<T>({ data, x, y, curve = 'monotone' }: LinePathConfig<T>): string {
  const pathGenerator = line<T>()
    .x(x)
    .y(y)
    .curve(CURVE_MAP[curve]);

  return pathGenerator(data) || '';
}

export interface AreaPathConfig<T> {
  data: T[];
  x: (d: T) => number;
  y0: number | ((d: T) => number); // Línea base (ej. 0 o límite inferior)
  y1: (d: T) => number;            // Límite superior de la curva
  curve?: CurveType;
}

/**
 * Genera el string 'd' para áreas sombreadas bajo o entre curvas.
 * Vital para el sombreado del T-score y fases cardíacas.
 */
export function createAreaPath<T>({ data, x, y0, y1, curve = 'monotone' }: AreaPathConfig<T>): string {
  const pathGenerator = area<T>()
    .x(x)
    .y0(typeof y0 === 'number' ? () => y0 : y0)
    .y1(y1)
    .curve(CURVE_MAP[curve]);

  return pathGenerator(data) || '';
}