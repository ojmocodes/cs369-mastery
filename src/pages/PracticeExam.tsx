import { useState, useEffect, useCallback } from 'react';
import { useAppState, courseTreeRegistry } from '../context/AppContext';
import { questionBank } from '../data/courses/compsci369/questions';
import { treeData as cs369Tree } from '../data/courses/compsci369/tree';
import QuizQuestion from '../components/QuizQuestion';
import type { Question, ExamAttempt } from '../types';

// 2025 exam sections
const EXAM_SECTIONS = [
  {
    id: 'section-A',
    label: 'Section A: Numerical Integration',
    marks: 30,
    nodeIds: ['complex-systems', 'dynamical-systems', 'fixed-points', 'cobweb-diagrams', 'newtons-method', 'nm-derivation', 'nm-convergence', 'nm-failures', 'ode-basics', 'euler-method', 'euler-error', 'rk4', 'rk4-slopes', 'systems-of-odes'],
  },
  {
    id: 'section-B',
    label: 'Section B: Sequence Alignment',
    marks: 18,
    nodeIds: ['genetics-intro', 'pairwise-alignment', 'dp-principle', 'needleman-wunsch', 'nw-recurrence', 'nw-traceback', 'smith-waterman', 'affine-gaps', 'affine-recurrences', 'multiple-sequence-alignment', 'progressive-alignment'],
  },
  {
    id: 'section-C',
    label: 'Section C: Simulation & HMMs',
    marks: 39,
    nodeIds: ['probability-primer', 'exponential-distribution', 'inversion-sampling', 'simulation-basics', 'bayesian-inference', 'poisson-process', 'poisson-simulation', 'random-walk', 'markov-property', 'markov-chains', 'stationary-distribution', 'hmm-definition', 'hmm-three-problems', 'viterbi', 'viterbi-recurrence', 'forward-algorithm', 'forward-termination', 'backward-baum-welch'],
  },
  {
    id: 'section-D',
    label: 'Section D: Trees & Phylogenetics',
    marks: 33,
    nodeIds: ['distance-methods', 'upgma-algorithm', 'upgma', 'neighbour-joining', 'parsimony-sites', 'parsimony', 'fitch-algorithm', 'parsimony-search', 'evolutionary-models', 'rate-matrix', 'ml-trees', 'game-theory', 'ess-analysis'],
  },
];

const EXAM_DURATION_SECS = 3 * 60 * 60; // 3 hours

function getQuestionsForSection(nodeIds: string[]): Question[] {
  const pool = questionBank.filter(q => nodeIds.includes(q.nodeId));
  return pool.sort(() => Math.random() - 0.5).slice(0, Math.min(8, pool.length));
}

