// components/science-charts/diagrams/data/spirometry.ts

export interface SpirometryPoint {
  volume: number; // Litros (Eje X)
  flow: number;   // Litros/segundo (Eje Y)
}

export interface SpirometryCurveData {
  id: 'normal' | 'obstructive' | 'restrictive';
  label: string;
  pef: { volume: number; flow: number; label: string }; // Peak Expiratory Flow
  fvc: number; // Forced Vital Capacity (Litros)
  points: SpirometryPoint[];
}

/**
 * Curva normal de referencia (Lazo cerrado)
 * Nota: Se omite el punto (0,0) final para que curveCatmullRomClosed 
 * calcule correctamente el vector tangente al cerrar el ciclo.
 */
export const normalSpirometry: SpirometryCurveData = {
  id: 'normal',
  label: 'Patrón Normal',
  pef: { volume: 0.4, flow: 8.5, label: 'PEF (8.5 L/s)' }, // ~8% de FVC, dentro de norma
  fvc: 5.0,
  points: [
    { volume: 0.0, flow: 0.0 },
    { volume: 0.15, flow: 5.5 },
    { volume: 0.4, flow: 8.5 },   // PEF
    { volume: 1.2, flow: 6.8 },
    { volume: 2.5, flow: 4.5 },
    { volume: 4.0, flow: 1.8 },
    { volume: 5.0, flow: 0.0 },
    { volume: 3.5, flow: -4.5 },
    { volume: 1.5, flow: -5.0 },
    { volume: 0.3, flow: -1.5 },  // ← punto de transición suave antes de cerrar
  ]
};

/**
 * Patrón Obstructivo (Ej. EPOC / Asma) - Colapso temprano del flujo ("concavidad")
 */
export const obstructiveSpirometry: SpirometryCurveData = {
  id: 'obstructive',
  label: 'Patrón Obstructivo (EPOC)',
  pef: { volume: 0.8, flow: 5.0, label: 'PEF Disminuido (5.0 L/s)' },
  fvc: 4.2,
  points: [
    { volume: 0.0, flow: 0.0 },
    { volume: 0.8, flow: 5.0 },  // PEF más bajo y alcanzado antes
    { volume: 1.5, flow: 2.2 },  // Caída súbita por colapso de la vía aérea (Concavidad)
    { volume: 3.0, flow: 1.0 },
    { volume: 4.2, flow: 0.0 },  // FVC ligeramente reducida o normal
    { volume: 2.5, flow: -3.0 }, // Lazo inspiratorio conservado
  ],
};