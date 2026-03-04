import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Node, Link } from '../types';
import { useAppContext } from '../context/AppContext';
import NodeDetail from './NodeDetail';

interface SimNode extends d3.SimulationNodeDatum { id: string; label: string; group: string; mastered: boolean; description?: string; }
interface SimLink extends d3.SimulationLinkDatum<SimNode> { strength: number; }

const GROUP_COLORS: Record<string, string> = {
  foundations:   '#7c3aed',
  sequences:     '#2563eb',
  prob_models:   '#0891b2',
  subst_models:  '#059669',
  phylogenetics: '#d97706',
  mol_evolution: '#dc2626',
  struct_func:   '#7c3aed',
};

interface Props { nodes: Node[]; links: Link[]; }

export default function TreeGraph({ nodes, links }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const { isMastered } = useAppContext();

  useEffect(() => {
    if (!svgRef.current) return;
    const el = svgRef.current;
    const W = el.clientWidth || 900;
    const H = el.clientHeight || 600;

    d3.select(el).selectAll('*').remove();

    const simNodes: SimNode[] = nodes.map(n => ({ ...n }));
    const nodeMap = new Map(simNodes.map(n => [n.id, n]));
    const simLinks: SimLink[] = links
      .filter(l => nodeMap.has(l.source as string) && nodeMap.has(l.target as string))
      .map(l => ({ source: l.source as string, target: l.target as string, strength: l.strength }));

    const svg = d3.select(el)
      .attr('width', W).attr('height', H)
      .call(d3.zoom<SVGSVGElement, unknown>().scaleExtent([0.3, 3]).on('zoom', e => g.attr('transform', e.transform)))
      .append('g');
    const g = svg;

    const sim = d3.forceSimulation<SimNode>(simNodes)
      .force('link', d3.forceLink<SimNode, SimLink>(simLinks).id(d => d.id).distance(d => 120 - d.strength * 40).strength(d => d.strength * 0.3))
      .force('charge', d3.forceManyBody().strength(-280))
      .force('center', d3.forceCenter(W/2, H/2))
      .force('collision', d3.forceCollide(32));

    const link = g.selectAll('.link').data(simLinks).join('line')
      .attr('class', 'link')
      .attr('stroke', '#1e293b')
      .attr('stroke-width', d => d.strength * 2.5)
      .attr('stroke-opacity', d => 0.3 + d.strength * 0.5);

    const nodeG = g.selectAll('.node').data(simNodes).join('g')
      .attr('class', 'node')
      .style('cursor', 'pointer')
      .call(d3.drag<SVGGElement, SimNode>()
        .on('start', (event, d) => { if (!event.active) sim.alphaTarget(0.3).restart(); d.fx=d.x; d.fy=d.y; })
        .on('drag', (event, d) => { d.fx=event.x; d.fy=event.y; })
        .on('end', (event, d) => { if (!event.active) sim.alphaTarget(0); d.fx=null; d.fy=null; }))
      .on('click', (_, d) => setSelectedNode({ id: d.id, label: d.label, group: d.group, mastered: isMastered(d.id), description: d.description }));

    nodeG.append('circle')
      .attr('r', 14)
      .attr('fill', d => {
        const col = GROUP_COLORS[d.group] ?? '#7c3aed';
        return isMastered(d.id) ? '#10b981' : col + '33';
      })
      .attr('stroke', d => isMastered(d.id) ? '#10b981' : (GROUP_COLORS[d.group] ?? '#7c3aed'))
      .attr('stroke-width', 2);

    nodeG.append('text')
      .attr('dy', 26)
      .attr('text-anchor', 'middle')
      .style('font-size', '10px')
      .style('fill', 'var(--text-secondary)')
      .style('pointer-events', 'none')
      .text(d => d.label.length > 20 ? d.label.slice(0, 18) + '…' : d.label);

    sim.on('tick', () => {
      link.attr('x1', d => (d.source as SimNode).x!).attr('y1', d => (d.source as SimNode).y!)
          .attr('x2', d => (d.target as SimNode).x!).attr('y2', d => (d.target as SimNode).y!);
      nodeG.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    return () => { sim.stop(); };
  }, [nodes, links, isMastered]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', height: '100%' }} />
      <NodeDetail node={selectedNode} onClose={() => setSelectedNode(null)} />
    </div>
  );
}
