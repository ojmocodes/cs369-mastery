import { Node } from '../types';
import { CheckCircle, Circle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface Props { node: Node | null; onClose: () => void; }

export default function NodeDetail({ node, onClose }: Props) {
  const { toggleMastered, isMastered } = useAppContext();
  if (!node) return null;
  const mastered = isMastered(node.id);

  return (
    <div style={{
      position: 'absolute', bottom: '20px', left: '20px',
      width: '320px', background: 'var(--bg-card)',
      border: `1px solid ${mastered ? 'var(--success)' : 'var(--border-color)'}`,
      borderRadius: '12px', padding: '16px', zIndex: 10,
      boxShadow: mastered ? '0 0 20px rgba(16,185,129,0.2)' : '0 4px 24px rgba(0,0,0,0.4)',
    }} className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700, flex: 1 }}>{node.label}</h3>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '18px' }}>×</button>
      </div>
      <span style={{ fontSize: '11px', background: 'var(--bg-secondary)', padding: '2px 8px', borderRadius: '4px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {node.group}
      </span>
      {node.description && (
        <p style={{ marginTop: '10px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{node.description}</p>
      )}
      <button
        onClick={() => toggleMastered(node.id)}
        style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          marginTop: '14px', width: '100%', padding: '8px 12px',
          borderRadius: '8px', border: `1px solid ${mastered ? 'var(--success)' : 'var(--border-color)'}`,
          background: mastered ? 'rgba(16,185,129,0.1)' : 'var(--bg-secondary)',
          color: mastered ? 'var(--success)' : 'var(--text-secondary)',
          fontSize: '13px', fontWeight: 600, cursor: 'pointer',
        }}
      >
        {mastered ? <CheckCircle size={16} /> : <Circle size={16} />}
        {mastered ? 'Mastered ✓' : 'Mark as Mastered'}
      </button>
    </div>
  );
}
