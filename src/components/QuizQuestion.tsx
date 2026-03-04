import { Question } from '../types';

interface Props {
  question: Question;
  selected: number | null;
  onSelect: (i: number) => void;
  revealed: boolean;
}

export default function QuizQuestion({ question, selected, onSelect, revealed }: Props) {
  return (
    <div className="animate-fade-in">
      <p style={{ fontSize: '16px', fontWeight: 500, lineHeight: 1.6, marginBottom: '20px', color: 'var(--text-primary)' }}>
        {question.question}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {question.options.map((opt, i) => {
          let bg = 'var(--bg-card)';
          let border = 'var(--border-color)';
          let color = 'var(--text-primary)';
          if (revealed) {
            if (i === question.answer) { bg = 'rgba(16,185,129,0.15)'; border = 'var(--success)'; color = 'var(--success)'; }
            else if (i === selected) { bg = 'rgba(239,68,68,0.15)'; border = 'var(--danger)'; color = 'var(--danger)'; }
          } else if (i === selected) {
            bg = 'var(--bg-hover)'; border = 'var(--accent-primary)';
          }
          return (
            <button key={i} onClick={() => !revealed && onSelect(i)} style={{
              textAlign: 'left', padding: '12px 16px', borderRadius: '8px',
              background: bg, border: `1px solid ${border}`, color,
              fontSize: '14px', cursor: revealed ? 'default' : 'pointer',
              transition: 'all 0.2s',
            }}>
              <span style={{ fontWeight: 600, marginRight: '8px', color: 'var(--accent-primary)' }}>{String.fromCharCode(65+i)}.</span>
              {opt}
            </button>
          );
        })}
      </div>
      {revealed && (
        <div style={{ marginTop: '16px', padding: '12px 16px', borderRadius: '8px', background: 'rgba(124,58,237,0.1)', border: '1px solid var(--accent-secondary)' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Explanation</span>
          <p style={{ marginTop: '6px', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
