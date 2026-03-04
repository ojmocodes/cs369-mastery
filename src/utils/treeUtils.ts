import { Node, Link } from '../types';

export function getConnectedNodes(nodeId: string, links: Link[]): string[] {
  return links
    .filter(l => l.source === nodeId || l.target === nodeId)
    .map(l => l.source === nodeId ? l.target : l.source) as string[];
}

export function getMasteryStats(nodes: Node[], masteredMap: Record<string, boolean>) {
  const total = nodes.length;
  const mastered = nodes.filter(n => masteredMap[n.id]).length;
  return { total, mastered, percent: total > 0 ? Math.round(mastered / total * 100) : 0 };
}

export function groupNodes(nodes: Node[]): Record<string, Node[]> {
  return nodes.reduce((acc, n) => {
    if (!acc[n.group]) acc[n.group] = [];
    acc[n.group].push(n);
    return acc;
  }, {} as Record<string, Node[]>);
}
