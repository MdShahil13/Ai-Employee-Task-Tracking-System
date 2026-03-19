import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, BrainCircuit, Activity, Clock } from 'lucide-react';
import { Card } from '../components/Card';

export default function LandingPage() {
  const features = [
    { icon: BrainCircuit, title: 'AI-Powered Assignment', desc: 'Smart routing of tasks based on workload and skills.' },
    { icon: Activity, title: 'Real-Time Monitoring', desc: 'Live updates of task progress and team productivity.' },
    { icon: Zap, title: 'Productivity Scoring', desc: 'Dynamic heuristics calculate score based on task speed & difficulty.' },
    { icon: Clock, title: 'Deadline Tracking', desc: 'Automated alerts for approaching or overdue tasks.' },
  ];

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '4rem' }}>
      <header style={{ padding: '2rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ padding: '0.5rem', background: 'var(--primary)', borderRadius: '8px', color: 'white' }}>
            <BrainCircuit size={28} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: 'var(--primary)' }}>AI TaskOS</h2>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/login" className="btn-primary" style={{ textDecoration: 'none' }}>Login</Link>
        </div>
      </header>
      
      <main className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: 1.2 }}>
          AI-Driven Real-Time Adaptive<br/>
          <span style={{ background: 'linear-gradient(to right, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', color: 'transparent' }}>
            Employee Task System
          </span>
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 3rem auto', lineHeight: 1.6 }}>
          Transform your workforce with an intelligent task management dashboard. Monitor active tasks, measure productivity, and optimize operations with smart automated assignment.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '6rem' }}>
          <Link to="/login" state={{ defaultRole: 'admin' }} className="btn-primary" style={{ textDecoration: 'none', padding: '1rem 2rem', fontSize: '1.1rem' }}>
            Login as Admin
          </Link>
          <Link to="/login" state={{ defaultRole: 'employee' }} className="glass-panel" style={{ textDecoration: 'none', padding: '1rem 2rem', fontSize: '1.1rem', color: 'var(--primary)', fontWeight: 600 }}>
            Login as Employee
          </Link>
        </div>

        <h3 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Core Features</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', textAlign: 'left' }}>
          {features.map((F, idx) => (
            <Card key={idx} style={{ padding: '2rem' }}>
              <div style={{ padding: '12px', background: 'rgba(79, 70, 229, 0.1)', borderRadius: '12px', display: 'inline-block', marginBottom: '1rem', color: 'var(--primary)' }}>
                <F.icon size={28} />
              </div>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{F.title}</h4>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {F.desc}
              </p>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
