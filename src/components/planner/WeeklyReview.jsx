import React from 'react';
import { format } from 'date-fns';
import { useStore } from '../../store/useStore';

const labelStyle = { fontSize: '11px', fontWeight: 600, color: '#888', marginBottom: '4px', display: 'block' };
const textareaStyle = { width: '100%', border: 'none', borderBottom: '1px dashed #ddd', outline: 'none', resize: 'none', fontSize: '12.5px', color: '#333', backgroundColor: 'transparent', fontFamily: 'inherit', lineHeight: 1.6, minHeight: '44px' };

export const WeeklyReview = ({ weekStart }) => {
  const weekDateStr = format(weekStart, 'yyyy-MM-dd');
  const reviewData = useStore(state => state.weeklyReviews[weekDateStr]) || {
    wentWell: '', improve: '', weakTopics: '', nextFocus: ''
  };
  const updateWeeklyReview = useStore(state => state.updateWeeklyReview);

  const handleChange = (field, value) => updateWeeklyReview(weekDateStr, field, value);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '14px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #f0f0f6', paddingBottom: '10px' }}>
        <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#f59e0b' }}>
          ✨ Weekly Review
        </span>
      </div>

      {/* 2x2 Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', flex: 1 }}>
        <div>
          <label style={labelStyle}>What went well this week?</label>
          <textarea style={textareaStyle} value={reviewData.wentWell} onChange={e => handleChange('wentWell', e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>What can I improve?</label>
          <textarea style={textareaStyle} value={reviewData.improve} onChange={e => handleChange('improve', e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Topics still weak</label>
          <textarea style={textareaStyle} value={reviewData.weakTopics} onChange={e => handleChange('weakTopics', e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Next week, I will focus on</label>
          <textarea style={textareaStyle} value={reviewData.nextFocus} onChange={e => handleChange('nextFocus', e.target.value)} />
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
        <div style={{ flex: 1, background: 'linear-gradient(135deg, #ede9fe, #ddd6fe)', borderRadius: '10px', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ margin: 0, fontSize: '12px', fontStyle: 'italic', color: '#5b21b6', textAlign: 'center', fontWeight: 500 }}>
            "Small steps every day<br />lead to big results." 💜
          </p>
        </div>
        <div style={{ flex: 1, background: 'linear-gradient(135deg, #fff1f2, #fecdd3)', borderRadius: '10px', padding: '10px 14px' }}>
          <p style={{ margin: '0 0 6px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#be123c' }}>
            🎁 Reward for Goals
          </p>
          <input
            type="text"
            placeholder="E.g., Movie night..."
            style={{ width: '100%', border: 'none', borderBottom: '1px solid #fda4af', outline: 'none', backgroundColor: 'transparent', fontSize: '12.5px', color: '#9f1239', fontFamily: 'inherit', paddingBottom: '2px' }}
          />
        </div>
      </div>
    </div>
  );
};
