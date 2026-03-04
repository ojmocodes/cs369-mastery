import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import type { AppState, AppAction, CourseState, NodeProgress, PageId } from '../types';
import { courseRegistry } from '../data/courses';
import { treeData as cs369Tree } from '../data/courses/compsci369/tree';
import {
  createInitialProgressForTree,
  recomputeUnlocksForCourse,
} from '../utils/treeUtils';

const STORAGE_KEY = 'study-mastery-v2';

// ── Tree registry: map courseId → treeData ──────────────────────
import type { TreeData } from '../types';

export const courseTreeRegistry: Record<string, TreeData> = {
  compsci369: cs369Tree,
};

// ── Initial state builder ────────────────────────────────────────

function buildInitialCourseState(courseId: string): CourseState {
  const treeData = courseTreeRegistry[courseId];
  const nodeProgress = treeData
    ? createInitialProgressForTree(treeData)
    : {};
  return {
    nodeProgress,
    stats: {
      totalPassed: 0,
      totalMastered: 0,
      studyStreak: 0,
      lastStudyDate: null,
    },
    testHistory: [],
    examHistory: [],
  };
}

function getInitialState(): AppState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as AppState;
      if (parsed.courses && parsed.currentPage) {
        // Make sure all active courses have state
        for (const course of courseRegistry) {
          if (course.status === 'active' && !parsed.courses[course.id]) {
            parsed.courses[course.id] = buildInitialCourseState(course.id);
          }
        }
        return parsed;
      }
    }
  } catch {
    // ignore parse errors
  }

  // Fresh state
  const courses: Record<string, CourseState> = {};
  for (const course of courseRegistry) {
    if (course.status === 'active') {
      courses[course.id] = buildInitialCourseState(course.id);
    }
  }

  return {
    currentCourseId: null,
    currentPage: 'home',
    courses,
  };
}

