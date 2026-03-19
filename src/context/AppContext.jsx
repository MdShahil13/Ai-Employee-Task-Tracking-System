import React, { createContext, useState, useEffect } from 'react';
import { mockUsers, mockTasks } from '../data/mockDB';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null = not logged in
  const [tasks, setTasks] = useState(mockTasks);
  const [users, setUsers] = useState(mockUsers);
  const [notifications, setNotifications] = useState([]);

  // Real-time update simulation using polling heuristic
  useEffect(() => {
    if (!user) return;
    const interval = setInterval(() => {
      // Simulate random background tasks updates occasionally
      if (Math.random() > 0.7) {
        setNotifications(prev => [{
          id: Date.now(),
          text: 'AI Agent evaluated new productivity metrics.',
          time: new Date().toISOString()
        }, ...prev]);
      }
    }, 12000);
    return () => clearInterval(interval);
  }, [user]);

  const login = (role) => {
    const found = users.find(u => u.role === role);
    if(found) setUser(found);
  };
  const logout = () => setUser(null);

  const addTask = (task) => {
    setTasks(prev => [{...task, id: Date.now()}, ...prev]);
  };
  
  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    
    // AI Productivity logic mock - Completing tasks recalculates score
    if(newStatus === 'Completed') {
      const task = tasks.find(t => t.id === taskId);
      if(task && task.assignedTo) {
        setUsers(prev => prev.map(u => {
          if(u.id === task.assignedTo) {
             const boost = task.priority === 'High' ? 5 : (task.priority === 'Medium' ? 3 : 1);
             return { ...u, score: Math.min(100, (u.score || 80) + boost) };
          }
          return u;
        }));
      }
    }
  };

  return (
    <AppContext.Provider value={{ 
      user, users, tasks, notifications, 
      login, logout, addTask, updateTaskStatus 
    }}>
      {children}
    </AppContext.Provider>
  );
};
