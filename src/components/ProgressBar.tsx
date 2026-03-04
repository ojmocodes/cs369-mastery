import { useApp } from '../context/AppContext';
import { treeData } from '../data/tree';
import type { NodeStatus } from '../types';

const STATUS_CONFIG: Record<NodeStatus, { label: string; color: string; bg: string }> = {
  locked:      { label: 'Locked',      color: 'text-zinc-600', bg: 'bg-zinc-800' },
  unlocked:    { label: 'Unlocked',    color: 'text-indigo-400', bg: 'bg-indigo-950' },
  'in-progress': { label: 'In Progress', color: 'text-blue-400', bg: 'bg-blue-950' },
  passed:      { label: 'Passed',      color: 'text-emerald-400', bg: 'bg-emerald-950' },
  mastered:    { label: 'Mastered',    color: 'text-amber-400', bg: 'bg-amber-950' },
};

export default function ProgressBar() {
  const { getNodeStatus } = useApp();

  const tierOrder = treeData.tiers.sort((a, b) => a.order - b.order);

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
        Progress
      </div>

      {tierOrder.map(tier => {
        const nodes = treeData.nodes.filter(n => n.tier === tier.id);
        const passed = nodes.filter(n => {
          const s = getNodeStatus(n.id);
          return s === 'passed' || s === 'mastered';
        }).length;

        return (
          <div key={tier.id} className="flex flex-col gap-2">
            {/* Tier header */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold" style={{ color: tier.color }}>
                {tier.label}
              </span>
              <span className="text-[10px] text-zinc-600">
                {passed}/{nodes.length}
              </span>
            </div>

            {/* Nodes list */}
            {nodes.map(node => {
              const status = getNodeStatus(node.id);
              const cfg = STATUS_CONFIG[status];
              return (
                <div
                  key={node.id}
                  className={`flex items-center justify-between px-2 py-1 rounded text-[11px] ${cfg.bg}`}
                >
                  <span className="text-zinc-300 truncate mr-2" title={node.label}>
                    {node.label}
                  </span>
                  <span className={`shrink-0 font-medium ${cfg.color}`}>
                    {cfg.label}
                  </span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
