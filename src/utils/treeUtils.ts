import type { TreeData, NodeStatus } from '../types';

/**
 * Build a children map: for each node, which nodes does it unlock (its children)?
 * Now takes treeData as a parameter to support multiple courses.
 */
export function buildChildrenMap(treeData: TreeData): Record<string, string[]> {
  const children: Record<string, string[]> = {};
  for (const node of treeData.nodes) {
    children[node.id] = [];
  }
  for (const edge of treeData.edges) {
    if (!children[edge.from]) children[edge.from] = [];
    children[edge.from].push(edge.to);
  }
  return children;
}

/**
 * Check if all prerequisites of a node are passed or mastered
 */
export function arePrerequisitesMet(
  nodeId: string,
  treeData: TreeData,
  nodeProgress: Record<string, { status: NodeStatus }>
): boolean {
  const node = treeData.nodes.find(n => n.id === nodeId);
  if (!node) return false;
  if (node.prerequisites.length === 0) return true;
  return node.prerequisites.every(preId => {
    const p = nodeProgress[preId];
    return p && (p.status === 'passed' || p.status === 'mastered');
  });
}

/**
 * Recompute which nodes should be unlocked based on current progress.
 * Foundation nodes with no prerequisites are always unlocked.
 */
export function recomputeUnlocksForCourse(
  treeData: TreeData,
  nodeProgress: Record<string, { status: NodeStatus; quizAttempts: number; bestScore: number; lastAttempt: string | null; answeredQuestions: string[] }>
): Record<string, { status: NodeStatus; quizAttempts: number; bestScore: number; lastAttempt: string | null; answeredQuestions: string[] }> {
  const newProgress = { ...nodeProgress };

  for (const node of treeData.nodes) {
    const current = newProgress[node.id];
    if (!current) continue;

    // Don't change nodes that are already passed or mastered or in-progress
    if (current.status === 'passed' || current.status === 'mastered' || current.status === 'in-progress') {
      continue;
    }

    if (arePrerequisitesMet(node.id, treeData, newProgress)) {
      newProgress[node.id] = { ...current, status: 'unlocked' };
    } else {
      newProgress[node.id] = { ...current, status: 'locked' };
    }
  }

  return newProgress;
}

/**
 * Initialize default progress for all nodes in a tree
 */
export function createInitialProgressForTree(treeData: TreeData) {
  const progress: Record<string, {
    status: NodeStatus;
    quizAttempts: number;
    bestScore: number;
    lastAttempt: string | null;
    answeredQuestions: string[];
  }> = {};

  for (const node of treeData.nodes) {
    const isUnlocked = node.prerequisites.length === 0;
    progress[node.id] = {
      status: isUnlocked ? 'unlocked' : 'locked',
      quizAttempts: 0,
      bestScore: 0,
      lastAttempt: null,
      answeredQuestions: [],
    };
  }

  return progress;
}

/**
 * Get tier color for a node
 */
export function getTierColor(tierId: string, treeData: TreeData): string {
  const tier = treeData.tiers.find(t => t.id === tierId);
  return tier?.color || '#6366f1';
}

/**
 * Get tier label
 */
export function getTierLabel(tierId: string, treeData: TreeData): string {
  const tier = treeData.tiers.find(t => t.id === tierId);
  return tier?.label || tierId;
}

/**
 * Count stats from progress
 */
export function computeStats(
  nodeProgress: Record<string, { status: NodeStatus }>,
  treeData: TreeData
): {
  totalPassed: number;
  totalMastered: number;
  byTier: Record<string, { total: number; passed: number }>;
} {
  let totalPassed = 0;
  let totalMastered = 0;
  const byTier: Record<string, { total: number; passed: number }> = {};

  for (const tier of treeData.tiers) {
    byTier[tier.id] = { total: 0, passed: 0 };
  }

  for (const node of treeData.nodes) {
    const tierStats = byTier[node.tier];
    if (tierStats) tierStats.total++;

    const progress = nodeProgress[node.id];
    if (progress) {
      if (progress.status === 'passed' || progress.status === 'mastered') {
        totalPassed++;
        if (tierStats) tierStats.passed++;
      }
      if (progress.status === 'mastered') totalMastered++;
    }
  }

  return { totalPassed, totalMastered, byTier };
}

/**
 * Get nodes that this node unlocks (children)
 */
export function getUnlockedBy(nodeId: string, treeData: TreeData): string[] {
  return treeData.nodes
    .filter(n => n.prerequisites.includes(nodeId))
    .map(n => n.id);
}
