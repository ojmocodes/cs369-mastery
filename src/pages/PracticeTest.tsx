import { useState, useCallback } from 'react';
import { useAppState, courseTreeRegistry } from '../context/AppContext';
import { questionBank } from '../data/courses/compsci369/questions';
import QuizQuestion from '../components/QuizQuestion';
import type { Question, TestAttempt } from '../types';

interface TestConfig {
  numQuestions: number;
  selectedTopics: Set<string>;
  displayMode: 'one-at-a-time' | 'all-at-once';
}

interface TestResult {
  questions: Question[];
  answers: (boolean | null)[];
  startTime: number;
  endTime: number;
}

function generateTestQuestions(
  numQuestions: number,
  selectedTopics: Set<string>,
  courseId: string
): Question[] {
  const tree = courseTreeRegistry[courseId];
  if (!tree) return [];

  const selectedNodeIds = selectedTopics.size > 0
    ? tree.nodes.filter(n => selectedTopics.has(n.id)).map(n => n.id)
    : tree.nodes.map(n => n.id);

  // Get questions for selected nodes (exclude placeholder-style questions)
  let pool = questionBank.filter(q => selectedNodeIds.includes(q.nodeId));

  // Shuffle
  pool = pool.sort(() => Math.random() - 0.5);

  return pool.slice(0, numQuestions);
}

