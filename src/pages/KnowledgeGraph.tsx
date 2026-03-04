import { useState } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { useAppState, courseTreeRegistry } from '../context/AppContext';
import TreeGraph from '../components/TreeGraph';
import NodeDetail from '../components/NodeDetail';
import ProgressBar from '../components/ProgressBar';

export default function KnowledgeGraph() {
  const { state, navigate } = useAppState();
  const courseId = state.currentCourseId;
  const treeData = courseId ? courseTreeRegistry[courseId] : null;

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [showProgress, setShowProgress] = useState(false);

  if (!courseId || !treeData) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-500 mb-4">No course selected.</p>
          <button
            onClick={() => navigate('home')}
            className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex overflow-hidden relative">
      {/* Tree Graph — main area */}
      <div className="flex-1 relative">
        <ReactFlowProvider>
          <TreeGraph
            treeData={treeData}
            courseId={courseId}
            onSelectNode={setSelectedNodeId}
            selectedNodeId={selectedNodeId}
          />
        </ReactFlowProvider>

        {/* Top toolbar */}
        <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
          <button
            onClick={() => setShowProgress(!showProgress)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs transition-colors border ${
              showProgress
                ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
                : 'bg-[#1e1e28]/80 text-zinc-400 border-white/[0.08] hover:text-zinc-200 hover:bg-white/[0.08]'
            }`}
          >
            <span>◔</span>
            <span>Progress</span>
          </button>
        </div>

        {/* Legend overlay */}
        <div className="absolute bottom-4 left-4 bg-[#16161e]/90 backdrop-blur-sm border border-white/[0.06] rounded-lg px-3 py-2 flex items-center gap-3 z-10">
          {[
            { color: '#52525b', label: 'Locked', icon: '🔒' },
            { color: '#6366f1', label: 'Unlocked', icon: '●' },
            { color: '#6366f1', label: 'In Progress', icon: '◉' },
            { color: '#22c55e', label: 'Passed', icon: '✓' },
            { color: '#f59e0b', label: 'Mastered', icon: '★' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-1 text-[11px]" style={{ color: item.color }}>
              <span>{item.icon}</span>
              <span className="text-zinc-500">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Progress sidebar (toggleable) */}
      {showProgress && (
        <div className="w-64 border-l border-white/[0.06] bg-[#0f0f14] shrink-0 overflow-y-auto panel-slide-in">
          <ProgressBar />
        </div>
      )}

      {/* Node Detail panel */}
      {selectedNodeId && (
        <div className="w-[400px] border-l border-white/[0.06] bg-[#12121a] shrink-0 overflow-hidden panel-slide-in">
          <NodeDetail
            nodeId={selectedNodeId}
            courseId={courseId}
            treeData={treeData}
            onClose={() => setSelectedNodeId(null)}
            onSelectNode={setSelectedNodeId}
          />
        </div>
      )}
    </div>
  );
}
