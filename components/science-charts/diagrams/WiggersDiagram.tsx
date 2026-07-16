// components/science-charts/diagrams/WiggersDiagram.tsx
'use client';

import { ScienceChart } from '../core/ScienceChart';
import { Axis } from '../core/Axis';
import { Curve } from '../core/Curve';
import { Panel } from '../core/Panel';
import { StackedPanels } from '../core/StackedPanels';
import { PhaseBand, EventLine } from '../core/Annotations';
import { textbookWiggersData } from './data/wiggers';

export interface WiggersDiagramProps {
  data?: typeof textbookWiggersData;
  height?: number;
}

export function WiggersDiagram({ data = textbookWiggersData, height = 580 }: WiggersDiagramProps) {
  return (
    <div className="w-full my-6 font-sans">
      
      {/* 1. LIENZO VECTORIAL COMPLETO (3 PANELES APILADOS) */}
      <ScienceChart
        domainX={[0, 0.8]} 
        height={height}
        minWidth={640}     
        title="Diagrama de Wiggers: Ciclo Cardíaco Izquierdo"
        subtitle="Sincronización total: Hemodinámica, Volumen Ventricular y Electrocardiograma"
      >
        {/* --- CAPA DE FONDO Y EVENTOS (Atraviesan todos los paneles) --- */}
        {data.phases.map((phase, idx) => (
          <PhaseBand
            key={idx}
            start={phase.start}
            end={phase.end}
            label={phase.code}
            labelY={16}
            className={idx % 2 === 0 
              ? 'fill-neutral-500 dark:fill-neutral-400 opacity-[0.04]' 
              : 'fill-neutral-500 dark:fill-neutral-400 opacity-[0.09]'}
          />
        ))}

        {data.events.map((ev, idx) => (
          <EventLine
            key={idx}
            x={ev.time}
            label={ev.code}
            labelY={32}
            textAnchor={idx % 2 === 0 ? 'end' : 'start'} 
            dx={idx % 2 === 0 ? -4 : 4}                  
            className="stroke-rose-500/70 dark:stroke-rose-400/70 stroke-dashed stroke-1"
          />
        ))}

        {/* --- SISTEMA DE PANELES APILADOS --- */}
        <StackedPanels gap={24}>
          
          {/* PANEL 1: PRESIONES HEMODINÁMICAS (200px altura) */}
          <Panel domainY={[0, 160]} height={200} top={0}>
            <Axis orientation="left" ticks={[0, 40, 80, 120]} label="Presión (mmHg)" />
            
            {/* Presión Aórtica */}
            <Curve
              data={data.timeseries}
              x={(d) => d.time}
              y={(d) => d.aorticPressure}
              curve="monotone"
              className="stroke-rose-600 dark:stroke-rose-400 stroke-2 fill-none"
            />
            {/* Presión Ventricular */}
            <Curve
              data={data.timeseries}
              x={(d) => d.time}
              y={(d) => d.ventricularPressure}
              curve="monotone"
              className="stroke-blue-600 dark:stroke-blue-400 stroke-2 fill-none"
            />
            {/* Presión Auricular */}
            <Curve
              data={data.timeseries}
              x={(d) => d.time}
              y={(d) => d.atrialPressure}
              curve="monotone"
              className="stroke-amber-500 dark:stroke-amber-400 stroke-[1.5] fill-none"
            />
          </Panel>

          {/* PANEL 2: VOLUMEN VENTRICULAR (130px altura, Piso en 40 mL) */}
          <Panel domainY={[40, 150]} height={130} top={0}>
            <Axis orientation="left" ticks={[50, 90, 130]} label="Volumen (mL)" />
            
            {/* Relleno de Área Esmeralda */}
            <Curve
              data={data.timeseries}
              x={(d) => d.time}
              y={(d) => d.ventricularVolume}
              y0={40} // El piso del área se ancla en los 40 mL
              type="area"
              curve="monotone"
              className="fill-emerald-500/10 dark:fill-emerald-500/15"
            />
            {/* Trazo del borde */}
            <Curve
              data={data.timeseries}
              x={(d) => d.time}
              y={(d) => d.ventricularVolume}
              curve="monotone"
              className="stroke-emerald-600 dark:stroke-emerald-400 stroke-2 fill-none"
            />
          </Panel>

          {/* PANEL 3: ELECTROCARDIOGRAMA - ECG (110px altura) */}
          <Panel domainY={[-0.6, 1.8]} height={110} top={0}>
            <Axis orientation="left" ticks={[-0.5, 0, 1.5]} label="ECG (mV)" />
            
            {/* Línea isoeléctrica (0 mV) de referencia visual */}
            <Curve
              data={[{ time: 0, ecg: 0 }, { time: 0.8, ecg: 0 }]}
              x={(d) => d.time}
              y={(d) => d.ecg}
              curve="linear"
              className="stroke-neutral-300 dark:stroke-neutral-700 stroke-1 stroke-dashed fill-none"
            />

            {/* Trazo ECG P-QRS-T */}
            <Curve
              data={data.timeseries}
              x={(d) => d.time}
              y={(d) => d.ecg}
              curve="monotone"
              className="stroke-violet-600 dark:stroke-violet-400 stroke-2 fill-none"
            />
          </Panel>

        </StackedPanels>

        {/* EJE TEMPORAL GLOBAL EN LA BASE DE TODOS LOS PANELES */}
        <Axis 
          orientation="bottom" 
          ticks={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]} 
          label="Tiempo (s)" 
        />
      </ScienceChart>

      {/* 2. LEYENDA CLÍNICA HTML (MAQUETADO EDITORIAL RESPONSIVO) */}
      <div className="mt-4 p-4 rounded-lg bg-fd-card border border-fd-border text-xs text-fd-muted-foreground space-y-4">
        
        {/* Guía Rápida de Curvas y Canales */}
        <div className="pb-3 border-b border-fd-border/50 flex flex-wrap gap-x-6 gap-y-2 items-center justify-start font-medium">
          <span className="text-fd-foreground font-semibold">Canales:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block shrink-0" />
            <span className="text-rose-600 dark:text-rose-400">Presión Aórtica</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block shrink-0" />
            <span className="text-blue-600 dark:text-blue-400">Presión Ventricular</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block shrink-0" />
            <span className="text-amber-600 dark:text-amber-400">Presión Auricular</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shrink-0" />
            <span className="text-emerald-600 dark:text-emerald-400">Volumen (EDV 130 / ESV 50 mL)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-500 inline-block shrink-0" />
            <span className="text-violet-600 dark:text-violet-400">ECG (Ondas P, QRS, T)</span>
          </div>
        </div>

        {/* Sección Fases */}
        <div>
          <h5 className="font-mono font-semibold text-fd-foreground mb-2 uppercase tracking-wider">
            Fases del Ciclo Cardíaco
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.phases.map((p, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="font-mono font-bold px-1.5 py-0.5 rounded bg-neutral-500/10 text-neutral-800 dark:text-neutral-200 shrink-0">
                  {p.code}
                </span>
                <div>
                  <strong className="text-fd-foreground block">{p.label}</strong>
                  <span>{p.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sección Eventos Valvulares */}
        <div className="pt-2 border-t border-fd-border/50">
          <h5 className="font-mono font-semibold text-rose-600 dark:text-rose-400 mb-2 uppercase tracking-wider">
            Hitos y Eventos Valvulares
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.events.map((e, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="font-mono font-bold px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 shrink-0">
                  {e.code}
                </span>
                <div>
                  <strong className="text-fd-foreground block">{e.label}</strong>
                  <span>{e.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}