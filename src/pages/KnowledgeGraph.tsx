import { useParams } from 'react-router-dom';
import { getCourse } from '../data/courses';
import TreeGraph from '../components/TreeGraph';
import Sidebar from '../components/Sidebar';
import { useAppContext } from '../context/AppContext';
import { Node } from '../types';
import { useState } from 'react';

export default function KnowledgeGraph() {
  const { courseId } = useParams<{ courseId: string }>();
  const { isMastered } = useAppContext();
  const [_selected, setSelected] = useState<Node | null>(null);

  const course = courseId ? getCourse(courseId) : null;
  if (!course) return <div style={{ padding: '40px', color: 'var(--text-secondary)' }}>Course not found.</div>;

  const nodesWithMastery = course.nodes.map(n => ({ ...n, mastered: isMastered(n.id) }));

  return (
    <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
      <Sidebar nodes={nodesWithMastery} onSelect={setSelected} />
      <div style={{ flex: 1, position: 'relative' }}>
        <TreeGraph nodes={nodesWithMastery} links={course.links} />
      </div>
    </div>
  );
}
