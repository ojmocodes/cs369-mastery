import { useState, useCallback } from 'react';
import type { Question } from '../types';
import { getQuestionsForNode } from '../data/courses/compsci369/questions';
import { useAppState } from '../context/AppContext';
import QuizQuestion from './QuizQuestion';

interface QuizProps {
  nodeId: string;
  courseId: string;
  nodeLabel: string;
  onClose: () => void;
}

export default function Quiz({ nodeId, courseId, nodeLabel, onClose }: QuizProps) {
  const { dispatch } = useAppState();
  const questions = getQuestionsForNode(nodeId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const handleAnswer = useCallback((correct: boolean) => {
    const newAnswers = [...answers, correct];
    setAnswers(newAnswers);

    if (correct) {
      setScore(s => s + 1);
    }

    dispatch({
      type: 'ANSWER_QUESTION',
      courseId,
      nodeId,
      questionId: questions[currentIndex].id,
      correct,
    });

    if (currentIndex + 1 >= questions.length) {
      const finalScore = correct ? score + 1 : score;
      setFinished(true);
      dispatch({
        type: 'COMPLETE_QUIZ',
        courseId,
        nodeId,
        score: finalScore,
        total: questions.length,
      });
    } else {
      setCurrentIndex(i => i + 1);
    }
  }, [answers, currentIndex, dispatch, courseId, nodeId, questions, score]);

  if (questions.length === 0) {
    return (
      <div className="p-4 space-y-4">
        <p className="text-sm text-zinc-400">No questions available for this node yet.</p>
        <button
          onClick={onClose}
          className="w-full py-2 rounded-lg text-sm bg-white/[0.06] hover:bg-white/[0.1] text-white transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (finished) {
    const passThreshold = Math.ceil(questions.length * 0.8);
    const passed = score >= passThreshold;
    const mastered = score === questions.length;

    return (
      <div className="p-4 space-y-4">
        <div className="text-center space-y-2 py-4">
          <div className={`text-4xl ${mastered ? 'text-amber-400' : passed ? 'text-emerald-400' : 'text-red-400'}`}>
            {mastered ? '★' : passed ? '✓' : '✗'}
          </div>
          <h3 className="text-lg font-semibold text-white">{nodeLabel}</h3>
          <p className="text-2xl font-bold text-white">
            {score} / {questions.length}
          </p>
          <p className={`text-sm font-medium ${mastered ? 'text-amber-400' : passed ? 'text-emerald-400' : 'text-red-400'}`}>
            {mastered ? 'Mastered!' : passed ? 'Passed!' : 'Not quite — try again'}
          </p>
        </div>

        {/* Answer summary */}
        <div className="space-y-1">
          {answers.map((correct, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <span className={correct ? 'text-emerald-400' : 'text-red-400'}>
                {correct ? '✓' : '✗'}
              </span>
              <span className="text-zinc-400 truncate">Q{i + 1}: {questions[i].question.slice(0, 60)}...</span>
            </div>
          ))}
        </div>

        <div className="space-y-2 pt-2">
          {!passed && (
            <button
              onClick={() => {
                setCurrentIndex(0);
                setScore(0);
                setFinished(false);
                setAnswers([]);
              }}
              className="w-full py-2.5 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
            >
              Try Again
            </button>
          )}
          <button
            onClick={onClose}
            className="w-full py-2 rounded-lg text-sm bg-white/[0.06] hover:bg-white/[0.1] text-white transition-colors"
          >
            Back to Node
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Progress dots */}
      <div className="flex items-center gap-1 mb-4">
        {questions.map((_: Question, i: number) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i < currentIndex
                ? answers[i]
                  ? 'bg-emerald-500'
                  : 'bg-red-500'
                : i === currentIndex
                ? 'bg-indigo-500'
                : 'bg-white/[0.06]'
            }`}
          />
        ))}
      </div>

      <QuizQuestion
        key={questions[currentIndex].id}
        question={questions[currentIndex]}
        onAnswer={handleAnswer}
        questionNumber={currentIndex + 1}
        totalQuestions={questions.length}
      />
    </div>
  );
}
