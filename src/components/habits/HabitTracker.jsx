import React from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const HabitTracker = ({ weekDays }) => {
  const habits = useStore(state => state.getHabits());
  const habitLogs = useStore(state => state.habitLogs);
  const toggleHabit = useStore(state => state.toggleHabit);
  const updateHabitTitle = useStore(state => state.updateHabitTitle);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowX: 'auto' }}>
      {/* Header */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f6', backgroundColor: '#f8f8fc', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#10b981' }}>
          🌿 Habit Tracker
        </span>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto', flex: 1 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ backgroundColor: '#fafafa' }}>
              <th style={{ textAlign: 'left', padding: '8px 16px', fontWeight: 600, color: '#888', width: '40%' }}>Habits</th>
              {weekDays.map(day => (
                <th key={day.toISOString()} style={{ textAlign: 'center', padding: '8px 6px', fontWeight: 600, color: '#888', width: '6%' }}>
                  {format(day, 'eeeee')}
                </th>
              ))}
              <th style={{ textAlign: 'center', padding: '8px 10px', fontWeight: 600, color: '#888', borderLeft: '1px solid #f0f0f6' }}>Goal</th>
              <th style={{ textAlign: 'center', padding: '8px 10px', fontWeight: 600, color: '#888' }}>✓</th>
            </tr>
          </thead>
          <tbody>
            {habits.map((habit, idx) => {
              const achieved = weekDays.reduce((acc, day) => {
                return acc + (habitLogs[format(day, 'yyyy-MM-dd')]?.[habit.id] ? 1 : 0);
              }, 0);

              return (
                <tr key={habit.id} style={{ borderTop: '1px solid #f5f5f8', backgroundColor: idx % 2 === 0 ? '#fff' : '#fafafa' }}>
                  <td style={{ padding: '9px 16px', color: '#333', fontWeight: 500 }}>
                    <input 
                      type="text" 
                      value={habit.title} 
                      onChange={(e) => updateHabitTitle(habit.id, e.target.value)}
                      style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontWeight: 500, color: '#333', fontSize: '12px', padding: 0 }}
                    />
                  </td>
                  {weekDays.map(day => {
                    const dateStr = format(day, 'yyyy-MM-dd');
                    const isChecked = habitLogs[dateStr]?.[habit.id] || false;
                    return (
                      <td key={dateStr} style={{ textAlign: 'center', padding: '6px' }}>
                        <button
                          onClick={() => toggleHabit(dateStr, habit.id)}
                          style={{
                            width: '22px', height: '22px', borderRadius: '5px',
                            border: `2px solid ${isChecked ? '#10b981' : '#ddd'}`,
                            backgroundColor: isChecked ? '#10b981' : '#fff',
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', transition: 'all 0.15s',
                          }}
                        >
                          {isChecked && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400 }}>
                              <Check size={12} color="#fff" strokeWidth={3} />
                            </motion.div>
                          )}
                        </button>
                      </td>
                    );
                  })}
                  <td style={{ textAlign: 'center', color: '#aaa', fontSize: '12px', borderLeft: '1px solid #f0f0f6' }}>7</td>
                  <td style={{ textAlign: 'center', fontWeight: 700, color: achieved === 7 ? '#10b981' : '#444', fontSize: '13px' }}>
                    {achieved}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
