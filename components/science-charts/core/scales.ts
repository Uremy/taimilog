// components/science-charts/core/scales.ts
import {
  scaleLinear,
  scaleTime,
  scaleLog,
  scaleBand,
  type ScaleLinear,
  type ScaleTime,
  type ScaleLogarithmic,
  type ScaleBand,
} from 'd3-scale';

export interface ScaleConfig<DomainType> {
  domain: [DomainType, DomainType];
  range: [number, number];
  clamp?: boolean;
}

export interface BandScaleConfig {
  domain: string[];
  range: [number, number];
  padding?: number;
  paddingInner?: number;
  paddingOuter?: number;
}

/**
 * Escala lineal cartesiana estándar.
 * Ideal para variables continuas: presión, volumen, milivoltios, concentraciones y T-scores.
 */
export function createLinearScale({
  domain,
  range,
  clamp = true,
}: ScaleConfig<number>): ScaleLinear<number, number> {
  const scale = scaleLinear().domain(domain).range(range);
  if (clamp) scale.clamp(true);
  return scale;
}

/**
 * Escala temporal para series de tiempo.
 * Ideal para el eje X en electrocardiogramas, EEG o fases del ciclo cardíaco.
 */
export function createTimeScale({
  domain,
  range,
  clamp = true,
}: ScaleConfig<Date | number>): ScaleTime<number, number> {
  const scale = scaleTime().domain(domain).range(range);
  if (clamp) scale.clamp(true);
  return scale;
}

/**
 * Escala logarítmica.
 * Útil para curvas dosis-respuesta, gráficos de Lineweaver-Burk, farmacocinética y nomogramas de toxicidad.
 */
export function createLogScale({
  domain,
  range,
  clamp = true,
}: ScaleConfig<number>): ScaleLogarithmic<number, number> {
  if (process.env.NODE_ENV !== 'production' && (domain[0] <= 0 || domain[1] <= 0)) {
    console.warn(
      `[scales] Dominio logarítmico inválido [${domain.join(', ')}]. Ambos límites deben ser estrictamente positivos.`
    );
  }

  const scale = scaleLog().domain(domain).range(range);
  if (clamp) scale.clamp(true);
  return scale;
}

/**
 * Escala discreta de bandas.
 * Esencial para diagramas de barras categóricas, distribuciones por fenotipos y comparaciones de cohortes.
 */
export function createBandScale({
  domain,
  range,
  padding = 0.2,
  paddingInner,
  paddingOuter,
}: BandScaleConfig): ScaleBand<string> {
  const scale = scaleBand<string>().domain(domain).range(range);

  if (typeof paddingInner === 'number') {
    scale.paddingInner(paddingInner);
  }
  if (typeof paddingOuter === 'number') {
    scale.paddingOuter(paddingOuter);
  }
  if (typeof padding === 'number' && paddingInner === undefined && paddingOuter === undefined) {
    scale.padding(padding);
  }

  return scale;
}