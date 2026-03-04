import { useState } from 'react';
import { examQuestionTexts } from '../data/courses/compsci369/examQuestions';
import type { ExamQuestion } from '../types';

interface ExamQuestionViewerProps {
  examQuestions: ExamQuestion[];
}

export default function ExamQuestionViewer({ examQuestions }: ExamQuestionViewerProps) {
  const [expanded, setExpanded] = useState(false);
  const [openQuestions, setOpenQuestions] = useState<Set<string>>(new Set());

  if (examQuestions.length === 0) return null;

  function toggleQuestion(id: string) {
    setOpenQuestions(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between text-xs font-medium text-zinc-500 uppercase tracking-wider hover:text-zinc-300 transition-colors py-1"
      >
        <span>Exam Coverage ({examQuestions.length} question{examQuestions.length !== 1 ? 's' : ''})</span>
        <svg
          width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {expanded && (
        <div className="mt-2 space-y-2">
          {examQuestions.map(eq => {
            const textData = examQuestionTexts[eq.id];
            const isOpen = openQuestions.has(eq.id);

            return (
              <div
                key={eq.id}
                className="rounded-md bg-white/[0.02] border border-white/[0.04] overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-2.5 py-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xs text-zinc-300 truncate">{eq.label}</span>
                    {textData && (
                      <span className="text-[10px] text-zinc-600 shrink-0">{textData.source}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] text-zinc-500">{eq.marks}m</span>
                    {textData && (
                      <button
                        onClick={() => toggleQuestion(eq.id)}
                        className="text-[11px] text-indigo-400 hover:text-indigo-300 transition-colors px-1.5 py-0.5 rounded bg-indigo-500/10 hover:bg-indigo-500/20"
                      >
                        {isOpen ? 'Hide' : 'View'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Expanded question text */}
                {isOpen && textData && (
                  <div className="px-3 pb-3 border-t border-white/[0.04]">
                    <pre className="text-xs text-zinc-400 leading-relaxed whitespace-pre-wrap font-sans mt-2">
                      {textData.text}
                    </pre>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
