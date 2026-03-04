import { useState, useCallback } from 'react';
import { Question } from '../types';
import QuizQuestion from './QuizQuestion';
import { CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';

interface Props {
  questions: Question[];
  onComplete?: (score: number, total: number) => void;
}

const PASS_THRESHOLD = 0.8;

export default function Quiz({ questions, onComplete }: Props) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [finished, setFinished] = useState(false);

  const q = questions[current];
  const score = answers.filter((a, i) => a === questions[i].answer).length;
  const passed = score / questions.length >= PASS_THRESHOLD;

  const handleSelect = (i: number) => setSelected(i);

  const handleReveal = () => {
    if (selected === null) return;
    setRevealed(true);
    const newAnswers = [...answers];
    newAnswers[current] = selected;
    setAnswers(newAnswers);
  };

  const handleNext = useCallback(() => {
    if (current + 1 >= questions.length) {
      setFinished(true);
      onComplete?.(score, questions.length);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setRevealed(false);
    }
  }, [current, questions.length, score, onComplete]);

  const handleReset = () => {
    setCurrent(0); setSelected(null); setRevealed(false);
    setAnswers(Array(questions.length).fill(null)); setFinished(false);
  };

  if (finished) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px' }} className="animate-fade-in">
        <Trophy size={48} color={passed ? 'var(--success)' : 'var(--warning)'} style={{ marginBottom: '16px' }} />
        <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>{passed ? 'Test Passed!' : 'Keep Practising'}</h2>
        <p style={{ fontSize: '32px', fontWeight: 700, color: passed ? 'var(--success)' : 'var(--warning)', marginBottom: '8px' }}>
          {score}/{questions.length}
        </p>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
          {Math.round(score/questions.length*100)}% correct — need {Math.round(PASS_THRESHOLD*100)}% to pass
        </p>
        <button onClick={handleReset} style={btnStyle}>
          <RotateCcw size={16} /> Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Question {current+1} of {questions.length}</span>
        <div style={{ display: 'flex', gap: '4px' }}>
          {questions.map((_, i) => (
            <div key={i} style={{
              width: 8, height: 8, borderRadius: '50%',
              background: i < current
                ? (answers[i] === questions[i].answer ? 'var(--success)' : 'var(--danger)')
                : i === current ? 'var(--accent-primary)' : 'var(--border-color)',
            }} />
          ))}
        </div>
      </div>

      <QuizQuestion question={q} selected={selected} onSelect={handleSelect} revealed={revealed} />

      <div style={{ display: 'flex', gap: '10px', marginTop: '24px', justifyContent: 'flex-end' }}>
        {!revealed ? (
          <button onClick={handleReveal} disabled={selected === null} style={{ ...btnStyle, opacity: selected === null ? 0.5 : 1 }}>
            <CheckCircle size={16} /> Check
          </button>
        ) : (
          <button onClick={handleNext} style={btnStyle}>
            {current+1 < questions.length ? 'Next →' : 'Finish'}
          </button>
        )}
      </div>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: '6px',
  padding: '8px 18px', borderRadius: '8px',
  background: 'var(--accent-primary)', border: 'none',
  color: '#fff', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
};
