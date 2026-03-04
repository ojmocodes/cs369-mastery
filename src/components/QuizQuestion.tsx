import { useState } from 'react';
import type { Question } from '../types';

interface QuizQuestionProps {
  question: Question;
  onAnswer: (correct: boolean) => void;
  questionNumber: number;
  total: number;
}

export default function QuizQuestion({ question, onAnswer, questionNumber, total }: QuizQuestionProps) {
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // MC state
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Short answer state
  const [shortInput, setShortInput] = useState('');

  // Calculation state
  const [calcInput, setCalcInput] = useState('');

  function handleMCSubmit() {
    if (selectedIndex === null) return;
    const correct = selectedIndex === (question as any).correctIndex;
    setIsCorrect(correct);
    setAnswered(true);
  }

  function handleSASubmit() {
    if (!shortInput.trim()) return;
    const q = question as any;
    const correct = q.acceptableAnswers.some(
      (a: string) => a.toLowerCase().trim() === shortInput.toLowerCase().trim()
    );
    setIsCorrect(correct);
    setAnswered(true);
  }

  function handleCalcSubmit() {
    if (!calcInput.trim()) return;
    const q = question as any;
    const val = parseFloat(calcInput);
    const correct = !isNaN(val) && Math.abs(val - q.correctAnswer) <= q.tolerance;
    setIsCorrect(correct);
    setAnswered(true);
  }

  function handleNext() {
    onAnswer(isCorrect);
    // Reset state
    setAnswered(false);
    setIsCorrect(false);
    setSelectedIndex(null);
    setShortInput('');
    setCalcInput('');
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Question number */}
      <div className="text-[10px] text-zinc-600 uppercase tracking-wider">
        Question {questionNumber} of {total}
      </div>

      {/* Question text */}
      <p className="text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap">
        {question.question}
      </p>

      {/* Answer inputs */}
      {question.type === 'multiple-choice' && (
        <div className="flex flex-col gap-2">
          {question.options.map((opt, idx) => {
            let cls = 'flex items-start gap-2.5 px-3 py-2.5 rounded border text-sm cursor-pointer transition-colors ';
            if (!answered) {
              cls += selectedIndex === idx
                ? 'border-indigo-500 bg-indigo-950/60 text-zinc-100'
                : 'border-white/[0.08] bg-white/[0.03] text-zinc-300 hover:border-white/[0.15] hover:bg-white/[0.06]';
            } else {
              if (idx === question.correctIndex) {
                cls += 'border-emerald-500 bg-emerald-950/50 text-emerald-300';
              } else if (idx === selectedIndex && selectedIndex !== question.correctIndex) {
                cls += 'border-red-500 bg-red-950/50 text-red-300';
              } else {
                cls += 'border-white/[0.05] bg-transparent text-zinc-500';
              }
            }
            return (
              <button
                key={idx}
                className={cls}
                onClick={() => !answered && setSelectedIndex(idx)}
                disabled={answered}
              >
                <span className="w-4 h-4 shrink-0 rounded-full border border-current mt-0.5 flex items-center justify-center text-[9px] font-bold">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1 text-left">{opt}</span>
              </button>
            );
          })}
        </div>
      )}

      {question.type === 'short-answer' && (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={shortInput}
            onChange={e => setShortInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !answered && handleSASubmit()}
            placeholder="Your answer..."
            disabled={answered}
            className="bg-white/[0.04] border border-white/[0.1] rounded px-3 py-2 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 disabled:opacity-60"
          />
        </div>
      )}

      {question.type === 'calculation' && (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <input
              type="number"
              step="any"
              value={calcInput}
              onChange={e => setCalcInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !answered && handleCalcSubmit()}
              placeholder="Enter your answer..."
              disabled={answered}
              className="flex-1 bg-white/[0.04] border border-white/[0.1] rounded px-3 py-2 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 disabled:opacity-60"
            />
            {(question as any).unit && (
              <span className="text-xs text-zinc-500">{(question as any).unit}</span>
            )}
          </div>
          <p className="text-[10px] text-zinc-600">
            Tolerance: ±{(question as any).tolerance}
          </p>
        </div>
      )}

      {/* Submit / Next */}
      {!answered ? (
        <button
          onClick={
            question.type === 'multiple-choice' ? handleMCSubmit :
            question.type === 'short-answer' ? handleSASubmit :
            handleCalcSubmit
          }
          disabled={
            question.type === 'multiple-choice' ? selectedIndex === null :
            question.type === 'short-answer' ? !shortInput.trim() :
            !calcInput.trim()
          }
          className="w-full py-2 rounded bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium text-white transition-colors"
        >
          Submit
        </button>
      ) : (
        <div className="flex flex-col gap-3">
          {/* Result */}
          <div className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-medium ${
            isCorrect ? 'bg-emerald-950/60 text-emerald-300' : 'bg-red-950/50 text-red-300'
          }`}>
            <span>{isCorrect ? '✓ Correct!' : '✗ Incorrect'}</span>
          </div>

          {/* Explanation */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded px-3 py-2.5">
            <p className="text-[11px] text-zinc-600 font-semibold uppercase tracking-wider mb-1">Explanation</p>
            <p className="text-xs text-zinc-400 leading-relaxed">{question.explanation}</p>
          </div>

          <button
            onClick={handleNext}
            className="w-full py-2 rounded bg-white/[0.06] hover:bg-white/[0.1] text-sm font-medium text-zinc-300 transition-colors"
          >
            Next Question →
          </button>
        </div>
      )}
    </div>
  );
}