// ── Reducer ──────────────────────────────────────────────────────

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {

    case 'NAVIGATE': {
      return {
        ...state,
        currentPage: action.page,
        currentCourseId: action.courseId !== undefined ? action.courseId : state.currentCourseId,
      };
    }

    case 'START_QUIZ': {
      const courseState = state.courses[action.courseId];
      if (!courseState) return state;
      const current = courseState.nodeProgress[action.nodeId];
      if (!current || current.status === 'locked') return state;
      return {
        ...state,
        courses: {
          ...state.courses,
          [action.courseId]: {
            ...courseState,
            nodeProgress: {
              ...courseState.nodeProgress,
              [action.nodeId]: {
                ...current,
                status: current.status === 'passed' || current.status === 'mastered'
                  ? current.status
                  : 'in-progress',
              },
            },
          },
        },
      };
    }

    case 'ANSWER_QUESTION': {
      const courseState = state.courses[action.courseId];
      if (!courseState) return state;
      const current = courseState.nodeProgress[action.nodeId];
      if (!current) return state;
      const answered = current.answeredQuestions.includes(action.questionId)
        ? current.answeredQuestions
        : [...current.answeredQuestions, action.questionId];
      return {
        ...state,
        courses: {
          ...state.courses,
          [action.courseId]: {
            ...courseState,
            nodeProgress: {
              ...courseState.nodeProgress,
              [action.nodeId]: { ...current, answeredQuestions: answered },
            },
          },
        },
      };
    }

    case 'COMPLETE_QUIZ': {
      const courseState = state.courses[action.courseId];
      if (!courseState) return state;
      const current = courseState.nodeProgress[action.nodeId];
      if (!current) return state;

      // 80% threshold to pass, 100% to master
      const passThreshold = Math.ceil(action.total * 0.8);
      const passed = action.score >= passThreshold;
      const mastered = action.score === action.total;
      const newAttempts = current.quizAttempts + 1;
      const newBest = Math.max(current.bestScore, action.score);

      let newStatus = current.status;
      if (mastered || (current.status === 'passed' && action.score === action.total)) {
        newStatus = 'mastered';
      } else if (passed) {
        newStatus = 'passed';
      } else {
        newStatus = 'in-progress';
      }

      const today = new Date().toISOString().slice(0, 10);
      const lastDate = courseState.stats.lastStudyDate;
      let newStreak = courseState.stats.studyStreak;
      if (lastDate !== today) {
        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
        newStreak = lastDate === yesterday ? newStreak + 1 : 1;
      }

      const updatedProgress: Record<string, NodeProgress> = {
        ...courseState.nodeProgress,
        [action.nodeId]: {
          ...current,
          status: newStatus,
          quizAttempts: newAttempts,
          bestScore: newBest,
          lastAttempt: new Date().toISOString(),
          answeredQuestions: [],
        },
      };

      // Count passed/mastered
      let totalPassed = 0;
      let totalMastered = 0;
      for (const p of Object.values(updatedProgress)) {
        if (p.status === 'passed' || p.status === 'mastered') totalPassed++;
        if (p.status === 'mastered') totalMastered++;
      }

      // Recompute unlocks
      const treeData = courseTreeRegistry[action.courseId];
      const recomputedProgress = treeData
        ? recomputeUnlocksForCourse(treeData, updatedProgress)
        : updatedProgress;

      const updatedCourseState: CourseState = {
        ...courseState,
        nodeProgress: recomputedProgress,
        stats: {
          totalPassed,
          totalMastered,
          studyStreak: newStreak,
          lastStudyDate: today,
        },
      };

      return {
        ...state,
        courses: { ...state.courses, [action.courseId]: updatedCourseState },
      };
    }

    case 'RESET_PROGRESS': {
      return {
        ...state,
        courses: {
          ...state.courses,
          [action.courseId]: buildInitialCourseState(action.courseId),
        },
      };
    }

    case 'RESET_ALL_PROGRESS': {
      const courses: Record<string, CourseState> = {};
      for (const course of courseRegistry) {
        if (course.status === 'active') {
          courses[course.id] = buildInitialCourseState(course.id);
        }
      }
      return {
        currentCourseId: null,
        currentPage: 'home',
        courses,
      };
    }

    case 'LOAD_STATE':
      return action.state;

    case 'RECOMPUTE_UNLOCKS': {
      const courseState = state.courses[action.courseId];
      if (!courseState) return state;
      const treeData = courseTreeRegistry[action.courseId];
      if (!treeData) return state;
      const recomputed = recomputeUnlocksForCourse(treeData, courseState.nodeProgress);
      return {
        ...state,
        courses: {
          ...state.courses,
          [action.courseId]: { ...courseState, nodeProgress: recomputed },
        },
      };
    }

    case 'RECORD_TEST_ATTEMPT': {
      const courseState = state.courses[action.courseId];
      if (!courseState) return state;
      return {
        ...state,
        courses: {
          ...state.courses,
          [action.courseId]: {
            ...courseState,
            testHistory: [...courseState.testHistory, action.attempt],
          },
        },
      };
    }

    case 'RECORD_EXAM_ATTEMPT': {
      const courseState = state.courses[action.courseId];
      if (!courseState) return state;
      return {
        ...state,
        courses: {
          ...state.courses,
          [action.courseId]: {
            ...courseState,
            examHistory: [...courseState.examHistory, action.attempt],
          },
        },
      };
    }

    default:
      return state;
  }
}

// ── Context ──────────────────────────────────────────────────────

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  navigate: (page: PageId, courseId?: string) => void;
  resetProgress: (courseId?: string) => void;
  currentCourseState: CourseState | null;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, undefined, getInitialState);

  // Persist to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // quota exceeded or private browsing
    }
  }, [state]);

  const navigate = useCallback((page: PageId, courseId?: string) => {
    dispatch({ type: 'NAVIGATE', page, courseId });
  }, []);

  const resetProgress = useCallback((courseId?: string) => {
    if (courseId) {
      dispatch({ type: 'RESET_PROGRESS', courseId });
    } else {
      dispatch({ type: 'RESET_ALL_PROGRESS' });
    }
  }, []);

  const currentCourseState = state.currentCourseId
    ? state.courses[state.currentCourseId] ?? null
    : null;

  return (
    <AppContext.Provider value={{ state, dispatch, navigate, resetProgress, currentCourseState }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppState must be used within AppProvider');
  return ctx;
}
