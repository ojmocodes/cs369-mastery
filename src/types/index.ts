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
  source: string;
  target: string;
}

export interface Tier {
  id: string;
  label: string;
  order: number;
  color: string;
}

export interface TreeData {
  course: string;
  title: string;
  version: string;
  description: string;
  tiers: Tier[];
  nodes: TreeNode[];
  edges: TreeEdge[];
}

export interface ExamQuestion {
  id: string;
  label: string;
  description?: string;
}

export type NodeStatus = 'locked' | 'unlocked' | 'in-progress' | 'passed' | 'mastered';

export interface NodeProgress {
  nodeId: string;
  status: NodeStatus;
  attempts: number;
  lastAttempt?: string; // ISO date
  passedAt?: string;   // ISO date
  masteredAt?: string; // ISO date
  score?: number;      // Last quiz score (0-1)
  bestScore?: number;  // Best score ever
}

export interface AppState {
  progress: Record<string, NodeProgress>;
  streak: number;
  lastActivityDate?: string;
  totalQuizzes: number;
  totalCorrect: number;
}

export type Question =
  | MultipleChoiceQuestion
  | ShortAnswerQuestion
  | CalculationQuestion;

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
