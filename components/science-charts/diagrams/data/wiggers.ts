export interface WiggersDataPoint {
  time: number;
  aorticPressure: number;
  ventricularPressure: number;
  atrialPressure: number;
  ventricularVolume: number;
  ecg: number;
  pcg: number; // Nuevo canal: Fonocardiograma (-1.0 a 1.0)
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
    // --- DIASTASIS + LLENADO LENTO ---
    { time: 0.00,  aorticPressure: 80.0, ventricularPressure: 6,   atrialPressure: 4.0, ventricularVolume: 120, ecg: 0.00, pcg: 0.00 },
    { time: 0.02,  aorticPressure: 79.8, ventricularPressure: 6,   atrialPressure: 4.0, ventricularVolume: 122, ecg: 0.00, pcg: 0.00 },

    // --- ONDA P ---
    { time: 0.035, aorticPressure: 79.6, ventricularPressure: 6,   atrialPressure: 4.5, ventricularVolume: 124, ecg: 0.08, pcg: 0.00 },
    { time: 0.05,  aorticPressure: 79.4, ventricularPressure: 7,   atrialPressure: 5.5, ventricularVolume: 126, ecg: 0.18, pcg: 0.00 },
    { time: 0.065, aorticPressure: 79.2, ventricularPressure: 7,   atrialPressure: 7.0, ventricularVolume: 128, ecg: 0.10, pcg: 0.05 }, // inicio S4

    // --- SÍSTOLE AURICULAR: onda "a" + vibración S4 ---
    { time: 0.075, aorticPressure: 79.0, ventricularPressure: 8,   atrialPressure: 9.0, ventricularVolume: 129, ecg: 0.02, pcg: -0.08 }, // pico S4
    { time: 0.09,  aorticPressure: 78.8, ventricularPressure: 9,   atrialPressure: 7.0, ventricularVolume: 130, ecg: -0.03, pcg: 0.04 },  // fin S4
    { time: 0.098, aorticPressure: 78.7, ventricularPressure: 9,   atrialPressure: 5.5, ventricularVolume: 130, ecg: -0.08, pcg: 0.00 },

    // --- CONTRACCIÓN ISOVOLUMÉTRICA: Primer Ruido Cardíaco (S1) ---
    { time: 0.10,  aorticPressure: 78.6, ventricularPressure: 10,  atrialPressure: 5.0, ventricularVolume: 130, ecg: -0.10, pcg: -0.30 }, // S1 inicio
    { time: 0.107, aorticPressure: 78.5, ventricularPressure: 12,  atrialPressure: 5.3, ventricularVolume: 130, ecg: -0.05, pcg: 0.80 },  // S1 vibración mayor
    { time: 0.113, aorticPressure: 78.4, ventricularPressure: 24,  atrialPressure: 6.0, ventricularVolume: 130, ecg: 1.30,  pcg: -0.90 }, // S1 vibración mayor
    { time: 0.119, aorticPressure: 78.3, ventricularPressure: 42,  atrialPressure: 8.5, ventricularVolume: 130, ecg: -0.20, pcg: 0.60 },  // S1 vibración
    { time: 0.128, aorticPressure: 78.2, ventricularPressure: 58,  atrialPressure: 6.5, ventricularVolume: 130, ecg: -0.28, pcg: -0.35 }, // S1 decaimiento
    { time: 0.13,  aorticPressure: 78.1, ventricularPressure: 60,  atrialPressure: 6.0, ventricularVolume: 130, ecg: -0.26, pcg: 0.15 },  // S1 decaimiento
    { time: 0.14,  aorticPressure: 78.1, ventricularPressure: 75,  atrialPressure: 6.0, ventricularVolume: 130, ecg: -0.05, pcg: -0.05 }, // S1 fin
    { time: 0.149, aorticPressure: 78.0, ventricularPressure: 80,  atrialPressure: 5.5, ventricularVolume: 130, ecg: 0.00,  pcg: 0.00 },

    // --- EYECCIÓN RÁPIDA Y REDUCIDA ---
    { time: 0.15,  aorticPressure: 80.0, ventricularPressure: 82,  atrialPressure: 5.0, ventricularVolume: 128, ecg: 0.00,  pcg: 0.00 },
    { time: 0.18,  aorticPressure: 90.0, ventricularPressure: 103, atrialPressure: 4.0, ventricularVolume: 108, ecg: 0.06,  pcg: 0.00 },
    { time: 0.21,  aorticPressure: 101.0,ventricularPressure: 115, atrialPressure: 4.0, ventricularVolume: 90,  ecg: 0.16,  pcg: 0.00 },
    { time: 0.25,  aorticPressure: 114.0,ventricularPressure: 121, atrialPressure: 5.0, ventricularVolume: 72,  ecg: 0.26,  pcg: 0.00 },
    { time: 0.28,  aorticPressure: 119.0,ventricularPressure: 118, atrialPressure: 6.0, ventricularVolume: 62,  ecg: 0.33,  pcg: 0.00 },
    { time: 0.32,  aorticPressure: 117.0,ventricularPressure: 103, atrialPressure: 7.5, ventricularVolume: 55,  ecg: 0.40,  pcg: 0.00 },
    { time: 0.36,  aorticPressure: 103.0,ventricularPressure: 86,  atrialPressure: 8.5, ventricularVolume: 51,  ecg: 0.20,  pcg: 0.00 },
    { time: 0.385, aorticPressure: 91.0, ventricularPressure: 76,  atrialPressure: 9.5, ventricularVolume: 50,  ecg: 0.06,  pcg: 0.00 },

    // --- RELAJACIÓN ISOVOLUMÉTRICA: Segundo Ruido Cardíaco (S2) ---
    { time: 0.40,  aorticPressure: 84.0, ventricularPressure: 66,  atrialPressure: 10.0,ventricularVolume: 50,  ecg: 0.00,  pcg: 0.70 },  // S2 inicio agudo
    { time: 0.405, aorticPressure: 80.0, ventricularPressure: 58,  atrialPressure: 10.2,ventricularVolume: 50,  ecg: 0.00,  pcg: -0.85 }, // S2 rebote
    { time: 0.412, aorticPressure: 89.0, ventricularPressure: 46,  atrialPressure: 10.5,ventricularVolume: 50,  ecg: 0.00,  pcg: 0.60 },  // S2 vibración
    { time: 0.42,  aorticPressure: 87.0, ventricularPressure: 32,  atrialPressure: 11.0,ventricularVolume: 50,  ecg: 0.00,  pcg: -0.30 }, // S2 decaimiento
    { time: 0.43,  aorticPressure: 86.0, ventricularPressure: 26,  atrialPressure: 11.5,ventricularVolume: 50,  ecg: 0.00,  pcg: 0.05 },  // S2 fin
    { time: 0.46,  aorticPressure: 85.5, ventricularPressure: 12,  atrialPressure: 10.0,ventricularVolume: 50,  ecg: 0.00,  pcg: 0.00 },
    { time: 0.475, aorticPressure: 85.2, ventricularPressure: 5,   atrialPressure: 8.0, ventricularVolume: 50,  ecg: 0.00,  pcg: 0.00 },

    // --- LLENADO PASIVO RÁPIDO: Tercer Ruido Cardíaco (S3) ---
    { time: 0.48,  aorticPressure: 85.0, ventricularPressure: 4,   atrialPressure: 7.0, ventricularVolume: 52,  ecg: 0.00,  pcg: 0.00 }, // AM
    { time: 0.51,  aorticPressure: 84.0, ventricularPressure: 3,   atrialPressure: 3.0, ventricularVolume: 74,  ecg: 0.00,  pcg: 0.08 }, // inicio S3
    { time: 0.55,  aorticPressure: 83.0, ventricularPressure: 3.5, atrialPressure: 3.0, ventricularVolume: 98,  ecg: 0.00,  pcg: -0.10 },// pico S3 (llenado rápido)
    { time: 0.62,  aorticPressure: 82.0, ventricularPressure: 4,   atrialPressure: 3.5, ventricularVolume: 108, ecg: 0.00,  pcg: 0.02 }, // fin S3

    // --- DIASTASIS ---
    { time: 0.70,  aorticPressure: 81.0, ventricularPressure: 5,   atrialPressure: 4.0, ventricularVolume: 115, ecg: 0.00,  pcg: 0.00 },
    { time: 0.80,  aorticPressure: 80.0, ventricularPressure: 6,   atrialPressure: 4.0, ventricularVolume: 120, ecg: 0.00,  pcg: 0.00 },
  ] as WiggersDataPoint[]
}; 

const CYCLE_LENGTH = 0.8;

function buildTwoCycleData(base: typeof textbookWiggersData) {
  const cycle2 = base.timeseries
    .filter((d) => d.time > 0)
    .map((d) => ({ ...d, time: Number((d.time + CYCLE_LENGTH).toFixed(3)) }));

  const phases2 = base.phases.map((p) => ({
    ...p,
    start: Number((p.start + CYCLE_LENGTH).toFixed(3)),
    end: Number((p.end + CYCLE_LENGTH).toFixed(3)),
  }));

  const events2 = base.events.map((e) => ({
    ...e,
    time: Number((e.time + CYCLE_LENGTH).toFixed(3)),
  }));

  return {
    timeseries: [...base.timeseries, ...cycle2],
    phases: [...base.phases, ...phases2],
    events: [...base.events, ...events2],
  };
}

export const textbookWiggersDataTwoCycles = buildTwoCycleData(textbookWiggersData);