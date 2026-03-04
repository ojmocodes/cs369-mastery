import { CourseRegistry } from '../../types';
import { nodes as cs369Nodes, links as cs369Links } from './compsci369/tree';
import { questions as cs369Questions } from './compsci369/questions';
import { examQuestions as cs369ExamQuestions } from './compsci369/examQuestions';

export const courseRegistry: CourseRegistry = {
  compsci369: {
    id: 'compsci369',
    name: 'COMPSCI 369',
    fullName: 'Computational Methods in Biology',
    description: 'Mathematical and computational approaches to biological problems including sequence analysis, phylogenetics, and molecular evolution.',
    color: '#7c3aed',
    nodes: cs369Nodes,
    links: cs369Links,
    questions: cs369Questions,
    examQuestions: cs369ExamQuestions,
  },
  // Add more courses here following the same pattern
};

export const getCourse = (id: string) => courseRegistry[id];
export const getAllCourses = () => Object.values(courseRegistry);
