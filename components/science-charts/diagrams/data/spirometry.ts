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
 */
export const normalSpirometry: SpirometryCurveData = {
  id: 'normal',
  label: 'Patrón Normal',
  pef: { volume: 1.2, flow: 8.5, label: 'PEF (8.5 L/s)' },
  fvc: 5.0,
  points: [
    { volume: 0.0, flow: 0.0 },  // Inicio de espiración (TLC)
    { volume: 0.5, flow: 6.0 },  // Subida rápida
    { volume: 1.2, flow: 8.5 },  // Pico Espiratorio (PEF)
    { volume: 2.5, flow: 5.5 },  // Descenso lineal normal (FEF 25-75)
    { volume: 4.0, flow: 2.5 },
    { volume: 5.0, flow: 0.0 },  // Fin de espiración (RV / FVC alcanzada)
    { volume: 3.5, flow: -4.5 }, // Inspiración máxima (lazo inferior)
    { volume: 1.5, flow: -5.0 },
    { volume: 0.0, flow: 0.0 },  // Cierre del ciclo en TLC
  ],
};

/**
 * Patrón Obstructivo (Ej. EPOC / Asma) - Nota el colapso temprano del flujo ("concavidad")
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
    { volume: 0.0, flow: 0.0 },
  ],
};