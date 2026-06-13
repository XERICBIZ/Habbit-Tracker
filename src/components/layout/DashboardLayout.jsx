import React, { useEffect } from 'react';
import { format, startOfWeek, addDays } from 'date-fns';
import { useStore } from '../../store/useStore';
import { DailyCard } from '../planner/DailyCard';
import { Sidebar } from '../planner/Sidebar';
import { HabitTracker } from '../habits/HabitTracker';
import { WeeklyReview } from '../planner/WeeklyReview';

export const DashboardLayout = () => {
  const currentDate = new Date(useStore((state) => state.currentDate));
  const initializeTasksForDate = useStore((state) => state.initializeTasksForDate);

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));

  useEffect(() => {
    weekDays.forEach(day => {
      initializeTasksForDate(format(day, 'yyyy-MM-dd'));
    });
  }, []);

  const styles = {
    page: {
      minHeight: '100vh',
      backgroundColor: '#f5f5f7',
      fontFamily: "'Inter', sans-serif",
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    mainRow: {
      display: 'flex',
      gap: '20px',
      flex: 1,
    },
    sidebar: {
      width: '260px',
      flexShrink: 0,
    },
    mainContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      minWidth: 0,
    },
    dailyGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '14px',
    },
    bottomRow: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: '20px',
    },
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e0e0e6', paddingBottom: '16px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 700, letterSpacing: '-0.5px', background: 'linear-gradient(135deg, #4f46e5, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Aura Planner
          </h1>
          <p style={{ margin: 0, fontSize: '13px', color: '#888', marginTop: '2px' }}>
            MBBS 3rd Year
          </p>
        </div>
        <div style={{ fontSize: '13px', color: '#888', fontStyle: 'italic' }}>
          "Discipline today. Doctor tomorrow." 🩺
        </div>
      </div>

      <div style={styles.mainRow}>
        <aside style={styles.sidebar}>
          <Sidebar weekStart={weekStart} />
        </aside>

        <main style={styles.mainContent}>
          {/* Daily Cards — 4 columns, 2 rows */}
          <div style={styles.dailyGrid}>
            {weekDays.map((day) => (
              <DailyCard key={day.toISOString()} date={day} />
            ))}
            {/* 8th card: Notes & Reminders */}
            <div style={{ background: '#fff', borderRadius: '14px', padding: '16px', border: '1px solid #e8e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <p style={{ margin: '0 0 10px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6b7080' }}>
                📌 Notes & Reminders
              </p>
              <textarea
                style={{ width: '100%', height: 'calc(100% - 30px)', minHeight: '120px', resize: 'none', border: 'none', outline: 'none', fontSize: '13px', color: '#444', backgroundColor: 'transparent', fontFamily: 'inherit', lineHeight: 1.6 }}
                placeholder="Small steps every day lead to big results... ✨"
              />
            </div>
          </div>

          {/* Bottom: Habit Tracker + Weekly Review */}
          <div style={styles.bottomRow}>
            <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e8e8f0', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <HabitTracker weekDays={weekDays} />
            </div>
            <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e8e8f0', padding: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <WeeklyReview weekStart={weekStart} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
