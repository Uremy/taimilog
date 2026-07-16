import { scaleLinear, scaleTime, scaleLog, type ScaleLinear, type ScaleTime, type ScaleLogarithmic } from 'd3-scale';

export interface LinearScaleConfig {
  domain: [number, number];
  range: [number, number];
  clamp?: boolean;
}

/**
 * Crea una escala cartesiana estándar. 
 * Ideal para presión, volumen, milivoltios y T-scores.
 */
export function createLinearScale({ domain, range, clamp = true }: LinearScaleConfig): ScaleLinear<number, number> {
  const scale = scaleLinear().domain(domain).range(range);
  if (clamp) scale.clamp(true);
  return scale;
}

/**
 * Crea una escala temporal.
 * Ideal para el eje X en el diagrama de Wiggers o el ECG.
 */
export function createTimeScale(domain: [Date, Date] | [number, number], range: [number, number]): ScaleTime<number, number> {
  return scaleTime().domain(domain).range(range);
}

/**
 * Crea una escala logarítmica.
 * Útil para curvas dosis-respuesta o farmacocinética.
 */
export function createLogScale(domain: [number, number], range: [number, number]): ScaleLogarithmic<number, number> {
  return scaleLog().domain(domain).range(range);
}