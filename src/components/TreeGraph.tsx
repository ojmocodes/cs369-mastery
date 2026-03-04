import { useMemo, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
  type NodeProps,
  Handle,
  Position,
  MarkerType,
} from '@xyflow/react';
// @ts-ignore - CSS import handled by Vite
import '@xyflow/react/dist/style.css';
import type { TreeData, NodeStatus } from '../types';
import { useAppState } from '../context/AppContext';
import { getTierColor } from '../utils/treeUtils';

// ─── Layout computation ──────────────────────────────────────────

interface LayoutNode {
  id: string;
  tier: string;
  tierOrder: number;
  label: string;
}

function computeLayout(nodes: LayoutNode[], treeData: TreeData): Record<string, { x: number; y: number }> {
  // Group by tier order
  const tierGroups: Record<number, LayoutNode[]> = {};
  for (const n of nodes) {
    if (!tierGroups[n.tierOrder]) tierGroups[n.tierOrder] = [];
    tierGroups[n.tierOrder].push(n);
  }

  const positions: Record<string, { x: number; y: number }> = {};
  const nodeWidth = 180;
  const nodeHeight = 50;
  const xGap = 20;
  const yGap = 110;

  // Build a topological sort-based ordering per tier
  // Use adjacency to group related nodes together within tiers
  const tierOrders = Object.keys(tierGroups).map(Number).sort();

  for (const tierIdx of tierOrders) {
    const group = tierGroups[tierIdx];

    // Sort within tier: try to keep nodes near their prerequisites/children
    // Use a simple heuristic: order by the average x position of prerequisites
    group.sort((a, b) => {
      const aPrereqs = treeData.nodes.find(n => n.id === a.id)?.prerequisites || [];
      const bPrereqs = treeData.nodes.find(n => n.id === b.id)?.prerequisites || [];

      // Get positions of prereqs (from previous tiers)
      const aAvgX = aPrereqs.reduce((sum, pre) => sum + (positions[pre]?.x ?? 0), 0) / Math.max(aPrereqs.length, 1);
      const bAvgX = bPrereqs.reduce((sum, pre) => sum + (positions[pre]?.x ?? 0), 0) / Math.max(bPrereqs.length, 1);

      return aAvgX - bAvgX;
    });

    const totalWidth = group.length * (nodeWidth + xGap) - xGap;
    const startX = -totalWidth / 2;

    for (let i = 0; i < group.length; i++) {
      positions[group[i].id] = {
        x: startX + i * (nodeWidth + xGap),
        y: tierIdx * (nodeHeight + yGap),
      };
    }
  }

  return positions;
}

// ─── Custom node component ──────────────────────────────────────

interface CustomNodeData {
  label: string;
  status: NodeStatus;
  tier: string;
  treeData: TreeData;
  [key: string]: unknown;
}

function CustomNode({ data }: NodeProps<Node<CustomNodeData>>) {
  const { label, status, tier, treeData } = data;
  const tierColor = getTierColor(tier, treeData);

  const bgColor = {
    locked: '#1a1a24',
    unlocked: '#1a1a24',
    'in-progress': '#1a1a24',
    passed: tierColor + '20',
    mastered: '#292520',
  }[status];

  const borderColor = {
    locked: 'rgba(255,255,255,0.04)',
    unlocked: tierColor + '60',
    'in-progress': tierColor,
    passed: tierColor + '80',
    mastered: '#f59e0b80',
  }[status];

  const textColor = {
    locked: '#52525b',
    unlocked: '#d4d4d8',
    'in-progress': '#e4e4e7',
    passed: '#e4e4e7',
    mastered: '#fbbf24',
  }[status];

  const isPulsing = status === 'in-progress';

  return (
    <>
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-0 !w-2 !h-2" />
      <div
        className={`px-3 py-2 rounded-lg border cursor-pointer transition-all hover:brightness-110 ${
          isPulsing ? 'animate-pulse-border' : ''
        }`}
        style={{
          backgroundColor: bgColor,
          borderColor: borderColor,
          borderWidth: status === 'in-progress' ? 2 : 1,
          minWidth: 160,
          maxWidth: 180,
        }}
      >
        <div className="flex items-center gap-2">
          {/* Status icon */}
          <span className="shrink-0 text-xs">
            {status === 'locked' && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#52525b" stroke="none">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4" fill="none" stroke="#52525b" strokeWidth="2"/>
              </svg>
            )}
            {status === 'passed' && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={tierColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            )}
            {status === 'mastered' && <span className="text-amber-400">★</span>}
            {status === 'unlocked' && (
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tierColor }} />
            )}
            {status === 'in-progress' && (
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: tierColor }} />
            )}
          </span>
          {/* Label */}
          <span
            className="text-xs font-medium leading-tight"
            style={{ color: textColor }}
          >
            {label}
          </span>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-0 !w-2 !h-2" />
    </>
  );
}

