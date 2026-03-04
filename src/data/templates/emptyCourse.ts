/**
 * TEMPLATE: How to add a new course to CS Mastery
 * ================================================
 * 1. Copy this folder structure:
 *    src/data/courses/<yourCourseId>/
 *      tree.ts          ← knowledge graph nodes & links
 *      questions.ts     ← practice quiz questions
 *      examQuestions.ts ← exam-style questions
 *
 * 2. Register in src/data/courses/index.ts
 *
 * 3. The courseId must be URL-safe (e.g. 'compsci220', 'stats210')
 */

import { Node, Link } from '../../../types';
import { Question } from '../../../types';
import { ExamQuestion } from '../../../types';

// ── KNOWLEDGE GRAPH ──────────────────────────────────────────────────────────
export const nodes: Node[] = [
  {
    id: 'topic_1',
    label: 'Your First Topic',
    group: 'group_name',   // Used for colour coding
    mastered: false,
    description: 'Brief description shown in the node detail panel.',
  },
  // ... add more nodes
];

export const links: Link[] = [
  {
    source: 'topic_1',
    target: 'topic_2',
    strength: 0.8,   // 0–1, controls edge thickness/opacity
  },
  // ... add more links
];

// ── PRACTICE QUESTIONS ───────────────────────────────────────────────────────
export const questions: Question[] = [
  {
    id: 'q_1',
    topic: 'topic_1',          // Must match a node id
    question: 'Your question text here?',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    answer: 0,                 // 0-indexed correct option
    explanation: 'Why this is correct.',
  },
  // ... add at least 10 questions for the practice test to work well
];

// ── EXAM QUESTIONS ───────────────────────────────────────────────────────────
export const examQuestions: ExamQuestion[] = [
  {
    id: 'eq_1',
    section: 'A',              // 'A' | 'B' | 'C'
    marks: 3,
    topic: 'topic_1',
    type: 'short',             // 'short' | 'calculation' | 'essay'
    question: 'Your exam question here.',
    modelAnswer: 'Full model answer with working.',
    markingGuide: 'What markers look for.',
  },
  // ... add more exam questions
];
