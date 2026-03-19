import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { LayoutDashboard, CheckSquare, LogOut, Activity, Briefcase } from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = user?.role === 'admin' ? [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Analytics', path: '/admin#analytics', icon: Activity },
  ] : [
    { name: 'My Board', path: '/employee', icon: LayoutDashboard },
    { name: 'Productivity', path: '/employee#productivity', icon: Activity },
  ];

  return (
    <div className="dashboard-sidebar glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="sidebar-header" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ padding: '8px', background: 'var(--primary)', borderRadius: '8px', color: 'white' }}>
          <Briefcase size={24} />
        </div>
        <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>AI TaskOS</h2>
      </div>

      <div className="sidebar-profile" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem', padding: '12px', background: 'rgba(255,255,255,0.4)', borderRadius: '12px' }}>
        <img src={user?.avatar} alt={user?.name} style={{ width: 40, height: 40, borderRadius: '50%' }} />
        <div>
          <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-primary)' }}>{user?.name}</p>
          <p style={{ margin: 0, fontSize: '0.8rem', textTransform: 'capitalize' }}>{user?.role}</p>
        </div>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {menuItems.map((item) => {
          const IconTemplate = item.icon;
          const isActive = location.pathname === item.path || location.hash === item.path.split('#')[1];
          return (
            <Link 
              key={item.name} 
              to={item.path} 
              style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
                borderRadius: '8px', textDecoration: 'none', color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                background: isActive ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
                fontWeight: isActive ? 600 : 500,
                transition: 'var(--transition-fast)'
              }}
            >
              <IconTemplate size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <button onClick={handleLogout} style={{
        display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
        color: 'var(--danger)', fontWeight: 500, marginTop: 'auto', borderRadius: '8px'
      }}>
        <LogOut size={20} />
        Log Out
      </button>
    </div>
  );
};

export default Sidebar;
