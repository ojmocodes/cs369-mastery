import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppState } from '../types';
import { courseRegistry } from '../data/courses';

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [masteredNodes, setMasteredNodes] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem('cs-mastery-mastered-v2');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('cs-mastery-mastered-v2', JSON.stringify(masteredNodes));
  }, [masteredNodes]);

  const setActiveCourse = (id: string) => setActiveCourseId(id);

  const toggleMastered = (nodeId: string) => {
    setMasteredNodes(prev => ({ ...prev, [nodeId]: !prev[nodeId] }));
  };

  const isMastered = (nodeId: string) => !!masteredNodes[nodeId];

  const getMasteryPercent = (courseId: string) => {
    const course = courseRegistry[courseId];
    if (!course) return 0;
    const mastered = course.nodes.filter(n => masteredNodes[n.id]).length;
    return Math.round((mastered / course.nodes.length) * 100);
  };

  return (
    <AppContext.Provider value={{ activeCourseId, masteredNodes, setActiveCourse, toggleMastered, isMastered, getMasteryPercent }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
