import { useState } from 'react';
import type { TreeData, NodeStatus } from '../types';
import { useAppState } from '../context/AppContext';
import { getTierColor, getTierLabel, getUnlockedBy } from '../utils/treeUtils';
import { getQuestionsForNode } from '../data/courses/compsci369/questions';
import { getExamQuestionsForNode } from '../data/courses/compsci369/tree';
import Quiz from './Quiz';
import ExamQuestionViewer from './ExamQuestionViewer';

interface NodeDetailProps {
  nodeId: string;
  courseId: string;
  treeData: TreeData;
  onClose: () => void;
  onSelectNode: (nodeId: string) => void;
}

function StatusBadge({ status }: { status: NodeStatus }) {
  const config: Record<NodeStatus, { label: string; classes: string }> = {
    locked: { label: 'Locked', classes: 'bg-zinc-800 text-zinc-500 border-zinc-700' },
    unlocked: { label: 'Unlocked', classes: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30' },
    'in-progress': { label: 'In Progress', classes: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
    passed: { label: 'Passed', classes: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
    mastered: { label: 'Mastered', classes: 'bg-amber-500/15 text-amber-300 border-amber-400/30' },
  };
  const c = config[status];
  return (
    <span className={`text-[11px] px-2 py-0.5 rounded-full border font-medium ${c.classes}`}>
      {c.label}
    </span>
  );
}

export default function NodeDetail({ nodeId, courseId, treeData, onClose, onSelectNode }: NodeDetailProps) {
  const { state, dispatch } = useAppState();
  const [showQuiz, setShowQuiz] = useState(false);

  const nodeMap = new Map(treeData.nodes.map(n => [n.id, n]));
  const node = nodeMap.get(nodeId);
  if (!node) return null;

  const progress = state.courses[courseId]?.nodeProgress[nodeId];
  const status = progress?.status || 'locked';
  const tierColor = getTierColor(node.tier, treeData);
  const examQuestions = getExamQuestionsForNode(nodeId);
  const quizQuestions = getQuestionsForNode(nodeId);
  const unlocks = getUnlockedBy(nodeId, treeData);

  const canStartQuiz = status !== 'locked';

  function handleStartQuiz() {
    dispatch({ type: 'START_QUIZ', courseId, nodeId });
    setShowQuiz(true);
  }

  if (showQuiz) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
          <button
            onClick={() => setShowQuiz(false)}
            className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Back
          </button>
          <span className="text-xs text-zinc-500">Quiz Mode</span>
        </div>
        <div className="flex-1 overflow-y-auto">
          <Quiz nodeId={nodeId} courseId={courseId} nodeLabel={node.label} onClose={() => setShowQuiz(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tierColor }} />
          <span className="text-xs text-zinc-500">{getTierLabel(node.tier, treeData)}</span>
        </div>
        <button
          onClick={onClose}
          className="text-zinc-600 hover:text-zinc-300 transition-colors p-1"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Title + status */}
        <div>
          <h2 className="text-base font-semibold text-white mb-1.5">{node.label}</h2>
          <div className="flex items-center gap-2">
            <StatusBadge status={status} />
            {progress && progress.quizAttempts > 0 && (
              <span className="text-[11px] text-zinc-500">
                Best: {progress.bestScore}/{quizQuestions.length} · {progress.quizAttempts} attempt{progress.quizAttempts !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-zinc-400 leading-relaxed">{node.description}</p>

        {/* Topics */}
        <div>
          <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Key Topics</h3>
          <ul className="space-y-1">
            {node.topics.map((topic, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                <span className="text-indigo-500 mt-1 shrink-0">•</span>
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Exam question viewer */}
        {examQuestions.length > 0 && (
          <ExamQuestionViewer examQuestions={examQuestions} />
        )}

        {/* Prerequisites */}
        {node.prerequisites.length > 0 && (
          <div>
            <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Prerequisites</h3>
            <div className="flex flex-wrap gap-1.5">
              {node.prerequisites.map(preId => {
                const preNode = nodeMap.get(preId);
                const preStatus = state.courses[courseId]?.nodeProgress[preId]?.status || 'locked';
                const isPassed = preStatus === 'passed' || preStatus === 'mastered';
                return (
                  <button
                    key={preId}
                    onClick={() => onSelectNode(preId)}
                    className={`text-xs px-2 py-1 rounded-md border transition-colors ${
                      isPassed
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
                        : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:bg-white/[0.06]'
                    }`}
                  >
                    {isPassed && '✓ '}{preNode?.label || preId}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Unlocks */}
        {unlocks.length > 0 && (
          <div>
            <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Unlocks</h3>
            <div className="flex flex-wrap gap-1.5">
              {unlocks.map(childId => {
                const childNode = treeData.nodes.find(n => n.id === childId);
                const childStatus = state.courses[courseId]?.nodeProgress[childId]?.status || 'locked';
                return (
                  <button
                    key={childId}
                    onClick={() => onSelectNode(childId)}
                    className={`text-xs px-2 py-1 rounded-md border transition-colors ${
                      childStatus === 'locked'
                        ? 'bg-white/[0.02] border-white/[0.06] text-zinc-500 hover:bg-white/[0.04]'
                        : 'bg-white/[0.02] border-white/[0.06] text-zinc-300 hover:bg-white/[0.06]'
                    }`}
                  >
                    {childStatus === 'locked' ? '🔒 ' : ''}{childNode?.label || childId}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Quiz questions count */}
        <div className="text-xs text-zinc-500">
          {quizQuestions.length} question{quizQuestions.length !== 1 ? 's' : ''} available
        </div>
      </div>

      {/* Action button */}
      <div className="p-4 border-t border-white/[0.06]">
        {canStartQuiz ? (
          <button
            onClick={handleStartQuiz}
            className="w-full py-2.5 rounded-lg text-sm font-medium transition-all bg-indigo-600 hover:bg-indigo-500 text-white"
          >
            {status === 'passed' || status === 'mastered' ? 'Review Quiz' : 'Start Quiz'}
          </button>
        ) : (
          <div className="text-center py-2">
            <p className="text-xs text-zinc-500">Complete prerequisites to unlock this node</p>
          </div>
        )}
      </div>
    </div>
  );
}
