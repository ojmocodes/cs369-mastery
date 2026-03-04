import { useParams, useNavigate } from 'react-router-dom';
import { getCourse } from '../data/courses';
import { useAppContext } from '../context/AppContext';
import ProgressBar from '../components/ProgressBar';
import { Network, FlaskConical, GraduationCap, ChevronRight } from 'lucide-react';

export default function CourseDashboard() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { getMasteryPercent } = useAppContext();

  const course = courseId ? getCourse(courseId) : null;
  if (!course) return <div style={{ padding: '40px', color: 'var(--text-secondary)' }}>Course not found.</div>;

  const pct = getMasteryPercent(course.id);
  const groupCount = new Set(course.nodes.map(n => n.group)).size;

  const cards = [
    {
      icon: <Network size={28} color={course.color} />,
      title: 'Knowledge Graph',
      description: `Explore ${course.nodes.length} interconnected topics across ${groupCount} groups. Click nodes to learn and mark as mastered.`,
      action: () => navigate(`/course/${courseId}/graph`),
      label: 'Open Graph',
    },
    {
      icon: <FlaskConical size={28} color={course.color} />,
      title: 'Practice Test',
      description: `10-question quiz drawn from ${course.questions.length} questions. Pass mark: 80%. Instant feedback with explanations.`,
      action: () => navigate(`/course/${courseId}/practice`),
      label: 'Start Test',
    },
    {
      icon: <GraduationCap size={28} color={course.color} />,
      title: 'Practice Exam',
      description: `${course.examQuestions.length} exam-style questions across 3 sections. Model answers and marking guides included.`,
      action: () => navigate(`/course/${courseId}/exam`),
      label: 'Open Exam',
    },
  ];

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '32px 24px' }} className="animate-fade-in">
      {/* Course header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '4px' }}>{course.fullName}</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>{course.description}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ProgressBar percent={pct} width={200} color={course.color} />
          <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{pct}% mastered ({course.nodes.filter(() => true).length} topics)</span>
        </div>
      </div>

      {/* Feature cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', maxWidth: '960px' }}>
        {cards.map((card, i) => (
          <div
            key={i}
            onClick={card.action}
            style={{
              background: 'var(--bg-card)', borderRadius: '12px',
              border: '1px solid var(--border-color)',
              padding: '24px', cursor: 'pointer',
              transition: 'border-color 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = course.color; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-color)'; (e.currentTarget as HTMLDivElement).style.transform = ''; }}
          >
            <div style={{ marginBottom: '14px' }}>{card.icon}</div>
            <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '8px' }}>{card.title}</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>{card.description}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: course.color, fontSize: '13px', fontWeight: 600 }}>
              {card.label} <ChevronRight size={15} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
