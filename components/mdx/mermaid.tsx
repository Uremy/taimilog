import { renderMermaidSVG } from 'beautiful-mermaid';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';

function getDiagramType(chart: string): string {
  const firstLine = chart.trim().split('\n')[0]?.toLowerCase() ?? '';

  if (firstLine.startsWith('flowchart') || firstLine.startsWith('graph')) return 'flowchart';
  if (firstLine.startsWith('sequencediagram')) return 'sequence';
  if (firstLine.startsWith('classdiagram')) return 'class';
  if (firstLine.startsWith('statediagram')) return 'state';
  if (firstLine.startsWith('erdiagram')) return 'er';
  if (firstLine.startsWith('gantt')) return 'gantt';
  if (firstLine.startsWith('pie')) return 'pie';
  return 'diagram';
}

const LABELS: Record<string, string> = {
  flowchart: 'Diagrama de flujo',
  sequence: 'Secuencia',
  class: 'Diagrama de clases',
  state: 'Diagrama de estados',
  er: 'Entidad-relación',
  gantt: 'Cronograma',
  pie: 'Distribución',
  diagram: 'Diagrama',
};

// Intensidad del acento (mezcla con fd-primary) por categoría,
// para diferenciar visualmente sin salir de tu duotono
const ACCENT_MIX: Record<string, string> = {
  flowchart: '55%',
  sequence: '40%',
  class: '30%',
  state: '45%',
  er: '35%',
  gantt: '25%',
  pie: '50%',
  diagram: '20%',
};

export async function Mermaid({ chart, title }: { chart: string; title?: string }) {
  try {
    const cleanChart = chart.replaceAll('\\n', '\n').trim();
    const type = getDiagramType(cleanChart);

    const svg = await renderMermaidSVG(cleanChart, {
      bg: 'var(--color-fd-background)',
      fg: 'var(--color-fd-foreground)',
      interactive: true,
      transparent: true,
    });

    return (
      <figure className="not-prose my-8 overflow-hidden rounded-[var(--radius)] border border-fd-border bg-fd-card">
        <figcaption className="flex items-center justify-between border-b border-fd-border/60 bg-fd-accent/40 px-4 py-2">
          <span className="font-mono text-[11px] uppercase tracking-widest text-fd-accent-foreground">
            {title ?? LABELS[type]}
          </span>
          <span
            className="rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-fd-primary-foreground"
            style={{
              backgroundColor: `color-mix(in oklch, var(--color-fd-primary) ${ACCENT_MIX[type]}, transparent)`,
            }}
            aria-hidden
          >
            {type}
          </span>
        </figcaption>

        <div
          className="relative overflow-x-auto px-6 py-3 [&>svg]:mx-auto [&>svg]:max-w-none mermaid-in"
          style={{
            backgroundImage:
              'radial-gradient(circle, var(--color-fd-border) 1px, transparent 1px)',
            backgroundSize: '18px 18px',
            backgroundPosition: 'center',
          }}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </figure>
    );
  } catch (error) {
    console.error('🚨 Error en beautiful-mermaid:', error);

    return (
      <CodeBlock title={title ?? 'Mermaid Error'}>
        <Pre>{chart}</Pre>
      </CodeBlock>
    );
  }
}