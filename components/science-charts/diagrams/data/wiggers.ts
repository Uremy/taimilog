// components/science-charts/diagrams/data/wiggers.ts

export interface WiggersDataPoint {
  time: number;              // Segundos (0.0 a 0.8s)
  aorticPressure: number;    // mmHg (80 a 120)
  ventricularPressure: number;// mmHg (0 a 120)
  atrialPressure: number;    // mmHg (0 a 12)
  ventricularVolume: number; // mL (50 a 130)
  ecg: number;               // mV (-0.5 a 1.5)
}

export interface CardiacPhase {
  start: number;
  end: number;
  label: string;
}

export interface CardiacEvent {
  time: number;
  label: string;
}

export const textbookWiggersData = {
  phases: [
    { start: 0.00, end: 0.10, label: 'Sístole Auricular' },
    { start: 0.10, end: 0.15, label: 'Contracción Isovolumétrica' },
    { start: 0.15, end: 0.40, label: 'Eyección Ventricular' },
    { start: 0.40, end: 0.48, label: 'Relajación Isovolumétrica' },
    { start: 0.48, end: 0.80, label: 'Llenado Ventricular' },
  ] as CardiacPhase[],

  events: [
    { time: 0.10, label: 'S1 (Cierre Mitral)' },
    { time: 0.15, label: 'Apertura Aórtica' },
    { time: 0.40, label: 'S2 (Cierre Aórtico)' },
    { time: 0.48, label: 'Apertura Mitral' },
  ] as CardiacEvent[],

  // Muestra representativa de puntos para trazar las curvas suaves
  timeseries: [
    { time: 0.00, aorticPressure: 80, ventricularPressure: 8,  atrialPressure: 6,  ventricularVolume: 120, ecg: 0.0 },
    { time: 0.06, aorticPressure: 80, ventricularPressure: 12, atrialPressure: 10, ventricularVolume: 130, ecg: 0.2 }, // Onda P
    { time: 0.10, aorticPressure: 80, ventricularPressure: 14, atrialPressure: 8,  ventricularVolume: 130, ecg: -0.1 },// Inicio QRS
    { time: 0.12, aorticPressure: 80, ventricularPressure: 60, atrialPressure: 4,  ventricularVolume: 130, ecg: 1.5 }, // Pico R
    { time: 0.15, aorticPressure: 81, ventricularPressure: 82, atrialPressure: 6,  ventricularVolume: 128, ecg: -0.3 },// Apertura Aórtica
    { time: 0.25, aorticPressure: 120,ventricularPressure: 122,atrialPressure: 8,  ventricularVolume: 75,  ecg: 0.1 }, // Pico sistólico
    { time: 0.35, aorticPressure: 100,ventricularPressure: 98, atrialPressure: 10, ventricularVolume: 52,  ecg: 0.35 },// Onda T
    { time: 0.40, aorticPressure: 90, ventricularPressure: 70, atrialPressure: 12, ventricularVolume: 50,  ecg: 0.0 }, // Cierre Aórtico (Incisura dicrota)
    { time: 0.48, aorticPressure: 84, ventricularPressure: 6,  atrialPressure: 10, ventricularVolume: 52,  ecg: 0.0 }, // Apertura Mitral
    { time: 0.65, aorticPressure: 81, ventricularPressure: 4,  atrialPressure: 5,  ventricularVolume: 110, ecg: 0.0 }, // Llenado rápido
    { time: 0.80, aorticPressure: 80, ventricularPressure: 8,  atrialPressure: 6,  ventricularVolume: 120, ecg: 0.0 }, // Fin del ciclo
  ] as WiggersDataPoint[],
};