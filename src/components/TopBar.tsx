import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Brain, ArrowLeft, Home } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { getCourse } from '../data/courses';
import ProgressBar from './ProgressBar';

export default function TopBar() {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const location = useLocation();
  const { getMasteryPercent } = useAppContext();

  const course = courseId ? getCourse(courseId) : null;
  const isHome = location.pathname === '/';
  const masteryPct = courseId ? getMasteryPercent(courseId) : 0;

  return (
    <header style={{
      display: 'flex', alignItems: 'center', gap: '12px',
      padding: '0 20px', height: '56px',
      background: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border-color)',
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => navigate('/')}>
        <Brain size={22} color="var(--accent-primary)" />
        <span style={{ fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)' }}>CS Mastery</span>
      </div>

      {/* Breadcrumb */}
      {course && (
        <>
          <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>/</span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{course.name}</span>
        </>
      )}

      <div style={{ flex: 1 }} />

      {/* Mastery bar */}
      {courseId && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Mastery</span>
          <ProgressBar percent={masteryPct} width={120} />
          <span style={{ fontSize: '12px', color: 'var(--accent-primary)', fontWeight: 600 }}>{masteryPct}%</span>
        </div>
      )}

      {/* Nav buttons */}
      {!isHome && (
        <button onClick={() => navigate(-1)} style={navBtnStyle}>
          <ArrowLeft size={15} /> Back
        </button>
      )}
      {!isHome && (
        <button onClick={() => navigate('/')} style={navBtnStyle}>
          <Home size={15} />
        </button>
      )}
    </header>
  );
}

const navBtnStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: '4px',
  padding: '5px 10px', borderRadius: '6px',
  background: 'var(--bg-card)', border: '1px solid var(--border-color)',
  color: 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer',
};
