// components/science-charts/diagrams/data/acidBaseMap.ts

export interface Point2D {
  ph: number;
  hco3: number;
}

export interface IsobarCurve {
  pco2: number;
  label: string;
  points: Point2D[];
}

export function calculateHco3(ph: number, pco2: number): number {
  return 0.0307 * pco2 * Math.pow(10, ph - 6.1);
}

export function generateIsobarPoints(pco2: number, minPh = 7.0, maxPh = 7.8, step = 0.01): Point2D[] {
  const points: Point2D[] = [];
  for (let ph = minPh; ph <= maxPh + 1e-5; ph += step) {
    const roundedPh = Number(ph.toFixed(3));
    const hco3 = calculateHco3(roundedPh, pco2);
    if (hco3 <= 62) {
      points.push({ ph: roundedPh, hco3 });
    }
  }
  return points;
}

// Isobaras clásicas de referencia (10 a 120 mmHg)
export const standardIsobars: IsobarCurve[] = [
  { pco2: 10, label: '10', points: generateIsobarPoints(10, 7.35, 7.8) },
  { pco2: 15, label: '15', points: generateIsobarPoints(15, 7.25, 7.8) },
  { pco2: 20, label: '20', points: generateIsobarPoints(20, 7.15, 7.8) },
  { pco2: 30, label: '30', points: generateIsobarPoints(30, 7.05, 7.7) },
  { pco2: 40, label: '40', points: generateIsobarPoints(40, 7.0, 7.6) },
  { pco2: 50, label: '50', points: generateIsobarPoints(50, 7.0, 7.5) },
  { pco2: 60, label: '60', points: generateIsobarPoints(60, 7.0, 7.45) },
  { pco2: 70, label: '70', points: generateIsobarPoints(70, 7.0, 7.4) },
  { pco2: 80, label: '80', points: generateIsobarPoints(80, 7.0, 7.36) },
  { pco2: 90, label: '90', points: generateIsobarPoints(90, 7.0, 7.32) },
  { pco2: 100, label: '100', points: generateIsobarPoints(100, 7.0, 7.28) },
  { pco2: 120, label: '120', points: generateIsobarPoints(120, 7.0, 7.22) },
];

export interface ClinicalBand {
  id: string;
  name: string;
  colorClass: string;
  textClass: string;
  polygon: Point2D[];
  labelPos: { ph: number; hco3: number; angle: number; line1: string; line2?: string };
}

