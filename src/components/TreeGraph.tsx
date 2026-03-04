import { useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  type NodeTypes,
  type Node,
  type Edge,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useApp } from '../context/AppContext';
import { treeData } from '../data/tree';
import type { NodeStatus } from '../types';

const STATUS_COLORS: Record<NodeStatus, { border: string; bg: string; text: string; glow?: string }> = {
  locked:        { border: '#3f3f46', bg: '#18181b', text: '#52525b' },
  unlocked:      { border: '#6366f1', bg: '#1e1b4b', text: '#a5b4fc' },
  'in-progress': { border: '#6366f1', bg: '#1e1b4b', text: '#c7d2fe', glow: '0 0 12px rgba(99,102,241,0.4)' },
  passed:        { border: '#22c55e', bg: '#052e16', text: '#4ade80' },
  mastered:      { border: '#f59e0b', bg: '#1c1003', text: '#fbbf24', glow: '0 0 16px rgba(245,158,11,0.35)' },
};

const TIER_X: Record<string, number> = {
  foundations: 0,
  core: 350,
  advanced: 700,
  applications: 1050,
};

function buildLayout(): { nodes: Node[]; edges: Edge[] } {
  const tierCounts: Record<string, number> = {};
  const tierOffsets: Record<string, number> = {};

  treeData.tiers.forEach(t => {
    const nodes = treeData.nodes.filter(n => n.tier === t.id);
    tierCounts[t.id] = nodes.length;
    tierOffsets[t.id] = 0;
  });

  const NODE_HEIGHT = 60;
  const GAP = 20;

  const tierNodeIndex: Record<string, number> = {};
  treeData.tiers.forEach(t => { tierNodeIndex[t.id] = 0; });

  const rfNodes: Node[] = treeData.nodes.map(node => {
    const idx = tierNodeIndex[node.tier]++;
    const totalInTier = tierCounts[node.tier];
    const totalHeight = totalInTier * (NODE_HEIGHT + GAP) - GAP;
    const startY = -totalHeight / 2;
    const y = startY + idx * (NODE_HEIGHT + GAP);
    const x = TIER_X[node.tier] ?? 0;

    return {
      id: node.id,
      type: 'custom',
      position: { x, y },
      data: { label: node.label, tier: node.tier, nodeId: node.id },
    };
  });

  const rfEdges: Edge[] = treeData.edges.map(e => ({
    id: `${e.source}-${e.target}`,
    source: e.source,
    target: e.target,
    type: 'smoothstep',
    style: { stroke: '#3f3f46', strokeWidth: 1.5 },
    animated: false,
  }));

  return { nodes: rfNodes, edges: rfEdges };
}

function CustomNode({ data, selected }: { data: any; selected: boolean }) {
  const { getNodeStatus } = useApp();
  const status = getNodeStatus(data.nodeId);
  const colors = STATUS_COLORS[status];
  const tierColor = treeData.tiers.find(t => t.id === data.tier)?.color ?? '#6366f1';

  return (
    <div
      style={{
        border: `1.5px solid ${selected ? '#818cf8' : colors.border}`,
        background: colors.bg,
        boxShadow: selected ? `0 0 0 2px #6366f1, ${colors.glow ?? ''}` : (colors.glow ?? 'none'),
        borderRadius: 8,
        padding: '8px 12px',
        minWidth: 160,
        maxWidth: 220,
        cursor: 'pointer',
        transition: 'all 0.15s',
      }}
      className={status === 'in-progress' ? 'animate-pulse-border' : ''}
    >
      {/* Tier dot */}
      <div className="flex items-center gap-1.5 mb-1">
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: tierColor, display: 'inline-block', flexShrink: 0 }} />
        <span style={{ fontSize: 9, color: tierColor, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
          {data.tier}
        </span>
      </div>
      {/* Label */}
      <div style={{ fontSize: 12, color: colors.text, fontWeight: 500, lineHeight: 1.3 }}>
        {data.label}
      </div>
      {/* Status indicator */}
      {status === 'passed' && (
        <div style={{ fontSize: 10, color: '#4ade80', marginTop: 3 }}>✓ Passed</div>
      )}
      {status === 'mastered' && (
        <div style={{ fontSize: 10, color: '#fbbf24', marginTop: 3 }}>★ Mastered</div>
      )}
      {status === 'locked' && (
        <div style={{ fontSize: 10, color: '#52525b', marginTop: 3 }}>🔒</div>
      )}
    </div>
  );
}

const nodeTypes: NodeTypes = { custom: CustomNode as any };

interface TreeGraphProps {
  onSelectNode: (id: string) => void;
  selectedNodeId: string | null;
}

export default function TreeGraph({ onSelectNode, selectedNodeId }: TreeGraphProps) {
  const { state } = useApp();
  const { nodes: initialNodes, edges: initialEdges } = buildLayout();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  // Re-render nodes when state changes (to update colors)
  useEffect(() => {
    setNodes(prev => prev.map(n => ({ ...n, data: { ...n.data } })));
  }, [state.progress]);

  const onNodeClick = useCallback((_: any, node: Node) => {
    onSelectNode(node.id);
  }, [onSelectNode]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      nodeTypes={nodeTypes}
      fitView
      fitViewOptions={{ padding: 0.2 }}
      minZoom={0.3}
      maxZoom={2}
      style={{ background: '#0f0f14' }}
      proOptions={{ hideAttribution: true }}
    >
      <Background color="#ffffff08" gap={24} size={1} />
      <Controls
        style={{ background: '#16161e', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}
        showInteractive={false}
      />
    </ReactFlow>
  );
}
