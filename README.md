# CS369 Mastery — Knowledge Tree

A study tool for COMPSCI 369 (Computational Science) at the University of Auckland. Traverse a knowledge tree by passing exam-level quizzes on each concept node.

![Screenshot placeholder](./screenshot.png)

## Features

- **Interactive Knowledge Tree** — 30 nodes across 4 tiers (Foundations, Core, Advanced, Applications) visualised as a directed acyclic graph
- **Prerequisite System** — Nodes unlock only after you pass their prerequisites
- **Exam-Level Quizzes** — Multiple choice, short answer, and calculation questions with worked solutions
- **Progress Tracking** — Persistent progress saved to localStorage with streak tracking
- **Exam Coverage Mapping** — See which exam questions test each concept

## Setup

```bash
# Clone the repo
git clone https://github.com/ojmocodes/cs369-mastery.git
cd cs369-mastery

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## How to Add Questions

Questions live in `src/data/questions.ts`. Each question follows one of three types:

### Multiple Choice
```typescript
{
  id: 'unique-id',
  nodeId: 'node-id-from-tree',
  type: 'multiple-choice',
  question: 'Your question text',
  options: ['Option A', 'Option B', 'Option C', 'Option D'],
  correctIndex: 0, // 0-indexed
  explanation: 'Why this answer is correct'
}
```

### Short Answer
```typescript
{
  id: 'unique-id',
  nodeId: 'node-id-from-tree',
  type: 'short-answer',
  question: 'Your question text',
  acceptableAnswers: ['answer1', 'Answer1', 'ANSWER1'],
  explanation: 'Explanation of the answer'
}
```

### Calculation
```typescript
{
  id: 'unique-id',
  nodeId: 'node-id-from-tree',
  type: 'calculation',
  question: 'Compute the value of...',
  correctAnswer: 3.14159,
  tolerance: 0.01,
  unit: 'optional unit string',
  explanation: 'Worked solution'
}
```

Add questions to the `questionBank` array in `src/data/questions.ts`. Each question must have a `nodeId` matching a node in the tree.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — Build tool and dev server
- **Tailwind CSS v4** — Styling
- **@xyflow/react** (React Flow) — Interactive graph visualisation
- **localStorage** — Progress persistence

## Project Structure

```
src/
├── main.tsx              # Entry point
├── App.tsx               # Root component
├── index.css             # Tailwind + custom styles
├── data/
│   ├── tree.ts           # Knowledge tree data (30 nodes, 37 edges)
│   └── questions.ts      # Question bank
├── types/
│   └── index.ts          # TypeScript interfaces
├── context/
│   └── AppContext.tsx     # State management (Context + useReducer)
├── components/
│   ├── TreeGraph.tsx      # Interactive DAG visualisation
│   ├── NodeDetail.tsx     # Node detail slide-in panel
│   ├── Quiz.tsx           # Quiz system
│   ├── QuizQuestion.tsx   # Individual question component
│   ├── ProgressBar.tsx    # Progress dashboard
│   └── TopBar.tsx         # Header with stats
└── utils/
    └── treeUtils.ts       # Tree traversal and state helpers
```

## License

MIT
