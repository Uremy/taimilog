// components/science-charts/core/scales.ts
import { 
  scaleLinear, 
  scaleTime, 
  scaleLog, 
  type ScaleLinear, 
  type ScaleTime, 
  type ScaleLogarithmic 
} from 'd3-scale';

export interface ScaleConfig<DomainType> {
  domain: [DomainType, DomainType];
  range: [number, number];
  clamp?: boolean;
}

/**
 * Crea una escala cartesiana estándar. 
 * Ideal para presión, volumen, milivoltios y T-scores.
 */
export function createLinearScale({ 
  domain, 
  range, 
  clamp = true 
}: ScaleConfig<number>): ScaleLinear<number, number> {
  const scale = scaleLinear().domain(domain).range(range);
  if (clamp) scale.clamp(true);
  return scale;
}

/**
 * Crea una escala temporal.
 * Ideal para el eje X en el diagrama de Wiggers o el ECG.
 */
export function createTimeScale({ 
  domain, 
  range, 
  clamp = true 
}: ScaleConfig<Date | number>): ScaleTime<number, number> {
  const scale = scaleTime().domain(domain).range(range);
  if (clamp) scale.clamp(true);
  return scale;
}

/**
 * Crea una escala logarítmica.
 * Útil para curvas dosis-respuesta o farmacocinética.
 */
export function createLogScale({ 
  domain, 
  range, 
  clamp = true 
}: ScaleConfig<number>): ScaleLogarithmic<number, number> {
  // GUARDA CIENTÍFICA: El logaritmo de 0 o números negativos es indefinido en matemáticas cartesianas
  if (process.env.NODE_ENV !== 'production' && (domain[0] <= 0 || domain[1] <= 0)) {
    console.warn(
      `[scales] Dominio logarítmico inválido [${domain.join(', ')}]. Ambos límites deben ser estrictamente positivos para evitar fallos cartesianos.`
    );
  }
  
  const scale = scaleLog().domain(domain).range(range);
  if (clamp) scale.clamp(true);
  return scale;
}