// components/science-charts/diagrams/data/acidBaseMap.ts

export interface Point2D {
  ph: number;
  hco3: number;
}

export interface IsobarCurve {
  pco2: number;
  label: string;
  points: Point2D[];
  labelPh: number; // Punto donde situar la etiqueta
}

/**
 * Calcula [HCO3-] a partir de pH y PCO2 usando Henderson-Hasselbalch.
 */
export function calculateHco3(ph: number, pco2: number): number {
  return 0.0307 * pco2 * Math.pow(10, ph - 6.1);
}

/**
 * Genera el conjunto de puntos para una isobara en el rango de pH clínico.
 */
export function generateIsobarPoints(pco2: number, minPh = 7.0, maxPh = 7.75, step = 0.01): Point2D[] {
  const points: Point2D[] = [];
  for (let ph = minPh; ph <= maxPh + 1e-5; ph += step) {
    const roundedPh = Number(ph.toFixed(3));
    const hco3 = calculateHco3(roundedPh, pco2);
    // Acotamos para no saturar el lienzo por encima de 60 mEq/L
    if (hco3 <= 65) {
      points.push({ ph: roundedPh, hco3 });
    }
  }
  return points;
}

// Isobaras representativas
export const standardIsobars: IsobarCurve[] = [
  { pco2: 10, label: '10', points: generateIsobarPoints(10, 7.3, 7.8), labelPh: 7.72 },
  { pco2: 20, label: '20', points: generateIsobarPoints(20, 7.15, 7.75), labelPh: 7.65 },
  { pco2: 30, label: '30', points: generateIsobarPoints(30, 7.05, 7.65), labelPh: 7.55 },
  { pco2: 40, label: '40 mmHg', points: generateIsobarPoints(40, 7.0, 7.6), labelPh: 7.46 },
  { pco2: 60, label: '60', points: generateIsobarPoints(60, 7.0, 7.45), labelPh: 7.32 },
  { pco2: 80, label: '80', points: generateIsobarPoints(80, 7.0, 7.35), labelPh: 7.22 },
  { pco2: 100, label: '100', points: generateIsobarPoints(100, 7.0, 7.25), labelPh: 7.15 },
];

export interface DiagnosticZone {
  code: string;
  name: string;
  points: Point2D[];
  labelPosition: Point2D;
}

// Polígonos de compensación fisiológica aproximados
export const clinicalZones: DiagnosticZone[] = [
  {
    code: 'Acidosis Respiratoria Crónica',
    name: 'Acidosis Resp. Crónica',
    points: [
      { ph: 7.38, hco3: 26 },
      { ph: 7.32, hco3: 35 },
      { ph: 7.26, hco3: 45 },
      { ph: 7.31, hco3: 45 },
      { ph: 7.36, hco3: 36 },
      { ph: 7.42, hco3: 28 },
    ],
    labelPosition: { ph: 7.31, hco3: 40 },
  },
  {
    code: 'Acidosis Respiratoria Aguda',
    name: 'Acidosis Resp. Aguda',
    points: [
      { ph: 7.38, hco3: 24 },
      { ph: 7.25, hco3: 27 },
      { ph: 7.10, hco3: 30 },
      { ph: 7.06, hco3: 32 },
      { ph: 7.15, hco3: 32 },
      { ph: 7.28, hco3: 29 },
      { ph: 7.40, hco3: 25 },
    ],
    labelPosition: { ph: 7.18, hco3: 30 },
  },
  {
    code: 'Acidosis Metabólica',
    name: 'Acidosis Metabólica',
    points: [
      { ph: 7.38, hco3: 22 },
      { ph: 7.28, hco3: 15 },
      { ph: 7.15, hco3: 8 },
      { ph: 7.00, hco3: 4 },
      { ph: 7.08, hco3: 4 },
      { ph: 7.22, hco3: 9 },
      { ph: 7.34, hco3: 16 },
      { ph: 7.40, hco3: 22 },
    ],
    labelPosition: { ph: 7.18, hco3: 10 },
  },
  {
    code: 'Alcalosis Respiratoria Aguda',
    name: 'Alcalosis Resp. Aguda',
    points: [
      { ph: 7.42, hco3: 24 },
      { ph: 7.55, hco3: 22 },
      { ph: 7.68, hco3: 19 },
      { ph: 7.65, hco3: 17 },
      { ph: 7.52, hco3: 20 },
      { ph: 7.40, hco3: 23 },
    ],
    labelPosition: { ph: 7.60, hco3: 22 },
  },
  {
    code: 'Alcalosis Respiratoria Crónica',
    name: 'Alcalosis Resp. Crónica',
    points: [
      { ph: 7.42, hco3: 22 },
      { ph: 7.48, hco3: 18 },
      { ph: 7.54, hco3: 14 },
      { ph: 7.50, hco3: 12 },
      { ph: 7.44, hco3: 16 },
      { ph: 7.38, hco3: 20 },
    ],
    labelPosition: { ph: 7.48, hco3: 15 },
  },
  {
    code: 'Alcalosis Metabólica',
    name: 'Alcalosis Metabólica',
    points: [
      { ph: 7.42, hco3: 26 },
      { ph: 7.48, hco3: 36 },
      { ph: 7.54, hco3: 48 },
      { ph: 7.60, hco3: 48 },
      { ph: 7.52, hco3: 35 },
      { ph: 7.45, hco3: 26 },
    ],
    labelPosition: { ph: 7.52, hco3: 40 },
  },
];