import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Card, CardHeader } from '../components/Card';
import { CheckCircle, Clock, AlertTriangle, Bell, Zap } from 'lucide-react';

export default function EmployeeDashboard() {
  const { user, tasks, updateTaskStatus, notifications } = useContext(AppContext);

  const myTasks = tasks.filter(t => t.assignedTo === user.id);
  const pending = myTasks.filter(t => t.status === 'Pending');
  const inProgress = myTasks.filter(t => t.status === 'In Progress');
  const completed = myTasks.filter(t => t.status === 'Completed');

  const getPriorityColor = (p) => {
    if (p === 'High') return 'var(--danger)';
    if (p === 'Medium') return 'var(--warning)';
    return 'var(--success)';
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2rem', margin: 0 }}>My Board</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Welcome back, {user.name}. Here's your current workload.</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>AI Productivity Score</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Zap size={24} color="var(--primary)" />
            <h2 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)' }}>{user.score}</h2>
          </div>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Task Columns */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}><Clock size={18}/> Pending ({pending.length})</h3>
          {pending.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No pending tasks.</p>}
          {pending.map(t => (
            <Card key={t.id} style={{ borderLeft: `4px solid ${getPriorityColor(t.priority)}`, padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span className={`badge badge-${t.priority.toLowerCase()}`}>{t.priority} Priority</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Due: {t.deadline}</span>
              </div>
              <h4 style={{ margin: '0 0 0.5rem 0' }}>{t.title}</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>{t.description}</p>
              <button 
                onClick={() => updateTaskStatus(t.id, 'In Progress')}
                className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                Start Task
              </button>
            </Card>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}><AlertTriangle size={18}/> In Progress ({inProgress.length})</h3>
          {inProgress.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No tasks in progress.</p>}
          {inProgress.map(t => (
            <Card key={t.id} style={{ borderLeft: `4px solid ${getPriorityColor(t.priority)}`, padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span className={`badge badge-${t.priority.toLowerCase()}`}>{t.priority} Priority</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Due: {t.deadline}</span>
              </div>
              <h4 style={{ margin: '0 0 0.5rem 0' }}>{t.title}</h4>
              <button 
                onClick={() => updateTaskStatus(t.id, 'Completed')}
                style={{ background: 'var(--success)', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 500, border: 'none', cursor: 'pointer', marginTop: '1rem' }}>
                Mark Completed
              </button>
            </Card>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}><CheckCircle size={18}/> Completed ({completed.length})</h3>
          {completed.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No completed tasks yet.</p>}
          {completed.map(t => (
            <Card key={t.id} style={{ borderLeft: `4px solid var(--success)`, opacity: 0.7, padding: '1.25rem' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', textDecoration: 'line-through' }}>{t.title}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--success)' }}>Completed</p>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader title="Recent AI Notifications" action={<Bell size={20} color="var(--primary)" />} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {notifications.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>No recent notifications.</p>
          ) : (
            notifications.map(n => (
              <div key={n.id} style={{ padding: '0.75rem', background: 'rgba(79, 70, 229, 0.05)', borderRadius: '8px', borderLeft: '3px solid var(--primary)' }}>
                <p style={{ margin: 0, fontWeight: 500 }}>{n.text}</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{new Date(n.time).toLocaleTimeString()}</span>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
