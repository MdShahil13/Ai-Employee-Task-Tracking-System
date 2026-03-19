// src/components/Card.jsx
import React from 'react';

export const Card = ({ children, className = '', style = {} }) => {
  return (
    <div className={`glass-card ${className}`} style={{ padding: '1.5rem', ...style }}>
      {children}
    </div>
  );
};

export const CardHeader = ({ title, action }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>{title}</h3>
    {action && <div>{action}</div>}
  </div>
);
