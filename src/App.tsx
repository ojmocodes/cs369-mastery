import { useState } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { AppProvider } from './context/AppContext';
import TopBar from './components/TopBar';
import TreeGraph from './components/TreeGraph';
import NodeDetail from './components/NodeDetail';
import ProgressBar from './components/ProgressBar';

function AppContent() {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [showProgress, setShowProgress] = useState(false);

  return (
    <div className="h-screen w-screen flex flex-col bg-[#0f0f14]">
      <TopBar
        onToggleProgress={() => setShowProgress(!showProgress)}
        showProgress={showProgress}
      />

      <div className="flex-1 flex overflow-hidden relative">
        {/* Tree Graph — main area */}
        <div className="flex-1 relative">
          <ReactFlowProvider>
            <TreeGraph
              onSelectNode={setSelectedNodeId}
              selectedNodeId={selectedNodeId}
            />
          </ReactFlowProvider>

          {/* Legend overlay */}
          <div className="absolute bottom-4 left-4 bg-[#16161e]/90 backdrop-blur-sm border border-white/[0.06] rounded-lg px-3 py-2 flex items-center gap-3">
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
              onClose={() => setSelectedNodeId(null)}
              onSelectNode={setSelectedNodeId}
            />
          </div>
        )}
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
