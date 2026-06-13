import React from 'react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clock } from 'lucide-react';
import { useStore } from '../../store/useStore';

// Pastel palette based on user request
const DAY_COLORS = {
  Monday:    { bg: '#EEBAB7', accent: '#AB4543', label: '📖' },
  Tuesday:   { bg: '#E1E9B7', accent: '#5E7F19', label: '⚖️' },
  Wednesday: { bg: '#BAA8D6', accent: '#6B4B90', label: '👥' },
  Thursday:  { bg: '#EEE1B7', accent: '#AB9943', label: '🧠' },
  Friday:    { bg: '#A8C7D6', accent: '#4B7A90', label: '💊' },
  Saturday:  { bg: '#EED3B7', accent: '#AB7543', label: '▶️' },
  Sunday:    { bg: '#D4A8D6', accent: '#8F4B90', label: '❤️' },
};

const TaskItem = ({ task, dateStr }) => {
  const toggleTask = useStore(state => state.toggleTask);
  const updateTaskNote = useStore(state => state.updateTaskNote);
  const updateTaskTitle = useStore(state => state.updateTaskTitle);

  return (
    <div style={{ borderBottom: '1px dashed #eee', paddingBottom: '8px', marginBottom: '6px' }}>
      {/* Checkbox row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div 
          onClick={() => toggleTask(dateStr, task.id)}
          style={{
            width: '18px', height: '18px', borderRadius: '5px', border: `2px solid ${task.completed ? '#4f46e5' : '#ccc'}`,
            backgroundColor: task.completed ? '#4f46e5' : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, transition: 'all 0.2s', cursor: 'pointer'
        }}>
          <AnimatePresence>
            {task.completed && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
                <Check size={11} color="#fff" strokeWidth={3} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <input 
          type="text"
          value={task.title}
          onChange={(e) => updateTaskTitle(dateStr, task.id, e.target.value)}
          style={{
            fontSize: '12.5px', color: task.completed ? '#aaa' : '#333',
            textDecoration: task.completed ? 'line-through' : 'none',
            transition: 'all 0.2s', flex: 1, border: 'none', background: 'transparent',
            outline: 'none', padding: 0
          }}
        />
      </div>

      {/* Expandable Note */}
      <AnimatePresence>
        {task.completed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <textarea
              style={{
                width: '100%', marginTop: '6px', padding: '6px 8px',
                borderRadius: '6px', border: '1px solid #e0e0ea',
                backgroundColor: '#f8f8fc', fontSize: '12px', color: '#555',
                resize: 'none', fontFamily: 'inherit', lineHeight: 1.5,
                outline: 'none',
              }}
              rows={2}
              placeholder="Add notes or reflections..."
              value={task.note}
              onChange={(e) => updateTaskNote(dateStr, task.id, e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const DailyCard = ({ date }) => {
  const dateStr = format(date, 'yyyy-MM-dd');
  const dayName = format(date, 'EEEE');
  const tasks = useStore(state => state.taskLogs[dateStr]) || [];
  const colors = DAY_COLORS[dayName] || { bg: '#f5f5f5', accent: '#555', label: '📅' };

  return (
    <div style={{
      background: '#fff', borderRadius: '14px', border: '1px solid #e8e8f0',
      boxShadow: '0 1px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column',
      overflow: 'hidden', transition: 'box-shadow 0.2s',
    }}>
      {/* Day Header */}
      <div style={{ backgroundColor: colors.bg, padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: colors.accent }}>
            {dayName}
          </p>
        </div>
        <span style={{ fontSize: '18px' }}>{colors.label}</span>
      </div>

      {/* Task List */}
      <div style={{ padding: '12px 14px', flex: 1 }}>
        {tasks.length === 0 ? (
          <p style={{ fontSize: '12px', color: '#bbb', margin: 0 }}>No tasks yet...</p>
        ) : (
          tasks.map(task => <TaskItem key={task.id} task={task} dateStr={dateStr} />)
        )}
      </div>

      {/* Focus Time Footer */}
      <div style={{ borderTop: '1px solid #f0f0f6', padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '11px', color: '#aaa', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Clock size={12} /> Focus Time
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <input
            type="number"
            min={0} max={24}
            style={{ width: '40px', border: 'none', borderBottom: '1px solid #ddd', textAlign: 'center', fontSize: '12px', outline: 'none', backgroundColor: 'transparent', color: '#444' }}
            placeholder="0"
          />
          <span style={{ fontSize: '11px', color: '#aaa' }}>hrs</span>
        </div>
      </div>
    </div>
  );
};
