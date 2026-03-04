import { useAppState, courseTreeRegistry } from '../context/AppContext';
import { courseRegistry } from '../data/courses';
import { computeStats } from '../utils/treeUtils';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  stat: string;
  color: string;
  onClick: () => void;
}

function ServiceCard({ icon, title, description, stat, color, onClick }: ServiceCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-start gap-3 p-5 rounded-xl bg-[#16161e] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.03] transition-all text-left group"
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
        style={{ backgroundColor: color + '20', color: color }}
      >
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-white mb-1">{title}</h3>
        <p className="text-xs text-zinc-500 leading-relaxed">{description}</p>
      </div>
      <div className="mt-auto pt-2 border-t border-white/[0.06] w-full flex items-center justify-between">
        <span className="text-xs text-zinc-600">{stat}</span>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="text-zinc-600 group-hover:text-zinc-400 transition-colors"
        >
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </div>
    </button>
  );
}

export default function CourseDashboard() {
  const { state, navigate, currentCourseState } = useAppState();
  const courseId = state.currentCourseId;
  const course = courseRegistry.find(c => c.id === courseId);
  const treeData = courseId ? courseTreeRegistry[courseId] : null;

  if (!course || !treeData || !currentCourseState) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-zinc-500">No course selected.</p>
      </div>
    );
  }

  const stats = computeStats(currentCourseState.nodeProgress, treeData);
  const totalNodes = treeData.nodes.length;
  const pct = totalNodes > 0 ? Math.round((stats.totalPassed / totalNodes) * 100) : 0;
  const testCount = currentCourseState.testHistory.length;
  const examCount = currentCourseState.examHistory.length;

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-xs text-zinc-600">
        <button onClick={() => navigate('home')} className="hover:text-zinc-400 transition-colors">
          Home
        </button>
        <span>/</span>
        <span style={{ color: course.color }}>{course.code}</span>
      </div>

      {/* Course header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: course.color }} />
          <span className="text-xs font-medium" style={{ color: course.color }}>{course.code}</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">{course.title}</h1>
        <p className="text-sm text-zinc-400">{course.description}</p>
      </div>

      {/* Overall progress */}
      <div className="mb-8 p-5 rounded-xl bg-[#16161e] border border-white/[0.06]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-zinc-300">Overall Progress</span>
          <span className="text-sm font-semibold" style={{ color: course.color }}>{pct}%</span>
        </div>
        <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden mb-3">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, backgroundColor: course.color }}
          />
        </div>
        <div className="flex items-center gap-6 text-xs text-zinc-500">
          <span><span className="text-white font-medium">{stats.totalPassed}</span> / {totalNodes} nodes passed</span>
          <span><span className="text-amber-400 font-medium">{stats.totalMastered}</span> mastered</span>
          {currentCourseState.stats.studyStreak > 0 && (
            <span><span className="text-orange-400 font-medium">{currentCourseState.stats.studyStreak}</span> day streak</span>
          )}
        </div>
      </div>

      {/* Services grid */}
      <div>
        <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ServiceCard
            icon="◈"
            title="Knowledge Graph"
            description="Explore concepts, track mastery, and take node-level quizzes."
            stat={`${stats.totalPassed}/${totalNodes} nodes passed`}
            color={course.color}
            onClick={() => navigate('knowledge-graph')}
          />
          <ServiceCard
            icon="☰"
            title="Practice Test"
            description="Generate a practice mid-semester test from selected topics."
            stat={testCount === 0 ? 'No tests taken yet' : `${testCount} test${testCount !== 1 ? 's' : ''} taken`}
            color="#0ea5e9"
            onClick={() => navigate('practice-test')}
          />
          <ServiceCard
            icon="✎"
            title="Practice Exam"
            description="Full 3-hour exam simulation with timed sections."
            stat={examCount === 0 ? 'No exams taken yet' : `${examCount} exam${examCount !== 1 ? 's' : ''} taken`}
            color="#a855f7"
            onClick={() => navigate('practice-exam')}
          />
        </div>
      </div>

      {/* Tier breakdown */}
      {Object.keys(stats.byTier).length > 0 && (
        <div className="mt-8">
          <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">By Tier</h2>
          <div className="space-y-2">
            {treeData.tiers.map(tier => {
              const ts = stats.byTier[tier.id];
              const tierPct = ts && ts.total > 0 ? Math.round((ts.passed / ts.total) * 100) : 0;
              return (
                <div key={tier.id} className="flex items-center gap-4">
                  <div className="w-28 shrink-0 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tier.color }} />
                    <span className="text-xs text-zinc-400 truncate">{tier.label}</span>
                  </div>
                  <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${tierPct}%`, backgroundColor: tier.color }}
                    />
                  </div>
                  <span className="text-xs text-zinc-600 w-12 text-right shrink-0">
                    {ts?.passed || 0}/{ts?.total || 0}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
