import { Node } from '../types';
import { useAppContext } from '../context/AppContext';
import { CheckCircle, Circle } from 'lucide-react';

interface Props { nodes: Node[]; onSelect: (n: Node) => void; }

export default function Sidebar({ nodes, onSelect }: Props) {
  const { isMastered, toggleMastered } = useAppContext();

  // Group nodes
  const groups = Array.from(new Set(nodes.map(n => n.group)));

  return (
    <div style={{ width: '260px', flexShrink: 0, overflowY: 'auto', background: 'var(--bg-secondary)', borderRight: '1px solid var(--border-color)', padding: '12px 8px' }}>
      {groups.map(group => (
        <div key={group} style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '4px 8px 6px' }}>
            {group.replace(/_/g, ' ')}
          </div>
          {nodes.filter(n => n.group === group).map(node => (
            <div
              key={node.id}
              onClick={() => onSelect(node)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '7px 10px', borderRadius: '6px', cursor: 'pointer',
                marginBottom: '2px',
                background: isMastered(node.id) ? 'rgba(16,185,129,0.08)' : 'transparent',
              }}
            >
              <button
                onClick={e => { e.stopPropagation(); toggleMastered(node.id); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', color: isMastered(node.id) ? 'var(--success)' : 'var(--text-muted)' }}
              >
                {isMastered(node.id) ? <CheckCircle size={14} /> : <Circle size={14} />}
              </button>
              <span style={{ fontSize: '13px', color: isMastered(node.id) ? 'var(--success)' : 'var(--text-secondary)' }}>
                {node.label}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
