import { useApp } from '../context/AppContext';
import { treeData } from '../data/tree';

interface TopBarProps {
  onToggleProgress: () => void;
  showProgress: boolean;
}

export default function TopBar({ onToggleProgress, showProgress }: TopBarProps) {
  const { state, getNodeStatus, resetAll } = useApp();

  const totalNodes = treeData.nodes.length;
  const passedNodes = treeData.nodes.filter(n => {
    const status = getNodeStatus(n.id);
    return status === 'passed' || status === 'mastered';
  }).length;
  const masteredNodes = treeData.nodes.filter(n => getNodeStatus(n.id) === 'mastered').length;

  const overallPct = Math.round((passedNodes / totalNodes) * 100);

  const accuracy =
    state.totalQuizzes > 0
      ? Math.round((state.totalCorrect / (state.totalQuizzes * 5)) * 100)
      : 0;

  const handleReset = () => {
    if (confirm('Reset all progress? This cannot be undone.')) resetAll();
  };

  return (
    <header className="h-12 bg-[#16161e] border-b border-white/[0.06] flex items-center px-4 gap-4 shrink-0">
      {/* Brand */}
      <div className="flex items-center gap-2 mr-2">
        <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white">
          CS
        </div>
        <span className="text-sm font-semibold text-zinc-100">CS369 Mastery</span>
        <span className="text-xs text-zinc-500 hidden sm:block">— Knowledge Tree</span>
      </div>

      {/* Progress bar */}
      <div className="flex-1 max-w-xs hidden sm:flex flex-col gap-0.5">
        <div className="flex justify-between text-[10px] text-zinc-500">
          <span>{passedNodes}/{totalNodes} nodes passed</span>
          <span>{overallPct}%</span>
        </div>
        <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-500"
            style={{ width: `${overallPct}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-3 ml-auto">
        <Stat label="Mastered" value={masteredNodes} color="text-amber-400" />
        <Stat label="Accuracy" value={`${accuracy}%`} color="text-emerald-400" />
        <Stat label="Streak" value={`${state.streak}d`} color="text-indigo-400" />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleProgress}
          className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
            showProgress
              ? 'bg-indigo-600 text-white'
              : 'bg-white/[0.06] text-zinc-400 hover:bg-white/[0.1] hover:text-zinc-200'
          }`}
        >
          Progress
        </button>
        <button
          onClick={handleReset}
          className="px-2.5 py-1 rounded text-xs font-medium bg-white/[0.04] text-zinc-500 hover:bg-red-900/30 hover:text-red-400 transition-colors"
          title="Reset all progress"
        >
          Reset
        </button>
      </div>
    </header>
  );
}

function Stat({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className="hidden sm:flex flex-col items-center">
      <span className={`text-sm font-semibold ${color}`}>{value}</span>
      <span className="text-[10px] text-zinc-600">{label}</span>
    </div>
  );
}
