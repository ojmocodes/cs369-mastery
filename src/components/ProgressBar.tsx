import { useAppState, courseTreeRegistry } from '../context/AppContext';
import { computeStats, getTierColor, getTierLabel } from '../utils/treeUtils';

export default function ProgressBar() {
  const { state, currentCourseState } = useAppState();
  const courseId = state.currentCourseId;
  const treeData = courseId ? courseTreeRegistry[courseId] : null;

  if (!treeData || !currentCourseState) {
    return (
      <div className="p-4 text-sm text-zinc-500">No course selected.</div>
    );
  }

  const stats = computeStats(currentCourseState.nodeProgress, treeData);
  const pct = Math.round((stats.totalPassed / treeData.nodes.length) * 100);

  return (
    <div className="bg-[#16161e] border-b border-white/[0.06] p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">Progress</h2>
        <span className="text-xs text-zinc-500">{pct}% complete</span>
      </div>

      {/* Overall progress bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>Overall</span>
          <span>{stats.totalPassed}/{treeData.nodes.length} nodes</span>
        </div>
        <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${pct}%`,
              background: 'linear-gradient(90deg, #6366f1, #a855f7)',
            }}
          />
        </div>
      </div>

      {/* Per-tier breakdown */}
      <div className="space-y-2">
        {treeData.tiers.map(tier => {
          const ts = stats.byTier[tier.id];
          const tierPct = ts && ts.total > 0 ? Math.round((ts.passed / ts.total) * 100) : 0;
          return (
            <div key={tier.id} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: getTierColor(tier.id, treeData) }}
                  />
                  <span className="text-xs text-zinc-400">{getTierLabel(tier.id, treeData)}</span>
                </div>
                <span className="text-xs text-zinc-500">{ts?.passed || 0}/{ts?.total || 0}</span>
              </div>
              <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${tierPct}%`,
                    backgroundColor: getTierColor(tier.id, treeData),
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/[0.06]">
        <div className="text-center">
          <div className="text-lg font-semibold text-white">{stats.totalPassed}</div>
          <div className="text-[11px] text-zinc-500">Passed</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-amber-400">{stats.totalMastered}</div>
          <div className="text-[11px] text-zinc-500">Mastered</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-indigo-400">{currentCourseState.stats.studyStreak}</div>
          <div className="text-[11px] text-zinc-500">Day Streak</div>
        </div>
      </div>
    </div>
  );
}
