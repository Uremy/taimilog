// components/science-charts/core/paths.ts
import { 
  line, 
  area, 
  curveBasis, 
  curveMonotoneX, 
  curveLinear, 
  curveCatmullRomClosed, 
  type CurveFactory 
} from 'd3-shape';

export type CurveType = 'linear' | 'smooth' | 'monotone' | 'closed';

/**
 * MAPA DE INTERPOLACIÓN CLÍNICA:
 * - linear: Conexión punto a punto (ideal para calibraciones o fases discretas).
 * - smooth (Basis): Suavizado general (no pasa exactamente por los puntos, usar solo para tendencias).
 * - monotone (MonotoneX): Suavizado sin oscilaciones falsas (requiere datos estrictamente ordenados en X).
 * - closed (Catmull-Rom): Cierre suave que GUARANIZA pasar por cada punto medido (vital en bucles flujo-volumen).
 */
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
  y0: number | ((d: T) => number); // Línea base (ej. 0 o límite inferior de banda clínica)
  y1: (d: T) => number;            // Límite superior de la curva
  curve?: CurveType;
}

export function createAreaPath<T>({ data, x, y0, y1, curve = 'monotone' }: AreaPathConfig<T>): string {
  const pathGenerator = area<T>()
    .x(x)
    .y0(typeof y0 === 'number' ? () => y0 : y0)
    .y1(y1)
    .curve(CURVE_MAP[curve]);

  return pathGenerator(data) || '';
}