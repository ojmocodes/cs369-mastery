import type { CourseInfo } from '../../types';

export const courseRegistry: CourseInfo[] = [
  {
    id: 'compsci369',
    code: 'COMPSCI 369',
    title: 'Computational Science',
    color: '#6366f1', // indigo
    description: 'Numerical methods, sequence alignment, stochastic processes, HMMs, phylogenetics',
    status: 'active',
  },
  {
    id: 'compsci340',
    code: 'COMPSCI 340',
    title: 'Data Communications & Security',
    color: '#0ea5e9', // sky blue
    description: 'Network protocols, security, cryptography',
    status: 'coming-soon',
  },
  {
    id: 'maths250',
    code: 'MATHS 250',
    title: 'Mathematical Foundations of CS',
    color: '#f59e0b', // amber
    description: 'Logic, proofs, discrete mathematics, graph theory',
    status: 'coming-soon',
  },
  {
    id: 'maths260',
    code: 'MATHS 260',
    title: 'Differential Equations',
    color: '#22c55e', // green
    description: 'ODEs, PDEs, Laplace transforms, series solutions',
    status: 'coming-soon',
  },
  {
    id: 'spanish201',
    code: 'SPANISH 201',
    title: 'Intermediate Spanish',
    color: '#ef4444', // red
    description: 'Grammar, vocabulary, conversation, culture',
    status: 'coming-soon',
  },
];

export function getCourseById(id: string): CourseInfo | undefined {
  return courseRegistry.find(c => c.id === id);
}
