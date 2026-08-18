// components/science-charts/core/paths.ts
import {
  line,
  area,
  curveBasis,
  curveMonotoneX,
  curveMonotoneY,
  curveLinear,
  curveLinearClosed,
  curveCatmullRom,
  curveCatmullRomClosed,
  curveNatural,
  curveStepAfter,
  curveStepBefore,
  type CurveFactory,
  type CurveFactoryLineOnly,
} from 'd3-shape';

export type CurveType =
  | 'linear'
  | 'linearClosed'
  | 'smooth'
  | 'monotone'
  | 'monotoneX'
  | 'monotoneY'
  | 'natural'
  | 'catmullRom'
  | 'closed'
  | 'stepAfter'
  | 'stepBefore';

/**
 * MAPA DE INTERPOLACIÓN CLÍNICA Y BIOFÍSICA:
 * - linear: Conexión ortogonal punto a punto (calibraciones, trazados discretos).
 * - linearClosed: Polígono cerrado directo.
 * - smooth (Basis): Suavizado spline B (no interpola exactamente los puntos, solo tendencia).
 * - monotone / monotoneX: Preserva monotonicidad en X evitando oscilaciones espurias (curvas dosis-respuesta, cinéticas).
 * - monotoneY: Preserva monotonicidad en Y (isobaras o curvas de calibración vertical).
 * - natural: Spline cúbico con segundas derivadas continuas en los extremos.
 * - catmullRom: Curva abierta que pasa rigurosamente por cada punto medido.
 * - closed (Catmull-Rom Closed): Bucle cerrado suave que pasa por todos los puntos (bucles P-V, espirometría flujo-volumen).
 * - stepAfter / stepBefore: Funciones escalonadas ortogonales (supervivencia de Kaplan-Meier, estados de compuerta iónica).
 */
const CURVE_MAP: Record<CurveType, CurveFactory | CurveFactoryLineOnly> = {
  linear: curveLinear,
  linearClosed: curveLinearClosed,
  smooth: curveBasis,
  monotone: curveMonotoneX,
  monotoneX: curveMonotoneX,
  monotoneY: curveMonotoneY,
  natural: curveNatural,
  catmullRom: curveCatmullRom,
  closed: curveCatmullRomClosed,
  stepAfter: curveStepAfter,
  stepBefore: curveStepBefore,
};

export interface LinePathConfig<T> {
  data: T[];
  x: (d: T) => number;
  y: (d: T) => number;
  curve?: CurveType;
  defined?: (d: T) => boolean;
}

export function createLinePath<T>({
  data,
  x,
  y,
  curve = 'monotone',
  defined,
}: LinePathConfig<T>): string {
  const curveFactory = (CURVE_MAP[curve] || curveMonotoneX) as CurveFactory;

  const pathGenerator = line<T>()
    .x(x)
    .y(y)
    .curve(curveFactory);

  if (defined) {
    pathGenerator.defined(defined);
  }

  return pathGenerator(data) || '';
}

export interface AreaPathConfig<T> {
  data: T[];
  x: (d: T) => number;
  y0: number | ((d: T) => number); // Línea base (ej. 0 o límite inferior de banda clínica)
  y1: (d: T) => number;            // Límite superior de la curva
  curve?: CurveType;
  defined?: (d: T) => boolean;
}

export function createAreaPath<T>({
  data,
  x,
  y0,
  y1,
  curve = 'monotone',
  defined,
}: AreaPathConfig<T>): string {
  const curveFactory = (CURVE_MAP[curve] || curveMonotoneX) as CurveFactory;

  const pathGenerator = area<T>()
    .x(x)
    .y0(typeof y0 === 'number' ? () => y0 : y0)
    .y1(y1)
    .curve(curveFactory);

  if (defined) {
    pathGenerator.defined(defined);
  }

  return pathGenerator(data) || '';
}