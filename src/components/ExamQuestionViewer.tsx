import { useState } from 'react';
import { ExamQuestion } from '../types';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

interface Props { questions: ExamQuestion[]; }

const SECTION_LABELS: Record<string, string> = {
  A: 'Section A – Short Answer',
  B: 'Section B – Calculations',
  C: 'Section C – Essays',
};

const TYPE_COLORS: Record<string, string> = {
  short: 'var(--info)',
  calculation: 'var(--warning)',
  essay: 'var(--accent-primary)',
};

export default function ExamQuestionViewer({ questions }: Props) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const sections = ['A', 'B', 'C'] as const;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {sections.map(sec => {
        const qs = questions.filter(q => q.section === sec);
        if (!qs.length) return null;
        const totalMarks = qs.reduce((s, q) => s + q.marks, 0);
        return (
          <div key={sec}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>{SECTION_LABELS[sec]}</h3>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{qs.length} questions · {totalMarks} marks</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {qs.map((q, idx) => (
                <div key={q.id} style={{ background: 'var(--bg-card)', borderRadius: '10px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                  <button
                    onClick={() => toggle(q.id)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '12px 16px', background: 'none', border: 'none',
                      cursor: 'pointer', textAlign: 'left',
                    }}
                  >
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', minWidth: '24px' }}>{idx+1}.</span>
                    <span style={{ flex: 1, fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.5 }}>{q.question.slice(0, 120)}{q.question.length > 120 ? '…' : ''}</span>
                    <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', background: TYPE_COLORS[q.type] + '22', color: TYPE_COLORS[q.type], fontWeight: 600 }}>{q.type}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', minWidth: '50px', textAlign: 'right' }}>{q.marks} marks</span>
                    {expanded.has(q.id) ? <ChevronUp size={16} color="var(--text-muted)" /> : <ChevronDown size={16} color="var(--text-muted)" />}
                  </button>
                  {expanded.has(q.id) && (
                    <div style={{ padding: '0 16px 16px', borderTop: '1px solid var(--border-color)' }} className="animate-fade-in">
                      <p style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.7, marginTop: '12px', marginBottom: '12px' }}>{q.question}</p>
                      <div style={{ background: 'var(--bg-secondary)', borderRadius: '8px', padding: '12px 14px', marginBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                          <BookOpen size={13} color="var(--accent-primary)" />
                          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Model Answer</span>
                        </div>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{q.modelAnswer}</p>
                      </div>
                      <div style={{ background: 'rgba(245,158,11,0.08)', borderRadius: '8px', padding: '10px 14px', border: '1px solid rgba(245,158,11,0.2)' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--warning)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Marking Guide</span>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '4px' }}>{q.markingGuide}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
