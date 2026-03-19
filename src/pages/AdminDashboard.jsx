import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import { Card, CardHeader } from '../components/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, CheckCircle, Clock, PlusCircle, BrainCircuit } from 'lucide-react';

export default function AdminDashboard() {
  const { users, tasks, addTask } = useContext(AppContext);
  const [formData, setFormData] = useState({ title: '', description: '', deadline: '', difficulty: 'Medium' });

  // Compute Metrics
  const employees = users.filter(u => u.role === 'employee');
  const activeTasks = tasks.filter(t => t.status !== 'Completed').length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;

  const chartData = employees.map(e => ({ name: e.name, score: e.score }));
  const COLORS = ['#4F46E5', '#0EA5E9', '#10B981', '#9333EA'];

  const handleCreateTask = (e) => {
    e.preventDefault();
    // Smart Assignment Mock Heuristic
    // Assign to employee with highest score or random
    const assignee = employees.reduce((prev, current) => (prev.score > current.score) ? prev : current);
    
    // Priority heuristics based on difficulty
    const priority = formData.difficulty === 'Hard' ? 'High' : (formData.difficulty === 'Medium' ? 'Medium' : 'Low');

    addTask({
      title: formData.title,
      description: formData.description,
      deadline: formData.deadline,
      difficulty: formData.difficulty,
      priority,
      status: 'Pending',
      assignedTo: assignee.id
    });

    setFormData({ title: '', description: '', deadline: '', difficulty: 'Medium' });
    alert(`Task auto-assigned to ${assignee.name} with ${priority} priority.`);
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>Admin Overview</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Monitor team performance and manage intelligent assignments.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '12px', background: 'rgba(79, 70, 229, 0.1)', borderRadius: '12px', color: 'var(--primary)' }}><Users size={24}/></div>
            <div>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Total Employees</p>
              <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>{employees.length}</h3>
            </div>
          </div>
        </Card>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '12px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '12px', color: 'var(--warning)' }}><Clock size={24}/></div>
            <div>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Active Tasks</p>
              <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>{activeTasks}</h3>
            </div>
          </div>
        </Card>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', color: 'var(--success)' }}><CheckCircle size={24}/></div>
            <div>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Completed</p>
              <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>{completedTasks}</h3>
            </div>
          </div>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <Card>
          <CardHeader title="Employee Productivity Scores" />
          <div style={{ height: 300, width: '100%' }}>
            <ResponsiveContainer>
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: 'rgba(0,0,0,0.02)'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="score" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card>
          <CardHeader title="Create Smart Task" action={<BrainCircuit size={20} color="var(--primary)" />} />
          <form onSubmit={handleCreateTask} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input required placeholder="Task Title" className="input-base" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            <textarea required placeholder="Description" className="input-base" style={{ minHeight: '80px', resize: 'vertical' }} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            <div style={{ display: 'flex', gap: '1rem' }}>
              <input required type="date" className="input-base" value={formData.deadline} onChange={e => setFormData({...formData, deadline: e.target.value})} />
              <select className="input-base" value={formData.difficulty} onChange={e => setFormData({...formData, difficulty: e.target.value})}>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <PlusCircle size={18} /> Assign via AI
            </button>
          </form>
        </Card>
      </div>

      <Card>
        <CardHeader title="Employee Performance Table" />
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.1)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '1rem' }}>Employee</th>
                <th style={{ padding: '1rem' }}>Active Tasks</th>
                <th style={{ padding: '1rem' }}>Score</th>
                <th style={{ padding: '1rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => {
                const empTasks = tasks.filter(t => t.assignedTo === emp.id && t.status !== 'Completed').length;
                return (
                  <tr key={emp.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                    <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img src={emp.avatar} alt="" style={{ width: 32, height: 32, borderRadius: '50%' }} />
                      <span style={{ fontWeight: 500 }}>{emp.name}</span>
                    </td>
                    <td style={{ padding: '1rem' }}>{empTasks}</td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{emp.score}</span>
                        <div className="progress-container" style={{ width: '60px' }}>
                          <div className="progress-fill" style={{ width: `${emp.score}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span className={`badge ${empTasks > 3 ? 'badge-high' : 'badge-low'}`}>
                        {empTasks > 3 ? 'Overloaded' : 'Optimal'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
