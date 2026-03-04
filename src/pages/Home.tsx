import { useNavigate } from 'react-router-dom';
import { getAllCourses } from '../data/courses';
import { useAppContext } from '../context/AppContext';
import ProgressBar from '../components/ProgressBar';
import { BookOpen, ArrowRight, Plus } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { getMasteryPercent } = useAppContext();
  const courses = getAllCourses();

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '40px 24px' }} className="animate-fade-in">
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 800, background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '12px' }}>
          CS Mastery
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
          Interactive knowledge graphs, practice tests, and exam prep for university CS courses.
        </p>
      </div>

      {/* Course grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px', maxWidth: '900px', margin: '0 auto' }}>
        {courses.map(course => {
          const pct = getMasteryPercent(course.id);
          return (
            <div
              key={course.id}
              onClick={() => navigate(`/course/${course.id}`)}
              style={{
                background: 'var(--bg-card)', borderRadius: '12px',
                border: '1px solid var(--border-color)',
                padding: '24px', cursor: 'pointer',
                transition: 'border-color 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = course.color; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-color)'; (e.currentTarget as HTMLDivElement).style.transform = ''; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: course.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BookOpen size={20} color={course.color} />
                </div>
                <ArrowRight size={18} color="var(--text-muted)" />
              </div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>{course.name}</h2>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>{course.fullName}</p>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.5 }}>{course.description}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ProgressBar percent={pct} width={120} color={course.color} />
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{pct}% mastered</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '4px', background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>{course.nodes.length} topics</span>
                <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '4px', background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>{course.questions.length} questions</span>
                <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '4px', background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>{course.examQuestions.length} exam Qs</span>
              </div>
            </div>
          );
        })}

        {/* Add course placeholder */}
        <div style={{
          background: 'var(--bg-card)', borderRadius: '12px',
          border: '1px dashed var(--border-color)',
          padding: '24px', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '8px',
          color: 'var(--text-muted)', minHeight: '200px',
        }}>
          <Plus size={24} />
          <span style={{ fontSize: '13px' }}>Add a Course</span>
          <span style={{ fontSize: '11px', textAlign: 'center', maxWidth: '180px', lineHeight: 1.5 }}>See README for how to add your own course data</span>
        </div>
      </div>
    </div>
  );
}
