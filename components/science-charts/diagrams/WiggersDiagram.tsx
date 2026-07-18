'use client';

import { ScienceChart } from '../core/ScienceChart';
import { Axis } from '../core/Axis';
import { Curve } from '../core/Curve';
import { Panel } from '../core/Panel';
import { StackedPanels } from '../core/StackedPanels';
import { PhaseBand, EventLine } from '../core/Annotations';
import { textbookWiggersDataTwoCycles } from './data/wiggers';

export interface WiggersDiagramProps {
  data?: typeof textbookWiggersDataTwoCycles;
  height?: number;
}

export function WiggersDiagram({ data = textbookWiggersDataTwoCycles, height = 660 }: WiggersDiagramProps) {
  const maxTime = data.timeseries[data.timeseries.length - 1]?.time || 1.6;
  const timeTicks = Array.from({ length: Math.round(maxTime / 0.2) + 1 }, (_, i) => Number((i * 0.2).toFixed(1)));

  return (
    <div className="w-full my-6 font-sans">
      
      {/* 1. LIENZO VECTORIAL COMPLETO (4 PANELES APILADOS) */}
      <ScienceChart
        domainX={[0, maxTime]} 
        height={height}
        minWidth={640}     
        title="Diagrama de Wiggers: Ciclo Cardíaco Izquierdo"
        subtitle="Sincronización total: Hemodinámica, Volumen, ECG y Fonocardiograma (2 Ciclos)"
      >
        {/* --- CAPA DE FONDO Y EVENTOS --- */}
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
          
          {/* PANEL 1: PRESIONES HEMODINÁMICAS (180px altura) */}
          <Panel domainY={[0, 160]} height={180} top={0}>
            <Axis orientation="left" ticks={[0, 40, 80, 120]} label="Presión (mmHg)" />
            
            <Curve
              data={data.timeseries}
              x={(d) => d.time}
              y={(d) => d.aorticPressure}
              curve="monotone"
              className="stroke-rose-600 dark:stroke-rose-400 stroke-2 fill-none"
            />
            <Curve
              data={data.timeseries}
              x={(d) => d.time}
              y={(d) => d.ventricularPressure}
              curve="monotone"
              className="stroke-blue-600 dark:stroke-blue-400 stroke-2 fill-none"
            />
            <Curve
              data={data.timeseries}
              x={(d) => d.time}
              y={(d) => d.atrialPressure}
              curve="monotone"
              className="stroke-amber-500 dark:stroke-amber-400 stroke-[1.5] fill-none"
            />
          </Panel>

          {/* PANEL 2: VOLUMEN VENTRICULAR (120px altura) */}
          <Panel domainY={[40, 150]} height={120} top={0}>
            <Axis orientation="left" ticks={[50, 90, 130]} label="Volumen (mL)" />
            
            <Curve
              data={data.timeseries}
              x={(d) => d.time}
              y={(d) => d.ventricularVolume}
              y0={40}
              type="area"
              curve="monotone"
              className="fill-emerald-500/10 dark:fill-emerald-500/15"
            />
            <Curve
              data={data.timeseries}
              x={(d) => d.time}
              y={(d) => d.ventricularVolume}
              curve="monotone"
              className="stroke-emerald-600 dark:stroke-emerald-400 stroke-2 fill-none"
            />
          </Panel>

          {/* PANEL 3: ELECTROCARDIOGRAMA - ECG (100px altura) */}
          <Panel domainY={[-0.6, 1.8]} height={100} top={0}>
            <Axis orientation="left" ticks={[-0.5, 0, 1.5]} label="ECG (mV)" />
            
            <Curve
              data={[{ time: 0, ecg: 0 }, { time: maxTime, ecg: 0 }]}
              x={(d) => d.time}
              y={(d) => d.ecg}
              curve="linear"
              className="stroke-neutral-300 dark:stroke-neutral-700 stroke-1 stroke-dashed fill-none"
            />
            <Curve
              data={data.timeseries}
              x={(d) => d.time}
              y={(d) => d.ecg}
              curve="monotone"
              className="stroke-violet-600 dark:stroke-violet-400 stroke-2 fill-none"
            />
          </Panel>

          {/* PANEL 4: FONOCARDIOGRAMA - PCG (80px altura) [NUEVO] */}
          <Panel domainY={[-1.2, 1.2]} height={80} top={0}>
            <Axis orientation="left" ticks={[-1, 0, 1]} label="PCG (S1-S4)" />
            
            <Curve
              data={[{ time: 0, pcg: 0 }, { time: maxTime, pcg: 0 }]}
              x={(d) => d.time}
              y={(d) => d.pcg}
              curve="linear"
              className="stroke-neutral-300 dark:stroke-neutral-700 stroke-1 stroke-dashed fill-none"
            />
            <Curve
              data={data.timeseries}
              x={(d) => d.time}
              y={(d) => d.pcg}
              curve="monotone"
              className="stroke-cyan-600 dark:stroke-cyan-400 stroke-[1.5] fill-none"
            />
          </Panel>

        </StackedPanels>

        {/* EJE TEMPORAL GLOBAL EN LA BASE */}
        <Axis 
          orientation="bottom" 
          ticks={timeTicks} 
          label="Tiempo (s)" 
        />
      </ScienceChart>

      {/* 2. LEYENDA CLÍNICA HTML */}
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
            <span className="text-emerald-600 dark:text-emerald-400">Volumen (130/50 mL)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-500 inline-block shrink-0" />
            <span className="text-violet-600 dark:text-violet-400">ECG</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block shrink-0" />
            <span className="text-cyan-600 dark:text-cyan-400">Fonocardiograma (PCG)</span>
          </div>
        </div>

        {/* Sección Fases */}
        <div>
          <h5 className="font-mono font-semibold text-fd-foreground mb-2 uppercase tracking-wider">
            Fases del Ciclo Cardíaco
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.phases.slice(0, 5).map((p, i) => (
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

        {/* Sección Eventos y Auscultación */}
        <div className="pt-2 border-t border-fd-border/50 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h5 className="font-mono font-semibold text-rose-600 dark:text-rose-400 mb-2 uppercase tracking-wider">
              Hitos Valvulares
            </h5>
            <div className="space-y-2.5">
              {data.events.slice(0, 4).map((e, i) => (
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

          {/* Nueva Sub-sección Auscultación */}
          <div>
            <h5 className="font-mono font-semibold text-cyan-600 dark:text-cyan-400 mb-2 uppercase tracking-wider">
              Auscultación y Ruidos (PCG)
            </h5>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <span className="font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shrink-0">
                  S1
                </span>
                <div>
                  <strong className="text-fd-foreground block">Primer Ruido ("Lub")</strong>
                  <span>Cierre abrupto de las válvulas auriculoventriculares (mitral/tricuspídea) al inicio de sístole.</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shrink-0">
                  S2
                </span>
                <div>
                  <strong className="text-fd-foreground block">Segundo Ruido ("Dub")</strong>
                  <span>Cierre de válvulas semilunares (aorta/pulmonar) en incisura dícrota. Breve y de alta frecuencia.</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shrink-0">
                  S3 / S4
                </span>
                <div>
                  <strong className="text-fd-foreground block">Ruidos Diastólicos (Sutiles)</strong>
                  <span><strong>S3:</strong> Desaceleración del llenado pasivo rápido. <strong>S4:</strong> Vibración por impacto del flujo de la sístole auricular.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}