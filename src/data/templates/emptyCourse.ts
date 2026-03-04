import type { TreeData } from '../../types';

/**
 * Template for a "coming soon" course — minimal data structure so the app can
 * import it without errors. The nodes array is empty so no quiz functionality
 * is active.
 */
export const emptyCourseTree: TreeData = {
  course: "Placeholder",
  title: "Coming Soon",
  version: "0.0",
  description: "Content for this course is coming soon.",
  tiers: [
    { id: "foundations", label: "Foundations", order: 0, color: "#6366f1" },
    { id: "core", label: "Core Methods", order: 1, color: "#8b5cf6" },
    { id: "advanced", label: "Advanced Topics", order: 2, color: "#a855f7" },
    { id: "applications", label: "Applications", order: 3, color: "#c084fc" },
  ],
  nodes: [],
  edges: [],
  exam_map: {},
  stats: {
    total_nodes: 0,
    total_edges: 0,
    foundation_nodes: 0,
    core_nodes: 0,
    advanced_nodes: 0,
    application_nodes: 0,
    exam_questions_mapped: 0,
  },
};
