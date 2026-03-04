import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { questionBank } from '../data/questions';
import QuizQuestion from './QuizQuestion';
import type { Question } from '../types';

interface QuizProps {
  nodeId: string;
  onClose: () => void;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Quiz({ nodeId, onClose }: QuizProps) {
  const { startQuiz, completeQuiz } = useApp();

  const questions: Question[] = useMemo(() => {
    const nodeQs = questionBank.filter(q => q.nodeId === nodeId);
    return shuffle(nodeQs).slice(0, 5);
  }, [nodeId]);

  const [started, setStarted] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);

  function handleStart() {
    startQuiz(nodeId);
    setStarted(true);
  }

  function handleAnswer(correct: boolean) {
    const newResults = [...results, correct];
    setResults(newResults);
    if (qIndex + 1 >= questions.length) {
      // Quiz done
      const correct_count = newResults.filter(Boolean).length;
      const score = correct_count / questions.length;
      completeQuiz(nodeId, score, correct_count, questions.length);
      setFinished(true);
    } else {
      setQIndex(qIndex + 1);
    }
  }

  if (questions.length === 0) {
    return (
      <div className="p-4 text-sm text-zinc-500 text-center py-8">
        No questions available for this node yet.
      </div>
    );
  }

  if (!started) {
    return (
      <div className="p-4 flex flex-col gap-3">
        <p className="text-sm text-zinc-300">
          This quiz has <span className="text-indigo-400 font-medium">{questions.length} questions</span>.
          Pass rate is 70%. Master with 90%+ on two attempts.
        </p>
        <button
          onClick={handleStart}
          className="w-full py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors"
        >
          Start Quiz
        </button>
        <button
          onClick={onClose}
          className="w-full py-1.5 rounded bg-white/[0.04] hover:bg-white/[0.08] text-sm text-zinc-500 transition-colors"
        >
          Cancel
        </button>
      </div>
    );
  }

  if (finished) {
    const correct = results.filter(Boolean).length;
    const score = correct / questions.length;
    const pct = Math.round(score * 100);
    const passed = score >= 0.7;

    return (
      <div className="p-4 flex flex-col gap-4">
        <div className={`text-center py-4 rounded ${
          passed ? 'bg-emerald-950/50' : 'bg-red-950/30'
        }`}>
          <div className={`text-3xl font-bold ${passed ? 'text-emerald-400' : 'text-red-400'}`}>
            {pct}%
          </div>
          <div className={`text-sm mt-1 ${passed ? 'text-emerald-300' : 'text-red-300'}`}>
            {passed ? '✓ Passed' : '✗ Not passed (need 70%)'}
          </div>
          <div className="text-xs text-zinc-500 mt-1">{correct}/{questions.length} correct</div>
        </div>

        {results.map((r, i) => (
          <div key={i} className={`flex items-center gap-2 text-xs ${
            r ? 'text-emerald-400' : 'text-red-400'
          }`}>
            <span>{r ? '✓' : '✗'}</span>
            <span className="text-zinc-500 truncate">Q{i+1}: {questions[i].question.slice(0, 60)}...</span>
          </div>
        ))}

        <button
          onClick={onClose}
          className="w-full py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors"
        >
          Back to Node
        </button>
      </div>
    );
  }

  return (
    <QuizQuestion
      question={questions[qIndex]}
      onAnswer={handleAnswer}
      questionNumber={qIndex + 1}
      total={questions.length}
    />
  );
}
