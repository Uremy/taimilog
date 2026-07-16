// components/science-charts/diagrams/data/wiggers.ts

export interface WiggersDataPoint {
  time: number;
  aorticPressure: number;
  ventricularPressure: number;
  atrialPressure: number;
  ventricularVolume: number;
  ecg: number;
}

export interface CardiacPhase {
  start: number;
  end: number;
  code: string;
  label: string;
  description: string;
}

export interface CardiacEvent {
  time: number;
  code: string;
  label: string;
  description: string;
}

export const textbookWiggersData = {
  phases: [
    { start: 0.00, end: 0.10, code: 'SA', label: 'Sístole Auricular',
      description: 'Contracción activa auricular tras la onda P del ECG. Aporta el 20% final del llenado ventricular ("patada auricular").' },
    { start: 0.10, end: 0.15, code: 'CI', label: 'Contr. Isovolumétrica',
      description: 'Cierre mitral (S1). El ventrículo se contrae con todas sus válvulas cerradas; la presión aumenta drásticamente sin cambio de volumen.' },
    { start: 0.15, end: 0.40, code: 'EV', label: 'Eyección Ventricular',
      description: 'Apertura aórtica (AA). La presión ventricular supera la aórtica (pico ~120 mmHg) y el volumen ventricular cae rápidamente.' },
    { start: 0.40, end: 0.48, code: 'RI', label: 'Relaj. Isovolumétrica',
      description: 'Cierre aórtico (S2 / incisura dícrota). El ventrículo se relaja con válvulas cerradas hasta que su presión cae bajo la auricular.' },
    { start: 0.48, end: 0.80, code: 'LV', label: 'Llenado Ventricular',
      description: 'Apertura mitral (AM). Llenado pasivo rápido inicial seguido de diastasis (llenado lento) antes del siguiente ciclo.' },
  ] as CardiacPhase[],

  events: [
    { time: 0.10, code: 'S1', label: 'Cierre Mitral (S1)', description: 'Marca el inicio de la sístole ventricular y genera el primer ruido cardíaco.' },
    { time: 0.15, code: 'AA', label: 'Apertura Aórtica', description: 'La presión ventricular supera los ~80 mmHg de la aorta y comienza la eyección.' },
    { time: 0.40, code: 'S2', label: 'Cierre Aórtico (S2)', description: 'Fin de la eyección sistólica; genera el segundo ruido y la incisura dícrota en el pulso.' },
    { time: 0.48, code: 'AM', label: 'Apertura Mitral', description: 'La presión ventricular cae por debajo de la auricular (~2-3 mmHg) e inicia el llenado pasivo.' },
  ] as CardiacEvent[],

  timeseries: [
    // --- DIASTASIS + LLENADO LENTO (arrastre del ciclo previo) ---
    { time: 0.00, aorticPressure: 80, ventricularPressure: 6,  atrialPressure: 4,  ventricularVolume: 120, ecg: 0.0 },
    { time: 0.02, aorticPressure: 80, ventricularPressure: 6,  atrialPressure: 4,  ventricularVolume: 122, ecg: 0.0 },

    // --- ONDA P (giba ancha, no puntiaguda) ---
    { time: 0.035, aorticPressure: 80, ventricularPressure: 6,  atrialPressure: 4.5, ventricularVolume: 124, ecg: 0.08 },
    { time: 0.05,  aorticPressure: 80, ventricularPressure: 7,  atrialPressure: 5.5, ventricularVolume: 126, ecg: 0.18 }, // pico onda P
    { time: 0.065, aorticPressure: 80, ventricularPressure: 7,  atrialPressure: 7,   ventricularVolume: 128, ecg: 0.10 },

    // --- SÍSTOLE AURICULAR: onda "a" ---
    { time: 0.075, aorticPressure: 80, ventricularPressure: 8,  atrialPressure: 9,   ventricularVolume: 129, ecg: 0.02 }, // pico onda a
    { time: 0.09,  aorticPressure: 80, ventricularPressure: 9,  atrialPressure: 7,   ventricularVolume: 130, ecg: -0.03 },
    { time: 0.098, aorticPressure: 80, ventricularPressure: 9,  atrialPressure: 5.5, ventricularVolume: 130, ecg: -0.08 }, // onda Q

    // --- CONTRACCIÓN ISOVOLUMÉTRICA (0.10-0.15s), aorta perfectamente plana ---
    { time: 0.10,  aorticPressure: 80, ventricularPressure: 10, atrialPressure: 5,   ventricularVolume: 130, ecg: -0.1 }, // S1
    { time: 0.115, aorticPressure: 80, ventricularPressure: 35, atrialPressure: 7,   ventricularVolume: 130, ecg: 1.3 },  // ascenso R
    { time: 0.125, aorticPressure: 80, ventricularPressure: 55, atrialPressure: 9,   ventricularVolume: 130, ecg: 0.5 },  // pico R + onda c
    { time: 0.14,  aorticPressure: 80, ventricularPressure: 75, atrialPressure: 6,   ventricularVolume: 130, ecg: -0.25 },// onda S
    { time: 0.149, aorticPressure: 80, ventricularPressure: 80, atrialPressure: 5,   ventricularVolume: 130, ecg: -0.02 },// justo antes de AA (ancla la planicie aórtica)

    // --- EYECCIÓN RÁPIDA (más abrupta que la reducida) ---
    { time: 0.15,  aorticPressure: 81,  ventricularPressure: 82,  atrialPressure: 5, ventricularVolume: 128, ecg: 0.0 }, // AA
    { time: 0.18,  aorticPressure: 98,  ventricularPressure: 102, atrialPressure: 4, ventricularVolume: 108, ecg: 0.0 },
    { time: 0.22,  aorticPressure: 112, ventricularPressure: 116, atrialPressure: 4, ventricularVolume: 88,  ecg: 0.0 },
    { time: 0.26,  aorticPressure: 120, ventricularPressure: 122, atrialPressure: 5, ventricularVolume: 74,  ecg: 0.12 },// pico sistólico

    // --- EYECCIÓN REDUCIDA (más lenta) ---
    { time: 0.30,  aorticPressure: 116, ventricularPressure: 114, atrialPressure: 6, ventricularVolume: 62,  ecg: 0.28 },
    { time: 0.325, aorticPressure: 109, ventricularPressure: 107, atrialPressure: 7, ventricularVolume: 56,  ecg: 0.38 },// pico onda T
    { time: 0.36,  aorticPressure: 98,  ventricularPressure: 92,  atrialPressure: 8, ventricularVolume: 52,  ecg: 0.18 },
    { time: 0.385, aorticPressure: 88,  ventricularPressure: 78,  atrialPressure: 9, ventricularVolume: 50,  ecg: 0.05 },// fin eyección, ESV

    // --- RELAJACIÓN ISOVOLUMÉTRICA + INCISURA DÍCROTA (quiebre agudo) ---
    { time: 0.40,  aorticPressure: 84, ventricularPressure: 68, atrialPressure: 10, ventricularVolume: 50, ecg: 0.0 }, // S2
    { time: 0.408, aorticPressure: 81, ventricularPressure: 52, atrialPressure: 10.5, ventricularVolume: 50, ecg: 0.0 }, // caída brusca
    { time: 0.415, aorticPressure: 89, ventricularPressure: 40, atrialPressure: 11, ventricularVolume: 50, ecg: 0.0 }, // incisura (pico anguloso)
    { time: 0.43,  aorticPressure: 87, ventricularPressure: 26, atrialPressure: 11.5, ventricularVolume: 50, ecg: 0.0 }, // onda v
    { time: 0.46,  aorticPressure: 86, ventricularPressure: 12, atrialPressure: 10, ventricularVolume: 50, ecg: 0.0 },
    { time: 0.475, aorticPressure: 85, ventricularPressure: 5,  atrialPressure: 8, ventricularVolume: 50, ecg: 0.0 },

    // --- LLENADO PASIVO RÁPIDO (colapso onda v) ---
    { time: 0.48,  aorticPressure: 85, ventricularPressure: 4,  atrialPressure: 7,  ventricularVolume: 52,  ecg: 0.0 }, // AM
    { time: 0.51,  aorticPressure: 84, ventricularPressure: 3,  atrialPressure: 3,  ventricularVolume: 74,  ecg: 0.0 },
    { time: 0.55,  aorticPressure: 83, ventricularPressure: 3.5,atrialPressure: 3,  ventricularVolume: 98,  ecg: 0.0 },
    { time: 0.62,  aorticPressure: 82, ventricularPressure: 4,  atrialPressure: 3.5,ventricularVolume: 108, ecg: 0.0 },

    // --- DIASTASIS (llenado lento) ---
    { time: 0.70,  aorticPressure: 81, ventricularPressure: 5,  atrialPressure: 4,  ventricularVolume: 115, ecg: 0.0 },
    { time: 0.80,  aorticPressure: 80, ventricularPressure: 6,  atrialPressure: 4,  ventricularVolume: 120, ecg: 0.0 },
  ] as WiggersDataPoint[],
};