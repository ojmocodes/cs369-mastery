import { useAppState } from '../context/AppContext';
import { courseRegistry } from '../data/courses';
import { courseTreeRegistry } from '../context/AppContext';
import { computeStats } from '../utils/treeUtils';

export default function Home() {
  const { state, navigate } = useAppState();

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Study Mastery</h1>
        <p className="text-zinc-400 text-sm">Master your courses through active recall and knowledge graphs.</p>
      </div>

      {/* Course grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">
        {courseRegistry.map(course => {
          const courseState = state.courses[course.id];
          const treeData = courseTreeRegistry[course.id];
          const stats = courseState && treeData
            ? computeStats(courseState.nodeProgress, treeData)
            : null;
          const isActive = course.status === 'active';
          const totalNodes = treeData?.nodes.length ?? 0;
          const pct = stats && totalNodes > 0
            ? Math.round((stats.totalPassed / totalNodes) * 100)
            : 0;

          return (
            <div
              key={course.id}
              onClick={isActive ? () => {
                navigate('dashboard', course.id);
              } : undefined}
              className={`relative rounded-xl border transition-all ${
                isActive
                  ? 'cursor-pointer hover:border-white/[0.12] hover:bg-white/[0.03]'
                  : 'opacity-60 cursor-default'
              } bg-[#16161e] border-white/[0.06] p-5`}
            >
              {/* Coming soon badge */}
              {!isActive && (
                <div className="absolute top-3 right-3">
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-zinc-700/60 text-zinc-400 border border-zinc-600/40 font-medium">
                    Coming Soon
                  </span>
                </div>
              )}

              {/* Color accent bar */}
              <div
                className="w-8 h-1 rounded-full mb-4"
                style={{ backgroundColor: course.color }}
              />

              {/* Course code */}
              <div
                className="text-xs font-semibold mb-1"
                style={{ color: course.color }}
              >
                {course.code}
              </div>

              {/* Title */}
              <h2 className="text-base font-semibold text-white mb-2 leading-snug">
                {course.title}
              </h2>

              {/* Description */}
              <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                {course.description}
              </p>

              {/* Progress bar (active courses only) */}
              {isActive && stats && totalNodes > 0 && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-zinc-500">{stats.totalPassed}/{totalNodes} nodes</span>
                    <span style={{ color: course.color }}>{pct}%</span>
                  </div>
                  <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: course.color }}
                    />
                  </div>
                </div>
              )}

              {/* Arrow for active */}
              {isActive && (
                <div className="mt-4 flex items-center gap-1 text-xs font-medium" style={{ color: course.color }}>
                  <span>Open course</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
