import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { treeData } from '../data/tree';
import { questionBank } from '../data/questions';
import Quiz from './Quiz';
import type { NodeStatus } from '../types';

interface NodeDetailProps {
  nodeId: string;
  onClose: () => void;
  onSelectNode: (id: string) => void;
}

const STATUS_BADGE: Record<NodeStatus, { label: string; className: string }> = {
  locked:        { label: 'Locked',      className: 'bg-zinc-800 text-zinc-500' },
  unlocked:      { label: 'Unlocked',    className: 'bg-indigo-950 text-indigo-400' },
  'in-progress': { label: 'In Progress', className: 'bg-blue-950 text-blue-400' },
  passed:        { label: 'Passed',      className: 'bg-emerald-950 text-emerald-400' },
  mastered:      { label: 'Mastered',    className: 'bg-amber-950 text-amber-400' },
};

export default function NodeDetail({ nodeId, onClose, onSelectNode }: NodeDetailProps) {
  const { getNodeStatus, state } = useApp();
  const [showQuiz, setShowQuiz] = useState(false);

  const node = treeData.nodes.find(n => n.id === nodeId);
  if (!node) return null;

  const status = getNodeStatus(nodeId);
  const badge = STATUS_BADGE[status];
  const progress = state.progress[nodeId];
  const questionCount = questionBank.filter(q => q.nodeId === nodeId).length;

  const prereqNodes = node.prerequisites.map(id => treeData.nodes.find(n => n.id === id)).filter(Boolean);
  const unlockedBy = treeData.nodes.filter(n => n.prerequisites.includes(nodeId));

  const tierConfig = treeData.tiers.find(t => t.id === node.tier);

  if (showQuiz) {
    return (
      <div className="h-full flex flex-col">
        {/* Quiz header */}
        <div className="h-10 border-b border-white/[0.06] flex items-center px-3 gap-2 shrink-0">
          <button
            onClick={() => setShowQuiz(false)}
            className="text-zinc-500 hover:text-zinc-300 text-xs"
          >
            ← Back
          </button>
          <span className="text-xs text-zinc-400 truncate">{node.label}</span>
        </div>
        <div className="flex-1 overflow-y-auto">
          <Quiz nodeId={nodeId} onClose={() => setShowQuiz(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-white/[0.06] px-4 pt-4 pb-3 shrink-0">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h2 className="text-sm font-semibold text-zinc-100 leading-tight">{node.label}</h2>
          <button
            onClick={onClose}
            className="text-zinc-600 hover:text-zinc-400 text-lg leading-none shrink-0"
          >
            ×
          </button>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Tier badge */}
          <span
            className="text-[10px] font-medium px-1.5 py-0.5 rounded"
            style={{ color: tierConfig?.color, backgroundColor: `${tierConfig?.color}18` }}
          >
            {tierConfig?.label ?? node.tier}
          </span>
          {/* Status badge */}
          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${badge.className}`}>
            {badge.label}
          </span>
          {/* Progress badge */}
          {progress && (
            <span className="text-[10px] text-zinc-600">
              {progress.attempts} attempt{progress.attempts !== 1 ? 's' : ''}
              {progress.bestScore !== undefined && ` · best ${Math.round(progress.bestScore * 100)}%`}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-4">
        {/* Description */}
        <p className="text-xs text-zinc-400 leading-relaxed">{node.description}</p>

        {/* Topics */}
        <Section title="Topics Covered">
          <ul className="flex flex-col gap-1">
            {node.topics.map((t, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-zinc-400">
                <span className="text-indigo-500 shrink-0 mt-0.5">·</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Prerequisites */}
        {prereqNodes.length > 0 && (
          <Section title="Prerequisites">
            <div className="flex flex-wrap gap-1.5">
              {prereqNodes.map(pn => {
                if (!pn) return null;
                const pStatus = getNodeStatus(pn.id);
                const passed = pStatus === 'passed' || pStatus === 'mastered';
                return (
                  <button
                    key={pn.id}
                    onClick={() => onSelectNode(pn.id)}
                    className={`text-[11px] px-2 py-0.5 rounded border transition-colors ${
                      passed
                        ? 'border-emerald-700 bg-emerald-950/40 text-emerald-400 hover:bg-emerald-950/70'
                        : 'border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800'
                    }`}
                  >
                    {passed ? '✓ ' : '🔒 '}{pn.label}
                  </button>
                );
              })}
            </div>
          </Section>
        )}

        {/* Unlocks */}
        {unlockedBy.length > 0 && (
          <Section title="Unlocks">
            <div className="flex flex-wrap gap-1.5">
              {unlockedBy.map(un => (
                <button
                  key={un.id}
                  onClick={() => onSelectNode(un.id)}
                  className="text-[11px] px-2 py-0.5 rounded border border-indigo-900 bg-indigo-950/30 text-indigo-400 hover:bg-indigo-950/60 transition-colors"
                >
                  → {un.label}
                </button>
              ))}
            </div>
          </Section>
        )}

        {/* Exam coverage */}
        {node.exam_questions && node.exam_questions.length > 0 && (
          <Section title="Exam Coverage">
            <div className="flex flex-wrap gap-1.5">
              {node.exam_questions.map(eq => (
                <span
                  key={eq}
                  className="text-[10px] px-1.5 py-0.5 rounded bg-violet-950/40 border border-violet-800/50 text-violet-400"
                >
                  {eq}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* Source */}
        {node.source && (
          <Section title="Source">
            <p className="text-[11px] text-zinc-600">{node.source}</p>
          </Section>
        )}
      </div>

      {/* Action footer */}
      <div className="border-t border-white/[0.06] p-3 shrink-0">
        {status === 'locked' ? (
          <div className="text-center text-xs text-zinc-600 py-1">
            Complete prerequisites to unlock
          </div>
        ) : questionCount === 0 ? (
          <div className="text-center text-xs text-zinc-600 py-1">
            No questions yet for this node
          </div>
        ) : (
          <button
            onClick={() => setShowQuiz(true)}
            className="w-full py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors"
          >
            {status === 'passed' || status === 'mastered' ? 'Retake Quiz' : 'Start Quiz'}
            <span className="ml-1.5 text-indigo-300 text-xs">({questionCount} Qs)</span>
          </button>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <h3 className="text-[10px] font-semibold text-zinc-600 uppercase tracking-wider">{title}</h3>
      {children}
    </div>
  );
}
