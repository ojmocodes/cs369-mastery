import type { TreeNode, NodeStatus, NodeProgress } from '../types';
import { treeData } from '../data/tree';

/**
 * Determine the status of a node given current progress state.
 * A node is unlocked if all prerequisites are passed or mastered.
 */
export function getNodeStatus(
  nodeId: string,
  progress: Record<string, NodeProgress>
): NodeStatus {
  const nodeProgress = progress[nodeId];
  if (nodeProgress) return nodeProgress.status;

  const node = treeData.nodes.find(n => n.id === nodeId);
  if (!node) return 'locked';

  const allPrereqsMet = node.prerequisites.every(prereqId => {
    const p = progress[prereqId];
    return p && (p.status === 'passed' || p.status === 'mastered');
  });

  return allPrereqsMet ? 'unlocked' : 'locked';
}

/**
 * Get all nodes that are currently available to start (unlocked or in-progress).
 */
export function getAvailableNodes(
  progress: Record<string, NodeProgress>
): TreeNode[] {
  return treeData.nodes.filter(node => {
    const status = getNodeStatus(node.id, progress);
    return status === 'unlocked' || status === 'in-progress';
  });
}

/**
 * Get all nodes that are locked.
 */
export function getLockedNodes(
  progress: Record<string, NodeProgress>
): TreeNode[] {
  return treeData.nodes.filter(node => getNodeStatus(node.id, progress) === 'locked');
}

/**
 * Get all nodes that have been passed or mastered.
 */
export function getCompletedNodes(
  progress: Record<string, NodeProgress>
): TreeNode[] {
  return treeData.nodes.filter(node => {
    const status = getNodeStatus(node.id, progress);
    return status === 'passed' || status === 'mastered';
  });
}

/**
 * Get nodes that are direct prerequisites of the given node.
 */
export function getPrerequisites(nodeId: string): TreeNode[] {
  const node = treeData.nodes.find(n => n.id === nodeId);
  if (!node) return [];
  return node.prerequisites
    .map(id => treeData.nodes.find(n => n.id === id))
    .filter((n): n is TreeNode => n !== undefined);
}

/**
 * Get nodes that are directly unlocked by the given node.
 */
export function getUnlockedBy(nodeId: string): TreeNode[] {
  return treeData.nodes.filter(n => n.prerequisites.includes(nodeId));
}

/**
 * Calculate overall mastery percentage.
 */
export function getMasteryPercentage(
  progress: Record<string, NodeProgress>
): number {
  const total = treeData.nodes.length;
  if (total === 0) return 0;
  const completed = getCompletedNodes(progress).length;
  return Math.round((completed / total) * 100);
}
