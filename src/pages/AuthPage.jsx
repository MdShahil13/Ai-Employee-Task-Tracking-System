import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Card } from '../components/Card';
import { BrainCircuit, User } from 'lucide-react';

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, user } = useContext(AppContext);
  
  const [role, setRole] = useState(location.state?.defaultRole || 'employee');

  useEffect(() => {
    if (user) {
      navigate(user.role === 'admin' ? '/admin' : '/employee');
    }
  }, [user, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    login(role);
    navigate(role === 'admin' ? '/admin' : '/employee');
  };

  return (
    <div className="flex-center animate-fade-in" style={{ minHeight: '100vh', padding: '2rem' }}>
      <Card style={{ width: '100%', maxWidth: '420px', padding: '3rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', padding: '16px', background: 'var(--primary)', borderRadius: '16px', color: 'white', marginBottom: '1rem' }}>
            <BrainCircuit size={36} />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Sign in to access your dashboard</p>
        </div>

        <div style={{ display: 'flex', background: 'rgba(0,0,0,0.05)', borderRadius: '8px', padding: '4px', marginBottom: '2rem' }}>
          <button 
            type="button"
            onClick={() => setRole('employee')}
            style={{
              flex: 1, padding: '0.5rem', borderRadius: '6px', fontWeight: 600,
              background: role === 'employee' ? 'white' : 'transparent',
              boxShadow: role === 'employee' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
              color: role === 'employee' ? 'var(--primary)' : 'var(--text-secondary)'
            }}>
            Employee
          </button>
          <button 
            type="button"
            onClick={() => setRole('admin')}
            style={{
              flex: 1, padding: '0.5rem', borderRadius: '6px', fontWeight: 600,
              background: role === 'admin' ? 'white' : 'transparent',
              boxShadow: role === 'admin' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
              color: role === 'admin' ? 'var(--primary)' : 'var(--text-secondary)'
            }}>
            Admin
          </button>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Email Address</label>
            <input type="email" required defaultValue={`${role}@demo.com`} className="input-base" readOnly />
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>* Using demo mock account</p>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Password</label>
            <input type="password" required defaultValue="password123" className="input-base" readOnly />
          </div>
          
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem', padding: '1rem' }}>
            Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        </form>
      </Card>
    </div>
  );
}
