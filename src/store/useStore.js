import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { startOfWeek, format } from 'date-fns';

const defaultHabits = [
  { id: 'h1', title: 'Attend Classes/Postings' },
  { id: 'h2', title: 'Same-Day Revision' },
  { id: 'h3', title: '20 MCQs Daily' },
  { id: 'h4', title: '4-6 Hours Study' },
  { id: 'h5', title: 'Medicine Daily' },
  { id: 'h6', title: 'Sleep 7+ Hours' },
  { id: 'h7', title: 'Water Goal' },
];

const defaultTasks = [
  { id: 't1', title: 'Morning Review', completed: false, note: '', focusTime: 1 },
  { id: 't2', title: 'Deep Work Session', completed: false, note: '', focusTime: 2 },
  { id: 't3', title: 'Content / YT Work', completed: false, note: '', focusTime: 1.5 },
];

export const useStore = create(
  persist(
    (set, get) => ({
      currentDate: new Date().toISOString(),
      
      habitsList: defaultHabits,
      habitLogs: {},
      taskLogs: {},
      weeklyReviews: {},

      setCurrentDate: (date) => set({ currentDate: date.toISOString() }),
      
      updateHabitTitle: (habitId, newTitle) => set((state) => ({
        habitsList: state.habitsList.map(h => h.id === habitId ? { ...h, title: newTitle } : h)
      })),

      toggleHabit: (dateStr, habitId) => set((state) => {
        const dateLogs = state.habitLogs[dateStr] || {};
        return {
          habitLogs: {
            ...state.habitLogs,
            [dateStr]: {
              ...dateLogs,
              [habitId]: !dateLogs[habitId]
            }
          }
        };
      }),

      initializeTasksForDate: (dateStr) => set((state) => {
        if (!state.taskLogs[dateStr]) {
          return {
            taskLogs: {
              ...state.taskLogs,
              [dateStr]: [...defaultTasks.map(t => ({ ...t }))]
            }
          };
        }
        return state;
      }),

      toggleTask: (dateStr, taskId) => set((state) => {
        const tasks = state.taskLogs[dateStr] || [];
        return {
          taskLogs: {
            ...state.taskLogs,
            [dateStr]: tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
          }
        };
      }),

      updateTaskTitle: (dateStr, taskId, newTitle) => set((state) => {
        const tasks = state.taskLogs[dateStr] || [];
        return {
          taskLogs: {
            ...state.taskLogs,
            [dateStr]: tasks.map(t => t.id === taskId ? { ...t, title: newTitle } : t)
          }
        };
      }),

      updateTaskNote: (dateStr, taskId, note) => set((state) => {
        const tasks = state.taskLogs[dateStr] || [];
        return {
          taskLogs: {
            ...state.taskLogs,
            [dateStr]: tasks.map(t => t.id === taskId ? { ...t, note } : t)
          }
        };
      }),

      updateWeeklyReview: (weekDateStr, field, value) => set((state) => {
        const review = state.weeklyReviews[weekDateStr] || { wentWell: '', improve: '', weakTopics: '', nextFocus: '' };
        return {
          weeklyReviews: {
            ...state.weeklyReviews,
            [weekDateStr]: { ...review, [field]: value }
          }
        };
      }),

      getHabits: () => {
        // Fallback for older persisted state
        const state = get();
        return state.habitsList || defaultHabits;
      },
    }),
    {
      name: 'aura-planner-storage',
    }
  )
);