function formatTime(secs: number): string {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export default function PracticeExam() {
  const { state, dispatch, navigate } = useAppState();
  const courseId = state.currentCourseId;

  const [phase, setPhase] = useState<'config' | 'exam' | 'results'>('config');
  const [examDuration, setExamDuration] = useState(EXAM_DURATION_SECS);
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION_SECS);
  const [startTime, setStartTime] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);

  // Per-section: questions + answers
  const [sectionQuestions, setSectionQuestions] = useState<Question[][]>([]);
  const [sectionAnswers, setSectionAnswers] = useState<(boolean | null)[][]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);

  const [timerActive, setTimerActive] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (!timerActive || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(interval);
          finishExam();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive]);

  function startExam() {
    const qs = EXAM_SECTIONS.map(s => getQuestionsForSection(s.nodeIds));
    setSectionQuestions(qs);
    setSectionAnswers(qs.map(sq => new Array(sq.length).fill(null)));
    setCurrentSection(0);
    setCurrentQIndex(0);
    setStartTime(Date.now());
    setTimeLeft(examDuration);
    setTimerActive(true);
    setPhase('exam');
  }

  function finishExam() {
    setTimerActive(false);
    setPhase('results');

    const timeTaken = Math.round((Date.now() - startTime) / 1000);
    const sectionScores: Record<string, number> = {};
    let totalScore = 0;
    let totalQuestions = 0;

    sectionAnswers.forEach((answers, idx) => {
      const correct = answers.filter(a => a === true).length;
      sectionScores[EXAM_SECTIONS[idx].id] = correct;
      totalScore += correct;
      totalQuestions += answers.length;
    });

    if (courseId) {
      const attempt: ExamAttempt = {
        id: `exam-${Date.now()}`,
        date: new Date().toISOString(),
        score: totalScore,
        total: totalQuestions,
        timeTaken,
        sectionScores,
      };
      dispatch({ type: 'RECORD_EXAM_ATTEMPT', courseId, attempt });
    }
  }

  function handleAnswer(correct: boolean) {
    const newSectionAnswers = sectionAnswers.map((arr, i) => i === currentSection ? [...arr] : arr);
    newSectionAnswers[currentSection][currentQIndex] = correct;
    setSectionAnswers(newSectionAnswers);

    const qs = sectionQuestions[currentSection];
    if (currentQIndex + 1 < qs.length) {
      setCurrentQIndex(i => i + 1);
    } else if (currentSection + 1 < EXAM_SECTIONS.length) {
      setCurrentSection(s => s + 1);
      setCurrentQIndex(0);
    } else {
      finishExam();
    }
  }

  function handlePrintExam() {
    const printContent = `
      <html><head><title>COMPSCI 369 Practice Exam</title>
      <style>
        body { font-family: serif; max-width: 720px; margin: 40px auto; font-size: 12pt; line-height: 1.6; }
        h1 { font-size: 18pt; margin-bottom: 4px; }
        h2 { font-size: 14pt; margin-top: 32px; border-top: 1px solid #ccc; padding-top: 12px; }
        .meta { color: #666; font-size: 10pt; margin-bottom: 4px; }
        .question { margin-bottom: 24px; page-break-inside: avoid; }
        .options { margin-left: 20px; margin-top: 6px; }
        .option { margin: 3px 0; }
      </style></head><body>
      <h1>COMPSCI 369 Practice Exam</h1>
      <div class="meta">Duration: 3 hours · ${new Date().toLocaleDateString()}</div>
      <div class="meta">Total marks: 120</div>

      ${EXAM_SECTIONS.map((section, si) => {
        const qs = sectionQuestions[si] || [];
        return `
          <h2>${section.label} [${section.marks} marks]</h2>
          ${qs.map((q, qi) => `
            <div class="question">
              <div><b>Q${qi + 1}.</b> ${q.question.replace(/\n/g, '<br>')}</div>
              ${q.type === 'multiple-choice' ? `
                <div class="options">${(q as { options: string[] }).options.map((opt, idx) =>
                  `<div class="option">${String.fromCharCode(65 + idx)}) ${opt}</div>`
                ).join('')}</div>
              ` : `<div style="margin-top: 8px">Answer: _____________________________________________</div>`}
            </div>
          `).join('')}
        `;
      }).join('')}
      </body></html>
    `;
    const w = window.open('', '_blank');
    if (w) {
      w.document.write(printContent);
      w.document.close();
      w.print();
    }
  }

  if (!courseId) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-zinc-500">No course selected.</p>
      </div>
    );
  }

  // ── Config phase ──────────────────────────────────────────────
  if (phase === 'config') {
    return (
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-6 text-xs text-zinc-600">
            <button onClick={() => navigate('dashboard')} className="hover:text-zinc-400 transition-colors">Dashboard</button>
            <span>/</span>
            <span className="text-zinc-400">Practice Exam</span>
          </div>

          <h1 className="text-xl font-bold text-white mb-1">Practice Exam</h1>
          <p className="text-sm text-zinc-400 mb-8">Full exam simulation with timed sections. 3 hours, 120 marks.</p>

          {/* Exam structure */}
          <div className="mb-8 p-5 rounded-xl bg-[#16161e] border border-white/[0.06]">
            <h2 className="text-sm font-semibold text-zinc-300 mb-4">Exam Structure</h2>
            <div className="space-y-3">
              {EXAM_SECTIONS.map(section => (
                <div key={section.id} className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400">{section.label}</span>
                  <span className="text-xs text-zinc-600">{section.marks} marks</span>
                </div>
              ))}
              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-300">Total</span>
                <span className="text-xs font-medium text-zinc-300">120 marks</span>
              </div>
            </div>
          </div>

          {/* Timer setting */}
          <div className="mb-8">
            <label className="text-sm font-medium text-zinc-300 block mb-2">
              Time Limit: <span className="text-indigo-400">{Math.floor(examDuration / 3600)}h {Math.floor((examDuration % 3600) / 60)}m</span>
            </label>
            <div className="flex gap-2">
              {[
                { label: '1 hour', value: 3600 },
                { label: '2 hours', value: 7200 },
                { label: '3 hours', value: 10800 },
                { label: 'No limit', value: 999999 },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setExamDuration(opt.value)}
                  className={`px-3 py-1.5 rounded-md text-xs border transition-colors ${
                    examDuration === opt.value
                      ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-400'
                      : 'bg-white/[0.02] border-white/[0.08] text-zinc-400 hover:border-white/[0.14]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={startExam}
            className="w-full py-3 rounded-lg text-sm font-medium bg-purple-600 hover:bg-purple-500 text-white transition-colors"
          >
            Start Exam
          </button>
        </div>
      </div>
    );
  }

  // ── Exam phase ─────────────────────────────────────────────────
  if (phase === 'exam') {
    const section = EXAM_SECTIONS[currentSection];
    const qs = sectionQuestions[currentSection] || [];
    const currentQ = qs[currentQIndex];
    const isLowTime = timeLeft < 600; // < 10 min

    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Exam header */}
        <div className="bg-[#16161e] border-b border-white/[0.06] px-4 py-2 flex items-center justify-between shrink-0">
          <div className="text-xs text-zinc-400">
            <span className="text-white font-medium">{section.label}</span>
            <span className="mx-2 text-zinc-700">·</span>
            <span>Q{currentQIndex + 1}/{qs.length}</span>
          </div>

          {/* Section tabs */}
          <div className="flex gap-1">
            {EXAM_SECTIONS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => { setCurrentSection(i); setCurrentQIndex(0); }}
                className={`px-2 py-1 rounded text-[11px] transition-colors ${
                  i === currentSection
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'text-zinc-600 hover:text-zinc-400'
                }`}
              >
                {String.fromCharCode(65 + i)}
              </button>
            ))}
          </div>

          <div className={`text-sm font-mono font-semibold ${isLowTime ? 'text-red-400' : 'text-zinc-300'}`}>
            {examDuration >= 999999 ? '∞' : formatTime(timeLeft)}
          </div>
        </div>

        {/* Section progress bar */}
        <div className="flex gap-0.5 h-1 shrink-0">
          {qs.map((_, i) => {
            const ans = sectionAnswers[currentSection]?.[i];
            return (
              <div
                key={i}
                className={`flex-1 ${
                  ans === null ? (i === currentQIndex ? 'bg-purple-500' : 'bg-white/[0.06]')
                    : ans ? 'bg-emerald-500' : 'bg-red-500'
                }`}
              />
            );
          })}
        </div>

        {/* Question content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-2xl">
            {currentQ && (
              <QuizQuestion
                key={`${currentSection}-${currentQIndex}`}
                question={currentQ}
                onAnswer={handleAnswer}
                questionNumber={currentQIndex + 1}
                totalQuestions={qs.length}
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/[0.06] px-4 py-2 flex items-center justify-between shrink-0">
          <button
            onClick={() => {
              if (currentQIndex > 0) setCurrentQIndex(i => i - 1);
              else if (currentSection > 0) {
                setCurrentSection(s => s - 1);
                setCurrentQIndex(sectionQuestions[currentSection - 1].length - 1);
              }
            }}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            disabled={currentSection === 0 && currentQIndex === 0}
          >
            ← Previous
          </button>
          <button
            onClick={() => {
              if (window.confirm('Submit exam and see results?')) {
                finishExam();
              }
            }}
            className="px-4 py-1.5 rounded-md text-xs font-medium bg-purple-600 hover:bg-purple-500 text-white transition-colors"
          >
            Submit Exam
          </button>
        </div>
      </div>
    );
  }

  // ── Results phase ─────────────────────────────────────────────
  const totalAnswered = sectionAnswers.flat().filter(a => a !== null).length;
  const totalCorrect = sectionAnswers.flat().filter(a => a === true).length;
  const overallPct = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const timeTaken = Math.round((Date.now() - startTime) / 1000);

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-2xl">
        <h2 className="text-xl font-bold text-white mb-1">Exam Complete</h2>
        <p className="text-sm text-zinc-500 mb-8">Section-by-section breakdown below.</p>

        {/* Overall card */}
        <div className="p-6 rounded-xl bg-[#16161e] border border-white/[0.06] mb-6 text-center">
          <div className={`text-5xl font-bold mb-2 ${overallPct >= 50 ? 'text-emerald-400' : 'text-amber-400'}`}>
            {totalCorrect}/{totalAnswered}
          </div>
          <div className="text-lg text-zinc-300 mb-1">{overallPct}% correct</div>
          <div className="text-xs text-zinc-600">Time: {formatTime(timeTaken)}</div>
        </div>

        {/* Section breakdown */}
        <div className="space-y-4 mb-8">
          {EXAM_SECTIONS.map((section, si) => {
            const answers = sectionAnswers[si] || [];
            const correct = answers.filter(a => a === true).length;
            const total = answers.length;
            const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
            return (
              <div key={section.id} className="p-4 rounded-xl bg-[#16161e] border border-white/[0.06]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-zinc-300">{section.label}</span>
                  <span className={`text-sm font-semibold ${pct >= 50 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {correct}/{total}
                  </span>
                </div>
                <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: pct >= 70 ? '#22c55e' : pct >= 50 ? '#f59e0b' : '#ef4444'
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => setPhase('config')}
            className="flex-1 py-2.5 rounded-lg text-sm font-medium bg-purple-600 hover:bg-purple-500 text-white transition-colors"
          >
            New Exam
          </button>
          <button
            onClick={handlePrintExam}
            className="flex-1 py-2.5 rounded-lg text-sm font-medium bg-white/[0.06] hover:bg-white/[0.1] text-white transition-colors"
          >
            Download Exam PDF
          </button>
          <button
            onClick={() => navigate('dashboard')}
            className="py-2.5 px-4 rounded-lg text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
