import { useParams } from 'react-router-dom';
import { getCourse } from '../data/courses';
import Quiz from '../components/Quiz';

const QUESTIONS_PER_TEST = 10;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function PracticeTest() {
  const { courseId } = useParams<{ courseId: string }>();
  const course = courseId ? getCourse(courseId) : null;
  if (!course) return <div style={{ padding: '40px', color: 'var(--text-secondary)' }}>Course not found.</div>;

  const selected = shuffle(course.questions).slice(0, QUESTIONS_PER_TEST);

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '32px 24px' }} className="animate-fade-in">
      <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>Practice Test – {course.name}</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '28px', fontSize: '14px' }}>
        {QUESTIONS_PER_TEST} random questions · 80% pass threshold · Explanations after each answer
      </p>
      <div style={{ maxWidth: '680px' }}>
        <Quiz questions={selected} />
      </div>
    </div>
  );
}
