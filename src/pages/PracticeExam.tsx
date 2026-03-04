import { useParams } from 'react-router-dom';
import { getCourse } from '../data/courses';
import ExamQuestionViewer from '../components/ExamQuestionViewer';

export default function PracticeExam() {
  const { courseId } = useParams<{ courseId: string }>();
  const course = courseId ? getCourse(courseId) : null;
  if (!course) return <div style={{ padding: '40px', color: 'var(--text-secondary)' }}>Course not found.</div>;

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '32px 24px' }} className="animate-fade-in">
      <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>Practice Exam – {course.name}</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '28px', fontSize: '14px' }}>
        {course.examQuestions.length} exam-style questions · Sections A, B, C · Model answers included
      </p>
      <div style={{ maxWidth: '800px' }}>
        <ExamQuestionViewer questions={course.examQuestions} />
      </div>
    </div>
  );
}
