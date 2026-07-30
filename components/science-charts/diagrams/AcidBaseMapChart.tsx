// components/science-charts/diagrams/AcidBaseMapChart.tsx
'use client';

import { ScienceChart } from '../core/ScienceChart';
import { Axis } from '../core/Axis';
import { Curve } from '../core/Curve';
import { Marker, EventLine, HorizontalEventLine, CurveEndLabel } from '../core/Annotations';
import { computeLabelAngle, findClosestIndexByPh } from '../core/utils/nomogramMath';
import { acidBaseGridCurves } from './data/acidBaseMap';
import { useChartContext } from '../core/context';

function GridLayer({ curve }: { curve: typeof acidBaseGridCurves[0] }) {
  const { xScale, yScale } = useChartContext();
  
  if (!curve.labelConfig) return null;
  const labelIndex = findClosestIndexByPh(curve.data, curve.labelConfig.targetPh);
  const point = curve.data[labelIndex];
  const angle = computeLabelAngle(curve.data, labelIndex, xScale, yScale, 'pH', 'hco3');

  return (
    <g>
      <Curve
        data={curve.data}
        x={(d) => d.pH}
        y={(d) => d.hco3}
        className={`fill-none ${curve.theme.stroke} ${curve.theme.strokeWidth || ''}`}
      />
      <CurveEndLabel
        x={point.pH}
        y={point.hco3}
        label={curve.label}
        angle={angle}
        className="text-[9px] font-sans fill-neutral-500 dark:fill-neutral-400 select-none"
        textAnchor={curve.labelConfig.textAnchor}
        dx={-6}
        dy={8}
      />
    </g>
  );
}

export function AcidBaseMapChart() {
  const patient = { pH: 7.537, hco3: 42 };

  const hTicks = [100, 90, 80, 70, 60, 50, 40, 30, 20];
  const hTicksInPh = hTicks.map((h) => 9 - Math.log10(h));

  return (
    <ScienceChart
      domainX={[7.0, 7.8]}
      domainY={[0, 60]}
      height={480}
      minWidth={500}
      scaleTypeX="linear"
      scaleTypeY="linear"
      margin={{ top: 60, right: 60, bottom: 70, left: 60 }}
      title="Mapa Ácido-Base"
      subtitle="Evaluación del estado metabólico y respiratorio"
      badge="Fisiología"
    >
      <Axis orientation="bottom" label="pH Arterial" numTicks={8} />
      <Axis 
        orientation="top" 
        ticks={hTicksInPh} 
        tickFormat={(val) => Math.round(Math.pow(10, 9 - val)).toString()} 
        label="[H⁺] (nmol/L)" 
      />
      
      <Axis orientation="left" label="HCO₃⁻ (mEq/L)" numTicks={12} />

      {acidBaseGridCurves.map((curve) => (
        <GridLayer key={curve.id} curve={curve} />
      ))}

      <HorizontalEventLine y={patient.hco3} label={`${patient.hco3}`} />
      <EventLine x={patient.pH} label={`${patient.pH}`} dx={6} />
      <Marker x={patient.pH} y={patient.hco3} type="intersection" className="fill-rose-500" />
      
    </ScienceChart>
  );
}