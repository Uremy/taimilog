// components/science-charts/core/utils/nomogramMath.ts

export interface NomogramPoint {
  pH: number;
  hco3: number;
  pco2?: number;
}

export function computeLabelAngle(
  data: NomogramPoint[],
  index: number,
  xScale: (v: number) => number,
  yScale: (v: number) => number,
  xKey: keyof NomogramPoint = 'pH',
  yKey: keyof NomogramPoint = 'hco3'
): number {
  const a = data[Math.max(0, index - 1)];
  const b = data[Math.min(data.length - 1, index + 1)];
  
  const dx = xScale(b[xKey] as number) - xScale(a[xKey] as number);
  const dy = yScale(b[yKey] as number) - yScale(a[yKey] as number);
  
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

export function findClosestIndexByPh(data: NomogramPoint[], targetPh: number): number {
  if (data.length === 0) return 0;
  
  return data.reduce((closestIdx, currentPoint, currentIndex) => {
    const currentDiff = Math.abs(currentPoint.pH - targetPh);
    const closestDiff = Math.abs(data[closestIdx].pH - targetPh);
    
    return currentDiff < closestDiff ? currentIndex : closestIdx;
  }, 0);
}

// Generador analítico para Davenport
export const generateIsobar = (
  pco2: number,
  xDomain: [number, number],
  yDomain: [number, number],
  steps = 60
): NomogramPoint[] => {
  const [xMin, xMax] = xDomain;
  const [, yMax] = yDomain;

  const phAtYMax = 6.1 + Math.log10(yMax / (0.03 * pco2));
  const effectiveMaxPh = Math.min(xMax, phAtYMax);

  return Array.from({ length: steps + 1 }, (_, i) => {
    const pH = xMin + (i * (effectiveMaxPh - xMin)) / steps;
    return {
      pH: Number(pH.toFixed(3)),
      hco3: Number((0.03 * pco2 * Math.pow(10, pH - 6.1)).toFixed(2)),
      pco2
    };
  });
};

// Generador analítico para Siggaard-Andersen
export const generateBaseExcessLine = (
  be: number,
  xDomain: [number, number],
  yDomain: [number, number],
  steps = 60
): NomogramPoint[] => {
  const [xMin, xMax] = xDomain;
  const [yMin, yMax] = yDomain;

  const slope = -1.5;
  const referenceLogPco2 = 1.602; 
  const intercept = referenceLogPco2 - slope * 7.4;
  const shift = be * 0.025;

  const phAtYMax = (Math.log10(yMax) - intercept - shift) / slope;
  const phAtYMin = (Math.log10(yMin) - intercept - shift) / slope;

  const effectiveMinPh = Math.max(xMin, phAtYMax);
  const effectiveMaxPh = Math.min(xMax, phAtYMin);

  return Array.from({ length: steps + 1 }, (_, i) => {
    const pH = effectiveMinPh + (i * (effectiveMaxPh - effectiveMinPh)) / steps;
    const logPco2 = slope * pH + intercept + shift;
    return {
      pH: Number(pH.toFixed(3)),
      hco3: 0,
      pco2: Number(Math.pow(10, logPco2).toFixed(1)),
    };
  });
};