import React from 'react';
import { format } from 'date-fns';

const s = {
  root: { display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', overflowY: 'auto', paddingRight: '4px' },
  title: { margin: 0, fontSize: '22px', fontWeight: 800, letterSpacing: '-0.5px', background: 'linear-gradient(135deg, #4f46e5, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  subtitle: { margin: '2px 0 0', fontSize: '12px', color: '#888' },
  sectionLabel: (color) => ({ margin: '0 0 8px', fontSize: '10.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color }),
  card: { background: '#fff', borderRadius: '12px', border: '1px solid #ebebf3', padding: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' },
  bulletRow: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' },
  bullet: { width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#d0d0dc', flexShrink: 0 },
  input: { flex: 1, border: 'none', borderBottom: '1px dashed #e0e0ea', outline: 'none', fontSize: '13px', color: '#333', backgroundColor: 'transparent', fontFamily: 'inherit', paddingBottom: '2px' },
  textarea: { width: '100%', border: 'none', outline: 'none', resize: 'none', fontSize: '13px', color: '#333', backgroundColor: 'transparent', fontFamily: 'inherit', lineHeight: 1.6 },
};

const SidebarSection = ({ title, color, emoji, children }) => (
  <div>
    <p style={s.sectionLabel(color)}>{emoji} {title}</p>
    <div style={s.card}>{children}</div>
  </div>
);

const BulletInput = ({ placeholder }) => (
  <div style={s.bulletRow}>
    <div style={s.bullet} />
    <input type="text" placeholder={placeholder} style={s.input} />
  </div>
);

export const Sidebar = ({ weekStart }) => (
  <div style={s.root} className="no-scrollbar">
    <div>
      <h1 style={s.title}>Weekly PLANNER</h1>
      <p style={s.subtitle}>MBBS 3rd Year</p>
    </div>

    <SidebarSection title="Weekly Focus" color="#4f46e5" emoji="🎯">
      <textarea style={{ ...s.textarea, minHeight: '56px' }} placeholder="Main goal this week..." />
    </SidebarSection>

    <SidebarSection title="Top Priorities" color="#f59e0b" emoji="⭐">
      <BulletInput placeholder="Priority 1..." />
      <BulletInput placeholder="Priority 2..." />
      <BulletInput placeholder="Priority 3..." />
    </SidebarSection>

    <SidebarSection title="Study Targets" color="#10b981" emoji="📚">
      <BulletInput placeholder="Target 1..." />
      <BulletInput placeholder="Target 2..." />
      <BulletInput placeholder="Target 3..." />
    </SidebarSection>

    <SidebarSection title="YouTube & Content" color="#ef4444" emoji="▶️">
      <BulletInput placeholder="Video idea..." />
      <BulletInput placeholder="Script / drafting..." />
    </SidebarSection>

    <SidebarSection title="Follow-Up" color="#3b82f6" emoji="📤">
      <BulletInput placeholder="Email to..." />
      <BulletInput placeholder="Call..." />
    </SidebarSection>
  </div>
);