const nodeTypes = { custom: CustomNode };

// ─── Main TreeGraph ─────────────────────────────────────────────

interface TreeGraphProps {
  treeData: TreeData;
  courseId: string;
  onSelectNode: (nodeId: string) => void;
  selectedNodeId: string | null;
}

export default function TreeGraph({ treeData, courseId, onSelectNode, selectedNodeId }: TreeGraphProps) {
  const { state } = useAppState();
  const nodeProgress = state.courses[courseId]?.nodeProgress ?? {};

  // Build layout
  const layoutNodes = useMemo(() => {
    return treeData.nodes.map(n => {
      const tier = treeData.tiers.find(t => t.id === n.tier);
      return {
        id: n.id,
        tier: n.tier,
        tierOrder: tier?.order ?? 0,
        label: n.label,
      };
    });
  }, [treeData]);

  const positions = useMemo(() => computeLayout(layoutNodes, treeData), [layoutNodes, treeData]);

  // React Flow nodes
  const flowNodes: Node<CustomNodeData>[] = useMemo(() => {
    return treeData.nodes.map(n => {
      const pos = positions[n.id] || { x: 0, y: 0 };
      const status = nodeProgress[n.id]?.status || 'locked';
      return {
        id: n.id,
        type: 'custom',
        position: pos,
        data: {
          label: n.label,
          status,
          tier: n.tier,
          treeData,
        },
        selected: n.id === selectedNodeId,
      };
    });
  }, [positions, nodeProgress, selectedNodeId, treeData]);

  // React Flow edges
  const flowEdges: Edge[] = useMemo(() => {
    return treeData.edges.map((e, i) => {
      const fromStatus = nodeProgress[e.from]?.status || 'locked';
      const isActive = fromStatus === 'passed' || fromStatus === 'mastered';
      return {
        id: `edge-${i}`,
        source: e.from,
        target: e.to,
        type: 'smoothstep',
        animated: isActive,
        style: {
          stroke: isActive ? '#6366f1' : 'rgba(255,255,255,0.06)',
          strokeWidth: isActive ? 1.5 : 1,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: isActive ? '#6366f1' : 'rgba(255,255,255,0.08)',
          width: 15,
          height: 15,
        },
      };
    });
  }, [treeData, nodeProgress]);

  const handleNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    onSelectNode(node.id);
  }, [onSelectNode]);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        nodeTypes={nodeTypes}
        onNodeClick={handleNodeClick}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.2}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
        defaultEdgeOptions={{ type: 'smoothstep' }}
      >
        <Background color="rgba(255,255,255,0.02)" gap={20} />
        <Controls
          showInteractive={false}
          className="!bg-[#1e1e28] !border-white/[0.06] !shadow-xl [&>button]:!bg-[#1e1e28] [&>button]:!border-white/[0.06] [&>button]:!text-zinc-400 [&>button:hover]:!bg-white/[0.06]"
        />
      </ReactFlow>
    </div>
  );
}
