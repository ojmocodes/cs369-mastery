import { createContext, useContext, useReducer, useEffect } from 'react';
import type { AppState, NodeProgress, NodeStatus } from '../types';
import { treeData } from '../data/tree';

const STORAGE_KEY = 'cs369-mastery-progress';

function getInitialState(): AppState {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved) as AppState;
    } catch {
      // ignore
    }
  }
  return {
    progress: {},
    streak: 0,
    totalQuizzes: 0,
    totalCorrect: 0,
  };
}

type Action =
  | { type: 'START_QUIZ'; nodeId: string }
  | { type: 'COMPLETE_QUIZ'; nodeId: string; score: number; correct: number; total: number }
  | { type: 'RESET_NODE'; nodeId: string }
  | { type: 'RESET_ALL' };

function getNodeStatus(
  nodeId: string,
  progress: Record<string, NodeProgress>
): NodeStatus {
  const nodeProgress = progress[nodeId];
  if (!nodeProgress) {
    // Check prerequisites
    const node = treeData.nodes.find(n => n.id === nodeId);
    if (!node) return 'locked';
    const prereqsMet = node.prerequisites.every(prereqId => {
      const prereqProgress = progress[prereqId];
      return prereqProgress && (prereqProgress.status === 'passed' || prereqProgress.status === 'mastered');
    });
    return prereqsMet ? 'unlocked' : 'locked';
  }
  return nodeProgress.status;
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'START_QUIZ': {
      const currentStatus = getNodeStatus(action.nodeId, state.progress);
      if (currentStatus === 'locked') return state;
      return {
        ...state,
        progress: {
          ...state.progress,
          [action.nodeId]: {
            nodeId: action.nodeId,
            status: 'in-progress',
            attempts: (state.progress[action.nodeId]?.attempts ?? 0),
            lastAttempt: new Date().toISOString(),
            score: state.progress[action.nodeId]?.score,
            bestScore: state.progress[action.nodeId]?.bestScore,
            passedAt: state.progress[action.nodeId]?.passedAt,
            masteredAt: state.progress[action.nodeId]?.masteredAt,
          },
        },
      };
    }
    case 'COMPLETE_QUIZ': {
      const { nodeId, score, correct, total } = action;
      const prev = state.progress[nodeId];
      const newAttempts = (prev?.attempts ?? 0) + 1;
      const bestScore = Math.max(score, prev?.bestScore ?? 0);
      const passed = score >= 0.7;
      const mastered = score >= 0.9 && newAttempts >= 2;
      const newStatus: NodeStatus = mastered ? 'mastered' : passed ? 'passed' : prev?.status === 'passed' ? 'passed' : prev?.status === 'mastered' ? 'mastered' : 'unlocked';
      const today = new Date().toISOString().split('T')[0];
      const lastDate = state.lastActivityDate;
      let newStreak = state.streak;
      if (lastDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yStr = yesterday.toISOString().split('T')[0];
        newStreak = lastDate === yStr ? state.streak + 1 : 1;
      }
      return {
        ...state,
        streak: newStreak,
        lastActivityDate: today,
        totalQuizzes: state.totalQuizzes + 1,
        totalCorrect: state.totalCorrect + correct,
        progress: {
          ...state.progress,
          [nodeId]: {
            nodeId,
            status: newStatus,
            attempts: newAttempts,
            lastAttempt: new Date().toISOString(),
            score,
            bestScore,
            passedAt: passed && !prev?.passedAt ? new Date().toISOString() : prev?.passedAt,
            masteredAt: mastered && !prev?.masteredAt ? new Date().toISOString() : prev?.masteredAt,
          },
        },
      };
    }
    case 'RESET_NODE': {
      const newProgress = { ...state.progress };
      delete newProgress[action.nodeId];
      return { ...state, progress: newProgress };
    }
    case 'RESET_ALL':
      return { progress: {}, streak: 0, totalQuizzes: 0, totalCorrect: 0 };
    default:
      return state;
  }
}

interface AppContextValue {
  state: AppState;
  getNodeStatus: (nodeId: string) => NodeStatus;
  startQuiz: (nodeId: string) => void;
  completeQuiz: (nodeId: string, score: number, correct: number, total: number) => void;
  resetNode: (nodeId: string) => void;
  resetAll: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, getInitialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value: AppContextValue = {
    state,
    getNodeStatus: (nodeId) => getNodeStatus(nodeId, state.progress),
    startQuiz: (nodeId) => dispatch({ type: 'START_QUIZ', nodeId }),
    completeQuiz: (nodeId, score, correct, total) =>
      dispatch({ type: 'COMPLETE_QUIZ', nodeId, score, correct, total }),
    resetNode: (nodeId) => dispatch({ type: 'RESET_NODE', nodeId }),
    resetAll: () => dispatch({ type: 'RESET_ALL' }),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