export default function PracticeTest() {
  const { state, dispatch, navigate } = useAppState();
  const courseId = state.currentCourseId;
  const treeData = courseId ? courseTreeRegistry[courseId] : null;

  const [phase, setPhase] = useState<'config' | 'test' | 'results'>('config');
  const [config, setConfig] = useState<TestConfig>({
    numQuestions: 8,
    selectedTopics: new Set(),
    displayMode: 'one-at-a-time',
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<(boolean | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [allAnswers, setAllAnswers] = useState<Record<number, boolean | null>>({});

  if (!courseId || !treeData) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-zinc-500">No course selected.</p>
      </div>
    );
  }

  function startTest() {
    const qs = generateTestQuestions(config.numQuestions, config.selectedTopics, courseId!);
    if (qs.length === 0) {
      return;
    }
    setQuestions(qs);
    setAnswers(new Array(qs.length).fill(null));
    setCurrentIndex(0);
    setStartTime(Date.now());
    setAllAnswers({});
    setPhase('test');
  }

  function handleAnswer(correct: boolean) {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = correct;
    setAnswers(newAnswers);
    setAllAnswers(prev => ({ ...prev, [currentIndex]: correct }));

    if (currentIndex + 1 >= questions.length) {
      const end = Date.now();
      setEndTime(end);
      setPhase('results');

      // Record attempt
      const score = newAnswers.filter(a => a === true).length;
      const attempt: TestAttempt = {
        id: `test-${Date.now()}`,
        date: new Date().toISOString(),
        score,
        total: questions.length,
        timeTaken: Math.round((end - startTime) / 1000),
        questionIds: questions.map(q => q.id),
      };
      dispatch({ type: 'RECORD_TEST_ATTEMPT', courseId: courseId!, attempt });
    } else {
      setCurrentIndex(i => i + 1);
    }
  }

  function handlePrintTest() {
    const printContent = `
      <html><head><title>Practice Test</title>
      <style>
        body { font-family: serif; max-width: 700px; margin: 40px auto; font-size: 12pt; line-height: 1.6; }
        h1 { font-size: 18pt; margin-bottom: 4px; }
        .meta { color: #666; font-size: 10pt; margin-bottom: 24px; }
        .question { margin-bottom: 28px; page-break-inside: avoid; }
        .q-num { font-weight: bold; }
        .options { margin-left: 20px; margin-top: 8px; }
        .option { margin: 4px 0; }
        @media print { .no-print { display: none; } }
      </style></head><body>
      <h1>COMPSCI 369 Practice Test</h1>
      <div class="meta">${new Date().toLocaleDateString()} · ${questions.length} questions</div>
      ${questions.map((q, i) => `
        <div class="question">
          <div class="q-num">Q${i + 1}. (${q.type})</div>
          <div style="margin-top: 4px">${q.question.replace(/\n/g, '<br>')}</div>
          ${q.type === 'multiple-choice' ? `
            <div class="options">
              ${(q as { options: string[] }).options.map((opt, idx) =>
                `<div class="option">${String.fromCharCode(65 + idx)}) ${opt}</div>`
              ).join('')}
            </div>
          ` : q.type === 'calculation' ? `
            <div style="margin-top: 8px">Answer: _______________${(q as { unit?: string }).unit ? ` (${(q as { unit?: string }).unit})` : ''}</div>
          ` : `
            <div style="margin-top: 8px">Answer: _______________</div>
          `}
        </div>
      `).join('')}
      </body></html>
    `;
    const w = window.open('', '_blank');
    if (w) {
      w.document.write(printContent);
      w.document.close();
      w.print();
    }
  }

  // ── Config phase ──────────────────────────────────────────────
  if (phase === 'config') {
    const topicGroups = treeData.tiers.map(tier => ({
      tier,
      nodes: treeData.nodes.filter(n => n.tier === tier.id),
    }));

    return (
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-xs text-zinc-600">
            <button onClick={() => navigate('dashboard')} className="hover:text-zinc-400 transition-colors">Dashboard</button>
            <span>/</span>
            <span className="text-zinc-400">Practice Test</span>
          </div>

          <h1 className="text-xl font-bold text-white mb-1">Practice Test Generator</h1>
          <p className="text-sm text-zinc-400 mb-8">Generate a customised practice test from selected topics.</p>

          <div className="space-y-6">
            {/* Number of questions */}
            <div>
              <label className="text-sm font-medium text-zinc-300 block mb-2">
                Number of Questions: <span className="text-indigo-400">{config.numQuestions}</span>
              </label>
              <input
                type="range"
                min={3}
                max={20}
                value={config.numQuestions}
                onChange={e => setConfig(prev => ({ ...prev, numQuestions: Number(e.target.value) }))}
                className="w-full accent-indigo-500"
              />
              <div className="flex justify-between text-xs text-zinc-600 mt-1">
                <span>3</span><span>20</span>
              </div>
            </div>

            {/* Display mode */}
            <div>
              <label className="text-sm font-medium text-zinc-300 block mb-2">Display Mode</label>
              <div className="flex gap-2">
                {[
                  { value: 'one-at-a-time', label: 'One at a time' },
                  { value: 'all-at-once', label: 'All at once' },
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setConfig(prev => ({ ...prev, displayMode: opt.value as TestConfig['displayMode'] }))}
                    className={`px-3 py-1.5 rounded-md text-xs border transition-colors ${
                      config.displayMode === opt.value
                        ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-400'
                        : 'bg-white/[0.02] border-white/[0.08] text-zinc-400 hover:border-white/[0.14]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Topic selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-zinc-300">Topics</label>
                <button
                  onClick={() => setConfig(prev => ({
                    ...prev,
                    selectedTopics: prev.selectedTopics.size === 0
                      ? new Set(treeData.nodes.map(n => n.id))
                      : new Set()
                  }))}
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  {config.selectedTopics.size === 0 ? 'Select All' : 'Clear All'}
                </button>
              </div>
              <p className="text-xs text-zinc-600 mb-3">Leave empty to include all topics</p>

              <div className="space-y-4">
                {topicGroups.map(({ tier, nodes }) => (
                  <div key={tier.id}>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tier.color }} />
                      <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{tier.label}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pl-4">
                      {nodes.map(node => {
                        const isSelected = config.selectedTopics.has(node.id);
                        return (
                          <button
                            key={node.id}
                            onClick={() => {
                              const next = new Set(config.selectedTopics);
                              if (isSelected) next.delete(node.id);
                              else next.add(node.id);
                              setConfig(prev => ({ ...prev, selectedTopics: next }));
                            }}
                            className={`text-xs px-2 py-1 rounded-md border transition-colors ${
                              isSelected
                                ? 'text-white border-indigo-500/40 bg-indigo-500/15'
                                : 'text-zinc-500 border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:text-zinc-300'
                            }`}
                          >
                            {node.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={startTest}
              className="w-full py-2.5 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
            >
              Generate Test ({config.numQuestions} questions)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Test phase ────────────────────────────────────────────────
  if (phase === 'test') {
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;

    if (config.displayMode === 'one-at-a-time') {
      return (
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold text-white">Practice Test</h2>
                <p className="text-xs text-zinc-500">Question {currentIndex + 1} of {questions.length}</p>
              </div>
              <span className="text-xs text-zinc-500">{mins}:{secs.toString().padStart(2, '0')}</span>
            </div>

            {/* Progress bar */}
            <div className="flex gap-1 mb-6">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full ${
                    i < currentIndex
                      ? answers[i] ? 'bg-emerald-500' : 'bg-red-500'
                      : i === currentIndex ? 'bg-indigo-500' : 'bg-white/[0.06]'
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
        </div>
      );
    }

    // All-at-once mode (display all, score at end)
    return (
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-white">Practice Test ({questions.length} questions)</h2>
            <span className="text-xs text-zinc-500">{mins}:{secs.toString().padStart(2, '0')}</span>
          </div>
          <p className="text-xs text-zinc-500">Answer all questions, then submit.</p>

          {questions.map((q, i) => (
            <div key={q.id} className="p-4 rounded-xl bg-[#16161e] border border-white/[0.06]">
              <p className="text-xs text-zinc-600 mb-2">Q{i + 1} · {q.type}</p>
              <QuizQuestion
                question={q}
                onAnswer={(correct) => {
                  setAllAnswers(prev => ({ ...prev, [i]: correct }));
                }}
                questionNumber={i + 1}
                totalQuestions={questions.length}
              />
            </div>
          ))}

          <button
            onClick={() => {
              const end = Date.now();
              setEndTime(end);
              const newAnswers = questions.map((_, i) => allAnswers[i] ?? false);
              setAnswers(newAnswers);
              setPhase('results');
              const score = newAnswers.filter(a => a === true).length;
              const attempt: TestAttempt = {
                id: `test-${Date.now()}`,
                date: new Date().toISOString(),
                score,
                total: questions.length,
                timeTaken: Math.round((end - startTime) / 1000),
                questionIds: questions.map(q => q.id),
              };
              dispatch({ type: 'RECORD_TEST_ATTEMPT', courseId: courseId!, attempt });
            }}
            className="w-full py-2.5 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
          >
            Submit Test
          </button>
        </div>
      </div>
    );
  }

  // ── Results phase ─────────────────────────────────────────────
  const score = answers.filter(a => a === true).length;
  const pct = Math.round((score / questions.length) * 100);
  const timeTaken = Math.round((endTime - startTime) / 1000);
  const tMins = Math.floor(timeTaken / 60);
  const tSecs = timeTaken % 60;

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-2xl">
        <h2 className="text-xl font-bold text-white mb-1">Test Complete</h2>
        <p className="text-sm text-zinc-500 mb-8">Here's how you did.</p>

        {/* Score card */}
        <div className="p-6 rounded-xl bg-[#16161e] border border-white/[0.06] mb-6 text-center">
          <div className={`text-5xl font-bold mb-2 ${pct >= 70 ? 'text-emerald-400' : pct >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
            {score}/{questions.length}
          </div>
          <div className="text-lg text-zinc-300 mb-1">{pct}% correct</div>
          <div className="text-xs text-zinc-600">Time: {tMins}m {tSecs}s</div>
        </div>

        {/* Per-question breakdown */}
        <div className="space-y-2 mb-6">
          {questions.map((q, i) => (
            <div key={q.id} className="flex items-start gap-3 px-3 py-2 rounded-md bg-white/[0.02] border border-white/[0.04]">
              <span className={`shrink-0 text-sm font-medium ${answers[i] ? 'text-emerald-400' : 'text-red-400'}`}>
                {answers[i] ? '✓' : '✗'}
              </span>
              <div className="min-w-0">
                <p className="text-xs text-zinc-400 truncate">{q.question.slice(0, 80)}...</p>
                <p className="text-[11px] text-zinc-600 mt-0.5">{q.nodeId.replace(/-/g, ' ')}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => setPhase('config')}
            className="flex-1 py-2.5 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
          >
            New Test
          </button>
          <button
            onClick={handlePrintTest}
            className="flex-1 py-2.5 rounded-lg text-sm font-medium bg-white/[0.06] hover:bg-white/[0.1] text-white transition-colors"
          >
            Download PDF
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
