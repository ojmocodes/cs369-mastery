export interface Node {
  id: string;
  label: string;
  group: string;
  mastered: boolean;
  description?: string;
}

export interface Link {
  source: string;
  target: string;
  strength: number;
}

export interface Question {
  id: string;
  topic: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface ExamQuestion {
  id: string;
  section: 'A' | 'B' | 'C';
  marks: number;
  topic: string;
  type: 'short' | 'calculation' | 'essay';
  question: string;
  modelAnswer: string;
  markingGuide: string;
}

export interface CourseConfig {
  id: string;
  name: string;
  fullName: string;
  description: string;
  color: string;
  nodes: Node[];
  links: Link[];
  questions: Question[];
  examQuestions: ExamQuestion[];
}

export type CourseRegistry = Record<string, CourseConfig>;

export interface AppState {
  activeCourseId: string | null;
  masteredNodes: Record<string, boolean>;
  setActiveCourse: (id: string) => void;
  toggleMastered: (nodeId: string) => void;
  isMastered: (nodeId: string) => boolean;
  getMasteryPercent: (courseId: string) => number;
}
