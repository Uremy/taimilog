// components/science-charts/diagrams/WiggersDiagram.tsx
'use client';

import { ScienceChart } from '../core/ScienceChart';
import { Axis } from '../core/Axis';
import { Curve } from '../core/Curve';
import { Panel } from '../core/Panel';
import { StackedPanels } from '../core/StackedPanels';
import { PhaseBand, EventLine, Marker } from '../core/Annotations';
import { textbookWiggersData } from './data/wiggers';

export interface WiggersDiagramProps {
  data?: typeof textbookWiggersData;
  height?: number;
}

export function WiggersDiagram({ data = textbookWiggersData, height = 540 }: WiggersDiagramProps) {
  return (
    <ScienceChart
      domainX={[0, 0.8]} // Eje X global compartida: 0.0s a 0.8s (Ciclo Cardíaco)
      height={height}
      minWidth={640}     // Wiggers requiere ancho para no aplastar las 5 fases
      title="Diagrama de Wiggers: Ciclo Cardíaco Izquierdo"
      subtitle="Sincronización de hemodinámica aórtica/ventricular, volumen y electrocardiograma"
    >
      {/* 1. CAPA DE FONDO: Fases del Ciclo Cardíaco (atraviesan todos los paneles) */}
      {data.phases.map((phase, idx) => (
        <PhaseBand
          key={idx}
          start={phase.start}
          end={phase.end}
          label={idx % 2 === 0 ? phase.label : ''} // Alternamos etiquetas para no saturar el techo
          className={idx % 2 === 0 ? 'fill-neutral-500/5' : 'fill-neutral-500/10'}
        />
      ))}

      {/* 2. CAPA DE EVENTOS: Cierres y aperturas valvulares S1/S2 */}
      {data.events.map((ev, idx) => (
        <EventLine
          key={idx}
          x={ev.time}
          label={ev.label}
          className="stroke-rose-500/50 dark:stroke-rose-400/50 stroke-dashed stroke-1"
        />
      ))}

      {/* 3. CAPA HEAVY DUTY: PANELES APILADOS CON SU PROPIO DOMINIO Y */}
      <StackedPanels gap={24}>
        
        {/* PANEL 1: PRESIONES (mmHg) - 200px altura */}
        <Panel domainY={[0, 140]} height={200} top={0}>
          <Axis orientation="left" ticks={[0, 40, 80, 120]} label="Presión (mmHg)" />
          
          {/* Presión Aórtica (Roja) */}
          <Curve
            data={data.timeseries}
            x={(d) => d.time}
            y={(d) => d.aorticPressure}
            curve="monotone"
            className="stroke-rose-600 dark:stroke-rose-400 stroke-2 fill-none"
          />
          {/* Presión Ventricular (Azul - Sube agresivamente en sístole) */}
          <Curve
            data={data.timeseries}
            x={(d) => d.time}
            y={(d) => d.ventricularPressure}
            curve="monotone"
            className="stroke-blue-600 dark:stroke-blue-400 stroke-2 fill-none"
          />
          {/* Presión Auricular (Amarilla/Ámbar - Onda a, c, v) */}
          <Curve
            data={data.timeseries}
            x={(d) => d.time}
            y={(d) => d.atrialPressure}
            curve="monotone"
            className="stroke-amber-500 stroke-[1.5] fill-none"
          />
          
          <Marker x={0.25} y={120} label="Presión Sistólica (120)" className="fill-rose-500" />
        </Panel>

        {/* PANEL 2: VOLUMEN VENTRICULAR (mL) - 120px altura */}
        <Panel domainY={[40, 140]} height={120} top={0}>
          <Axis orientation="left" ticks={[50, 90, 130]} label="Volumen (mL)" />
          
          <Curve
            data={data.timeseries}
            x={(d) => d.time}
            y={(d) => d.ventricularVolume}
            y0={40}
            type="area"
            curve="monotone"
            className="fill-emerald-500/10 dark:fill-emerald-500/20"
          />
          <Curve
            data={data.timeseries}
            x={(d) => d.time}
            y={(d) => d.ventricularVolume}
            curve="monotone"
            className="stroke-emerald-600 dark:stroke-emerald-400 stroke-2 fill-none"
          />
        </Panel>

        {/* PANEL 3: ELECTROCARDIOGRAMA (mV) - 100px altura */}
        <Panel domainY={[-0.6, 1.6]} height={100} top={0}>
          <Axis orientation="left" ticks={[-0.5, 0, 1.5]} label="ECG (mV)" />
          <Axis orientation="bottom" ticks={[0, 0.2, 0.4, 0.6, 0.8]} label="Tiempo (s)" />
          
          <Curve
            data={data.timeseries}
            x={(d) => d.time}
            y={(d) => d.ecg}
            curve="monotone"
            className="stroke-neutral-800 dark:stroke-neutral-200 stroke-[1.5] fill-none"
          />
          <Marker x={0.12} y={1.5} label="QRS" className="fill-neutral-800 dark:fill-neutral-200" />
          <Marker x={0.35} y={0.35} label="Onda T" className="fill-neutral-500" />
        </Panel>

      </StackedPanels>
    </ScienceChart>
  );
}