// Coordenadas fisiológicas de los 6 corredores diagnósticos
export const clinicalBands: ClinicalBand[] = [
  {
    id: 'resp-acid-chronic',
    name: 'Acidosis Respiratoria Crónica',
    colorClass: 'fill-fuchsia-600/30 dark:fill-fuchsia-500/30 stroke-fuchsia-600/80 dark:stroke-fuchsia-400/80',
    textClass: 'fill-fuchsia-700 dark:fill-fuchsia-300',
    polygon: [
      { ph: 7.38, hco3: 26 },
      { ph: 7.34, hco3: 35 },
      { ph: 7.28, hco3: 45 },
      { ph: 7.23, hco3: 55 },
      { ph: 7.27, hco3: 55 },
      { ph: 7.35, hco3: 45 },
      { ph: 7.38, hco3: 38 },
      { ph: 7.42, hco3: 26 },
    ],
    labelPos: { ph: 7.31, hco3: 44, angle: -65, line1: 'Acidosis', line2: 'resp. crónica' },
  },
  {
    id: 'resp-acid-acute',
    name: 'Acidosis Respiratoria Aguda',
    colorClass: 'fill-rose-600/35 dark:fill-rose-500/35 stroke-rose-600/80 dark:stroke-rose-400/80',
    textClass: 'fill-rose-700 dark:fill-rose-300',
    polygon: [
      { ph: 7.37, hco3: 24 },
      { ph: 7.28, hco3: 26 },
      { ph: 7.15, hco3: 28 },
      { ph: 7.07, hco3: 30 },
      { ph: 7.08, hco3: 32 },
      { ph: 7.20, hco3: 30 },
      { ph: 7.30, hco3: 28 },
      { ph: 7.38, hco3: 26 },
    ],
    labelPos: { ph: 7.22, hco3: 28, angle: -12, line1: 'Acidosis', line2: 'resp. aguda' },
  },
  {
    id: 'meta-acid',
    name: 'Acidosis Metabólica',
    colorClass: 'fill-emerald-600/35 dark:fill-emerald-500/35 stroke-emerald-600/80 dark:stroke-emerald-400/80',
    textClass: 'fill-emerald-700 dark:fill-emerald-300',
    polygon: [
      { ph: 7.37, hco3: 22 },
      { ph: 7.32, hco3: 16 },
      { ph: 7.25, hco3: 10 },
      { ph: 7.14, hco3: 5 },
      { ph: 7.00, hco3: 2 },
      { ph: 7.00, hco3: 4.5 },
      { ph: 7.15, hco3: 8 },
      { ph: 7.28, hco3: 15 },
      { ph: 7.39, hco3: 22 },
    ],
    labelPos: { ph: 7.22, hco3: 10, angle: 42, line1: 'Acidosis', line2: 'metabólica' },
  },
  {
    id: 'meta-alk',
    name: 'Alcalosis Metabólica',
    colorClass: 'fill-amber-600/35 dark:fill-amber-500/35 stroke-amber-600/80 dark:stroke-amber-400/80',
    textClass: 'fill-amber-800 dark:fill-amber-200',
    polygon: [
      { ph: 7.43, hco3: 26 },
      { ph: 7.45, hco3: 33 },
      { ph: 7.48, hco3: 43 },
      { ph: 7.51, hco3: 55 },
      { ph: 7.57, hco3: 55 },
      { ph: 7.55, hco3: 45 },
      { ph: 7.51, hco3: 35 },
      { ph: 7.47, hco3: 26 },
    ],
    labelPos: { ph: 7.50, hco3: 45, angle: 78, line1: 'Alcalosis', line2: 'metabólica' },
  },
  {
    id: 'resp-alk-acute',
    name: 'Alcalosis Respiratoria Aguda',
    colorClass: 'fill-sky-600/35 dark:fill-sky-500/35 stroke-sky-600/80 dark:stroke-sky-400/80',
    textClass: 'fill-sky-700 dark:fill-sky-300',
    polygon: [
      { ph: 7.43, hco3: 24 },
      { ph: 7.52, hco3: 22 },
      { ph: 7.62, hco3: 18 },
      { ph: 7.72, hco3: 14 },
      { ph: 7.67, hco3: 12 },
      { ph: 7.57, hco3: 16 },
      { ph: 7.48, hco3: 20 },
      { ph: 7.43, hco3: 23 },
    ],
    labelPos: { ph: 7.57, hco3: 19, angle: -24, line1: 'Alcalosis', line2: 'resp. aguda' },
  },
  {
    id: 'resp-alk-chronic',
    name: 'Alcalosis Respiratoria Crónica',
    colorClass: 'fill-indigo-600/35 dark:fill-indigo-500/35 stroke-indigo-600/80 dark:stroke-indigo-400/80',
    textClass: 'fill-indigo-700 dark:fill-indigo-300',
    polygon: [
      { ph: 7.42, hco3: 22 },
      { ph: 7.45, hco3: 18 },
      { ph: 7.49, hco3: 14 },
      { ph: 7.54, hco3: 11 },
      { ph: 7.50, hco3: 9 },
      { ph: 7.44, hco3: 13 },
      { ph: 7.40, hco3: 18 },
      { ph: 7.39, hco3: 21 },
    ],
    labelPos: { ph: 7.45, hco3: 14, angle: -60, line1: 'Alcalosis', line2: 'resp. crónica' },
  },
];