// ─── Tree Data Types ─────────────────────────────────────────────

export interface Tier {
  id: string;
  label: string;
  order: number;
  color: string;
}

export interface TreeNode {
  id: string;
  label: string;
  tier: string;
  description: string;
  topics: string[];
  prerequisites: string[];
  source?: string;
  exam_questions?: string[];
}

export interface TreeEdge {
  from: string;
  to: string;
}

export interface ExamQuestion {
  id: string;
  label: string;
  marks: number;
  nodes: string[];
}

export interface ExamSection {
  id: string;
  label: string;
  marks: number;
  questions: ExamQuestion[];
}

export interface Exam {
  label: string;
  questions?: ExamQuestion[];
  sections?: ExamSection[];
}

export interface TreeData {
  course: string;
  title: string;
  version: string;
  description: string;
  tiers: Tier[];
  nodes: TreeNode[];
  edges: TreeEdge[];
  exam_map: Record<string, Exam>;
  stats: {
    total_nodes: number;
    total_edges: number;
    foundation_nodes: number;
    core_nodes: number;
    advanced_nodes: number;
    application_nodes: number;
    exam_questions_mapped: number;
  };
}

// ─── Quiz Types ──────────────────────────────────────────────────

export type QuestionType = 'multiple-choice' | 'short-answer' | 'calculation';

export interface MultipleChoiceQuestion {
  id: string;
  nodeId: string;
  type: 'multiple-choice';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ShortAnswerQuestion {
  id: string;
  nodeId: string;
  type: 'short-answer';
  question: string;
  acceptableAnswers: string[];
  caseSensitive?: boolean;
  explanation: string;
}

export interface CalculationQuestion {
  id: string;
  nodeId: string;
  type: 'calculation';
  question: string;
  correctAnswer: number;
  tolerance: number;
  unit?: string;
  explanation: string;
}

export type Question = MultipleChoiceQuestion | ShortAnswerQuestion | CalculationQuestion;

// ─── App State Types ─────────────────────────────────────────────

export type NodeStatus = 'locked' | 'unlocked' | 'in-progress' | 'passed' | 'mastered';

export interface NodeProgress {
  status: NodeStatus;
  quizAttempts: number;
  bestScore: number;
  lastAttempt: string | null;
  answeredQuestions: string[];
}

export interface AppStats {
  totalPassed: number;
  totalMastered: number;
  studyStreak: number;
  lastStudyDate: string | null;
}

// ─── Multi-course Types ──────────────────────────────────────────

export type CourseStatus = 'active' | 'coming-soon';

export interface CourseInfo {
  id: string;
  code: string;
  title: string;
  color: string;
  description: string;
  status: CourseStatus;
}

export interface TestAttempt {
  id: string;
  date: string;
  score: number;
  total: number;
  timeTaken: number; // seconds
  questionIds: string[];
}

export interface ExamAttempt {
  id: string;
  date: string;
  score: number;
  total: number;
  timeTaken: number; // seconds
  sectionScores: Record<string, number>;
}

export interface CourseState {
  nodeProgress: Record<string, NodeProgress>;
  stats: AppStats;
  testHistory: TestAttempt[];
  examHistory: ExamAttempt[];
}

export type PageId = 'home' | 'dashboard' | 'knowledge-graph' | 'practice-test' | 'practice-exam';

export interface AppState {
  currentCourseId: string | null;
  currentPage: PageId;
  courses: Record<string, CourseState>;
}

export type AppAction =
  | { type: 'NAVIGATE'; page: PageId; courseId?: string }
  | { type: 'START_QUIZ'; courseId: string; nodeId: string }
  | { type: 'ANSWER_QUESTION'; courseId: string; nodeId: string; questionId: string; correct: boolean }
  | { type: 'COMPLETE_QUIZ'; courseId: string; nodeId: string; score: number; total: number }
  | { type: 'RESET_PROGRESS'; courseId: string }
  | { type: 'RESET_ALL_PROGRESS' }
  | { type: 'LOAD_STATE'; state: AppState }
  | { type: 'RECOMPUTE_UNLOCKS'; courseId: string }
  | { type: 'RECORD_TEST_ATTEMPT'; courseId: string; attempt: TestAttempt }
  | { type: 'RECORD_EXAM_ATTEMPT'; courseId: string; attempt: ExamAttempt };

// ─── Exam Question Text Types ────────────────────────────────────

export interface ExamQuestionText {
  source: string;
  marks: number;
  text: string;
}
