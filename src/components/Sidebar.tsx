import { useAppState } from '../context/AppContext';
import { courseRegistry } from '../data/courses';
import { courseTreeRegistry } from '../context/AppContext';
import { computeStats } from '../utils/treeUtils';
import type { PageId } from '../types';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

interface NavItemProps {
  icon: string;
  label: string;
  active: boolean;
  onClick: () => void;
  badge?: string;
  disabled?: boolean;
}

function NavItem({ icon, label, active, onClick, badge, disabled }: NavItemProps) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors text-left ${
        disabled
          ? 'opacity-30 cursor-not-allowed text-zinc-600'
          : active
          ? 'bg-indigo-500/15 text-indigo-400'
          : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
      }`}
    >
      <span className="text-base shrink-0 w-5 text-center">{icon}</span>
      <span className="truncate">{label}</span>
      {badge && (
        <span className="ml-auto text-[11px] bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded-full shrink-0">
          {badge}
        </span>
      )}
    </button>
  );
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { state, navigate, currentCourseState } = useAppState();
  const currentPage = state.currentPage;
  const currentCourseId = state.currentCourseId;
  const hasCourse = currentCourseId !== null;

  const currentCourse = courseRegistry.find(c => c.id === currentCourseId);
  const treeData = currentCourseId ? courseTreeRegistry[currentCourseId] : null;
  const stats = currentCourseState && treeData
    ? computeStats(currentCourseState.nodeProgress, treeData)
    : null;

  const pages: { icon: string; label: string; page: PageId }[] = [
    { icon: '⌂', label: 'Knowledge Graph', page: 'knowledge-graph' },
    { icon: '☰', label: 'Practice Test', page: 'practice-test' },
    { icon: '✎', label: 'Practice Exam', page: 'practice-exam' },
  ];

  if (collapsed) {
    return (
      <div className="w-12 h-full bg-[#0a0a10] border-r border-white/[0.06] flex flex-col items-center py-3 gap-2 shrink-0">
        {/* Toggle button */}
        <button
          onClick={onToggle}
          className="w-8 h-8 flex items-center justify-center rounded-md text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.06] transition-colors"
          title="Expand sidebar"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        {/* Home */}
        <button
          onClick={() => navigate('home')}
          className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors text-base ${
            currentPage === 'home' ? 'text-indigo-400 bg-indigo-500/15' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]'
          }`}
          title="Home"
        >
          ⌂
        </button>

        {hasCourse && (
          <>
            <div className="w-5 h-px bg-white/[0.08] my-1" />
            {pages.map(p => (
              <button
                key={p.page}
                onClick={() => navigate(p.page)}
                className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors text-base ${
                  currentPage === p.page ? 'text-indigo-400 bg-indigo-500/15' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]'
                }`}
                title={p.label}
              >
                {p.icon}
              </button>
            ))}
            <div className="w-5 h-px bg-white/[0.08] my-1" />
            <button
              onClick={() => navigate('dashboard')}
              className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors text-base ${
                currentPage === 'dashboard' ? 'text-indigo-400 bg-indigo-500/15' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]'
              }`}
              title="Dashboard"
            >
              ◔
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="w-60 h-full bg-[#0a0a10] border-r border-white/[0.06] flex flex-col shrink-0">
      {/* Header */}
      <div className="h-12 flex items-center px-3 gap-2 border-b border-white/[0.06]">
        {/* Logo */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#6366f1"/>
            <path d="M8 22L16 10L24 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="16" cy="10" r="2.5" fill="white"/>
            <circle cx="8" cy="22" r="2.5" fill="white"/>
            <circle cx="24" cy="22" r="2.5" fill="white"/>
          </svg>
          <span className="text-sm font-semibold text-white truncate">Study Mastery</span>
        </div>
        {/* Collapse button */}
        <button
          onClick={onToggle}
          className="p-1 rounded-md text-zinc-600 hover:text-zinc-300 hover:bg-white/[0.04] transition-colors shrink-0"
          title="Collapse sidebar"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {/* Home */}
        <NavItem
          icon="⌂"
          label="Home"
          active={currentPage === 'home'}
          onClick={() => navigate('home')}
        />

        {hasCourse && currentCourse && (
          <>
            {/* Course divider */}
            <div className="pt-3 pb-1 px-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: currentCourse.color }} />
                <span className="text-[11px] text-zinc-600 uppercase tracking-wider truncate font-medium">
                  {currentCourse.code}
                </span>
              </div>
            </div>

            {/* Dashboard */}
            <NavItem
              icon="◔"
              label="Dashboard"
              active={currentPage === 'dashboard'}
              onClick={() => navigate('dashboard')}
              badge={stats ? `${stats.totalPassed}/${treeData?.nodes.length}` : undefined}
            />

            {/* Divider */}
            <div className="pt-2 pb-1 px-3">
              <span className="text-[11px] text-zinc-700 uppercase tracking-wider font-medium">Services</span>
            </div>

            {pages.map(p => (
              <NavItem
                key={p.page}
                icon={p.icon}
                label={p.label}
                active={currentPage === p.page}
                onClick={() => navigate(p.page)}
              />
            ))}
          </>
        )}

        {/* Bottom section */}
        <div className="pt-3">
          <div className="h-px bg-white/[0.06] mb-2" />
          <NavItem
            icon="⚙"
            label="Settings"
            active={false}
            onClick={() => {/* handled in-place */}}
            disabled={false}
          />
        </div>
      </div>
    </div>
  );
}
