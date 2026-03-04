import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { useAppState } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import CourseDashboard from './pages/CourseDashboard';
import KnowledgeGraph from './pages/KnowledgeGraph';
import PracticeTest from './pages/PracticeTest';
import PracticeExam from './pages/PracticeExam';

function AppContent() {
  const { state, navigate, resetProgress } = useAppState();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showResetMenu, setShowResetMenu] = useState(false);
  const currentPage = state.currentPage;
  const courseId = state.currentCourseId;

  function renderPage() {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'dashboard':
        return <CourseDashboard />;
      case 'knowledge-graph':
        return <KnowledgeGraph />;
      case 'practice-test':
        return <PracticeTest />;
      case 'practice-exam':
        return <PracticeExam />;
      default:
        return <Home />;
    }
  }

  // For KG, we want full height without scrolling wrapper
  const isFullHeight = currentPage === 'knowledge-graph';

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-[#0f0f14]">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-12 bg-[#16161e] border-b border-white/[0.06] flex items-center px-4 gap-3 shrink-0 z-40">
          {/* Page title */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-sm font-medium text-zinc-300">
              {currentPage === 'home' && 'Courses'}
              {currentPage === 'dashboard' && 'Dashboard'}
              {currentPage === 'knowledge-graph' && 'Knowledge Graph'}
              {currentPage === 'practice-test' && 'Practice Test'}
              {currentPage === 'practice-exam' && 'Practice Exam'}
            </span>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Settings / reset */}
            <div className="relative">
              <button
                onClick={() => setShowResetMenu(!showResetMenu)}
                className="p-1.5 rounded-md text-zinc-600 hover:text-zinc-400 hover:bg-white/[0.04] transition-colors"
                title="Settings"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
              </button>

              {showResetMenu && (
                <div className="absolute right-0 top-full mt-1 bg-[#1e1e28] border border-white/[0.08] rounded-lg shadow-xl p-3 w-56 z-50">
                  <p className="text-xs text-zinc-400 mb-3">Settings</p>
                  {courseId && (
                    <button
                      onClick={() => {
                        if (window.confirm('Reset progress for this course?')) {
                          resetProgress(courseId);
                          setShowResetMenu(false);
                        }
                      }}
                      className="w-full text-left text-xs px-2 py-1.5 rounded-md text-amber-400 hover:bg-amber-500/10 transition-colors mb-1"
                    >
                      Reset Course Progress
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (window.confirm('Reset ALL progress? This cannot be undone.')) {
                        resetProgress();
                        navigate('home');
                        setShowResetMenu(false);
                      }
                    }}
                    className="w-full text-left text-xs px-2 py-1.5 rounded-md text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    Reset All Progress
                  </button>
                  <button
                    onClick={() => setShowResetMenu(false)}
                    className="w-full text-left text-xs px-2 py-1.5 rounded-md text-zinc-500 hover:text-zinc-300 transition-colors mt-1"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className={`flex-1 overflow-hidden flex ${isFullHeight ? '' : ''}`}>
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
