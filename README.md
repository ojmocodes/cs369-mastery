# CS369 Mastery

An interactive study tool for CS369 (Computational Methods in Biology) and other university courses.

## Features

- **Multi-course support**: Easily add new courses with the template system
- **Knowledge Graph**: Visual D3-powered graph of interconnected topics
- **Practice Tests**: 10-question quizzes with 80% pass threshold
- **Practice Exams**: Full-length timed exam simulations
- **Progress Tracking**: Per-topic mastery tracking with localStorage persistence

## Getting Started

```bash
npm install
npm run dev
```

## Adding a New Course

1. Copy `src/data/templates/emptyCourse.ts` as a guide
2. Create `src/data/courses/<courseName>/tree.ts` with your knowledge graph
3. Create `src/data/courses/<courseName>/questions.ts` with practice questions
4. Create `src/data/courses/<courseName>/examQuestions.ts` with exam questions
5. Register the course in `src/data/courses/index.ts`

## Tech Stack

- React 19 + TypeScript
- Vite
- D3.js (knowledge graph)
- React Router v7
- Lucide React (icons)
