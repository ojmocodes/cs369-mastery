import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import TopBar from './components/TopBar';
import Home from './pages/Home';
import CourseDashboard from './pages/CourseDashboard';
import KnowledgeGraph from './pages/KnowledgeGraph';
import PracticeTest from './pages/PracticeTest';
import PracticeExam from './pages/PracticeExam';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter basename="/cs369-mastery">
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg-primary)' }}>
          <TopBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/course/:courseId" element={<CourseDashboard />} />
            <Route path="/course/:courseId/graph" element={<KnowledgeGraph />} />
            <Route path="/course/:courseId/practice" element={<PracticeTest />} />
            <Route path="/course/:courseId/exam" element={<PracticeExam />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
