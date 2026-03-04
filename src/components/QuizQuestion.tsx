import { useState } from 'react';
import type { Question } from '../types';

interface QuizQuestionProps {
  question: Question;
  onAnswer: (correct: boolean) => void;
  questionNumber: number;
  totalQuestions: number;
}

export default function QuizQuestion({ question, onAnswer, questionNumber, totalQuestions }: QuizQuestionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  function checkAnswer() {
    let correct = false;

    switch (question.type) {
      case 'multiple-choice':
        correct = selectedIndex === question.correctIndex;
        break;
      case 'short-answer':
        correct = question.acceptableAnswers.some(ans => {
          if (question.caseSensitive) return textAnswer.trim() === ans;
          return textAnswer.trim().toLowerCase() === ans.toLowerCase();
        });
        break;
      case 'calculation': {
        const num = parseFloat(textAnswer);
        if (!isNaN(num)) {
          correct = Math.abs(num - question.correctAnswer) <= question.tolerance;
        }
        break;
      }
    }

    setIsCorrect(correct);
    setSubmitted(true);
  }

  function handleNext() {
    onAnswer(isCorrect);
  }

  const canSubmit = question.type === 'multiple-choice'
    ? selectedIndex !== null
    : textAnswer.trim().length > 0;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-500">Question {questionNumber} of {totalQuestions}</span>
        <span className={`text-[11px] px-2 py-0.5 rounded-full ${
          question.type === 'multiple-choice'
            ? 'bg-indigo-500/15 text-indigo-400'
            : question.type === 'short-answer'
            ? 'bg-emerald-500/15 text-emerald-400'
            : 'bg-amber-500/15 text-amber-400'
        }`}>
          {question.type === 'multiple-choice' ? 'Multiple Choice' :
           question.type === 'short-answer' ? 'Short Answer' : 'Calculation'}
        </span>
      </div>

      {/* Question text */}
      <p className="text-sm text-zinc-200 leading-relaxed whitespace-pre-line">{question.question}</p>

      {/* Answer input */}
      {question.type === 'multiple-choice' && (
        <div className="space-y-2">
          {question.options.map((option, idx) => {
            let classes = 'w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all border ';
            if (submitted) {
              if (idx === question.correctIndex) {
                classes += 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300';
              } else if (idx === selectedIndex && !isCorrect) {
                classes += 'border-red-500/40 bg-red-500/10 text-red-300';
              } else {
                classes += 'border-white/[0.04] bg-white/[0.02] text-zinc-500';
              }
            } else {
              if (idx === selectedIndex) {
                classes += 'border-indigo-500/40 bg-indigo-500/10 text-white';
              } else {
                classes += 'border-white/[0.06] bg-white/[0.02] text-zinc-300 hover:border-white/[0.12] hover:bg-white/[0.04]';
              }
            }
            return (
              <button
                key={idx}
                onClick={() => !submitted && setSelectedIndex(idx)}
                className={classes}
                disabled={submitted}
              >
                <span className="inline-flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full border border-current/30 flex items-center justify-center text-[11px] font-medium shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </span>
              </button>
            );
          })}
        </div>
      )}

      {(question.type === 'short-answer' || question.type === 'calculation') && (
        <div>
          <input
            type={question.type === 'calculation' ? 'number' : 'text'}
            value={textAnswer}
            onChange={e => setTextAnswer(e.target.value)}
            placeholder={question.type === 'calculation'
              ? `Enter a number${question.unit ? ` (${question.unit})` : ''}`
              : 'Type your answer...'
            }
            disabled={submitted}
            className={`w-full px-3 py-2.5 rounded-lg text-sm bg-white/[0.04] border transition-colors outline-none ${
              submitted
                ? isCorrect
                  ? 'border-emerald-500/40 text-emerald-300'
                  : 'border-red-500/40 text-red-300'
                : 'border-white/[0.08] text-white placeholder-zinc-600 focus:border-indigo-500/50'
            }`}
            onKeyDown={e => {
              if (e.key === 'Enter' && canSubmit && !submitted) checkAnswer();
            }}
          />
          {submitted && !isCorrect && question.type === 'calculation' && (
            <p className="mt-1 text-xs text-zinc-500">
              Correct answer: {question.correctAnswer}{question.tolerance > 0 ? ` (±${question.tolerance})` : ''}
            </p>
          )}
          {submitted && !isCorrect && question.type === 'short-answer' && (
            <p className="mt-1 text-xs text-zinc-500">
              Accepted answers: {question.acceptableAnswers.join(', ')}
            </p>
          )}
        </div>
      )}

      {/* Submit / feedback */}
      {!submitted ? (
        <button
          onClick={checkAnswer}
          disabled={!canSubmit}
          className="w-full py-2.5 rounded-lg text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-indigo-600 hover:bg-indigo-500 text-white"
        >
          Check Answer
        </button>
      ) : (
        <div className="space-y-3">
          {/* Feedback */}
          <div className={`px-3 py-2.5 rounded-lg text-sm ${
            isCorrect
              ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300'
              : 'bg-red-500/10 border border-red-500/20 text-red-300'
          }`}>
            <div className="flex items-center gap-2 font-medium mb-1">
              {isCorrect ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Correct!
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                  Incorrect
                </>
              )}
            </div>
            <p className="text-xs leading-relaxed opacity-80 whitespace-pre-line">{question.explanation}</p>
          </div>

          <button
            onClick={handleNext}
            className="w-full py-2.5 rounded-lg text-sm font-medium bg-white/[0.06] hover:bg-white/[0.1] text-white transition-colors"
          >
            {questionNumber < totalQuestions ? 'Next Question' : 'See Results'}
          </button>
        </div>
      )}
    </div>
  );
}
